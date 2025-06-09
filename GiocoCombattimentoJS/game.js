// Variabile globale per la gestione dei turni
let turno = 0; // 1 = primo player, 2 = secondo player
// Caratteristiche dei player
const player1 = {
    Hp: 100,
    dif : false, // Difesa non attiva
};
const player2 = {
    Hp: 100,
    dif : false, // Difesa non attiva
};
// Turno
function Turn(){
    document.getElementById('att').hidden = false; // Mostra il bottone attacco
    document.getElementById('dif').hidden = false; // Mostra il bottone difesa
    document.getElementById('turnButton').hidden = true; // Nasconde il bottone del turno
    document.getElementById('turnWho').style.fontSize = "200%"; // Dimensione del testo
    const random = Math.floor(Math.random() * 2) + 1;
    turno = random;
    let stato = ""; // Stato dell'azione
    if ( random == 1 )
    {
        document.getElementById('turnWho').innerHTML = "Turno del primo player";
        document.getElementById('turnWho').style.color = "blue";
    }
    else{
        document.getElementById('turnWho').innerHTML = "Turno del secondo player";
        document.getElementById('turnWho').style.color = "yellow";
    }
    coloreTurno(); // Colore del turno attuale
    sceltaArmaPlayer(stato); // Scelta dell'arma del player
}
// Gioco, conseguenze del attacco e della difesa
function btnAttacco()
{    
    danno = Math.floor(Math.random() * 20) + 1; // Danno casuale tra 1 e 20
    let stato = "attacco"; // Stato dell'azione
    let dimezzatiStr = "";
    let turnoAzione = turno; // Salva il turno attuale per la visualizzazione
    if(turno == 1) // Primo player
    {
        if(player2.dif) // Se il secondo player ha attivato la difesa
        {
            dannoDimezzato = Math.floor(danno / 2); // Danno dimezzato
            player2.Hp -= dannoDimezzato; // Danno dimezzato
            player2.dif = false; // Difesa disattivata
            dimezzatiStr = "dimezzati";
            danno = dannoDimezzato; // Danno da visualizzare
        }
        else
        {
            dimezzatiStr = "";
            player2.Hp -= danno;
        }
        document.getElementById('turnWho').innerHTML = "Turno del secondo player";
        turno = 2;
        document.getElementById('turnWho').style.color = "yellow";
        document.getElementById('live').innerHTML = "Il primo giocatore ha attaccato il secondo giocatore, infliggendo "+danno+" danni "+dimezzatiStr+" !";
    }
    else // Secondo player
    {
        if(player1.dif) // Se il primo player ha attivato la difesa
        {
            dannoDimezzato = Math.floor(danno / 2); // Danno dimezzato
            player1.Hp -= dannoDimezzato; // Danno dimezzato
            player1.dif = false; // Difesa disattivata
            dimezzatiStr = "dimezzati";
            danno = dannoDimezzato; // Danno da visualizzare
        }
        else
        {
            dimezzatiStr = "";
            player1.Hp -= danno;
        }
        document.getElementById('turnWho').innerHTML = "Turno del primo player";
        turno = 1;
        document.getElementById('turnWho').style.color = "blue";
        document.getElementById('live').innerHTML = "Il secondo giocatore ha attaccato il primo giocatore, infliggendo "+danno+" danni "+dimezzatiStr+" !";
    }
    sceltaArmaPlayer(stato, turnoAzione); // Scelta dell'arma del player
    coloreTurno(); // Colore del turno attuale
    vitaDinamica(); // Aggiorna la vita dinamica dei player
    Vittoria(danno); // Controlla se uno dei due player ha vinto
}
function btnDifendi(){
    let stato = "difesa"; // Stato dell'azione
    let turnoAzione = turno; // Salva il turno attuale per la visualizzazione
    if(turno == 1) // Primo player
    {
        player1.dif = true; // Difesa attivata
        document.getElementById('live').innerHTML = "Il primo giocatore ha scelto di difendersi!";
        
        document.getElementById('turnWho').innerHTML = "Turno del secondo player";
        turno = 2;
        document.getElementById('turnWho').style.color = "yellow";
    }
    else // Secondo player
    {
        player2.dif = true; // Difesa attivata
        document.getElementById('live').innerHTML = "Il secondo giocatore ha scelto di difendersi!";
        
        document.getElementById('turnWho').innerHTML = "Turno del primo player";
        turno = 1;
        document.getElementById('turnWho').style.color = "blue";
    }
    sceltaArmaPlayer(stato, turnoAzione); // Scelta dell'arma del player
    coloreTurno(); // Colore del turno attuale
}
// Vittoria e creazione button e iniziare una nuova partita
function Vittoria(danno)
{
    if (player1.Hp <= 0)
    {
        alert("Il secondo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!");
        // Visualizza il messaggio di vittoria
        document.getElementById('live').innerHTML = "Il secondo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!";
        document.getElementById('live').style.color = "yellow"; // Colore del testo della vittoria
        document.getElementById('live').style.fontSize = "30px"; // Dimensione del testo della vittoria
        document.getElementById('live').style.height = "80%"; // Altezza del testo della vittoria
        document.getElementById('live').style.transition = "color 0.5s ease, font-size 0.5s ease"; // Transizione del testo della vittoria
        // Nasconde il turno e i bottoni di attacco e difesa
        document.getElementById('turn').hidden = true; // Nasconde il turno
        document.getElementById('att').hidden = true; // Nasconde il bottone attacco
        document.getElementById('dif').hidden = true; // Nasconde il bottone difesa
        // Immagine del player1 sconfitto
        const player1Div = document.getElementById('player1');
        const player1Sconfitto = document.createElement('img');
        player1Sconfitto.src = "immagini/bluSconfitto.png"; // Immagine dello stato di sconfitta del primo player
        player1Sconfitto.alt = "Sconfitta del primo player";
        player1Div.innerHTML = ""; // Pulisce il div del primo player
        player1Div.appendChild(player1Sconfitto);
        // Crea il bottone per iniziare una nuova partita
        const bottone = document.createElement('button');
        bottone.style.backgroundColor = "yellow"; // Colore del bottone
        bottone.innerHTML = "Inizia una nuova partita";

        bottone.addEventListener('click', function() {location.reload()}); // Ricarica la pagina per iniziare una nuova partita
        // Aggiunge il bottone al div con id btnRestart
        document.getElementById('btnRestart').appendChild(bottone);
    }
    else if (player2.Hp <= 0)
    {
        alert("Il primo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!");
        // Visualizza il messaggio di vittoria
        document.getElementById('live').innerHTML = "Il primo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!";
        document.getElementById('live').style.color = "blue"; // Colore del testo della vittoria
        document.getElementById('live').style.fontSize = "30px"; // Dimensione del testo della vittoria
        document.getElementById('live').style.height = "80%" // Altezza del testo della vittoria
        document.getElementById('live').style.transition = "color 0.5s ease, font-size 0.5s ease"; // Transizione del testo della vittoria
        // Nasconde il turno e i bottoni di attacco e difesa
        document.getElementById('turn').hidden = true; // Nasconde il turno
        document.getElementById('att').hidden = true; // Nasconde il bottone attacco
        document.getElementById('dif').hidden = true; // Nasconde il bottone difesa
        // Immagine del player2 sconfitto
        const player2Div = document.getElementById('player2');
        const player2Sconfitto = document.createElement('img');
        player2Sconfitto.src = "immagini/gialloSconfitto.png"; // Immagine dello stato di sconfitta del secondo player
        player2Sconfitto.alt = "Sconfitta del secondo player";
        player2Div.innerHTML = ""; // Pulisce il div del secondo player
        player2Div.appendChild(player2Sconfitto);
        // Crea il bottone per iniziare una nuova partita
        const bottone = document.createElement('button');
        bottone.style.backgroundColor = "blue"; // Colore del bottone
        bottone.style.color = "white"; // Colore del testo del bottone
        bottone.innerHTML = "Inizia una nuova partita";
    
        bottone.addEventListener('click', function() {location.reload()}); // Ricarica la pagina per iniziare una nuova partita
        // Aggiunge il bottone al div con id btnRestart
        document.getElementById('btnRestart').appendChild(bottone);
    }
}
// Visualisazione della vita restante dei player da ProgressBar
function vitaDinamica()
{
    document.getElementById('hpBar1').style.width = player1.Hp + '%';
    document.getElementById('vita1').innerHTML = player1.Hp + 'hp';
    document.getElementById('hpBar2').style.width = player2.Hp + '%';
    document.getElementById('vita2').innerHTML = player2.Hp + 'hp';
}
// Visualizzazione in colori del turno attuale
function coloreTurno()
{
    if(turno == 1) // Primo player
    {
        document.getElementById('live').style.color = "blue";

        document.getElementById('att').style.backgroundColor = "blue";
        document.getElementById('att').style.color = "white";

        document.getElementById('dif').style.backgroundColor = "blue";
        document.getElementById('dif').style.color = "white";
    }
    else // Secondo player
    {
        document.getElementById('live').style.color = "yellow";

        document.getElementById('att').style.backgroundColor = "yellow";
        document.getElementById('att').style.color = "black";

        document.getElementById('dif').style.backgroundColor = "yellow";
        document.getElementById('dif').style.color = "black";
    }
}
// Inizio del gioco, nasconde il bottone di attacco e difesa
function startGame() 
{
    document.getElementById('att').hidden = true; // Non mostra il bottone attacco
    document.getElementById('dif').hidden = true; // Non mostra il bottone difesa
    const intro = document.getElementById('introScreen');
    intro.classList.add('fade-out');
}
// Scelta in colori dellle armi e degli scudi dei player
function sceltaArmaPlayer(stato, turnoAzione)
{
    let statoPersonaggio = stato; // Stato dell'azione del player
    // Crea i div per le armi e gli scudi
    const divArmi = document.getElementById('att');
    const divScudi = document.getElementById('dif');

    // Crea le immagini delle armi e degli scudi per il primo player
    const player1Arma = document.createElement('img');
    player1Arma.src = "immagini/spadaBlu.png";
    player1Arma.alt = "Spada Blu";
    player1Arma.style.transform = "rotate(45deg)";
    const player1Scudo = document.createElement('img');
    player1Scudo.src = "immagini/scudoBlu.png";
    player1Scudo.alt = "Scudo Blu";

    // Crea le immagini delle armi e degli scudi per il secondo player
    const player2Arma = document.createElement('img');
    player2Arma.src = "immagini/spadaGialla.png";
    player2Arma.alt = "Spada Gialla";
    player2Arma.style.transform = "rotate(45deg)";
    const player2Scudo = document.createElement('img');
    player2Scudo.src = "immagini/scudoGiallo.png";
    player2Scudo.alt = "Scudo Giallo";

    if(turno == 1) // Primo player dopo aver fatto la azione
    {
        divArmi.innerHTML = ""; // Pulisce il div delle armi
        divScudi.innerHTML = ""; // Pulisce il div degli scudi
        divArmi.appendChild(player1Arma);
        divScudi.appendChild(player1Scudo);
        if(statoPersonaggio !== "") // Se lo stato del personaggio non è vuoto
        {
            azionePlayer(turnoAzione, statoPersonaggio); // Crea l'immagine per l'azione del primo player
        }
    }
    else // Secondo player dopo aver fatto la azione
    {
        divArmi.innerHTML = ""; // Pulisce il div delle armi    
        divScudi.innerHTML = ""; // Pulisce il div degli scudi
        divArmi.appendChild(player2Arma);
        divScudi.appendChild(player2Scudo);

        if(statoPersonaggio !== "") // Se lo stato non è vuoto
        {
            azionePlayer(turnoAzione, statoPersonaggio); // Crea l'immagine per l'azione del secondo player
        }
    }
}
function azionePlayer(turnoAzione, statoPersonaggio)
{
    if(turnoAzione == 1) // Primo player
    {
        // Crea l'immagine per lo stato del primo player
        const player1Div = document.getElementById('player1');
        const player1Stato = document.createElement('img');
    
        player1Div.innerHTML = ""; // Pulisce il div del primo player
        
        if(statoPersonaggio === "attacco") {
            player1Stato.src = "immagini/stickmanBluSpada.png"; // Immagine dello stato di attacco del primo player
            player1Stato.alt = "Attacco del primo player";
        } 
        else{ // Stato di difesa
            player1Stato.src = "immagini/bluStickmanScudo.png"; // Immagine dello stato di difesa del primo player
            player1Stato.alt = "Difesa del primo player";
        }
        player1Div.appendChild(player1Stato);
    }
    else // Secondo player
    {
        // Crea l'immagine per lo stato del secondo player
        const player2Div = document.getElementById('player2');
        const player2Stato = document.createElement('img');

        player2Div.innerHTML = ""; // Pulisce il div del secondo player

        if(statoPersonaggio === "attacco") {
            player2Stato.src = "immagini/stickmanGialloSpada.png"; // Immagine dello stato di attacco del secondo player
            player2Stato.alt = "Attacco del secondo player";
        } 
        else{ // Stato di difesa
            player2Stato.src = "immagini/gialloStickmanScudo.png"; // Immagine dello stato di difesa del secondo player
            player2Stato.alt = "Difesa del secondo player";
        }
        player2Div.appendChild(player2Stato);
    }
}