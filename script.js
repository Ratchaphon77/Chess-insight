// ===== PRELOADER FIX - AGGRESSIVE VERSION =====
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
        preloader.style.visibility = 'hidden';
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
    }
}

// Force hide after 2 seconds NO MATTER WHAT
setTimeout(() => {
    hidePreloader();
}, 2000);

// Also hide on window load
window.addEventListener('load', hidePreloader, { once: true });

// Also hide on DOM ready
document.addEventListener('DOMContentLoaded', hidePreloader, { once: true });

// Also hide immediately if DOM is already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hidePreloader);
} else {
    hidePreloader();
}

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

// ===== NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Highlight nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== PARTICLES ANIMATION =====
const particlesContainer = document.getElementById('particlesContainer');
const particleEmojis = ['♟', '♞', '♗', '♕', '♔', '♖'];

function createParticles() {
    if (!particlesContainer) return;
    
    for (let i = 0; i < 14; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = 100 + 'vh';
        particle.style.animationDuration = (Math.random() * 4 + 8) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===== SCROLL REVEAL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .stat-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== CUSTOM CURSOR =====
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.8;
    box-shadow: 0 0 20px rgba(212, 162, 76, 0.5);
    transition: width 0.3s, height 0.3s, box-shadow 0.3s;
`;

const cursorRing = document.createElement('div');
cursorRing.style.cssText = `
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.5;
`;

document.body.appendChild(cursor);
document.body.appendChild(cursorRing);

let cursorX = 0, cursorY = 0;
let cursorRingX = 0, cursorRingY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    cursor.style.left = cursorX - 5 + 'px';
    cursor.style.top = cursorY - 5 + 'px';
});

// Ring follows with delay (smooth trail)
setInterval(() => {
    cursorRingX += (cursorX - cursorRingX) * 0.2;
    cursorRingY += (cursorY - cursorRingY) * 0.2;
    
    cursorRing.style.left = cursorRingX - 15 + 'px';
    cursorRing.style.top = cursorRingY - 15 + 'px';
}, 20);

// Expand cursor on hover buttons
document.querySelectorAll('.btn, a').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.boxShadow = '0 0 30px rgba(212, 162, 76, 0.8)';
        cursorRing.style.width = '50px';
        cursorRing.style.height = '50px';
        cursorRing.style.opacity = '0.8';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.boxShadow = '0 0 20px rgba(212, 162, 76, 0.5)';
        cursorRing.style.width = '30px';
        cursorRing.style.height = '30px';
        cursorRing.style.opacity = '0.5';
    });
});

// Hide cursor outside window
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '0.8';
    cursorRing.style.opacity = '0.5';
});

// ===== STATS COUNTER =====
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (target - start) * progress);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(el => {
                const target = parseInt(el.dataset.target);
                animateCounter(el, target);
            });
        }
    });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ===== CHESS BOARD ENGINE =====
class ChessBoard {
    constructor() {
        this.board = this.initializeBoard();
        this.currentOpeningIndex = -1;
        this.currentMoveIndex = 0;
        this.isAnimating = false;
        this.openings = [
            { name: 'Italian Game', eco: 'C50', moves: ['e2-e4', 'e7-e5', 'g1-f3', 'b8-c6', 'f1-c4'] },
            { name: 'Ruy López', eco: 'C60', moves: ['e2-e4', 'e7-e5', 'g1-f3', 'b8-c6', 'f1-b5'] },
            { name: 'Sicilian Defence', eco: 'B20', moves: ['e2-e4', 'c7-c5', 'g1-f3', 'd7-d6', 'f1-e2'] },
            { name: 'French Defence', eco: 'C00', moves: ['e2-e4', 'e7-e6', 'f1-e2', 'c7-c5', 'g1-f3'] },
            { name: 'Queen\'s Gambit', eco: 'D24', moves: ['d2-d4', 'd7-d5', 'c2-c4', 'e7-e6', 'b1-c3'] },
            { name: 'Caro-Kann Defence', eco: 'B10', moves: ['e2-e4', 'c7-c6', 'g1-f3', 'd7-d5', 'e4xd5'] },
            { name: 'King\'s Indian', eco: 'E60', moves: ['d2-d4', 'g7-g6', 'c2-c4', 'f8-g7', 'g1-f3'] },
            { name: 'London System', eco: 'D02', moves: ['d2-d4', 'd7-d5', 'b1-f3', 'g8-f6', 'c1-f4'] },
            { name: 'English Opening', eco: 'A20', moves: ['c2-c4', 'e7-e5', 'g1-f3', 'g8-f6', 'b1-c3'] },
            { name: 'Scandinavian Defence', eco: 'B01', moves: ['e2-e4', 'd7-d5', 'e4xd5', 'd8xd5', 'b1-c3'] }
        ];
        
        this.setupBoard();
        this.startGame();
    }
    
    initializeBoard() {
        const board = {};
        const pieces = 'rnbqkbnr';
        
        // Black pieces
        for (let col = 0; col < 8; col++) {
            board[`${col}-0`] = pieces[col] + 'b';
            board[`${col}-1`] = 'pb';
        }
        
        // Empty squares
        for (let row = 2; row < 6; row++) {
            for (let col = 0; col < 8; col++) {
                board[`${col}-${row}`] = '';
            }
        }
        
        // White pieces
        for (let col = 0; col < 8; col++) {
            board[`${col}-6`] = 'pw';
            board[`${col}-7`] = pieces[col] + 'w';
        }
        
        return board;
    }
    
    setupBoard() {
        const squaresLayer = document.getElementById('squaresLayer');
        const piecesLayer = document.getElementById('piecesLayer');
        
        if (!squaresLayer || !piecesLayer) return;
        
        squaresLayer.innerHTML = '';
        piecesLayer.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const isLight = (row + col) % 2 === 0;
                const square = document.createElement('div');
                square.className = `sq ${isLight ? 'light' : 'dark'}`;
                square.id = `sq-${col}-${row}`;
                squaresLayer.appendChild(square);
                
                const pieceCode = this.board[`${col}-${row}`];
                if (pieceCode) {
                    this.createPiece(piecesLayer, col, row, pieceCode);
                }
            }
        }
    }
    
    createPiece(container, col, row, pieceCode) {
        const pieceMap = {
            'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
            'pb': '♙', 'rb': '♖', 'nb': '♘', 'bb': '♗', 'qb': '♕', 'kb': '♔'
        };
        
        const piece = document.createElement('div');
        piece.className = 'piece';
        piece.id = `piece-${col}-${row}`;
        piece.dataset.col = col;
        piece.dataset.row = row;
        piece.dataset.code = pieceCode;
        
        const inner = document.createElement('div');
        inner.className = 'piece-inner';
        inner.innerHTML = `<span>${pieceMap[pieceCode] || ''}</span>`;
        
        piece.appendChild(inner);
        piece.style.left = col * 12.5 + '%';
        piece.style.top = row * 12.5 + '%';
        
        container.appendChild(piece);
    }
    
    startGame() {
        this.selectNextOpening();
    }
    
    selectNextOpening() {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * this.openings.length);
        } while (nextIndex === this.currentOpeningIndex);
        
        this.currentOpeningIndex = nextIndex;
        this.currentMoveIndex = 0;
        this.playOpening();
    }
    
    async playOpening() {
        const opening = this.openings[this.currentOpeningIndex];
        
        // Update UI
        this.updateOpeningInfo(opening);
        this.resetMoveList();
        
        // Reset board with fade animation
        await this.resetBoardWithAnimation();
        
        // Play moves
        for (let i = 0; i < opening.moves.length; i++) {
            this.currentMoveIndex = i;
            const move = opening.moves[i];
            try {
                await this.playMove(move);
                await this.sleep(1150);
            } catch (e) {
                console.error('Error playing move:', e);
                break;
            }
        }
        
        // Update eval bar randomly
        this.updateEvalBar();
        
        // Wait before next opening
        await this.sleep(2600);
        this.selectNextOpening();
    }
    
    async playMove(moveStr) {
        const [from, to] = moveStr.split('-').map(pos => {
            const col = pos.charCodeAt(0) - 97;
            const row = 8 - parseInt(pos[1]);
            return { col, row };
        });
        
        const fromKey = `${from.col}-${from.row}`;
        const toKey = `${to.col}-${to.row}`;
        const piece = this.board[fromKey];
        
        if (!piece) return;
        
        // Highlight squares
        this.highlightSquares(fromKey, toKey);
        
        // Get actual piece element
        const pieceEl = document.getElementById(`piece-${from.col}-${from.row}`);
        if (!pieceEl) return;
        
        // Add to move list
        this.addMoveToList(moveStr);
        
        // Lift piece (0-280ms)
        await this.animatePieceLifting(pieceEl);
        
        // Move piece (280-920ms)
        await this.animatePieceMovement(pieceEl, from, to);
        
        // Check for capture
        if (this.board[toKey]) {
            const capturedPiece = document.getElementById(`piece-${to.col}-${to.row}`);
            if (capturedPiece) {
                await this.animatePieceCapture(capturedPiece);
            }
        }
        
        // Drop piece (920-1240ms)
        await this.animatePieceLanding(pieceEl);
        
        // Update board state
        this.board[toKey] = piece;
        delete this.board[fromKey];
        
        // Update element position and id
        pieceEl.id = `piece-${to.col}-${to.row}`;
        pieceEl.dataset.col = to.col;
        pieceEl.dataset.row = to.row;
    }
    
    async animatePieceLifting(pieceEl) {
        const startTime = performance.now();
        const duration = 280;
        
        return new Promise(resolve => {
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                pieceEl.style.transform = `scale(${1 + progress * 0.2})`;
                pieceEl.style.filter = `drop-shadow(2px 2px ${4 + progress * 8}px rgba(0, 0, 0, 0.5))`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            requestAnimationFrame(animate);
        });
    }
    
    async animatePieceMovement(pieceEl, from, to) {
        const startTime = performance.now();
        const duration = 640;
        
        return new Promise(resolve => {
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeProgress = progress < 0.5 
                    ? 2 * progress * progress 
                    : -1 + 4 * progress - 2 * progress * progress;
                
                const newCol = from.col + (to.col - from.col) * easeProgress;
                const newRow = from.row + (to.row - from.row) * easeProgress;
                
                pieceEl.style.left = newCol * 12.5 + '%';
                pieceEl.style.top = newRow * 12.5 + '%';
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    pieceEl.style.left = to.col * 12.5 + '%';
                    pieceEl.style.top = to.row * 12.5 + '%';
                    resolve();
                }
            };
            requestAnimationFrame(animate);
        });
    }
    
    async animatePieceLanding(pieceEl) {
        const startTime = performance.now();
        const duration = 320;
        
        return new Promise(resolve => {
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                pieceEl.style.transform = `scale(${1.2 - progress * 0.2})`;
                pieceEl.style.filter = `drop-shadow(2px 2px ${12 - progress * 8}px rgba(0, 0, 0, 0.5))`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    pieceEl.style.transform = 'scale(1)';
                    pieceEl.style.filter = 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))';
                    resolve();
                }
            };
            requestAnimationFrame(animate);
        });
    }
    
    async animatePieceCapture(pieceEl) {
        const startTime = performance.now();
        const duration = 400;
        
        return new Promise(resolve => {
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                pieceEl.style.opacity = 1 - progress;
                pieceEl.style.transform = `scale(${1 - progress * 0.5}) rotate(${progress * 360}deg)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    pieceEl.remove();
                    resolve();
                }
            };
            requestAnimationFrame(animate);
        });
    }
    
    highlightSquares(fromKey, toKey) {
        document.querySelectorAll('.sq').forEach(sq => sq.classList.remove('highlight', 'target'));
        
        const [fromCol, fromRow] = fromKey.split('-');
        const [toCol, toRow] = toKey.split('-');
        
        const fromSquare = document.getElementById(`sq-${fromCol}-${fromRow}`);
        const toSquare = document.getElementById(`sq-${toCol}-${toRow}`);
        
        if (fromSquare) fromSquare.classList.add('highlight');
        if (toSquare) toSquare.classList.add('target');
    }
    
    updateOpeningInfo(opening) {
        const nameEl = document.getElementById('openingName');
        const ecoEl = document.getElementById('openingEco');
        
        if (!nameEl || !ecoEl) return;
        
        const fadeOutDuration = 150;
        
        // Fade out
        nameEl.style.opacity = '0.3';
        ecoEl.style.opacity = '0.3';
        
        setTimeout(() => {
            nameEl.textContent = opening.name;
            ecoEl.textContent = opening.eco;
            nameEl.style.transition = 'opacity 0.3s ease';
            ecoEl.style.transition = 'opacity 0.3s ease';
            nameEl.style.opacity = '1';
            ecoEl.style.opacity = '1';
        }, fadeOutDuration);
    }
    
    addMoveToList(moveStr) {
        const moveList = document.getElementById('moveList');
        if (!moveList) return;
        
        const moveItem = document.createElement('div');
        moveItem.className = 'move-item';
        moveItem.textContent = moveStr.replace('-', '-');
        moveItem.dataset.index = this.currentMoveIndex;
        moveList.appendChild(moveItem);
        
        // Highlight current move
        document.querySelectorAll('.move-item').forEach((item, index) => {
            item.classList.remove('current');
            if (index === this.currentMoveIndex) {
                item.classList.add('current');
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    resetMoveList() {
        const moveList = document.getElementById('moveList');
        if (moveList) moveList.innerHTML = '';
    }
    
    async resetBoardWithAnimation() {
        const pieces = document.querySelectorAll('.piece');
        const fadeOutDuration = 300;
        
        // Fade out
        pieces.forEach((piece, index) => {
            piece.style.transition = `opacity ${fadeOutDuration}ms ease`;
            piece.style.opacity = '0';
        });
        
        await this.sleep(fadeOutDuration);
        
        // Reset board state and DOM
        this.board = this.initializeBoard();
        this.setupBoard();
        
        // Stagger fade in
        const newPieces = document.querySelectorAll('.piece');
        newPieces.forEach((piece, index) => {
            piece.style.opacity = '0';
            piece.style.transition = `opacity 200ms ease ${index * 30}ms`;
            setTimeout(() => {
                piece.style.opacity = '1';
            }, 10);
        });
        
        await this.sleep(fadeOutDuration + newPieces.length * 30);
    }
    
    updateEvalBar() {
        const evalFill = document.getElementById('evalFill');
        if (!evalFill) return;
        
        const randomEval = 30 + Math.random() * 40;
        evalFill.style.width = randomEval + '%';
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize chess board when page loads
let chessBoard;
if (document.getElementById('chessboard')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for board element to be fully rendered
        setTimeout(() => {
            try {
                chessBoard = new ChessBoard();
            } catch (e) {
                console.error('Chess board initialization error:', e);
            }
        }, 100);
    });
}

// ===== EMAIL FORM VALIDATION =====
const emailForm = document.getElementById('emailForm');
if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailForm.querySelector('input[type="email"]');
        const btn = emailForm.querySelector('button');
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.style.borderColor = 'var(--error)';
            email.style.animation = 'shakeX 0.4s ease';
            return;
        }
        
        // Loading state
        btn.disabled = true;
        btn.textContent = '✓ Check your email!';
        btn.style.background = 'var(--success)';
        
        setTimeout(() => {
            email.value = '';
            btn.disabled = false;
            btn.textContent = 'Get Started Free';
            btn.style.background = '';
            email.style.borderColor = '';
        }, 2000);
    });
}

// Add shake animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shakeX {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Subtle movement (1/10 of distance for smooth effect)
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

console.log('%c🎯 Chess Insight Loaded!', 'color: #d4a24c; font-size: 16px; font-weight: bold;');
