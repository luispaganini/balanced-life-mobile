# Projeto React Native com Expo

Este projeto é uma aplicação mobile desenvolvida com React Native e Expo, oferecendo um ambiente simplificado para desenvolvimento e teste de aplicações nativas.

## Requisitos

Antes de começar, certifique-se de ter o seguinte instalado em seu sistema:

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalada globalmente:
  
  ```bash
  npm install -g expo-cli
  ```

- Aplicativo Expo Go instalado no seu dispositivo móvel (disponível na [App Store](https://apps.apple.com/app/apple-store/id982107779) ou [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)).

## Instalação

1. Clone este repositório para sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd seu-projeto
   ```

3. Instale as dependências do projeto:

   Usando `npm`:

   ```bash
   npm install
   ```

   Ou usando `yarn`:

   ```bash
   yarn install
   ```

## Configuração do endpoint API

Vá até o arquivo app.json e insira o endpoint da API no seguinte campo:
   ```bash
   "application": {
      "uris": {
         "api": "https://sua-api.com"
      }
   }
  ```


## Executar a Aplicação

1. Para rodar o projeto em modo de desenvolvimento, utilize o seguinte comando:

   Usando `npx`:

   ```bash
   npx expo start
   ```

2. Após executar o comando acima, o Expo CLI abrirá uma interface no navegador com um QR code. Escaneie o QR code usando o aplicativo **Expo Go** no seu dispositivo móvel.

3. A aplicação será carregada no seu dispositivo, e todas as alterações feitas no código serão refletidas instantaneamente.

## Build para Produção

1. Para gerar uma build nativa do aplicativo, você pode utilizar os serviços da Expo para construir um APK ou IPA:

   ```bash
   expo build:android
   ```

   ou

   ```bash
   expo build:ios
   ```

   Isso gerará a build que pode ser instalada diretamente nos dispositivos ou submetida às lojas de aplicativos.


## Scripts Disponíveis

- `start`: Inicia o projeto em modo de desenvolvimento.
- `android`: Executa o projeto em um emulador Android ou dispositivo físico.
- `ios`: Executa o projeto em um emulador iOS ou dispositivo físico.
- `build:android`: Gera o APK para Android.
- `build:ios`: Gera o IPA para iOS.

