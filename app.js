class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.playBtn = document.querySelector('.play');
    this.index = 0; // index for the beat
    this.bpm = 150; // beats per minute
    this.isPlaying = null;
    this.playBtn = document.querySelector('.play');

    this.initiateEvents();
  }

  initiateEvents() {
    this.playBtn.addEventListener('click', () => {
      this.start();
    });

    this.pads.forEach(pad => {
      pad.addEventListener('click', this.activePad);
      pad.addEventListener('animationend', function () {
        this.style.animation = '';
      });
    });
  }

  activePad() {
    this.classList.toggle('active');
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // Loop over the pads
    activeBars.forEach(bar => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // Check if pads are active
      if (bar.classList.contains('active')) {
        // Check each sound
        if (bar.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    // check if it's playing
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        // Use arrow function to prevent 'this' from pointing to the window object
        this.repeat();
      }, interval);
    }

    this.updateBtn();
  }

  updateBtn() {
    if (this.isPlaying) {
      this.playBtn.innerText = 'Stop';
      this.playBtn.classList.add('active');
    } else {
      this.playBtn.innerText = 'Play';
      this.playBtn.classList.remove('active');
    }
  }
}

const drumKit = new DrumKit();
