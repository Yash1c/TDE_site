let songIndex = 0;
let audioElement = new Audio('destinationtortuga.mp3'); // Caminho correto do primeiro áudio
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Destination Tortuga - Antti Martikainen", filePath: "songs/audio/destinationtortuga.mp3", coverPath: "songs/covers/destinationtortuga.png" },
    { songName: "The Devils Son - The Jolly Rogers", filePath: "songs/audio/thedevilson.mp3", coverPath: "songs/covers/thedevilsson.png" },
    { songName: "Drunken Sailor - The Irish Rovers", filePath: "songs/audio/drunkensailor.mp3", coverPath: "songs/covers/drunkensailor.png" },
    { songName: "Pirates, We Are - Walid Feghali", filePath: "songs/audio/piratesweare.mp3", coverPath: "songs/covers/piratesweare.jpg" },
    { songName: "Rye Whiskey - The Pirates Charles", filePath: "songs/audio/ryewhiskey.mp3", coverPath: "songs/covers/ryewhiskey.png" },
    { songName: "Le Chant Des Corsaires - Corsaire", filePath: "songs/audio/lechantdescorsaires.mp3", coverPath: "songs/covers/lechantdescorsaires.png" },
    { songName: "He's a Pirate - Pirates of the Caribbean", filePath: "songs/audio/hesapirate.mp3", coverPath: "songs/covers/hesapirate.png" },
    { songName: "We Are! (ウィーアー!) - Hiroshi Kitadani", filePath: "songs/audio/weare.mp3", coverPath: "songs/covers/weare.png" },
    { songName: "Castaways - The Backyardigans", filePath: "songs/audio/castaways.mp3", coverPath: "songs/covers/castaways.png" },
    { songName: "Mestre Dos Mares - A Era Do Gelo 4", filePath: "songs/audio/mestredosmares.mp3", coverPath: "songs/covers/mestredosmares.jpg" }
];

// Atualizando os elementos visuais de cada música (capa e nome)
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Controla o botão principal de play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Atualiza a barra de progresso com base no tempo da música
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Permite avançar na música ao arrastar a barra de progresso
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Função para resetar todos os botões de play/pause nas músicas
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Adiciona evento de clique em cada item da lista de músicas
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays(); // Reseta os outros botões de play
        songIndex = i; // Define o índice da música selecionada
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath; // Carrega a música selecionada
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Botão de próxima música
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0; // Volta para a primeira música
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Botão de música anterior
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0; // Mantém na primeira música
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
