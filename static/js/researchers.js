// static/js/researchers.js
// ---------------------------------------------------------
// Carrega dinamicamente a seção "Pesquisadores" a partir de
// arquivos HTML e consultas SPARQL da Wikidata.
//
// Contém dois gráficos, sendo um principal (mapa). O foco
// do teclado não entra nos iframes. O conteúdo textual é
// atualizado de forma acessível conforme ABNT NBR 17225:2025.
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", async function () {

  // 5.13.8 (WCAG 4.1.3) – Mensagens de status acessíveis
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

  // Mensagem inicial de carregamento
  container.innerHTML = `<p>Carregando dados dos pesquisadores...</p>`;
  showStatusMessage("Carregando dados dos pesquisadores...");

  const endpoint = "https://query.wikidata.org/sparql";
  const scholarlyEndpoint = "https://query-scholarly.wikidata.org/sparql";
  const headers = { 'Accept': 'application/sparql-results+json' };

  try {
    // Carrega HTMLs e SPARQLs
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
      // Busca as 7 queries de estatística
      ...Array.from({ length: 7 }, (_, i) =>
        fetch(`/static/queries/researchers/researchers-stat-${i + 1}.txt`).then(r => r.text())
      )
    ]);

    // Lista de países (lógica mantida)
    const countryResp = await fetch(`${endpoint}?query=${encodeURIComponent(countryListQuery)}`, { headers });
    const countryData = await countryResp.json();
    const countries = countryData.results.bindings.map(b => b.paisLabel.value);

    const formattedCountryList = countries.length > 1
      ? `${countries.slice(0, -1).join(', ')} e ${countries.slice(-1)}`
      : countries[0] || "diversos países";


    // --- ALTERAÇÃO PRINCIPAL AQUI ---

    // 1. Executa todas as queries e pega o JSON cru (sem tentar ler valor ainda),
    const rawResults = await Promise.all(
      queryTexts.map((query, index) => {
        const targetEndpoint = (index === 3) ? scholarlyEndpoint : endpoint; // na query 4, o endpoint muda para capturar os dados corretos
        return fetch(`${targetEndpoint}?query=${encodeURIComponent(query)}`, { headers })
          .then(r => r.json());
      })
    );

    // 2. Função auxiliar para extrair "?valor" das queries de contagem (1, 2, 3, 5, 6, 7)
    const getCountValue = (index) => {
      try {
        return rawResults[index].results.bindings[0].valor.value;
      } catch (e) {
        console.warn(`Query ${index + 1} não retornou valor padrão.`);
        return "0";
      }
    };

    // 3. Processamento ESPECIAL para a Query 4 (Lista de temas que a produção científica do NeuroMat)
    // A Query 4 retorna rows com ?assuntoLabel, não ?valor
    const subjectsRaw = rawResults[3].results.bindings;
    const subjectsList = subjectsRaw.map(item => item.assuntoLabel.value); // Cria array de strings

    // Garante que temos pelo menos 5 termos para não quebrar o replace (preenche com vazio se faltar)
    const safeSubject = (idx) => subjectsList[idx] || "";


    // Substituição de marcadores no INTRO
    const introRender = introHtml
      .replace('[[1]]', getCountValue(0)) // Query 1
      .replace('[[2]]', getCountValue(1)) // Query 2
      .replace('[[3]]', formattedCountryList);

    // Substituição de marcadores no STATS
    // Aqui adaptamos para o seu novo texto com [[V]], [[W]], etc.
    // Se você ainda estiver usando [[4]], ele vai juntar os termos com vírgula.
    let statsRender = statsHtml
      .replace('[[1]]', getCountValue(0)) // Query 1 (Total Pessoas)
      .replace('[[2]]', getCountValue(1)) // Query 2 (Instituições)
      .replace('[[3]]', getCountValue(2)) // Query 3 (Áreas)

      // -- AQUI ENTRAM OS ASSUNTOS DA QUERY 4 --
      // Se o seu HTML tiver [[V]], [[W]], etc:
      .replace('[[V]]', safeSubject(0))
      .replace('[[W]]', safeSubject(1))
      .replace('[[X]]', safeSubject(2))
      .replace('[[Y]]', safeSubject(3))
      .replace('[[Z]]', safeSubject(4))

      // Fallback: Se o seu HTML ainda usa [[4]], coloca a lista inteira separada por vírgula
      .replace('[[4]]', subjectsList.join(', '))

      .replace('[[5]]', getCountValue(4)) // Mantido conforme seu pedido
      .replace('[[6]]', getCountValue(5))
      .replace('[[7]]', getCountValue(6));

    // Descrição longa oculta para o mapa
    const longDesc = `
      <p id="descricao-mapa" class="visually-hidden">
        O mapa mostra a distribuição geográfica dos pesquisadores vinculados ao CEPID NeuroMat.
        Cada marcador representa um país associado a pelo menos um pesquisador da rede.
        A densidade visual dos marcadores indica a concentração de participantes em cada região.
      </p>
    `;

    // Iframe do gráfico do mapa (5.13.4 / 5.1.15)
    const iframeMap = `
      <div id="iframe-container-map" aria-label="Mapa de distribuição dos pesquisadores do NeuroMat" role="region" tabindex="-1"></div>
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

    // Renderização final
    container.innerHTML = `
      ${introRender}
      ${longDesc}
      ${iframeMap}
      ${statsRender}
    `;

      // 5.13.8 – Mensagem de sucesso acessível
    showStatusMessage("Dados dos pesquisadores carregados com sucesso.");

  } catch (err) {
    console.error("Erro na seção Pesquisadores:", err);
    container.innerHTML = `<p>Erro ao carregar dados da seção Pesquisadores.</p>`;
    showStatusMessage("Não foi possível carregar os dados da seção Pesquisadores.");
  }
});
