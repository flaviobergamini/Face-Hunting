var canvas, ctx, ALTURA, LARGURA, event, velocidade = 6, pontuacao = 0, set = 0, record,
estadoAtual = 0, // 0 jogar - 1 Jogando 2 - perdeu
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
    },

    reset: function () {
        this.velocidade = 0;
        this.y = 0;
        if (this.score > record) {
            localStorage.setItem("record", this.score);
            record = this.score;
        }
        this.score = 0;
    },
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
            cor: this.cores[Math.floor(3 * Math.random())],
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
                if(obs.cor == "yellow"){
                    bloco.score--;
                    console.log("amarelo");
                    estadoAtual = 2;               
                }else{
                    bloco.score++;
                    console.log("pontuou");
                }
                this._obs.splice(i, 1);
                tam--;
                i--;
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
            // ctx.drawImage(imgN, obs.x, obs.y);
            ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
        }
    }
};


function move(){
    if(estadoAtual == 1){
        document.body.onkeyup = function (e) {
            if (e.keyCode == 37) {
                bloco.atualizaLado(0);
            }
            else if (e.keyCode == 39) {
                bloco.atualizaLado(1);
            }
        }
    } else if(estadoAtual == 0){
        document.body.onkeyup = function (e) {
            if (e.keyCode == 32) {
                estadoAtual = 1;
                move();
            }
        }
    } else {
        obstaculos.limpa();  
    } 
}

function inicia() {
    document.body.onkeyup = function (e) {
        if (e.keyCode == 32) {
            estadoAtual = 1;
            obstaculos.limpa();
            move();
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

    record = localStorage.getItem("record");

    if (record == null)
        record = 0;
    
    move();
    roda();
    
}

function atualiza() {
    if(estadoAtual == 1)
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

    // var imgN = document.getElementById("imagemP");
    // ctx.drawImage(imgN, 0, 0);

    ctx.fillStyle = "#fff";
    ctx.font = "50px Arial";
    ctx.fillText(bloco.score, 30, 50);

    if(estadoAtual == 2){
        ctx.fillStyle = "red";
        ctx.font = "50px Arial";
        ctx.fillText("Game Over", 125, 315);

        if (bloco.score > record)
            ctx.fillText("Novo Record!", 125, 225);
        /* SCORE */
        if (bloco.score < 10)
            ctx.fillText(bloco.score, 250, 380);

        inicia();
    }
    ctx.restore();


    

}

init();