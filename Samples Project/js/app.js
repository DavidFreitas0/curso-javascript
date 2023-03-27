const samples = [
    {
        title: "Bateria",
        src: "./audios/bateria.mp3",
        speed: 0.5
    },
    {
        title: "Fogos",
        src: "./audios/fogos.mp3",
        speed: 2.5
    },
    {
        title: "Suspense",
        src: "./audios/suspense.mp3",
        speed: 5
    },
    {
        title: "Alarme",
        src: "./audios/alarme.mp3",
        speed: 3
    }
]

let currentAudio = null;

for(let i = 0; i<samples.length; i++){
let button = document.createElement("button");
button.innerText = samples[i].title;
button.addEventListener('click', function(){
    if(currentAudio != null){
        currentAudio.pause();
        currentAudio = null;
    }
    const audio = new Audio(samples[i].src);
    audio.playbackRate = samples[i].speed;
    audio.play();
    currentAudio = audio;
})
document.querySelector("#samples").appendChild(button);
}