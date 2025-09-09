// script.js

document.addEventListener("DOMContentLoaded", function() {

    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.sidebar .nav-link');

    // --- Funcionalidad del Menú Móvil ---

    // Función para cerrar el menú
    function closeSidebar() {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-open');
    }

    // Abrir/Cerrar menú con el botón hamburguesa
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-open');
    });

    // Cerrar menú al hacer clic en el overlay
    overlay.addEventListener('click', closeSidebar);

    // --- Funcionalidad de Navegación ---
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Si estamos en vista móvil (el sidebar se puede abrir/cerrar), ciérralo
                if (window.innerWidth <= 992) {
                    closeSidebar();
                }
            }
        });
    });

    // Resaltar el link activo mientras se hace scroll
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null, // el viewport
        rootMargin: '0px',
        threshold: 0.3 // 30% de la sección debe ser visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quitar 'active' de todos los links
                navLinks.forEach(link => link.classList.remove('active'));

                // Añadir 'active' al link correspondiente
                const activeLink = document.querySelector(`.sidebar .nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});


document.addEventListener("DOMContentLoaded", function() {

    // --- CÓDIGO PARA LA GALERÍA DE VISIONARIOS ---
    
    // 1. Seleccionamos TODOS los elementos que necesitan la animación
    const animatedTextElements = document.querySelectorAll(".animated-text");

    if (animatedTextElements.length > 0) {
        
        // 2. Función que maneja la animación para UN solo elemento
        const typeWriter = (element, definitions) => {
            let paragraphIndex = 0;
            let charIndex = 0;
            const typingSpeed = 80; // Más lento: 80ms por carácter
            const pauseBetween = 3500; // Pausa más larga

            const type = () => {
                element.classList.add("is-typing");
                if (charIndex < definitions[paragraphIndex].length) {
                    element.innerHTML += definitions[paragraphIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, typingSpeed);
                } else {
                    element.classList.remove("is-typing");
                    setTimeout(erase, pauseBetween);
                }
            };
            
            const erase = () => {
                element.classList.add("is-typing");
                if (charIndex > 0) {
                    element.innerHTML = definitions[paragraphIndex].substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(erase, typingSpeed / 2); // Borra más rápido
                } else {
                    element.classList.remove("is-typing");
                    paragraphIndex = (paragraphIndex + 1) % definitions.length;
                    setTimeout(type, 500); // Pequeña pausa antes de empezar de nuevo
                }
            };
            
            // Iniciar la animación para este elemento
            type();
        };

        // 3. Iteramos sobre cada elemento y le iniciamos su propia animación
        animatedTextElements.forEach(element => {
            // Obtenemos las frases desde el atributo 'data-text' del HTML
            // Esto lo hace más modular y fácil de mantener
            const textData = element.getAttribute("data-text");
            if (textData) {
                try {
                    const definitions = JSON.parse(textData);
                    if (Array.isArray(definitions) && definitions.length > 0) {
                         typeWriter(element, definitions);
                    }
                } catch(e) {
                    console.error("Error al parsear el data-text del elemento:", element, e);
                }
            }
        });
    }

    // El resto de tu código de script.js va aquí...
    // (el código del menú, scroll, etc.)
});