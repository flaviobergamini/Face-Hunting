var canvas, ctx, ALTURA, LARGURA, event, velocidade=6, pontuacao = 0

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
    score: 0,

    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    },

    atualizaLado: function(lado) {
        if(lado == 1 ){
            this.x += this.velocidade;
        }else {
            this.x -= this.velocidade;
        }
        if(this.x < 0)
            this.x = 0;

        if(this.x > 450)
            this.x = 450;
        
    }
},

obstaculos = {
    _obs: [],
    cores: ["yellow", "pink", "green"],
    tempoInsere: 0,
    pos: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450],

    insere: function () {
        this._obs.push({
            x: this.pos[Math.floor(10*Math.random())],
            y: 0,
            largura: 50,
            altura: 50,
            gravidade: 1.5,
            velocidade: 0,
            cor: this.cores[Math.floor(3 * Math.random())]
        })

        this.tempoInsere = 30 + Math.floor(51 * Math.random());
    },

    atualiza: function () {
        if (this.tempoInsere == 0)
            this.insere();
        else
            this.tempoInsere--;
        for (var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            obs.y += obs.gravidade;

            if (bloco.x == obs.x && obs.y+50 >= bloco.y){
                bloco.score++;
                this._obs.splice(i, 1);
                tam--;
                i--;
                console.log("pontuou");
            }
            else if (obs.y == 630) {
                console.log("entrou");
                this._obs.splice(i, 1);
                tam--;
                i--;
            }

        }
    },

    limpa: function () {
        this._obs = [];
    },

    desenha: function () {
        for (var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            ctx.fillStyle = obs.cor;
            ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
        }
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
    console.log(ALTURA);

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

function atualiza() {
    obstaculos.atualiza();
}

function roda(){
    atualiza();
    desenho();
    window.webkitRequestAnimationFrame(roda);
}

function desenho(){

    // canvas.width = canvas.width;

    fundo.desenha();
    
    bloco.desenha();
    obstaculos.desenha();

    ctx.fillStyle = "#fff";
    ctx.font = "50px Arial";
    ctx.fillText(bloco.score, 30, 50);
}

init();