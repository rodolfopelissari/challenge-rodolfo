Comentários da entrega:

Tomei a liberdade de fazer mais coisas do que o solicitado
Além da listagem, inclusão, edição e exclusão dos alunos, fiz uma nova tabela no banco de dados que representam os usuários do sistema
Com isso, pode-se criar usuários "administradores" ou "não administradores"
Os usuários "administradores" conseguem visualizar todos os usuários do sistema, além de visualizar todos os alunos e fazer a inclusão, edição e exclusão de qualquer aluno
Os usuários "não administradores" conseguem apenas visualizar os alunos e mais nada

O login do sistema está funcionando com tokens de usuário que tem validade de 24 horas
Existem rotas no backend "abertas" que não necessitam do token pra funcionar, como /login e /novo_usuario por exemplo
E existem rotas protegidas por esse token, como /alunos e /usuarios por exemplo

Pra fazer o sistema funcionar localmente e testar:

1. download dos fontes
2. na pasta backend/ instalar as dependencias: "npm install"
3. na pasta frontend/ instalar as dependencias: "npm install"
4. criar um schema no mysql com o nome: "challenge"
5. revisar os parâmetros do arquivo: "backend/.env" (pra se conectar ao banco de dados)
6. criar as tabelas usando as migrations do knex na pasta backend: "knex migrate:latest"
7. subir o backend na pasta backend/: "npm start"
8. subir o frontend na pasta frontend/: "npm run serve"

Pra testar o sistema solicitado no navegador, basta:

1. Acessar: http://localhost:8080/login
2. Botão "cadastre-se"
3. Criar um usuário informando e-mail, senha e marcando o "administrador"
4. Botão "cadastrar"
5. Fazer o login com o e-mail e senha informados no passo anterior
6. Botão "login"
7. Clicar no menu da esqueda chamado "Alunos"
8. A partir daqui segue as orientações solicitadas dessa atividade (listagem, inclusão, edição e exclusão de alunos)

Abaixo as perguntas solicitadas:

1.  Decisão da arquitetura utilizada
   
    Foi separado em duas aplicações distintas: backend (lado do servidor, que valida, armazena e trabalha com o banco de dados) e frontend (lado do cliente, navegador web, que maniputa os dados e envia ao servidor)
    Foi decidido por fazer dessa forma pois é a forma mais comum e usual de se fazer uma aplicação web atualmente
    Backend desenvolvido com o framework express e frontend desenvolvido com vue e vuetify


2.  Lista de bibliotecas de terceiros utilizadas

    Frontend
        axios: pra fazer as requisições da API (backend = get, post, put e delete)
        core-js: vem instalado diretamente do vue
        vue: framework do frontend
        vue-router: rotas da aplicação, usadas no final da url, ex: url/login, url/listagem_clientes, ...
        vue-toasted: mostra mensagens ao usuário com um estilo "pronto"
        vuetify: componentes "prontos" que facilitam o desenvolvimento
        vuex: pra usar o mapState e facilitar as variáveis "globais" do sistema (variáveis que qualquer fonte pode visualizar a partir do mapState())

    Backend
        bcrypt-nodejs: criptografia de senha
        body-parser e cors: facilita a captura do body, headers e afins das requisições
        consign: facilita fazer os "imports" dos arquivos javascript, não precisa fazer require('../caminho...), faz simplesmente app.caminho...
        express: framework do backend
        jwt-simple, passport e passport-jwt: controle dos tokens dos usuários após o login pra proteger algumas rotas do backend (segurança!)
        knex e mysql2: pra se conectar com o mysql e fazer as consultas nas tabelas
        nodemon: apenas pra desenvolvimento, sempre quando salva qualquer arquivo da pasta ele automaticamente restarta o servidor com as alterações

3.  O que você melhoraria se tivesse mais tempo

    Testes de performance no geral (criação de índices no banco de dados por exemplo)
    Maior estilização do frontend


4.  Quais requisitos obrigatórios que não foram entregues

    Acredito que todos os requisitor obrigatórios foram desenvolvidos
