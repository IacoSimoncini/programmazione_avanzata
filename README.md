# Programmazione Avanzata A.A. 2021/2022
Realizzazione di un back-end tramite l'utilizzo di:
* Node.JS
* Express
* Sequelize
* Postgres (DB)

## Obiettivo del progetto
L'obiettivo del progetto è la realizzazione di un sistema che consenta di gestire il noleggio di veicoli elettrici. In particolare si è realizzato il back-end per gestire chiamate GET e POST per:
* Ottenere la lista dei veicoli disponibili (di 4 tipologie: Bicicletta, bicicletta elettrica, monopattino elettrico e tandem)
* Effettuare il noleggio specificando l'id del veicolo scelto
* Effettuare la chiusura (fine) del noleggio con fatturazione che considera: tempo trascorso, tariffa del noleggio e un fattore moltiplicativo se il veicolo non risulta entro un raggio di 50 metri da un parcheggio
 * Restituire la lista delle aree di parcheggio
 * Restituire il credito residuo dell'utente
 * Resistituire l'elenco dei noleggi effettuati 
        
## Progettazione
### Diagrammi UML
#### Diagramma dei casi d'uso

![PA-Use-Case drawio (1)](https://user-images.githubusercontent.com/86098337/173370724-9d58c25b-bd64-47ca-b231-27aefdb38671.png)


Il diagramma dei casi d'uso rappresenta l'intero back-end. Al suo interno sono stati raggruppati i casi d'uso in quattro categorie:
* Utenti
* Veicoli
* Noleggi
* Parcheggi

Ogni categoria ha associato un relativo file per le rotte e per i controller che gestiscono la logica dell'applicazione.

#### Diagramma delle classi

![PA-ClassDiagram drawio](https://user-images.githubusercontent.com/86098337/173370368-b1bfeb82-fa83-4a95-866e-fef0bfb2a081.png)


## Avvio del progetto mediante docker-compose
Per avviare il progetto è necessario seguire i seguenti step:
### Clonare la repository:
Da terminale eseguire:

```bash
git clone https://github.com/IacoSimoncini/programmazione_avanzata.git
```
### Posizionarsi nella cartella chiamata "app":
```bash
cd programmazione_avanzata
cd app
```
### Avvio di docker-compose
Nella cartella app eseguire: 
```bash
docker-compose up
```
### Start del backend
Aprire un nuovo terminale e avviare il conteiner del backend tramite:
```bash
docker start ProgPa_Backend
```
Avviare il seed del database:
```bash
docker exec ProgPa_Backend npm run seed
```
Fine della fase di avvio.

## Test del progetto

Per effettuare i test sul funzionamento dell'applicazione è possibile eseguire, tramite Postman, le chiamate GET e POST reperibili tramite il seguente link:
https://www.getpostman.com/collections/a2d441399d8ff8a5a892.

Dall'app di Postman è necessario andare nell'ambiente "My Workspace" e clickare su import, andare nella sezione "link" e incollare l'url sopra scritto.
Le varie richieste sono organizzate per tipologia, basta selezionarne una e premere "Send".
