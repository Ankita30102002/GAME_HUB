let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
const TIE =" "
let currentPlayers = TIE
let currentPlayer = X_TEXT
let gameended = false;
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id
    if (spaces[id] === null && !gameended) { 
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
            gameended = true; 
            return
        } else if (!spaces.includes(null)) { 
            playerText.innerHTML = "Tie game!"
            gameended = true; 
            return
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
        playerText.innerHTML = `It's ${currentPlayer}'s turn.`
    } else if (!gameended) { 
        playerText.innerHTML = "Already filled"
}
}


const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}
restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
    gameended = false;
    
    if (!gameended) {
        restartBtn.innerHTML = "Reset"
}
}
startGame()