# PRECISA DE REVISÃO DE TEXTO - 22-10-2025* 


# Justificativas de Acessibilidade (ABNT NBR 17225 / WCAG)

As alterações foram feitas para garantir a uniformidade, segurança e clareza semântica para usuários de tecnologias assistivas, seguindo as diretrizes da ABNT NBR 17225.

---
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

* **Implementação:** Todos os links externos (`target='_blank'`) agora incluem os atributos `rel="noopener noreferrer"` e `title="Abre em nova aba"`.
* **Justificativa:**
    * **Segurança (`rel="noopener noreferrer"`):** É uma prática de segurança essencial para prevenir o *tabnabbing*, um tipo de ataque onde a nova aba aberta pode manipular a página original.
    * **Aviso de Nova Aba (`title="Abre em nova aba"`):** Substitui o `aria-label` redundante por um `title` consistente. O `title` fornece um aviso claro para todos os usuários (leitores de tela e usuários de mouse que pausam o cursor) de que o link abrirá uma nova janela, atendendo ao princípio de previsibilidade.

## 2. Correção de Idioma e Semântica

* **Implementação:** O atributo de idioma `lang="en"` foi movido do `<span>` envolvente e aplicado diretamente à tag `<a>` nos títulos em inglês.
* **Justificativa (WCAG 3.1.2):** O leitor de tela precisa saber que o **conteúdo específico do link** está em inglês. Aplicar o `lang` ao `<a>` garante que o software de assistência utilize a pronúncia correta para os títulos de artigos em outro idioma.

## 3. Remoção de Elementos de Apresentação (WCAG 1.3.1)

* **Implementação:** O uso de `&nbsp;` (espaço não quebrável) no início dos parágrafos foi **removido**.
* **Justificativa:** A ABNT exige a separação entre apresentação e estrutura. O `&nbsp;` é usado para fins de apresentação (indentação) no HTML, o que é incorreto. Indentação e espaçamento devem ser controlados via CSS (`text-indent`).

## 4. Alerta de Status Semântico e Ícones

* **Implementação:** O parágrafo de aviso sobre a fonte de dados recebeu `role="alert"`. O ícone `⚠️` recebeu `aria-hidden="true"`.
* **Justificativa (WCAG 1.3.1 / 4.1.2):**
    * **`role="alert"`:** Informa imediatamente ao leitor de tela que a mensagem de aviso é crítica e deve ser lida prontamente, garantindo que o usuário não perca a informação de que os dados podem ser inconsistentes.
    * **`aria-hidden="true"`:** Impede que o leitor de tela anuncie o emoji `⚠️` ("símbolo de alerta emoji") de forma redundante ou confusa, já que o texto que o acompanha já fornece o aviso completo.

## 5. Semântica do Conteúdo Carregado

* **Implementação:** O `div` que contém o gráfico dinâmico (iframe) recebeu `role="region"`.
* **Justificativa (WCAG 1.3.1):** O `role="region"` ajuda a agrupar o conteúdo principal e, combinado com o `aria-label` descritivo, permite que os usuários de leitores de tela naveguem por aquela seção do gráfico como um marco lógico e rotulado na página.