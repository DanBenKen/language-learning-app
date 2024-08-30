// zelimo da se nasi event listeneri okidaju samo ako su svi elementi potpuno ucitani pre nego sto krenemo da manipulisemo sa njima
document.addEventListener(`DOMContentLoaded`, function() {
    initialize(); // obavestavmo korisnika da mora da unese nesto kako bih mogao da submituje

    // menjamo prikaz odmah kako korisnik promeni jezik u selectu
    languageSelect.addEventListener(`change`, resetDisplayLists);

    // dugme za proveru
    checkBtn.addEventListener(`submit`, function (event) {
        event.preventDefault();
        checkTranslation();
    });

    // za preskaknje reci
    skipBtn.addEventListener(`click`, skipWord);
    
    // prikaz poznatih i nepoznatih reci
    resultsBtn.addEventListener(`click`, displayAllResult);
});