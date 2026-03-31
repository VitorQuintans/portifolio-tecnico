# 🚀 Projeto de Automação de Testes Web - Cypress (DemoQA)

Projeto de automação de testes E2E (End-to-End) focado na aplicação [DemoQA](https://demoqa.com/), desenvolvido para cobrir cenários complexos de Frontend. A arquitetura foi desenhada visando **escalabilidade, manutenibilidade e resiliência**, aplicando os melhores padrões de automação esperados de um **QA Pleno/Sênior**, como o padrão estrutural Page Object Model (POM), massas de dados dinâmicas e validações avançadas de DOM.

---

## 🛠 Tecnologias e Bibliotecas Utilizadas
- **[Cypress](https://www.cypress.io/) (^15.13.0)**: Framework E2E principal.
- **[Node.js]**: Ambiente de execução e gerenciamento de dependências.
- **[@faker-js/faker](https://fakerjs.dev/)**: Geração de massa de dados dinâmicos, garantindo testes independentes a cada rodada.
- **[Cypress Real Events]**: Disparo de eventos nativos do navegador (hover, interações de drag and drop complexas).
- **[Dotenv]**: Gerenciamento seguro das variáveis de ambiente (`BASE_URL`, configurações globais).

---

## 🏗 Arquitetura e Estrutura do Projeto

O projeto foi componentizado focado na separação de responsabilidades. Dessa forma, as especificações (casos de teste) não têm conhecimento detalhado da estrutura HTML do sistema, promovendo menor acoplamento e reduzindo custo de manutenção.

```text
web/
├── cypress/
│   ├── e2e/                # 📝 Casos de Teste (Specs) organizados por módulo da aplicação
│   │   ├── alertsFrameWindows/ # Testes de Alertas e Modais
│   │   ├── elements/           # Testes do módulo Elements (ex: Web Tables CRUD)
│   │   ├── forms/              # Testes do formulário complexo (Practice Form)
│   │   ├── interactions/       # Testes de interações avançadas (Draggable/Sortable)
│   │   └── widgets/            # Testes de Widgets dinâmicos (Progress Bar, Tooltips)
│   ├── fixtures/           # 🗄️ Arquivos estáticos (imagens para upload, JSON mocks)
│   ├── support/            
│   │   ├── pages/          # 🧱 Page Object Model (POM) - Classes que representam as páginas
│   │   │   ├── elements/
│   │   │   ├── forms/
│   │   │   ├── interactions/
│   │   │   └── widgets/
│   │   ├── commands.js     # Comandos customizados globais do Cypress
│   │   └── e2e.js          # Configurações globais e hooks iniciais das specs
│   └── utils/              # ⚙️ Funções auxiliares (formatadores, validadores gerais)
├── cypress.config.js       # Configuração base do Cypress interligado ao dotenv
└── package.json            # Dependências NPM e controle de scripts do Node
```

---

## 💡 Destaques Técnicos e Boas Práticas (Padrão QA Pleno)

Durante o desenvolvimento deste projeto, foram superados desafios avançados utilizando as seguintes práticas:

1. **Abstração por Page Object Model (POM)**:
   - Todo mapeamento de elemento (`cy.get()`, `cy.contains()`) e lógicas de negócios foram transferidos para classes dentro de `support/pages/`.
   - Nas specs (`e2e/`), apenas chamamos métodos coesos (`WebTablesPage.deleteRecord(name)`) tornando o escopo do BD/Ação altamente legível (Clean Code).

2. **Testes Data-Driven com Faker.js**:
   - Testes autônomos por construção. Como em `Practice Form`, todo nome, email e endereço são dinamicamente gerados a cada execução, prevenindo a falha comum de "dados já existentes" (flakiness por massa de dados viciada).

3. **Combate a Anti-Patterns(`cy.wait` hardcoded)**:
   - Substituição de "esperas fixas" por esperas **dinâmicas baseadas em estado ou rotas**.
   - Soluções como aguardar uma classe do CSS mudar (ex: `.text-success` na validação de 100% da Progress Bar), ou interceptações de eventos, reduzindo dramaticamente o tempo de execução do pipeline.

4. **Manipulação Assíncrona do DOM & SVGs**:
   - Construção de lógicas robustas em locadores instáveis que possuem espaçamentos em branco residuais (`&nbsp;`).
   - Mapeamento avançado com regex e captura inteligente de botões dinâmicos SVG (ex: botões de Editar/Deletar de tabelas web).

5. **Ações Complexas Customizadas (Drag & Drop)**:
   - Simulação de cliques, arraste nativos e reordenação de listas utilizando eventos do Data Transfer nativo junto do plugin `cypress-real-events`.

---

## ⚙️ Como Configurar e Executar na sua Máquina

### Pré-requisitos
- **Node.js**: (versão 16.x ou superior, 18.x recomendada).
- **NPM** ou Yarn.

### 1. Clonando e Instalando Dependências
Acesse a pasta `web/` do repositório no seu terminal e execute:
```bash
npm install
```

### 2. Configurando as Variáveis de Ambiente
Na raiz geral do projeto (`../` em relação à pasta `web`), crie um arquivo `.env` contendo a URL base:
```env
BASE_URL="https://demoqa.com"
```

### 3. Execução dos Testes
Para abrir o Launchpad interativo e visualizar os testes rodando, com auxílio do painel de inspecionar elementos do Cypress (ideal para desenvolvimento e debug):
```bash
npx cypress open
```

Para rodar todos os testes em modo "headless" pelo terminal (ideal para esteira de CI/CD):
```bash
npx cypress run
```

Para rodar um módulo exclusivo:
```bash
npx cypress run --spec "cypress/e2e/forms/forms.spec.cy.js"
```

---

## 🎯 Melhorias Futuras / Evolução do Framework
- [ ] **Integração de Relatórios**: Adicionar relatórios estéticos (como o Mochawesome ou Allure Report) para embasar reuniões de métricas.
- [ ] **CI/CD Pipeline**: Criação de `cypress.yml` para disparar os testes automaticamente no GitHub Actions em todo Pull Request.
- [ ] **Multi-Environment Setup**: Melhorar a gestão do dotenv injetando comandos para variar facilmente a URL base dependendo do ambiente (DEV, HML, PRD).
