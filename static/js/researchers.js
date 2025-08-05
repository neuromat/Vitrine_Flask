// Este script carrega a seção "Pesquisadores" dinamicamente a partir de HTML e consultas SPARQL
// Atualizado em 4-8-25: removido as queries que só funcionam federedas
// contém 2 gráficos nessa seção

document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("researchers-content");
  if (!container) {
    console.error("Elemento #researchers-content não encontrado.");
    return;
  }

  const endpoint = "https://query.wikidata.org/sparql";
  const headers = { 'Accept': 'application/sparql-results+json' };

  try {
    // Carrega HTMLs e SPARQLs (queryBar foi removida)
    const [
      introHtml,
      statsHtml,
      qMap,
      countryListQuery,
      ...queryTexts
    ] = await Promise.all([
      fetch("/static/content/researchers/intro.html").then(r => r.text()),
      fetch("/static/content/researchers/stats.html").then(r => r.text()),
      fetch("/static/queries/researchers/researchers-map.txt").then(r => r.text()),
      fetch("/static/queries/researchers/researchers-country-list.txt").then(r => r.text()),
      ...Array.from({ length: 7 }, (_, i) =>
        fetch(`/static/queries/researchers/researchers-stat-${i + 1}.txt`).then(r => r.text())
      )
    ]);

    // Busca lista de países
    const countryResp = await fetch(`${endpoint}?query=${encodeURIComponent(countryListQuery)}`, { headers });
    const countryData = await countryResp.json();
    const countries = countryData.results.bindings.map(b => b.paisLabel.value);

    const formattedCountryList = countries.length > 1
      ? `${countries.slice(0, -1).join(', ')} e ${countries.slice(-1)}`
      : countries[0] || "diversos países";

    // Executa as 7 queries para [[1]] a [[7]]
    const statResults = await Promise.all(
      queryTexts.map(query =>
        fetch(`${endpoint}?query=${encodeURIComponent(query)}`, { headers })
          .then(r => r.json())
          .then(data => data.results.bindings[0].valor.value)
      )
    );

    // Substituição dos placeholders no intro
    const introRender = introHtml
      .replace('[[1]]', statResults[0])
      .replace('[[2]]', statResults[1])
      .replace('[[3]]', formattedCountryList);

    // Substituição dos placeholders no stats
    const statsRender = statsHtml
      .replace('[[1]]', statResults[0])
      .replace('[[2]]', statResults[1])
      .replace('[[3]]', statResults[2])
      .replace('[[4]]', statResults[3])
      .replace('[[5]]', statResults[4])
      .replace('[[6]]', statResults[5])
      .replace('[[7]]', statResults[6]);

    // Gera o gráfico do mapa apenas
    const iframeMap = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(qMap)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;

    // Renderiza a seção sem o gráfico de barras
    container.innerHTML = `
      ${introRender}
      ${iframeMap}
      ${statsRender}
    `;

  } catch (err) {
    console.error("Erro na seção Pesquisadores:", err);
    container.innerHTML = `<p>Erro ao carregar dados da seção Pesquisadores.</p>`;
  }
});
