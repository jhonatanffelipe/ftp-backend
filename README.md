# FTP Backend

Backend Node.js/TypeScript para armazenamento de arquivos em servidor FTP com Express e SQLite.

## Pré-requisitos
- Node.js >= 18
- Yarn ou npm

## Instalação

1. Clone o repositório:
   ```sh
   git clone <repo-url>
   cd ftp-backend
   ```
2. Instale as dependências:
   ```sh
   yarn install
   # ou
   npm install
   ```
3. Copie o arquivo de variáveis de ambiente:
   ```sh
   cp .env-example .env
   ```
   Edite o arquivo `.env` conforme necessário.

## Rodando o projeto

### Em modo desenvolvimento
```sh
yarn dev
# ou
npm run dev
```
O servidor será iniciado na porta definida em `.env` (padrão: 3011).

## Estrutura principal
- `src/server.ts`: Ponto de entrada do servidor Express
- `src/database/`: Migrations, seeds e conexão com o banco
- `src/routes/`: Rotas da aplicação
- `src/controllers/`: Controllers das rotas
- `src/services/`: Regras de negócio
- `src/schemas/`: Schemas de validação (Yup)
- `src/middlewares/`: Middlewares customizados

## Banco de dados
- Utiliza SQLite (arquivo `database.sqlite`)
- Migrations e seeds automáticos ao iniciar o servidor
- Usuário admin padrão criado automaticamente

## Scripts
- `dev`: Inicia o servidor em modo desenvolvimento com `ts-node-dev`

## Observações
- Não esqueça de definir uma variável `JWT_SECRET` no `.env`.
- O projeto ignora arquivos sensíveis e de build via `.gitignore`.

---

Sinta-se à vontade para contribuir ou abrir issues!
