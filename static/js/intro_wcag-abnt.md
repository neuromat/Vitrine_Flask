# Acessibilidade - Implementações no JavaScript _intro.js_

Este documento lista as implementações de acessibilidade (ABNT NBR 17225 / WCAG) feitas no arquivo _intro.js_

---

## 5.13.8 (WCAG 4.1.3) Mensagens de Status (Status Messages)

A função `showStatusMessage` é responsável por enviar feedback não visual sobre o estado da aplicação (carregamento, sucesso, erro) para tecnologias assistivas (leitores de tela), utilizando um elemento `aria-live`.

### Funções e Uso:

1. **Implementação da Função:**
   ```javascript
   // Função responsável por enviar mensagens acessíveis para leitores de tela
   function showStatusMessage(message) {
       const statusDiv = document.getElementById("status-message");
       if (statusDiv) statusDiv.textContent = message;
   }
   
