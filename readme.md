- Always Up Rentx in Docker and stop Postgres Service in Windows.
- Migrations commands in packgeJson because typescript need ts-node
- Problems with bcrypt, if create on certain OS will not run in differente OS, so when ruuning on Docker or Local will need to rebuild it  - npm rebuild bcrypt --build-from-source
- When running on Docker typeorm host needs to be the name of database service - newOptions.host = 'database-ignite' - on src/database/index.ts


# Cadastro de Carro
**Requisitos Funcionais** => RF
Deve ser possivel cadastrar um novo carro

**Requisitos Não Funcionais** => RNF

**Regra de Negócio** => RN
Não deve ser possivel cadastrar um carro com uma placa ja existente
Não deve ser possivel alterar a placa de um carro ja cadastrado
O carro deve ser cadastrado por padrão "com disponibilidade"

