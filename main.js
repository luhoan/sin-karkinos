// Sin Karkinos - Main JavaScript File (Single Page Version)
const SinKarkinos = {
    init: function() {
        this.setupParticles();
        this.setupTypewriter();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupFadeInAnimations();
        this.setupDetectionSystem();
    },

    setupParticles: function() {
        // Monochrome constellation background configuration
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 200,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#FFFFFF' // Pure white stars
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
                        opacity_min: 0.3,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: '#FFFFFF',
                    opacity: 0.2,
                    width: 1,
                    consent: {
                        distance: 80,
                        opacity: 0.3
                    }
                },
                move: {
                    enable: true,
                    speed: 0.5,
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
                        distance: 150,
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

        // Update active navigation on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-link');
            const scrollDots = document.querySelectorAll('.scroll-dot');
            
            let current = '';
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // Update navigation links
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });

            // Update scroll dots
            scrollDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-section') === current) {
                    dot.classList.add('active');
                }
            });
        });
    },

    setupNavigation: function() {
        // Mobile menu functionality
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

    setupMobileMenu: function() {
        // Handle mobile menu visibility on resize
        window.addEventListener('resize', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
            }
        });
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
    },

    setupDetectionSystem: function() {
        // Initialize detection system after DOM is loaded
        if (document.getElementById('mri-upload')) {
            DetectionSystem.init();
        }
    }
};

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
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
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
                    const scanBtnText = document.getElementById('scan-btn-text');
                    if (scanBtn) {
                        scanBtn.disabled = false;
                        scanBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                        scanBtnText.textContent = 'Scan MRI for Analysis';
                    }
                    
                    // Update image info
                    this.updateImageInfo({
                        format: file.type.split('/')[1].toUpperCase(),
                        size: this.formatFileSize(file.size),
                        dimensions: 'Loading...',
                        time: new Date().toLocaleTimeString()
                    });
                    
                    // Show image info
                    const imageInfo = document.getElementById('image-info');
                    if (imageInfo) {
                        imageInfo.classList.remove('hidden');
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
        const scanBtnText = document.getElementById('scan-btn-text');
        const resultsDiv = document.getElementById('detection-results');
        const loadingDiv = document.getElementById('loading-state');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');

        // Show loading state
        scanBtn.disabled = true;
        scanBtnText.innerHTML = `
            <div class="flex items-center justify-center space-x-2">
                <div class="loading-spinner w-5 h-5 rounded-full"></div>
                <span>Analyzing...</span>
            </div>
        `;

        if (loadingDiv) {
            loadingDiv.classList.remove('hidden');
        }

        // Simulate progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            if (progressText) {
                if (progress < 30) {
                    progressText.textContent = 'Initializing analysis...';
                } else if (progress < 60) {
                    progressText.textContent = 'Processing neural network layers...';
                } else if (progress < 90) {
                    progressText.textContent = 'Analyzing features and patterns...';
                } else {
                    progressText.textContent = 'Generating results...';
                }
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    this.showResults();
                }, 500);
            }
        }, 100);
    },

    showResults: function() {
        const scanBtn = document.getElementById('scan-btn');
        const scanBtnText = document.getElementById('scan-btn-text');
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
                <div class="card rounded-xl p-6 max-w-2xl mx-auto">
                    <h3 class="text-xl font-bold mb-4 text-white text-center">Detection Results</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Status:</span>
                            <span class="font-semibold ${detection === 'Tumor Detected' ? 'text-red-400' : 'text-green-400'}">${detection}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Confidence:</span>
                            <span class="font-semibold text-white">${confidence}%</span>
                        </div>
                        ${detection === 'Tumor Detected' ? `
                        <div class="flex justify-between items-center">
                            <span class="text-gray-300">Type:</span>
                            <span class="font-semibold text-white">${tumorType}</span>
                        </div>
                        ` : ''}
                    </div>
                    <div class="mt-6">
                        <div class="progress-bar h-3">
                            <div class="progress-fill transition-all duration-1000" style="width: ${confidence}%"></div>
                        </div>
                        <p class="text-sm text-gray-400 mt-2 text-center">Confidence Level</p>
                    </div>
                    <div class="mt-6 text-center">
                        <button onclick="DetectionSystem.resetAnalysis()" class="btn-primary px-6 py-2 rounded-lg font-semibold">
                            Scan Another Image
                        </button>
                    </div>
                </div>
            `;
            resultsDiv.classList.remove('hidden');
        }

        // Reset scan button
        scanBtn.disabled = false;
        scanBtnText.textContent = 'Scan Another Image';
    },

    resetAnalysis: function() {
        const resultsDiv = document.getElementById('detection-results');
        const scanBtn = document.getElementById('scan-btn');
        const scanBtnText = document.getElementById('scan-btn-text');
        
        if (resultsDiv) {
            resultsDiv.classList.add('hidden');
        }
        
        scanBtn.disabled = true;
        scanBtnText.textContent = 'Upload Image to Enable Scan';
        this.currentFile = null;
    },

    updateImageInfo: function(info) {
        const formatElement = document.getElementById('image-format');
        const sizeElement = document.getElementById('image-size');
        const dimensionsElement = document.getElementById('image-dimensions');
        const timeElement = document.getElementById('upload-time');

        if (formatElement) formatElement.textContent = info.format;
        if (sizeElement) sizeElement.textContent = info.size;
        if (dimensionsElement) dimensionsElement.textContent = info.dimensions;
        if (timeElement) timeElement.textContent = info.time;
    },

    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// Sample image data for demonstration
const sampleImages = {
    healthy: '0_No_Tumor.png',
    glioma: '1_Glioma_Tumor.png',
    meningioma: '2_Meningioma_Tumor.png',
    pituitary: '3_Pituitary_Tumor.png'
};

function loadSampleImage(type) {
    const preview = document.getElementById('mri-preview');
    const placeholder = document.getElementById('mri-placeholder');
    
    preview.src = sampleImages[type];
    preview.classList.remove('hidden');
    placeholder.classList.add('hidden');
    
    // Enable scan button
    const scanBtn = document.getElementById('scan-btn');
    const scanBtnText = document.getElementById('scan-btn-text');
    if (scanBtn) {
        scanBtn.disabled = false;
        scanBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        scanBtnText.textContent = 'Scan MRI for Analysis';
    }
    
    // Update image info
    DetectionSystem.updateImageInfo({
        format: 'PNG',
        size: '2.4 MB',
        dimensions: '512×512',
        time: new Date().toLocaleTimeString()
    });
    
    // Show image info
    const imageInfo = document.getElementById('image-info');
    if (imageInfo) {
        imageInfo.classList.remove('hidden');
    }
    
    DetectionSystem.currentFile = { name: `${type}_sample.png`, type: 'image/png' };
}

// Global scroll function for button clicks
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    SinKarkinos.init();
});