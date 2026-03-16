// static/js/featured.js
// 27-05: Carrega a query de contagem de arquivo .txt em static/queries/
// Atualizado conforme ABNT NBR 17225:2025 – Itens 5.1.15 (foco visível) e 5.13.8 (mensagens de status)

document.addEventListener("DOMContentLoaded", async function () {

    // ---------------------------------------------------------
    // ABNT 5.13.8 (WCAG 4.1.3) – Mensagens de status acessíveis
    // ---------------------------------------------------------
    function showStatusMessage(message) {
        const statusDiv = document.getElementById("status-message");
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.setAttribute("role", "status");
            statusDiv.setAttribute("aria-live", "polite");
        }
    }

    const container = document.getElementById("featured-article-content");
    if (!container) {
        console.error("Elemento #featured-article-content não encontrado.");
        return;
    }

    // Mensagem inicial de carregamento
    container.innerHTML = "<p>Carregando conteúdo do artigo em destaque...</p>";

    try {
        const headers = { 'Accept': 'application/sparql-results+json' };
        const endpoint = "https://query-scholarly.wikidata.org/sparql";

        // Carregar queries do diretório local
        const [qGraph, qCount] = await Promise.all([
            fetch("/static/queries/featured-graph.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar featured-graph.txt")),
            fetch("/static/queries/featured-count.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar featured-count.txt"))
        ]);

        const queryGraph = qGraph;
        const queryCount = qCount;

        // Limpar comentários SPARQL
        const cleanedQuery = queryGraph.replace(/^#.*\n/g, "").trim();
        const iframeSrc = "https://query-scholarly.wikidata.org/embed.html#" + encodeURIComponent(cleanedQuery);

        // Executar query dinâmica para contagem
        const resCount = await fetch(endpoint + "?query=" + encodeURIComponent(queryCount) + "&format=json", { headers });
        if (!resCount.ok) throw new Error("Erro ao buscar contagem de pesquisadores/artigos");

        const dataCount = await resCount.json();
        const pesquisadores = dataCount.results.bindings[0].Pesquisadores.value;
        const artigos = dataCount.results.bindings[0].Artigos.value;

        // ---------------------------------------------------------
        // ABNT 5.13.3 / WCAG 3.1.2 – Conteúdo multilíngue e contexto
        // ---------------------------------------------------------
        container.innerHTML = `
           <p>
                O artigo <a href='https://www.wikidata.org/wiki/Q56592766' target='_blank' rel="noopener noreferrer" title="Abre em nova aba" lang="en">
                Infinite Systems of Interacting Chains with Memory of Variable Length—A Stochastic Model for Biological Neural Nets</a>, escrito por
                <a href='https://www.wikidata.org/wiki/Q17489997' target='_blank' rel="noopener noreferrer" title="Abre em nova aba">Antonio Galves</a>
                e <a href='https://www.wikidata.org/wiki/Q59267761' target='_blank' rel="noopener noreferrer" title="Abre em nova aba">Eva Löcherbach</a> em 2013,
                constitui a pedra angular do <a href='https://www.wikidata.org/wiki/Q18477654' target='_blank' rel="noopener noreferrer" title="Abre em nova aba">
                Centro de Pesquisa, Inovação e Difusão em Neuromatemática (CEPID NeuroMat)</a>.
                Este trabalho introduziu um novo modelo para redes neurais e lançou uma nova linha de investigação.
           </p>
           <p>
                No contexto do CEPID NeuroMat, participaram desta linha <strong>${pesquisadores}</strong> pesquisadores que produziram <strong>${artigos}</strong>
                artigos com base no modelo de 2013 ou contribuições posteriores. O modelo fundador do NeuroMat, chamado <a href='https://www.wikidata.org/wiki/Q24575409'
                target='_blank' rel="noopener noreferrer" title="Abre em nova aba">Modelo Galves-Löcherbach</a>,
                foi também o objeto de análise de publicações não filiadas ao NeuroMat,
                como: <a href='https://www.wikidata.org/wiki/Q98839723' target='_blank' rel="noopener noreferrer" title="Abre em nova aba" lang="en">
                Replica-Mean-Field Limits for Intensity-Based Neural Networks</a>.
           </p>
           <p>
                Abaixo é mostrado um grafo interativo com a rede de citações entre as publicações científicas do CEPID NeuroMat, baseada nos itens da Wikidata.
           </p>
           <p id="descricao-grafo" class="visually-hidden">
                O grafo interativo apresenta a rede de citações entre as publicações científicas do CEPID NeuroMat, baseada nos itens da Wikidata.
                Cada nó representa um artigo do projeto, e as ligações indicam relações de citação entre trabalhos do próprio NeuroMat.
                As cores dos nós variam conforme o número de citações internas, indo do vermelho (menos citado) ao roxo (mais citado).
                Os rótulos mostram o nome do autor principal e o ano de publicação, permitindo observar a evolução das colaborações e os artigos mais influentes dentro da rede.
          </p>

           <p>
               <a href="https://query-scholarly.wikidata.org/#${encodeURIComponent(cleanedQuery)}" target="_blank" rel="noopener noreferrer" title="Abre em nova aba">Experimente a consulta completa!</a>
           </p>

            <div id="iframe-container" aria-label="Visualização do grafo de produção científica do NeuroMat" role="region" tabindex="-1">
                <iframe
                    title="grafo interativo com relação da produção científica do NeuroMat"
                    aria-describedby="descricao-grafo"
                    src="${iframeSrc}"
                    width="100%"
                    height="500"
                    style="border: none;"
                    loading="lazy"
                    tabindex="-1"
                ></iframe>
            </div>

            <div class="warning-box" role="alert">
                <p>
                    <span aria-hidden="true">⚠️</span>
                    Os dados apresentados nos gráficos são obtidos dinamicamente da Wikidata por meio do endpoint <code>query-scholarly.wikidata.org</code>,
                    e podem apresentar divergências de informação.
                </p>
            </div>
        `;
        container.focus();    // ABNT 5.1.15 – Foco visível e coerência de navegação
        showStatusMessage("Conteúdo do artigo em destaque carregado com sucesso.");

    } catch (error) {
        console.error("Erro ao carregar conteúdo do artigo em destaque:", error);
        container.innerHTML = "<p>Não foi possível carregar os dados do artigo em destaque.</p>";
        showStatusMessage("Não foi possível carregar os dados do artigo em destaque.");
    }
});