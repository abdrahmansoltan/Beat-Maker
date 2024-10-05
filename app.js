class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.playBtn = document.querySelector('.play');
    this.selects = document.querySelectorAll('select');
    this.muteBtns = document.querySelectorAll('.mute');
    this.index = 0; // index for the beat
    this.bpm = 150; // beats per minute
    this.isPlaying = null;
    this.currentKick = './sounds/kick-classic.wav';
    this.currentSnare = './sounds/snare-acoustic01.wav';
    this.currentHihat = './sounds/hihat-acoustic01.wav';

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

    this.selects.forEach(select => {
      select.addEventListener('change', e => {
        this.changeSound(e);
      });
    });

    this.muteBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        this.mute(e);
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

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;

    switch (selectionName) {
      case 'kick-select':
        this.kickAudio.src = selectionValue;
        break;
      case 'snare-select':
        this.snareAudio.src = selectionValue;
        break;
      case 'hihat-select':
        this.hihatAudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute('data-track');
    e.target.classList.toggle('active');
    const isActive = e.target.classList.contains('active');
    e.target.querySelector('i').classList = isActive
      ? 'fas fa-solid fa-volume-high'
      : 'fa-solid fa-volume-xmark';

    if (e.target.classList.contains('active')) {
      // mute the selected track
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 0;
          break;
        case '1':
          this.snareAudio.volume = 0;
          break;
        case '2':
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case '0':
          this.kickAudio.volume = 1;
          break;
        case '1':
          this.snareAudio.volume = 1;
          break;
        case '2':
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
}

const drumKit = new DrumKit();
