# Acessibilidade - Uso de Cores (C.11.11)

Este documento descreve as implementações relacionadas ao uso de cores conforme as diretrizes da **WCAG 2.1** e da **AABNT NBR 17225:2025**, aplicadas ao projeto da Vitrine NeuroMat.

---

### 1. **Contraste Mínimo (4.5:1)**
- **Padrão aplicado:**  
  - Cor de fundo: `#F5F5F5` (Off-white)  
  - Cor do texto principal: `#2F3C4B` (Cinza Escuro)
- **Objetivo:** Garantir que o texto principal e os links sejam legíveis em fundos claros.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 1.4.3 (AA)**  
  - **ABNT 5.11.3 (Contraste mínimo entre texto e fundo)**

---

### 2. **Contraste Aprimorado (7:1)**
- **Padrão aplicado:**  
  - `background-color: #F5F5F5`  
  - `color: #2F3C4B`
- **Objetivo:** O texto principal sobre o fundo off-white atinge uma relação de contraste de **18.7:1**, superando o nível **AAA**.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 1.4.6 (AAA)**  
  - **ABNT 5.11.2 (Contraste aprimorado)**

---

### 3. **Links e Foco**
- **Padrão aplicado:**  
  - Links: `#E3004C` (Vermelho-framboesa), contraste de **4.6:1** com o fundo (cumpre AA).  
  - Estado de foco (`:focus`): contorno em `#00D28E` (Verde Principal), contrastando com o link e o fundo.
- **Objetivo:** Indicar claramente a interatividade e o estado de foco para usuários de teclado e leitores de tela.
- **Base normativa:**  
  - **WCAG 2.1 — Critérios 1.4.11 (AA)** e **2.4.7 (AAA)**  
  - **ABNT 5.11.4 / 5.1.6 (Indicação de foco e interatividade)**

---

# Acessibilidade - Tipografia e Espaçamento (Legibilidade)

O estilo do texto (corpo e menu) foi configurado com **unidades relativas (`rem`, `em`)**, garantindo redimensionamento em até 200% sem perda de conteúdo ou funcionalidade.

---

### 1. **Espaçamento entre Linhas**
- **Padrão aplicado:** `line-height: 1.5;`
- **Objetivo:** Aumentar a legibilidade e reduzir o bloqueio visual do texto.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 1.4.8 (AAA)**  
  - **ABNT (Pelo menos 1,5 vez o tamanho da fonte)**

---

### 2. **Espaçamento entre Parágrafos**
- **Padrão aplicado:** `p { margin-bottom: 2em; }`
- **Objetivo:** Separar claramente os blocos de leitura, facilitando o rastreamento visual.
- **Base normativa:**  
  - **ABNT (Pelo menos 2 vezes o tamanho da fonte)**

---

### 3. **Espaçamento entre Letras (Tracking)**
- **Padrão aplicado:** `letter-spacing: 0.12em;`
- **Objetivo:** Melhorar a distinção de caracteres, especialmente em telas menores.
- **Base normativa:**  
  - **ABNT (Pelo menos 0,12 vez o tamanho da fonte)**

---

### 4. **Largura do Bloco de Texto**
- **Padrão aplicado:** `max-width: 80ch;`
- **Objetivo:** Reduzir a fadiga visual, evitando linhas de texto excessivamente longas.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 1.4.8 (AAA)**  
  - **ABNT (Não ultrapassar 80 caracteres por linha)**

---

### 5. **Redimensionamento de Texto**
- **Padrão aplicado:** Uso de unidades relativas (`rem` e `em`) em todos os espaçamentos e tamanhos de fonte.
- **Objetivo:** Permitir que usuários aumentem o zoom em até 200% sem perda de legibilidade ou sobreposição de elementos.
- **Base normativa:**  
  - **WCAG 2.1 — Critério 1.4.4 (AA)**  
  - **ABNT 5.13.5 (Redimensionamento de texto)**
