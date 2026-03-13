# Acessibilidade - Implementações no JavaScript _academic.js_
Este documento lista as implementações de acessibilidade (ABNT NBR 17225 / WCAG) feitas no arquivo _academic.js_

### 1. **Mensagens dinâmicas acessíveis**
- **Padrão aplicado:**  
  - `role="status"`  
  - `aria-live="polite"`
- **Objetivo:** Informar usuários de leitores de tela sobre o carregamento e atualização de conteúdo dinâmico (por exemplo, quando os gráficos ou textos são renderizados).
- **Base normativa:**  
  - **WCAG 2.1 — Critério 4.1.3 (Mensagens de Status)**  
  - **ABNT NBR 17060:2022 — item 5.13.8 (Mensagens de status e feedback de sistema)**

---

### 2. **Títulos descritivos em iframes**
- **Padrão aplicado:**  
  - Atributo `title` em todos os elementos `<iframe>`
- **Objetivo:** Permitir que o leitor de tela descreva corretamente o propósito dos gráficos integrados.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 2.4.1 (Evitar bloqueios de navegação)**  
  - **WCAG 2.1 — Critério 2.4.6 (Cabeçalhos e rótulos descritivos)**  
  - **ABNT NBR 17060:2022 — item 5.7.1 (Elementos de navegação e identificação de conteúdo)**

---

### 3. **Textos alternativos e contextuais**
- **Padrão aplicado:**  
  - Descrição textual associada ao conteúdo carregado (mensagens como “Carregando gráfico de publicações...”).
- **Objetivo:** Garantir contexto compreensível mesmo sem renderização visual (ex.: se o iframe falhar).
- **Base normativa:**  
  - **WCAG 2.1 — Critério 1.1.1 (Conteúdo não textual)**  
  - **ABNT NBR 17060:2022 — item 5.1.1 (Alternativas textuais)**

---

### 4. **Feedback acessível de erros e carregamento**
- **Padrão aplicado:**  
  - Mensagens claras em caso de erro de rede, falha na query SPARQL ou conteúdo não encontrado.  
  - Essas mensagens também são anunciadas por `aria-live`.
- **Objetivo:** Garantir que o usuário saiba quando algo deu errado, inclusive sem visão.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 3.3.1 (Identificação de erros)**  
  - **ABNT NBR 17060:2022 — item 5.13.9 (Mensagens de erro e alerta)**

---

### 5. **Estrutura semântica preservada**
- **Padrão aplicado:**  
  - Inserção dos elementos de feedback (`div` de status) em locais semanticamente adequados, sem alterar a hierarquia de leitura.
- **Objetivo:** Evitar que o conteúdo dinâmico quebre a navegação ou a leitura sequencial por tecnologias assistivas.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 1.3.1 (Informações e relacionamentos)**  
  - **ABNT NBR 17060:2022 — item 5.6 (Organização e estrutura da página)**

---

### 6. **Conteúdo visual interpretável**
- **Padrão aplicado:**  
  - Uso de `title` e mensagens auxiliares para gráficos complexos, orientando o usuário sobre o tipo de dado apresentado.
- **Objetivo:** Garantir que a informação contida em elementos gráficos também seja compreensível por leitores de tela.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 1.4.5 (Imagens de texto)**  
  - **ABNT NBR 17060:2022 — item 5.1.4 (Conteúdos visuais e gráficos)**

---

### 7. **Compatibilidade com leitores de tela e tecnologias assistivas**
- **Padrão aplicado:**  
  - Todos os novos elementos seguem atributos ARIA padrão e são inseridos após o carregamento DOM (`DOMContentLoaded`).
- **Objetivo:** Evitar que leitores de tela ignorem conteúdos criados dinamicamente.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 4.1.2 (Nome, função, valor)**  
  - **ABNT NBR 17060:2022 — item 5.13.4 (Compatibilidade com tecnologias assistivas)**
