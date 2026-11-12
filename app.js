const button = document.querySelector("#prepareButton");
const statusText = document.querySelector("#status");
const percentText = document.querySelector("#percent");
const fill = document.querySelector("#progressFill");
const detail = document.querySelector("#detail");

button.addEventListener("click", async () => {
  button.disabled = true;
  statusText.textContent = "Verificando estrutura do projeto";
  detail.textContent = "Esta demonstração prepara apenas a interface. Ainda não baixa nem executa arquivos do Geometry Dash.";
  fill.style.width = "0%";
  percentText.textContent = "0%";

  // Progresso demonstrativo, não representa download real.
  const stages = [
    ["Preparando interface", 25],
    ["Verificando suporte do navegador", 55],
    ["Aguardando engine WebAssembly", 80],
    ["Estrutura inicial pronta", 100]
  ];

  for (const [label, value] of stages) {
    await new Promise(resolve => setTimeout(resolve, 450));
    statusText.textContent = label;
    percentText.textContent = `${value}%`;
    fill.style.width = `${value}%`;
  }

  detail.textContent = "Primeira etapa concluída. Próximo trabalho: identificar uma engine/licença compatível e portar os sistemas necessários.";
  document.querySelector("#gameTitle").textContent = "Interface inicial pronta!";
  document.querySelector("#gameMessage").textContent = "O jogo original ainda não está rodando nesta página.";
  button.disabled = false;
  button.textContent = "PREPARAR NOVAMENTE";
});
