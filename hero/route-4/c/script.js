const letters = [
    "R", "&", "M", " ", "i", "s", " ", "t", "h", "e", " ", "D", "e", "s", "i", "g", "n", " ", 
    "P", "r", "a", "c", "t", "i", "c", "e", " ", "o", "f", " ", "R", "y", "a", "n", " ", 
    "B", "u", "g", "d", "e", "n", " ", "&", " ", "M", "i", "c", "h", "e", "l", "l", "e", " ", 
    "A", "n", "d", "o"
  ];

const typefaces = [
    "RM-Blackletter-Mono", "RM-Sans-Mono"
]

const c = document.getElementById("letters-container");
const frequency = 50;
const amplitude = 5;

const staticText = document.getElementById("static-text");
const staticTextInfo = staticText.getBoundingClientRect();
const staticTextHeight = staticTextInfo.height;

const maxDivs = Math.floor((window.innerHeight / staticTextHeight));

staticText.style.display = "none";

generateDivs();

function generateDivs() {
    for(let i = 0; i < maxDivs; i++) {
        let divContainer = document.createElement("div");
        divContainer.classList.add("letter");

        const chosenText = letters.slice(0, Math.sin(i * frequency) * amplitude + letters.length);
        const showText = chosenText.join("");
        divContainer.innerHTML = showText;

        const mapTransition = map(chosenText.length, 0, letters.length, 20, 5)
        divContainer.style.transition = `${Math.abs(mapTransition) * 100 + 500}ms ease-in-out`;

        divContainer.style.transform = `translateX(${Math.sin(i * frequency) * amplitude + amplitude}vw)`;

        if(i % 2) {
            divContainer.style.fontFamily = typefaces[0];
        } else {
            divContainer.style.fontFamily = typefaces[1];
        }

        const fragment = document.createDocumentFragment();
        fragment.appendChild(divContainer);
        c.appendChild(fragment);
}

}


let allLetters = document.querySelectorAll(".letter");

    allLetters.forEach((letter, index) => { 
    letter.onmouseover = function() {

        const letterStyles = window.getComputedStyle(letter);
        const letterPos = new DOMMatrixReadOnly(letterStyles.transform);

        if(letterPos.m41 < 0) {
            letter.style.transform = `translateX(${Math.sin(index * frequency) * amplitude + amplitude}vw)`;
        } else if(letterPos.m41 > 0) {
            letter.style.transform = `translateX(${Math.sin(-index * frequency) * amplitude - amplitude}vw)`;
        }
        
    }
    })
    




function map(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}