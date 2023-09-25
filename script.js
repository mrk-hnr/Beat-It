class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll(".pad")
        this.playButton = document.querySelector(".play")
        this.kickAudio = document.querySelector(".kick-sound")
        this.snareAudio = document.querySelector(".snare-sound")
        this.hihatAudio = document.querySelector(".hihat-sound")
        this.index = 0
        this.bpm = 150
    }

    activePad() {
        this.classList.toggle("active")
    }

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

    start() {
        const interval = (60/this.bpm) * 1000
        setInterval(() => {
            this.repeat()
        }, interval)
    }
}

const drumKit = new Drumkit()

drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad)
    pad.addEventListener("animationend", function() {
        this.style.animation = ""
    })
})

drumKit.playButton.addEventListener("click", () => {
    drumKit.start()
})