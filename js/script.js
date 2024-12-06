

window.onload = function () {
 
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var Finn = new Image();
    var Jake = new Image();
    Finn.src = "img/img.png";
    Jake.src = "img/jake.png";
    var finn = new Sprite(Finn, cnv);
    var jake = new Sprite(Jake, cnv);
    var Personagem = finn;
    finn.posX = 700;
    finn.posY = 130;

    var ninfaDiv = document.querySelector('.ninfa');
	var bmoDiv = document.querySelector('.bmo');
    var ninfa2Div = document.querySelector('.ninfa2');
	var fonteDiv = document.querySelector('.fonte');

    // Imagens dos cenários
    var scene1 = new Image();
    var scene2 = new Image();
    scene2.src = "img/CasaDentro.png";
    scene1.src = "img/cenarios/CasaNaArvore.png";

    var currentScene = scene1;  // Cenário inicial

	var bauFechado = new Image();
    var bauAberto = new Image();
    bauFechado.src = "img/bau.png";
    bauAberto.src = "img/bauAberto.png";
    var bau = bauFechado; 
    var bauAbertoUmaVez = false; 

    var bauCenario2Fechado = new Image();
    var bauCenario2Aberto = new Image();
    bauCenario2Fechado.src = "img/bau.png";
    bauCenario2Aberto.src = "img/bauAberto.png";

    var bauCenario2 = bauCenario2Fechado;  
    var bauCenario2AbertoUmaVez = false;  
    var janelaAberta = false;
	var mapa = document.querySelector('.mapa');
    var janela = document.querySelector('.janela');
    janela.style.display = 'none';

	const bauDiv = document.querySelector('.bau'); 

	

	
	            function keydownHandler(e) {
			    switch (e.keyCode) {
				case UP:
					Personagem.mvUp = true;
					break;
				case DOWN:
					Personagem.mvDown = true;
					break;
				case LEFT:
					Personagem.mvLeft = true;
					break;
				case RIGHT:
					Personagem.mvRight = true;
					break;
			          }

                  // Se a tecla Z for pressionada no Cenario 2, abre o baú2
                

                if (e.keyCode === 90 && !bauCenario2AbertoUmaVez) {
                bauCenario2 = bauCenario2Aberto;  
                bauCenario2AbertoUmaVez = true;  

	            const inventario = document.querySelector('.inventario');
	            const inquiridium = document.querySelector('.inquiridium'); 
		 
			    if (inventario.style.display === "none" || !inventario.style.display) {
				inventario.style.display = "block";  
				inquiridium.style.display = "block";  
			    } else {
				inventario.style.display = "none";  
				inquiridium.style.display = "none";  
			    }}

			      // Se a tecla X for pressionada no Cenario 1, abre o baú1
 
		        if (e.keyCode === 88 && !bauAbertoUmaVez) {  
			    bau = bauAberto;
			    bauAbertoUmaVez = true;
	 
			    const inventario = document.querySelector('.inventario');
			    const espada = document.querySelector('.espada');
	 
			    if (inventario.style.display === "none" || !inventario.style.display) {
				inventario.style.display = "block"; 
				espada.style.display = "block";  
			    } else {
				inventario.style.display = "none";  
				espada.style.display = "none";  
			    }}}
	
                function keyupHandler(e) {
                switch (e.keyCode) {
                case UP:
                    Personagem.mvUp = false;
                    break;
                case DOWN:
                    Personagem.mvDown = false;
                    break;
                case LEFT:
                    Personagem.mvLeft = false;
                    break;
                case RIGHT:
                    Personagem.mvRight = false;
                    break;
			 }}

         Finn.onload = function () {
         init();
         };

        function init() {
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);
        loop();  }

        function update() {
		Personagem.move();
		Personagem.animation();
		verificarProximidade();
		verificarProximidadebmo();
		verificarProximidadeNinfas();
 
		if (currentScene === scene2) {
			const scale = 0.65;
			const scaledWidth = scene2.width * scale;
			const scaledHeight = scene2.height * scale;
			const centerX = (cnv.width - scaledWidth) / 2;
			const centerY = (cnv.height - scaledHeight) / 2;
			const quadradoX = centerX + 10;
			const quadradoY = centerY + scaledHeight - 60;
			const quadradoLado = 50;
			const distanciaX = Math.abs(Personagem.posX - quadradoX);
			const distanciaY = Math.abs(Personagem.posY - quadradoY);
	
			if (distanciaX < quadradoLado && distanciaY < quadradoLado && !janelaAberta) {
				mostrarJanelaSair();
			} else if (distanciaX >= quadradoLado || distanciaY >= quadradoLado) {
				fecharJanelaSair();
			}
			if (Personagem.posX < centerX) {
				Personagem.posX = centerX;
			}
			if (Personagem.posX + Personagem.width > centerX + scaledWidth) {
				Personagem.posX = centerX + scaledWidth - Personagem.width;
			}
			if (Personagem.posY < centerY) {
				Personagem.posY = centerY;
			}
			if (Personagem.posY + Personagem.height > centerY + scaledHeight) {
				Personagem.posY = centerY + scaledHeight - Personagem.height;
			}}}

           function mostrarJanelaSair() {
			const janelaSair = document.querySelector('.janela-sair');
            const botaoNaoSair = document.querySelector('.nao-sair');
            if (janelaSair) {
            janelaSair.style.display = 'block';
            janelaAberta = true;      
            if (botaoNaoSair) {
            botaoNaoSair.addEventListener('click', fecharJanelaSair);
            }}}
    
                               function fecharJanelaSair() {
                               const janelaSair = document.querySelector('.janela-sair');
                               if (janelaSair) {
                               janelaSair.style.display = 'none';
                               janelaAberta = false; }}
		 
	
	                           function sair() {
                               console.log("Finn voltou para o cenário 1!");
                               fecharJanelaSair();
                               currentScene = scene1;
                               Personagem.posX = 880; 
		                       Personagem.posY = 350; }



                        function draw() {
		                ctx.clearRect(0, 0, cnv.width, cnv.height);	
	                  	const scale = 0.65; 
		                if (currentScene === scene2) {
			            const scaledWidth = scene2.width * scale;
			            const scaledHeight = scene2.height * scale;
			            const centerX = (cnv.width - scaledWidth) / 2;
			            const centerY = (cnv.height - scaledHeight) / 2;
			            ctx.drawImage(scene2, 0, 0, scene2.width, scene2.height, centerX, centerY, scaledWidth, scaledHeight);
                                            // paredes do cenario 2 
                        const portas = [
                        { x: centerX + 0, y: centerY + 320, width: 395, height: 110 },  
                        { x: centerX + 50, y: centerY + 170, width: 397, height: 100 }   ];
		                verificarColisaoComPortas(Personagem, portas);
                        for (const porta of portas) {
                        ctx.fillStyle = "rgba(0, 0, 0, 0)";  
                        ctx.fillRect(porta.x, porta.y, porta.width, porta.height);}
        	            // porta responsavel por sair do cenario 2 
			            const quadradoX = centerX + 20;
			            const quadradoY = centerY + scaledHeight - 80;  
			            const quadradoLargura = 40;
			            const quadradoAltura = 70;  
			            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
						
			            ctx.fillRect(quadradoX, quadradoY, quadradoLargura, quadradoAltura);
		                } else {
			            ctx.drawImage(currentScene, 0, 0, currentScene.width, currentScene.height, 0, 0, cnv.width, cnv.height);}
		                if (currentScene === scene1) {
			            ctx.drawImage(currentScene, 0, 0, cnv.width, cnv.height);
			            // Desenhar o  "entrar" (casa na árvore)
			            ctx.fillStyle = "rgba(0, 0 ,0 ,0)";  
			            ctx.fillRect(700, 30, 400, 400);
			            }

						
		                       // Exibe BMO cenário 4
		                const bmoDiv = document.querySelector('.BMO');
		                if (currentScene === scene2) {
			            bmoDiv.style.display = 'block'; 
			            bmoDiv.style.top = "285px";
			            bmoDiv.style.left = "480px";
		            	ctx.drawImage(bauCenario2, 500, 140);
		
	                	} else {
		            	bmoDiv.style.display = 'none'; 
			
		                }if (currentScene === scene1) { 

			            fonteDiv.style.display = "block";
			            fonteDiv.style.left = "200px";
			            fonteDiv.style.top = "350px";

			            ninfaDiv.style.display = "block";
			            ninfaDiv.style.left = "250px";
			            ninfaDiv.style.top = "379px";

			            ninfa2Div.style.display = "block";
			            ninfa2Div.style.left = "338px";
			            ninfa2Div.style.top = "377px";

		
		                } else {
			            fonteDiv.style.display = "none";
			            ninfaDiv.style.display = "none";
			            ninfa2Div.style.display = "none";
			
			
		                }if (currentScene === scene1) {
			            var houseImage = new Image();
			            houseImage.src = "img/casa-na-arvore.png";
			            ctx.drawImage(houseImage, 700, 30, 400, 400);

						
					
					}
		
		                Personagem.draw(ctx);

	                	if (currentScene === scene1) {
			            ctx.drawImage(bau, 320, 405);}}
	
                        function loop() {
                        window.requestAnimationFrame(loop);
                        update();
                        draw();}

	                    function verificarColisaoComPortas(personagem, portas) {
		                for (const porta of portas) {
			            if (
			         	personagem.posX + personagem.width > porta.x &&  
				        personagem.posX < porta.x + porta.width &&     
				        personagem.posY + personagem.height > porta.y &&  
				        personagem.posY < porta.y + porta.height      
			            ) {
				        if (personagem.mvRight) personagem.posX = porta.x - personagem.width;  
				        if (personagem.mvLeft) personagem.posX = porta.x + porta.width;        
				        if (personagem.mvDown) personagem.posY = porta.y - personagem.height;  
				        if (personagem.mvUp) personagem.posY = porta.y + porta.height;        
			            }}}
	
						function verificarProximidade() {
							if (currentScene === scene1) {  
								// Define as dimensões e posição do sensor (quadrado)
								const sensor = { 
									x: 850, // Ajuste conforme necessário (posição horizontal)
									y: 270, // Ajuste conforme necessário (posição vertical)
									width: 100,  // Largura do quadrado
									height: 100  // Altura do quadrado
								}; 
						
								// Verifica se o Personagem está colidindo com o sensor
								if (
									Personagem.posX + Personagem.width > sensor.x &&  
									Personagem.posX < sensor.x + sensor.width &&      
									Personagem.posY + Personagem.height > sensor.y &&  
									Personagem.posY < sensor.y + sensor.height   
								) {
									if (!janelaAberta) {
										mostrarJanelaEntrar();
									}
								} else {
									fecharJanelaEntrar();
									janelaAberta = false;
								}
							}
						
						document.querySelector('.sim').addEventListener('click', entrar);
						document.querySelector('.nao').addEventListener('click', naoEntrar);
						
						function mostrarJanelaEntrar() {
						if (!janelaAberta) {
						document.querySelector('.janela-entrar').style.display = 'block';
						}
						}
						
						function fecharJanelaEntrar() {
						document.querySelector('.janela-entrar').style.display = 'none';
						}
						
						function entrar() {
						fecharJanelaEntrar();
						janelaAberta = true; 
						currentScene = scene2;
						
						const scale = 0.65; 
						const scaledWidth = scene2.width * scale;
						const scaledHeight = scene2.height * scale;
						const centerX = (cnv.width - scaledWidth) / 2;
						const centerY = (cnv.height - scaledHeight) / 2;
						
						Personagem.posX = centerX + (scaledWidth / 2) - (Personagem.width / 2); 
						Personagem.posY = centerY + scaledHeight - Personagem.height; 
						Personagem.resetAnimation();
						}
						
						function naoEntrar() {
						fecharJanelaEntrar();
						janelaAberta = false; 
						}
												
  
                        document.querySelector('.sim-sair').addEventListener('click', sair);
	                    document.getElementById('scene1').addEventListener('click', function () {currentScene = scene1;});
	                 

 	                    document.querySelector('.FinnJake').addEventListener('click', function () {
		                if (Personagem === finn) {
			            Personagem = jake;
			            Personagem.posX = finn.posX;
			            Personagem.posY = finn.posY;
		                } else {
			            Personagem = finn;
			            Personagem.posX = jake.posX;
			            Personagem.posY = jake.posY;
	                   	}
		                Personagem.resetAnimation();
	                    });
	
                        mapa.addEventListener('click', function (event) {
                        event.stopPropagation();

                        if (janela.style.display === 'none') {
                        janela.style.display = 'block';
                        } else {
                        janela.style.display = 'none';
                        }});

    
		                document.addEventListener('click', function (event) {
                        if (!janela.contains(event.target) && !mapa.contains(event.target)) {
                        janela.style.display = 'none';
                         }});
						 
			            document.querySelector(".mochila").addEventListener("click", function () {
				        const inventario = document.querySelector(".inventario");
			     	    if (inventario.style.display === "none" || !inventario.style.display) {
				     	inventario.style.display = "block"; 
			    	    } else {
					    inventario.style.display = "none"; 
				        }})}
						
				

				        function verificarProximidadeNinfas() {
					    if (currentScene === scene1) {  
						const ninfa1 = { x: 250, y: 350, width: 50, height: 50 };
						const ninfa2 = { x: 350, y: 350, width: 50, height: 50 };
						const distanciaNinfa1X = Math.abs(Personagem.posX - ninfa1.x);
						const distanciaNinfa1Y = Math.abs(Personagem.posY - ninfa1.y);
						const distanciaNinfa2X = Math.abs(Personagem.posX - ninfa2.x);
						const distanciaNinfa2Y = Math.abs(Personagem.posY - ninfa2.y);        
						const proximidade = 100;
						if (distanciaNinfa1X < proximidade && distanciaNinfa1Y < proximidade && !janelaAberta) {
						mostrarCaixa2();
						}
						else if (distanciaNinfa2X < proximidade && distanciaNinfa2Y < proximidade && !janelaAberta) {
						mostrarCaixa2();}
						else {
						fecharCaixa2();}}}
						function mostrarCaixa2() {
						const caixa2Div = document.querySelector('.caixa2');
						if (caixa2Div) { caixa2Div.style.display = 'block';janelaAberta = true; }}
					    function fecharCaixa2() {
						const caixa2Div = document.querySelector('.caixa2');
						if (caixa2Div) {
						caixa2Div.style.display = 'none';
						janelaAberta = false;  
						}}

						function mostrarAnimacao() {
						const espadaDiv = document.querySelector('.espada2');
						espadaDiv.style.display = 'block';
						setTimeout(() => {
						espadaDiv.style.display = 'none';
						}, 3000);
						}
						  
						document.querySelector('.espada').addEventListener('click', function(event) {
						event.stopPropagation(); 
						mostrarAnimacao();
						});
						  
						document.addEventListener('click', function() {
						const espadaDiv = document.querySelector('.espada2');
						espadaDiv.style.display = 'none';
						});
						  

						  function mostrarAnimacao2() {
							const livroDiv = document.querySelector('.livro');
							livroDiv.style.display = 'block';
							
							setTimeout(() => {
							  livroDiv.style.display = 'none';
							}, 3000);
						  }
						  
						  document.querySelector('.inquiridium').addEventListener('click', function(event) {
							event.stopPropagation(); 
							mostrarAnimacao2();
						  });
						  
						  document.addEventListener('click', function() {
							const livroDiv = document.querySelector('.livro');
							livroDiv.style.display = 'none'; 
						  });

						  function verificarProximidadebmo() {
						if (currentScene === scene2) {  
						const bmoDiv = { x: 480, y: 285, width: 50, height: 50 };  
								
						const distanciaBmoX = Math.abs(Personagem.posX - bmoDiv.x);
						const distanciaBmoY = Math.abs(Personagem.posY - bmoDiv.y);
								
						const proximidade = 100;
						if (distanciaBmoX < proximidade && distanciaBmoY < proximidade && !janelaAberta) {
						mostrarCaixa();
						} else {
						fecharCaixa();
						}}}
						
						function mostrarCaixa() {
						const caixaDiv = document.querySelector('.caixa'); 
						if (caixaDiv) { 
						caixaDiv.style.display = 'block'; 
						janelaAberta = true; 
						}}
						
						function fecharCaixa() {
						const caixaDiv = document.querySelector('.caixa'); 
						if (caixaDiv) {
						caixaDiv.style.display = 'none'; 
						janelaAberta = false;  }}				  
									
						};
