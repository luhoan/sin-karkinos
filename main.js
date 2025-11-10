// Sin Karkinos - Production Version
const SinKarkinos = {
    init: function() {
        this.setupParticles();
        this.setupTypewriter();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupFadeInAnimations();
        this.setupDetectionSystem();
        this.wakeUpSpace();  // ← ADD THIS LINE
        
    },
    
    setupParticles: function() {
        particlesJS('particles-js', {
            particles: {
                number: { value: 200, density: { enable: true, value_area: 800 } },
                color: { value: '#FFFFFF' },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
                opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.3, sync: false } },
                size: { value: 2, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
                line_linked: { enable: true, distance: 120, color: '#FFFFFF', opacity: 0.2, width: 1 },
                move: { enable: true, speed: 0.5, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { repulse: { distance: 150, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    },

    setupTypewriter: function() {
        new Typed('#typed-text', {
            strings: ['The Future of Detection', 'AI-Powered Medicine', 'Sin Karkinos'],
            typeSpeed: 80, backSpeed: 50, backDelay: 2000, startDelay: 500, loop: true, cursorChar: '|'
        });
    },

    setupScrollAnimations: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

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

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
            });

            scrollDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-section') === current) dot.classList.add('active');
            });
        });
    },

    setupNavigation: function() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
            });
        }
    },

    setupMobileMenu: function() {
        window.addEventListener('resize', () => {
            const mobileMenu = document.getElementById('mobile-menu');
            if (window.innerWidth >= 768) mobileMenu.classList.add('hidden');
        });
    },

    setupFadeInAnimations: function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    },

    setupDetectionSystem: function() {
        if (document.getElementById('mri-upload')) DetectionSystem.init();
    }
};

