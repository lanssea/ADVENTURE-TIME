document.addEventListener("DOMContentLoaded", () => {
    const inicio = document.getElementById("inicio");
    const startButton = document.getElementById("startButton");
    const loading = document.getElementById("loading");
    const gameCanvas = document.getElementById("gameCanvas");
  
    startButton.addEventListener("click", () => {
      // Mostra o texto de carregando
      startButton.style.display = "none"; // Esconde o botão
      loading.style.display = "block";
  
      // Simula um tempo de carregamento
      setTimeout(() => {
        // Esconde a tela de início e mostra o canvas
        inicio.style.display = "none";
        gameCanvas.style.display = "block";
  
        // Inicia o jogo
        startGame();
      }, 3000); // Tempo de carregamento simulado (3 segundos)
    });
  });
  
  function startGame() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
  
    // Exemplo simples de loop do jogo
    let x = 50;
    let y = 50;
    const size = 20;
  
    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "blue";
      ctx.fillRect(x, y, size, size);
  
      x += 1; // Exemplo de movimento
      if (x > canvas.width) x = 0;
  
      requestAnimationFrame(gameLoop);
    }
  
    gameLoop(); // Inicia o loop
  }
  