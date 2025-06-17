class CompactDashboard {
    constructor() {
        this.games = gamesData;
        this.favorites = JSON.parse(localStorage.getItem('compactDashboardFavorites')) || [];
        this.filters = {
            category: 'all',
            status: ['available', 'beta'],
            minRating: 0,
            search: ''
        };
        this.sortBy = 'title';
        this.showFavoritesOnly = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderGames();
        this.updateCategoryCounts();
        this.updateStatusCounts();
        this.loadTheme();
    }

    setupEventListeners() {
        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.renderGames();
        });

        // Settings
        document.getElementById('settingsBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSettings();
        });

        document.addEventListener('click', () => {
            this.closeSettings();
        });

        // Theme
        document.getElementById('themeBtn').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Support
        document.getElementById('supportBtn').addEventListener('click', () => {
            this.showSupportModal();
        });

        // Categories
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                if (category === 'favorites') {
                    this.showFavoritesOnly = !this.showFavoritesOnly;
                    this.updateCategoryStates();
                } else {
                    this.showFavoritesOnly = false;
                    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.filters.category = category;
                }
                
                this.renderGames();
            });
        });

        // Rating
        const ratingRange = document.getElementById('ratingRange');
        const ratingNum = document.getElementById('ratingNum');
        ratingRange.addEventListener('input', (e) => {
            this.filters.minRating = parseFloat(e.target.value);
            ratingNum.textContent = e.target.value;
            this.renderGames();
        });

        // Status
        document.querySelectorAll('.status-control input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const status = checkbox.dataset.status;
                if (checkbox.checked) {
                    if (!this.filters.status.includes(status)) {
                        this.filters.status.push(status);
                    }
                } else {
                    this.filters.status = this.filters.status.filter(s => s !== status);
                }
                this.renderGames();
            });
        });

        // Sort
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.renderGames();
        });

        // Actions
        document.getElementById('clearBtn').addEventListener('click', () => this.clearFilters());
        document.getElementById('randomBtn').addEventListener('click', () => this.randomGame());

        // Modal
        document.getElementById('closeModal').addEventListener('click', () => this.hideSupportModal());
        document.getElementById('supportModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.hideSupportModal();
            }
        });
    }

    toggleSettings() {
        const menu = document.getElementById('settingsMenu');
        menu.classList.toggle('open');
    }

    closeSettings() {
        document.getElementById('settingsMenu').classList.remove('open');
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('compactDashboardTheme', newTheme);
        
        const button = document.getElementById('themeBtn');
        button.innerHTML = `<span class="option-icon">${newTheme === 'light' ? '🌙' : '☀️'}</span><span>${newTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>`;
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('compactDashboardTheme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const button = document.getElementById('themeBtn');
        button.innerHTML = `<span class="option-icon">${savedTheme === 'light' ? '🌙' : '☀️'}</span><span>${savedTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>`;
    }

    showSupportModal() {
        document.getElementById('supportModal').classList.add('show');
    }

    hideSupportModal() {
        document.getElementById('supportModal').classList.remove('show');
    }

    updateCategoryStates() {
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (this.showFavoritesOnly) {
            document.querySelector('.cat-btn[data-category="favorites"]').classList.add('active');
        } else {
            document.querySelector(`.cat-btn[data-category="${this.filters.category}"]`).classList.add('active');
        }
    }

    clearFilters() {
        this.filters = {
            category: 'all',
            status: ['available', 'beta'],
            minRating: 0,
            search: ''
        };
        this.showFavoritesOnly = false;

        // Reset UI
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.cat-btn[data-category="all"]').classList.add('active');
        
        document.getElementById('ratingRange').value = 0;
        document.getElementById('ratingNum').textContent = '0';
        document.getElementById('searchInput').value = '';
        
        document.querySelectorAll('.status-control input').forEach(cb => cb.checked = true);

        this.renderGames();
    }

    randomGame() {
        const availableGames = this.filterGames();
        if (availableGames.length === 0) return;
        
        const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)];
        window.open(randomGame.path, '_blank');
    }

    filterGames() {
        let filtered = this.games;

        if (this.showFavoritesOnly) {
            filtered = filtered.filter(game => this.favorites.includes(game.id));
        }

        if (this.filters.category !== 'all' && !this.showFavoritesOnly) {
            filtered = filtered.filter(game => game.category === this.filters.category);
        }

        filtered = filtered.filter(game => this.filters.status.includes(game.status));
        filtered = filtered.filter(game => game.rating >= this.filters.minRating);

        if (this.filters.search) {
            filtered = filtered.filter(game =>
                game.title.toLowerCase().includes(this.filters.search) ||
                game.description.toLowerCase().includes(this.filters.search) ||
                game.category.toLowerCase().includes(this.filters.search)
            );
        }

        return this.sortGames(filtered);
    }

    sortGames(games) {
        const sorted = [...games];
        
        switch (this.sortBy) {
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'category':
                return sorted.sort((a, b) => a.category.localeCompare(b.category));
            case 'status':
                return sorted.sort((a, b) => a.status.localeCompare(b.status));
            default:
                return sorted;
        }
    }

    renderGames() {
        const container = document.getElementById('gamesGrid');
        const filteredGames = this.filterGames();

        document.getElementById('resultsText').textContent = 
            `${filteredGames.length} game${filteredGames.length === 1 ? '' : 's'}`;

        if (filteredGames.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 30px; color: var(--muted-text);">
                    <h3 style="margin-bottom: 12px; color: var(--secondary-text);">No games found</h3>
                    <p style="margin-bottom: 16px;">Try adjusting filters</p>
                    <button onclick="compactDashboard.clearFilters()" style="padding: 8px 16px; background: #c0392b; color: white; border: none; border-radius: var(--radius); cursor: pointer; font-size: 11px;">Clear Filters</button>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredGames.map(game => this.createGameCard(game)).join('');
        this.setupGameCardListeners();
    }

    getCategoryIcon(category) {
        const icons = {
            arcade: '🕹️',
            puzzle: '🧩', 
            adventure: '🏔️',
            social: '👥',
            action: '🚀',
            strategy: '♟️'
        };
        return icons[category] || '🎮';
    }

    createGameCard(game) {
        const isFavorited = this.favorites.includes(game.id);
        
        return `
            <div class="game-card" data-category="${game.category}">
                <div class="game-thumbnail" data-category="${game.category}">
                    ${game.thumbnail ? 
                        `<img src="${game.thumbnail}" alt="${game.title} thumbnail" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="thumbnail-icon default-fallback" style="display:none;">${this.getCategoryIcon(game.category)}</div>` 
                        : 
                        `<div class="thumbnail-icon default-thumbnail">${this.getCategoryIcon(game.category)}</div>`
                    }
                </div>
                <div class="game-header">
                    <div>
                        <div class="game-title">${game.icon} ${game.title}</div>
                        <div class="game-category">${game.category}</div>
                    </div>
                    <div class="header-right">
                        <div class="game-status ${game.status}">${game.status === 'beta' ? 'Beta' : 'Available'}</div>
                        <div class="game-actions">
                            <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" data-game-id="${game.id}">
                                <span class="blue-star">${isFavorited ? '⭐' : '☆'}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="game-description">${game.description}</div>
                <div class="game-footer">
                    <div class="game-rating">
                        <span><span class="blue-star">⭐</span> ${game.rating.toFixed(1)}</span>
                    </div>
                    <div class="game-actions">
                        <a href="${game.path}" class="play-btn" target="_blank">
                            🎮 Play
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    setupGameCardListeners() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const gameId = parseInt(btn.dataset.gameId);
                this.toggleFavorite(gameId);
            });
        });
    }

    toggleFavorite(gameId) {
        const index = this.favorites.indexOf(gameId);
        
        if (index === -1) {
            this.favorites.push(gameId);
        } else {
            this.favorites.splice(index, 1);
        }

        localStorage.setItem('compactDashboardFavorites', JSON.stringify(this.favorites));
        this.renderGames();
        this.updateCategoryCounts();
    }

    updateCategoryCounts() {
        const counts = {
            all: this.games.length,
            favorites: this.favorites.length,
            arcade: this.games.filter(g => g.category === 'arcade').length,
            puzzle: this.games.filter(g => g.category === 'puzzle').length,
            adventure: this.games.filter(g => g.category === 'adventure').length,
            social: this.games.filter(g => g.category === 'social').length,
            action: this.games.filter(g => g.category === 'action').length,
            strategy: this.games.filter(g => g.category === 'strategy').length
        };

        Object.keys(counts).forEach(category => {
            const element = document.getElementById(category + 'Count');
            if (element) {
                element.textContent = counts[category];
            }
        });
    }

    updateStatusCounts() {
        const availableCount = this.games.filter(g => g.status === 'available').length;
        const betaCount = this.games.filter(g => g.status === 'beta').length;
        
        document.getElementById('availableCount').textContent = availableCount;
        document.getElementById('betaCount').textContent = betaCount;
    }
}

let compactDashboard;
document.addEventListener('DOMContentLoaded', () => {
    compactDashboard = new CompactDashboard();
});