FROM node:18-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o contêiner
COPY . .

# Executa o build da aplicação dentro do Docker
RUN npm run build

# Instala o servidor estático 'serve'
RUN npm install -g serve

# Porta que será exposta pelo servidor
EXPOSE 5173

# Comando para servir os arquivos estáticos
CMD ["serve", "-s", "dist", "-l", "5173"]
