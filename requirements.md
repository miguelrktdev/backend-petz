# petz - rede social para pets

## Requisitos funcionais

- [ x ] Permitir que o usuário se cadastre informando nome, nome de usuário, e-mail, biografia (bio) e senha;
- [ x ] Permitir que o usuário faça login utilizando e-mail e senha;
- [ ] Permitir que o usuário faça logout do sistema;
- [ ] Permitir que o usuário crie, edite e exclua o próprio perfil;
- [ ] Permitir que o usuário crie um ou mais perfis de pets vinculados à sua conta;
- [ ] Permitir que o usuário edite e exclua perfis de pets que ele criou;
- [ ] Permitir que o usuário visualize perfis públicos de outros pets;
- [ ] Permitir que o usuário publique posts para um pet com imagem e legenda;
- [ ] Permitir que o usuário edite e exclua posts do próprio pet;
- [ ] Permitir que o usuário visualize um feed com posts de pets;
- [ ] Permitir que o usuário curta posts de pets;
- [ ] Permitir que o usuário remova a curtida de um post;
- [ ] Permitir que o usuário comente em posts;
- [ ] Permitir que o usuário edite e exclua seus próprios comentários;
- [ ] Permitir que o usuário siga outros pets;
- [ ] Permitir que o usuário deixe de seguir outros pets;
- [ ] Permitir que o usuário visualize a lista de seguidores e seguindo de um pet;
- [ ] Permitir que o usuário pesquise pets pelo nome;
- [ ] Permitir que o usuário visualize a página individual de um post;

## Regras de negócios

- [ x ] Um usuário não pode se cadastrar usando email ou nome de usuário já existentes;
- [ ] Um usuário pode possuir um ou mais perfis de pets;
- [ ] Cada perfil de pet deve estar vinculado a apenas um usuário;
- [ ] Apenas o dono do perfil do pet pode editá-lo ou excluí-lo;
- [ ] Apenas o dono de um post pode editá-lo ou excluí-lo;
- [ ] Um usuário não pode curtir o mesmo post mais de uma vez;
- [ ] Um usuário pode remover sua curtida a qualquer momento;
- [ ] Um usuário não pode comentar em posts inexistentes;
- [ ] Apenas o autor de um comentário pode editá-lo ou excluí-lo;
- [ ] Um pet não pode seguir a si mesmo;
- [ ] Um pet não pode seguir o mesmo pet mais de uma vez;
- [ ] Apenas usuários autenticados podem criar posts, curtir ou comentar;
- [ ] Posts devem conter obrigatoriamente uma imagem;
- [ ] A legenda do post deve possuir um limite máximo de caracteres;
- [ ] Perfis de pets são públicos por padrão;
- [ ] Um usuário só pode excluir sua conta se não houver dependências críticas ou mediante exclusão em cascata;
- [ ] Imagens de perfil e posts devem ser armazenadas externamente (ex: Cloudinary);
- [ ] A exclusão de um pet deve remover seus posts, curtidas e comentários associados.

## Requisitos não funcionais

- [ x ] O sistema deve ser desenvolvido utilizando arquitetura REST;
- [ x ] O backend deve ser implementado em Node.js;
- [ x ] O banco de dados deve ser relacional (MySQL ou PostgreSQL);
- [ x ] O sistema deve utilizar autenticação baseada em JWT e Refresh Token;
- [ x ] As senhas dos usuários devem ser armazenadas de forma criptografada;
- [ ] O sistema deve proteger rotas privadas contra acesso não autorizado;
- [ ] O upload de imagens deve possuir limite de tamanho;
- [ ] O tempo de resposta das requisições deve ser inferior a um limite aceitável;
- [ ] O sistema deve ser escalável para suportar crescimento de usuários;
- [ ] O código deve seguir boas práticas de organização e padronização;
- [ ] O sistema deve possuir tratamento de erros consistente;
- [ ] Logs devem ser gerados para facilitar depuração e monitoramento;
- [ ] O sistema deve estar preparado para deploy em ambiente de produção;
- [ ] O sistema deve utilizar variáveis de ambiente para dados sensíveis;
- [ ] O sistema deve enviar emails de boas vindas para o usuário;

# Rotas

## User

     - [ x ] POST   /users
     - [ ] GET    /users/:id
     - [ ] POST   /users/upload-avatar
     - [ ] PUT    /users/:id
     - [ ] DELETE /users/:id
     - [ ] POST /users/:userId/pets
     - [ ] GET  /users/:userId/pets

## Pet

    - [ ] GET    /pets/:id
    - [ ] PUT    /pets/:id
    - [ ] DELETE /pets/:id
    - [ ] POST /pets/:petId/posts
    - [ ] GET  /pets/:petId/posts
    - [ ] POST   /pets/:petId/colors
    - [ ] GET    /pets/:petId/colors
    - [ ] DELETE /pets/:petId/colors/:colorId

## Post

     - [ ] GET /posts
     - [ ] GET /posts/:id
     - [ ] POST   /posts/:postId/likes
     - [ ] GET    /posts/:postId/likes
     - [ ] DELETE /posts/:postId/likes
     - [ ] POST /posts/:postId/comments
     - [ ] GET  /posts/:postId/comments
     - [ ] POST   /posts/:postId/images
     - [ ] GET    /posts/:postId/images
     - [ ] DELETE /posts/:postId/images/:imageId

## Comments

    - [ ] DELETE /comments/:commentId

## Auth

    - [ x ] POST /auth/login
    - [ ] POST /auth/logout
    - [ ] POST /auth/forgot-password
    - [ ] POST /auth/reset-password
    - [ ] POST /auth/verify-otp
    - [ ] POST /auth/refresh
