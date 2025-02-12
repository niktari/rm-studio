const c = document.getElementById("container");

let letterContainer;
let columnContainers; 

generateDivs();

function generateDivs() {
    for (let i = 0; i < 11; i++) {
    columnContainers = document.createElement("div");
    columnContainers.classList.add("column");
    c.appendChild(columnContainers);
    }
}

const columns = document.querySelectorAll(".column");
let lettersArray = [];

let letterInterval = setInterval(() => {
    let randomIndices = getRandomIndices(columns.length, Math.random() * columns.length);
    // To-do later: bias the randomness to min vals
    
    randomIndices.forEach(i => {
        letterContainer = document.createElement("div");
        letterContainer.classList.add("letter-container");
        if (i === 0 || i % 4 === 0) {
            letterContainer.textContent = "R";
        } else if(i % 2 === 0) {
            letterContainer.textContent = "M";
        } else if(i % 2) {
            letterContainer.textContent = "&";
        }

        columns[i].appendChild(letterContainer);
        lettersArray.push(letterContainer);

    })
    

}, 1000)

// To do later: clearInterval and add idle time
document.onmousemove = function() {
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