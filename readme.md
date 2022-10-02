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
Ação deve ser permitida apenas a Admins
# Listagem de Carros
**Requisitos Funcionais** => RF
Deve ser possivel listar os carros
Devem existir filtros para carros disponiveis, indisponiveis, categoria, marca e nome 

**Requisitos Não Funcionais** => RNF

**Regra de Negócio** => RN
Não é necessario estar logado para acessar esta funcionalidade
# Listagem de Categorias
**Requisitos Funcionais** => RF
Deve ser possivel listar todas as categorias de carro


**Requisitos Não Funcionais** => RNF

**Regra de Negócio** => RN

# Cadastro de Especificação no Carro
**Requisitos Funcionais** => RF
Deve ser possivel cadatrar uma especificação para um carro

**Requisitos Não Funcionais** => RNF

**Regra de Negócio** => RN
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
Não deve ser possivel cadastrar uma especificação ja existente para um mesmo carro
Ação deve ser permitida apenas a Admins
# Listagem de Especificação no Carro
**Requisitos Funcionais** => RF
Deve ser possivel listar todas as especificações
Deve ser possivel listas as especificações por carro

**Requisitos Não Funcionais** => RNF

**Regra de Negócio** => RN
# Cadastro ed Imagem do Carro
**Requisitos Funcionais** => RF
Deve ser possivel cadastrar imagem para um carro
Ação deve ser permitida apenas a Admins

**Requisitos Não Funcionais** => RNF
Utilizar multer para upload 

**Regra de Negócio** => RN
Um carro pode ter varias imagens


