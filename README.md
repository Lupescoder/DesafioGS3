# DesafioGS3


## Configuração do Backend

### Pré-requisitos

- Certifique-se de que você tenha o PHP e o Composer instalados na sua máquina.

### Passos

1. Faça a clonagem deste repositório.

2. Navegue até a pasta do backend.

3. Rode o seguinte comando para instalar as dependências do Composer: composer install

4. Renomeie o arquivo `.env.example` para `.env`

5.  Verifique o arquivo `.env` para garantir que as configurações do seu banco de dados estejam corretas.

- **DB_CONNECTION**: mysql
- **DB_HOST**: 127.0.0.1
- **DB_PORT**: 3306
- **DB_DATABASE**: desafio
- **DB_USERNAME**: root
- **DB_PASSWORD**: (deixe em branco ou insira sua senha)

6.  Execute o comando para gerar a key JWT : php artisan jwt:secret


7. Execute as migrações do banco de dados com o seguinte comando: php artisan migrate


8. Em seguida, execute o comando para popular o banco de dados com dados iniciais: php artisan db:seed --class=ProfileSeeder


9. Execute também o seguinte comando para adicionar usuários de exemplo: php artisan db:seed --class=UserSeeder


10. Inicie o servidor backend com o seguinte comando: php artisan serve

Agora, o backend está rodando na sua máquina.


## Configuração do Frontend

### Pré-requisitos

- Certifique-se de que você tenha o Node.js instalado na sua máquina.
- Certifique-se de ter o ionic instalado : npm i -g @ionic/cli 

### Passos

1. Navegue até a pasta do frontend.

2. Rode o seguinte comando para instalar as dependências do Node.js: npm install

3. Em seguida, inicie o servidor frontend com o seguinte comando: ionic serve


Agora, o frontend está rodando na sua máquina e você pode acessar a aplicação em um navegador da web
<br>
Para fazer o Login use o Usuário Administrador => email: admin@gmail.com e senha: 123












