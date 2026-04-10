# Heart Monitor App (PCE)

A mobile application for tracking blood pressure and heart rate measurements, with history charts, medical reminders, and an educational reference — backed by a Node.js/Express REST API deployed on Heroku.

## Features

- **Add Measure** — record systolic pressure, diastolic pressure, heart rate (bpm), measurement arm, and timestamp; automatic out-of-range warnings are shown on submission
- **History** — view all measurements in line charts (systolic, diastolic, bpm) and a sortable data table; filter by last 7 / 15 / 30 days or all time; edit or delete individual records; export a PDF medical report
- **Notifications** — create dated reminders (e.g. "remember to take your reading"), view and delete past notifications
- **About Blood Pressure** (`press_info`) — FAQ-style reference covering what blood pressure is, how to prepare for a measurement, why it matters, risk factors, and lifestyle tips

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile frontend | React Native + Expo Router |
| Language | TypeScript |
| Backend | Node.js / Express |
| Database | MongoDB (Mongoose) |
| Hosting | Heroku (`node-back-heartapp-5ce41f94a227.herokuapp.com`) |
| Charts | react-native-chart-kit |
| PDF export | pdf-lib + react-native-view-shot |

## Run Locally

### Backend

```bash
npm install
node backend.js
# Server starts on port 3000 by default
```

The backend exposes two route groups:
- `GET/POST/PUT/DELETE /api/registos` — blood pressure / heart rate records
- `GET/POST/DELETE /api/notificacoes` — reminder notifications

### Mobile app

```bash
cd heart-app
npm install
npx expo start
```

Open the Expo Go app on your device, or press `w` to run in the browser.

> **Note:** the mobile app currently points at the Heroku backend. To use your local backend, update the `axios` base URL in the screen files from `https://node-back-heartapp-5ce41f94a227.herokuapp.com` to `http://localhost:3000`.

## Project Structure

```
Aplicacao_PCE_React/
├── backend.js              # Express entry point
├── db.js                   # MongoDB connection
├── Procfile                # Heroku process file
├── package.json
├── modelos/
│   ├── registo.js          # Mongoose schema — blood pressure record
│   └── notificacao.js      # Mongoose schema — notification
├── rotas/
│   ├── registos.js         # REST routes for records
│   └── notificacoes.js     # REST routes for notifications
└── heart-app/              # Expo / React Native app
    ├── app/
    │   ├── _layout.tsx
    │   ├── index.tsx        # Home screen
    │   ├── add_measure.tsx  # Add a new measurement
    │   ├── history.tsx      # Charts, table, PDF export
    │   ├── notifications.tsx# Reminders
    │   └── press_info.tsx   # Blood pressure FAQ
    ├── assets/
    ├── components/
    ├── scripts/
    │   ├── filter_dates.js  # Date-range filtering helper
    │   └── not_to_calendar.js
    └── package.json
```
