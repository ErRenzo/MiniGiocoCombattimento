// Variabili globali, vita totale e difesa attiva, gestione turni
var unaSceltaTurno = 0;
var turno = 0;
var player1Hp = 100;
var player2Hp = 100;
var dif1 = false;
var dif2 = false;
// Turno
function Turn(){
    if(unaSceltaTurno == 0)
    {
        const random = Math.floor(Math.random() * 2) + 1;
        turno = random;
        if ( random == 1 )
        {
            document.getElementById('turnWho').innerHTML = "Turno del primo player";
            document.getElementById('turnWho').style.color = "blue";
        }
        else{
            document.getElementById('turnWho').innerHTML = "Turno del secondo player";
            document.getElementById('turnWho').style.color = "yellow";
        }
    }
    else{
        alert("Il turno è già stato scelto");
    }
    unaSceltaTurno++;
}
// Gioco, conseguenze del attacco e della difesa
function btnAttacco1(){
    if(turno == 1 && turno != 0)
    {
        document.getElementById('turnWho').innerHTML = "Turno del secondo player";
        document.getElementById('turnWho').style.color = "yellow";
        document.getElementById('live').innerHTML = "Il primo giocatore ha attaccato";
        document.getElementById('live').style.color = "blue";
        let danno
        do{
            danno = Math.floor(Math.random() * 20);
        }
        while(danno == 0)
        if (dif2 == true)
        {
            document.getElementById('dmg').innerHTML = "Il primo giocatore ha inflitto danni dimezzati " + danno * 0.5 + " danni";
            document.getElementById('dmg').style.color = "blue";
        }
        else{
            document.getElementById('dmg').innerHTML = "Il primo giocatore ha inflitto " + danno + " danni al avversario";
            document.getElementById('dmg').style.color = "blue";
        }
    
        player2Hp -= danno;
        document.getElementById('hp').innerHTML = "Al secondo giocatore restano " + player2Hp + " hp";
        document.getElementById('hp').style.color = "yellow";
        vitaDinamica();
        Vittoria(danno);
        turno = 2;
    }
    else if(turno == 0)
    {
        alert("Scegliere il turno prima di giocare!");
    }
    else{
        alert("È il turno del secondo giocatore...");
    }
}

function btnAttacco2(){
    if(turno == 2 && turno != 0)
    {
        document.getElementById('turnWho').innerHTML = "Turno del primo player";
        document.getElementById('turnWho').style.color = "blue";
        document.getElementById('live').innerHTML = "Il secondo giocatore ha attaccato";
        document.getElementById('live').style.color = "yellow";
        let danno
        do{
            danno = Math.floor(Math.random() * 20);
        }
        while(danno == 0)
            
        if (dif1 == true)
        {
            document.getElementById('dmg').innerHTML = "Il secondo giocatore ha inflitto danni dimezzati " + (danno * 0.5) + " danni";
            document.getElementById('dmg').style.color = "yellow";
        }
        else{
            document.getElementById('dmg').innerHTML = "Il secondo giocatore ha inflitto " + danno + " danni al avversario";
            document.getElementById('dmg').style.color = "yellow";
        }
        player1Hp -= danno;
        document.getElementById('hp').innerHTML = "Al primo giocatore restano " + (player1Hp) + " hp";
        document.getElementById('hp').style.color = "blue";
        vitaDinamica();
        Vittoria(danno);
        turno = 1;
    }
    else if(turno == 0)
    {
        alert("Scegliere il turno prima di giocare!");
    }
    else{
        alert("È il turno del primo giocatore...");
    }
}

function btnDifendi1(){
    if(turno == 1 && turno != 0)
    {
        document.getElementById('turnWho').innerHTML = "Turno del secondo player";
        document.getElementById('turnWho').style.color = "yellow";
        document.getElementById('live').innerHTML = "Il primo giocatore ha scelto di difendersi, il prossimo attacco nemico sarà dimezzato";
        dif1 = true;
        turno = 2;
    }
    else if(turno == 0)
    {
        alert("Scegliere il turno prima di giocare!");
    }
    else{
        alert("È il turno del secondo giocatore...");
    }
}

function btnDifendi2(){
    if(turno == 2 && turno != 0)
    {
        document.getElementById('turnWho').innerHTML = "Turno del primo player";
        document.getElementById('turnWho').style.color = "blue";
        document.getElementById('live').innerHTML = "Il secondo giocatore ha scelto di difendersi, il prossimo attacco nemico sarà dimezzato";
        document.getElementById('live').style.color = "yellow";
        dif2 = true;
        turno = 1;
    }
    else if(turno == 0)
    {
            alert("Scegliere il turno prima di giocare!");
    }
    else{
        alert("È il turno del primo giocatore...");
    }
}
// Vittoria e creazione button e iniziare una nuova partita
function Vittoria(danno)
{
    if (player1Hp <= 0)
    {
        alert("Il secondo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!");
        const bottone = document.createElement('button');
        bottone.innerHTML = "Inizia una nuova partita";

        bottone.addEventListener('click', function() {location.reload()});

        document.getElementById('btnRestart').appendChild(bottone);
    }
    else if (player2Hp <= 0)
    {
        alert("Il primo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!");
        const bottone = document.createElement('button');
        bottone.innerHTML = "Inizia una nuova partita";
    
        bottone.addEventListener('click', function() {location.reload()});
    
        document.getElementById('btnRestart').appendChild(bottone);
    }
}
// Visualisazione della vita restante dei player da ProgressBar
function vitaDinamica()
{
    document.getElementById('hpBar1').style.width = player1Hp + '%';
    document.getElementById('vita1').innerHTML = player1Hp + 'hp';
    document.getElementById('hpBar2').style.width = player2Hp + '%';
    document.getElementById('vita2').innerHTML = player2Hp + 'hp';
}