// MRI Detection System - Production
const DetectionSystem = {
    currentFile: null,
    // CHANGE THIS TO YOUR HUGGING FACE SPACE URL
    apiEndpoint: 'https://huggingface.co/spaces/luhoan/SegFormerB0_MRI',
    
    init: function() {
        this.setupFileUpload();
        this.setupDetectionButton();
    },

    setupFileUpload: function() {
        const fileInput = document.getElementById('mri-upload');
        const uploadArea = document.getElementById('upload-area');

        if (fileInput && uploadArea) {
            uploadArea.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
            uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                if (e.dataTransfer.files.length > 0) this.handleFileUpload(e.dataTransfer.files[0]);
            });
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) this.handleFileUpload(e.target.files[0]);
            });
        }
    },

    handleFileUpload: function(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }
        
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('mri-preview');
            const placeholder = document.getElementById('mri-placeholder');
            
            if (preview && placeholder) {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
                placeholder.classList.add('hidden');
                
                const scanBtn = document.getElementById('scan-btn');
                const scanBtnText = document.getElementById('scan-btn-text');
                if (scanBtn) {
                    scanBtn.disabled = false;
                    scanBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    scanBtnText.textContent = 'Scan MRI for Analysis';
                }
                
                this.updateImageInfo({
                    format: file.type.split('/')[1].toUpperCase(),
                    size: this.formatFileSize(file.size),
                    dimensions: 'Loading...',
                    time: new Date().toLocaleTimeString()
                });
                
                const img = new Image();
                img.onload = () => {
                    this.updateImageInfo({
                        format: file.type.split('/')[1].toUpperCase(),
                        size: this.formatFileSize(file.size),
                        dimensions: `${img.width}×${img.height}`,
                        time: new Date().toLocaleTimeString()
                    });
                };
                img.src = e.target.result;
                
                document.getElementById('image-info')?.classList.remove('hidden');
            }
        };
        reader.readAsDataURL(file);
    },

    setupDetectionButton: function() {
        const scanBtn = document.getElementById('scan-btn');
        if (scanBtn) {
            scanBtn.addEventListener('click', () => {
                if (this.currentFile) this.performDetection();
                else alert('Please upload an MRI image first.');
            });
        }
    },

    performDetection: async function() {
        const scanBtn = document.getElementById('scan-btn');
        const scanBtnText = document.getElementById('scan-btn-text');
        const loadingDiv = document.getElementById('loading-state');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');

        scanBtn.disabled = true;
        scanBtnText.innerHTML = `
            <div class="flex items-center justify-center space-x-2">
                <div class="loading-spinner w-5 h-5 rounded-full"></div>
                <span>Analyzing...</span>
            </div>
        `;
        if (loadingDiv) loadingDiv.classList.remove('hidden');

        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;
            if (progressBar) progressBar.style.width = progress + '%';
            if (progressText) {
                if (progress < 30) progressText.textContent = 'Initializing neural network...';
                else if (progress < 60) progressText.textContent = 'Processing through SegFormer layers...';
                else if (progress < 90) progressText.textContent = 'Analyzing medical features...';
                else progressText.textContent = 'Generating diagnosis...';
            }
        }, 100);

        try {
            const formData = new FormData();
            formData.append('data', this.currentFile);
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const result = await response.json();
            clearInterval(progressInterval);
            
            if (result.error) throw new Error(result.error);
            
            this.showResults(result);
            
        } catch (error) {
            clearInterval(progressInterval);
            alert(`Detection failed: ${error.message}. Please ensure the backend server is running at ${this.apiEndpoint}`);
            this.resetAnalysis();
        }
    },

    showResults: function(result) {
        const scanBtn = document.getElementById('scan-btn');
        const scanBtnText = document.getElementById('scan-btn-text');
        const resultsDiv = document.getElementById('detection-results');
        const loadingDiv = document.getElementById('loading-state');

        if (loadingDiv) loadingDiv.classList.add('hidden');

        const detection = result.label === 'no_tumor' ? 'No Tumor Detected' : 'Tumor Detected';
        const tumorType = result.label === 'no_tumor' ? 'N/A' : result.display_label;

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
                            <span class="font-semibold text-white">${result.confidence}%</span>
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
                            <div class="progress-fill transition-all duration-1000" style="width: ${result.confidence}%"></div>
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

        scanBtn.disabled = false;
        scanBtnText.textContent = 'Scan Another Image';
    },

    resetAnalysis: function() {
        const resultsDiv = document.getElementById('detection-results');
        const scanBtn = document.getElementById('scan-btn');
        const scanBtnText = document.getElementById('scan-btn-text');
        const preview = document.getElementById('mri-preview');
        const placeholder = document.getElementById('mri-placeholder');
        
        if (resultsDiv) resultsDiv.classList.add('hidden');
        if (scanBtn) {
            scanBtn.disabled = true;
            scanBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        if (scanBtnText) scanBtnText.textContent = 'Upload Image to Enable Scan';
        if (preview && placeholder) {
            preview.classList.add('hidden');
            placeholder.classList.remove('hidden');
        }
        
        this.currentFile = null;
        document.getElementById('image-info')?.classList.add('hidden');
    },

    updateImageInfo: function(info) {
        const formatEl = document.getElementById('image-format');
        const sizeEl = document.getElementById('image-size');
        const dimensionsEl = document.getElementById('image-dimensions');
        const timeEl = document.getElementById('upload-time');
        
        if (formatEl) formatEl.textContent = info.format;
        if (sizeEl) sizeEl.textContent = info.size;
        if (dimensionsEl) dimensionsEl.textContent = info.dimensions;
        if (timeEl) timeEl.textContent = info.time;
    },

    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// Sample images - NO resources/ prefix
const sampleImages = {
    healthy: '0_No_Tumor.png',
    glioma: '1_Glioma_Tumor.png',
    meningioma: '2_Meningioma_Tumor.png',
    pituitary: '3_Pituitary_Tumor.png'
};

async function loadSampleImage(type) {
    try {
        const response = await fetch(sampleImages[type]);
        if (!response.ok) throw new Error('Sample image not found');
        
        const blob = await response.blob();
        const file = new File([blob], `${type}_sample.png`, { type: 'image/png' });
        DetectionSystem.handleFileUpload(file);
    } catch (error) {
        alert(`Could not load sample image: ${error.message}. Please ensure sample images are in the root directory.`);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => SinKarkinos.init());
