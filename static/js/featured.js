// static/js/featured.js
// Carrega a query de contagem de arquivo .txt em static/queries/


document.addEventListener("DOMContentLoaded", async function () {
    // 5.13.8 (4.1.3) Mensagens de status
    function showStatusMessage(message) {
        const statusDiv = document.getElementById("status-message");
        if (statusDiv) statusDiv.textContent = message;
    }

    const container = document.getElementById("featured-article-content");
    if (!container) {
        console.error("Elemento #featured-article-content não encontrado.");
        return;
    }

    // 5.13.8 (4.1.3) Mensagens de status
    container.innerHTML = "<p>Carregando conteúdo do artigo em destaque...</p>";
    showStatusMessage("Carregando conteúdo do artigo em destaque...");

    let queryGraph = '';
    let queryCount = '';

    try {
        const headers = {
            'Accept': 'application/sparql-results+json'
        };
        const endpoint = "https://query-scholarly.wikidata.org/sparql";

        //Carregar queries de arquivos.txt
        const [qGraph, qCount] = await Promise.all([
            fetch("/static/queries/featured-graph.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar featured-graph.txt")), //grafo 1
            fetch("/static/queries/featured-count.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar featured-count.txt")) //contagem de pesquisadores e artigos do neuromat para gerar parágrafo
        ]);

        queryGraph = qGraph;
        queryCount = qCount;

        // Limpar comentário do SPARQL do grafo
        const cleanedQuery = queryGraph.replace(/^#.*\n/g, "").trim();
        const iframeSrc = "https://query-scholarly.wikidata.org/embed.html#" + encodeURIComponent(cleanedQuery);

        //Executar query dinâmica de contagem
        const resCount = await fetch(endpoint + "?query=" + encodeURIComponent(queryCount) + "&format=json", { headers });
        if (!resCount.ok) throw new Error("Erro ao buscar contagem de pesquisadores/artigos");

        const dataCount = await resCount.json();
        const pesquisadores = dataCount.results.bindings[0].Pesquisadores.value;
        const artigos = dataCount.results.bindings[0].Artigos.value;

        // ABNT 5.13.3 / WCAG 3.1.2 (AA)
        container.innerHTML = `
           <p>O artigo <a href='https://www.wikidata.org/wiki/Q56592766' target='_blank' rel="noopener noreferrer" title="Abre em nova aba" lang="en">Infinite Systems of Interacting Chains with Memory of Variable Length—A Stochastic Model for Biological Neural Nets</a>, escrito por <a href='https://www.wikidata.org/wiki/Q17489997' target='_blank' rel="noopener noreferrer" title="Abre em nova aba">Antonio Galves</a> e <a href='https://www.wikidata.org/wiki/Q59267761' target='_blank' rel="noopener noreferrer" title="Abre em nova aba">Eva Löcherbach</a> em 2013, constitui a pedra angular do <a href='https://www.wikidata.org/wiki/Q18477654' target='_blank' rel="noopener noreferrer" title="Abre em nova aba">Centro de Pesquisa, Inovação e Difusão em Neuromatemática (CEPID NeuroMat)</a>. Este trabalho introduziu um novo modelo para redes neurais e lançou uma nova linha de investigação.</p>

<p>No contexto do CEPID NeuroMat, participaram desta linha <strong>${pesquisadores}</strong> pesquisadores que produziram <strong>${artigos}</strong> artigos com base no modelo de 2013 ou contribuições posteriores. O modelo fundador do NeuroMat, chamado <a href='https://www.wikidata.org/wiki/Q24575409' target='_blank' rel="noopener noreferrer" title="Abre em nova aba">Modelo Galves-Löcherbach</a>, foi também o objeto de análise de publicações não filiadas ao NeuroMat, como: <a href='https://www.wikidata.org/wiki/Q98839723' target='_blank' rel="noopener noreferrer" title="Abre em nova aba" lang="en">Replica-Mean-Field Limits for Intensity-Based Neural Networks</a>.</p>

<p role="alert">
    <span aria-hidden="true">⚠️</span>
    Os dados apresentados são obtidos dinamicamente do endpoint <code>query-scholarly.wikidata.org</code>, que está em desenvolvimento e pode conter informações incompletas ou inconsistentes.
</p>

<p><a href="https://query-scholarly.wikidata.org/#${encodeURIComponent(cleanedQuery)}" target="_blank" rel="noopener noreferrer" title="Abre em nova aba">Experimente a consulta completa!</a></p>

<div id="iframe-container" aria-label="Visualização do grafo de produção científica do NeuroMat" role="region"></div>
                <iframe title="grafo com relação da produção científica do NeuroMat" // ABNT 5.13.4 / WCAG 1.3.1 (A), 4.1.2 (A)
                    src="${iframeSrc}"
                    width="100%"
                    height="500"
                    style="border: none;"
                    loading="lazy"
                ></iframe>
            </div>
        `;

    // 5.13.8 (4.1.3) Mensagens de status
        showStatusMessage("Conteúdo do artigo em destaque carregado com sucesso.");

    } catch (error) {
        console.error("Erro ao carregar conteúdo do artigo em destaque:", error);
        container.innerHTML = "<p>Não foi possível carregar os dados do artigo em destaque.</p>";
    // 5.13.8 (4.1.3) Mensagens de status
        showStatusMessage("Não foi possível carregar os dados do artigo em destaque.");
    }
});
