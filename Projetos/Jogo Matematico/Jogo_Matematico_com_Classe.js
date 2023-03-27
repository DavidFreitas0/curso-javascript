class JogoMatematico {

    //Dados iniciais de jogo
    usuario = null;
    pontos = 0;
    vidas = 3;
    ranking = [];
    max = 10;
    min = 0;

    //Numeros que serão gerado aleatoriamente.
    n1 = null;
    n2 = null;
    nOperacao = 0;
    nPosicao = 0;

    //Variaveis que guarda os Resultados
    resultadoDigitadoPeloUsuario = null;
    resultadoEquacao = null;
    resultado = null;

    constructor(){
        this.inserirNome();
        this.jogo();
    }

    inserirNome(){
        this.usuario = prompt ("Digite o seu nome : ");
        while(this.usuario == ""){
            this.usuario = prompt ("OPS!! Você esqueceu de informar qual o seu nome. \n" + "Insira o seu nome para iniciar o jogo: ");
        }
    }

    jogo() {
        while(this.vidas > 0){
            this.gerarNumeros();
            switch(this.nOperacao){
                case 0:
                    this.somar();
                    break;
                case 1:
                    this.subtrair();
                    break;
                case 2:
                    this.multiplicar();
                    break;
                case 3:
                    this.dividir();
                    break;
            }
            this.checarResultado();
        }
    }

    somar() {
        this.resultadoEquacao = this.n1 + this.n2;
        let posicao = this.posicao("+");
        this.resultadoDigitadoPeloUsuario = prompt(`Qual o valor de ${posicao}`);
    }

    subtrair() {
        this.alterarPosicaoDoN1comN2SeN1menorN2();
        this.resultadoEquacao = this.n1 - this.n2;
        let posicao = this.posicao("-");
        this.resultadoDigitadoPeloUsuario = prompt(`Qual o valor de ${posicao}`);
    }

    multiplicar() {
        this.alterarPosicaoDoN1comN2SeN1menorN2();
        this.resultadoEquacao = this.n1 * this.n2;
        let posicao = this.posicao("*");
        this.resultadoDigitadoPeloUsuario = prompt(`Qual o valor de ${posicao}`);
    }

    dividir() {
        this.checarSeNumeroSaoDivisiveis();
        this.resultadoEquacao = this.n1 / this.n2;
        let posicao = this.posicao("/");
        this.resultadoDigitadoPeloUsuario = prompt(`Qual o valor de ${posicao}`);
    }

    posicao(sinal) {
        let equacao = "";
        switch(this.nPosicao){
            case 0:
                equacao = `? ${sinal} ${this.n2} = ${this.resultadoEquacao}`;
                this.resultado = this.n1;
                break;
            case 1:
                equacao = `${this.n1} ${sinal} ? = ${this.resultadoEquacao}`;
                this.resultado = this.n2;
                break;
            case 2:
                equacao = `${this.n1} ${sinal} ${this.n2} = ?`;
                this.resultado = this.resultadoEquacao;
                break;
        }
        return equacao;
    }

    alterarPosicaoDoN1comN2SeN1menorN2() {
        let n2Temporario = this.n2;
        if(this.n1 < this.n2){
            this.n2 = this.n1;
            this.n1 = n2Temporario;
        }
    }

    checarSeNumeroSaoDivisiveis(){
        while (this.n1 % this.n2 != 0){
                this.gerarN1eN2();
        }
        this.alterarPosicaoDoN1comN2SeN1menorN2();
    }

    checarResultado() {
        if(this.resultadoDigitadoPeloUsuario == this.resultado){
            this.adicionarPontos();
            this.jogo();
        } else {
            this.diminuirVida();
        }
    }

    diminuirVida(){
        this.vidas -= 1;
            if (this.vidas > 1 ){
                alert (`Resposta Errada. Você ainda tem ${this.vidas} vidas`);
                this.jogo();
            } else if(this.vidas == 1){
                alert (`Resposta Errada. Você ainda tem ${this.vidas}  vida`);
                this.jogo();
            } else if (this.vidas == 0){
                this.ranking.push([this.usuario, this.pontos]);
                if(prompt (`FIM DE JOGO, ${this.usuario} ! \n Você fez: ${this.pontos} Pontos \n Digite um 1 para jogar novamente`) == 1){
                    this.resetarJogo();
                } else{
                    this.exibirRanking();
                }
            } 
    }

    adicionarPontos(){
        this.pontos += 5;
        if (this.pontos % 20 == 0){
            this.max += 10;
            alert (`Você passou de nível, ${this.usuario}! \n As perguntas ficarão mais difíceis, Boa sorte.`);
        }
        if(this.pontos % 50 == 0 && this.vidas < 3){
            this.vidas += 1;
            alert (`Parabéns, ${this.usuario}! Você está fez ${this.pontos} pontos e ganhou 1 vida.`)
        }
    }

    resetarJogo(){
        this.vidas = 3;
        this.max = 10;
        this.pontos = 0;
        this.inserirNome();
        this.jogo();
    }

    exibirRanking(){
        let texto = "";
        let posicao = 0;
        for(let i=0; i < this.ranking.length; i++){
            posicao += 1;
            texto += `${posicao} - ${this.ranking[i][0]} fez ${this.ranking[i][1]} \n`;
            
        }
    alert(texto);
    }
    gerarNumeros() {
        this.n1 = Math.floor(Math.random() * (this.max - this.min) + this.min);
        this.n2 = Math.floor(Math.random() * (this.max - this.min) + this.min);
        this.nOperacao = Math.floor(Math.random() * 4);
        this.nPosicao = Math.floor(Math.random() * 3);
    }
    gerarN1eN2(){
        this.n1 = Math.floor(Math.random() * (this.max - this.min) + this.min);
        this.n2 = Math.floor(Math.random() * (this.max - this.min) + this.min);
    }
}