# Lekka Frontend Setup Checklist ✓

Follow this checklist to get your Lekka frontend up and running.

## ✅ Prerequisites

- [ ] Node.js installed (v14 or higher)
- [ ] npm or yarn installed
- [ ] Java backend running on `http://localhost:8080`
- [ ] MySQL database configured
- [ ] Code editor (VS Code recommended)

## ✅ Installation Steps

### 1. Extract and Navigate
- [ ] Extract the `lekka-frontend` folder
- [ ] Open terminal/command prompt
- [ ] Navigate to the project: `cd lekka-frontend`

### 2. Install Dependencies
```bash
npm install
```
- [ ] Wait for installation to complete (may take 2-3 minutes)
- [ ] Check for any error messages

### 3. Configure Backend Connection
- [ ] Open `src/api/api.js` in your editor
- [ ] Update line 4 with your backend URL:
  ```javascript
  const API_BASE_URL = 'http://localhost:8080/api';
  ```
- [ ] Save the file

### 4. Start Development Server
```bash
npm start
```
- [ ] Browser should open automatically at `http://localhost:3000`
- [ ] If not, manually open `http://localhost:3000`

## ✅ Verify Everything Works

### Test Authentication
- [ ] Click "Sign up" or navigate to `/register`
- [ ] Fill in the registration form
- [ ] Submit and check if you're redirected to dashboard
- [ ] Try logging out and logging back in

### Test Dashboard
- [ ] View dashboard statistics
- [ ] Check if UI loads properly
- [ ] Verify navigation menu works

### Test Create Lekka
- [ ] Click "+ Add Lekka" button
- [ ] Fill in the form with test data
- [ ] Submit and check if Lekka is created
- [ ] Verify confirmation link is generated

### Test Confirmation Flow
- [ ] Copy the confirmation link from a Lekka
- [ ] Open it in a new incognito/private window
- [ ] Confirm the Lekka
- [ ] Check if status updates in dashboard

### Test Friends Page
- [ ] Navigate to Friends page
- [ ] Verify friends list displays
- [ ] Check net balance calculations
- [ ] Test filter tabs

### Test Profile
- [ ] Navigate to Profile page
- [ ] Try editing profile information
- [ ] Verify logout works

## ✅ Backend Integration Checklist

Ensure your Java backend has these endpoints:

### Authentication
- [ ] `POST /api/auth/register`
- [ ] `POST /api/auth/login`
- [ ] `GET /api/auth/me`

### Lekkas
- [ ] `POST /api/lekkas`
- [ ] `GET /api/lekkas`
- [ ] `GET /api/lekkas/:id`
- [ ] `POST /api/lekkas/confirm/:linkId`
- [ ] `POST /api/lekkas/:id/settle`
- [ ] `POST /api/lekkas/:id/remind`
- [ ] `DELETE /api/lekkas/:id`

### Friends
- [ ] `GET /api/friends`
- [ ] `POST /api/friends`
- [ ] `GET /api/friends/:id/balance`

### Groups
- [ ] `POST /api/groups`
- [ ] `GET /api/groups`
- [ ] `POST /api/groups/:id/contribute`

### Statistics
- [ ] `GET /api/stats/dashboard`

## ✅ Common Issues & Solutions

### Issue: Port 3000 already in use
**Solution:**
```bash
# Kill the process
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try again
npm install
```

### Issue: Cannot connect to backend
**Checks:**
- [ ] Backend server is running
- [ ] Backend is accessible at the URL you configured
- [ ] CORS is enabled on backend for `http://localhost:3000`
- [ ] No firewall blocking the connection
- [ ] Check browser console (F12) for error messages

### Issue: White screen after build
**Solution:**
- [ ] Check browser console for errors
- [ ] Verify all imports are correct
- [ ] Make sure API_BASE_URL is set correctly
- [ ] Clear browser cache

### Issue: JWT token expired
**Solution:**
- [ ] Logout and login again
- [ ] Check token expiration time on backend
- [ ] Verify token is being sent in Authorization header

## ✅ Mobile Testing

### Local Network Access
- [ ] Find your computer's local IP address
  - Windows: `ipconfig`
  - Mac: `ifconfig | grep "inet "`
  - Linux: `ip addr show`
- [ ] Make sure mobile device is on same WiFi network
- [ ] Access from mobile: `http://YOUR_IP:3000`
- [ ] Test all major features on mobile

## ✅ Production Deployment Checklist

### Before Deploying
- [ ] Run `npm run build` successfully
- [ ] Test the production build locally
- [ ] Update API_BASE_URL to production backend URL
- [ ] Set up environment variables
- [ ] Enable HTTPS
- [ ] Configure proper CORS on backend
- [ ] Set up error logging (Sentry, LogRocket, etc.)
- [ ] Test on multiple devices and browsers

### Deployment Options
- [ ] Vercel (Recommended)
- [ ] Netlify
- [ ] AWS S3 + CloudFront
- [ ] Firebase Hosting
- [ ] Traditional hosting (Apache/Nginx)

### Post-Deployment
- [ ] Test all features in production
- [ ] Verify API calls work correctly
- [ ] Check mobile responsiveness
- [ ] Monitor for errors
- [ ] Set up analytics (Google Analytics, etc.)

## ✅ Security Checklist

- [ ] Never commit `.env` files to git
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS in production
- [ ] Implement proper CORS policies
- [ ] Validate all inputs on both frontend and backend
- [ ] Implement rate limiting on backend
- [ ] Use secure JWT tokens with proper expiration
- [ ] Sanitize user inputs to prevent XSS
- [ ] Keep dependencies updated

## ✅ Performance Checklist

- [ ] Images are optimized
- [ ] Lazy loading implemented where needed
- [ ] Code splitting configured
- [ ] Bundle size is reasonable (<500KB)
- [ ] API calls are optimized
- [ ] Loading states implemented
- [ ] Error boundaries in place

## ✅ Documentation

- [ ] README.md reviewed
- [ ] API_DOCUMENTATION.md shared with backend team
- [ ] QUICK_START.md for new developers
- [ ] Code comments where necessary
- [ ] Component documentation

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console (F12) for errors
2. Check the network tab for failed API calls
3. Review the API_DOCUMENTATION.md
4. Check backend logs for errors
5. Refer to the troubleshooting section in QUICK_START.md

## 🎉 Success Criteria

You're ready to go when:
- [ ] App loads without errors
- [ ] You can register and login
- [ ] You can create and view Lekkas
- [ ] Confirmation links work
- [ ] Friends list displays correctly
- [ ] Dashboard shows accurate statistics
- [ ] All navigation works smoothly
- [ ] Mobile view is responsive

---

## 🚀 You're All Set!

Once all checkboxes are ticked, your Lekka frontend is ready to use!

Remember: "Friendship is precious. Money is Math." 💚
