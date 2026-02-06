# Lekka Frontend

**Friendship is precious. Money is Math.**

A modern React application for tracking money between friends without the awkwardness.

## Features

- ⚡ **Drop the Lekka**: Log transactions in 5 seconds
- 🔗 **No App Required**: Friends confirm via simple link (no app install needed)
- 🔔 **Smart Nudges**: Automated reminders without being annoying
- 💰 **Net Balance Magic**: Automatically calculates who owes what
- 🎁 **Gift Pooling**: Track group expenses for birthdays, trips, etc.
- 📊 **Dashboard**: Clear overview of all your Lekkas
- 👥 **Friends Management**: See net balances with each friend
- 📱 **Mobile Responsive**: Works perfectly on all devices

## Tech Stack

- **React 18** - Modern React with Hooks
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Java backend running on `http://localhost:8080`

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lekka-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint:
Open `src/api/api.js` and update the `API_BASE_URL` to match your backend URL:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Backend Integration

This frontend expects a Java + MySQL backend with the following API endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Lekkas
- `POST /api/lekkas` - Create new Lekka
- `GET /api/lekkas` - Get all Lekkas for user
- `GET /api/lekkas/:id` - Get specific Lekka
- `PUT /api/lekkas/:id` - Update Lekka
- `DELETE /api/lekkas/:id` - Delete Lekka
- `POST /api/lekkas/confirm/:linkId` - Confirm Lekka (public)
- `POST /api/lekkas/:id/settle` - Mark as settled
- `POST /api/lekkas/:id/remind` - Send reminder
- `POST /api/lekkas/:id/proof` - Upload payment proof

### Friends
- `GET /api/friends` - Get all friends
- `POST /api/friends` - Add friend
- `GET /api/friends/:id` - Get friend details
- `GET /api/friends/:id/balance` - Get net balance with friend

### Groups
- `POST /api/groups` - Create group pool
- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get group details
- `POST /api/groups/:id/contribute` - Add contribution

### Statistics
- `GET /api/stats/dashboard` - Dashboard statistics
- `GET /api/stats/monthly` - Monthly stats

## Project Structure

```
lekka-frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.js                 # API configuration & endpoints
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Auth.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   ├── Lekka/
│   │   │   ├── CreateLekka.jsx
│   │   │   ├── LekkaDetails.jsx
│   │   │   ├── ConfirmLekka.jsx
│   │   │   └── Lekka.css
│   │   ├── Friends/
│   │   │   ├── Friends.jsx
│   │   │   └── Friends.css
│   │   ├── Group/
│   │   │   ├── GroupPool.jsx
│   │   │   └── Group.css
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   └── Profile/
│   │       ├── Profile.jsx
│   │       └── Profile.css
│   ├── App.jsx                    # Main App component with routing
│   ├── App.css                    # Global styles
│   ├── index.jsx                  # Entry point
│   └── index.css                  # Base styles
├── package.json
└── README.md
```

## Key Features Explained

### 1. Authentication
- JWT-based authentication
- Token stored in localStorage
- Automatic token injection in API calls
- Protected routes with authentication checks

### 2. Lekka Creation
- Create Lekkas with new or existing friends
- Choose between "I Gave" (lent) or "I Took" (borrowed)
- Optional description and due date
- Automatic confirmation link generation

### 3. Confirmation Flow
- Friends receive confirmation link via SMS/WhatsApp
- No app install required
- One-tap confirmation
- Updates creator's dashboard in real-time

### 4. Smart Reminders
- Automated reminder system
- Friendly nudges (not aggressive)
- "It's not me asking, it's the app" strategy

### 5. Net Balance Calculation
- Automatic calculation of net balance per friend
- Shows who owes whom overall
- Clear visualization with +/- indicators

### 6. Gift Pools
- Create pools for group expenses
- Track contributions
- Progress visualization
- Perfect for birthdays, trips, shared bills

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_NAME=Lekka
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Deployment

The build can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

Example deployment to Vercel:
```bash
npm install -g vercel
vercel --prod
```

## Color Scheme

The app uses a modern dark theme with Lekka's brand colors:

- **Primary**: `#00ff88` (Lekka Green)
- **Background**: `#0f0f1e` (Dark Navy)
- **Card Background**: `#16213e`
- **Text**: `#ffffff` (White)
- **Secondary Text**: `#a8a8b8` (Gray)
- **Success**: `#00ff88`
- **Warning**: `#ffbb00`
- **Danger**: `#ff4444`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Philosophy

> "₹2,000 in cash, priceless in trust. Your friend didn't ask for proof — don't make them regret it."
> 
> — The Lekka Philosophy

Lekka keeps your friendships intact while making sure the math is clear. No more awkward money conversations. Just clarity.

## Support

For issues and questions:
- Create an issue on GitHub
- Email: support@lekka.app
- Twitter: @LekkaApp

---

Made with 💚 in India
