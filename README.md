# App Blog dos Professores - Tech Challenge

Repositório do projeto techChallenge. Blog para os professores postarem conteúdos educacionais.

## Tecnologias Utilizadas 
- **React**: Desenvolvimento da interface WEB.
- **Vite**: Utilizado como build tool para acelerar o desenvolvimento e a compilação do projeto React. O Vite permite um ambiente mais rápido, eficiente e otimizado em comparação ao Create React App, graças ao carregamento on-demand dos módulos durante o desenvolvimento e ao bundle otimizado para produção.
- **Tailwind CSS**: Framework de CSS que facilita o desenvolvimento de interfaces responsivas e customizadas. Utilizamos classes utilitárias do Tailwind para estilizar componentes de forma ágil, mantendo o código limpo e produtivo.
- **ESLint**: Ferramenta de linting configurada para garantir padrões de código e boas práticas no desenvolvimento JavaScript/React. O ESLint é integrado ao ambiente de desenvolvimento, ajudando a identificar e corrigir erros e inconsistências automaticamente.
- **Docker**: Containerizamos o projeto com Docker para garantir que o ambiente de desenvolvimento, testes e produção seja consistente. Isso facilita o deploy e a escalabilidade, além de reduzir problemas de configuração entre diferentes máquinas.

## Funcionalidades do projeto
- Cadastro e login de alunos e professores.
- Recuperação de senha para usuários.
- Professores realizarem criação de postagens.
- Gerenciamento de postagens, incluindo edição e remoção, disponível apenas para professores.
- Visualização e detalhamento das postagens, acessível tanto para usuários cadastrados quanto não cadastrados.
- Filtros avançados de postagens por categoria, título ou conteúdo.
- Criação, edição e exclusão de categorias para vinculação às postagens.
- Criação e remoção de comentários nas postagens feitas pelos professores e alunos.
- Atualização das informações de cadastro dos usuários.

## Instalação do projeto

Para começar a usar o projeto, siga os passos abaixo:

#### 📋 Pré-requisitos: 

- Instalar node v18+;
- Instalar o docker; 

#### 1. 🖥️ Clone o repositório

[![GitHub](https://img.shields.io/badge/GitHub-Clone-blue?logo=github&logoColor=white)](https://github.com/FIAP-G4/api-blog-professores)

Clone o projeto para o seu ambiente de desenvolvimento usando o comando git clone:

```bash
  git clone https://github.com/FIAP-G4/app-blog-professores-web.git
```

#### 2. 📂 Entre no diretório do projeto:

[![Directory](https://img.shields.io/badge/Directory-Browse-blue?logo=folder&logoColor=white)](#)

```bash
  cd api-blog-professores
```

#### 3. 🗂️ Configure o arquivo ENV

[![Files](https://img.shields.io/badge/configure_files-lightgrey?logo=file&logoColor=white)](#)

Localize o arquivo `.env.example` na raiz do projeto e faça uma cópia dele sem a extensão `.example.` Por exemplo, renomeie `.env.example` para `.env`.

#### 5. 🐳 Inicie o aplicativo com o Docker

[![Docker](https://img.shields.io/badge/docker-blue?logo=docker&logoColor=white)](https://www.docker.com/)

Certifique-se de ter o Docker instalado em sua máquina e execute o seguinte comando para iniciar o aplicativo:

```bash
  docker compose up -d --build
```
Pronto, foi iniciado 3 containers:

  - app-web (a aplicação front-end);
  - postgres-fiap (o banco de dados);
  - api-blog ( aplicação backend);

#### 6. 🖥️ acesse a aplicação

Você pode acessar a aplicação em:

**URL:** [http://localhost:5432](http://localhost:5432)

#### 7. 🎥 Link para vídeo explicativo

[Assista ao vídeo aqui](https://youtu.be/O1_ZfHFSehk)

![YouTube](https://img.shields.io/badge/YouTube-Watch-red?logo=youtube&logoColor=white)
