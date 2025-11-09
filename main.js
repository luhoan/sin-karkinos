// Sin Karkinos - Main JavaScript File
const SinKarkinos = {
    init: function() {
        this.setupParticles();
        this.setupTypewriter();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupFadeInAnimations();
    },

    setupParticles: function() {
        // Constellation background configuration
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 150,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ffffff', '#0F766E', '#1E3A8A', '#F8FAFC']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#0F766E',
                    opacity: 0.4,
                    width: 1,
                    consent: {
                        distance: 100,
                        opacity: 0.5
                    }
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    },

    setupTypewriter: function() {
        // Typewriter effect for hero title
        const typed = new Typed('#typed-text', {
            strings: [
                'The Future of Detection',
                'AI-Powered Medicine',
                'Sin Karkinos'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    },

    setupScrollAnimations: function() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax effect for particles
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('#particles-js');
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        });
    },

    setupNavigation: function() {
        // Navigation highlight on scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-teal-400');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-teal-400');
                }
            });
        });
    },

    setupMobileMenu: function() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    },

    setupFadeInAnimations: function() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
};

// Global functions for button interactions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// MRI Upload and Detection Simulation
const DetectionSystem = {
    currentFile: null,
    
    init: function() {
        this.setupFileUpload();
        this.setupDetectionButton();
    },

    setupFileUpload: function() {
        const fileInput = document.getElementById('mri-upload');
        const uploadArea = document.getElementById('upload-area');
        const previewImage = document.getElementById('mri-preview');

        if (fileInput && uploadArea && previewImage) {
            // Click to upload
            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });

            // Drag and drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('border-teal-400', 'bg-teal-400/10');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('border-teal-400', 'bg-teal-400/10');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('border-teal-400', 'bg-teal-400/10');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileUpload(files[0]);
                }
            });

            // File input change
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileUpload(e.target.files[0]);
                }
            });
        }
    },

    handleFileUpload: function(file) {
        if (file.type.startsWith('image/')) {
            this.currentFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewImage = document.getElementById('mri-preview');
                const placeholderDiv = document.getElementById('mri-placeholder');
                
                if (previewImage && placeholderDiv) {
                    previewImage.src = e.target.result;
                    previewImage.classList.remove('hidden');
                    placeholderDiv.classList.add('hidden');
                    
                    // Enable scan button
                    const scanBtn = document.getElementById('scan-btn');
                    if (scanBtn) {
                        scanBtn.disabled = false;
                        scanBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                        scanBtn.classList.add('glow-effect');
                    }
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file.');
        }
    },

    setupDetectionButton: function() {
        const scanBtn = document.getElementById('scan-btn');
        if (scanBtn) {
            scanBtn.addEventListener('click', () => {
                if (this.currentFile) {
                    this.simulateDetection();
                } else {
                    alert('Please upload an MRI image first.');
                }
            });
        }
    },

    simulateDetection: function() {
        const scanBtn = document.getElementById('scan-btn');
        const resultsDiv = document.getElementById('detection-results');
        const loadingDiv = document.getElementById('loading-state');

        // Show loading state
        scanBtn.disabled = true;
        scanBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
        `;

        if (loadingDiv) {
            loadingDiv.classList.remove('hidden');
        }

        // Simulate API call delay
        setTimeout(() => {
            this.showResults();
        }, 3000);
    },

    showResults: function() {
        const scanBtn = document.getElementById('scan-btn');
        const resultsDiv = document.getElementById('detection-results');
        const loadingDiv = document.getElementById('loading-state');

        // Hide loading state
        if (loadingDiv) {
            loadingDiv.classList.add('hidden');
        }

        // Generate mock results
        const confidence = (Math.random() * 15 + 85).toFixed(1);
        const detection = Math.random() > 0.3 ? 'Tumor Detected' : 'No Tumor Detected';
        const tumorType = detection === 'Tumor Detected' ? 
            ['Glioma', 'Meningioma', 'Pituitary Tumor'][Math.floor(Math.random() * 3)] : 
            'N/A';

        // Show results
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                    <h3 class="text-xl font-bold mb-4 text-teal-400">Detection Results</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-300">Status:</span>
                            <span class="font-semibold ${detection === 'Tumor Detected' ? 'text-red-400' : 'text-green-400'}">${detection}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-300">Confidence:</span>
                            <span class="font-semibold text-blue-400">${confidence}%</span>
                        </div>
                        ${detection === 'Tumor Detected' ? `
                        <div class="flex justify-between">
                            <span class="text-gray-300">Type:</span>
                            <span class="font-semibold text-amber-400">${tumorType}</span>
                        </div>
                        ` : ''}
                    </div>
                    <div class="mt-4">
                        <div class="w-full bg-gray-700 rounded-full h-2">
                            <div class="bg-gradient-to-r from-teal-400 to-blue-500 h-2 rounded-full transition-all duration-1000" style="width: ${confidence}%"></div>
                        </div>
                    </div>
                </div>
            `;
            resultsDiv.classList.remove('hidden');
        }

        // Reset scan button
        scanBtn.disabled = false;
        scanBtn.innerHTML = 'Scan Another Image';
        scanBtn.classList.remove('glow-effect');
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    SinKarkinos.init();
    DetectionSystem.init();
});

// Smooth page transitions
function navigateToPage(url) {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Add page transition styles
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '1';
});