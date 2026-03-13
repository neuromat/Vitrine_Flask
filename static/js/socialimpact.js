<<<<<<< HEAD
// static/js/socialimpact.js
// ---------------------------------------------------------
// Controla o carregamento da seção "Impacto Social".
// Atualizado conforme ABNT NBR 17225:2025 – item 5.13.8 (4.1.3) – Mensagens de status
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {

    // 5.13.8 (4.1.3) Mensagens de status
    function showStatusMessage(message) {
        const statusDiv = document.getElementById("status-message");
        if (statusDiv) statusDiv.textContent = message;
    }

=======
document.addEventListener("DOMContentLoaded", async () => {
>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d
    const container = document.getElementById("socialimpact-content");

    if (!container) {
        console.error("Elemento #socialimpact-content não encontrado.");
        return;
    }

<<<<<<< HEAD
    container.innerHTML = "<p>Carregando dados de impacto social...</p>";
    showStatusMessage("Carregando dados de impacto social...");

=======
>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d
    try {
        const response = await fetch("/api/social-impact");
        if (!response.ok) throw new Error("Erro na resposta da API");
        const data = await response.json();
<<<<<<< HEAD
        container.innerHTML = data.html || "<p>Dados não disponíveis.</p>";

        showStatusMessage("Dados de impacto social carregados com sucesso.");
    } catch (error) {
        console.error("Erro ao carregar dados de impacto social:", error);
        container.innerHTML = "<p>Não foi possível carregar os dados de impacto social.</p>";
        showStatusMessage("Não foi possível carregar os dados de impacto social.");
    }
});
=======
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
>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d
