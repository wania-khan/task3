// Module 1: 
const gridItems = document.querySelectorAll('.grid-item');
const array = [...Array(9)].map((_, index) => index + 1); // Array with index from 1 to 9

function rand() {
    array.forEach((a, index) => {
        let randomIndex = Math.floor(Math.random() * array.length); // Generate a random index to assign 
        let temp = array[index];
        array[index] = array[randomIndex]; // Make sure no number is repeated by shuffling the current value with a random value from array
        array[randomIndex] = temp;
    });

    gridItems.forEach((item, index) => {
        item.textContent = array[index]; // Assign the above confirmed shuffled number
    });
    // Start the timer upon shuffling
    startTimer();
}

// Module 2: 
let dragged = null;

function drag(event) {
    dragged = event.target;
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (dragged !== event.target) {
        const temp = event.target.textContent;
        event.target.textContent = dragged.textContent;
        dragged.textContent = temp;
        //Module 3:
        checkOrder();
    }
}

function checkOrder() {
    const gridItems = document.querySelectorAll('.grid-item');
    let start = 1; // Starting number in the sequence 1-23456789
    for (let i = 0; i < gridItems.length; i++) {
        if (parseInt(gridItems[i].textContent) !== start) {
            return; // If any block is out of sequence, exit the function
        }
        start++;
    }
    // If all blocks are in the correct order, stop the timer and display alert
    clearInterval(timer);
    alert("Congratulations, you won!");
}

// Module 4: 
let timer;
function startTimer() {
    let sec = 15;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = format(sec);

    timer = setInterval(() => {
        sec--;
        timerDisplay.textContent = format(sec);
        if (sec == 0) {
            clearInterval(timer);
            alert("You lost :/");
        }
    }, 1000);
}

function format(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
