import "./index.css";
import "./style.css";

document.getElementById("button-new-game").onclick = function () {
  window.location.href = "/game/";
};

document.getElementById("button-ranking").onclick = function () {
  window.location.href = "/scores/";
};

document.getElementById("button-continu").onclick = function () {
  localStorage.setItem("cau-snake-needs-load", JSON.stringify(true));
  window.location.href = "/game/";
};
