# 🐾 Petz - Backend API

> Uma rede social vibrante e divertida para compartilhar momentos incríveis dos seus pets!

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.0+-000?style=for-the-badge&logo=fastify)](https://www.fastify.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#licença)

---

## 📋 Tabela de Conteúdo

- [Sobre o Projeto](#sobre-o-projeto)
- [Features](#features)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como Rodar](#como-rodar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Documentation](#api-documentation)
- [Testes](#testes)
- [Contribuindo](#contribuindo)

---

## 🎯 Sobre o Projeto

**Petz** é uma plataforma social inovadora onde donos de pets podem criar perfis, compartilhar momentos especiais através de posts, interagir com a comunidade e construir uma rede de seguidores ao redor de seus animais de estimação.

O backend foi desenvolvido com foco em segurança, performance e escalabilidade, utilizando as melhores práticas da indústria.

---

## ✨ Features

### 👤 Autenticação & Perfil

- ✅ Cadastro com validação de email
- ✅ Login com JWT
- ✅ Autenticação social (Google, Twitter, Facebook)
- ✅ Recuperação de senha via email
- ✅ Upload de foto de perfil
- ✅ Edição de perfil completo

### 🐶 Gestão de Pets

- ✅ Criar, editar e deletar pets
- ✅ Upload múltiplas fotos do pet
- ✅ Informações detalhadas (raça, peso, idade, etc)
- ✅ Perfil público do pet
- ✅ Histórico de atividades

### 📸 Feed Social

- ✅ Criar posts com texto e/ou imagens
- ✅ Editar posts (30 minutos)
- ✅ Deletar posts
- ✅ Sistema de curtidas
- ✅ Comentários em posts
- ✅ Feed personalizado

### 👥 Comunidade

- ✅ Seguir/Unfollow de pets
- ✅ Ver seguidores e seguindo
- ✅ Visualizar perfis de outros usuários
- ✅ Descobrir novos pets

---

## 📦 Requisitos

- **Node.js** v18.0.0 ou superior
- **npm** v9.0.0 ou superior (ou yarn)
- **PostgreSQL** v15 ou superior
- **Redis** (opcional, para cache e fila)

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/petz.git
cd petz/backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

```bash
# Crie um banco de dados PostgreSQL
createdb petz_db

# Execute as migrations
npx prisma migrate dev
```

### 4. Configure as variáveis de ambiente

```bash
cp .env.example .env
# Edite o arquivo .env com seus valores
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Servidor
NODE_ENV=development
PORT=3000

# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/petz_db

# JWT
JWT_SECRET=sua-chave-secreta-super-segura-aqui
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=sua-chave-refresh-secreta-aqui
JWT_REFRESH_EXPIRATION=30d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-app
SMTP_FROM=noreply@petz.com

# OAuth
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

TWITTER_CLIENT_ID=seu-twitter-client-id
TWITTER_CLIENT_SECRET=seu-twitter-client-secret
TWITTER_CALLBACK_URL=http://localhost:3000/api/auth/twitter/callback

FACEBOOK_APP_ID=seu-facebook-app-id
FACEBOOK_APP_SECRET=seu-facebook-app-secret
FACEBOOK_CALLBACK_URL=http://localhost:3000/api/auth/facebook/callback

# Cloud Storage
# Cloud Storage
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=sua-api-secret

# Redis
REDIS_URL=redis://localhost:6379

```

---

## ▶️ Como Rodar

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3333`

### Modo Produção

```bash
# Build
npm run build

# Start
npm start
```

### Apenas Linting

```bash
npm run lint
```

### Corrigir Problemas de Linting

```bash
npm run lint:fix
```

---

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/             # Configurações da aplicação
│   ├── controllers/        # Controladores (lógica HTTP)
│   ├── services/           # Camada de serviços (regras de negócio)
│   ├── repositories/       # Camada de acesso a dados
│   ├── middlewares/        # Middlewares (auth, validation, etc)
│   ├── routes/             # Definição de rotas
│   ├── utils/              # Funções utilitárias
│   ├── validators/         # Validadores de dados
│   ├── types/              # TypeScript types e interfaces
│   ├── errors/             # Classes de erro customizadas
│   ├── lib/                # Bibliotecas externas (Prisma, etc)
│   ├── app.ts              # Configuração da aplicação
│   └── server.ts           # Inicialização da aplicação
├── prisma/
│   ├── schema.prisma       # Schema do banco de dados
│   └── migrations/         # Migrations do banco
├── tests/                  # Testes unitários e integração
├── .env.example            # Exemplo de variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md
```

### 🏗️ Arquitetura

O projeto segue uma arquitetura limpa com separação clara de responsabilidades:

#### **Controllers**

- Responsáveis por lidar com requisições HTTP
- Validam dados de entrada
- Delegam lógica de negócio para os use-cases
- Retornam respostas HTTP adequadas

#### **Use-Cases**

- Contêm as regras de negócio da aplicação
- Orquestram múltiplas operações
- São independentes de infraestrutura
- Podem ser reutilizados em diferentes contextos

#### **Repositories**

- Camada de abstração para acesso a dados
- Isolam a lógica do banco de dados
- Facilitam testes e substituição de implementações
- Implementam padrões de consulta reutilizáveis

#### **Fluxo de Dados**

```
Request → Controller → Use-Case → Repository → Database
Response ← Controller ← Use-Case ← Repository ← Database
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:3333/api
```

### Autenticação (Auth)

| Método | Endpoint                | Descrição                |
| ------ | ----------------------- | ------------------------ |
| POST   | `/auth/register`        | Criar nova conta         |
| POST   | `/auth/sessions`        | Fazer login              |
| POST   | `/auth/refresh`         | Renovar token            |
| POST   | `/auth/logout`          | Fazer logout             |
| POST   | `/auth/forgot-password` | Solicitar reset de senha |
| POST   | `/auth/reset-password`  | Resetar senha            |
| GET    | `/auth/google`          | Login com Google         |
| GET    | `/auth/twitter`         | Login com Twitter        |
| GET    | `/auth/facebook`        | Login com Facebook       |

### Usuários (Users)

| Método | Endpoint            | Descrição                           |
| ------ | ------------------- | ----------------------------------- |
| GET    | `/users/:id`        | Obter perfil                        |
| GET    | `/me`               | Obter perfil do usuário autenticado |
| PUT    | `/users/:id`        | Editar perfil                       |
| DELETE | `/users/:id`        | Deletar conta                       |
| GET    | `/users/:id/pets`   | Listar pets do usuário              |
| POST   | `/users/:id/avatar` | Upload foto de perfil               |

### Pets

| Método | Endpoint              | Descrição             |
| ------ | --------------------- | --------------------- |
| POST   | `/pets`               | Criar pet             |
| GET    | `/pets/:id`           | Obter detalhes do pet |
| PUT    | `/pets/:id`           | Editar pet            |
| DELETE | `/pets/:id`           | Deletar pet           |
| POST   | `/pets/:id/photos`    | Upload fotos do pet   |
| POST   | `/pets/:id/follow`    | Seguir pet            |
| DELETE | `/pets/:id/follow`    | Deixar de seguir      |
| GET    | `/pets/:id/followers` | Listar seguidores     |

### Posts

| Método | Endpoint          | Descrição             |
| ------ | ----------------- | --------------------- |
| POST   | `/posts`          | Criar post            |
| GET    | `/posts/:id`      | Obter post            |
| PUT    | `/posts/:id`      | Editar post           |
| DELETE | `/posts/:id`      | Deletar post          |
| GET    | `/feed`           | Obter feed do usuário |
| POST   | `/posts/:id/like` | Curtir post           |
| DELETE | `/posts/:id/like` | Descurtir post        |

### Comentários (Comments)

| Método | Endpoint                  | Descrição          |
| ------ | ------------------------- | ------------------ |
| POST   | `/posts/:postId/comments` | Comentar em post   |
| PUT    | `/comments/:id`           | Editar comentário  |
| DELETE | `/comments/:id`           | Deletar comentário |

### Documentação Interativa

```
GET http://localhost:3000/api-docs
```

Acesse a documentação Swagger/OpenAPI em tempo real!

---

## 🧪 Testes

### Rodar todos os testes

```bash
npm test
```

### Rodar testes com cobertura

```bash
npm run test:coverage
```

### Rodar testes em modo watch

```bash
npm run test:watch
```

### Testes de carga

```bash
npm run test:load
```

---

### Railway/Render

Você pode fazer deploy diretamente do GitHub conectando o repositório na plataforma.

### Variáveis de Ambiente em Produção

Certifique-se de configurar todas as variáveis de ambiente no seu serviço de hosting:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- Credenciais de email
- Credenciais OAuth
- Credenciais AWS S3
- etc.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para começar:

1. **Fork** o repositório
2. **Clone** seu fork: `git clone https://github.com/seu-usuario/petz.git`
3. **Crie uma branch** para sua feature: `git checkout -b feature/minha-feature`
4. **Commit** suas mudanças: `git commit -m 'Adiciona minha feature'`
5. **Push** para a branch: `git push origin feature/minha-feature`
6. **Abra um Pull Request**

### Padrões de Código

- Use TypeScript em todo o projeto
- Siga as regras de linting (ESLint)
- Escreva testes para novas features
- Mantenha a cobertura de testes > 80%
- Use commits semânticos (feat, fix, docs, etc)

---

## 📧 Contato & Suporte

- 📧 Email: [suportepetzsocialmedia@gmail.com](mailto:suportepetzsocialmedia@gmail.com)

---

## 🙏 Agradecimentos

Agradecemos a todos os contribuidores, dependências utilizadas e à comunidade open source!

---

<div align="center">

**[⬆ back to top](#-petz---backend-api)**

Desenvolvido com ❤️ pelos criadores do Petz

</div>
