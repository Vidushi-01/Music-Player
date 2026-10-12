const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const disk = document.getElementById("disk");
const songList = document.querySelectorAll("#songList li");
const search = document.getElementById("search");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const songs = [
    {
        title: "Saaun Di Jhadi",
        artist: "Babbu Mann",
        file: "Saaun Di Jhadi - Babbu Maan.mp3",
        cover: "image.png"
    },
    {
        title: "Kabja",
        artist: "Babbu Mann",
        file: "Kabza - Babbu Maan.mp3",
       cover: "image copy.png"
    },
    {
        title: "Dak Bangla",
        artist: "Lakwinder Lucky",
        file: "Daak Bangla - Lakhwinder Lucky.mp3",
        cover: "download (1) copy.png"
    },
    {
        title: "Jatta Ka Chora",
        artist: "Mika Singh",
        file: "Jaatta Ka Chhora - Mika Singh.mp3",
        cover: "download (2) copy.png"
    },
    {
        title: "Tera Pyar Shabbo",
        artist: "Dhakkad Choora",
        file: "Tera Pyar Sabbo - Dhakad Chhora (pagalall.com).mp3",
        cover: "shabbo copy.png"
    },
    {
        title: "Shoot Ka Order",
        artist: "Jass Manak",
        file: "Shoot Da Order Shooter.mp3",
        cover: "shoot da order copy.png"
    },
    {
        title: "Chaska",
        artist: "Yo Yo Honey Singh",
        file: "Chaska - Yo Yo Honey Singh.mp3",
        cover: "download (3) copy.png"
    },
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        file: "perfect.mp3",
        cover: "download (5) copy.png"
    },
    {
        title: "Kharch Karod",
        artist: "Laal Rang",
        file: "Kharch Karod _Slow_ - Laal Rang copy.mp3",
        cover: "download (4) copy.png"
    }
];

let currentSong = 0;
let isShuffle = false;
let isRepeat = false;

function loadSong(index){
    currentSong = index;

    audio.src = songs[index].file;
    cover.src = songs[index].cover;

    title.innerHTML = songs[index].title;
    artist.innerHTML = songs[index].artist;

    progress.value = 0;
    currentTime.innerHTML = "0:00";
    duration.innerHTML = "0:00";

    updateActiveSong();

    audio.play();
    playBtn.innerHTML = "⏸";
    disk.classList.add("playing");
}

function playPause(){
    if(audio.paused){
        audio.play();
        playBtn.innerHTML = "⏸";
        disk.classList.add("playing");
    }else{
        audio.pause();
        playBtn.innerHTML = "▶";
        disk.classList.remove("playing");
    }
}

function nextSong(){
    currentSong++;
    if(currentSong >= songs.length){
        currentSong = 0;
    }
    loadSong(currentSong);
}

function prevSong(){
    currentSong--;
    if(currentSong < 0){
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
}

function shuffleSong(){
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active");
}

function repeatSong(){
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active");
}

audio.addEventListener("loadedmetadata", function(){
    if(isFinite(audio.duration)){
        progress.max = audio.duration;
        duration.innerHTML = formatTime(audio.duration);
    }
});

audio.addEventListener("timeupdate", function(){
    if(isFinite(audio.duration)){
        progress.value = audio.currentTime;
        currentTime.innerHTML = formatTime(audio.currentTime);
    }
});

progress.addEventListener("input", function(){
    audio.currentTime = progress.value;
});

volume.addEventListener("input", function(){
    audio.volume = volume.value / 100;
});

audio.addEventListener("ended", function(){
    if(isRepeat){
        audio.currentTime = 0;
        audio.play();
    }
    else if(isShuffle){
        let randomIndex = Math.floor(Math.random() * songs.length);

        while(randomIndex === currentSong){
            randomIndex = Math.floor(Math.random() * songs.length);
        }

        loadSong(randomIndex);
    }
    else{
        nextSong();
    }
});

search.addEventListener("keyup", function(){
    let filter = search.value.toLowerCase();

    songList.forEach(function(song){
        let text = song.innerText.toLowerCase();

        if(text.includes(filter)){
            song.style.display = "flex";
        }else{
            song.style.display = "none";
        }
    });
});

function formatTime(time){
    if(!isFinite(time)){
        return "0:00";
    }

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

function updateActiveSong(){
    songList.forEach(function(song){
        song.classList.remove("active");
    });

    songList[currentSong].classList.add("active");
}

updateActiveSong();
cover.src = songs[0].cover;
audio.src = songs[0].file;
