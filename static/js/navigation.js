/* navigation.js — Controle da navegação e estados ativos */

let hasUserInteracted = false;

document.addEventListener('DOMContentLoaded', function() {

    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('main section[id]');

    /* ---------------------------------------------------------
       Função principal: atualiza aria-current + classe .active
       --------------------------------------------------------- */
    function updateAriaCurrent(currentSectionId) {
        navLinks.forEach(link => {
            link.removeAttribute('aria-current');
            link.classList.remove('active'); // garante reset global do estado visual
        });

        const currentLink = document.querySelector(`nav a[href="#${currentSectionId}"]`);

        if (currentLink) {
            currentLink.setAttribute('aria-current', 'page');
            currentLink.classList.add('active'); // ESSENCIAL para acionar o CSS do underline
        }
    }

    /* ---------------------------------------------------------
       IntersectionObserver — marca a seção ao rolar a página
       --------------------------------------------------------- */
    if (sections.length > 0) {

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && hasUserInteracted) {
                    updateAriaCurrent(entry.target.id);
                }
            });
        }, {
            rootMargin: '0px 0px -70% 0px',
            threshold: 0.1
        });

        sections.forEach(section => observer.observe(section));

        // Se o site abrir com hash na URL
        const initialSectionId = window.location.hash.substring(1);
        if (initialSectionId) {
            updateAriaCurrent(initialSectionId);
        }
    }

    /* ---------------------------------------------------------
       Clique do usuário no menu
       --------------------------------------------------------- */
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            hasUserInteracted = true;

            const targetId = this.getAttribute('href').substring(1);
            updateAriaCurrent(targetId);

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetElement.focus({ preventScroll: true });
            }
        });
    });
});
