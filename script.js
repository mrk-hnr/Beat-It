class Drumkit {
    constructor() {
        this.index = 0
        this.bpm = 150
        this.isPlaying = null

        this.pads = document.querySelectorAll(".pad")
        this.playButton = document.querySelector(".play")
        this.kickAudio = document.querySelector(".kick-sound")
        this.snareAudio = document.querySelector(".snare-sound")
        this.hihatAudio = document.querySelector(".hihat-sound")

        this.currentKick = "./assets/kick-deep.wav"
        this.currentSnare = "./assets/snare-brute.wav"
        this.currentHihat = "./assets/hihat-electro.wav"
        this.selects = document.querySelectorAll("select")

        this.muteButton = document.querySelectorAll(".mute")
        this.tempoSlider = document.querySelector(".tempo-slider")

    }

    // ---------------------------------------------

    activePad() {
        this.classList.toggle("active")
    }

    // ---------------------------------------------

    repeat() {
        let step = this.index % 8
        const activeBars = document.querySelectorAll(`.beat${step}`)
        console.log(step)

        // loops over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`

            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0 // next beat won't play until previous beat finishes. This resets it to 0 to enable each beat to play
                    this.kickAudio.play()
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0 // ditto ^
                    this.snareAudio.play()
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0 // ditto ^^
                    this.hihatAudio.play()
                }
            }
        })
        this.index++
    }

    // ---------------------------------------------

    start() {
        const interval = (60/this.bpm) * 1000

        // PERFORMS CHECK IF PLAYING
        if (!this.isPlaying) { // Initial value is null = if "playing"
        this.isPlaying = setInterval(() => {
            this.repeat()
        }, interval)
    } else {
        clearInterval(this.isPlaying)
        this.isPlaying = null
    }
}

    // ---------------------------------------------

    // CHANGE THE TEXT IN BUTTON TO PLAY/STOP
    updateButtion() {
        if (!this.isPlaying) {
            this.playButton.innerText = "Stop"
            this.playButton.classList.add("active")
        } else {
            this.playButton.innerText = "Play"
            this.playButton.classList.remove("active")
        }
    }

    // ---------------------------------------------

    changeSound(event) {
         const selectionName = event.target.name
         const selectionValue = event.target.value //source from the directory
         console.log(selectionName)
         console.log(selectionValue)

         switch(selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue
                break;
         }
    }

    // ---------------------------------------------

    mute(event) {
        const muteIndex = event.target.getAttribute("data-track")
        event.target.classList.toggle("active")

        if (event.target.classList.contains("active")) {
            switch(muteIndex) {
                case "0":
                    this.kickAudio.volume = 0
                    break;
                case "1":
                    this.snareAudio.volume = 0
                    break;
                case "2":
                    this.hihatAudio.volume = 0
                    break;
            }
        } else {
            switch(muteIndex) {
                case "0":
                    this.kickAudio.volume = 1
                    break;
                case "1":
                    this.snareAudio.volume = 1 
                    break;
                case "2":
                    this.hihatAudio.volume = 1
                    break;
            }
        }
    }

    // ---------------------------------------------

    changeTempo(event) {
        const tempoText = document.querySelector(".tempo-number")

        tempoText.innerText = event.target.value
    }

    // ---------------------------------------------

    updateTempo(event) {
        this.bpm = event.target.value
        clearInterval(this.isPlaying)
        this.isPlaying = null
        const playButton = document.querySelector(".play")

        if (playButton.classList.contains("active")) {
            this.start()
        }
    }




}

const drumKit = new Drumkit()


// EVENT LISTENERS

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad)
    pad.addEventListener("animationend", function() {
        this.style.animation = ""
    })
})

drumKit.playButton.addEventListener("click", () => {
    drumKit.updateButtion()
    drumKit.start()
})

drumKit.selects.forEach(select => {
    select.addEventListener("change", function(event) {
        drumKit.changeSound(event)
    })
}) 

drumKit.muteButton.forEach(button => {
    button.addEventListener("click", function(event) {
        drumKit.mute(event)
    })
})

drumKit.tempoSlider.addEventListener("input", function(event) {
    drumKit.changeTempo(event)
})

drumKit.tempoSlider.addEventListener("change", function(event) {
    drumKit.updateTempo(event)
})