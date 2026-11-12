
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const cubo = new Image();
cubo.src = "assets/cubo.png";

function desenhar() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  ctx.fillStyle = "#10152b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chão
  ctx.fillStyle = "#00eaff";
  ctx.fillRect(0, canvas.height - 45, canvas.width, 4);

  // Cubo
  if (cubo.complete && cubo.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      cubo,
      60,
      canvas.height - 105,
      60,
      60
    );
  }

  requestAnimationFrame(desenhar);
}

cubo.onload = desenhar;
cubo.onerror = () => {
  console.error("Não foi possível carregar assets/cubo.png");
};
