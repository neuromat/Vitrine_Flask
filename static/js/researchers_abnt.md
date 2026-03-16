# Acessibilidade — Implementações no `researchers.js` (Versão Revisada)

### Contexto
O script `researchers.js` é responsável por carregar dinamicamente a seção “Pesquisadores” da Vitrine NeuroMat, preenchendo textos e gráficos (mapa e estatísticas) a partir de consultas SPARQL.  
As modificações realizadas alinham o arquivo às normas **ABNT NBR 17225:2025** e **WCAG 2.1**, garantindo acessibilidade na atualização de conteúdo, coerência de foco e descrição de elementos visuais.

---

## 1. ABNT 5.13.8 (WCAG 4.1.3) — Mensagens de status

**Implementação existente aprimorada:**
```javascript
function showStatusMessage(message) {
  const statusDiv = document.getElementById("status-message");
  if (statusDiv) {
    statusDiv.textContent = message;
    statusDiv.setAttribute("role", "status");
    statusDiv.setAttribute("aria-live", "polite");
  }
}
```

### Finalidade:
- `role="status"` informa a leitores de tela que as mensagens são automáticas.  
- `aria-live="polite"` garante que a mensagem seja lida sem interromper o usuário.  
- Fornece feedback sobre estados de carregamento, sucesso e erro.

### Mensagens exibidas:
- “Carregando dados dos pesquisadores...”
- “Dados dos pesquisadores carregados com sucesso.”
- “Não foi possível carregar os dados da seção Pesquisadores.”

Essas mensagens são simultaneamente visuais e auditivas, cumprindo a equivalência exigida pela **ABNT 5.13.8**.

---

## 2. ABNT 5.1.15 — Foco visível e coerência de navegação

**Implementação:**
```javascript
container.focus();
```

### Finalidade:
- Após a renderização dinâmica, o foco é movido ao container principal.  
- Garante que usuários de teclado e leitores de tela retomem a leitura no início da nova seção.  
- Atende à **ABNT 5.1.15** (foco visível e ordem previsível) e **WCAG 2.4.3** (Focus Order).

---

## 3. ABNT 5.13.5 (WCAG 1.1.1) — Equivalentes textuais

**Implementação:**
```html
<p id="descricao-mapa" class="visually-hidden">
  O mapa mostra a distribuição geográfica dos pesquisadores vinculados ao CEPID NeuroMat [...]
</p>
```

### Finalidade:
- Fornece descrição textual detalhada do gráfico de mapa, explicando a estrutura visual e o significado dos elementos.  
- O parágrafo está oculto visualmente (`.visually-hidden`) mas permanece acessível a leitores de tela.  
- Cumpre **ABNT 5.13.5** e **WCAG 1.1.1** — Text Alternatives.

---

## 4. ABNT 5.13.4 (WCAG 1.3.1 e 4.1.2) — Estrutura e iframes acessíveis

**Implementação:**
```html
<iframe
  title="Mapa interativo de distribuição geográfica dos pesquisadores do NeuroMat"
  aria-describedby="descricao-mapa"
  tabindex="-1"
  ...
></iframe>
```

### Finalidade:
- `title` fornece rótulo compreensível e inequívoco do conteúdo.  
- `aria-describedby="descricao-mapa"` associa o iframe à descrição longa oculta.  
- `tabindex="-1"` impede o Tab de entrar no iframe, evitando foco em áreas não perceptíveis.  
- O iframe é precedido por um `<div role="region" aria-label="Mapa de distribuição...">` para fornecer contexto semântico adicional.

Atende aos critérios de **ABNT 5.13.4** e **WCAG 2.4.3**, garantindo rótulos claros e comportamento previsível.

---

## 5. ABNT 5.13.8 — Consistência nas mensagens de status

O arquivo mantém mensagens equivalentes e previsíveis em todos os estados do carregamento:
- O mesmo texto é apresentado visualmente e transmitido por `aria-live`.  
- Não há redundância auditiva, preservando a inteligibilidade do fluxo da página.

---

## 6. Outras boas práticas

- Estrutura comentada de forma padronizada, seguindo o modelo dos arquivos `intro.js`, `featured.js` e `academic.js`.  
- Mantida a decisão de usar `tabindex="-1"` nos iframes, uma vez que o mapa não possui controles interativos acessíveis.  
- Descrição longa incluída antes do iframe, garantindo que o leitor de tela tenha acesso ao contexto antes do elemento visual.

---

