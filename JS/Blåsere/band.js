/*
    Pseudokode
    shuffle sanger()
    display
    onclick n -> guess(n)
    if riktig:
        spill riktig lyd
        reset
    else:
        spill feil.mp3
        fjern n
*/
sanger = ["Vedlegg_V18/fagott.mp3", "Vedlegg_V18/floyte.mp3", "Vedlegg_V18/obo.mp3", "Vedlegg_V18/valthorn.mp3", "Vedlegg_V18/klarinett.mp3"];
bilder = ["Vedlegg_V18/fagott.jpg", "Vedlegg_V18/floyte.gif", "Vedlegg_V18/klarinett.jpg", "Vedlegg_V18/obo.jpg", "Vedlegg_V18/valthorn.jpg"];
score = 5;
forsøk = 0;
shuffle(sanger);
var riktig_sang = sanger[0];
shuffle(bilder);
display();

function display() {
    for (var i = 1; i <= sanger.length; i++) {
        document.getElementById(String(i)).style.background = "url(" + bilder[i - 1] + ")";
        document.getElementById(String(i)).style.display = "unset";
    }
    update_score();
}


function fjern(n) {
    document.getElementById(n + 1).style.display = "none";
}

function update_score() {
    if (score == 0) {
        document.getElementById("poeng").innerHTML = "<b>Du vinner !!!!!!!  Du gjettet alle instrumentene på " + forsøk + " forsøk</b>";
    } else {
        document.getElementById("poeng").innerHTML = "<b>" + String(score) + " Instrumenter igjen</b>";
    }

}

function shuffle(array) { //For å få tilfeldig array
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Set opp audio objekter
var audio = new Audio(riktig_sang);
var riktig = new Audio("Vedlegg_V18/riktig.mp3");
var feil = new Audio("Vedlegg_V18/feil.mp3");

function lyd() {
    audio.play();
}

function guess(n) {
    forsøk++;
    gjettet_sang = bilder[n].slice(0, -3) + "mp3";
    if (gjettet_sang == riktig_sang) {
        riktig.play();
        score--;
        reset();
    } else {
        feil.play();
        alert('feil!!!');
        fjern(n);
    }
}

function reset() {
    sanger = sanger.splice(1); //skal være 1 isteden
    riktig_sang = sanger[0];
    display();
    audio = new Audio(riktig_sang);
}