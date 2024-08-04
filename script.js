console.log("welcome to spotify")
document.addEventListener('DOMContentLoaded', () => {
    const masterPlay = document.getElementById('masterPlay');
    const gif = document.querySelector('.songinfo img');
    const audioElement = new Audio('song0.mp3');
    const myPlayer = document.getElementById('player');
    let songIndex = 0;
    const masterSong = document.getElementById('masterSong');

    let songlist = [
        { songname: "Lalkara - Diljit Dosanjh", filePath: "song0.mp3" },
        { songname: "Softly - Karan Aujla", filePath: "song2.mp3" },
        { songname: "Excuses - AP Dhillion", filePath: "song3.mp3" },
        { songname: "Lover - Diljit Dosanjh", filePath: "song4.mp3" },
        { songname: "Born to Shine - Diljit Dosanjh", filePath: "song1.mp3" }
    ];

    // Handle play/pause click
    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
        }
    });

    // Listen Events
    audioElement.addEventListener('timeupdate', () => {
        if (audioElement.duration > 0) {
            const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
            myPlayer.value = progress;
        }
    });
    myPlayer.addEventListener('change', () => {
        audioElement.currentTime = myPlayer.value * audioElement.duration / 100;
    });

    const makeAllplay = () => {
        Array.from(document.getElementsByClassName('play')).forEach((element) => {
            element.classList.remove('fa-pause');
            element.classList.add('fa-play');
        });
    };

    Array.from(document.getElementsByClassName('play')).forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllplay();
            songIndex = parseInt(e.target.id);
            audioElement.src = songlist[songIndex].filePath;
            masterSong.innerText=songlist[songIndex].songname;
            audioElement.currentTime = 0;
            audioElement.load();
            audioElement.addEventListener('canplaythrough', () => {
                audioElement.play();
                gif.style.opacity = 1;
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
            }, { once: true });
        });
    });

    const backwardButton = document.querySelector('#back');
    const forwardButton = document.querySelector('#next');

    if (backwardButton) {
        backwardButton.addEventListener('click', () => {
            if (songIndex <= 0) {
                songIndex = songlist.length - 1;
            } else {
                songIndex -= 1;
            }
            audioElement.pause();
            audioElement.src = songlist[songIndex].filePath;
            masterSong.innerText=songlist[songIndex].songname;
            audioElement.currentTime = 0;
            audioElement.load();
            audioElement.addEventListener('canplaythrough', () => {
                audioElement.play();
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
            }, { once: true });
        });
    }

    if (forwardButton) {
        forwardButton.addEventListener('click', () => {
            if (songIndex >= songlist.length - 1) {
                songIndex = 0;
            } else {
                songIndex += 1;
            }
            audioElement.pause();
            audioElement.src = songlist[songIndex].filePath;
            masterSong.innerText=songlist[songIndex].songname;
            audioElement.currentTime = 0;
            audioElement.load();
            audioElement.addEventListener('canplaythrough', () => {
                audioElement.play();
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
            }, { once: true });
        });
    }

});