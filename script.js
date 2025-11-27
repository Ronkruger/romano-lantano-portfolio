document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Library for scroll animations
    AOS.init({
        duration: 1000, // global duration for animations
        once: true,    // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out and in when scrolling past them
    });

    // --- Typing Effect for Hero Section ---
    const taglineElement = document.querySelector('.hero-text .typing-effect');
    const phrases = [
        "Beautiful Digital Experiences",
        "Seamless User Interfaces",
        "Innovative Solutions"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150; // Milliseconds per character
    let deletingSpeed = 70; // Milliseconds per character when deleting
    let pauseBetweenPhrases = 2000; // Milliseconds to pause before typing next phrase or deleting

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            taglineElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            taglineElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentTypingSpeed = typingSpeed;
        if (isDeleting) {
            currentTypingSpeed = deletingSpeed;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentTypingSpeed = pauseBetweenPhrases;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentTypingSpeed = 500; // Small pause before starting next phrase
        }

        setTimeout(typeWriter, currentTypingSpeed);
    }

    // Start the typing effect when the DOM is fully loaded
    if (taglineElement) {
        typeWriter();
    }


    // --- Hamburger Menu Toggle Function ---
    window.toggleMenu = function() {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.toggle('active');
    };

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('#nav-menu ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close the mobile menu if it's open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }

                // Smooth scroll to the target section
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(this);
            const actionUrl = this.getAttribute('action'); // Get the GetForm.io URL

            try {
                const response = await fetch(actionUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Important for GetForm.io to return JSON response
                    }
                });

                const result = await response.json(); // Get the JSON response

                if (response.ok) { // Check if the response status is 2xx (success)
                    formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                    formMessage.style.backgroundColor = 'rgba(57, 255, 20, 0.2)'; // Green for success
                    formMessage.style.borderColor = 'var(--clr-highlight-glow-green)';
                    formMessage.style.color = 'var(--clr-highlight-glow-green)';
                    contactForm.reset(); // Clear the form
                } else {
                    // Handle non-OK responses (e.g., validation errors from GetForm.io)
                    console.error('Form submission error:', result);
                    formMessage.textContent = result.message || 'Oops! There was an error sending your message. Please try again later.';
                    formMessage.style.backgroundColor = 'rgba(233, 69, 96, 0.2)'; // Red for error
                    formMessage.style.borderColor = 'var(--clr-accent-primary)';
                    formMessage.style.color = 'var(--clr-accent-primary)';
                }
            } catch (error) {
                console.error('Network error during form submission:', error);
                formMessage.textContent = 'Network error. Please check your internet connection and try again.';
                formMessage.style.backgroundColor = 'rgba(233, 69, 96, 0.2)'; // Red for error
                formMessage.style.borderColor = 'var(--clr-accent-primary)';
                formMessage.style.color = 'var(--clr-accent-primary)';
            } finally {
                formMessage.style.display = 'block'; // Show the message
                // Hide message after a few seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 7000);
            }
        });
    }
});