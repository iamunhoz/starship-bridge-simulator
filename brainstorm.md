# ideia basica

- um backend (api + db) que age como as respostas que o computador da nave oferece. Ex de dados:

  - navegação
    - atual vetor de direção
      - em relação ao sistema solar
      - em relação à ultima mudança de direção
      - em relação ao centro da galáxia
  - comunicação
    - interna (entre tripulantes)
    - externa (outras naves e federação)
  - sensores
    - internos
      - cameras
      - temperatura
      - qualidade do ar
      - riscos biológicos
    - externos
      - colisão
      - proximidade
      - cameras/telescopios

- tudo é enviado via json/yml
- os payloads precisam ter tipos definidos e exportados.
- os jogadores podem criar clientes texto ou interfaces gráficas para interagir.
- os jogadores terão perfis de acesso de acordo com rank:
  - capitão
  - oficial de segurança
  - oficial de ciência
  - oficial de saúde e bem estar
- deve haver um gerador aleatório de eventos

  - aliens
    - hostis
    - aliados
    - neutros
  - processos cósmicos
    - novas
    - chuvas de meteoro
    - nebulosas
  - internos
    - ?

- logs oficiais e publicos (nunca são deletados ou alterados. Apenas acrescentados)

- um jogador deve agir como host do servidor/ representante do 'big computer'
- um sistema de ajuda
  - estágio 1: man pages
  - estagio 2: chatbot com listagem fixa
  - estagio 3: chatbot com interpretação de linguagem natural

#

# testes

- GET portal (exibe resumo geral de tudo (ONs/OFFs, GREEN/YELLOW/RED status))
- GET dados navegação
- POST nova destinação
- POST "Engage"
- GET sensores internos
- POST nova temperatura/humidade
- GET logs
- POST new log
