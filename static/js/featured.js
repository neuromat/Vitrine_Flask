// static/js/featured.js
// [ATUALIZADO] mantém o texto original em português conforme aprovado

document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("featured-article-content");
    if (!container) {
        console.error("Elemento #featured-article-content não encontrado.");
        return;
    }

    container.innerHTML = "<p>Carregando conteúdo do artigo em destaque...</p>";

    let queryResearchers = '';
    let queryArticles = '';
    let queryGraph = '';
    let queryJournals = '';

    try {
        const headers = {
            'Accept': 'application/sparql-results+json'
        };
        const endpoint = "https://query.wikidata.org/sparql";

        // Carregar queries necessárias
        const [q1, q2, q3, q4] = await Promise.all([
            fetch("/static/queries/featured-researchers.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar featured-researchers.txt")),
            fetch("/static/queries/featured-articles.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar featured-articles.txt")),
            fetch("/static/queries/featured-graph.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar featured-graph.txt")),
            fetch("/static/queries/featured-journals.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao carregar featured-journals.txt"))
        ]);

        queryResearchers = q1;
        queryArticles = q2;
        queryGraph = q3;
        queryJournals = q4;

        const [res1, res2, res3] = await Promise.all([
            fetch(endpoint + "?query=" + encodeURIComponent(queryResearchers) + "&format=json", { headers }),
            fetch(endpoint + "?query=" + encodeURIComponent(queryArticles) + "&format=json", { headers }),
            fetch(endpoint + "?query=" + encodeURIComponent(queryJournals) + "&format=json", { headers })
        ]);

        const data1 = await res1.json();
        const pesquisadores = data1.results.bindings[0].Pesquisadores.value;

        const data2 = await res2.json();
        const artigos = data2.results.bindings[0].Artigos.value;

        const revistas = (await res3.json()).results.bindings;

        let revistas_parceiras = `<a href='${revistas[0].QID.value}' target='_blank'>${revistas[0].artigosLabel.value}</a>`;
        for (let i = 1; i < revistas.length; i++) {
            revistas_parceiras += (i === revistas.length - 1 ? " e " : ", ") + `<a href='${revistas[i].QID.value}' target='_blank'>${revistas[i].artigosLabel.value}</a>`;
        }

        const cleanedQuery = queryGraph.replace(/^#.*\n/, "").trim();
        const iframeSrc = "https://query.wikidata.org/embed.html#" + encodeURIComponent(cleanedQuery);

        container.innerHTML = `
            <p>&nbsp; O artigo <a href='https://www.wikidata.org/wiki/Q56592766' target='_blank'>Infinite Systems of Interacting Chains with Memory of Variable Length—A Stochastic Model for Biological Neural Nets</a>, escrito por <a href='https://www.wikidata.org/wiki/Q17489997' target='_blank'>Antonio Galves</a> e <a href='https://www.wikidata.org/wiki/Q59267761' target='_blank'>Eva Löcherbach</a> em 2013, constitui a pedra angular do <a href='https://www.wikidata.org/wiki/Q18477654' target='_blank'>Centro de Pesquisa, Inovação e Difusão em Neuromatemática (CEPID NeuroMat)</a>. Este trabalho introduziu um novo modelo para redes neurais e lançou uma nova linha de investigação.</p>
            <p>&nbsp; No contexto do CEPID NeuroMat, participaram desta linha <strong>${pesquisadores}</strong> pesquisadores que produziram <strong>${artigos}</strong> artigos com base no modelo de 2013 ou contribuições posteriores. O modelo fundador do NeuroMat, chamado <a href='https://www.wikidata.org/wiki/Q24575409'>Modelo Galves-Löcherbach</a>, foi também o objeto de análise de publicações não filiadas ao NeuroMat, como: ${revistas_parceiras}.</p>
            <p><a href="https://query.wikidata.org/#${encodeURIComponent(queryGraph)}" target="_blank">Experimente a consulta completa!</a></p>
            <div id="iframe-container">
                <iframe
                    src="${iframeSrc}"
                    width="100%"
                    height="500"
                    style="border: none;"
                    loading="lazy"
                ></iframe>
            </div>
        `;

    } catch (error) {
        console.error("Erro ao carregar conteúdo do artigo em destaque:", error);
        container.innerHTML = "<p>Não foi possível carregar os dados do artigo em destaque.</p>";
    }
});
