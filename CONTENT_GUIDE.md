# Guida al contenuto dei moduli

Ogni modulo del corso è un file JSON in `src/content/` (`module-1.json` ... `module-6.json`). `module-1.json`
("Le basi del prompting") è completamente popolato: usalo come riferimento concreto del formato.

**Non devi scrivere JSON a mano.** Il modo più semplice di procedere è: incollami (a Claude) il testo del modulo
così com'è — anche come prosa normale, con i tuoi esempi di prompt — e io lo trasformo in questo formato, generando
anche il quiz coerente con quel contenuto. Questa guida serve principalmente per capire cosa succede "dietro le
quinte" e per poter intervenire tu stesso sui file se vuoi fare una modifica veloce.

## Struttura di un modulo

```jsonc
{
  "slug": "nome-breve-univoco",        // usato nell'URL: /moduli/<slug>
  "number": 1,                          // 1-6, ordine del modulo
  "title": "Titolo del modulo",
  "subtitle": "Una riga che riassume cosa si impara",
  "estimatedMinutes": 35,               // usato per stimare il tempo rimanente in dashboard
  "theory": [ /* array di sezioni, vedi sotto */ ],
  "examples": [ /* array di sezioni, stesso formato di "theory" */ ],
  "exercise": {
    "title": "Titolo dell'esercizio",
    "instructions": "Cosa deve fare lo studente",
    "hint": "Suggerimento opzionale"
  },
  "quiz": [ /* array di domande, vedi sotto */ ],
  "passingScore": 70                    // % minima per considerare il modulo superato
}
```

`theory` ed `examples` sono renderizzati come card collassabili separate — teoria sopra, esempi pratici sotto.

### Una sezione (dentro `theory` o `examples`)

```jsonc
{
  "id": "id-univoco-nella-pagina",
  "title": "Titolo della sezione",
  "collapsible": true,      // false = sempre aperta, senza freccia per chiuderla
  "defaultOpen": true,      // se collapsible, se parte aperta o chiusa
  "blocks": [ /* array di blocchi di contenuto, vedi sotto */ ]
}
```

### Blocchi di contenuto (`blocks`)

Ogni blocco ha un campo `type` che determina come viene renderizzato:

| `type`      | Campi                                  | Uso |
|-------------|------------------------------------------|-----|
| `paragraph` | `text`                                    | Un paragrafo di testo normale |
| `list`      | `items` (array di stringhe), `ordered` (bool, opzionale) | Elenco puntato o numerato |
| `prompt`    | `example: { label?, prompt, note? }`      | Box evidenziato per un esempio di prompt (font monospazio, sfondo scuro) |
| `callout`   | `variant: "tip" \| "warning" \| "insight"`, `title?`, `text` | Box colorato per consigli/avvisi/intuizioni chiave |
| `quote`     | `text`, `attribution?`                    | Citazione con barra laterale |

Esempio di blocco `prompt` (così appare nel modulo 1):

```json
{
  "type": "prompt",
  "example": {
    "label": "✅ Prompt con C.R.A.F.T.",
    "prompt": "Sei un copywriter specializzato in hospitality... [testo del prompt]",
    "note": "Nota come ogni riga corrisponde a una lettera del framework."
  }
}
```

### Domande del quiz (`quiz`)

```json
{
  "id": "q1",
  "question": "Testo della domanda",
  "options": ["Opzione A", "Opzione B", "Opzione C", "Opzione D"],
  "correctIndex": 1,
  "explanation": "Perché questa è la risposta corretta (mostrata come feedback immediato)."
}
```

- `correctIndex` è l'indice (a partire da 0) dell'opzione corretta in `options`.
- Consigliato: 5-8 domande per modulo, un solo mix di livelli di difficoltà.
- Un modulo con `"quiz": []` viene mostrato in dashboard come **"In arrivo"** e il quiz non è accessibile: è così
  che sono impostati i moduli 2-6 finché non mi passi il loro contenuto.

## Esame finale (`src/content/final-exam.json`)

```jsonc
{
  "title": "Esame finale — AI per Fare Soldi",
  "passingScore": 70,
  "mcq": [ /* stesso formato delle domande quiz sopra, idealmente 15-20 domande su tutti i moduli */ ],
  "openQuestions": [
    {
      "id": "open-1",
      "prompt": "Scrivi un prompt usando il framework C.R.A.F.T. per un caso reale del tuo pub.",
      "checklist": [
        "Definisce chiaramente il Contesto (settore, situazione)",
        "Specifica un Ruolo pertinente",
        "L'Azione richiesta è inequivocabile",
        "Il Formato dell'output è specificato",
        "Il Tono è coerente con l'obiettivo"
      ]
    }
  ]
}
```

Le domande aperte non vengono corrette automaticamente: lo studente scrive la risposta in un campo di testo (salvata
in `localStorage`) e si autovaluta spuntando la checklist — pensata apposta per essere oggettiva ("la risposta
contiene X?") invece che soggettiva.

L'esame finale si sblocca solo quando **tutti e 6 i moduli risultano completati** (quiz superato con almeno il
punteggio minimo). Finché `mcq` e `openQuestions` sono vuoti, la pagina mostra "esame in preparazione".

## Checklist per aggiungere un nuovo modulo

1. Incollami il testo completo del modulo (teoria + esempi + esercizio).
2. Ti chiedo eventuali chiarimenti se qualche esempio di prompt non è completo o se manca un esercizio pratico.
3. Genero il file `module-N.json` con la teoria strutturata in sezioni, gli esempi come blocchi `prompt`, e un quiz
   di 5-8 domande coerente con quel contenuto specifico (non generico).
4. Aggiorno `estimatedMinutes` in base alla lunghezza reale del contenuto.
5. Verifico che il modulo compaia correttamente in dashboard e che il quiz funzioni prima di passare al successivo.
