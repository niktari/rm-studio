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
const frequency = 60;
const amplitude = 15;

const staticText = document.getElementById("static-text");
const staticTextInfo = staticText.getBoundingClientRect();
const staticTextHeight = staticTextInfo.height;

const maxDivs = Math.floor((window.innerHeight / staticTextHeight));

staticText.style.display = "none";

console.log(staticText);
generateDivs();
document.addEventListener("mousemove", translateDivs);

function generateDivs() {
    for(let i = 0; i < maxDivs; i++) {
        let divContainer = document.createElement("div");
        divContainer.classList.add("letter");
        const chosenText = letters.slice(0, Math.sin(i * frequency) * amplitude + letters.length);
        const showText = chosenText.join("");
        divContainer.innerHTML = showText;
        
        const mapTransition = map(chosenText.length, 0, letters.length, 20, 5)
        divContainer.style.transition = `${Math.abs(mapTransition * 100 + 100)}ms ease-in-out`;
        divContainer.style.animationDelay = `${Math.abs(mapTransition * 100 + 100)}ms`;

        if(i % 2) {
            divContainer.style.transform = `translateX(${Math.sin(i * frequency) * amplitude + amplitude}vw)`;
            divContainer.style.fontFamily = typefaces[0];
        } else {
            divContainer.style.transform = `translateX(${Math.sin(-i * frequency) * amplitude - amplitude}vw)`;
            divContainer.style.fontFamily = typefaces[1];
        }

        const fragment = document.createDocumentFragment();
        fragment.appendChild(divContainer)
        c.appendChild(fragment);
}

}


let allLetters = document.querySelectorAll(".letter");

function translateDivs(e) {

    allLetters.forEach((letter, index) => { 
        let posToNeg = map(e.clientY, 0, window.innerHeight, Math.sin(index * frequency) * amplitude + amplitude, Math.sin(-index * frequency) * amplitude - amplitude);
        let negToPos = map(e.clientY, 0, window.innerHeight, Math.sin(-index * frequency) * amplitude - amplitude, Math.sin(index * frequency) * amplitude + amplitude);
        
        if(index % 2) {
                    letter.style.transform = `translateX(${posToNeg}vw)`;
                } else {
                    letter.style.transform = `translateX(${negToPos}vw)`;
                }
                
        })
}

function map(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}