# 🐾 Petz Social API

Uma **API RESTful** para uma rede social onde **pets são os protagonistas** 🐶🐱

O Petz Social Media permite que usuários criem perfis para seus pets, publiquem conteúdos, curtam, comentem e sigam outros pets — tudo com foco em **boas práticas de backend**, **arquitetura limpa** e **normalização de dados**.

---

## ✨ Funcionalidades

### 👤 Usuários

* Criar, atualizar e remover usuários
* Autenticação completa (login, logout, refresh)
* Recuperação de senha via OTP

### 🐕 Pets

* Cadastro de pets vinculados a um usuário
* Gerenciamento de cores do pet
* Seguir e ser seguido por outros pets

### 📝 Posts

* Criação de posts por pets
* Upload e gerenciamento de imagens
* Curtidas em posts
* Comentários em posts

---

## 🧠 Conceitos aplicados

* API REST seguindo **padrões semânticos**
* **Normalização até a 4FN**
* Separação clara de recursos
* Autenticação baseada em token
* Relacionamentos bem definidos (User → Pet → Post)

---

## 🛠️ Tecnologias

* **Node.js**
* **Express**
* **TypeScript**
* **JWT** (autenticação)
* **Vitest** (testes)
* **PostgreSQL** 
* **Prisma**

---

## 📁 Estrutura de Pastas (sugestão)

```bash
src
├── modules
│   ├── users
│   ├── pets
│   ├── posts
│   ├── comments
│   ├── likes
│   └── auth
    └── otp
├── shared
│   ├── middlewares
│   ├── errors
│   └── lib
├── routes.ts
├── app.ts
└── server.ts
```

---

## 🔐 Autenticação

A API utiliza **JWT**.

Após o login, o token deve ser enviado em todas as rotas protegidas:

```http
Authorization: Bearer <token>
```

---

## 📌 Rotas da API

### 👤 Users

```http
POST   /users
POST   /users/upload-avatar
GET    /users/:id
PUT    /users/:id
DELETE /users/:id

POST /users/:userId/pets
GET  /users/:userId/pets
```

---

### 🐾 Pets

```http
GET    /pets/:id
PUT    /pets/:id
DELETE /pets/:id

POST /pets/:petId/posts
GET  /pets/:petId/posts

POST   /pets/:petId/colors
GET    /pets/:petId/colors
DELETE /pets/:petId/colors/:colorId
```

---

### 📝 Posts

```http
GET /posts
GET /posts/:id

POST   /posts/:postId/likes
GET    /posts/:postId/likes
DELETE /posts/:postId/likes

POST /posts/:postId/comments
GET  /posts/:postId/comments

POST   /posts/:postId/images
GET    /posts/:postId/images
DELETE /posts/:postId/images/:imageId
```

---

### 💬 Comments

```http
DELETE /comments/:commentId
```

---

### 🔐 Auth

```http
POST /auth/login
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/verify-otp
POST /auth/refresh
```

---

## 🧪 Testes

Os testes são escritos com **Vitest**, seguindo o padrão **AAA (Arrange, Act, Assert)**:

```bash
npm run test
```

---

## 🚀 Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev

# rodar testes
npm run test
```

---

## 🐶🐱 Considerações finais

Esse projeto foi pensado como um **backend de portfólio**, focado em demonstrar:

* Clareza de modelagem
* Boas práticas REST
* Organização de código
* Escalabilidade
