const cells = document.querySelectorAll(".cell")
const titleHeader = document.querySelector(".titleHeader")
const xPlayerDisplay = document.querySelector("#xPlayerDisplay")
const oPlayerDisplay = document.querySelector("#oPlayerDisplay")
const restartBtn = document.querySelector("#restartBtn")

// initialise variable for game
let player = "X"
let isPauseGame = false 
let isGameStart = false 

// array of winning condition 
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '']
const winCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
]

// click event listener 
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index){
    // console.log(cell)
    // console.log('index: ' + index)

    // ensure cell is empty and game is not paused
    if (cell.textContent == '' && !isPauseGame){
        isGameStart = true
        updateCell(cell, index)

        // randomly select player if no results 
        if (!checkWinner()){
            changePlayer()
            randomPick()
        }
    }
}

function updateCell(cell, index){
    cell.textContent = player
    inputCells[index] = player  
    // console.log(inputCells)
    cell.style.color = (player == 'X') ? '#1892EA' : '#e83be5'
}

function changePlayer(){
    player = (player == 'X') ? 'O' : 'X'
}

function randomPick(){
    // pause game to allow computer to pick 
    isPauseGame = true 

    // delay 1000ms for computer randomised move
    setTimeout(() => {
        let randomIndex 
        do {
            randomIndex = Math.floor(Math.random() * inputCells.length)
        } while (
            inputCells[randomIndex] != ''
        ) 
        // console.log(randomIndex)

        // update cell with comupter move 
        updateCell(cells[randomIndex], randomIndex)

        // check if computer has won 
        if (!checkWinner()){
            changePlayer()
            // switch back to human player 
            isPauseGame = false 
            return 
        }

        player = (player == 'X') ? 'O' : 'X'
    }, 1000)
}

function checkWinner(){
    for (const [a, b, c] of winCondition){
        // console.log(a)
        if (inputCells[a] == player &&
            inputCells[b] == player && 
            inputCells[c] == player
        ){
            declareWinner([a, b, c])
            return true 
        }
    }
    // check for draw cases 
    if (inputCells.every(cell => cell != '')){
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices){
    // console.log(player + ' win!')
    titleHeader.textContent = `${player} Win`
    isPauseGame = true

    // highlight winning cells 
    // console.log(winningIndices)
    winningIndices.forEach((index) => {
        cells[index].style.background = '#2A2343'
    })

    restartBtn.style.visibility = 'visible'
}

function declareDraw(){
    titleHeader.textContent = 'Draw1'
    restartBtn.style.visibility = 'visible'
    isPauseGame = true
}

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    isPauseGame = false 
    isGameStart = false
    titleHeader.textContent = 'Choose'
})

function choosePlayer(selectedPlayer) {
    // console.log(selectedPlayer)
    if (!isGameStart){
        player = selectedPlayer 
        if (player == 'X'){
            // highlight X display
            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        } else {
            // highlight O display 
            xPlayerDisplay.classList.remove('player-active')
            oPlayerDisplay.classList.add('player-active')
        }
    }
}
