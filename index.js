import './index.css'
import './style.css'

document.getElementById("button-new-game").onclick = function () {
  window.location.href = "/game/";
};

document.getElementById("button-ranking").onclick = function () {
  window.location.href = "/scores/";
};
