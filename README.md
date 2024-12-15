# app blog professores

## Instalação

Para começar a usar o projeto, siga os passos abaixo:

#### 📋 Pré-requisitos: 

- Instalar node v18+;
- Instalar o docker; 

#### 1. 🖥️ Clone o repositório

[![GitHub](https://img.shields.io/badge/GitHub-Clone-blue?logo=github&logoColor=white)](https://github.com/FIAP-G4/api-blog-professores)

Clone o projeto para o seu ambiente de desenvolvimento usando o comando git clone:

```bash
  git clone https://github.com/FIAP-G4/api-blog-professores.git
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
  docker compose up -d
```
Pronto, foi iniciado 3 containers:

  - app-web (a aplicação front-end);
  - postgres-fiap (o banco de dados);
  - api-blog ( aplicação backend);

#### 6. 🖥️ acesse a aplicação

Você pode acessar a aplicação em:

**URL:** [http://localhost:5432](http://localhost:5432)

#### 10. 🎥 Link para vídeo explicativo

[Assista ao vídeo aqui]()

![YouTube](https://img.shields.io/badge/YouTube-Watch-red?logo=youtube&logoColor=white)