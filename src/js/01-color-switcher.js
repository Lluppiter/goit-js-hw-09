function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startButton.addEventListener('click', event => {
  backgroundColorGetRandomHexColor = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.setAttribute('disabled', '');
});
stopButton.addEventListener('click', () => {
  clearInterval(backgroundColorGetRandomHexColor);
  startButton.removeAttribute('disabled', '');
});
