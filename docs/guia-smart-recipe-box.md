# Smart Recipe Box do início ao módulo 12

Este documento explica a evolução do projeto desde a tela padrão do Angular até uma aplicação de receitas com seleção de pratos, controle de porções, ingredientes calculados e indicação de favorito. Destina-se a quem está começando em Angular e quer entender tanto as mudanças quanto a razão de cada uma.

O escopo termina no módulo 12, encerrando a fase 3. Foram trabalhados fundamentos do Angular, estado com Signals e arquitetura de componentes. Não foram implementados serviços de dados, navegação por rotas ou formulários.

**Data da revisão:** 1 de novembro de 2026. **Tecnologias:** Angular 22.2, TypeScript, HTML, CSS e Vitest. O título da interface é **My Recipe Box**, enquanto Smart Recipe Box é o nome da aplicação na trilha de aprendizado.

## Resultado da revisão

A revisão não encontrou defeitos na seleção das receitas, no cálculo dos ingredientes ou no limite mínimo de porções. Foram realizados os seguintes ajustes:

- Corrigido o idioma do HTML de `en` para `pt-BR`, para tecnologias assistivas interpretarem corretamente o conteúdo em português.
- Alinhado o título da aba do navegador ao título `My Recipe Box`.
- Acrescentado `<main>` ao template principal, identificando o conteúdo principal da página.
- Ampliados os testes para verificar troca de receitas, favorito, atualização das quantidades, preservação dos dados originais e mínimo de uma porção.
- Padronizada a formatação dos arquivos da aplicação com Prettier.

O build de produção e os **7 testes em 3 arquivos** foram aprovados. Os testes usam um ambiente de DOM e não comprovam o carregamento das imagens externas nem substituem a conferência visual em um navegador real.

## Organização final do projeto

```text
src/
  index.html
  main.ts
  app/
    app.ts, app.html, app.css, app.spec.ts
    app.config.ts
    app.routes.ts
    models.ts
    mock-recipes.ts
    recipe-list/
      recipe-list.ts, recipe-list.html
      recipe-list.css, recipe-list.spec.ts
    recipe-detail/
      recipe-detail.ts, recipe-detail.html
      recipe-detail.css, recipe-detail.spec.ts
```

| Parte               | Responsabilidade                                                         |
| ------------------- | ------------------------------------------------------------------------ |
| `App`               | Guarda o título e inclui a área de receitas                              |
| `RecipeList`        | Guarda a receita selecionada, controla a seleção e mostra o favorito     |
| `RecipeDetail`      | Recebe a receita, controla as porções e exibe os ingredientes calculados |
| `models.ts`         | Define os formatos dos dados                                             |
| `mock-recipes.ts`   | Contém as duas receitas de exemplo                                       |
| Arquivos `.spec.ts` | Verificam o comportamento dos componentes                                |

Os componentes são standalone. O array `imports` de cada componente informa quais componentes, diretivas ou pipes seu template precisa utilizar. `@if` e `@for` são integrados e não precisam de `CommonModule`.

O projeto já possuía `app.config.ts`, `app.routes.ts` e um provedor de roteador gerados na criação inicial. A lista de rotas continua vazia; não foi implementada navegação. Esses arquivos de configuração não representam avanço para a fase 4.

## Fase 1 Fundamentos do Angular

### Módulo 1 Primeiros passos

A tela padrão do Angular, com logotipo e links, foi substituída por um título `<h1>My Recipe Box</h1>` em `app.html`.

O objetivo foi reconhecer as partes de um componente: `.ts` contém o comportamento e a configuração, `.html` define o conteúdo e `.css` define os estilos. O `<h1>` representa o título principal. Inicialmente o texto era estático; depois passou a vir do TypeScript.

### Módulo 2 Texto dinâmico com interpolação

O título passou a ser armazenado em um signal na classe `App`:

```typescript
protected readonly title = signal('My Recipe Box');
```

No template, ele é lido assim:

```html
<h1>{{ title() }}</h1>
```

As chaves `{{ }}` fazem a interpolação: o Angular avalia uma expressão e mostra o resultado como texto. Os parênteses em `title()` leem o valor do signal.

