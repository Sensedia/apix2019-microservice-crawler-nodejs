# apix2019-microservice-crawler-nodejs :mag:

### Como executar via docker:

1 - Execute o script 'generate-image.sh', presente na pasta raiz do projeto, para gerar a imagem docker da aplicação, junto com a imagem node;

2 - Execute o script 'docker-start.sh' para iniciar o container da aplicação;

OBS: Caso tenha feito alguma alteração de código e queira vê-la refletida na aplicação, repita o primeiro passo e execute o script 'update-crawler' na sequência. 

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

### Como testar se o crawler está fazendo a varredura pelos itens do kit devidamente:

Opção 1 - Para testar o fluxo completo, acesse o README do microserviço de kit e inicie criando um kit, fazendo o post descrito lá.

Opção 2 - Para testar somente a parte da busca do crawler (sem ter que passar pelo fluxo completo), você pode postar uma mensagem diretamente no rabbit, na fila 'apix-kit-queue' com o seguinte payload:

```
{
   "id":"5f3671ae-c0da-454b-9da3-7d22bbc068cb",
   "gender":"F",
   "specifications":[
      { 
         "type":"PANT",
         "color":"BLUE"
      },
      {
         "type":"SHIRT",
         "color":"WHITE"
      },
      {
         "type":"SHOES",
         "color":"BLACK"
      }
   ]
}
```

IMPORTANTE: Este microserviço possui cache das buscas efetuadas. Para repetir uma busca passando os mesmos parâmetros, execute o comando:
```
$ rm -rf repository/*.json*
```
E não se esqueça de regerar a imagem ('generate-image.sh') e atualizar o container ('update-crawler.sh');
