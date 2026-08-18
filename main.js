/* ==========================================================================
   LoopStack Technologies - Interactive Features
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Transition on Scroll
    const header = document.querySelector('.main-header');
    const scrollThreshold = 20;

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to ensure position is correct on load
    handleScroll();

    // 2. Mobile Navigation Hamburger Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    menuToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 3. Active Link Highlight on Scroll using Intersection Observer
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle third of viewport
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // 4. Premium Mouse Tilt/Parallax Card Effect
    const tiltCards = document.querySelectorAll('.tech-graphic-card, .dashboard-mockup');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Mouse coordinates relative to card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Normalize coordinates to -0.5 to 0.5 range
            const px = (x / rect.width) - 0.5;
            const py = (y / rect.height) - 0.5;

            // Maximum tilt angle (in degrees)
            const maxTilt = 4;

            // Apply transformations
            // Tilt relative to mouse position
            const tiltX = -py * maxTilt;
            const tiltY = px * maxTilt;

            // Soft shine/gradient dynamic follow
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            // Restore original transform state smoothly
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 5. Contact Form Submission via FormSubmit AJAX
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const resetFormBtn = document.getElementById('resetFormBtn');
    const retryFormBtn = document.getElementById('retryFormBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Transition to loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const inquiryType = document.getElementById('inquiry_type').value;
            const message = document.getElementById('message').value;

            // Payload object
            const formData = {
                name: name,
                email: email,
                inquiry_type: inquiryType,
                _subject: `New Inquiry: ${inquiryType} - LoopStack`,
                message: message
            };

            // AJAX Submission to FormSubmit
            fetch('https://formsubmit.co/ajax/loopstacktechnologies@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Form submission failed.');
                }
            })
            .then(data => {
                // Success: Hide form, show success alert
                submitBtn.classList.remove('loading');
                contactForm.classList.add('hidden');
                
                formStatus.classList.add('active', 'success');
                formStatus.classList.remove('error');
                
                contactForm.reset();
            })
            .catch(error => {
                // Error: Hide form, show error alert
                submitBtn.classList.remove('loading');
                contactForm.classList.add('hidden');
                
                formStatus.classList.add('active', 'error');
                formStatus.classList.remove('success');
                console.error('Error submitting form:', error);
            });
        });

        // Reset button handler (after successful send)
        resetFormBtn.addEventListener('click', () => {
            formStatus.classList.remove('active', 'success', 'error');
            contactForm.classList.remove('hidden');
            submitBtn.disabled = false;
            
            // Reset custom select state
            if (hiddenInquiryInput && inquiryTrigger) {
                hiddenInquiryInput.value = 'General Inquiry';
                inquiryTrigger.querySelector('.trigger-text').textContent = 'General Inquiry';
                const options = inquiryOptions.querySelectorAll('.custom-option');
                options.forEach(opt => {
                    if (opt.getAttribute('data-value') === 'General Inquiry') {
                        opt.classList.add('selected');
                    } else {
                        opt.classList.remove('selected');
                    }
                });
            }
        });

        // Retry button handler (after failure)
        retryFormBtn.addEventListener('click', () => {
            formStatus.classList.remove('active', 'success', 'error');
            contactForm.classList.remove('hidden');
            submitBtn.disabled = false;
        });

        // 6. Custom Select Dropdown logic
        const inquiryTrigger = document.getElementById('inquiryTrigger');
        const inquiryOptions = document.getElementById('inquiryOptions');
        const hiddenInquiryInput = document.getElementById('inquiry_type');
        const customSelectContainer = document.querySelector('.custom-select-container');

        if (inquiryTrigger && inquiryOptions) {
            inquiryTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                inquiryTrigger.classList.toggle('open');
                customSelectContainer.classList.toggle('open');
            });

            const options = inquiryOptions.querySelectorAll('.custom-option');
            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const val = option.getAttribute('data-value');
                    
                    // Update hidden input and trigger text
                    hiddenInquiryInput.value = val;
                    inquiryTrigger.querySelector('.trigger-text').textContent = val;
                    
                    // Toggle selected styling
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    
                    // Close dropdown
                    inquiryTrigger.classList.remove('open');
                    customSelectContainer.classList.remove('open');
                });
            });

            // Close dropdown if clicked anywhere else on document
            document.addEventListener('click', () => {
                inquiryTrigger.classList.remove('open');
                customSelectContainer.classList.remove('open');
            });
        }
    }
});
