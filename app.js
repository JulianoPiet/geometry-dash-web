
const canvas = document.querySelector("#gameCanvas");
const button = document.querySelector("#prepareButton");

const statusText = document.querySelector("#status");
const percentText = document.querySelector("#percent");
const fill = document.querySelector("#progressFill");
const detail = document.querySelector("#detail");

const gameTitle = document.querySelector("#gameTitle");
const gameMessage = document.querySelector("#gameMessage");

if (!canvas) {
  throw new Error("Canvas não encontrado no HTML.");
}

const gl = canvas.getContext("webgl", {
  alpha: false,
  antialias: true
});

let animationStarted = false;

function setStatus(message, percent, description) {
  statusText.textContent = message;
  percentText.textContent = percent + "%";
  fill.style.width = percent + "%";
  detail.textContent = description;
}

if (!gl) {
  setStatus(
    "WebGL indisponível",
    0,
    "Seu navegador não conseguiu iniciar a renderização WebGL."
  );

  gameTitle.textContent = "WebGL não disponível";
  gameMessage.textContent = "Experimente outro navegador compatível.";

  button.disabled = true;
} else {
  const vertexSource = `
    attribute vec2 position;
    uniform float angle;

    void main() {
      float c = cos(angle);
      float s = sin(angle);

      vec2 rotated = vec2(
        position.x * c - position.y * s,
        position.x * s + position.y * c
      );

      gl_Position = vec4(rotated, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision mediump float;
    uniform float time;

    void main() {
      float pulse = 0.5 + 0.5 * sin(time * 2.0);

      gl_FragColor = vec4(
        0.05,
        0.55 + pulse * 0.35,
        1.0,
        1.0
      );
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(error);
    }

    return shader;
  }

  try {
    const vertexShader = createShader(
      gl.VERTEX_SHADER,
      vertexSource
    );

    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentSource
    );

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);

    const vertices = new Float32Array([
      -0.4, -0.4,
       0.4, -0.4,
       0.4,  0.4,
      -0.4, -0.4,
       0.4,  0.4,
      -0.4,  0.4
    ]);

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      vertices,
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(
      program,
      "position"
    );

    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(
      position,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    const angleLocation = gl.getUniformLocation(
      program,
      "angle"
    );

    const timeLocation = gl.getUniformLocation(
      program,
      "time"
    );

    function resize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));

      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener("resize", resize);
    resize();

    function render(time) {
      if (!document.hidden) {
        gl.clearColor(0.035, 0.055, 0.12, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(angleLocation, time * 0.001);
        gl.uniform1f(timeLocation, time * 0.001);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      requestAnimationFrame(render);
    }

    function startRender() {
      if (animationStarted) return;

      animationStarted = true;
      requestAnimationFrame(render);
    }

    button.addEventListener("click", async () => {
      button.disabled = true;
      button.textContent = "WEBGL ATIVO";

      const stages = [
        ["Verificando WebGL", 25],
        ["Preparando renderização", 55],
        ["Inicializando GPU", 80],
        ["Teste gráfico concluído", 100]
      ];

      for (const [label, value] of stages) {
        setStatus(label, value, "Preparando o motor gráfico experimental...");

        await new Promise(resolve => setTimeout(resolve, 350));
      }

      startRender();

      gameTitle.textContent = "WebGL funcionando!";
      gameMessage.textContent =
        "Quadrado animado renderizado pela GPU do navegador.";

      detail.textContent =
        "Teste gráfico concluído. Ainda não é o Geometry Dash original.";
    });

    gameTitle.textContent = "Motor gráfico preparado";
    gameMessage.textContent =
      "Clique em iniciar preparação para testar o WebGL.";

    setStatus(
      "WebGL disponível",
      0,
      "O navegador conseguiu criar um contexto gráfico."
    );

  } catch (error) {
    console.error(error);

    setStatus("Erro gráfico", 0, error.message);

    gameTitle.textContent = "Falha na inicialização";
    gameMessage.textContent = "Confira o console do navegador.";

    button.disabled = true;
  }
  }
        
