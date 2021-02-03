const keyElements = document.querySelectorAll('.key');

function handleKeyDown(e) {
  if (![65, 83, 68, 70, 71, 72, 74, 75, 76].includes(e.keyCode)) return;

  const keyElement = document.querySelector(`div[data-key="${e.keyCode}"]`);
  const audioElement = document.querySelector(`audio[data-key="${e.keyCode}"]`);

  keyElement.classList.add('playing');

  audioElement.currentTime = 0;
  audioElement.play();
}

function handleTransitionEnd(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

keyElements.forEach((key) => key.addEventListener('transitionend', handleTransitionEnd));
window.addEventListener('keydown', handleKeyDown);
