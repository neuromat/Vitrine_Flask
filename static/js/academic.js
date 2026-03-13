// static/js/academic.js
<<<<<<< HEAD
// Substitui placeholders em intro.html, carrega gráficos e blocos adicionais
// Atualizado para acessibilidade (ABNT 5.13.8 – Mensagens de status WCAG 4.1.3, iframes com title)
=======
// [ETAPA 2 COMPLETA] Substitui placeholders em intro.html, carrega gráficos e blocos adicionais
>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d

document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("academic-content");
  if (!container) {
    console.error("Elemento #academic-content não encontrado.");
    return;
  }

  container.innerHTML = `<p>Carregando conteúdo de publicações acadêmicas...</p>`;
<<<<<<< HEAD
  showStatusMessage("Carregando conteúdo de publicações acadêmicas..."); //ABNT 5.13.8
=======

>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d
  const endpoint = "https://query-scholarly.wikidata.org/sparql";
  const headers = { 'Accept': 'application/sparql-results+json' };

  try {

    // Define a função clean
    const clean = q =>
      q
        .split("\n")
        // Preserva a linha que começa com #defaultView
        .filter(line => line.trim().startsWith("#defaultView") || !line.trim().startsWith("#"))
        .join("\n")
        .trim();

    // 1) Carrega textos, queries e .html em variáveis (ainda em paralelo, pois são arquivos estáticos rápidos)
    const [
      introHtml, barEndHtml, barFinalHtml,
      q1, q4,
      qArtigos, qCitacoes, qAutores
    ] = await Promise.all([
      fetch("/static/content/academic/intro.html").then(r => r.ok ? r.text() : Promise.reject("Erro intro")),
      fetch("/static/content/academic/bar-end.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-end")),
      fetch("/static/content/academic/bar-final.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-final")),
      fetch("/static/queries/academic-graph-1.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query1")),
      fetch("/static/queries/academic-bar-4.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query4")), //gráfico por ano
      fetch("/static/queries/count_articles.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao capturar valor total de artigos do Wikidata")),
      fetch("/static/queries/count_citations.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao capturar valor total de artigos do  citações do Wikidata")),
      fetch("/static/queries/count_authors.txt").then(r => r.ok ? r.text() : Promise.reject("Erro ao capturar valor total de artigos do autores do Wikidata"))
    ]);

<<<<<<< HEAD
    // Limpa todas as queries
=======
const clean = q =>
  q
    .split("\n")
    // Preserva a linha que começa com #defaultView
    .filter(line => line.trim().startsWith("#defaultView") || !line.trim().startsWith("#"))
    .join("\n")
    .trim();

>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d
    const cq1 = clean(q1), cq4 = clean(q4);
    const cqArtigos = clean(qArtigos);
    const cqCitacoes = clean(qCitacoes);
    const cqAutores = clean(qAutores);

    // Função de execução de consulta (apontando sempre para o Scholarly)
    const fetchQuery = async (query) => {
      const url = `${endpoint}?query=${encodeURIComponent(query)}&format=json`;
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error("Erro ao buscar dados SPARQL");
      return res.json();
    };

    // 2) Substituições em intro.html
    // Aqui, o JavaScript vai até o servidor Scholarly, executa a query e extrai apenas o número final (o valor da contagem):
    // *** CONTROLE DE CONCORRÊNCIA MÁXIMO (EXECUÇÃO SEQUENCIAL TOTAL) ***
    const artigos = await fetchQuery(cqArtigos).then(json => Object.values(json.results.bindings[0])[0].value);
    const citacoes = await fetchQuery(cqCitacoes).then(json => Object.values(json.results.bindings[0])[0].value);
    const autores = await fetchQuery(cqAutores).then(json => Object.values(json.results.bindings[0])[0].value);

    //Aqui é feito as substituições dos valores no arquivo intro.html
    const processedIntro = introHtml
      .replace(/\[\[1\]\]/g, artigos)
      .replace(/\[\[2\]\]/g, citacoes)
      .replace(/\[\[3\]\]/g, autores);

<<<<<<< HEAD
    // 3) Gráficos com acessibilidade
    // adicionado tabindex para que o foco não acesse o conteúdo interativo dos gráficos
    const iframe1 = `<iframe
      src="https://query-scholarly.wikidata.org/embed.html#${encodeURIComponent(cq1)}"
      width="100%" height="500" style="border:none;" loading="lazy"
      title="Gráfico de área com as publicações acadêmicas por, no mínimo, pares de autores, associados ao Neuromat, carregado da Wikidata"
      tabindex="-1"
      ></iframe>`;

    const iframe4 = `<iframe
      // Mantido no Scholarly, mas pode falhar devido à sobrecarga
      src="https://query-scholarly.wikidata.org/embed.html#${encodeURIComponent(cq4)}"
      width="100%" height="500"
      style="border:none;"
      loading="lazy"
      title="Gráfico de publicações por ano, carregado da Wikidata"
      tabindex="-1"
      ></iframe>`;

// 4) Renderização final
container.innerHTML = `
  ${processedIntro}
  ${iframe1}
  ${barEndHtml}
  ${iframe4}
  ${barFinalHtml}
`;

showStatusMessage("Conteúdo de publicações acadêmicas carregado com sucesso."); // ABNT 5.13.8
=======
    // 3) Gráficos
    const iframe1 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq1)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;
    const iframe4 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq4)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;

    // 4) Renderização final
    container.innerHTML = `
      ${processedIntro}
      ${iframe1}

      ${barEndHtml}
      ${iframe4}

      ${barFinalHtml}
    `;
>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d

  } catch (err) {
    console.error("Erro na seção Publicações Acadêmicas:", err);
    container.innerHTML = `<p>Não foi possível carregar a seção de publicações acadêmicas.</p>`;
  }
});