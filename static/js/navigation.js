// Arquivo relacionado a navegação do site
// Atende principalmente as questões de foco visível (WCAG 2.4.11 AA)

document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleciona todos os links de navegação âncora e as seções correspondentes
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    // Adiciona o seletor para garantir que estamos pegando elementos com o ID
    const sections = document.querySelectorAll('main section[id]');

    // 2. Função para atualizar o atributo aria-current
    function updateAriaCurrent(currentSectionId) {
        // Remove aria-current de todos os links
        navLinks.forEach(link => {
            link.removeAttribute('aria-current');
            // Remove a classe 'active' visual (necessário para a correção do CSS)
            link.classList.remove('active');
        });

        // Adiciona aria-current ao link que corresponde à seção atual
        const currentLink = document.querySelector(`nav a[href="#${currentSectionId}"]`);
        if (currentLink) {
            currentLink.setAttribute('aria-current', 'page');
            // Adiciona a classe 'active' visual (necessário para a correção do CSS)
            currentLink.classList.add('active');
        }
    }

    // 3. Usa Intersection Observer para monitorar o scroll e visibilidade da seção
    if (sections.length > 0) {

        // Define as opções para o Intersection Observer
        const observerOptions = {
            // Ajusta o ponto de gatilho para a parte superior da tela (30% abaixo do topo)
            // Isso garante que a seção seja marcada como ativa assim que ela vira o foco principal de leitura.
            rootMargin: '0px 0px -70% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Quando uma seção entra na área de intersecção, atualiza o menu.
                    updateAriaCurrent(entry.target.id);
                }
            });
        }, observerOptions); // Usa as opções definidas acima

        // Observa cada seção
        sections.forEach(section => {
            observer.observe(section);
        });

        // Define o estado inicial se não houver hash na URL
        const initialSectionId = window.location.hash.substring(1) || (sections.length > 0 ? sections[0].id : null);
        if (initialSectionId) {
            updateAriaCurrent(initialSectionId);
        }
    }

    // 4. Lógica para o clique nos links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);

            // Atualiza o atributo imediatamente após o clique (boa UX/Acessibilidade)
            updateAriaCurrent(targetId);

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault(); // Impede o salto brusco padrão do âncora
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); //5.1.2, 5.1.3, 2.4.7
                targetElement.focus({ preventScroll: true });

                // Rola suavemente até o elemento
                targetElement.scrollIntoView({ behavior: 'smooth' }); //ABNT 5.1.2 / WCAG 2.4.11 (AA): o foco visual é preservado e o elemento focado se torna visível  na janela de visualização
            }
        });
    });
});