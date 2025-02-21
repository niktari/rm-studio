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

function applyTextEffect() {
  wordsDiv.forEach(word => {
    word.onmouseover = function() {
      if(word.classList.contains("blackletter")) {
          word.classList.remove("blackletter")
            } else {
              word.classList.add("blackletter")
      }

          

      setTimeout(()=> {
        if(word.classList.contains("blackletter")) {
          word.classList.remove("blackletter")
          }

      }, 1000)
    }
  })
}

applyTextEffect();
