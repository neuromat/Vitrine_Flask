// static/js/academic.js
// [ETAPA 2 COMPLETA] Substitui placeholders em intro.html, carrega gráficos e blocos adicionais
// Atualizado para acessibilidade (ABNT 5.13.8 – Mensagens de status WCAG 4.1.3, iframes com title)

document.addEventListener("DOMContentLoaded", async function () {
  // ABNT 5.13.8 – Mensagens de status (WCAG 4.1.3)
  function showStatusMessage(message) {
    const statusDiv = document.getElementById("status-message");
    if (statusDiv) {
      statusDiv.textContent = message;
      // Para leitores de tela, usando ARIA
      statusDiv.setAttribute("role", "status");
      statusDiv.setAttribute("aria-live", "polite");
    }
  }

  const container = document.getElementById("academic-content");
  if (!container) {
    console.error("Elemento #academic-content não encontrado.");
    return;
  }

  container.innerHTML = `<p>Carregando conteúdo de publicações acadêmicas...</p>`;
  showStatusMessage("Carregando conteúdo de publicações acadêmicas..."); //ABNT 5.13.8

  const endpoint = "https://query-scholarly.wikidata.org/sparql";
  const headers = { 'Accept': 'application/sparql-results+json' };

  try {
    // 1) Carrega textos e queries
    const [
      introHtml, barEndHtml, barFinalHtml,
      q1, q4,
      qArtigos, qCitacoes, qAutores
    ] = await Promise.all([
      fetch("/static/content/academic/intro.html").then(r => r.ok ? r.text() : Promise.reject("Erro intro")),
      fetch("/static/content/academic/bar-end.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-end")),
      fetch("/static/content/academic/bar-final.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-final")),
      fetch("/static/queries/academic-graph-1.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query1")),
      fetch("/static/queries/academic-bar-4.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query4")),
      fetch("/static/queries/count_articles.txt").then(r => r.ok ? r.text() : Promise.reject("Erro artigos")),
      fetch("/static/queries/count_citations.txt").then(r => r.ok ? r.text() : Promise.reject("Erro citacoes")),
      fetch("/static/queries/count_authors.txt").then(r => r.ok ? r.text() : Promise.reject("Erro autores"))
    ]);

    const clean = q =>
      q
        .split("\n")
        // Preserva a linha que começa com #defaultView
        .filter(line => line.trim().startsWith("#defaultView") || !line.trim().startsWith("#"))
        .join("\n")
        .trim();

    const cq1 = clean(q1), cq4 = clean(q4);

    const fetchQuery = async (query) => {
      const url = `${endpoint}?query=${encodeURIComponent(query)}&format=json`;
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error("Erro ao buscar dados SPARQL");
      return res.json();
    };

    // 2) Substituições em intro.html
    const [artigos, citacoes, autores] = await Promise.all([
      fetchQuery(qArtigos).then(json => Object.values(json.results.bindings[0])[0].value),
      fetchQuery(qCitacoes).then(json => Object.values(json.results.bindings[0])[0].value),
      fetchQuery(qAutores).then(json => Object.values(json.results.bindings[0])[0].value)
    ]);

    const processedIntro = introHtml
      .replace(/\[\[1\]\]/g, artigos)
      .replace(/\[\[2\]\]/g, citacoes)
      .replace(/\[\[3\]\]/g, autores);

    // 3) Gráficos com acessibilidade
    const iframe1 = `<iframe
      src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq1)}"
      width="100%" height="500" style="border:none;" loading="lazy"
      title="Gráfico de publicações acadêmicas, carregado da Wikidata">
    </iframe>`;

    const iframe4 = `<iframe
      src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq4)}"
      width="100%" height="500"
      style="border:none;"
      loading="lazy"
      title="Gráfico de publicações por ano, carregado da Wikidata">
    </iframe>`;

    // 4) Renderização final
    container.innerHTML = `
      ${processedIntro}
      ${iframe1}
      ${barEndHtml}
      ${iframe4}
      ${barFinalHtml}
    `;
    showStatusMessage("Conteúdo de publicações acadêmicas carregado com sucesso."); //ABNT 5.13.8

  } catch (err) {
    console.error("Erro na seção Publicações Acadêmicas:", err);
    container.innerHTML = `<p>Não foi possível carregar a seção de publicações acadêmicas.</p>`;
    showStatusMessage("Não foi possível carregar a seção de publicações acadêmicas."); //ABNT 5.13.8
  }
});
