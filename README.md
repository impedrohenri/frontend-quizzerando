# Quizzerando

Um sistema de Quiz composto por duas partes:

**Backend**: API RESTful em Node.js/Express  
  🔗 [github.com/vitinhoLira/quizzerando-api](https://github.com/vitinhoLira/quizzerando-api.git)
 **Frontend**: Aplicação web em React  
  🔗 [github.com/impedrohenri/frontend-quizzerando](https://github.com/impedrohenri/frontend-quizzerando.git)

---

## Índice

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Tecnologias](#tecnologias)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação Passo a Passo](#instalação-passo-a-passo)

   * [4.1. Clonando os Repositórios](#41-clonando-os-repositórios)
   * [4.2. Backend (API)](#42-backend-api)
   * [4.3. Frontend (React)](#43-frontend-react)
5. [Configuração](#configuração)
6. [Uso](#uso)
7. [Rotas da API](#rotas-da-api)
8. [Contribuindo](#contribuindo)
9. [Licença](#licença)

---

## Descrição do Projeto

O **Quizzerando** é uma plataforma de quiz onde administradores podem criar quizzes e perguntas, e usuários podem responder, acompanhar seu desempenho e consultar histórico de resultados.

**Componentes:**

* **Backend:** API RESTful em Node.js/Express que gerencia usuários, quizzes, perguntas e pontuações.
* **Frontend:** Aplicação React que consome a API e disponibiliza interface amigável para criação, execução e visualização de quizzes.

---

## Tecnologias

* **Backend**

  * Node.js v14.x ou superior
  * Express
  * MySQL (via Sequelize)
  * JWT para autenticação
  * dotenv para variáveis de ambiente

* **Frontend**

  * React
  * React Router
  * Axios
  * Tailwind CSS (para estilização)

---

## Pré-requisitos

Antes de começar, certifique-se de ter:

* Git instalado
* Node.js (v14.x+) e npm ou yarn
* MySQL (v5.7+) rodando localmente ou remotamente

---

## Instalação Passo a Passo

### 4.1. Clonando os Repositórios

1. Abra seu terminal (ou Git Bash no Windows).
2. Escolha uma pasta onde deseja guardar o projeto.
3. Clone o backend:

   ```bash
   git clone https://github.com/vitinhoLira/quizzerando-api.git
   ```
4. Clone o frontend:

   ```bash
   git clone https://github.com/impedrohenri/frontend-quizzerando.git
   ```

### 4.2. Backend (API)

1. Navegue até a pasta da API:

   ```bash
   cd quizzerando-api
   ```
2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```
3. Copie o arquivo de exemplo de variáveis de ambiente e edite:

   ```bash
   cp .env.example .env
   ```
4. Abra o arquivo `.env` e configure:

   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_NAME=quizzerando_db
   JWT_SECRET=sua_chave_secreta
   PORT=3000
   ```
5. Crie o banco de dados no MySQL (via terminal ou Workbench):

   ```sql
   CREATE DATABASE quizzerando_db;
   ```
6. Rode migrações (se o projeto usar Sequelize CLI):

   ```bash
   npx sequelize db:migrate
   ```
7. Inicie a API:

   ```bash
   npm start
   # ou
   yarn start
   ```
8. Verifique em `http://localhost:3000` (deve mostrar mensagem de boas-vindas ou endpoint health).

### 4.3. Frontend (React)

1. Em outra aba do terminal, vá para a pasta do frontend:

   ```bash
   cd ../frontend-quizzerando
   ```
2. Instale dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```
3. Crie um arquivo de variáveis de ambiente para o React:

   ```bash
   cp .env.example .env.local
   ```
4. Abra `.env.local` e defina a URL da API:

   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```
5. Inicie o frontend em modo de desenvolvimento:

   ```bash
   npm start
   # ou
   yarn start
   ```
6. Abra o navegador em `http://localhost:3001` (ou porta indicada) para ver a aplicação.

---

## Configuração

* **Banco de Dados:** Verifique se o MySQL está rodando e se o banco `quizzerando_db` foi criado.
* **Variáveis de Ambiente:** Confirme valores em `.env` (backend) e `.env.local` (frontend).
* **CORS:** No backend, verifique se o CORS está liberado para a origem do frontend (ex: `http://localhost:3001`).

---

## Uso

1. **Registro / Login**

   * Acesse a página de login no frontend.
   * Cadastre um novo usuário ou faça login.
2. **Criação de Quiz (Admin)**

   * Após autenticação, vá para seção de administração.
   * Clique em "Criar Quiz", preencha título e descrição.
   * Adicione perguntas com alternativas e marque a correta.
3. **Realização de Quiz (Usuário)**

   * Na lista de quizzes disponíveis, selecione um.
   * Responda às perguntas e envie.
   * Veja sua pontuação e histórico.

---

## Rotas da API

| Método | Rota                     | Descrição                               |
| ------ | ------------------------ | --------------------------------------- |
| POST   | `/auth/register`         | Registrar novo usuário                  |
| POST   | `/auth/login`            | Autenticar e obter token JWT            |
| GET    | `/quizzes`               | Listar todos os quizzes                 |
| POST   | `/quizzes`               | Criar novo quiz (admin)                 |
| GET    | `/quizzes/:id`           | Detalhes de um quiz                     |
| PUT    | `/quizzes/:id`           | Atualizar quiz (admin)                  |
| DELETE | `/quizzes/:id`           | Remover quiz (admin)                    |
| GET    | `/quizzes/:id/questions` | Listar perguntas de um quiz             |
| POST   | `/quizzes/:id/questions` | Adicionar pergunta (admin)              |
| POST   | `/quizzes/:id/submit`    | Submeter respostas e calcular pontuação |

---

## Contribuindo

1. Faça um fork do repositório.
2. Crie uma branch: `git checkout -b feature/nome-da-feature`.
3. Commit: `git commit -m "Descrição da mudança"`.
4. Push: `git push origin feature/nome-da-feature`.
5. Abra um PR e aguarde revisão.

🔗 Repositórios
Backend: https://github.com/vitinhoLira/quizzerando-api

Frontend: https://github.com/impedrohenri/frontend-quizzerando
