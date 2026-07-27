// static/js/researchers.js
// ---------------------------------------------------------
// Carrega dinamicamente a seção "Pesquisadores" a partir de
// arquivos HTML e consultas SPARQL da Wikidata.
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", async function () {

  function showStatusMessage(message) {
    const statusDiv = document.getElementById("status-message");

    if (statusDiv) {
      statusDiv.textContent = message;
      statusDiv.setAttribute("role", "status");
      statusDiv.setAttribute("aria-live", "polite");
    }
  }

  const container = document.getElementById("researchers-content");

  if (!container) {
    console.error("Elemento #researchers-content não encontrado.");
    return;
  }

  container.innerHTML = `<p>Carregando dados dos pesquisadores...</p>`;
  showStatusMessage("Carregando dados dos pesquisadores...");

  const endpoint = "https://query.wikidata.org/sparql";
  const scholarlyEndpoint = "https://query-scholarly.wikidata.org/sparql";

  const headers = {
    Accept: "application/sparql-results+json"
  };

  // ===============================
  // FORMATADOR NATURAL DE LISTAS
  // ===============================
  function formatNaturalList(items, fallback = "") {
    const clean = (items || []).filter(Boolean);

    if (clean.length === 0) return fallback;
    if (clean.length === 1) return clean[0];
    if (clean.length === 2) return `${clean[0]} e ${clean[1]}`;

    return `${clean.slice(0, -1).join(", ")} e ${clean.at(-1)}`;
  }

  try {

    const [
      introHtml,
      statsHtml,
      bolsasStats,
      qMap,
      countryListQuery,
      ...queryTexts
    ] = await Promise.all([

      fetch("/static/content/researchers/intro.html").then(r => r.text()),
      fetch("/static/content/researchers/stats.html").then(r => r.text()),
      fetch("/api/researchers-stats").then(r => r.json()),
      fetch("/static/queries/researchers/researchers-map.txt").then(r => r.text()),
      fetch("/static/queries/researchers/researchers-country-list.txt").then(r => r.text()),

      ...Array.from({ length: 7 }, (_, i) =>
        fetch(`/static/queries/researchers/researchers-stat-${i + 1}.txt`)
          .then(r => r.text())
      )
    ]);

    // ===============================
    // PAÍSES
    // ===============================
    const countryResp = await fetch(
      `${endpoint}?query=${encodeURIComponent(countryListQuery)}`,
      { headers }
    );

    const countryData = await countryResp.json();

    const countries =
      countryData.results.bindings.map(b => b.paisLabel.value);

    const formattedCountryList =
      formatNaturalList(countries, "diversos países");

    // ===============================
    // EXECUÇÃO SPARQL
    // ===============================
    const rawResults = await Promise.all(
      queryTexts.map((query, index) => {
        const targetEndpoint =
          (index === 3) ? scholarlyEndpoint : endpoint;

        return fetch(
          `${targetEndpoint}?query=${encodeURIComponent(query)}`,
          { headers }
        ).then(r => r.json());
      })
    );

    const getCountValue = (index) => {
      try {
        return rawResults[index]
          .results
          .bindings[0]
          .valor
          .value;
      } catch (e) {
        console.warn(`Query ${index + 1} não retornou valor padrão.`);
        return "0";
      }
    };

    // ===============================
    // TEMAS (SUBJECTS)
    // ===============================
    const subjectsRaw =
      rawResults[3].results.bindings;

    const subjectsList =
      subjectsRaw.map(item => item.assuntoLabel.value);

    const safeSubject = (idx) =>
      subjectsList[idx] || "";

    const formattedSubjectsList =
      formatNaturalList(subjectsList);

    // ===============================
    // INTRO
    // ===============================
    const introRender = introHtml
      .replace(/\[\[1\]\]/g, getCountValue(0))
      .replace(/\[\[2\]\]/g, getCountValue(1))
      .replace(/\[\[3\]\]/g, formattedCountryList);

    // ===============================
    // CONTEXTO DE STATS (UNIFICADO)
    // ===============================
    const statsContext = {
      "[[1]]": getCountValue(0),
      "[[2]]": getCountValue(1),
      "[[3]]": getCountValue(2),
      "[[4]]": formattedSubjectsList,
      "[[5]]": getCountValue(4),
      "[[6]]": getCountValue(5),
      "[[7]]": getCountValue(6),

      "[[V]]": safeSubject(0),
      "[[W]]": safeSubject(1),
      "[[X]]": safeSubject(2),
      "[[Y]]": safeSubject(3),
      "[[Z]]": safeSubject(4),

      "[[B1]]": bolsasStats.total,
      "[[B2]]": bolsasStats.iniciacao_cientifica,
      "[[B3]]": bolsasStats.mestrado,
      "[[B4]]": bolsasStats.doutorado,
      "[[B5]]": bolsasStats.doutorado_direto,
      "[[B6]]": bolsasStats.pos_doutorado,
      "[[B7]]": bolsasStats.treinamento_tecnico,
      "[[B8]]": bolsasStats.jornalismo_cientifico,
      "[[B9]]": bolsasStats.pesquisa_exterior
    };

    let statsRender = statsHtml;

    for (const [key, value] of Object.entries(statsContext)) {
      statsRender = statsRender.replaceAll(key, value ?? "");
    }

    // ===============================
    // MAPA (ACESSIBILIDADE)
    // ===============================
    const longDesc = `
      <p id="descricao-mapa" class="visually-hidden">
        O mapa mostra a distribuição geográfica dos pesquisadores vinculados ao CEPID NeuroMat.
      </p>
    `;

    const iframeMap = `
      <div id="iframe-container-map"
           aria-label="Mapa de distribuição dos pesquisadores do NeuroMat"
           role="region"
           tabindex="-1"></div>

      <iframe
        title="Mapa interativo de distribuição geográfica dos pesquisadores do NeuroMat"
        aria-describedby="descricao-mapa"
        src="https://query.wikidata.org/embed.html#${encodeURIComponent(qMap)}"
        width="100%"
        height="500"
        style="border:none;"
        loading="lazy"
        tabindex="-1"
      ></iframe>
    `;

    // ===============================
    // RENDER FINAL
    // ===============================
    container.innerHTML = `
      ${introRender}
      ${longDesc}
      ${iframeMap}
      ${statsRender}
    `;

    showStatusMessage("Dados dos pesquisadores carregados com sucesso.");

  } catch (err) {

    console.error("Erro na seção Pesquisadores:", err);

    container.innerHTML =
      `<p>Erro ao carregar dados da seção Pesquisadores.</p>`;

    showStatusMessage(
      "Não foi possível carregar os dados da seção Pesquisadores."
    );
  }
});