# Geometry Dash Web

Protótipo inicial de interface para investigar uma versão de navegador.

## Estado atual

- Interface responsiva para celular e desktop.
- Barra de progresso demonstrativa (não é download real).
- Área reservada para a engine do jogo.

## Importante

Este repositório não contém o executável, DLLs, músicas ou recursos proprietários do Geometry Dash. O `GeometryDash.exe` de Windows não roda diretamente no navegador. Para chegar a uma versão jogável será necessário portar/adaptar uma engine e suas dependências para WebAssembly/WebGL, respeitando os direitos do jogo.

## Publicar no GitHub Pages

1. Envie `index.html`, `style.css` e `app.js` para a raiz do repositório.
2. Abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione `main` e `/ (root)` e salve.
