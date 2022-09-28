const words = document.querySelectorAll('.main__word');
const wordsCount = document.querySelector('.main__words-count');

let lastInput = null;
let waitNewInput = 400;  // delay between last oninput and filtering, ms


function filter(entry = 'all') {
    const regexp = new RegExp(entry.replaceAll('ё', 'е')
                                   .replaceAll('е', '[её]'),
                             'gi');

    for ( let word of words ) {
        word.innerText = word.dataset.initValue;

        if ( regexp.test(word.innerText) ) {
            // underline matches
            const wordMatch = word.innerText.match(regexp)[0];
            word.innerHTML = word.innerText.replaceAll(
                regexp,
                '<span class="main__word-entry">' + 
                wordMatch + 
                '</span>'
            );

            // animated show
            word.style.display = 'block';
            setTimeout(() => {word.classList.add('main__word_active')}, 0);
        } else {
            // animated hide
            word.classList.remove('main__word_active');
            setTimeout(() => {
                word.style.display = 'none';
                word.innerHTML = word.innerText;
            }, 300);
        }
    }

    setTimeout(pretty, 0);
}

function pretty() {
    const filteredWords = document.querySelectorAll('.main__word_active');  
    wordsCount.innerText = filteredWords.length;

    if ( filteredWords.length === 0 )
        return;

    // uppercase the first char of the first element
    const first = filteredWords[0];
    first.innerHTML = first.innerHTML.replace(
        first.dataset.initValue[0],
        first.dataset.initValue[0].toUpperCase()
    );

    for ( let i = 0; i < filteredWords.length; i++ )
        filteredWords[i].innerHTML += ( i === filteredWords.length - 1 ) ? '.' : ',';
}

document.querySelector('.main__input').oninput = function() {
    lastInput = new Date();

    setTimeout(function(input) {
        let diff = new Date() - lastInput;  // ms

        if ( diff >= waitNewInput )
            filter(input.value);
    }, waitNewInput, this);
};

pretty();