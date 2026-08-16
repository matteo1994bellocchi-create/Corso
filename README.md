# AI per Fare Soldi — Corso Interattivo

Web app di e-learning per trasformare il corso testuale "AI per Fare Soldi" (Claude, Lovable, Higgsfield, agenti
personalizzati, monetizzazione) in un'esperienza interattiva: contenuti divisi per moduli, quiz di verifica, esame
finale, tracciamento dei progressi e un pizzico di gamification (senza mascotte né stelline).

## Stack tecnico

- **React 19 + TypeScript**, build con **Vite**
- **Tailwind CSS v4** per lo stile, con modalità scura/chiara automatica (segue le preferenze di sistema, con toggle manuale salvato in `localStorage`)
- **React Router** per la navigazione
- **Framer Motion** per le micro-animazioni (apertura sezioni, transizioni quiz, feedback)
- Nessun backend: i contenuti sono file JSON statici, i progressi sono salvati in `localStorage` del browser

## Avvio in locale

```bash
npm install
npm run dev
```

Apri l'URL indicato (di solito `http://localhost:5173`).

Per una build di produzione:

```bash
npm run build
npm run preview   # per testare la build in locale
```

La cartella `dist/` generata da `npm run build` è un sito statico: può essere pubblicata su qualsiasi hosting statico
(Vercel, Netlify, Cloudflare Pages, GitHub Pages, un semplice bucket S3...) senza bisogno di un server applicativo.

## Struttura del progetto

```
src/
  content/            ← contenuto del corso (vedi CONTENT_GUIDE.md)
    types.ts           tipi TypeScript dello schema contenuti
    module-1.json       .. module-6.json   contenuto di ciascun modulo
    final-exam.json     contenuto dell'esame finale
    modules.ts           registro che carica ed espone i moduli all'app
  store/              ← stato applicativo
    types.ts             forma dei dati di progresso salvati
    storage.ts            lettura/scrittura da localStorage
    ProgressContext.tsx    React Context + azioni (registra tentativi, reset...)
    useTheme.ts            hook per il tema chiaro/scuro
  lib/
    progressSelectors.ts  calcoli derivati (% completamento, modulo consigliato, statistiche)
  components/         ← componenti UI riutilizzabili (card moduli, quiz, sezioni collassabili...)
  pages/              ← una pagina per ogni rotta (Home, Modulo, Quiz, Esame finale, Certificato)
  App.tsx             ← routing
```

## Come funziona il tracciamento progressi

Tutto lo stato (moduli completati, punteggi, tentativi, risposte all'esame finale) è salvato nel `localStorage` del
browser sotto la chiave `corso:progress:v1` — nessun account, nessun server. Questo significa:

- I progressi restano legati a **quel browser su quel dispositivo**. Se studi il corso da telefono e da laptop,
  avrai due progressi separati.
- Cancellare i dati del sito nel browser (o usare la navigazione in incognito) azzera i progressi.
- Non è richiesta alcuna configurazione per iniziare a usare l'app: funziona già "out of the box" come sito statico.

**Se in futuro vuoi dare accesso a più utenti** (es. per rivendere il corso), a quel punto ha senso introdurre:
autenticazione, un database per salvare i progressi lato server, e probabilmente pagamenti. Nessuna di queste
funzionalità è presente ora — l'architettura attuale (contenuti come JSON, stato derivato da un unico oggetto
`ProgressState`) è pensata per rendere quel passaggio un'aggiunta incrementale, non una riscrittura.

## Aggiungere/modificare il contenuto dei moduli

Vedi **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)** per il formato esatto in cui strutturare teoria, esempi, esercizio e
quiz di ogni modulo.
