const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
    if ((rockLeftEdge > dodgerLeftEdge && rockLeftEdge < dodgerRightEdge) ||
        (rockRightEdge < dodgerRightEdge && rockRightEdge > dodgerLeftEdge) ||
        (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge)
        ) {
      return true
    } else {
      return false
    }
  }  else {
    return false
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top

  GAME.appendChild(rock)
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    var collisionStatus = checkCollision(rock)
    if(collisionStatus) {
      endGame()
    } else {
      window.requestAnimationFrame(moveRock)
    }
    if (positionToInteger(rock.style.top) === 399) {
      rock.remove()
    }
  }

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval);
  for (var i = 0; i < ROCKS.length; i++) {
    console.log(ROCKS[i].parentNode());
  }
  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
  function step() {
    if (left > 0) {
      DODGER.style.left = `${left -= 4}px`
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)
  function step() {
    if (left < 358) {
      DODGER.style.left = `${left += 4}px`
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)
  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
