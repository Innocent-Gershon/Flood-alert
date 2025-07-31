# 🌊 Inclusive Real-Time Flood Alert Platform for Vulnerable Communities in Ghana
## 🛠️ Setup: Backend

```bash
cd ../backend
npm install
```

### 🔐 Create `.env` file inside `backend/`

```env
PORT=5050
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

> You can get Twilio credentials from your [Twilio Console](https://www.twilio.com/console).

### ▶️ To start the backend:

```bash
npm run dev
```

> Backend runs on: [http://localhost:5050](http://localhost:5050)

---
