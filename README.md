# 🚀 Projeto de Automação de Testes (Web & API) - DemoQA

Projeto completo de automação abrangendo testes E2E focados no Frontend (Cypress) e testes de Integração e Contratos de API (Jest + SuperTest) para a aplicação [DemoQA](https://demoqa.com/). 

A arquitetura geral foi desenhada visando **escalabilidade, manutenibilidade e resiliência**, aplicando os melhores padrões de automação do mercado, separação de responsabilidades claras e estratégias maduras para validação de dados.

---

## 🛠 Tecnologias e Bibliotecas Utilizadas

### 🌐 Frontend (Web - `web/`)
- **[Cypress](https://www.cypress.io/) (^15.13.0)**: Framework E2E principal.
- **[Cypress Real Events]**: Disparo de eventos nativos do navegador simulando movimentos complexos (hover, drag and drop).

### ⚙️ Backend (API - `api/`)
- **[Jest]**: Framework maduro e robusto. Escolhido no lugar de ferramentas como Postman/Newman ou Cypress-API para entregar uma **arquitetura de nível empresarial sólida, provendo alta manutenibilidade e controle total**.
- **[SuperTest]**: Biblioteca de altíssimo padrão para requisições HTTP integradas. Facilita muito a validação do status e do corpo sem complexidade extra.
- **[Joi]**: Validação meticulosa baseada em schemas para garantir o estrito **Contrato da API** e tipos de dados trafegados.

### 🛠 Comuns / Utilitários
- **[Node.js]**: Ambiente de execução base.
- **[@faker-js/faker]**: Geração dinâmica de massas. Mantém os testes determinísticos simulando dados "reais" únicos a cada execução.
- **[Dotenv]**: Gerenciamento seguro de variáveis globais de ambiente (`BASE_URL`).

---

## 🏗 Arquitetura e Estrutura do Projeto

O repositório está subdividido para refletir a independência entre as automações da interface gráfica (Web) e dos serviços backend (API).

```text
.
├── api/                    # ⚙️ Automação de API (Jest + SuperTest)
│   ├── src/
│   │   ├── config/         # Configuração de variáveis globais ocultas (env.js)
│   │   ├── services/       # Isolamento de endpoints e regras HTTP (bookstore.service.js)
│   │   └── utils/          # Agrupador dos Schemas do Joi e dados mockados dinâmicos
│   ├── tests/              # 📝 Specs de automação de fluxo (fluxo completo Bookstore)
│   └── package.json        
├── web/                    # 🌐 Automação Web E2E (Cypress)
│   ├── cypress/
│   │   ├── e2e/            # 📝 Casos de Teste isolados por módulos (forms, interactions, alerts)
│   │   ├── support/            
│   │   │   ├── pages/      # 🧱 Page Object Model (POM)
│   │   │   └── commands.js # Comandos customizados utilitários da UI
│   │   └── utils/          # Validadores e Helpers auxiliares
│   ├── cypress.config.js
│   └── package.json        
```

---

## 💡 Destaques Técnicos e Boas Práticas

Durante o desenvolvimento deste projeto, desafios complexos foram contornados com as seguintes práticas:

### ⚙️ Testes de API (Node / Jest)
1. **Maturidade Arquitetural (Jest + SuperTest)**:
   - A escolha desta stack de ferramentas reflete uma postura "enterprise", fugindo de opções super acopladas. Node + Jest gera escalabilidade ilimitada, isolamento real entre testes e extrema facilidade na integração nativa nas esteiras de automação (CI/CD). Isso foca drasticamente em **Manutenibilidade**.
2. **Proteção por Validação de Contrato**:
   - Envio de payloads e recebimentos de retornos da API validados ponta a ponta com a lib estrita do `Joi`, detectando até dados do tipo incorreto sem falsos-positivos.
3. **Padrão de Camada Service**:
   - Todo conhecimento dos caminhos das Rotas (endpoints) e envios de Header (`Authorization`) residem numa abstração `service`. O script de teste de API se suja exclusivamente fazendo a regra de negócios (Assertions).

### 🌐 Testes Web E2E (Cypress)
1. **Abstração por Page Object Model (POM)**:
   - Todo mapeamento de DOM (`cy.get()`) está embutido em classes dentro de `pages/`. As Specs de teste se importam com a semântica legível (`WebTablesPage.deleteRecord(name)`).
2. **Combate aos Anti-Patterns (ausência total de cy.wait fixos)**:
   - O tempo ocioso foi aniquilado com esperas inteligentes focadas no estado do CSS, requisições de rede ou monitoramento inteligente do DOM.
3. **Manipulação DOM Instável e SVG**:
   - Implementação de manipulação com Regex, detectando white-spaces não previsíveis, e locators com sub-buscas em grids visuais dinâmicos (botões nativos por SVG).
4. **Data-Driven (Interação limpa)**:
   - Geração de massas para `forms` e testes que jamais batem no limite de duplicação, simulados por automação isolada baseada em estado puro.

---

## ⚙️ Como Configurar e Executar na sua Máquina

### Pré-requisitos
- **Node.js**: Instalado globalmente na máquina (v16.x ou mais recente recomendada).

### 1. Preparação: Variáveis de Ambiente
Na **raiz** principal ou dentro das pastas, crie/mantenha um arquivo `.env` para carregar as rotas corretamente.
```env
BASE_URL="https://demoqa.com"
```

### 2. Rotinas da API (Backend)
No seu terminal, vá para o diretório `/api`, puxe as dependências e rode a suíte:
```bash
cd api
npm install
npm run api-test
```

### 3. Rotinas da WEB (Cypress Frontend)
Direcione seu terminal ao diretório `/web`, instale as bibliotecas e escolha a forma de inicialização:
```bash
cd web
npm install
```

Para usar a interface de acompanhamento (Cypress UI):
```bash
npx cypress open
```

Para simular o disparo de "Background" limpo via console (Modo Headless):
```bash
npx cypress run
```
