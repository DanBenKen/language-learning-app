const currentWord = document.getElementById(`random-word-input`);
const userInput = document.getElementById(`translation-word-input`);
const languageSelect = document.getElementById(`language-select`);
const flagImg = document.getElementById(`img-flag`);
const notification = document.getElementById(`notification`);

const checkBtn = document.getElementById(`word-translate-form`);
const skipBtn = document.getElementById(`btn-skip`);
const resultsBtn = document.getElementById(`btn-show-results`);
const testBtn = document.getElementById(`btn-test`);

let randomWord;
let currentSynonymIndex = 0;
let correctWords = [];
let skippedWords = [];

// funkcija za dobijanje jezika na osnovu selektovane vrednosti
function setLanguage() {
    let languageData = getLanguageData();

    return languageData.language;
}

// funkcija za postavljanje zastave na osnovu selektovane vrednosti
function setFlagImage() {
    let languageData = getLanguageData();

    return flagImg.src = languageData.flagSrc;
}

function getLanguageData() {
    let selectedValue = languageSelect.value;
    let languageData = languagesAndFlag[selectedValue];
    return languageData;
}

// funkcija za prikaz random reci
function displayWord() {
    randomWord = getRandomWord();
    currentWord.value = randomWord.word;
}

// funkcija za prikaz notifikacije na ekranu
function showNotification(isCorrect) {
    notification.style.setProperty(`display`, `block`, `important`);
    notification.style.setProperty(`opacity`, `100%`, `important`);

    notification.textContent = isCorrect ? `Tačno!` : `Netačno!`;

    setTimeout(notification.style.setProperty(`opacity`, `0%`, `important`), 1000);
}

// funkcija za proveru prevoda
function checkTranslation() {
    // funkcija za rukovanje tacnih odgovora
    function handleCorrectAnswer() {
        correctWords.push(randomWord);

        userInput.value = ``;
        userInput.placeholder = ``;

        showNotification(true);

        displayWord();
    }

    // funkcija za rukovanje netacnih odgovora
    function handleIncorrectAnswer() {
        userInput.value = ``;

        showNotification(false);

        getSynonym();
    }

    // funkcija za dobijanje sinonima
    function getSynonym() {
        userInput.placeholder = randomWord.synonym[currentSynonymIndex]; // definisao globalno currentSynonymIndex = 0 kako bismo uvek dobili prvi sinonim

        currentSynonymIndex++;

        if (currentSynonymIndex >= randomWord.synonym.length) {
            currentSynonymIndex = 0;
        }
    }

    if (userInput.value.toLowerCase() === randomWord.translation.toLowerCase())
    {
        handleCorrectAnswer();
    }
    else {
        handleIncorrectAnswer();
    }
}

// funkcija preskace reci
function skipWord() {
    skippedWords.push(randomWord); // dodajemo preskocenu rec u niz
    displayWord();
}

// funkcija za prikaz rezultata
function displayResults(words, listID, headingID) {
    const listElement = document.getElementById(listID);
    const headingElement = document.getElementById(headingID);

    listElement.innerHTML = ``; // cistimo sadrzaj elementa

    // proveravamo da li postoji rec za prikaz
    if (words.length === 0) {
        // sakrivamo listu i naslov ako nema reci
        listElement.classList.add(`hidden`);
        headingElement.classList.add(`hidden`);
    } else {
        listElement.classList.remove(`hidden`);
        headingElement.classList.remove(`hidden`);

        // dodajemo svaku rec u listu
        words.forEach((item) => {
            const listItem = document.createElement(`li`);

            listItem.textContent = `${item.word} - ${item.translation}`;

            listElement.appendChild(listItem);
        });
    }
}

// funkcija za dobijanje random elementa iz liste reci
function getRandomWord() {
    // biramo random index i uklanjamo rec iz liste
    function getRandomElement(language) {
        let randomIndex = Math.floor(Math.random() * wordsList[language].length);
        let removedWord = wordsList[language].splice(randomIndex, 1);

        return removedWord[0]; // vracamo element koji smo splice-ovali kao nov niz
    }

    // proveravamo i resetujemo listu reci ako je prazna
    function checkAndResetList(language) {
        if (wordsList[language].length === 0) {
            resetList();
        }
    }

    // dobijamo jezik sa kojim hocemo da radimo
    let language = setLanguage();

    // proveravamo i resetujemo listu reci ako je potrebno
    checkAndResetList(language)
    
    return getRandomElement(language);
}

