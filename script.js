// Scroll-based reveal animations (fade in + slide up gently)
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

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Parallax motion on hero (subtle gradient blob)
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const scrollY = window.scrollY;
        heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// Navbar blur and shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.2)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
});

// Horizontal scroll enhancements (smooth drag with momentum, highlight active card, progress dots)
const horizontalSlider = document.getElementById('horizontal-slider');
if (horizontalSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX = 0;
    let animationId;

    horizontalSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - horizontalSlider.offsetLeft;
        scrollLeft = horizontalSlider.scrollLeft;
        horizontalSlider.style.cursor = 'grabbing';
        cancelAnimationFrame(animationId);
    });

    horizontalSlider.addEventListener('mouseleave', () => {
        isDown = false;
        horizontalSlider.style.cursor = 'grab';
        applyMomentum();
    });

    horizontalSlider.addEventListener('mouseup', () => {
        isDown = false;
        horizontalSlider.style.cursor = 'grab';
        applyMomentum();
    });

    horizontalSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - horizontalSlider.offsetLeft;
        const walk = (x - startX) * 2;
        horizontalSlider.scrollLeft = scrollLeft - walk;
        velocity = x - lastX;
        lastX = x;
    });

    function applyMomentum() {
        if (Math.abs(velocity) > 0.1) {
            horizontalSlider.scrollLeft -= velocity;
            velocity *= 0.95; // Decay
            animationId = requestAnimationFrame(applyMomentum);
        }
    }

    // Highlight active card and progress dots
    const cards = horizontalSlider.querySelectorAll('.card');
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-dots';
    horizontalSlider.parentElement.appendChild(progressContainer);

    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        progressContainer.appendChild(dot);
    });

    horizontalSlider.addEventListener('scroll', () => {
        const scrollLeft = horizontalSlider.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 20; // Including gap
        const activeIndex = Math.round(scrollLeft / cardWidth);
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === activeIndex);
        });
    });
}

// Page transitions (smooth fade on link clicks)
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.href.includes('.html')) {
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
});

// Fade in on page load and hide loading screen after animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }
        document.body.style.opacity = '1';
    }, 4000); // Matches loading animation duration
});

// Cursor-follow glow (subtle, optional)
document.addEventListener('mousemove', (e) => {
    const glow = document.getElementById('cursor-glow');
    if (glow) {
        glow.style.left = `${e.clientX - 25}px`;
        glow.style.top = `${e.clientY - 25}px`;
    }
});

// Smooth project hover animations (enhanced with mouse position for dynamic scaling)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
    });
});