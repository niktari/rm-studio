function wrapWordsInDivs() {
  const allText = document.querySelectorAll(".effect");

  for(let text of allText) {
    const content = text.textContent;
    const words = content.split(' ');
  
    const wordsWrapped = words.map(word => `<div class="effect--div">${word}</div>`).join(' ');
  
    text.innerHTML = wordsWrapped;
  }

}

wrapWordsInDivs();

let wordsDiv = document.querySelectorAll(".effect--div");

let lettersWrapped;
let letters;

function setWordText() {
  wordsDiv.forEach(word => {
      const wordContent = word.textContent;
      const letters = wordContent.split('');
      
      lettersWrapped = letters.map(letter => `<span class="effect--span">${letter}</span>`).join("");
      
      word.innerHTML = lettersWrapped;
      
  })
}

setWordText();


let textSpan = document.querySelectorAll(".effect--span");

function wrapTextInSpans() {

  textSpan.forEach((span) => {

      span.onmouseover = function(){

          if(span.classList.contains("blackletter")) {
            span.classList.remove("blackletter")
            } else {
            span.classList.add("blackletter")
            }

          

          setTimeout(()=> {
              if(span.classList.contains("blackletter")) {
                span.classList.remove("blackletter")
                }

          }, 1000)

      }

  
  })
}

wrapTextInSpans();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

