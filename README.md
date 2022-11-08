# Cadastro de carro

**RF**
Deve ser possivel cadastrar um novo carro

**RN**
Não deve ser possivel cadastrar um carro com uma placa ja existente.
Não deve ser possivel altarar a placa de um carro ja cadastrado.
O carro deve ser cadastrado, por padrão, com disponibilidade por padrão.
O usuario responsavel pelo cadstro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possivel listar todos os carros disponiveis.
Deve ser possivel listar todos os carro disponiveis pelo nome da categoria.
Deve ser possivel listar todos os carro disponiveis pelo nome da marca.
Deve ser possivel listar todos os carro disponiveis pelo nome do carro.

**RN**
O usuario não precisa esta logado no sistema.

# Cadastro de especificação no carro

**RF**
Deve ser possivel cadastrar um expecificação para um carro.
Deve ser possivel listar todas as especificações.
Deve ser possivel listar todos os carros.

**RN**
Não deve ser possivel cadastrar um especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação ja existente para o mesmo carro.
O usuario responsavel pelo cadstro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadatrar a iamgem do carro.
Dever ser possivel listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
Deve ser possivel cadastra mais de uma imagem para mesmo carro.
O usuario responsavel pelo cadstro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possivel cadastar um aluguel.

**RN**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possivel cadastrar um aluguel caso ja exista um aberto para o usuario.
Não deve ser possivel cadastrar um aluguel caso ja exista um aberto para o carro.

**RF** => Requisitos funcionais

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio
