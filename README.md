# apix2019-microservice-crawler-nodejs :mag:

### Como executar via docker:

1 - Execute o script 'generate-image.sh', presente na pasta raiz do projeto, para gerar a imagem docker da aplicação, junto com a imagem node;

2 - Execute o comando docker-start.sh para iniciar o container da aplicação;

OBS: Caso tenha feito alguma alteração de código, gere novamente a imagem docker usando o comando 'generate-image.sh' e depois use o comando 'update-notification.sh', na pasta 'docker', para subir um novo container. 

### Como executar localmente:

1 - Edite o arquivo '.env' presente na raiz do projeto, alterando o valor da variável de ambiente RABBIT_SERVER para `localhost`;

2 - Pelo terminal, acesse a pasta do projeto e execute o comando:
```
$ npm start
```

### Como fazer debug da aplicação:

1 - Realizar os passos da seção anterior;

2 - No Visual Studio, apertar as teclas 'Ctrl+Shift+D', e próximo do campo 'Launch Program' clicar no icone da engrenagem (Open launch.json);

3 - No arquivo mostrado depois de clicar no icone anterior, mudar o valor do atributo "program" para '${workspaceFolder}/worker.js'.

