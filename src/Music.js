
export class Music {
    audioElement;
    music;

    constructor(music) {
        // Créer un élément audio HTML5
        this.audioElement = new Audio(music);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.1;
        this.audioElement.load();

    }

    playMusic() {
        this.audioElement.play().then(() => {
            //console.log("Musique de fond en lecture !");
        }).catch((error) => {
            console.error("Erreur lors de la lecture de la musique", error);
        });
    }

    pauseMusic(){
        this.audioElement.pause();
    }

    stopMusic() {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }

    setVolume(volume) {
        this.audioElement.volume = volume;
    }
}