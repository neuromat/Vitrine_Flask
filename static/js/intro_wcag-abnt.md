<<<<<<< HEAD
# Revisão de Acessibilidade — `intro.js`

### Contexto
O script `intro.js` é responsável por carregar dinamicamente o conteúdo introdutório da seção “Publicações Acadêmicas”.  
Ele utiliza três consultas SPARQL para preencher os placeholders `[[1]]`, `[[2]]`, `[[3]]` com dados da Wikidata (artigos, citações e autores).

As implementações seguem a norma **ABNT NBR 17225:2025** e as diretrizes **WCAG 2.1**, com foco na **acessibilidade de carregamento dinâmico** e **mensagens de status**.

---

## 1. ABNT 5.13.8 (WCAG 4.1.3) — Mensagens de status

**Implementação existente:**
```javascript
function showStatusMessage(message) {
  const statusDiv = document.getElementById("status-message");
  if (statusDiv) statusDiv.textContent = message;
}
```

### O que já está correto:
- Há comunicação textual para leitores de tela quando o conteúdo é carregado, exibido ou falha.  
- As mensagens são consistentes com o comportamento de outros scripts da Vitrine (carregando / sucesso / erro).  

### O que falta ajustar:
Adicionar atributos ARIA que permitem **leitura automática** por tecnologias assistivas, como no `featured.js`:

```javascript
statusDiv.setAttribute("role", "status");
statusDiv.setAttribute("aria-live", "polite");
```

Esses dois atributos devem ser incluídos dentro da função `showStatusMessage()` para **garantir que leitores de tela anunciem** as mensagens de atualização sem interferir na navegação.

---

## 2. ABNT 5.1.15 — Foco visível e coerência de navegação

**Status atual:**  
O script carrega o conteúdo de forma assíncrona, mas **não redireciona o foco** ao container atualizado após o carregamento.

### Ajuste sugerido:
Logo após a linha que insere o conteúdo processado:

```javascript
introContainer.innerHTML = processedHtml;
```

Adicionar:
```javascript
introContainer.focus();
```

### Justificativa:
- Garante que, ao terminar o carregamento, o **foco de teclado** e o **ponto de leitura do leitor de tela** sejam movidos para o início do conteúdo recém-inserido.  
- Cumpre **ABNT 5.1.15** (Foco visível e ordem lógica de navegação) e **WCAG 2.4.3** (Ordem de Foco).

---

## 3. ABNT 5.13.3 (WCAG 3.1.2) — Idioma do conteúdo

Não há trechos multilíngues no conteúdo de `intro.js`.  
Nenhuma ação necessária neste ponto.

---

## 4. ABNT 5.13.4 — Estrutura e rótulos de regiões

**Situação atual:**
- O script injeta conteúdo dentro de `<div id="intro-content">`, que já está dentro de `<div id="academic-content">`.  
- Não há indicação de **região semântica** com `role="region"` ou `aria-label`.

### Recomendação (não obrigatória, mas boa prática):
No HTML, você pode definir:
```html
<div id="intro-content" role="region" aria-label="Introdução às publicações acadêmicas" tabindex="-1"></div>
```
Assim, quando o foco é movido (`introContainer.focus()`), o leitor de tela anuncia o nome da região.

---

## 5. ABNT 5.13.8 — Consistência das mensagens de status

O arquivo segue o mesmo padrão de mensagens adotado em outros scripts:
- “Carregando introdução...”
- “Introdução carregada com sucesso.”
- “Não foi possível carregar os dados de introdução.”

Essas mensagens são equivalentes em **forma visual e auditiva**, atendendo ao requisito de **mensagens equivalentes** (ABNT 5.13.8).


=======
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
   
>>>>>>> 3272b34dec1603fb9db07a23264867b8090f1f7d
