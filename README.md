# PaintIT

## _DIGITAL REPUBLIC CODE CHALLENGE_

### Objetivo

O Objetivo desse desafio é avaliar o conhecimento e capacidade dos candidatos às vagas de programação/desenvolvimento. O teste pode ser feito por qualquer nível de profissional, contudo o critério de avaliação será conforme a experiencia do candidato.

### O que deve ser desenvolvido

Uma aplicação web que ajude o usuário a calcular a quantidade de tinta necessária para pintar uma sala. Essa aplicação deve considerar que a sala é composta de 4 paredes e deve permitir que o usuário escolha qual a medida de cada parede e quantas janelas e portas possuem cada parede. Com base na quantidade necessária o sistema deve apontar tamanhos de lata de tinta o usuário deve comprar.

### Regras de negócio

- Nenhuma parede pode ter menos de 1 metro nem mais de 15 metros
- O total de área das portas e janelas deve ser no máximo 50% da área de parede
- A altura da parede deve ser, no mínimo, 30 centímetros maior que a altura da porta.
- Cada janela possui as medidas: 2,00 x 1,20 mtos
- Cada porta possui as medidas: 0,80 x 1,90
- Cada litro de tinta é capaz de pintar 5 metros quadrados.
- Não considerar teto nem piso.
- As variações de tamanho das latas de tinta são:
  - 0,5 L
  - 2,5 L
  - 3,6 L
  - 18 L

### Tech

A Solução para o desafio proposto foi construida usando o conceito de micro servicços
Utilizando as techs:

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/pt-br)
- [Redis](https://redis.io/)
- [Nginx](https://www.nginx.com/)
- [Docker](https://www.docker.com/)

### Executando a Aplicação

- Requisitos:
  - [Docker](https://www.docker.com/)
  - [docker-compose](https://docs.docker.com/compose/)
  - Variaveis de ambiente (Exemplos dos .envs se encontram dentro da pasta de cada micro serviço)

```sh
git clone https://github.com/DiegoCastro-R/paintit
docker-compose up -d
```

### Consumindo os serviços

Após subir os containers com o docker-compose, o serviço do nginx vai export a porta 8080 como padrão para o gateway das apis que compoem o micro-serviço.

Pode se acessar a documentação da api via browser em:

http://localhost/v1/api-docs

Ou baixar a coleção de requisições do [Insomnia](https://insomnia.rest/) <pre align="center"> [ <img alt="alt_text" width="200px" src="https://cdn-images-1.medium.com/max/800/0*XIdHTmnzm9H2t7vl.png" />](https://raw.githubusercontent.com/DiegoCastro-R/paintit/master/PaintIT_Insomnia_Rest.json?token=AOTAZRS2MISZ2WZAL6OZRZLBPCMDG)
