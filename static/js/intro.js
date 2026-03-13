// static/js/intro.js
// ---------------------------------------------------------
// Atualiza dinamicamente o conteúdo de intro.html com dados
// da Wikidata (artigos, citações e autores do NeuroMat).
//
// O conteúdo é injetado dentro da <div id="intro-content">,
// que por sua vez está contida em <div id="academic-content">,
// mantendo compatibilidade com outros scripts como academic.js.
//
// Criado em: 16 de junho de 2025
// Revisado para acessibilidade em: 12 de novembro de 2025
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", async function () {
<<<<<<< HEAD
    // ABNT 5.13.8 (WCAG 4.1.3) – Mensagens de status acessíveis
    function showStatusMessage(message) {
        const statusDiv = document.getElementById("status-message");
        if (statusDiv) {
            statusDiv.textContent = message;
            // Garante leitura automática por leitores de tela
            statusDiv.setAttribute("role", "status");
            statusDiv.setAttribute("aria-live", "polite");
        }
    }

=======
>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d
    const introContainer = document.getElementById("intro-content");
    if (!introContainer) {
        console.error("Elemento #intro-content não encontrado.");
        return;
    }

<<<<<<< HEAD
    // ---------------------------------------------------------
    // Mensagem inicial de carregamento e notificação acessível
    // ---------------------------------------------------------
=======
>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d
    introContainer.innerHTML = "<p>Carregando introdução...</p>";

    const headers = { 'Accept': 'application/sparql-results+json' };
    const endpoint = "https://query.wikidata.org/sparql";

    try {
        // ---------------------------------------------------------
        // Carrega as 3 queries SPARQL dos arquivos locais (.txt)
        // ---------------------------------------------------------
        const [q1, q2, q3] = await Promise.all([
            fetch("/static/queries/count_articles.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar count_articles.txt")),
            fetch("/static/queries/count_citations.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar count_citations.txt")),
            fetch("/static/queries/count_authors.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar count_authors.txt"))
        ]);

        // ---------------------------------------------------------
        // Função auxiliar para executar uma query SPARQL
        // ---------------------------------------------------------
        const fetchQuery = async (query) => {
            const url = `${endpoint}?query=${encodeURIComponent(query)}&format=json`;
            const res = await fetch(url, { headers });
            if (!res.ok) throw new Error("Erro ao buscar dados SPARQL");
            const json = await res.json();
            return Object.values(json.results.bindings[0])[0].value;
        };

        // ---------------------------------------------------------
        // Executa as queries e obtém os valores dinâmicos
        // ---------------------------------------------------------
        const [artigos, citacoes, autores] = await Promise.all([
            fetchQuery(q1),
            fetchQuery(q2),
            fetchQuery(q3)
        ]);

        // ---------------------------------------------------------
        // Carrega o HTML base com placeholders [[1]], [[2]], [[3]]
        // ---------------------------------------------------------
        const rawHtml = await fetch("/static/content/academic/intro.html")
            .then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar intro.html"));

        // Substitui os placeholders pelos dados reais
        const processedHtml = rawHtml
            .replace(/\[\[1\]\]/g, artigos)
            .replace(/\[\[2\]\]/g, citacoes)
            .replace(/\[\[3\]\]/g, autores);

        // ---------------------------------------------------------
        // Insere o conteúdo processado e define foco (ABNT 5.1.15)
        // ---------------------------------------------------------
        introContainer.innerHTML = processedHtml;

<<<<<<< HEAD
        // Após o carregamento dinâmico, move o foco para o container
        // garantindo coerência de navegação por teclado e leitores de tela
        introContainer.focus();

        // ---------------------------------------------------------
        // Mensagem de sucesso (ABNT 5.13.8)
        // ---------------------------------------------------------
        showStatusMessage("Introdução carregada com sucesso.");

    } catch (error) {
        console.error("Erro ao carregar conteúdo da introdução:", error);
        introContainer.innerHTML = "<p>Não foi possível carregar os dados de introdução.</p>";

        // ---------------------------------------------------------
        // Mensagem de erro acessível (ABNT 5.13.8)
        // ---------------------------------------------------------
        showStatusMessage("Não foi possível carregar os dados de introdução.");
=======
    } catch (error) {
        console.error("Erro ao carregar conteúdo da introdução:", error);
        introContainer.innerHTML = "<p>Não foi possível carregar os dados de introdução.</p>";
>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d
    }
});
