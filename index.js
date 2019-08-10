var canvas, ctx, ALTURA, LARGURA, event,

fundo = {
    y: 0,
    altura: 630,
    cor: "#3b5998",
    y1: 575,
    alt: 60,
    color: "#8b9dc3",

    desenha: function() {
        ctx.fillStyle = this.cor
        ctx.fillRect(0, this.y, LARGURA, this.altura);

        ctx.fillStyle = this.color
        ctx.fillRect(0, this.y1, LARGURA, this.alt);
    }
},
bloco = {
    //yourImg: document.getElementById('personagem'),
    x: 50,
    y: 580,
    //    yourImg.style.height = '100px';
    //    yourImg.style.width = '200px';
    largura: 50,
    altura: 50,
    cor: "red",
    velocidade: 50,

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    },

    atualizaLado: function(lado) {
        if(lado == 1 )
            this.x += this.velocidade;
        else 
            this.x -= this.velocidade;
        if(this.x < 0)
            this.x = 0;

        if(this.x > 450)
            this.x = 450;
        
    }
};

function move(){
    document.body.onkeyup = function (e) {
        if (e.keyCode == 37) {
            bloco.atualizaLado(0);
        }
        else if (e.keyCode == 39) {
            bloco.atualizaLado(1);
        }
    }
}

function init() {
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    canvas = document.getElementById("mygame");
    if (LARGURA > 500) {
        LARGURA = 500;
        ALTURA = 630;
    }

    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";
    ctx = canvas.getContext("2d");
    
    move();
    roda();
    
}

function roda(){
    
    atualiza();
    desenho();
    window.webkitRequestAnimationFrame(roda);
}

function atualiza() {
}

function desenho(){
    // canvas.width = canvas.width;
    fundo.desenha();
    bloco.desenha();
    
}

init();