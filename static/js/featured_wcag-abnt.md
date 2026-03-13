# Acessibilidade — Implementações no `featured.js` (Versão Revisada em 13/11/25)

### Contexto
As implementações seguem a norma **ABNT NBR 17225:2025** e as diretrizes **WCAG 2.1**, aplicadas para garantir acessibilidade perceptiva, operável e compreensível na renderização dinâmica do artigo em destaque da Vitrine NeuroMat.

---

## 1. ABNT 5.13.8 (WCAG 4.1.3) — Mensagens de status

**Função:**  
`showStatusMessage()` envia feedback textual para tecnologias assistivas, informando mudanças de estado no carregamento dinâmico da página.

**Aprimoramento aplicado:**
```javascript
statusDiv.setAttribute("role", "status");
statusDiv.setAttribute("aria-live", "polite");
```
Esses atributos **não estão descritos** no markdown original e são fundamentais:  
- `role="status"` indica uma área de mensagens automáticas;  
- `aria-live="polite"` garante que leitores de tela anunciem mudanças sem interromper a leitura atual.

**Trechos usados:**
- Mensagem inicial: “Carregando conteúdo do artigo em destaque...”
- Mensagem de sucesso: “Conteúdo do artigo em destaque carregado com sucesso.”
- Mensagem de erro: “Não foi possível carregar os dados do artigo em destaque.”

---

## 2. ABNT 5.1.15 — Foco visível e coerência de navegação

**Implementação adicionada:**
```javascript
container.focus();
```
Após o carregamento dinâmico, o foco é movido para o container principal da seção, garantindo:
- Coerência na navegação por teclado;  
- Indicação clara de foco para usuários de leitores de tela;  
- Retorno previsível ao início do conteúdo recém-renderizado.

**Contexto de aplicação:**
Esse recurso está posicionado logo após a renderização final do conteúdo dinâmico do artigo (`container.innerHTML = ...`) e antes da exibição da mensagem de sucesso.  
Cumpre o item **5.1.15 da ABNT** e o critério **2.4.3 (WCAG) — Ordem de Foco**.

---

## 3. ABNT 5.13.4 (WCAG 1.3.1, 4.1.2) — Estrutura e iframes acessíveis

**Aplicações no código:**
```html
<iframe
  title="grafo com relação da produção científica do NeuroMat"
  aria-describedby="descricao-grafo"
  tabindex="-1"
  ...
></iframe>
```

### Detalhes:
- **`title`** fornece rótulo descritivo e inequívoco do conteúdo do iframe.  
- **`aria-describedby`** vincula o iframe a uma descrição longa (`<p id="descricao-grafo" class="visually-hidden">`), assegurando contexto completo para usuários de tecnologias assistivas.  
- **`tabindex="-1"`** impede que o foco de teclado entre em elementos interativos invisíveis ou não controlados dentro do iframe, evitando confusão durante a navegação — conforme **WCAG 2.1 (2.4.3)** e **ABNT 5.1.15**.

---

## 4. ABNT 5.13.5 — Equivalentes textuais e descrição longa do grafo

**Implementação:**
```html
<p id="descricao-grafo" class="visually-hidden">
  O grafo interativo apresenta a rede de citações entre as publicações científicas do CEPID NeuroMat [...]
</p>
```

**Finalidade:**
- Garante descrição textual detalhada do grafo, explicando significado das cores, relações e estrutura visual.
- O conteúdo é **invisível na interface** (`.visually-hidden`) mas **lido por leitores de tela**.
- Cumpre **ABNT 5.13.5** e **WCAG 1.1.1 (A)** — Text Alternatives.

---

## 5. ABNT 5.13.3 (WCAG 3.1.2) — Idioma do conteúdo

**Uso:**
```html
<a lang="en">Infinite Systems of Interacting Chains with Memory of Variable Length—A Stochastic Model for Biological Neural Nets</a>
```

**Finalidade:**
- Identifica o idioma de títulos estrangeiros, garantindo pronúncia correta e contexto semântico.  
- Aplica-se a todos os links ou títulos de artigos com idioma diferente do português.

---

## 6. Avisos e segurança em links externos (Boa prática ABNT/WCAG)

**Uso:**
```html
<a href="..." target="_blank" rel="noopener noreferrer" title="Abre em nova aba">
```

**Finalidade:**
- `target="_blank"` abre o link em nova aba, enquanto `rel="noopener noreferrer"` evita riscos de segurança e foco indesejado.  
- `title="Abre em nova aba"` informa o comportamento ao usuário, conforme **ABNT 5.13.4** (rótulos e títulos informativos).

---

## 7. Mensagem de alerta acessível

**Uso:**
```html
<p role="alert">
  <span aria-hidden="true">⚠️</span>
  Os dados apresentados são obtidos dinamicamente [...]
</p>
```

**Finalidade:**
- `role="alert"` garante que leitores de tela anunciem a mensagem imediatamente.  
- O ícone ⚠️ é ignorado por assistivas (`aria-hidden="true"`).  
- Cumpre **ABNT 5.13.8** e **WCAG 4.1.3**, promovendo feedback imediato sobre riscos ou inconsistências.

---

## 8. ABNT 5.13.8 — Coerência de mensagens no carregamento

O script garante mensagens consistentes e equivalentes visuais/sonoras para:
- Carregamento inicial  
- Sucesso no carregamento  
- Falha de conexão  

