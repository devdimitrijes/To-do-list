const listaZadataka = document.getElementById('zadaci');

const dugmeBiranje = document.getElementById('BtnBiranje');
let stilListeZadataka = listaZadataka.style.listStyleType; //vraca string - naziv stila

let br = parseInt(localStorage.getItem('brojac')) || 1;

function Dodaj_Zadatak() {
    let promptUnetZadatak = prompt("Unesite novi zadatak"); //prompt vraca samo STRING!!!

    if (promptUnetZadatak !== null && promptUnetZadatak.trim() !== "") { //da li nista nije uneto (trim.() zbog razmaka) i da li je kliknuto Cancel (null)
        let datum;
        if (localStorage.length >= 3) {
        br++;
        }
        let trenutniID = br;
        Napravi_Li(promptUnetZadatak, datum, trenutniID); //NE ZNAM!!!!!!!!!!!!!!

        localStorage.setItem('brojac', br);
    }
}

function Napravi_Li(tekstZadatka, Datum, id) {
    let btnUkloni = document.createElement("button");
    btnUkloni.textContent = "Discard";
    btnUkloni.classList.add("Ukloni");

    let noviLi = document.createElement("li");
    noviLi.textContent = tekstZadatka;
    noviLi.classList.add('zadatak');
    listaZadataka.appendChild(noviLi); //Dodavanje elementa unutar nekog elementa

    noviLi.append(" ", btnUkloni); //Dodavanje razmaka i dugmeta (append())

    btnUkloni.addEventListener("click", function() {
        noviLi.remove();
        btnUkloni.remove();

        localStorage.removeItem('TekstZadatka' + id);
        localStorage.removeItem('Datum' + id);
        localStorage.removeItem('Stil' + id);
    });

    noviLi.addEventListener("click", function() {
        if(noviLi.style.textDecoration === "none") {
            noviLi.style.textDecoration = "line-through";
            localStorage.setItem('Stil' + id, noviLi.style.textDecoration);
        } else 
        {
            noviLi.style.textDecoration = "none";
            localStorage.setItem('Stil' + id, noviLi.style.textDecoration);
        }
    });

    Datum = new Date();
    let ispisDatuma = Datum.toLocaleString(); //toLocaleString() prikazuje lokalni datum i vreme

    noviLi.addEventListener("mouseover" , function(){

        let DivDatum = document.createElement("div");
        DivDatum.classList.add('DatumInfo');
        DivDatum.textContent = ispisDatuma;

        document.body.appendChild(DivDatum); // dodaj u body jer ima position: absolute

    let rect = noviLi.getBoundingClientRect(); //getBoundingClientRect() vraca poziciju elementa u odnosu na viewport
    DivDatum.style.left = (rect.left + window.scrollX - 100) + "px"; //offsetWidth meri sirinu elementa
    DivDatum.style.top = (rect.top + window.scrollY) + "px";
    //Zbog scroll-a, potrebno je i scrollX i scrollY sabrati, da ne bi div ostao na staroj poziciji
    });

    noviLi.addEventListener("mouseout", function() {
        document.querySelector('.DatumInfo').remove();
    });

    // LOCAL STORAGE
    
    localStorage.setItem('TekstZadatka' + id, tekstZadatka);
    localStorage.setItem('Datum' + id, ispisDatuma);
    localStorage.setItem('Stil' + id, noviLi.style.textDecoration);
}

function Biranje_Stila() {
    if(dugmeBiranje.textContent === "1.") 
    {
        listaZadataka.style.listStyleType = "decimal";
        stilListeZadataka = "decimal";
    }
        
    else if (dugmeBiranje.textContent === "•") 
    {
        listaZadataka.style.listStyleType = "disc";
        stilListeZadataka = "disc";
    }

    if (stilListeZadataka === "disc") dugmeBiranje.textContent = '1.';
    else if (stilListeZadataka === "decimal") dugmeBiranje.textContent = '•';
}

function display() {
    for (let i = 1; i <= br; i++) {
        let tekst = localStorage.getItem('TekstZadatka' + i);
        let datum = localStorage.getItem('Datum' + i);
        let stil = localStorage.getItem('Stil' + i);

        if (tekst && datum) {
            Napravi_Li_LS(tekst, datum, i, stil);
        }
    }
}

function Napravi_Li_LS(tekstZadatka, Datum, id, Stil) {
    let btnUkloni = document.createElement("button");
    btnUkloni.textContent = "Discard";
    btnUkloni.classList.add("Ukloni");

    let noviLi = document.createElement("li");
    noviLi.textContent = tekstZadatka;
    noviLi.classList.add('zadatak');
    listaZadataka.appendChild(noviLi);

    noviLi.append(" ", btnUkloni);

    btnUkloni.addEventListener("click", function() {
        noviLi.remove();
        btnUkloni.remove();

        localStorage.removeItem('TekstZadatka' + id);
        localStorage.removeItem('Datum' + id);
        localStorage.removeItem('Stil' + id);
    });

    noviLi.style.textDecoration = Stil;

    noviLi.addEventListener("click", function() {
        if(noviLi.style.textDecoration === "none") {
            noviLi.style.textDecoration = "line-through";
            localStorage.setItem('Stil' + id, noviLi.style.textDecoration);
        } else 
        {
            noviLi.style.textDecoration = "none";
            localStorage.setItem('Stil' + id, noviLi.style.textDecoration);
        }
    });

    let ispisDatuma = Datum; // Datum je već string, ne treba .toLocaleString()

    noviLi.addEventListener("mouseover", function() {
        let DivDatum = document.createElement("div");
        DivDatum.classList.add('DatumInfo');
        DivDatum.textContent = ispisDatuma;

        document.body.appendChild(DivDatum);

        let rect = noviLi.getBoundingClientRect();
        DivDatum.style.left = (rect.left + window.scrollX - 100) + "px";
        DivDatum.style.top = (rect.top + window.scrollY) + "px";
    });

    noviLi.addEventListener("mouseout", function() {
        document.querySelector('.DatumInfo').remove();
    });
}

display();