`protected` permite usar o membro no template sem expô-lo como parte da interface pública da classe. `readonly` impede substituir a referência do signal; ele não impede alterar seu valor interno com `.set()` ou `.update()`.

### Módulo 3 Eventos de clique

Foram criados os botões de Carbonara e Salada Caprese. O evento foi ligado a um método com esta sintaxe:

```html
<button type="button" (click)="verCarbonara()">Ver Carbonara</button>
```

Os métodos inicialmente executavam `console.log()`, permitindo observar os cliques no console do navegador. O `type="button"` explicita a função do elemento. O retorno `: void` dos métodos indica que não devolvem um valor.

Posteriormente, esses métodos passaram a trocar a receita. Eles começaram em `App` e hoje pertencem a `RecipeList`.

## Fase 2 Estado e reatividade com Signals

### Módulo 4 Seleção de receitas com set

Foram criados `models.ts` e `mock-recipes.ts`, separando o formato dos dados de seus valores de exemplo. Uma interface descreve quais propriedades um objeto deve ter; ela não cria a interface visual nem busca dados.

Ao final dos módulos, os modelos são:

```typescript
export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeModel {
  id: number;
  name: string;
  imgUrl: string;
  isFavorite: boolean;
  description: string;
  ingredients: Ingredient[];
}
```

`imgUrl` e `isFavorite` foram acrescentados nos módulos 7 e 12. `Ingredient[]` significa uma lista de ingredientes. `export` permite importar a definição em outro arquivo.

A constante `MOCK_RECIPES` contém Carbonara e Salada Caprese. O signal da seleção começa com o primeiro elemento:

```typescript
protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
```

O índice `[0]` indica o primeiro item; `[1]`, o segundo. A seleção usa `.set()`, que recebe o novo valor completo:

```typescript
protected verSaladaCaprese(): void {
  this.recipe.set(MOCK_RECIPES[1]);
}
```

O template lê o nome e a descrição com `recipe().name` e `recipe().description`. A tela acompanha a mudança do signal.

### Módulo 5 Controle de porções com update

Um signal numérico foi iniciado em uma porção. O aumento e a diminuição dependem do valor atual:

```typescript
protected readonly servings = signal<number>(1);

protected aumentarPorcoes(): void {
  this.servings.update((valorAtual) => valorAtual + 1);
}

protected diminuirPorcoes(): void {
  this.servings.update((valorAtual) => Math.max(1, valorAtual - 1));
}
```

A função de `.update()` recebe o valor atual e devolve o próximo. `Math.max()` impede que as porções cheguem a zero ou a valores negativos. O template mostra `Porções: {{ servings() }}`.

### Módulo 6 Ingredientes derivados com computed

As quantidades dos ingredientes passaram a depender da receita e do número de porções:

```typescript
protected readonly adjustedIngredients = computed(() =>
  this.recipe().ingredients.map((ingrediente) => ({
    ...ingrediente,
    quantity: ingrediente.quantity * this.servings(),
  })),
);
```

`computed()` cria um signal de leitura derivado de outros signals. O Angular acompanha as dependências lidas e invalida o resultado quando elas mudam, recalculando quando necessário.

`.map()` cria uma nova lista. `...ingrediente` copia as propriedades para um novo objeto e `quantity` recebe a quantidade multiplicada. Os dados originais não são alterados, evitando multiplicações acumuladas sobre valores já ajustados.

Neste exercício, as quantidades de exemplo correspondem a **uma porção**. Assim, 200 g de espaguete viram 400 g para duas porções. Trata-se de uma convenção didática, sem determinação nutricional de porções.

O resultado começou sendo exibido com `<pre>` e `JsonPipe`. Essa visualização temporária permitiu enxergar a estrutura dos dados e foi substituída no módulo 11.

## Fase 3 Arquitetura de componentes

### Módulo 7 Imagens com property binding

A propriedade `imgUrl` foi adicionada às receitas. O template conecta os dados à imagem:

```html
<img [src]="recipe().imgUrl" [alt]="recipe().name" width="320" />
```

