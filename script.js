document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. Mobile Navigation Toggle
    // =============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));

    // =============================================
    // 2. Smooth Scrolling
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =============================================
    // 3. Scroll Spy + Hide/Show Header
    // =============================================
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        const header = document.querySelector('.header');
        if (header) {
            const currentScrollY = window.scrollY;
            header.style.transform = (currentScrollY > window.lastScrollY && currentScrollY > 100)
                ? 'translateY(-100%)' : 'translateY(0)';
            window.lastScrollY = currentScrollY;
        }
    });

    // =============================================
    // [4] Scroll Progress Bar
    // =============================================
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = pct + '%';
        });
    }

    // =============================================
    // [2] Custom Cursor
    // =============================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top  = e.clientY + 'px';
            // outline follows with slight lag via CSS transition
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top  = e.clientY + 'px';
        });

        // Scale dot on clickable elements
        document.querySelectorAll('a, button, .skill-item, .cert-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.8)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // =============================================
    // [1] Typewriter Animation
    // =============================================
    const typeTarget = document.getElementById('typewriter');
    if (typeTarget) {
        const phrases = [
            'Web Developer & Mentor',
            'Solusi Web Berkinerja Tinggi',
            'Mentoring Pemrograman Berbasis Logika',
            'Freelance Developer — coderNTT'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 70;
        const deletingSpeed = 40;
        const pauseAfterType = 1800;
        const pauseAfterDelete = 400;

        function type() {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                typeTarget.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeTarget.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === current.length) {
                delay = pauseAfterType;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = pauseAfterDelete;
            }

            setTimeout(type, delay);
        }

        // Start after short delay so page loads first
        setTimeout(type, 600);
    }

    // =============================================
    // [3] Portfolio Filter with Animated Pill
    // =============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const pill = document.getElementById('filterPill');

    function movePill(btn) {
        if (!pill) return;
        pill.style.left  = btn.offsetLeft + 'px';
        pill.style.width = btn.offsetWidth + 'px';
    }

    // Init pill on active button
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        // Wait for layout
        requestAnimationFrame(() => movePill(activeBtn));
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            movePill(button);

            const targetFilter = button.getAttribute('data-filter');
            portfolioCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    const show = targetFilter === 'all' || card.getAttribute('data-category') === targetFilter;
                    card.style.display = show ? 'block' : 'none';
                    if (show) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    }
                }, 300);
            });
        });
    });

    // =============================================
    // 5. Vanilla Modal for Certificates
    // =============================================
    const certLinks = document.querySelectorAll('.cert-link');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    certLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.slice(-4).toLowerCase() === '.pdf') return;
            e.preventDefault();
            modalImg.src = href;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    const hideModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        setTimeout(() => { modalImg.src = ''; }, 300);
    };

    if (closeModal && modal) {
        closeModal.addEventListener('click', hideModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) hideModal();
        });
    }

    // =============================================
    // 6. Dynamic Copyright Year
    // =============================================
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // =============================================
    // 7. Intersection Observer — Fade In
    // =============================================
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

});
