// Modern Portfolio JavaScript

// Theme Management
const initTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
};

const updateThemeIcon = (theme) => {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
};

// Mobile Menu
const initMobileMenu = () => {
    const menuButton = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-links');

    menuButton?.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuButton.setAttribute('aria-expanded', 
            menuButton.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
    });
};

// Intersection Observer for animations
const initIntersectionObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle progress bars
                if (entry.target.classList.contains('progress-bar')) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = `${progress}%`;
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll, .progress-bar').forEach(el => {
        observer.observe(el);
    });
};

// Back to Top Button
const initBackToTop = () => {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// Typing Animation
const initTypingAnimation = () => {
    const options = {
        strings: [
            'Software Architect',
            'Full Stack Developer',
            'Cloud Solutions Expert',
            'Technical Consultant'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        startDelay: 1000,
        backDelay: 2000,
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500,
        cursorChar: '|',
        autoInsertCss: true,
        showCursor: true
    };

    new Typed('#typed-text', options);
};

// YouTube Integration
const loadYouTubeVideos = async () => {
    const channelId = 'YOUR_CHANNEL_ID'; // Replace with actual channel ID
    const apiKey = 'YOUR_API_KEY'; // Replace with actual API key
    const maxResults = 3;

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
        );
        const data = await response.json();
        
        const videoGrid = document.querySelector('.youtube-grid');
        if (videoGrid && data.items) {
            data.items.forEach(item => {
                if (item.id.videoId) {
                    const videoCard = document.createElement('div');
                    videoCard.className = 'video-card animate-on-scroll';
                    videoCard.innerHTML = `
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/${item.id.videoId}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            loading="lazy"
                            title="YouTube video"
                        ></iframe>
                    `;
                    videoGrid.appendChild(videoCard);
                }
            });
        }
    } catch (error) {
        console.error('Error loading YouTube videos:', error);
        const videoGrid = document.querySelector('.youtube-grid');
        if (videoGrid) {
            videoGrid.innerHTML = '<p class="error-message">Videos are currently unavailable. Please check back later.</p>';
        }
    }
};

// Smooth Scrolling
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initIntersectionObserver();
    initBackToTop();
    initTypingAnimation();
    initSmoothScrolling();
    
    // Event Listeners
    document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);
    
    // Initialize YouTube videos if API key is set
    // loadYouTubeVideos();
});

// Initialize skill progress bars
const initSkillBars = () => {
    document.querySelectorAll('.mini-progress-bar').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
};

// Call initSkillBars when the page loads
document.addEventListener('DOMContentLoaded', initSkillBars);