Os colchetes representam property binding. `[src]` recebe o endereço da imagem e `[alt]` fornece o texto alternativo com o nome da receita. Ambos acompanham a seleção.

As imagens atuais usam URLs externas e dependem da disponibilidade dos sites de origem. Para usar um arquivo local, uma imagem em `public/images/carbonara.jpg` pode ser referenciada como `images/carbonara.jpg`, sem incluir `public` no endereço.

### Módulo 8 Separação do componente RecipeList

O componente foi gerado pelo Angular CLI e recebeu a lógica e o template de receitas que estavam em `App`. O componente principal manteve o título.

Para incluir o filho, `app.ts` importa a classe `RecipeList` e a registra em `imports: [RecipeList]`. O template usa `<app-recipe-list />`. O import TypeScript disponibiliza a classe no arquivo; o array do decorator permite seu uso no template; o seletor define a tag do filho.

O CLI criou `.ts`, `.html`, `.css` e `.spec.ts` na pasta `recipe-list`. Foi usada a versão `.cmd` do `npx`, porque o PowerShell bloqueava a execução do script `.ps1`:

```powershell
npx.cmd --no-install ng generate component recipe-list
```

Não foi necessário alterar a política de execução do Windows. A separação preservou o comportamento da página.

### Módulo 9 Entrada de dados com input

Foi criado `RecipeDetail`, que recebe a receita escolhida por `RecipeList`:

```typescript
readonly recipe = input.required<RecipeModel>();
```

O pai fornece o valor no template:

```html
<app-recipe-detail [recipe]="recipe()" />
```

À esquerda, `[recipe]` identifica a entrada do filho; à direita, `recipe()` lê o signal do pai. `required` exige que o pai forneça a receita. Esse input é público e `readonly`; o filho o lê, mas não usa `.set()` nele.

O controle das porções e o cálculo dos ingredientes passaram para `RecipeDetail`. A seleção permaneceu em `RecipeList`. Os caminhos relativos `../models` e `../mock-recipes` voltam uma pasta para acessar arquivos compartilhados.

As porções são preservadas ao trocar de receita, pois o mesmo componente filho continua em uso. Por exemplo, selecionar duas porções e trocar de Carbonara para Caprese mostra os ingredientes da Caprese para duas porções.

### Módulo 10 Estilos do cartão de receita

O conteúdo de `RecipeDetail` foi agrupado em `<article class="recipe-card">`. O CSS usa Flexbox para organizar os elementos verticalmente:

```css
.recipe-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  max-width: 40rem;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
}
```

`gap` separa os elementos e `padding` cria espaço interno. O título usa tamanho maior e peso 700 para estabelecer hierarquia. A imagem recebe `max-width: 100%` e `height: auto`, ajustando-se à largura disponível sem perder a proporção.

Os botões de porções receberam preenchimento e um contorno de foco visível ao navegar pelo teclado. `styleUrl` associa o arquivo CSS ao componente.

### Módulo 11 Lista de ingredientes com for

O JSON foi substituído por uma lista HTML com `<ul>` e `<li>`, gerada pelo controle de fluxo integrado:

```html
<ul class="ingredients">
  @for (ingrediente of adjustedIngredients(); track ingrediente.name) {
  <li>
    <span class="ingredient-name">{{ ingrediente.name }}</span>
    <span>{{ ingrediente.quantity }} {{ ingrediente.unit }}</span>
  </li>
  }
</ul>
```

`@for` percorre a lista calculada. `track` identifica cada item para o Angular associar dados e elementos da tela. O nome funciona com as receitas atuais porque não se repete dentro de cada lista; se futuramente forem permitidos nomes duplicados na mesma receita, será necessário um identificador único.

O import e o registro de `JsonPipe` foram removidos porque deixaram de ser usados. A lista recebeu espaçamento e destaque no nome de cada ingrediente.

### Módulo 12 Indicador de favorito com if

O modelo recebeu `isFavorite: boolean`. Carbonara está marcada como favorita (`true`); Salada Caprese, como não favorita (`false`). Em `RecipeList`, a exibição depende da seleção atual:

