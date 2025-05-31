// static/js/academic.js
// [REFATORADO] baseado no modelo de researchers.js

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
    // 1) Carrega textos e todas as queries
    const [introHtml, barIntroHtml, barMiddleHtml, barEndHtml, barFinalHtml,
           q1, q2, q3, q4] = await Promise.all([
      fetch("/static/content/academic/intro.html").then(r => r.ok ? r.text() : Promise.reject("Erro intro")),
      fetch("/static/content/academic/bar-intro.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-intro")),
      fetch("/static/content/academic/bar-middle.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-middle")),
      fetch("/static/content/academic/bar-end.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-end")),
      fetch("/static/content/academic/bar-final.html").then(r => r.ok ? r.text() : Promise.reject("Erro bar-final")),
      fetch("/static/queries/academic-graph-1.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query1")),
      fetch("/static/queries/academic-bar-2.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query2")),
      fetch("/static/queries/academic-bar-3.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query3")),
      fetch("/static/queries/academic-bar-4.txt").then(r => r.ok ? r.text() : Promise.reject("Erro query4")),
    ]);

    // 2) Limpa comentários e espaços
    const clean = q => q.replace(/^#.*\n/g, "").trim();
    const cq1 = clean(q1), cq2 = clean(q2), cq3 = clean(q3), cq4 = clean(q4);

    // 3) Monta os iframes com fragmento '#'
    const iframe1 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq1)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;
    const iframe2 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq2)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;
    const iframe3 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq3)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;
    const iframe4 = `<iframe src="https://query.wikidata.org/embed.html#${encodeURIComponent(cq4)}" width="100%" height="500" style="border:none;" loading="lazy"></iframe>`;

    // 4) Renderiza
    container.innerHTML = `
      ${introHtml}
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
