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

    const container = document.getElementById("socialimpact-content");

    if (!container) {
        console.error("Elemento #socialimpact-content não encontrado.");
        return;
    }

    container.innerHTML = "<p>Carregando dados de impacto social...</p>";
    showStatusMessage("Carregando dados de impacto social...");

    try {
        const response = await fetch("/api/social-impact");
        if (!response.ok) throw new Error("Erro na resposta da API");

        const data = await response.json();
        container.innerHTML = data.html || "<p>Dados não disponíveis.</p>";

        showStatusMessage("Dados de impacto social carregados com sucesso.");
    } catch (error) {
        console.error("Erro ao carregar dados de impacto social:", error);
        container.innerHTML = "<p>Não foi possível carregar os dados de impacto social.</p>";
        showStatusMessage("Não foi possível carregar os dados de impacto social.");
    }
});
