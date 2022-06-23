import './index.css';
import { gameId, addScores, showScoresToUI } from './modules/game.js';

const name = document.querySelector('#your_name');
const score = document.querySelector('#your_score');
const submitBtn = document.querySelector('#submit');
const refresh = document.querySelector('.refresh-btn');
const gameName = { name: 'Scoccer' };
const scores = [];

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const game = {
    user: name.value,
    score: score.value,
  };
  const id = await gameId(gameName);
  await addScores(id, game);
  name.value = '';
  score.value = '';
});

refresh.addEventListener('click', async () => {
  await showScoresToUI(scores);
});

window.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  await showScoresToUI(scores);
});
