const fs = require('fs-extra');
const fetch = require('node-fetch');
const path = require('path');

// Check if running locally
const isLocal = process.argv.includes('--local');

// Configuration - GitHub URLs for your game repositories
const GITHUB_REPOS = {
  'power-pong': 'https://raw.githubusercontent.com/tylerwongj/power-pong/main',
  'wordle-blitz': 'https://raw.githubusercontent.com/tylerwongj/wordle-blitz/main', 
  'skribbl-2': 'https://raw.githubusercontent.com/tylerwongj/skribbl2/main',
  'piano-player': 'https://raw.githubusercontent.com/tylerwongj/piano-player/main',
  '3d-simulator': 'https://raw.githubusercontent.com/tylerwongj/3dsimulator/main',
  'tic-tac-toe-pro': 'https://raw.githubusercontent.com/tylerwongj/tic-tac-toe-pro/main',
  'unity-code-quizzer': 'https://raw.githubusercontent.com/tylerwongj/unity-code-quizzer/main',
  'speed-racer': 'https://raw.githubusercontent.com/tylerwongj/speed-racer/main',
  'memory-match': 'https://raw.githubusercontent.com/tylerwongj/memory-match/main',
  'space-defender': 'https://raw.githubusercontent.com/tylerwongj/space-defender/main',
  'chess-master': 'https://raw.githubusercontent.com/tylerwongj/chess-master/main',
  '3d-world': 'https://raw.githubusercontent.com/tylerwongj/3dworld/main/modern-3d-world'
};

// Files to download for each game
const GAME_FILES = [
  'index.html',
  'script.js', 
  'style.css',
  'styles.css',
  'game.js',
  'server.js',
  'package.json',
  'thumbnail.png'
];

async function downloadFile(url, filepath) {
  try {
    console.log(`Downloading: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(`  ⚠️  File not found: ${path.basename(url)}`);
      return false;
    }
    
    const content = await response.text();
    await fs.ensureDir(path.dirname(filepath));
    await fs.writeFile(filepath, content);
    console.log(`  ✅  Downloaded: ${path.basename(filepath)}`);
    return true;
  } catch (error) {
    console.log(`  ❌  Error downloading ${url}:`, error.message);
    return false;
  }
}

async function copyLocalGame(gameName) {
  console.log(`\\n🎮 Copying local game: ${gameName}`);
  const localPath = path.join('..', gameName);
  const gameDir = path.join('dist', 'games', gameName);
  
  // Check if local game directory exists
  if (!(await fs.pathExists(localPath))) {
    console.log(`  ⚠️  Local directory not found: ${localPath}, skipping...`);
    return false;
  }
  
  try {
    // Copy the entire local game directory
    await fs.copy(localPath, gameDir, {
      filter: (src) => {
        // Exclude node_modules and other build artifacts
        const excluded = ['node_modules', '.git', 'dist', 'build'];
        return !excluded.some(exclude => src.includes(exclude));
      }
    });
    console.log(`  ✅  Copied local game: ${gameName}`);
    return true;
  } catch (error) {
    console.log(`  ❌  Error copying ${gameName}:`, error.message);
    return false;
  }
}

async function downloadGame(gameName, repoUrl) {
  console.log(`\\n🎮 Downloading game: ${gameName}`);
  const gameDir = path.join('dist', 'games', gameName);
  
  let hasFiles = false;
  
  for (const filename of GAME_FILES) {
    const fileUrl = `${repoUrl}/${filename}`;
    const filepath = path.join(gameDir, filename);
    
    const success = await downloadFile(fileUrl, filepath);
    if (success) hasFiles = true;
  }
  
  if (!hasFiles) {
    console.log(`  ⚠️  No files found for ${gameName}, skipping...`);
    await fs.remove(gameDir);
  }
  
  return hasFiles;
}

async function updateGamesPaths() {
  console.log('\\n📝 Updating game paths in games-data.js...');
  
  try {
    let gamesDataContent = await fs.readFile('games-data.js', 'utf8');
    
    // Update all the relative paths to point to the games folder
    Object.keys(GITHUB_REPOS).forEach(gameName => {
      const oldPath = `"../${gameName}/"`;
      const newPath = `"./games/${gameName}/"`;
      gamesDataContent = gamesDataContent.replace(new RegExp(oldPath, 'g'), newPath);
    });
    
    await fs.writeFile('dist/games-data.js', gamesDataContent);
    console.log('  ✅  Updated games-data.js with production paths');
  } catch (error) {
    console.error('  ❌  Error updating games-data.js:', error.message);
  }
}

async function copyHubFiles() {
  console.log('\\n📁 Copying Tyler Arcade hub files...');
  
  const hubFiles = ['index.html', 'script.js', 'style.css'];
  
  for (const file of hubFiles) {
    try {
      await fs.copy(file, `dist/${file}`);
      console.log(`  ✅  Copied: ${file}`);
    } catch (error) {
      console.error(`  ❌  Error copying ${file}:`, error.message);
    }
  }
}

async function build() {
  console.log(`🚀 Starting Tyler Arcade build process... (${isLocal ? 'LOCAL' : 'REMOTE'})\\n`);
  
  // Clean and create dist directory
  await fs.remove('dist');
  await fs.ensureDir('dist');
  await fs.ensureDir('dist/games');
  
  // Copy hub files
  await copyHubFiles();
  
  // Get games - local files or download from GitHub
  let successCount = 0;
  for (const [gameName, repoUrl] of Object.entries(GITHUB_REPOS)) {
    let success;
    
    if (isLocal) {
      // Try local first, fallback to download
      success = await copyLocalGame(gameName);
      if (!success) {
        console.log(`  🔄 Local copy failed, trying GitHub download...`);
        success = await downloadGame(gameName, repoUrl);
      }
    } else {
      // Production: always download from GitHub
      success = await downloadGame(gameName, repoUrl);
    }
    
    if (success) successCount++;
  }
  
  // Update game paths
  await updateGamesPaths();
  
  console.log(`\\n🎉 Build complete!`);
  console.log(`   📊 Successfully processed ${successCount}/${Object.keys(GITHUB_REPOS).length} games`);
  console.log(`   📁 Output directory: ./dist`);
  console.log(`   ${isLocal ? '🏠 Local development build' : '🌐 Ready for Railway deployment!'}`);
}

// Run the build
build().catch(error => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});