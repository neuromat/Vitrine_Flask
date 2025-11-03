# Acessibilidade - Implementações no JavaScript (Introdução & Artigo em Destaque)

Este documento lista as implementações de acessibilidade (ABNT NBR 17225 / WCAG) feitas no código JavaScript dos arquivos `intro.js` e `featured.js`.

---

## ABNT 5.13.8 (WCAG 4.1.3) Mensagens de Status (Status Messages)

A função `showStatusMessage` é uma implementação crucial para enviar feedback não visual sobre o estado da aplicação (carregamento, sucesso, erro) para tecnologias assistivas (leitores de tela), utilizando um elemento `aria-live`.

### Funções e Uso

1. **Implementação da Função (Comum a Todos os Arquivos):**
   ```javascript
   // 5.13.8 (4.1.3) Mensagens de status
   function showStatusMessage(message) {
       const statusDiv = document.getElementById("status-message");
       if (statusDiv) statusDiv.textContent = message;
   }

## ABNT 5.13.3 (WCAG 3.1.2) - Idioma do Conteúdo (Links)
Garante que o idioma de trechos de texto diferente do idioma principal da página seja identificado semanticamente.

Implementação:
Aplica o atributo lang="en" diretamente ao link (<a>) quando o título do artigo estiver em inglês, garantindo a pronúncia correta pelo leitor de tela.