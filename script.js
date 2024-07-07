// Fonction pour animer l'apparition des produits
const animateProducts = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product').forEach(product => {
        product.classList.add('visible'); // Rend les produits visibles immédiatement
        observer.observe(product);
    });
};

// Fonction pour initialiser la carte OpenStreetMap
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error("L'élément 'map' n'existe pas dans le DOM");
        return;
    }
    
    const map = L.map('map').setView([43.44882, 5.23226], 13); // Coordonnées de Étoile et Gourmandises

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([43.44882, 5.23226]).addTo(map)
        .bindPopup('Étoile et Gourmandises')
        .openPopup();
}

// Fonction pour le défilement fluide
const smoothScroll = (target) => {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    }
};

// Gestion du menu hamburger
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

function toggleMobileMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
}

// Gestion du formulaire de commande
function setupOrderForm() {
    const orderForm = document.getElementById('orderForm');
    const orderStatus = document.getElementById('orderStatus');

    if (orderForm) {
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(orderForm);

            try {
                const response = await fetch(orderForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    orderStatus.textContent = "Merci ! Votre commande a été envoyée avec succès.";
                    orderStatus.style.color = "green";
                    orderForm.reset();
                } else {
                    orderStatus.textContent = "Désolé, une erreur s'est produite. Veuillez réessayer.";
                    orderStatus.style.color = "red";
                }
            } catch (error) {
                console.error('Error:', error);
                orderStatus.textContent = "Une erreur s'est produite lors de l'envoi de la commande.";
                orderStatus.style.color = "red";
            }

            orderStatus.style.display = "block";
        });
    }
}

// Gestion du formulaire de contact
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    formStatus.textContent = "Merci ! Votre message a été envoyé avec succès.";
                    formStatus.style.color = "green";
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Désolé, une erreur s'est produite. Veuillez réessayer.";
                    formStatus.style.color = "red";
                }
            } catch (error) {
                console.error('Error:', error);
                formStatus.textContent = "Une erreur s'est produite lors de l'envoi du formulaire.";
                formStatus.style.color = "red";
            }

            formStatus.style.display = "block";
        });
    }
}

// Fonction d'initialisation principale
function init() {
    animateProducts();
    initMap();
	setupOrderForm();
    setupContactForm();

    // Gestion du menu hamburger
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Gestion des clics sur les liens
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (!target) return;

        const href = target.getAttribute('href');

        if (href && href.startsWith('#')) {
            e.preventDefault();
            smoothScroll(href);
            closeMobileMenu();
        } else {
            // Pour les liens externes, laissez le comportement par défaut
            setTimeout(closeMobileMenu, 100);
        }
    });
}

// Lancer l'initialisation après le chargement du DOM
document.addEventListener('DOMContentLoaded', init);