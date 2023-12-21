const input = document.getElementById("input");
const voiceSelect = document.getElementById("voice");
const rateRange = document.getElementById("rate");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");

let voices = [];

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join("");
}

populateVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

playButton.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = input.value;
    utterance.voice = voices.find(voice => voice.name === voiceSelect.value);
    utterance.rate = rateRange.value;
    speechSynthesis.speak(utterance);
    console.log("Deveria reproduzir", utterance)
});

pauseButton.addEventListener("click", () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
        console.log("Deveria pausar")
    }
});

resumeButton.addEventListener("click", () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.resume();
        console.log("Deveria Reproduzir Novamente")
    }
});