```html
@if (recipe().isFavorite) {
<p class="favorite-indicator">
  <span aria-hidden="true">★</span>
  {{ recipe().name }} — Receita favorita
</p>
}
```

`@if` inclui o bloco quando a condição é verdadeira e o remove quando é falsa. A estrela é decorativa, por isso usa `aria-hidden="true"`; o texto comunica a informação.

O módulo exibe uma marcação existente nos dados. Não foi criado um botão para favoritar ou desfavoritar e não há persistência em banco de dados ou armazenamento local.

## Fluxo final dos dados

```text
MOCK_RECIPES
  → RecipeList escolhe a receita com signal e set
  → [recipe] envia o valor para RecipeDetail
  → RecipeDetail lê o input e guarda as porções
  → computed calcula os ingredientes ajustados
  → @for apresenta a lista
```

Em paralelo, `@if` consulta `isFavorite` na receita selecionada. O título permanece em `App`. Essa divisão mantém as responsabilidades em componentes específicos.

Os dados ficam em memória. Recarregar a página restaura Carbonara e uma porção. As interfaces de TypeScript verificam formatos na compilação; não validam dados externos em tempo de execução.

## Execução e validação

Execute os comandos na pasta `recipe-box`. Se precisar instalar as dependências usando o arquivo de lock, execute `npm.cmd ci`. Para iniciar o servidor:

```powershell
npm.cmd start
```

Acesse o endereço informado no terminal, normalmente `http://localhost:4200/`. Para compilar, executar os testes sem observação contínua e conferir a formatação:

```powershell
npx.cmd --no-install ng build
npx.cmd --no-install ng test --watch=false
npx.cmd --no-install prettier --check src docs/guia-smart-recipe-box.md
```

O build gera arquivos em `dist/recipe-box`. Eles são resultados da compilação; as alterações de desenvolvimento devem ser feitas em `src`.

### Cobertura dos testes

| Arquivo                 | Verificações                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| `app.spec.ts`           | Criação de App e apresentação do título                                                                        |
| `recipe-list.spec.ts`   | Criação e troca de receita com atualização de nome, texto alternativo, ingredientes e favorito                 |
| `recipe-detail.spec.ts` | Criação, multiplicação das quantidades, troca do input, preservação dos dados originais e mínimo de uma porção |

O teste de detalhes fornece o input obrigatório com `fixture.componentRef.setInput()` antes da renderização. Os testes de interação acionam botões do DOM e aguardam a atualização do Angular.

### Conferência manual

1. Confira o título, Carbonara, uma porção e o indicador de favorito.
2. Confira 200 g de espaguete e aumente para duas porções, verificando 400 g.
3. Selecione Caprese: o indicador deve desaparecer e os tomates devem mostrar 8 unidades para duas porções.
4. Diminua repetidamente e confirme o mínimo de 1.
5. Confira o carregamento das duas imagens e a navegação dos botões pelo teclado usando Tab.

## Commits do projeto

Foi adotado o padrão `feat: Modulo N - descricao`. Por exemplo:

```powershell
git commit -am "feat: Modulo 12 - exibe indicador de favorito com @if"
```

`git commit -am` não inclui arquivos novos automaticamente. Para registrar o documento e as mudanças desta revisão, confira o diff e use:

```powershell
git diff
git add src docs/guia-smart-recipe-box.md
git commit -m "docs: documenta fases 1 a 3 e revisa a aplicacao"
```

Os comandos são sugestões. A revisão não cria um commit automaticamente.

## Referências para estudo

- [Signals](https://angular.dev/guide/signals)
- [API de computed](https://angular.dev/api/core/computed)
- [Inputs de componentes](https://angular.dev/guide/components/inputs)
- [Binding nos templates](https://angular.dev/guide/templates/binding)
- [Controle de fluxo](https://angular.dev/guide/templates/control-flow)
- [Estilos dos componentes](https://angular.dev/guide/components/styling)

## Encerramento da etapa

As fases 1, 2 e 3 estão implementadas até o módulo 12. A aplicação demonstra interpolação, eventos, signals graváveis, valores computados, componentes standalone, inputs, estilos, repetição e condições. A etapa termina aqui, conforme o escopo combinado.
