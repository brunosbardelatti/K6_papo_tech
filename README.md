
# PoC de Testes de Performance com k6 e Docker Compose

Este projeto é uma prova de conceito (PoC) para realizar testes de performance utilizando o k6, distribuído em múltiplos containers Docker, gerenciados pelo Docker Compose. O objetivo é simular diferentes cenários de carga, stress e performance, utilizando scripts customizados para cada caso e gerar relatórios detalhados em formato JSON.

## Estrutura do Projeto

```plaintext
/K6
│
├── docker-compose.yml
├── test
│   ├── carga.js
│   ├── performance.js
│   └── stress.js
├── reports
│   └── (relatórios JSON gerados durante os testes)
└── README.md
```

- **`docker-compose.yml`**: Arquivo de configuração do Docker Compose que define os serviços do k6 distribuídos e especifica a geração de relatórios em JSON.
- **`test/`**: Diretório que contém os scripts de teste k6:
  - **`carga.js`**: Teste de carga constante.
  - **`performance.js`**: Teste de performance com aumento e diminuição de usuários.
  - **`stress.js`**: Teste de stress com grande variação no número de usuários.
- **`reports/`**: Diretório onde os relatórios JSON de cada execução de teste são salvos.
- **`README.md`**: Este arquivo de documentação.

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Como Usar

### 1. Selecionando o Script de Teste

Para executar o teste, você pode escolher qual dos três scripts deseja rodar, definindo a variável de ambiente `SCRIPT` ao rodar o `docker-compose up`. Cada script tem um propósito específico:

- **`carga.js`**: Simula uma carga constante de requisições.
- **`performance.js`**: Simula um aumento gradual e depois uma diminuição de usuários.
- **`stress.js`**: Simula um cenário de stress, com aumento significativo do número de usuários.

### 2. Executando os Testes

Use os seguintes comandos para executar o teste desejado e gerar relatórios em JSON:

- **Teste de Carga:**
  ```bash
  SCRIPT=carga.js docker-compose up
  ```

- **Teste de Performance:**
  ```bash
  SCRIPT=performance.js docker-compose up
  ```

- **Teste de Stress:**
  ```bash
  SCRIPT=stress.js docker-compose up
  ```

Os containers irão iniciar e executar o script correspondente. Cada container salvará seu relatório JSON na pasta `reports`. Para parar os containers, use `Ctrl+C` se estiver rodando no modo foreground ou `docker-compose down` se estiver no modo detached.

### 3. Executando no Modo Detached

Se preferir rodar os testes em segundo plano:

```bash
SCRIPT=performance.js docker-compose up -d
```

Os relatórios em JSON ainda serão salvos na pasta `reports` mesmo no modo detached.

### 4. Monitorando e Parando os Containers

- **Para ver os logs dos containers:**
  ```bash
  docker-compose logs -f
  ```

- **Para parar e remover os containers:**
  ```bash
  docker-compose down
  ```

### 5. Acessando os Relatórios

Os relatórios JSON gerados pelos testes estarão disponíveis na pasta `reports`, com um arquivo separado para cada nó do k6, nomeado conforme o nó que executou o teste (por exemplo, `report-node-1.json`).

## Notas

- Certifique-se de que os arquivos de teste estão corretamente configurados e que os endpoints de teste são acessíveis.
- Os resultados dos testes podem ser visualizados em tempo real nos logs ou acessados posteriormente nos arquivos JSON gerados.

## Contribuições

Este projeto é uma PoC básica e pode ser expandido com:
- Integração com InfluxDB e Grafana para monitoramento e visualização de métricas.
- Adição de novos scripts de teste para cobrir outros cenários.
- Otimizações na configuração do Docker Compose para cenários de teste específicos.

## Licença

Este projeto é de uso livre para fins educacionais e experimentais.
