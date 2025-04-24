// static/js/socialimpact.js
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("socialimpact-content");

    if (!container) {
        console.error("Elemento #socialimpact-content não encontrado.");
        return;
    }

    try {
        const response = await fetch("/social-impact-data");
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.error("Erro ao carregar dados de impacto social:", error);
        container.innerHTML = "<p>Não foi possível carregar os dados de impacto social.</p>";
    }
});
