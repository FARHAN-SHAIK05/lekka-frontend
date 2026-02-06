# Lekka Frontend - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd lekka-frontend
npm install
```

### Step 2: Configure Backend URL
Open `src/api/api.js` and update line 4:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';  // Change this to your backend URL
```

### Step 3: Start the Development Server
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
lekka-frontend/
├── src/
│   ├── components/       # All React components
│   ├── api/             # API configuration
│   ├── App.jsx          # Main app with routing
│   └── App.css          # Global styles
├── public/              # Static files
└── package.json         # Dependencies
```

## 🎨 Key Features

### 1. Dashboard
- View all Lekkas at a glance
- Net balance summary
- Quick actions

### 2. Create Lekka
- Add new or select existing friend
- Choose "I Gave" or "I Took"
- Optional description and due date

### 3. Confirmation Flow
- Friend receives link via SMS
- No app installation required
- One-tap confirmation

### 4. Friends Management
- See net balance with each friend
- Filter by "They Owe You" or "You Owe Them"
- Add new Lekkas easily

### 5. Group Pools
- Create gift pools
- Track contributions
- Progress visualization

## 🔧 Configuration Options

### Change API Base URL
In `src/api/api.js`:
```javascript
const API_BASE_URL = 'https://your-backend.com/api';
```

### Change Port
Create `.env` file:
```
PORT=3001
```

### Disable Auto-Open Browser
Add to `.env`:
```
BROWSER=none
```

## 📱 Testing on Mobile

### Local Network Testing
1. Find your local IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
2. Access app from mobile: `http://YOUR_IP:3000`
3. Make sure both devices are on same network

## 🏗️ Building for Production

```bash
npm run build
```

Creates optimized build in `build/` folder.

## 🚢 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 🔐 Security Notes

1. **Never commit sensitive data** to git
2. **Use environment variables** for API URLs in production
3. **Enable HTTPS** in production
4. **Implement rate limiting** on backend
5. **Validate all inputs** on both frontend and backend

## 📋 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (⚠️ irreversible)
npm run eject
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API Connection Issues
1. Check backend is running
2. Verify API_BASE_URL is correct
3. Check CORS settings on backend
4. Look for errors in browser console (F12)

### Build Errors
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear npm cache: `npm cache clean --force`

## 📚 Learn More

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## 💡 Tips

1. **Use browser DevTools** (F12) to debug
2. **Check Network tab** for API call issues
3. **Use React DevTools** extension
4. **Enable source maps** for better debugging
5. **Test on multiple devices** before deploying

## 🎯 Next Steps

1. ✅ Set up backend API
2. ✅ Configure SMS service for confirmation links
3. ✅ Test all user flows
4. ✅ Deploy to production
5. ✅ Monitor and iterate

## 📞 Support

Need help? Check:
- README.md for detailed information
- API_DOCUMENTATION.md for backend requirements
- GitHub Issues for bug reports

---

Happy coding! 🚀

Remember: "Friendship is precious. Money is Math."
