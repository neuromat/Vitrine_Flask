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
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", async function () {

    // 5.13.8 (4.1.3) Mensagens de status
    // Função responsável por enviar mensagens acessíveis para leitores de tela
    function showStatusMessage(message) {
        const statusDiv = document.getElementById("status-message");
        if (statusDiv) statusDiv.textContent = message;
    }

    const introContainer = document.getElementById("intro-content");
    if (!introContainer) {
        console.error("Elemento #intro-content não encontrado.");
        return;
    }

    // 5.13.8 (4.1.3) Mensagens de status
    // Exibe mensagem inicial de carregamento e notifica tecnologias assistivas
    introContainer.innerHTML = "<p>Carregando introdução...</p>";
    showStatusMessage("Carregando introdução...");

    const headers = { 'Accept': 'application/sparql-results+json' };
    const endpoint = "https://query.wikidata.org/sparql";

    try {
        // Carrega as 3 queries SPARQL dos arquivos .txt
        const [q1, q2, q3] = await Promise.all([
            fetch("/static/queries/count_articles.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar count_articles.txt")),
            fetch("/static/queries/count_citations.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar count_citations.txt")),
            fetch("/static/queries/count_authors.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar count_authors.txt"))
        ]);

        // Função auxiliar para executar uma query SPARQL
        const fetchQuery = async (query) => {
            const url = `${endpoint}?query=${encodeURIComponent(query)}&format=json`;
            const res = await fetch(url, { headers });
            if (!res.ok) throw new Error("Erro ao buscar dados SPARQL");
            const json = await res.json();
            return Object.values(json.results.bindings[0])[0].value;
        };

        // Executa as queries para obter os valores
        const [artigos, citacoes, autores] = await Promise.all([
            fetchQuery(q1),
            fetchQuery(q2),
            fetchQuery(q3)
        ]);

        // Carrega o conteúdo base de intro.html (com os placeholders)
        const rawHtml = await fetch("/static/content/academic/intro.html")
            .then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar intro.html"));

        // Substitui os marcadores [[1]], [[2]], [[3]] com os dados reais
        const processedHtml = rawHtml
            .replace(/\[\[1\]\]/g, artigos)
            .replace(/\[\[2\]\]/g, citacoes)
            .replace(/\[\[3\]\]/g, autores);

        // Insere o conteúdo processado dentro do introContainer
        introContainer.innerHTML = processedHtml;

        // 5.13.8 (4.1.3) Mensagens de status
        // Notifica sucesso do carregamento ao leitor de tela
        showStatusMessage("Introdução carregada com sucesso.");

    } catch (error) {
        console.error("Erro ao carregar conteúdo da introdução:", error);
        introContainer.innerHTML = "<p>Não foi possível carregar os dados de introdução.</p>";

        // 5.13.8 (4.1.3) Mensagens de status
        // Informa a falha de carregamento de forma acessível
        showStatusMessage("Não foi possível carregar os dados de introdução.");
    }
});
