# MGNREGA Tracker - Karnataka

A production-ready web application for tracking MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) performance data across Karnataka districts.

## 🎯 Features

- 📍 **Auto-location Detection** - Automatically detects user's district
- 🌍 **Bilingual Support** - Full English + Kannada translation
- 📊 **Interactive Charts** - Employment and expenditure trend visualization
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Production Ready** - Optimized for deployment

## 📁 Project Structure

```
mgnrega-tracker-karnataka/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── styles.css      # All CSS styles
│   └── js/
│       ├── app.js          # Main application logic
│       ├── data.js         # District data
│       └── translations.js # English + Kannada translations
├── backend/
│   ├── server.js           # Express API server
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment variables
├── deployment/
│   ├── nginx.conf          # Nginx configuration
│   ├── ecosystem.config.js # PM2 configuration
│   └── deploy.sh           # Deployment script
├── README.md
├── LICENSE
└── .gitignore
```

## 🚀 Quick Start

### Option 1: Open Locally (No Installation)

```bash
# Clone or extract the project
cd mgnrega-tracker-karnataka

# Open in browser
open frontend/index.html
# Or double-click the index.html file
```

The app works immediately without any build process!

### Option 2: Deploy to GitHub Pages

```bash
cd mgnrega-tracker-karnataka
git init
git add .
git commit -m "Initial commit - MGNREGA Karnataka Tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mgnrega-karnataka.git
git push -u origin main

# Enable GitHub Pages
# Go to Settings → Pages → Source: main branch → /frontend folder
```

### Option 3: Full Stack Deployment

```bash
# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm start

# Production deployment
chmod +x deployment/deploy.sh
./deployment/deploy.sh
```

## 🗺️ Karnataka Districts Covered

1. Bangalore Urban
2. Bangalore Rural
3. Mysuru
4. Mangaluru
5. Hubli
6. Dharwad
7. Belgaum
8. Gulbarga

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js
- **Backend**: Node.js, Express (optional)
- **Database**: MongoDB (optional)
- **Deployment**: Nginx, PM2

## 📊 Data Structure

Each district contains:
- Total Workers
- Job Cards Issued
- Person-Days Generated
- Total Expenditure
- SC/ST/Women Person-Days
- Works Completed
- Active Job Seekers
- Average Days per Household
- 6-month employment trend
- 6-month expenditure trend

## 🌐 Bilingual Support

Complete translation in:
- English
- Kannada (ಕನ್ನಡ)

Switch languages anytime using the language selector in the header.

## 📱 Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Touch-optimized for smartphones
- Large buttons for accessibility

## 🎨 Design Features

- Clean, modern UI
- Color-coded metrics (Blue, Green, Purple, Orange)
- Interactive hover effects
- Smooth animations
- High contrast for readability

## 🔧 Customization

### Adding New Districts

Edit `frontend/js/data.js`:

```javascript
districtData['New District'] = {
    workers: 100000,
    jobCards: 150000,
    // ... other fields
};
```

### Changing Colors

Edit `frontend/css/styles.css` - modify color variables in metric cards

### Adding New Languages

Edit `frontend/js/translations.js`:

```javascript
translations['hi'] = {
    appTitle: "मनरेगा ट्रैकर",
    // ... other translations
};
```

## 📝 License

MIT License - See LICENSE file

## 👨‍💻 Author

**Mohammed Sofi**  
Build For Bharat Fellowship 2026 Applicant

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ for Rural Karnataka**
