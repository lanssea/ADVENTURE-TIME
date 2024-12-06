function Sprite(img, cnv) {
    // Atributos
    this.mvLeft = this.mvUp = this.mvRight = this.mvDown = false;
    this.srcX = this.srcY = 0;
    this.posX = this.posY = 0;
    this.width = 42.85;
    this.height = 46.25;
    this.speed = 1.5;
    this.img = img;
    this.countAnim = 0;
    this.cnv = cnv;
    this.totalFrames = 7;
    this.paddingTop = 125; // Distância do topo
    this.paddingBottom = 10; // Distância do rodapé

    // Desenha o personagem
    this.draw = function(ctx) {
        ctx.drawImage(this.img, this.srcX, this.srcY, this.width, this.height,
                      this.posX, this.posY, this.width, this.height);
        this.animation();
    };

    // Move o personagem dentro dos limites do canvas com padding
    this.move = function() {
        if (this.mvRight) {
            this.posX = Math.min(this.posX + this.speed, this.cnv.width - this.width); // Limite à direita
            this.srcY = this.height * 3; // Direção para a direita
        } 
        else if (this.mvLeft) {
            this.posX = Math.max(this.posX - this.speed, 0); // Limite à esquerda
            this.srcY = this.height * 2; // Direção para a esquerda
        } 
        else if (this.mvUp) {
            this.posY = Math.max(this.posY - this.speed, this.paddingTop); // Limite ao topo com padding superior
            this.srcY = this.height * 1; // Direção para cima
        } 
        else if (this.mvDown) {
            this.posY = Math.min(this.posY + this.speed, this.cnv.height - this.height - this.paddingBottom); // Limite ao rodapé com padding inferior
            this.srcY = this.height * 0; // Direção para baixo
        }
    };

    // Animação do personagem
    this.animation = function() {
        if (this.mvLeft || this.mvUp || this.mvRight || this.mvDown) {
            this.countAnim++;
            if (this.countAnim >= 70) {
                this.countAnim = 0;
            }
            this.srcX = Math.floor(this.countAnim / 10) * this.width;
            if (this.srcX >= this.width * this.totalFrames) {
                this.srcX = 0;
            }
        } else {
            this.srcX = 0;
            this.countAnim = 0;
        }
    };
}
