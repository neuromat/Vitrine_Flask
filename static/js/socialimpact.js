document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("socialimpact-content");

    if (!container) {
        console.error("Elemento #socialimpact-content não encontrado.");
        return;
    }

    try {
        const response = await fetch("/api/social-impact");
        if (!response.ok) throw new Error("Erro na resposta da API");
        const data = await response.json();
        container.innerHTML = data.html || "<p>Dados não disponíveis</p>";
    } catch (error) {
        console.error("Erro ao carregar dados de impacto social:", error);
        container.innerHTML = "<p>Não foi possível carregar os dados de impacto social.</p>";
    }
});

// Formulário de busca
const form = document.getElementById("altmetric-search-form");
const resultDiv = document.getElementById("altmetric-result");

if (form && resultDiv) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        const titulo = document.getElementById("article-title").value.trim();
        
        if (!titulo) {
            resultDiv.innerHTML = "<p class='error'>Digite um título para buscar.</p>";
            return;
        }

        resultDiv.innerHTML = "<p>Buscando informações...</p>";

        try {
            const response = await fetch("/api/social-impact/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo })
            });

            if (!response.ok) throw new Error("Erro na busca");

            const data = await response.json();

            if (data.erro) {
                resultDiv.innerHTML = `<p class='error'>${data.erro}</p>`;
            } else {
                resultDiv.innerHTML = `
                    <div class="result-box">
                        <h4>${data.title}</h4>
                        <ul>
                            <li>Altmetric Score: ${data.doi_score}</li>
                            <li>Leitores: ${data.readers}</li>
                            <li>Menções no Twitter: ${data.tweeters}</li>
                            <li>Menções na Wikipédia: ${data.wikipedia}</li>
                        </ul>
                    </div>
                `;
            }
        } catch (err) {
            console.error("Erro na busca:", err);
            resultDiv.innerHTML = `<p class='error'>Erro ao buscar o artigo: ${err.message}</p>`;
        }
    });
}