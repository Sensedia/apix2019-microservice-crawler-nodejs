# apix2019-microservice-crawler-nodejs

Para rodar:

1. adicionar um arquivo .env com as seguintes variáveis de ambiente: 
</br>RABBIT_SERVER=localhost:9092
</br>RABBIT_KIT_QUEUE=apix-kit-queue
</br>RABBIT_SPECIFICATION_QUEUE=apix-specification-queue
</br>RABBIT_SUGGESTION_QUEUE=apix-suggestion-queue

2. npm start

Para gerar a imagem:
<code>docker build --tag crawler-node:1.0.0 .</code>
