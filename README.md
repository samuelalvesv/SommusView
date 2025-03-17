# SommusView - Sistema de Visualização de Monitoramento de Dengue

## Descrição

Interface web desenvolvida como parte do projeto Sommus, fornecendo visualização interativa para dados de monitoramento de dengue em Belo Horizonte - MG. Este frontend consome a API RESTful do projeto SommusProject backend e apresenta os dados das últimas 3 semanas epidemiológicas em diferentes formatos.

## Tecnologias Utilizadas

- **Framework**: Angular 19+ (Standalone Components)
- **Linguagem**: TypeScript
- **Gerenciador de Pacotes**: npm
- **UI/UX**: Angular Material
- **Gráficos**: Chart.js
- **Gerenciamento de Estado**: RxJS
- **Manipulação de Datas**: date-fns
- **Estilização**: CSS

## Requisitos de Sistema

- Node.js 16.x ou superior
- npm 8.x ou superior
- Conexão com internet (para comunicação com a API backend)
- Navegador moderno (Chrome, Firefox, Edge, Safari)

## Estrutura do Projeto

O projeto segue a arquitetura de componentes standalone do Angular:

### Componentes

- **home**: Página inicial com opções de visualização
- **tabela**: Exibição dos dados em formato tabular com paginação e ordenação
- **grafico**: Visualização gráfica comparativa usando Chart.js
- **cards**: Exibição em formato de cards individuais

### Serviços

- **dengue-data.service.ts**: Comunicação com a API backend
- **dengue-data-state.service.ts**: Gerenciamento do estado da aplicação usando BehaviorSubject

### Modelos

- **DengueData**: Interface que representa os dados de alerta de dengue
  - semanaEpidemiologica: string
  - casosEstimados: number
  - casosNotificados: number
  - nivelRisco: number

## Principais Funcionalidades

### Página Inicial

- Apresentação do sistema e sua finalidade
- Informações sobre a fonte dos dados (InfoDengue)
- Seleção da forma de visualização (tabela, gráfico ou cards)

### Tabela

- Exibição tabular com recursos avançados:
  - Ordenação por qualquer coluna
  - Paginação automática
  - Filtragem de dados

### Gráfico

- Visualização em gráfico de barras comparativo:
  - Casos estimados vs. casos notificados
  - Organização por semana epidemiológica
  - Gráficos responsivos e interativos

### Cards

- Visualização em formato de cards individuais por semana epidemiológica

## Integração com Backend

O frontend se conecta ao backend SommusProject através do endpoint:

- `GET /AlertDengue/GetByWeek?ew={semana}&ey={ano}`: Consulta dados por semana epidemiológica

O sistema automaticamente busca os dados das últimas 3 semanas epidemiológicas no momento do carregamento.

## Configuração e Instalação

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/SommusView.git
```

2. Navegue até a pasta do projeto:
```
cd SommusView
```

3. Instale as dependências:
```
npm install
```

4. Configure a URL da API no arquivo de ambiente apropriado.

## Executando o Projeto

1. Para desenvolvimento local:
```
ng serve --port 4200
```

2. Acesse a aplicação em:
```
http://localhost:4200
```

## Fluxo de Dados

1. O serviço `DengueDataStateService` calcula as últimas 3 semanas epidemiológicas
2. Para cada semana, uma requisição é feita ao backend através de `DengueDataService`
3. Os dados recebidos são processados e transformados para o formato adequado
4. Os dados são armazenados em um `BehaviorSubject` para disponibilidade em toda aplicação
5. Os componentes de visualização inscrevem-se no Observable e exibem os dados

## Considerações Finais

O SommusView complementa o projeto backend SommusProject, fornecendo uma interface intuitiva para visualização dos dados de monitoramento de dengue. A aplicação oferece múltiplas formas de visualização, permitindo análises mais eficientes da situação epidemiológica em Belo Horizonte.

Este projeto segue boas práticas de desenvolvimento Angular, como componentização, gerenciamento de estado centralizado e desacoplamento entre camadas.
