# 📱 Scanner de Código de Barras

Este é um aplicativo React Native que permite escanear códigos de barras e verificar se o produto correspondente está cadastrado. Caso o código não esteja registrado, o usuário será notificado.

## 🚀 Funcionalidades

- Escaneamento de códigos de barras
- Exibição de detalhes dos produtos cadastrados
- Notificação caso o produto não esteja registrado

---

## 📥 Instalação

### Pré-requisitos

Certifique-se de ter instalado:

- Node.js (v16+)

- React Native CLI

- Expo



### Passos para instalar o projeto

1. Clone este repositório:
   ```sh
   git clone https://github.com/William-Koerich/Solve-Test.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd Solve-Test
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
   ou
   ```sh
   yarn install
   ```

---

## ▶️ Como rodar o projeto

### Para dispositivos físicos (Android e iOS)

```sh
npx react-native run-android  # Para Android
npx react-native run-ios  # Para iOS
```

### Para rodar no Expo

Se estiver utilizando Expo, execute:

```sh
npx expo start
```

E escaneie o QR Code com o app Expo Go.

---

## 🔑 Informações de Login

Para testar o app, utilize as seguintes credenciais:

- **E-mail:** `teste@email.com`
- **Senha:** `123456`

---

## 📂 Produtos Cadastrados

Os códigos de barras disponíveis já cadastrados estão dentro da pasta:

```
assets/images/barcode
```

Caso o código escaneado não esteja cadastrado, será exibida uma mensagem informando o código do produto não encontrado.

---

## 📸 Capturas de Tela

📷 *Adicione aqui imagens do seu aplicativo para mostrar a interface*

---

## 🛠 Tecnologias Utilizadas

- React Native
- TypeScript
- React Navigation
- Expo

---
