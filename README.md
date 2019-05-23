# apix2019-microservice-crawler-nodejs

Para rodar:

1. adicionar um arquivo .env com as seguintes variáveis de ambiente: 
RABBIT_SERVER=<IP do Rabbit>
RABBIT_KIT_QUEUE=apix-kit-queue
RABBIT_SPECIFICATION_QUEUE=apix-specification-queue
RABBIT_RECOMMENDATION_QUEUE=apix-recommendation-queue

2. npm start

Para gerar a imagem:
docker build --tag crawler-node:1.0.0 .
