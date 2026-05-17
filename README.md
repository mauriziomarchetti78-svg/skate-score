# 🛼 Skate Score — PWA v2

Gestione gare di pattinaggio su rotelle · AICS e UISP · Categoria Professional

---

## File del pacchetto

```
skate-score-v2-pwa/
├── index.html          ← Tutta l'app (HTML + CSS + JS)
├── manifest.json       ← Config PWA (nome, icone, colori)
├── sw.js               ← Service Worker (cache offline)
├── icon-192.svg        ← Icona piccola
├── icon-512.svg        ← Icona grande
├── icon-maskable.svg   ← Icona adattiva Android
└── README.md           ← Questo file
```

---

## Pubblicazione gratuita (scegli uno)

### ⭐ Netlify — più semplice, 30 secondi
1. Vai su **https://netlify.com** → crea account gratuito
2. Trascina la cartella `skate-score-v2-pwa` nella dashboard
3. Ottieni un URL tipo `https://skate-score.netlify.app`
4. Apri dal telefono → compare il banner di installazione

### GitHub Pages — gratuito
1. Crea repo su **https://github.com** (es. `skate-score`)
2. Carica tutti i file
3. Settings → Pages → Branch: main → Root
4. URL: `https://tuonome.github.io/skate-score`

> ⚠️ La PWA richiede **HTTPS** — entrambi i servizi lo hanno incluso.

---

## Installazione sul telefono

### 📱 Android (Chrome)
1. Apri l'URL in Chrome
2. Comparirà il banner **"Installa Skate Score ↓"** in basso
3. Oppure: menu ⋮ → **Aggiungi a schermata Home**
4. L'icona appare come un'app normale

### 🍎 iPhone / iPad (Safari — obbligatorio)
1. Apri l'URL in **Safari** (non Chrome)
2. Dopo 3 secondi appare il suggerimento automatico
3. Oppure: tocca **□↑ Condividi** → **Aggiungi a schermata Home**
4. Conferma → icona sulla home screen

### 💻 Desktop (Chrome / Edge)
- Compare un'icona di installazione nella barra degli indirizzi
- Oppure: menu → **Installa Skate Score**

---

## Funzionamento offline

Dopo la prima apertura con connessione:
- L'app funziona **completamente offline**
- I dati sono salvati sul dispositivo (localStorage)
- La generazione PDF funziona offline
- L'archivio gare è sempre accessibile

---

## Aggiornamenti

Per distribuire una nuova versione:
1. Modifica `index.html`
2. In `sw.js` cambia: `const CACHE_VERSION = 'skate-score-v3'`
3. Ricarica i file sul server
4. Gli utenti vedranno il banner **"Aggiornamento disponibile"**

---

Creato con ❤️ · Skate Score v2 · AICS & UISP
