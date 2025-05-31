// static/js/researchers.js
// [REFATORADO] Inspiração no featured.js para carregamento robusto de queries SPARQL e dados

document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("researchers-content");
  if (!container) {
    console.error("Elemento #researchers-content não encontrado.");
    return;
  }

  container.innerHTML = `<p>Carregando conteúdo de pesquisadores...</p>`;

  const endpoint = "https://query.wikidata.org/sparql";
  const headers = { 'Accept': 'application/sparql-results+json' };

  try {
    // 1) Carregar templates de texto e queries
    const [textHtml, statsHtml, q1, q2] = await Promise.all([
      fetch("/static/content/researchers/intro.html").then(r => r.ok ? r.text() : Promise.reject('Erro ao carregar intro.html')),
      fetch("/static/content/researchers/stats.html").then(r => r.ok ? r.text() : Promise.reject('Erro ao carregar stats.html')),
      fetch("/static/queries/researchers-graph-1.txt").then(r => r.ok ? r.text() : Promise.reject('Erro ao carregar researchers-graph-1.txt')),
      fetch("/static/queries/researchers-graph-2.txt").then(r => r.ok ? r.text() : Promise.reject('Erro ao carregar researchers-graph-2.txt'))
    ]);

    // 2) Executar queries JSON para contagem, se necessário
    // (Neste caso, gráficos embutidos diretamente via iframe)

    // 3) Limpar comentários do SPARQL para gráficos de grafo
    const cleanQ1 = q1.replace(/^#.*\n/g, "").trim();
    const cleanQ2 = q2.replace(/^#.*\n/g, "").trim();

    // 4) Construir IFrames com embed.html#
    const iframe1 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cleanQ1)}" ` +
                    `width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;
    const iframe2 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cleanQ2)}" ` +
                    `width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;

    // 5) Renderizar tudo junto
    container.innerHTML = `
      ${textHtml}
      ${iframe1}

      ${statsHtml}
      ${iframe2}
    `;

  } catch (err) {
    console.error("Erro na seção Pesquisadores:", err);
    container.innerHTML = `<p>Não foi possível carregar a seção de pesquisadores.</p>`;
  }
});
