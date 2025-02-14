const c = document.getElementById("container");
const numCols = 15;

generateCols();

function generateCols() {
    for (let i = 0; i < numCols; i++) {
        let columnContainers = document.createElement("div");
        columnContainers.classList.add("column");
        c.appendChild(columnContainers);
    }
}

const columns = document.querySelectorAll(".column");

let lettersArray = [];
let stoppedColumns = new Set();

function addLetters() {
    if (stoppedColumns.size === columns.length) { 
        return;
    }

    let randomIndices = getRandomIndices(columns.length, Math.min(
        random(1, columns.length), 
        random(1, columns.length), 
        random(1, columns.length), 
        random(1, columns.length), 
        random(1, columns.length)
    ));

    randomIndices.forEach(i => {
        // Skip columns that are already full
        if (stoppedColumns.has(i)) return; 

        let letterContainer = document.createElement("div");
        letterContainer.classList.add("letter-container");

        if (i === 0 || i % 4 === 0) {
            letterContainer.textContent = "R";
        } else if (i % 2 === 0) {
            letterContainer.textContent = "M";
        } else {
            letterContainer.textContent = "&";
        }

        columns[i].appendChild(letterContainer);
        lettersArray.push(letterContainer);

        let numLetters = columns[i].children.length;
        let letterHeight = columns[i].firstElementChild?.offsetHeight || 0;
        let totalHeight = numLetters * letterHeight;

        if (totalHeight > window.innerHeight) {
            // Stop this column
            stoppedColumns.add(i); 
        }

    });


};

let inactivityTimeout;
let letterInterval;

function startInactivityTimer() {
    inactivityTimeout = setTimeout(() => {
        letterInterval = setInterval(addLetters, 1000);
    }, 3000);
}

startInactivityTimer();

["click", "keydown", "touchstart", "mousemove"].forEach((event) => {
    document.addEventListener(event, resetColumns);
});


function resetColumns() {
    // const existingLetters = document.querySelectorAll(".letter-container");
    // if (existingLetters.length > 0) {
    //     existingLetters[0].remove();
    // }
    
    columns.forEach(column => {
        lettersArray.forEach(letter => {
            if(column.contains(letter)) {
                column.removeChild(letter);
            }
        })
    })

    clearInterval(letterInterval);
    clearTimeout(inactivityTimeout);
    startInactivityTimer();

    stoppedColumns.clear();
}




// Fisher-Yates shuffle
function getRandomIndices(arrayLength, numIndices) {
    if (numIndices > arrayLength) {
        throw new Error("numIndices cannot be larger than the array length");
    }

    let indices = Array.from({ length: arrayLength }, (_, i) => i); // Create array [0, 1, 2, ...]
    
    for (let i = indices.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[randomIndex]] = [indices[randomIndex], indices[i]]; // Swap elements
    }

    return indices.slice(0, numIndices);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min + (min === 0 ? 1 : 0);
}



