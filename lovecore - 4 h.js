
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");


document.querySelector('.download-track').addEventListener('click', downloadTrack);/*ito*/

let track_index = 0;
let isPlaying = false;
let updateTimer;


// Mga songs//
let curr_track = document.createElement('audio');
curr_track.id = 'audioPlayer';

let track_list = [
    {
        name: "Delusions (Cover)",
        artist: "Sunnisessionz",
        image: "img/Savita-Handpan/pan.png",
        path: "Savita Handpans/10_year_old_Handpan_Prodigy_-_Sunnisessionz_plays_his_own_composition_Delusion_128kbps.mp3"
    },
    {
        name: "C418 Cover",
        artist: "Aria Math",
        image: "img/Savita-Handpan/C418.png",
        path: "Savita Handpans/C418_-_Aria_Math_Handpan_Cover_Atakan_Teoman_128kbps.mp3"
    },
    {
        name: "The Name  of the Wind",
        artist: "Maxence Champy",
        image: "img/Savita-Handpan/windmax.png",
        path: "Savita Handpans/Maxence_Champy_-_The_Name_of_the_Wind_Handpan_music_128kbps.mp3"
    },
    {
        name: "Handpan in the Morning Forest | Nature Sounds",
        artist: "Iš Tylumos",
        image: "img/Savita-Handpan/Morning.png",
        path: "Savita Handpans/Handpan in the morning forest  Nature Sounds.mp3"
    },
    {
        name: "Handpan in the Afternoon Sun | Nature Sounds",
        artist: "Iš Tylumos",
        image: "img/Savita-Handpan/Sun.png",
        path: "Savita Handpans/Handpan in the afternoon Sun _ Nature Sounds [qR4lwyVwGXc].mp3"
    },
];


function loadTrack(track_index) {
    clearInterval(updateTimer);
    curr_track.src = track_list[track_index].path;
    curr_track.load();


    track_art.style.backgroundImage = `url(${track_list[track_index].image})`;
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = `PLAYING ${track_index + 1} OF ${track_list.length}`;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
}


function playpauseTrack() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}


function playTrack() {
    curr_track.play();
    isPlaying = true;

    document.querySelector('.play-button').style.display = 'none';
    document.querySelector('.pause-button').style.display = 'block';
}


function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    document.querySelector('.play-button').style.display = 'block';
    document.querySelector('.pause-button').style.display = 'none';
}


function nextTrack() {
    if (track_index < track_list.length - 1) {
        track_index += 1;
    } else {
        track_index = 0;
    }
    console.log("New track index: " + track_index); 
    loadTrack(track_index);
    playTrack();
    console.log("Loading track: " + track_index); 
}


function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = track_list.length - 1;
    }
    console.log("New track index: " + track_index); 
    loadTrack(track_index);
    playTrack();
    console.log("Loading track: " + track_index); 
}


function downloadTrack() { /*ito para sa madownload*/
    const link = document.createElement('a');
    link.href = track_list[track_index].path;
    link.download = `${track_list[track_index].name}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        curr_time.textContent = `${currentMinutes}:${currentSeconds}`;
        total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}



function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}



loadTrack(track_index);
playpause_btn.addEventListener('click', playpauseTrack);

seek_slider.addEventListener('change', function () {
    seekTo();
});
volume_slider.addEventListener('change', function () {
    setVolume();
});


function seekTo() {
    let seekPosition = (seek_slider.value / 100) * curr_track.duration;
    curr_track.currentTime = seekPosition;
}

function togglePlayPause() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

playpause_btn.addEventListener('click', togglePlayPause);

document.addEventListener("DOMContentLoaded", function() {
    var dropdownBtn = document.querySelector(".dropbtn");
    var dropdownContent = document.querySelector(".dropdown-content");
  
    dropdownBtn.addEventListener("click", function() {
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
    document.addEventListener("click", function(event) {
      if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = "none";
      }
    });
  });


    // Wait for the DOM to load
    document.addEventListener('DOMContentLoaded', function() {
      // Set a timer to hide the loading screen after 3 seconds
      setTimeout(function() {
        // Hide the loading screen
        document.getElementById('loading-screen').style.display = 'none';
        // Show the main content
        document.getElementById('main-content').style.display = 'block';
      }, 3000); // 3000 milliseconds = 3 seconds
    });
