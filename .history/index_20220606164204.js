import "./index.css";
import "./style.css";

document.getElementById("button-new-game").onclick = function () {
  window.location.href = "/single/";
};

document.getElementById("button-dual-play").onclick = function () {
  window.location.href = "/game/";
};

document.getElementById("button-auto-play").onclick = function () {
  window.location.href = "/bot/";
};

document.getElementById("button-ranking").onclick = function () {
  window.location.href = "/scores/";
};

document.getElementById("button-continu").onclick = function () {
  localStorage.setItem("cau-snake-needs-load", JSON.stringify(true));
  window.location.href = "/game/";
};
document.getElementById("button-exit-window").onclick = function () {

};
