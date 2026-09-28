# Auto-Drive Accessories — Full Store

A full-stack e-commerce site for Auto-Drive Accessories (Kirinyaga Road, Nairobi):
React frontend, Express + SQLite backend, and Flutterwave payments (card + M-Pesa).

## Structure

```
auto-drive-accessories/
├── client/     React (Vite) frontend — catalog, cart, checkout
└── server/     Express API — products, orders, payments, database
```

## 1. Get a Flutterwave account (free, ~10 minutes)

1. Sign up at https://dashboard.flutterwave.com/signup
2. Once in, switch to **Test Mode** (toggle top-left of the dashboard).
3. Go to **Settings → API Keys** and copy your **Test Secret Key** and **Test Public Key**.
4. Go to **Settings → Webhooks**, set any random string as your **Secret Hash**, and save it —
   you'll paste this same string into your server's `.env` file.

Test mode lets you simulate M-Pesa and card payments without moving real money — use it until
you're ready to go live, then switch to your live keys.

## 2. Set up the server

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and paste in your Flutterwave test keys and webhook secret hash from step 1.

```bash
npx prisma migrate dev --name init
npm run seed
npm run dev
```

The API is now running at `http://localhost:4000`. Leave this terminal running.

## 3. Set up the client

Open a **second terminal**:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` — that's the storefront.

## 4. Test a payment

Add something to the cart, go to checkout, fill in the form, and pay. Flutterwave's test mode
will show you sample card numbers and a simulated M-Pesa flow — no real charges happen.
Reference: https://developer.flutterwave.com/docs/integration-guides/testing-helpers

## 5. Webhooks (optional but recommended)

The `/api/payments/verify/:txRef` endpoint (used automatically on the success page) is enough to
get started. For production, also wire up the webhook so payments are recorded even if a customer
closes their browser before the redirect completes:

1. Run `npx ngrok http 4000` (or deploy the server somewhere with a public URL).
2. In the Flutterwave dashboard, set the webhook URL to `https://<your-url>/api/payments/webhook`.
3. Make sure the Secret Hash there matches `FLW_WEBHOOK_HASH` in your `.env`.

## Editing the catalog

Products live in the database, seeded from `server/src/seed.js`. Edit that file and re-run
`npm run seed` to update names, prices, or add new items — no frontend changes needed, the
catalog page always reflects what's in the database.

## Going live

- Deploy `server/` somewhere with a persistent filesystem or switch `DATABASE_URL` to a hosted
  Postgres/MySQL database (Prisma supports both — change the `provider` in `prisma/schema.prisma`).
- Deploy `client/` (e.g. `npm run build`, then host the `dist/` folder) and point it at your
  deployed API — update the fetch base in `client/src/api.js` if it's not on the same domain.
- Switch Flutterwave to Live Mode and swap in your live API keys.
