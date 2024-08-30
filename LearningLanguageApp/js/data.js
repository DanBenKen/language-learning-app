let wordsList = {
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

// mapiranje za jezike i zastave
let languagesAndFlag = {
    '1': { language: `english`, flagSrc: `images/united-kingdom.png` },
    '2': { language: `spanish`, flagSrc: `images/spain.png` },
    '3': { language: `french`, flagSrc: `images/france.png` },
    '4': { language: `german`, flagSrc: `images/germany.png` },
};