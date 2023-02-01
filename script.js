let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterplay");
let progressBar = document.getElementById("progressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let artistName = document.getElementById("singerName");
let bottomImage = document.getElementById("songInfoImg");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let endMinute = document.getElementById("Eminutes");
let endSecond = document.getElementById("Eseconds");

let bg = document.getElementsByClassName("container");

let volume = document.getElementById("volume");
let Mute = document.getElementById("mute");

let muteState = "unmute";

let songs = [
  {
    songName: "Warriyo - Mortals [NCS Release]",
    artistName: "Justin beiber",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    artistName: "Charlie puth",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "DEAF KEV - Invincible [NCS Release]-320k",
    artistName: "One direction",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
    artistName: "Jhonny",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
    artistName: "DJ Khalid",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    artistName: "Arijit Singh",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    artistName: "Tony Kakkar",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    artistName: "XXX Tentasion",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    artistName: "Pyaar",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    artistName: "Hello World",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];
bottomImage.src = songs[songIndex].coverPath;
masterSongName.innerText = songs[songIndex].songName;
artistName.innerText = songs[songIndex].artistName;

songItems.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterSongName.style.animationPlayState = "running";
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterSongName.style.animationPlayState = "paused";
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});


audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;

  let mm = Math.floor(audioElement.currentTime / 60);
  let ss = Math.floor(audioElement.currentTime % 60);
  minutes.innerText = mm < 10 ? "0" + mm : mm;
  seconds.innerText = ss < 10 ? "0" + ss : ss;

  let Emm = Math.floor(audioElement.duration / 60);
  let Ess = Math.floor(audioElement.duration % 60);

  endMinute.innerText = Emm < 10 ? "0" + Emm : Emm;
  endSecond.innerText = Ess < 10 ? "0" + Ess : Ess;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});
volume.addEventListener("change", () => {
  audioElement.volume = volume.value / 100;
});
Mute.addEventListener("click", () => {
  if (!audioElement.muted) {
    audioElement.muted = true;
    Mute.classList.remove("fa-volume-high");
    Mute.classList.add("fa-volume-xmark");
  } else {
    audioElement.muted = false;
    Mute.classList.remove("fa-volume-xmark");
    Mute.classList.add("fa-volume-high");
  }
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItem")).forEach(
    (element) => {
      element.style["border"] = "none";
    }
  );
};
const makePlaying = (songIndex) => {
  document.getElementById(songIndex).style["border"] = "5px solid #16a349";
}
makePlaying(0);
Array.from(document.getElementsByClassName("songItem")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      //console.log(e);
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      bottomImage.src = songs[songIndex].coverPath;
      masterSongName.innerText = songs[songIndex].songName;
      artistName.innerText = songs[songIndex].artistName;
      audioElement.currentTime = 0;
      audioElement.play();
      makePlaying(e.target.id);
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");

    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  makeAllPlays();
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  bottomImage.src = songs[songIndex].coverPath;
  masterSongName.innerText = songs[songIndex].songName;
  artistName.innerText = songs[songIndex].artistName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  makePlaying(songIndex);


});
document.getElementById("previous").addEventListener("click", () => {
  makeAllPlays();
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex--;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  bottomImage.src = songs[songIndex].coverPath;
  masterSongName.innerText = songs[songIndex].songName;
  artistName.innerText = songs[songIndex].artistName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  makePlaying(songIndex);
});
