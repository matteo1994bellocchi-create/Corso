# 📘 Guida per Matteo

Ciao Matteo! 👋
Questa guida ti spiega, con parole semplici, gli strumenti che userai per creare e mettere online i tuoi siti.
Non serve sapere niente di programmazione. Leggila con calma, un capitolo alla volta.

> 🛡️ **Regola numero 1: la sicurezza viene sempre prima di tutto.**
> Se un passaggio ti sembra strano o non sei sicuro, **fermati e chiedi** (a Claude o a Davide).
> Non c'è nessuna fretta.

---

## 📑 Indice

1. [La grande idea: costruire un negozio](#1--la-grande-idea-costruire-un-negozio)
2. [GitHub: l'archivio del codice](#2--github-larchivio-del-codice)
3. [Claude Code: il tuo assistente che costruisce](#3--claude-code-il-tuo-assistente-che-costruisce)
4. [Supabase: il magazzino dei dati](#4--supabase-il-magazzino-dei-dati)
5. [Vercel: la casa del sito](#5--vercel-la-casa-del-sito)
6. [Il dominio: l'indirizzo di casa (www.caso.it)](#6--il-dominio-lindirizzo-di-casa-wwwcasoit)
7. [Come lavorano tutti insieme](#7--come-lavorano-tutti-insieme)
8. [Creare gli account passo passo](#8--creare-gli-account-passo-passo)
9. [Le regole d'oro della sicurezza](#9-%EF%B8%8F-le-regole-doro-della-sicurezza)
10. [Come parlare con Claude](#10--come-parlare-con-claude)
11. [Il piccolo dizionario](#11--il-piccolo-dizionario)

---

## 1. 🏪 La grande idea: costruire un negozio

Immagina di voler aprire un **negozio**. Ti servono:

| Nel mondo reale | Nel mondo dei siti | Lo strumento |
|---|---|---|
| 📐 I **progetti** del negozio, conservati in un armadio | Il **codice** del sito | **GitHub** |
| 👷 Un **muratore** bravissimo che costruisce quello che gli chiedi | Chi scrive e modifica il codice | **Claude Code** |
| 📦 Il **magazzino** dove tieni la lista dei clienti e degli ordini | Il **database** (i dati) | **Supabase** |
| 🏠 Il **locale** dove il negozio è aperto al pubblico | L'**hosting** | **Vercel** |
| 🪧 L'**indirizzo** scritto sull'insegna | Il **dominio** (www.caso.it) | Si compra da un registrar (es. Aruba) |

Tienila a mente: torneremo spesso a questo esempio del negozio.

---

## 2. 🗄️ GitHub: l'archivio del codice

### Cos'è?
GitHub è un **grande armadio su internet** dove tieni tutto il codice dei tuoi progetti.
Ogni progetto ha il suo **cassetto**, e il cassetto si chiama **repository** (o "repo").

👉 Il tuo corso, per esempio, è nel cassetto **`Corso`**.

### La magia: le fotografie 📸
Ogni volta che si cambia qualcosa, GitHub fa una **fotografia** del progetto.
Questa fotografia si chiama **commit**.

Perché è utile? Perché se un giorno qualcosa si rompe, puoi dire:
*"Torniamo com'era martedì!"* — e si torna indietro. **Non si perde mai niente.**

### I rami 🌳
A volte si vuole provare una modifica **senza rovinare** la versione buona.
Allora si crea un **ramo** (in inglese *branch*): è come fare una **fotocopia** del progetto e scarabocchiare sulla fotocopia.
- Se la modifica è venuta bene → si unisce alla versione principale (si chiama **merge**).
- Se è venuta male → si butta la fotocopia, e l'originale è intatto.

Il ramo principale di solito si chiama **`main`**.

### La richiesta di unione (Pull Request) 🙋
Quando Claude finisce un lavoro su un ramo, può aprire una **Pull Request** (PR).
È come dire: *"Ho finito, guarda cosa ho fatto. Se ti piace, lo uniamo."*
👉 **Sei sempre tu a decidere** se accettare.

### Pubblico o privato? 🔓🔒
- **Pubblico**: chiunque nel mondo può vedere il codice (non modificarlo).
- **Privato**: lo vedi solo tu e chi inviti.

> 🛡️ **Sicurezza:** se un progetto contiene idee che vuoi tenere per te, rendilo **privato**.
> E ricorda: **anche in un repo privato non si mettono mai password** (vedi capitolo 9).

---

## 3. 🤖 Claude Code: il tuo assistente che costruisce

### Cos'è?
Claude Code è un **assistente** che sa programmare.
Tu gli scrivi in italiano normale cosa vuoi, e lui:
- legge il codice del tuo progetto,
- lo modifica,
- lo prova,
- salva le fotografie (commit) su GitHub.

È come avere un **muratore bravissimo**: tu dici *"voglio una finestra qui"*, e lui la costruisce.

### Cosa fa bene
- ✅ Creare pagine, pulsanti, moduli, lezioni.
- ✅ Spiegarti cosa fa un pezzo di codice.
- ✅ Trovare e correggere errori.
- ✅ Controllare la sicurezza del sito.

### Cosa devi fare tu
- 👀 **Leggere** quello che Claude ti propone prima di dire "sì".
- 🙋 **Chiedere** quando non capisci: *"Spiegamelo come a un bambino"* funziona benissimo!
- ✋ **Dire di no** se qualcosa non ti convince.

> 🛡️ **Sicurezza:** Claude ti chiederà il permesso prima di fare cose importanti
> (installare programmi, pubblicare online, cancellare file). **Leggi sempre cosa sta per fare** prima di confermare.

---

## 4. 📦 Supabase: il magazzino dei dati

### Cos'è?
Un sito spesso deve **ricordarsi delle cose**:
- chi si è iscritto al corso,
- a che lezione è arrivato ogni studente,
- chi ha superato l'esame.

Tutte queste informazioni vanno in un **magazzino** chiamato **database**.
Supabase è un servizio che ti dà questo magazzino già pronto, più altre cose utili:

| Funzione | Esempio semplice |
|---|---|
| 🗃️ **Database** | Un grande quaderno con tante tabelle (come Excel) |
| 🔑 **Autenticazione** (login) | Il **portiere** che controlla chi entra con email e password |
| 🖼️ **Storage** | Una **cantina** per foto, video, PDF |

### Le chiavi del magazzino 🔑
Supabase ti dà **due chiavi**. È **importantissimo** capire la differenza:

| Chiave | È come... | Si può mettere nel sito? |
|---|---|---|
| **anon / publishable** | La chiave del **portone d'ingresso**: apre solo le porte che hai deciso tu | ✅ Sì, ma **solo** se le regole RLS sono attive (vedi sotto) |
| **service_role / secret** | Il **passe-partout** che apre **TUTTO** | ❌ **MAI!** Non va mai nel codice del sito, mai su GitHub, mai in chat |

### Le regole del portiere (RLS) 🚧
**RLS** significa *Row Level Security* — "sicurezza riga per riga".
È come dire al portiere: *"Ogni studente può vedere **solo il suo** quaderno, non quello degli altri."*

> 🛡️ **Sicurezza:** **ogni tabella deve avere l'RLS attivo.** Senza RLS, chiunque abbia la chiave del portone
> potrebbe leggere i dati di tutti. Quando creeremo il database, Claude ti aiuterà a impostarlo e a controllarlo.

---

## 5. 🏠 Vercel: la casa del sito

### Cos'è?
Il codice su GitHub è come il **progetto di una casa disegnato su carta**: bello, ma nessuno ci può entrare.
**Vercel** prende quel progetto e **costruisce la casa vera su internet**, così chiunque può visitarla.
Questo si chiama **hosting** (ospitare il sito).

### La cosa più bella: è automatico ✨
Colleghi Vercel a GitHub **una volta sola**. Da quel momento:
1. Claude salva una modifica su GitHub,
2. Vercel se ne accorge da solo,
3. dopo circa un minuto il sito online è aggiornato.

Questo si chiama **deploy** (mettere online).

### Le anteprime 👀
Quando Claude lavora su un **ramo** (la fotocopia), Vercel crea un **sito di prova** con un indirizzo tutto suo.
Puoi guardarlo e provarlo **prima** che diventi il sito vero. Se non ti piace, il sito vero non cambia.

### L'indirizzo gratuito
Vercel ti regala subito un indirizzo tipo: **`corso.vercel.app`**.
Funziona benissimo, ma se vuoi un indirizzo tuo (www.caso.it), vedi il capitolo dopo.

> 💶 **Attenzione ai piani:** il piano gratuito di Vercel (**Hobby**) è pensato per progetti **personali e non commerciali**.
> Se il sito serve a **guadagnare** (vendere il corso, pubblicità…), serve il piano **Pro** (a pagamento).
> Controlla sempre i prezzi aggiornati sul sito di Vercel prima di partire.

---

## 6. 🪧 Il dominio: l'indirizzo di casa (www.caso.it)

### Cos'è?
Il **dominio** è l'**indirizzo** che le persone scrivono per trovare il tuo sito, per esempio `www.caso.it`.
Senza dominio, la casa esiste ma ha un indirizzo complicato (`corso.vercel.app`).

### Casa e indirizzo sono due cose diverse!
- 🏠 **Vercel** = la **casa** (dove vive il sito)
- 🪧 **Dominio** = l'**indirizzo** (come la gente ti trova)

L'indirizzo si **compra a parte** da un "registrar", per esempio **Aruba, Register.it, Namecheap, Cloudflare**.
Costa di solito **10–15 € all'anno** (per i `.it` e i `.com`). Si può comprare anche direttamente da Vercel.

### Come si collega? (in 4 passi)
1. **Compri** il dominio (es. `caso.it`) dal registrar.
2. Su **Vercel** apri il progetto → *Settings* → *Domains* → scrivi `www.caso.it` → *Add*.
3. Vercel ti mostra **una o due righe** da copiare (si chiamano **record DNS**).
4. Vai sul sito del registrar, nella sezione **DNS**, e incolli quelle righe.

Dopo un po' (da pochi minuti fino a qualche ora) il sito risponde all'indirizzo nuovo.
Vercel aggiunge da solo il **lucchetto 🔒 (HTTPS)**, che rende sicura la connessione.

> 📖 **Il DNS spiegato da bambino:** è come la **rubrica del telefono di internet**.
> Quando qualcuno scrive `www.caso.it`, la rubrica dice: *"Ah, quella casa è da Vercel, vai lì!"*

> 🛡️ **Sicurezza:** attiva la **verifica in due passaggi** anche sull'account del registrar, e il **rinnovo automatico**.
> Se il dominio scade, qualcun altro potrebbe comprarlo!

---

## 7. 🔗 Come lavorano tutti insieme

```
   🧑 Matteo
     │  "Aggiungi una lezione sul marketing"
     ▼
   🤖 Claude Code  ──── scrive il codice
     │
     ▼
   🗄️ GitHub  ──────── conserva il codice e le fotografie (commit)
     │
     ▼  (automatico)
   🏠 Vercel  ──────── mette il sito online
     │         ▲
     │         └──── 📦 Supabase: il sito legge/scrive i dati (iscritti, progressi)
     ▼
   🪧 www.caso.it  ─── le persone visitano il sito 🎉
```

In parole semplici:
**Tu chiedi → Claude costruisce → GitHub conserva → Vercel pubblica → Supabase ricorda → la gente visita.**

---

## 8. 👤 Creare gli account passo passo

Fai **un account alla volta**, con calma. Per ognuno trovi una ✅ lista di controllo.

### Prima di tutto: due cose da preparare
1. 📧 **Un'email** che usi davvero (riceverai codici e avvisi importanti).
2. 🔐 **Un gestore di password** (password manager), per esempio **Bitwarden** (gratuito), **1Password** o quello di Apple/Google.
   È una **cassaforte** che ricorda tutte le password per te, così puoi usarne una diversa e lunghissima per ogni sito.
3. 📱 **Un'app di autenticazione** sul telefono, per esempio **Google Authenticator**, **Microsoft Authenticator** o **Authy**.
   Serve per la **verifica in due passaggi** (vedi capitolo 9).

### A) GitHub (ce l'hai già! ✅)
Il tuo account GitHub esiste già (è dove sta il progetto `Corso`). Controlla solo questo:
- [ ] Vai su **github.com** → foto profilo in alto a destra → **Settings** → **Password and authentication**.
- [ ] Attiva la **Two-factor authentication (2FA)** con l'app di autenticazione.
- [ ] **Salva i codici di recupero** (*recovery codes*) nel password manager. Se perdi il telefono, ti salvano!

### B) Vercel
- [ ] Vai su **vercel.com** → **Sign Up**.
- [ ] Scegli **"Continue with GitHub"** (così usi l'account che hai già, con la sua sicurezza).
- [ ] Quando chiede quali repository può vedere, scegli **"Only select repositories"** e seleziona **solo** `Corso`.
      (Dai accesso solo a quello che serve, niente di più!)
- [ ] Clicca **Import** sul progetto `Corso` → lascia le impostazioni proposte → **Deploy**.
- [ ] Dopo un minuto avrai il tuo sito su `qualcosa.vercel.app` 🎉
- [ ] Nelle impostazioni dell'account Vercel attiva anche lì la **verifica in due passaggi**.

### C) Supabase (quando servirà salvare dati)
> Il corso per ora funziona **senza** database. Supabase servirà quando vorremo aggiungere login o salvare i progressi online.
- [ ] Vai su **supabase.com** → **Start your project** → **Continue with GitHub**.
- [ ] Crea un **nuovo progetto**, scegli la regione **Europa** (es. Francoforte) — più vicina e più adatta per il GDPR.
- [ ] Ti chiederà una **password del database**: falla generare e **salvala subito nel password manager**.
- [ ] Attiva la **verifica in due passaggi** nelle impostazioni dell'account.
- [ ] ⚠️ Il piano gratuito **mette in pausa** i progetti non usati per un po' di tempo: niente paura, si riattivano dal pannello.

### D) Il dominio (solo quando sei pronto)
- [ ] Scegli il nome (corto, facile da scrivere, senza trattini se possibile).
- [ ] Compralo da un registrar (Aruba, Register.it, Namecheap, Cloudflare…) o da Vercel.
- [ ] Attiva **2FA** e **rinnovo automatico**.
- [ ] Collegalo a Vercel come spiegato nel capitolo 6.

---

## 9. 🛡️ Le regole d'oro della sicurezza

Imparale a memoria. Sono come le regole per attraversare la strada. 🚦

### 1. 🔐 Una password diversa per ogni sito
Se un ladro scopre una password, **non deve aprire anche le altre porte**. Usa il password manager.

### 2. 📱 Verifica in due passaggi (2FA) OVUNQUE
Oltre alla password serve un **codice dal telefono**. Anche se un ladro ruba la password, **senza il tuo telefono non entra**.
Attivala su: GitHub, Vercel, Supabase, registrar del dominio, email.

### 3. 🤫 Le chiavi segrete non si mostrano MAI
Le "chiavi segrete" (API key, `service_role`, password del database, token) sono come il **PIN del bancomat**:
- ❌ **Mai** scriverle nel codice.
- ❌ **Mai** metterle su GitHub (nemmeno in un repo privato).
- ❌ **Mai** incollarle in chat, email, WhatsApp — **nemmeno a Claude**.
- ✅ Si mettono **solo** nelle impostazioni sicure: su Vercel in *Settings → Environment Variables*.
  Il file sul computer si chiama `.env` ed è **già escluso** da GitHub nel progetto Corso.

> 😱 **Se per sbaglio una chiave finisce online:** niente panico, ma **agisci subito**.
> Vai sul servizio (Supabase, ecc.), **genera una chiave nuova** e cancella quella vecchia. Poi avvisa Davide.
> Cancellare il file non basta: le "fotografie" di GitHub la ricordano ancora!

### 4. 👀 Leggi prima di dire "sì"
Quando Claude (o qualsiasi programma) ti chiede un permesso, **leggi cosa sta per fare**.
Se non capisci, chiedi: *"Cosa succede se dico sì? Si può tornare indietro?"*

### 5. 🎣 Attenzione alle esche (phishing)
Email del tipo *"Il tuo account GitHub sarà chiuso, clicca qui!"* sono quasi sempre **truffe**.
- Non cliccare sui link nelle email strane.
- Vai tu sul sito scrivendo l'indirizzo a mano.
- GitHub, Vercel e Supabase **non ti chiederanno mai la password via email**.

### 6. 🧩 Installa solo cose fidate
Su internet ci sono tanti "programmi aggiuntivi" (pacchetti, plugin, skill). Alcuni possono essere pericolosi.
Prima di installare qualcosa, chiedi a Claude: *"È affidabile? Chi l'ha fatto? Cosa fa?"*
Preferisci sempre le fonti **ufficiali**.

### 7. 🧪 Prova prima sull'anteprima
Ogni modifica va **guardata sull'anteprima di Vercel** prima di finire sul sito vero.

### 8. 👥 Dati delle persone = responsabilità
Se il sito raccoglie email o nomi di persone, devi proteggerli e rispettare il **GDPR** (la legge europea sulla privacy).
Raccogli **solo i dati che servono davvero**. Quando arriveremo a quel punto, ne parleremo bene insieme.

---

## 10. 💬 Come parlare con Claude

Claude capisce l'italiano normale. Più sei chiaro, meglio lavora.

### Frasi che funzionano benissimo
- 🧒 *"Spiegamelo come se fossi un bambino."*
- 🗺️ *"Prima dimmi cosa vuoi fare, poi aspetta il mio ok."*
- 🛡️ *"Questa modifica è sicura? Ci sono rischi?"*
- ↩️ *"Se qualcosa va storto, come torniamo indietro?"*
- 👀 *"Fammi vedere come viene prima di pubblicarlo."*
- 🔍 *"Controlla la sicurezza del sito."*

### Un buon esempio di richiesta
> ❌ *"Fai il sito più bello."* (troppo vago)
>
> ✅ *"Nella pagina iniziale del corso vorrei un pulsante grande e verde con scritto 'Inizia ora'.
> Prima mostrami cosa cambi, poi aspetta il mio ok."*

### Cose da NON fare
- ❌ Non incollare **password o chiavi segrete** in chat.
- ❌ Non dire "sì" a tutto senza leggere.
- ❌ Non chiedere di copiare siti o contenuti di altri: si costruisce roba **tua**.

---

## 11. 📖 Il piccolo dizionario

| Parola | Cosa vuol dire (da bambino) |
|---|---|
| **Codice** | Le istruzioni scritte che dicono al computer cosa fare, come una ricetta 🍝 |
| **Repository (repo)** | Il cassetto di GitHub dove sta un progetto 🗄️ |
| **Commit** | Una fotografia del progetto in un certo momento 📸 |
| **Branch (ramo)** | Una fotocopia su cui provare modifiche senza rovinare l'originale 🌳 |
| **Main** | Il ramo principale, la versione "buona" ⭐ |
| **Pull Request (PR)** | "Ho finito, guarda e decidi se unirlo" 🙋 |
| **Merge** | Unire la fotocopia alla versione principale 🤝 |
| **Push** | Mandare le fotografie dal computer a GitHub ⬆️ |
| **Deploy** | Mettere il sito online 🚀 |
| **Hosting** | La casa su internet dove vive il sito 🏠 |
| **Dominio** | L'indirizzo del sito (www.caso.it) 🪧 |
| **DNS** | La rubrica di internet che collega l'indirizzo alla casa 📒 |
| **HTTPS / SSL** | Il lucchetto 🔒 che rende sicura la connessione |
| **Database** | Il magazzino/quaderno dove il sito ricorda le cose 📦 |
| **RLS** | Le regole del portiere: ognuno vede solo i suoi dati 🚧 |
| **API key / chiave** | Una password speciale per i programmi — segreta come il PIN! 🤫 |
| **Variabili d'ambiente** | Il posto sicuro dove si nascondono le chiavi segrete 🗝️ |
| **`.env`** | Il file sul computer con le chiavi segrete — non va mai su GitHub 🚫 |
| **2FA** | Verifica in due passaggi: password + codice dal telefono 📱 |
| **Phishing** | Una truffa via email o messaggio per rubarti la password 🎣 |
| **Frontend** | La parte del sito che le persone vedono (la vetrina) 🪟 |
| **Backend** | La parte nascosta che lavora dietro (il retrobottega) ⚙️ |
| **Bug** | Un errore nel codice 🐛 |

---

## ✅ La tua prima missione

1. [ ] Installa un **password manager** e un'**app di autenticazione**.
2. [ ] Attiva la **2FA su GitHub** e salva i codici di recupero.
3. [ ] Crea l'account **Vercel** con GitHub e metti online il progetto `Corso`.
4. [ ] Apri il link `.vercel.app` e guarda il tuo corso online! 🎉
5. [ ] Scrivi a Claude: *"Ciao, sono Matteo, ho letto la guida. Qual è il prossimo passo?"*

Bravo Matteo, ce la farai alla grande! 💪
Ricorda: **nessuna domanda è stupida**, e **la sicurezza viene sempre prima**. 🛡️
