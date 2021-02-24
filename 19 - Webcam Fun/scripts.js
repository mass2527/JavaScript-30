const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const constraints = {
  video: true,
  audio: false,
};

async function getVideo() {
  const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

  video.srcObject = mediaStream;
  video.play();
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(video, 0, 0, width, height);
  let pixels = ctx.getImageData(0, 0, width, height);
  pixels = rgbSplit(pixels);
  ctx.putImageData(pixels, 0, 0);

  requestAnimationFrame(paintToCanvas);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const url = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'handsome guy');
  link.innerHTML = `<img src=${url} />`;
  strip.insertAdjacentElement('beforeend', link);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 100;
  }
  return pixels;
}

function greenEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 1] += 100;
  }
  return pixels;
}

function blueEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 2] += 100;
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 500] = pixels.data[i + 0];
    pixels.data[i + 30] = pixels.data[i + 1];
    pixels.data[i + 300] = pixels.data[i + 2];
  }
  return pixels;
}

window.onload = () => getVideo();
video.addEventListener('canplay', paintToCanvas);
