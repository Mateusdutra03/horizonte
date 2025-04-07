
document.addEventListener('DOMContentLoaded', function() {
    initNavbarToggle();
    initStickyHeader();
    initSolutionsTabs();
    initTestimonialCarousel();
    initProjectsFilter();
    initAnimatedCounters();
    initContactForm();
    initScrollReveal();
});

/**
 * Mobile navigation toggle functionality
 */
function initNavbarToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
}

/**
 * Sticky header on scroll
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    const scrollThreshold = 100;

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
}

/**
 * Solutions section tab functionality
 */
function initSolutionsTabs() {
    const tabBtns = document.querySelectorAll('.solution-tab-btn');
    const tabContents = document.querySelectorAll('.solution-tab-content');

    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Show corresponding content
                const targetId = this.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
}

/**
 * Testimonial carousel functionality
 */
function initTestimonialCarousel() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-item');
        const totalSlides = slides.length;
        const nextBtn = document.querySelector('.testimonial-next');
        const prevBtn = document.querySelector('.testimonial-prev');
        const dotsContainer = document.querySelector('.testimonial-dots');
        
        // Create dots
        if (dotsContainer) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('testimonial-dot');
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('data-index', i);
                dotsContainer.appendChild(dot);
                
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.getAttribute('data-index')));
                });
            }
        }
        
        // Set up next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % totalSlides;
                goToSlide(currentSlide);
            });
        }
        
        // Set up previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(currentSlide);
            });
        }
        
        // Auto advance slides every 5 seconds
        let slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, 5000);
        
        // Pause auto-advance on hover
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                currentSlide = (currentSlide + 1) % totalSlides;
                goToSlide(currentSlide);
            }, 5000);
        });
        
        // Function to go to a specific slide
        function goToSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
            });
            
            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.testimonial-dot');
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        // Initial positioning
        goToSlide(0);
    }
}

/**
 * Projects filter functionality
 */
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length && projectItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Animated counters for statistics section
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    if (counters.length) {
        // Check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Animate counter
        function animateCounter(counter) {
            if (counter.dataset.counted) return;
            
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 16)); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    counter.dataset.counted = true;
                } else {
                    counter.textContent = current.toLocaleString();
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        }
        
        // Start counter animation when visible
        function checkCounters() {
            counters.forEach(counter => {
                if (isElementInViewport(counter) && !counter.dataset.counted) {
                    animateCounter(counter);
                }
            });
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkCounters);
        
        // Initial check
        checkCounters();
    }
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const formResponse = document.querySelector('.form-response');
            
            let isValid = true;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(elem => {
                elem.textContent = '';
            });
            
            // Check name
            if (!name.value.trim()) {
                document.getElementById('name-error').textContent = 'Por favor, insira seu nome';
                isValid = false;
            }
            
            // Check email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                document.getElementById('email-error').textContent = 'Por favor, insira um email válido';
                isValid = false;
            }
            
            // Check message
            if (!message.value.trim()) {
                document.getElementById('message-error').textContent = 'Por favor, insira sua mensagem';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission with loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                // Simulated API call (replace with actual API call)
                setTimeout(() => {
                    // Success message
                    if (formResponse) {
                        formResponse.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                        formResponse.classList.add('success');
                        formResponse.classList.remove('error');
                    }
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        if (formResponse) {
                            formResponse.textContent = '';
                            formResponse.classList.remove('success');
                        }
                    }, 5000);
                }, 1500);
            }
        });
    }
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length) {
        const revealOptions = {
            threshold: 0.15
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, revealOptions);
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
}

/**
 * Dark mode toggle functionality
 */
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Save preference in local storage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update toggle button text
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.textContent = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
    }
}

/**
 * Initialize dark mode preference from local storage
 */
function initDarkModePreference() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.textContent = 'Modo Claro';
        }
    }
}

/**
 * FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-question');
            
            if (header) {
                header.addEventListener('click', function() {
                    // Toggle current item
                    item.classList.toggle('active');
                    
                    // Close other items (uncomment for accordion behavior)
                    /*
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    */
                });
            }
        });
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100; // Adjust for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav');
                const menuToggle = document.querySelector('.menu-toggle');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
}

/**
 * Service request calculator
 */
function initServiceCalculator() {
    const calculator = document.getElementById('service-calculator');
    
    if (calculator) {
        const serviceTypeSelect = document.getElementById('service-type');
        const serviceSizeSelect = document.getElementById('service-size');
        const urgencySelect = document.getElementById('urgency');
        const estimateResult = document.getElementById('estimate-result');
        const estimateTime = document.getElementById('estimate-time');
        
        // Base prices for different services
        const basePrice = {
            'desenvolvimento-web': 5000,
            'desenvolvimento-app': 8000,
            'consultoria': 3000,
            'suporte-ti': 2000,
            'cloud': 4000
        };
        
        // Size multipliers
        const sizeMultiplier = {
            'pequeno': 1,
            'medio': 1.5,
            'grande': 2.5,
            'enterprise': 4
        };
        
        // Urgency multipliers
        const urgencyMultiplier = {
            'normal': 1,
            'prioritario': 1.3,
            'urgente': 1.7
        };
        
        // Time estimates in weeks
        const timeEstimates = {
            'desenvolvimento-web': {
                'pequeno': 3,
                'medio': 6,
                'grande': 12,
                'enterprise': 20
            },
            'desenvolvimento-app': {
                'pequeno': 4,
                'medio': 8,
                'grande': 16,
                'enterprise': 24
            },
            'consultoria': {
                'pequeno': 1,
                'medio': 3,
                'grande': 6,
                'enterprise': 10
            },
            'suporte-ti': {
                'pequeno': 1,
                'medio': 2,
                'grande': 4,
                'enterprise': 6
            },
            'cloud': {
                'pequeno': 2,
                'medio': 4,
                'grande': 8,
                'enterprise': 12
            }
        };
        
        function updateEstimate() {
            const serviceType = serviceTypeSelect.value;
            const serviceSize = serviceSizeSelect.value;
            const urgency = urgencySelect.value;
            
            if (serviceType && serviceSize && urgency) {
                const calculatedPrice = basePrice[serviceType] * sizeMultiplier[serviceSize] * urgencyMultiplier[urgency];
                
                // Calculate time estimate based on urgency
                let timeEstimate = timeEstimates[serviceType][serviceSize];
                if (urgency === 'prioritario') {
                    timeEstimate = Math.ceil(timeEstimate * 0.8);
                } else if (urgency === 'urgente') {
                    timeEstimate = Math.ceil(timeEstimate * 0.6);
                }
                
                estimateResult.textContent = `R$ ${calculatedPrice.toLocaleString('pt-BR', {maximumFractionDigits: 0})}`;
                estimateTime.textContent = `${timeEstimate} semanas`;
                
                estimateResult.parentElement.style.display = 'block';
            }
        }
        
        // Update estimate on change
        serviceTypeSelect.addEventListener('change', updateEstimate);
        serviceSizeSelect.addEventListener('change', updateEstimate);
        urgencySelect.addEventListener('change', updateEstimate);
    }
}

/**
 * Call all initialization functions on page load
 */
window.addEventListener('load', function() {
    initDarkModePreference();
    initFaqAccordion();
    initSmoothScroll();
    initServiceCalculator();
});