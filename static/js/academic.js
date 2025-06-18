// static/js/academic.js
// [REFATORADO] para integrar substituição dos placeholders da introdução
// com carregamento dos gráficos e seções adicionais

document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("academic-content");
  if (!container) {
    console.error("Elemento #academic-content não encontrado.");
    return;
  }

  container.innerHTML = `<p>Carregando conteúdo de publicações acadêmicas...</p>`;

  const endpoint = "https://query.wikidata.org/sparql";
  const headers = { 'Accept': 'application/sparql-results+json' };

  try {
    // 1) Carrega textos, queries de gráficos e queries de contagem
    const [
      introHtml, barIntroHtml, barMiddleHtml, barEndHtml, barFinalHtml,
      q1, q2, q3, q4,
      qArtigos, qCitacoes, qAutores
    ] = await Promise.all([
      fetch("/static/content/academic/intro.html").then(r => r.ok ? r.text() : Promise.reject("Erro intro")),
      fetch("/static/content/academic/bar-intro.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-intro")),
      fetch("/static/content/academic/bar-middle.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-middle")),
      fetch("/static/content/academic/bar-end.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-end")),
      fetch("/static/content/academic/bar-final.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-final")),
      fetch("/static/queries/academic-graph-1.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query1")),
      fetch("/static/queries/academic-bar-2.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query2")),
      fetch("/static/queries/academic-bar-3.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query3")),
      fetch("/static/queries/academic-bar-4.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query4")),
      fetch("/static/queries/count_articles.txt").then(r => r.ok ? r.text() : Promise.reject("Erro artigos")),
      fetch("/static/queries/count_citations.txt").then(r => r.ok ? r.text() : Promise.reject("Erro citacoes")),
      fetch("/static/queries/count_authors.txt").then(r => r.ok ? r.text() : Promise.reject("Erro autores"))
    ]);

    // 2) Limpa os comentários SPARQL
    const clean = q => q.replace(/^#.*\n/g, "").trim();
    const cq1 = clean(q1), cq2 = clean(q2), cq3 = clean(q3), cq4 = clean(q4);

    // 3) Executa as queries de contagem para substituir os placeholders
    const fetchQuery = async (query) => {
      const url = `${endpoint}?query=${encodeURIComponent(query)}&format=json`;
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error("Erro ao buscar dados SPARQL");
      const json = await res.json();
      return Object.values(json.results.bindings[0])[0].value;
    };

    const [artigos, citacoes, autores] = await Promise.all([
      fetchQuery(qArtigos),
      fetchQuery(qCitacoes),
      fetchQuery(qAutores)
    ]);

    // 4) Substitui os placeholders na introdução
    const processedIntro = introHtml
      .replace(/\[\[1\]\]/g, artigos)
      .replace(/\[\[2\]\]/g, citacoes)
      .replace(/\[\[3\]\]/g, autores);

    // 5) Monta os iframes com as queries de gráfico
    const iframe1 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq1)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;
    const iframe2 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq2)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;
    const iframe3 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq3)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;
    const iframe4 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq4)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;

    // 6) Renderiza todo o conteúdo dentro do container
    container.innerHTML = `
      ${processedIntro}
      ${iframe1}

      ${barIntroHtml}
      ${iframe2}

      ${barMiddleHtml}
      ${iframe3}

      ${barEndHtml}
      ${iframe4}

      ${barFinalHtml}
    `;

  } catch (err) {
    console.error("Erro na seção Publicações Acadêmicas:", err);
    container.innerHTML = `<p>Não foi possível carregar a seção de publicações acadêmicas.</p>`;
  }
});
