// static/js/script.js
// ---------------------------------------------------------
// Script global carregado em todas as páginas da Vitrine NeuroMat.
// Adiciona suporte para mensagens de status acessíveis conforme
// ABNT NBR 17225:2025 – item 5.13.8 (4.1.3) – Mensagens de status.
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    // 5.13.8 (4.1.3) Mensagens de status
    // Função responsável por enviar mensagens acessíveis para leitores de tela.
    function showStatusMessage(message) {
        const statusDiv = document.getElementById("status-message");
        if (statusDiv) statusDiv.textContent = message;
    }

    console.log("Global script loaded successfully!");

    // 5.13.8 (4.1.3) Mensagens de status
    // Exibe mensagem acessível informando que os scripts globais foram carregados.
    showStatusMessage("Scripts globais carregados com sucesso.");
});
