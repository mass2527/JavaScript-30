const player = document.querySelector('.player');
const video = document.querySelector('video');
const playBtn = document.querySelector('.player__button, .toggle');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const skipBtns = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('input[type="range"]');

let isClicked = false;

const updateButton = () => (playBtn.textContent = video.paused ? 'play' : 'pause');

const togglePlay = () => (video.paused ? video.play() : video.pause());

const handleTimeUpdate = () =>
  (progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`);

const handleSkip = (e) => (video.currentTime += parseFloat(e.target.dataset.skip));

function handleRange() {
  video[this.name] = this.value;
}

function clickProgress(e) {
  isClicked = true;
  const time = (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = time;
}

function moveProgress(e) {
  if (!isClicked) return;
  const time = (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = time;
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('click', togglePlay);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleTimeUpdate);
skipBtns.forEach((skipBtn) => skipBtn.addEventListener('click', handleSkip));
ranges.forEach((range) => range.addEventListener('input', handleRange));
progress.addEventListener('mousedown', clickProgress);
progress.addEventListener('mouseup', () => (isClicked = false));
progress.addEventListener('mousemove', moveProgress);
progress.addEventListener('moveleave', () => (isClicked = false));