// postavljamo custom validaciju na input element-u
function customUserInputValidation() {
    function validateUserInput() {
        if (userInput.value.trim() === ``) {
            userInput.setCustomValidity(`Unesite vaš odgovor ovde`);
        }
        else {
            userInput.setCustomValidity(``);
        }
    }

    userInput.addEventListener(`input`, validateUserInput);
    userInput.addEventListener(`keydown`, validateUserInput);
    userInput.addEventListener(`focus`, validateUserInput);
}

// funkcija za ciscenje globalnih listi correct i skipped words
function resetKnownAndUnknownList(listID, headingID) {
    const listElement = document.getElementById(listID);
    const headingElement = document.getElementById(headingID);

    listElement.innerHTML = ``;
    headingElement.classList.add(`hidden`); // dodajemo hidden style, zato sto ne zelimo da brisemo content iz heading-a

    correctWords.length = 0; // umesto da dodeljujemo nove prazne nizove, koristicemo length da ocistimo nizove. Efikasnije je jer ne stvara nove objekte
    skippedWords.length = 0;
}

function initialize() {
    displayWord(); // default-no prikazuje Engleski jezik sa nasumicnom reci kada ucitamo stranicu

    customUserInputValidation();
}

function resetDisplayLists() {
    resetKnownAndUnknownList(`known-words-list`, `header-known-words`);
    resetKnownAndUnknownList(`unknown-words-list`, `header-unknown-words`);
    setFlagImage();
    displayWord();
}

function displayAllResult() {
    displayResults(correctWords, `known-words-list`, `header-known-words`);
    displayResults(skippedWords, `unknown-words-list`, `header-unknown-words`);
}

function resetList() {
    wordsList = {
        english: [
            { word: `Apple`, translation: `Jabuka`, synonym: [`plod`, `voće`] },
            { word: `Book`, translation: `Knjiga`, synonym: [`priručnik`, `udžbenik`] },
            { word: `Chair`, translation: `Stolica`, synonym: [`sedište`, `klupa`] },
            { word: `Tree`, translation: `Drvo`, synonym: [`stablo`, `grana`] },
            { word: `Car`, translation: `Auto`, synonym: [`vozilo`, `cetvorotočkaš`] },
        ],
    
        spanish: [
            { word: `Manzana`, translation: `Jabuka`, synonym: [`plod`, `voće`] },
            { word: `Libro`, translation: `Knjiga`, synonym: [`priručnik`, `udžbenik`] },
            { word: `Silla`, translation: `Stolica`, synonym: [`sedište`, `klupa`] },
            { word: `Árbolo`, translation: `Drvo`, synonym: [`stablo`, `grana`] },
            { word: `Coche`, translation: `Auto`, synonym: [`vozilo`, `cetvorotočkaš`] },
        ],
    
        french: [
            { word: `Pomme`, translation: `Jabuka`, synonym: [`plod`, `voće`] },
            { word: `Livre`, translation: `Knjiga`, synonym: [`priručnik`, `udžbenik`] },
            { word: `Chaise`, translation: `Stolica`, synonym: [`sedište`, `klupa`] },
            { word: `Arbre`, translation: `Drvo`, synonym: [`stablo`, `grana`] },
            { word: `Voiture`, translation: `Auto`, synonym: [`vozilo`, `cetvorotočkaš`] },
        ],
    
        german: [
            { word: `Apfel`, translation: `Jabuka`, synonym: [`plod`, `voće`] },
            { word: `Buch`, translation: `Knjiga`, synonym: [`priručnik`, `udžbenik`] },
            { word: `Stuhl`, translation: `Stolica`, synonym: [`sedište`, `klupa`] },
            { word: `Baum`, translation: `Drvo`, synonym: [`stablo`, `grana`] },
            { word: `Auto`, translation: `Auto`, synonym: [`vozilo`, `cetvorotočkaš`] },
        ],
    };
}