// NanoCem UT-9 - Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
    
    // --- HEADER SCROLL ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 3D BAG ROTATION ---
    const bagWrap = document.querySelector('.bag-3d-wrap');
    const bag = document.getElementById('bag3d');
    
    if (bagWrap && bag) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            bag.style.transform = `rotateY(${xAxis - 20}deg) rotateX(${10 - yAxis}deg)`;
        });
        
        // Tilt back to default on leave
        bagWrap.addEventListener('mouseleave', () => {
            bag.style.transform = `rotateY(-20deg) rotateX(10deg)`;
        });
    }

    // --- SCROLL REVEAL (AOS) ---
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // If it's a stats card, maybe trigger counter?
                if (entry.target.querySelector('.stat-value')) {
                    // Start counter animation if not already started
                }
            }
        });
    }, observerOptions);

    aosElements.forEach(el => observer.observe(el));

    // --- COUNTER ANIMATION ---
    // (Optional: can be added for extra WOW factor)
    const animateValue = (id, start, end, duration) => {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const val = progress * (end - start) + start;
            
            if (id === 'stat-1') {
                obj.innerHTML = val.toFixed(1) + 'x';
            } else if (id.includes('stat')) {
                obj.innerHTML = Math.floor(val) + (id === 'stat-2' ? '%' : '');
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSet = document.querySelector(targetId);
            if (targetSet) {
                window.scrollTo({
                    top: targetSet.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
            
            // Update active state
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

});
