# Implementações de Acessibilidade - Vitrine NeuroMat
Conformidade com **ABNT NBR 17225:2025** e **WCAG 2.2**

## *WCAG 2.4.7 – Nível AA*  
**Indicador de foco visível**  
  * Adicionado contorno visível (`outline` e `box-shadow`) em links, botões e campos de formulário  
  * Cores de foco aplicadas com contraste adequado (#E3004C)  
  * Garantido que o foco permaneça visível mesmo com navegação via teclado  

---

## *WCAG 2.4.11 / 2.4.12 – Nível AA / AAA*  
**Elemento em foco totalmente ou parcialmente visível**  
  * Assegurado que todos os elementos focáveis estão visíveis na tela  
  * Ajuste de comportamento de rolagem automática para manter o foco visível  

---

## *WCAG 1.4.3 / 1.4.6 – Nível AA / AAA*  
**Contraste de cores e legibilidade**  
  * Criada paleta de cores acessível com base na ABNT (verdes, cianos e vermelho framboesa)  
  * Fundo off-white (#F5F5F5) e texto principal #2F3C4B para contraste superior a 7:1  
  * Links em vermelho framboesa (#E3004C) e hover em ciano escuro (#004B61)  
  * Verificação de contraste entre texto e plano de fundo em todos os estados de interação  

---

## *WCAG 1.4.4 / 1.4.10 – Nível AA*  
**Redimensionamento e responsividade do texto**  
  * Uso de `rem` e `em` para tamanhos relativos  
  * Garantido que o layout não se quebre com aumento de texto em até 200%  
  * Aplicação de `meta viewport` para dispositivos móveis  

---

## *WCAG 1.4.8 – Nível AAA*  
**Espaçamento de texto e parágrafos**  
  * Espaçamento entre linhas definido em 1.5  
  * Espaçamento entre letras de 0.01em e entre palavras de 0.16em  
  * Parágrafos com margem inferior de 2em para leitura fluida  
  * Limitação da largura dos blocos de texto a 80 caracteres (80ch)  
  * Alinhamento à esquerda, conforme orientação da ABNT  
  * Adicionada sombra leve no texto para legibilidade e estética  

---

## *WCAG 3.1.1 – Nível A*  
**Idioma da página**  
  * Definido `lang="pt"` no elemento `<html>`  
  * Assegurado que todas as páginas informam corretamente o idioma base  

---

## *WCAG 1.3.1 – Nível A*  
**Estrutura semântica e navegação**  
  * Uso de elementos semânticos `<header>`, `<main>`, `<footer>` e `<nav>`  
  * Implementação de rótulos `aria-current="page"` para indicar a página ativa  
  * Adição de link “Voltar ao início” para navegação rápida via teclado  
  * Garantido que as seções principais sejam identificáveis por leitores de tela  

---

## *WCAG 2.5.3 – Nível AA*  
**Texto visível no nome acessível**  
  * Verificado que botões e links mantêm o mesmo texto visível e o mesmo nome acessível  
  * Garantido que o texto visível seja refletido nas propriedades de acessibilidade (ex.: `<a>`, `<button>`)  
  * Evitado o uso de ícones sem texto alternativo equivalente  

---

## *WCAG 4.1.2 – Nível A*  
**Nome, função e valor**  
  * Garantido que componentes interativos tenham identificadores claros  
  * Atributos `role`, `aria-label` e `aria-describedby` utilizados quando necessário  
  * Mantida consistência entre nome visual e nome acessível em elementos de interface  

---

## *WCAG 2.4.1 – Nível A*  
**Mecanismos de navegação e atalhos de teclado**  
  * Mantida navegação sequencial via teclado  
  * Ordem lógica de foco respeitada em todos os elementos interativos  
  * Foco inicial no cabeçalho e preservação do contexto de navegação  

---

## *WCAG 1.4.13 – Nível AA*  
**Conteúdo em foco não causa perda de contexto**  
  * Garantido que o foco ou hover não escondem, nem sobrepõem informações críticas  
  * Mantido comportamento estável ao navegar com teclado ou leitor de tela  

---
## *WCAG 2.5.3 – AA*
  * Aplicados nas tags _\<a>_ HTML semântico, em que o próprio texto já é o _accessible name_ do link.
<p>Exemplo:</p>

```html
<a href='https://www.wikidata.org/wiki/Q56592766' target='_blank'>Infinite Systems of Interacting Chains with Memory of Variable Length—A Stochastic Model for Biological Neural Nets</a>
```
--- 
## *WCAG 4.1.3 (AA)*
  * Adicionada a função _showStatusMessage(message)_
  * Atualiza o conteúdo do elemento _#status-message_ (definido no HTML)
  * Permite que mensagens sejam lidas por tecnologias assistivas (via _aria-live="polite"_)
  * Inserida chamada para _showStatusMessage()_ dentro do bloco _catch_
  * Inserida chamada para _showStatusMessage()_ em estados de **carregamento inicial** (ex.: “Carregando conteúdo...”)
  * Inserida chamada para _showStatusMessage()_ em casos de **sucesso** (ex.: “Conteúdo carregado com sucesso.”)
  * Inserida chamada para _showStatusMessage()_ em **validações de formulário** (ex.: campo obrigatório não preenchido)
  * Adicionada atualização de status durante **buscas assíncronas** (ex.: “Buscando informações sobre o artigo...”)
  * Incluída sinalização de **erro retornado pela API** (ex.: mensagem personalizada enviada pelo servidor)
  * Garantido que **todas as mensagens de status** sejam apresentadas também de forma **visual** no DOM, além do canal auditivo via leitor de tela


# Interação por teclado

## *WCAG 2.1.1 / 2.1.3 – Nível A / AAA*  
**Uso de foco**  
  * Garantido que apenas elementos interativos (links, botões, campos de formulário) recebem foco  
  * Evitado foco em elementos puramente visuais ou decorativos  
  * Verificação realizada nos templates HTML da Vitrine NeuroMat  

---

## *WCAG 2.1.2 – Nível A*  
**Armadilha de foco**  
  * Verificado que não há elementos que bloqueiam ou interrompem a navegação por teclado  
  * Garantido que o usuário pode entrar e sair de qualquer seção usando Tab e Shift+Tab  
  * Mecanismo de fechamento com tecla ESC previsto para modais ou menus futuros  

---

## *WCAG 1.4.13 – Nível AA*  
**Conteúdo adicional (persistente, dispensável e exibido ao foco)**  
  * Evitado conteúdo que apareça apenas no hover do mouse  
  * Conteúdos flutuantes (como tooltips) planejados para também responder ao foco do teclado  
  * Garantido que qualquer conteúdo adicional possa ser dispensado sem perda de funcionalidade  
  * Aplicável a futuras implementações em `accessibility.css` e `navigation.js`  

---

## *WCAG 2.1.4 – Nível A*  
**Atalhos de teclado e teclas modificadoras**  
  * Verificado que não existem atalhos de tecla única sem modificadores (como Ctrl ou Alt)  
  * Garantido que futuros atalhos utilizem combinações seguras (ex.: Ctrl + tecla)  
  * Mecanismo previsto para permitir desativação ou remapeamento de atalhos, se implementados  

---

## *WCAG 4.1.3 – Nível AA*  
**Mensagens de status**  
  * Adicionada a função _showStatusMessage(message)_ para atualizar o elemento `#status-message`  
  * Permite que mensagens sejam lidas por tecnologias assistivas via `aria-live="polite"`  
  * Implementadas mensagens acessíveis para estados de carregamento, sucesso e erro  
  * Garantido feedback imediato em casos de falha no carregamento de dados  

---

## *WCAG 1.3.1 – Nível A*  
**Estrutura semântica e lógica do conteúdo**  
  * Assegurado que o carregamento da seção “Impacto Social” segue hierarquia semântica coerente (`#socialimpact-content`)  
  * Mantida consistência estrutural na renderização de elementos dinâmicos  

---

## *WCAG 2.4.3 – Nível A*  
**Ordem de leitura e foco**  
  * Preservada ordem lógica e previsível após o carregamento assíncrono  
  * Foco visual permanece estável e previsível durante as atualizações de conteúdo  

---

## *WCAG 2.1.1 – Nível A*  
**Acessibilidade por teclado total**  
  * Todas as funcionalidades podem ser acessadas e operadas via teclado  
  * Nenhum bloqueio ou armadilha de foco identificado na seção  

---

## *WCAG 3.3.2 – Nível A*  
**Instruções para componentes personalizados**  
  * Campo de busca Altmetric removido — sem necessidade de instruções de entrada  
  * Mantido foco em comunicação direta por mensagens de status acessíveis  

---

## *WCAG 2.4.11 – Nível AA*  
**Elemento em foco totalmente visível**  
  * Garantido que elementos interativos (links e botões, quando presentes) estejam totalmente visíveis ao receber foco  
  * Evitada sobreposição ou deslocamento de foco fora da área visível  

---

# Imagens

__## *WCAG 1.1.1 / 1.4.5 / 2.4.4 / 2.4.9 – Nível A / AA / AAA*  
**Acessibilidade de imagens e conteúdo visual**

* Atualmente, o site **não contém imagens** (somente textos e gráficos gerados por scripts JavaScript), portanto **não há necessidade imediata de aplicação dessas normas**.  
* A estrutura do projeto Flask já está **preparada** para atender a todos os requisitos abaixo caso imagens sejam adicionadas futuramente:

  * **5.2.1 Texto alternativo para imagens de conteúdo:**  
    As imagens que transmitirem informação devem receber o atributo `alt` descrevendo seu conteúdo.  

  * **5.2.2 Texto alternativo para imagens funcionais:**  
    Ícones clicáveis ou imagens com função de botão devem incluir texto alternativo descritivo de sua ação.  

  * **5.2.3 Texto alternativo para imagens decorativas:**  
    Imagens puramente estéticas devem possuir `alt=""` ou ser definidas como fundo em CSS, para serem ignoradas por leitores de tela.  

  * **5.2.4 Descrição para imagens complexas:**  
    Diagramas ou gráficos complexos devem ter descrição detalhada visível na página ou link para explicação equivalente.  

  * **5.2.5 Imagens de texto:**  
    Evitar o uso de imagens contendo texto; caso indispensável, fornecer o mesmo texto em formato acessível.  

  * **5.2.6 Texto alternativo para mapas de imagens:**  
    Caso sejam implementados mapas com áreas interativas (`<area>`), cada área deve possuir seu próprio `alt` descritivo.

*  **Verificação sugerida:**  
  Quando forem adicionadas imagens ao projeto, a conformidade pode ser conferida nos **templates HTML (ex: `base.html`, `intro.html`, `featured.html`)** e nos **gráficos renderizados por JavaScript** (ex: `academic.js` e `researchers.js`).  

*  **Situação atual:**  
  Nenhuma não conformidade — o projeto está em **conformidade total preventiva**, pois não há elementos visuais que exijam descrição alternativa.

---

