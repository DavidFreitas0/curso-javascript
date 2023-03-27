let pacientes = [
    ["Chico", "Prioridade"],
    ["Zé", "Prioridade"],
    ["Maria", "Prioridade"],
    ["Laura", "Não Prioridade"],
    ["Marcos", "Não Prioridade"],
    ["Samilly", "Não Prioridade"]
];
let prioridade = [];
let naoPrioridade = [];
let ultimoPacienteChamado = "Não Prioridade";


// Funções
function tocarSom(){
    let audio1 = new Audio();
    audio1.src = "../Projeto Consultorio/1.mp3";
    audio1.play();
}
function falar(texto){
    let frase = new SpeechSynthesisUtterance(texto);
    frase.voice = window.speechSynthesis.getVoices().filter(v => v.lang == "pt-BR")[9];
    frase.rate = 0.8;
    window.speechSynthesis.speak(frase);
}
function separarPrioridade(){
    for(let i=0; i<pacientes.length; i++){
        if (pacientes[i][1] == "Prioridade") {
            prioridade.push(pacientes[i]);
        } else if (pacientes[i][1] == "Não Prioridade") {
            naoPrioridade.push(pacientes[i]);
        }
    }
}
separarPrioridade();
function chamar(){
    tocarSom();
    let separarArray = [];
    let nome;
    if (ultimoPacienteChamado == "Prioridade") {
        separarArray = naoPrioridade.shift();
        ultimoPacienteChamado = "Não Prioridade";
    } else {
        separarArray = prioridade.shift();
        ultimoPacienteChamado = "Prioridade";
    }
    if(separarArray){
        nome = separarArray[0];
        document.querySelector("#nome-do-paciente").innerText = nome;
        document.querySelector("#consultorio").innerText = "Por favor, Comparecer ao Consultório 1";
        falar(nome + "Por favor, Comparecer ao Consultório 1");
    }
    horarioAtendimento();
}
function addZero(value) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  }
function dataEhora(){
    let momentoAtual = new Date();

    let hora = addZero(momentoAtual.getHours());
    let minuto = addZero(momentoAtual.getMinutes());
    let segundo = addZero(momentoAtual.getSeconds());
    let dia = addZero(momentoAtual.getDate());
    let mes = addZero(momentoAtual.getMonth());
    let ano = addZero(momentoAtual.getFullYear());


    dataFormat = dia + " / " + mes + " / " + ano;
    horaFormat = hora + " : " + minuto + " : " + segundo;

    document.getElementById("data-atual").innerHTML = dataFormat;
    document.getElementById("hora-atual").innerHTML = horaFormat;

    setTimeout("dataEhora()",1000);
}
function horarioAtendimento(){
    let data = new Date();
    let horas = addZero(data.getHours());
    let minutos = addZero(data.getMinutes());
    let hours = document.getElementById('horario');

    hours.innerText = `Horário do Atendimento: ${horas}:${minutos}`

}
dataEhora();