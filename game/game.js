
const buttons = {
  '1': document.getElementById('one'),
  '2': document.getElementById('two'),
  '3': document.getElementById('three'),
  '4': document.getElementById('four'),
  '5': document.getElementById('five'),
  '6': document.getElementById('six')
};
/* These buttons will run the game, and play a note and light up 
when the game is running */

let gameState = [];
let playerState = [];
let round = [];
let score = [];
let user = {
  'name': ""
}