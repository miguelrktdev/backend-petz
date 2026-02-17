# Petz - Rede social para petz 🐾

## Descrição do Projeto

Plataforma social baseada em comunidade para compartilhamento de informações sobre animais de estimação. Usuários podem criar perfis, cadastrar seus pets, compartilhar momentos através de posts, interagir com conteúdo de outras pessoas e construir uma rede de seguidores.

---

## Requisitos Funcionais

- [ ] O usuário pode se cadastrar usando: nome, nome de usuário, email e senha;
- [ ] O usuário pode se autenticar no app usando: email e senha;
- [ ] O usuário pode fazer autenticação social com: Google, Twitter e Facebook;
- [ ] O usuário pode recuperar sua senha através de link enviado por email;
- [ ] O usuário pode visualizar seu perfil com informações públicas;
- [ ] O usuário pode editar suas informações de perfil (nome, bio, localização, website);
- [ ] O usuário pode fazer upload de foto de perfil em formato JPG/PNG;
- [ ] O usuário pode desativar ou deletar permanentemente sua conta;
- [ ] O usuário pode visualizar perfils de outros usuários;
- [ ] O usuário pode cadastrar novos pets com: nome, idade, peso, cor, raça, tipo e foto;
- [ ] O usuário pode editar as informações de um pet;
- [ ] O usuário pode adicionar múltiplas fotos para um pet;
- [ ] O usuário pode deletar um pet;
- [ ] O usuário pode visualizar o perfil de um pet;
- [ ] O usuário pode listar todos seus pets;
- [ ] O usuário pode criar um post com texto e/ou imagens;
- [ ] O usuário pode editar um post criado por ele;
- [ ] O usuário pode deletar um post criado por ele;
- [ ] O usuário pode visualizar o feed com posts de pets que ele segue;
- [ ] O usuário pode curtir/descurtir um post;
- [ ] O usuário pode comentar em um post;
- [ ] O usuário pode deletar seus próprios comentários;
- [ ] O usuário pode visualizar o histórico de curtidas de um post;
- [ ] O usuário pode seguir um pet de outro usuário;
- [ ] O usuário pode deixar de seguir um pet;
- [ ] O usuário pode visualizar quantos usuários seguem um pet;
- [ ] O usuário pode visualizar quais pets ele está seguindo;

---

## Regras de Negócio
- [ ] A senha deve ter no mínimo 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 número e 1 caractere especial;
- [ ] O nome de usuário deve ter entre 3 e 30 caracteres (apenas letras, números, ponto e underscore);
- [ ] O email deve ser válido e único no sistema;
- [ ] Foto de perfil: máximo 5MB, apenas JPG/PNG;
- [ ] Fotos de posts: máximo 10MB cada, máximo 10 imagens por post;
- [ ] Peso do pet deve ser entre 0.1kg e 200kg;
- [ ] O usuário deve confirmar seu email antes de poder acessar a plataforma (enviar link de confirmação por email);
- [ ] Todos os usuários começam com um token de atualização que expira em 7 dias;
- [ ] Um usuário pode ter múltiplas sessões ativas simultaneamente;
- [ ] Senha deve ser alterável a qualquer momento se o usuário lembrar da senha ou através do email;
- [ ] Um pet deve ter no mínimo um dono (o usuário que o criou);
- [ ] Um usuário não pode seguir a si mesmo;
- [ ] Um usuário não pode curtir seu próprio post;
- [ ] Um post só pode ser editado nos primeiros 30 minutos após a criação;
- [ ] Um post só pode ser deletado pelo autor;
- [ ] Um comentário só pode ser deletado pelo autor ou pelo dono do post;
- [ ] Um comentário pode ter no máximo 500 caracteres;
- [ ] Todos os dados sensíveis (senhas, tokens) devem ser criptografados;
- [ ] Os hashes de senha devem usar algoritmo bcrypt com salt mínimo de 10 rodadas;
- [ ] Dados de usuários deletados devem ser removidos após 30 dias (período de "soft-delete");

---

