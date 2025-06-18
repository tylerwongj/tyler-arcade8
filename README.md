# Tyler Arcade - Multiplayer Game Hub

A central hub for multiplayer games with rapid prototyping and community-driven development.

## 🎮 Features
- **Game Hub**: Central directory of all Tyler Arcade games
- **Rating System**: Community ratings for Fun and Functionality
- **Mobile Responsive**: Hamburger menu and mobile-optimized design
- **Theme Support**: Dark/Light mode toggle
- **Rapid Deployment**: Automated build script pulls latest games from GitHub

## 🚀 Development

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

### Deploy to Railway
1. Connect your GitHub repo to Railway
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Railway will automatically pull games from GitHub repos during build

## 📁 Project Structure
```
tyler-arcade8/
├── index.html          # Main hub interface
├── script.js           # Hub functionality
├── style.css           # Hub styling
├── games-data.js       # Game metadata
├── build.js            # Production build script
└── dist/               # Built files (auto-generated)
    ├── games/          # Downloaded games
    └── ...             # Hub files
```

## 🔧 Configuration

Update GitHub repo URLs in `build.js`:
```javascript
const GITHUB_REPOS = {
  'power-pong': 'https://raw.githubusercontent.com/your-username/power-pong/main',
  'wordle-blitz': 'https://raw.githubusercontent.com/your-username/wordle-blitz/main',
  // ... add your game repos
};
```

## 🎯 Mission
Creating multiplayer games for everyone through rapid iteration. Games are built **AS FAST AS POSSIBLE** and released for immediate playtesting. Community feedback drives which games get expanded into full experiences.

## 💖 Support
Tyler Arcade is free for all players. Consider supporting development via Patreon or one-time contributions to help maintain servers and expand the game library.

Built with passion by Tyler, one game at a time. 🚀