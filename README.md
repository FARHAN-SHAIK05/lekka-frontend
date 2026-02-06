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
