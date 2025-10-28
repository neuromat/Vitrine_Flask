// static/js/socialimpact.js
// ---------------------------------------------------------
// Controla o carregamento da seção "Impacto Social" e
// o formulário de busca Altmetric.
// Atualizado conforme ABNT NBR 17225:2025 – item 5.13.8 (4.1.3) – Mensagens de status
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {

    // 5.13.8 (4.1.3) Mensagens de status
    // Função responsável por enviar mensagens acessíveis para leitores de tela
    function showStatusMessage(message) {
        const statusDiv = document.getElementById("status-message");
        if (statusDiv) statusDiv.textContent = message;
    }

    const container = document.getElementById("socialimpact-content");

    if (!container) {
        console.error("Elemento #socialimpact-content não encontrado.");
        return;
    }

    // 5.13.8 (4.1.3) Mensagens de status
    // Mensagem inicial de carregamento da seção
    container.innerHTML = "<p>Carregando dados de impacto social...</p>";
    showStatusMessage("Carregando dados de impacto social...");

    try {
        const response = await fetch("/api/social-impact");
        if (!response.ok) throw new Error("Erro na resposta da API");

        const data = await response.json();
        container.innerHTML = data.html || "<p>Dados não disponíveis</p>";

        // 5.13.8 (4.1.3) Mensagens de status
        // Notifica sucesso no carregamento
        showStatusMessage("Dados de impacto social carregados com sucesso.");

    } catch (error) {
        console.error("Erro ao carregar dados de impacto social:", error);
        container.innerHTML = "<p>Não foi possível carregar os dados de impacto social.</p>";

        // 5.13.8 (4.1.3) Mensagens de status
        // Informa a falha de forma acessível
        showStatusMessage("Não foi possível carregar os dados de impacto social.");
    }
});

// ---------------------------------------------------------
// Formulário de busca Altmetric
// ---------------------------------------------------------

const form = document.getElementById("altmetric-search-form");
const resultDiv = document.getElementById("altmetric-result");

if (form && resultDiv) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        const titulo = document.getElementById("article-title").value.trim();
        
        if (!titulo) {
            resultDiv.innerHTML = "<p class='error'>Digite um título para buscar.</p>";

            // 5.13.8 (4.1.3) Mensagens de status
            // Informa erro de campo vazio
            const statusDiv = document.getElementById("status-message");
            if (statusDiv) statusDiv.textContent = "Campo de título obrigatório não preenchido.";
            return;
        }

        // 5.13.8 (4.1.3) Mensagens de status
        // Indica início da busca
        resultDiv.innerHTML = "<p>Buscando informações...</p>";
        const statusDiv = document.getElementById("status-message");
        if (statusDiv) statusDiv.textContent = "Buscando informações sobre o artigo...";

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

                // 5.13.8 (4.1.3) Mensagens de status
                // Informa erro de busca retornado pela API
                if (statusDiv) statusDiv.textContent = data.erro;

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

                // 5.13.8 (4.1.3) Mensagens de status
                // Confirma sucesso da busca
                if (statusDiv) statusDiv.textContent = "Busca concluída com sucesso.";
            }

        } catch (err) {
            console.error("Erro na busca:", err);
            resultDiv.innerHTML = `<p class='error'>Erro ao buscar o artigo: ${err.message}</p>`;

            // 5.13.8 (4.1.3) Mensagens de status
            // Informa falha na busca de forma acessível
            if (statusDiv) statusDiv.textContent = "Erro ao buscar o artigo.";
        }
    });
}