## Requisitos Não Funcionais
- [ ] O sistema deve responder em menos de 200ms para 95% das requisições;
- [ ] O sistema deve responder em menos de 500ms para 99% das requisições;
- [ ] O sistema deve suportar no mínimo 10.000 usuários simultâneos;
- [ ] O sistema deve ser capaz de escalar horizontalmente;
- [ ] Cache de dados deve ser implementado para reduzir consultas ao banco de dados;
- [ ] Usar PostgreSQL como banco de dados principal;
- [ ] Implementar índices nas colunas de busca frequente (email, username, pet_id);
- [ ] Realizar backup automático diário com retenção de 30 dias;
- [ ] Implementar migrations versionadas para controle de schema;
- [ ] Backend desenvolvido em Node.js com framework Express;
- [ ] Usar TypeScript para type safety;
- [ ] Usar JWT para autenticação;
- [ ] Sistema de fila para processamento assíncrono (Bull/Redis);
- [ ] Implementar rate limiting para prevenir abuso;
- [ ] Todos os dados sensíveis (senhas, tokens) devem ser criptografados;
- [ ] Implementar HTTPS/TLS para todas as comunicações;
- [ ] Usar CORS para controlar acesso entre domínios;
- [ ] Implementar proteção contra XSS, CSRF e SQL Injection;
- [ ] Validar e sanitizar todas as entradas de usuário;
- [ ] Implementar política de rate limiting;
- [ ] Fazer auditoria de segurança trimestral;
- [ ] Taxa de disponibilidade mínima de 99.5%;
- [ ] Implementar health checks para monitoramento;
- [ ] Sistema de alerta para eventos críticos;
- [ ] Plano de recuperação de desastres (RTO: 1 hora, RPO: 15 minutos);
- [ ] Todos os erros devem ser logados e monitorados;
- [ ] Todas as endpoints de API devem ser documentadas em OpenAPI/Swagger;
- [ ] Cobertura de testes deve ser maior que 80%;
- [ ] Testes unitários para toda lógica de negócio;
- [ ] Testes de integração para fluxos críticos;
- [ ] Testes de carga para validar escalabilidade;
- [ ] README em português com instruções de setup;
- [ ] Documentação de variáveis de ambiente necessárias;
- [ ] Usar serviço de cloud storage (AWS S3, Google Cloud Storage ou Azure Blob);
- [ ] Implementar processamento de imagem (resize, otimização);
- [ ] Gerar URLs pré-assinadas para download seguro;
- [ ] Implementar política de expiração de arquivos temporários;
- [ ] Integração com serviço de email para notificações e confirmação;
- [ ] Integração com provedores OAuth (Google, Twitter, Facebook);
- [ ] Sistema de notificações em tempo real (WebSocket/Socket.io);
- [ ] Implementar webhooks para eventos importantes;

---

## Endpoints da API (Exemplos)

### Autenticação

- `POST /api/auth/register` - Criar nova conta
- `POST /api/auth/login` - Login com email/senha
- `POST /api/auth/refresh` - Renovar token
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Recuperar senha

### Usuários

- `GET /api/users/:id` - Obter perfil do usuário
- `GET /api/me` - Obter perfil do usuário autenticado
- `PUT /api/users/:id` - Atualizar perfil
- `DELETE /api/users/:id` - Deletar conta

### Pets

- `POST /api/pets` - Criar novo pet
- `GET /api/pets/:id` - Obter detalhes do pet
- `PUT /api/pets/:id` - Atualizar pet
- `DELETE /api/pets/:id` - Deletar pet
- `GET /api/users/:userId/pets` - Listar pets do usuário

### Posts

- `POST /api/posts` - Criar novo post
- `GET /api/posts/:id` - Obter detalhes do post
- `PUT /api/posts/:id` - Atualizar post
- `DELETE /api/posts/:id` - Deletar post
- `GET /api/feed` - Obter feed do usuário

### Interações

- `POST /api/posts/:postId/like` - Curtir post
- `DELETE /api/posts/:postId/like` - Descurtir post
- `POST /api/posts/:postId/comments` - Comentar no post
- `DELETE /api/comments/:commentId` - Deletar comentário

### Seguidos

- `POST /api/pets/:petId/follow` - Seguir pet
- `DELETE /api/pets/:petId/follow` - Deixar de seguir pet
- `GET /api/pets/:petId/followers` - Listar seguidores
