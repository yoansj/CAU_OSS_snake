import "/style.css";

const leaderboard = document.getElementById("leaderboard");
const scoreTemplate = document.getElementById("score-template");
const input = document.getElementById("name-input");
const addScoreButton = document.getElementById("add-score");
const replayButton = document.getElementById("replay-button");
const menuButton = document.getElementById("menu-button");
const scoreText = document.getElementById("score-text");

const lastScore = JSON.parse(localStorage.getItem("cau-snake-lastScore")) || Math.round(Math.random() * 100);
let canSubmitScore = true;

// Update UI
scoreText.innerHTML = "Your score for this game is: " + lastScore;

/**
 * Load scores from user computer
 */
const loadScores = () => {
  let scores = JSON.parse(localStorage.getItem("cau-snake-scores")) || [
    {
      name: "Yoyo boss",
      score: 12,
    },
    {
      name: "Toto",
      score: 36,
    },
    {
      name: "Jey",
      score: 40,
    },
  ];

  // Sorting des scores
  scores.sort((a, b) => b.score - a.score);

  return scores;
};

/**
 * Add new score to leaderboard
 */
const addScore = (rank, name, score) => {
  // Add new entry in board
  // First duplicate template
  const newScoreTemplate = scoreTemplate.cloneNode(true);
  newScoreTemplate.id = "no-id";

  // Replace infos
  newScoreTemplate.children[0].innerHTML = rank; // Rank
  newScoreTemplate.children[1].innerHTML = name; // Name
  newScoreTemplate.children[2].innerHTML = score; // Score
  newScoreTemplate.className = "flex justify-around bg-green-600";

  // Add duplicate in board
  leaderboard.appendChild(newScoreTemplate);
};

const updateBoard = (scores) => {
  Array.from(leaderboard.children).forEach((child, index) => {
    if (index === 0 || index === 1) {
      // console.log("rien");
    } else {
      leaderboard.removeChild(child);
    }
  });

  // Updates the board
  scores.forEach((scores, index) => addScore(index + 1, scores.name, scores.score));
};

// When pages loads
// Load scores
// Update the board
let scores = loadScores();
updateBoard(scores);

/**
 * Saves the new score in the computer
 * Updates the score board
 */
const submitScore = () => {
  if (input.value !== "" && canSubmitScore) {
    scores.push({
      name: input.value,
      score: lastScore,
    });
    localStorage.setItem("cau-snake-scores", JSON.stringify(scores));
    scores = loadScores();
    updateBoard(scores);
    canSubmitScore = false;
    scoreText.innerHTML = "Your score is saved :)";
  }
};

addScoreButton.onclick = () => submitScore();

/**
 * Set up replay
 */
const replay = () => {
  window.location.href = "/game/";
};

replayButton.onclick = () => replay();
menuButton.onclick = () => {
  window.location.href = "/";
};
