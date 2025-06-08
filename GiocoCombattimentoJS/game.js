// Variabili globali, vita totale e difesa attiva, gestione turni
let turnoScelto = false;
let turno = 0; // 1 = primo player, 2 = secondo player
// Vita dei player, 100hp per entrambi i player
let player1Hp = 100;
let player2Hp = 100;
let dif1 = false;
let dif2 = false;
// Turno
function Turn(){
    document.getElementById('att').hidden = false; // Mostra il bottone attacco
    document.getElementById('dif').hidden = false; // Mostra il bottone difesa
    if(!turnoScelto)
    {
        stato = ""; // Nessuno stato inizialmente
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
        coloreTurno(); // Colore del turno attuale
        sceltaArmaPlayer(stato); // Scelta dell'arma del player
        turnoScelto = true;
    }
    else{ // Se il turno è già stato scelto
        alert("Il turno è già stato scelto");
    }
}
// Gioco, conseguenze del attacco e della difesa
function btnAttacco(){
    if(turnoScelto)
    {
        danno = Math.floor(Math.random() * 20) + 1; // Danno casuale tra 1 e 20
        dannoDimezzato = Math.floor(danno / 2); // Danno dimezzato
        stato = "attacco"; // Stato dell'azione
        let dimezzati = "";
        let turnoAzione = turno; // Salva il turno attuale per la visualizzazione
        if(turno == 1) // Primo player
        {
            if(dif2) // Se il secondo player ha attivato la difesa
            {
                player2Hp -= dannoDimezzato; // Danno dimezzato
                dif2 = false; // Difesa disattivata
                dimezzati = "dimezzati";
            }
            else
            {
                dimezzati = "";
                player2Hp -= danno;
            }
            document.getElementById('turnWho').innerHTML = "Turno del secondo player";
            turno = 2;
            document.getElementById('turnWho').style.color = "yellow";
            document.getElementById('live').innerHTML = "Il primo giocatore ha attaccato il secondo giocatore, infliggendo "+danno+" danni "+dimezzati+" !";
        }
        else // Secondo player
        {
            if(dif1) // Se il primo player ha attivato la difesa
            {
                player1Hp -= dannoDimezzato; // Danno dimezzato
                dif1 = false; // Difesa disattivata
                dimezzati = "dimezzati";
            }
            else
            {
                dimezzati = "";
                player1Hp -= danno;
            }
            document.getElementById('turnWho').innerHTML = "Turno del primo player";
            turno = 1;
            document.getElementById('turnWho').style.color = "blue";
            document.getElementById('live').innerHTML = "Il secondo giocatore ha attaccato il primo giocatore, infliggendo "+danno+" danni "+dimezzati+" !";
        }
        sceltaArmaPlayer(stato, turnoAzione); // Scelta dell'arma del player
        coloreTurno(); // Colore del turno attuale
        vitaDinamica(); // Aggiorna la vita dinamica dei player
        Vittoria(danno); // Controlla se uno dei due player ha vinto
    }
    else
    {
        alert("Scegliere il turno prima di giocare!");
    }
}
function btnDifendi(){
    if(turnoScelto)
    {
        stato = "difesa"; // Stato dell'azione
        let turnoAzione = turno; // Salva il turno attuale per la visualizzazione
        if(turno == 1) // Primo player
        {
            dif1 = true; // Difesa attivata
            document.getElementById('live').innerHTML = "Il primo giocatore ha scelto di difendersi!";
            
            document.getElementById('turnWho').innerHTML = "Turno del secondo player";
            turno = 2;
            document.getElementById('turnWho').style.color = "yellow";
        }
        else // Secondo player
        {
            dif2 = true; // Difesa attivata
            document.getElementById('live').innerHTML = "Il secondo giocatore ha scelto di difendersi!";
            
            document.getElementById('turnWho').innerHTML = "Turno del secondo player";
            turno = 1;
            document.getElementById('turnWho').style.color = "blue";
        }
        sceltaArmaPlayer(stato, turnoAzione); // Scelta dell'arma del player
        coloreTurno(); // Colore del turno attuale
    }
    else
    {
        alert("Scegliere il turno prima di giocare!");
    }
}
// Vittoria e creazione button e iniziare una nuova partita
function Vittoria(danno)
{
    if (player1Hp <= 0)
    {
        alert("Il secondo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!");
        document.getElementById('live').innerHTML = "Il secondo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!";
        document.getElementById('live').style.color = "yellow"; // Colore del testo della vittoria
        document.getElementById('live').style.fontSize = "30px"; // Dimensione del testo della vittoria
        document.getElementById('live').style.height = "80%"; // Altezza del testo della vittoria
        document.getElementById('live').style.transition = "color 0.5s ease, font-size 0.5s ease"; // Transizione del testo della vittoria
        document.getElementById('turn').hidden = true; // Nasconde il turno
        document.getElementById('att').hidden = true; // Nasconde il bottone attacco
        document.getElementById('dif').hidden = true; // Nasconde il bottone difesa
        const bottone = document.createElement('button');
        bottone.style.backgroundColor = "yellow"; // Colore del bottone
        bottone.innerHTML = "Inizia una nuova partita";

        bottone.addEventListener('click', function() {location.reload()}); // Ricarica la pagina per iniziare una nuova partita
        // Aggiunge il bottone al div con id btnRestart
        document.getElementById('btnRestart').appendChild(bottone);
    }
    else if (player2Hp <= 0)
    {
        alert("Il primo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!");
        document.getElementById('live').innerHTML = "Il primo giocatore ha vinto! Infliggendo al nemico " + danno + " danni!";
        document.getElementById('live').style.color = "blue"; // Colore del testo della vittoria
        document.getElementById('live').style.fontSize = "30px"; // Dimensione del testo della vittoria
        document.getElementById('live').style.height = "80%" // Altezza del testo della vittoria
        document.getElementById('live').style.transition = "color 0.5s ease, font-size 0.5s ease"; // Transizione del testo della vittoria
        document.getElementById('turn').hidden = true; // Nasconde il turno
        document.getElementById('att').hidden = true; // Nasconde il bottone attacco
        document.getElementById('dif').hidden = true; // Nasconde il bottone difesa
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
    document.getElementById('hpBar1').style.width = player1Hp + '%';
    document.getElementById('vita1').innerHTML = player1Hp + 'hp';
    document.getElementById('hpBar2').style.width = player2Hp + '%';
    document.getElementById('vita2').innerHTML = player2Hp + 'hp';
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

        document.getElementById('turnButton').style.backgroundColor = "blue";
        document.getElementById('turnButton').style.color = "white";
    }
    else // Secondo player
    {
        document.getElementById('live').style.color = "yellow";

        document.getElementById('att').style.backgroundColor = "yellow";
        document.getElementById('att').style.color = "black";

        document.getElementById('dif').style.backgroundColor = "yellow";
        document.getElementById('dif').style.color = "black";

        document.getElementById('turnButton').style.backgroundColor = "yellow";
        document.getElementById('turnButton').style.color = "black";
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
        if(stato !== "") // Se lo stato non è vuoto
        {
            azionePlayer(turnoAzione); // Crea l'immagine per l'azione del primo player
        }
    }
    else // Secondo player dopo aver fatto la azione
    {
        divArmi.innerHTML = ""; // Pulisce il div delle armi    
        divScudi.innerHTML = ""; // Pulisce il div degli scudi
        divArmi.appendChild(player2Arma);
        divScudi.appendChild(player2Scudo);

        if(stato !== "") // Se lo stato non è vuoto
        {
            azionePlayer(turnoAzione); // Crea l'immagine per l'azione del secondo player
        }
    }
}
function azionePlayer(turnoAzione)
{
    if(turnoAzione == 1) // Primo player
    {
        // Crea l'immagine per lo stato del primo player
        const player1Div = document.getElementById('player1');
        const player1Stato = document.createElement('img');
    
        player1Div.innerHTML = ""; // Pulisce il div del primo player
        
        if(stato === "attacco") {
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

        if(stato === "attacco") {
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