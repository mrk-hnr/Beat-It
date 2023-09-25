class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll(".pads")
        this.kickAudio = document.querySelector(".kick-sound")
        this.snareAudio = document.querySelector(".snare-sound")
        this.hihatAudio = document.querySelector(".hihat-sound")
        this.index = 0
        this.bpm = 150
    }
    repeat() {
        let step = this.index % 8
        const activeBars = document.querySelectorAll(`.beat${step}`)
        console.log(step)
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


drumKit.start()