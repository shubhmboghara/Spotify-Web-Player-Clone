document.addEventListener("DOMContentLoaded", () => {
    let songcard = document.querySelectorAll(".card")
    let prevbtn = document.querySelector(".songbtn img:nth-child(1)")
    let play = document.querySelector("#play")
    let nextbtn = document.querySelector(".songbtn img:nth-child(3)")
    let audio = document.getElementById("audio-player")
    const durationDisplay = document.getElementById("songDuration");

    let songs = []
    let currentindex = -1

    songcard.forEach((card, index) => {
        let songnumber = card.getAttribute("data-song")
        let path = `assets/allsong/${songnumber}.mp3`

        songs.push(path)

        card.addEventListener("click", () => {

            playsong(index)

        })
    })

    function playsong(index) {
        if (index < 0 || index >= songs.length) {
            return;
        }
        currentindex = index
        let path = songs[currentindex]
        audio.src = path;
        audio.play();

        PauseIcon(true)
    }

    function PauseIcon(isplaying) {
        play.src = isplaying ? "assets/svg/pause.svg" : "assets/svg/play.svg"
    }

    play.addEventListener("click", () => {

        if (!audio.src) {
            return
        }
        else if (audio.paused) {
            audio.play()
            PauseIcon(true)
        }
        else {
            audio.pause()
            PauseIcon(false)
        }
    })


    nextbtn.addEventListener("click", () => {

        if (currentindex < songs.length - 1) {
            playsong(currentindex + 1)
        }
    })

    prevbtn.addEventListener("click", () => {

        if (currentindex > 0) {
            playsong(currentindex - 1)
        }

    })

    audio.addEventListener("ended", () => {
        if (currentindex < songs.length - 1) {
            playsong(currentindex + 1)
        }
        else {
            PauseIcon(false)
        }

    })


    audio.addEventListener("loadedmetadata", () => {
        updateDuration();
    });

    audio.addEventListener("timeupdate", () => { // this give currentimr evry time 
        updateDuration();
    });

    function updateDuration() {
        const remainingSeconds = Math.floor(audio.duration - audio.currentTime);
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        durationDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    document.querySelector(".menu").addEventListener("click", () => {
        document.querySelector(".sidebar").style.left = '0'
       
    })
   

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".sidebar").style.left = '-120%'; 
    });

     document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            let playbar = document.querySelector(".playbar");
            playbar.style.bottom = "20px";
            playbar.style.transition = "bottom 1s ease-in-out";
        });
    });

    

})
