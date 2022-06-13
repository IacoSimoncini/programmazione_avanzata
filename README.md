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

Ogni categoria ha associato un file per le rotte e per i controller che gestiscono la logica dell'applicazione.

#### Diagramma delle classi

![PA-ClassDiagram drawio (1)](https://user-images.githubusercontent.com/86098337/173373597-c8db4860-4334-4341-a294-8400f6f3dc98.png)

Ogni classe è associata a una tabella. Le relazioni tra le classi presentano inoltre la cardinalità.
Un utente semplice (non admin) può essere associato a un veicolo per volta, viceversa un veicolo specifico può essere associato al massimo a un utente per volta. L'utente può essere legato a un noleggio per volta, terminato un noleggio può avviarne un altro, di consequenza la cardinalità massima è N. Viceversa il singolo noleggio è univocamente associato a un utente specifico, tramite l'email. Vale lo stesso per la relazione veicolo noleggio.
### Design Pattern
Al fine di separare le varie funzionalità del back-end si è scelto di seguire il pattern MVC (Model View Controller). Per quanto riguarda il modello, esso gestisce i dati, la logica e le regole dell'applicazione. Il controller riceve i comandi, tramite le rotte, e reagisce eseguendo le operazioni desiderate. La View rappresenta i dati in output del sistema, che in questo progetto non è previsto, ma che è implementabile in futuro. I vantaggi che ci hanno spinto a scegliere il pattern MVC sono legate all'indipendenza delle varie componenti che permette di organizzare il lavoro, flessibilità dal database in caso sia necessario modificare il modello, la possibilità di avere un controller separatamente rende possibile concentrarsi sulla logica del funzionamento.
Nello specifico il modello gestisce le classi di utenti, veicoli, noleggi e parcheggi. I modelli sono scritti in TypeScript per garantire il legame stretto con il tipo di dato. Inoltre si è utlizzato il modulo sequelize per la gestione del database in Postgres.
Per quanto riguarda il controller, anch'esso è gestito in quattro file relativi a utenti, veicoli, noleggi e parcheggi. Ogni file del controller presenta delle funzioni che prendono in input una request e restituiscono una response. In particolare il controller dell'utente ha funzioni per: creazione di un nuovo utente (create), restituzione del credito dell'utente (credit) e aggiornamento del credito (updateCredit). Quello relativo ai veicoli: creazione di un veicolo (create), lista dei veicoli disponibili (listAvailable), filtraggio dei veicoli (filterVehicles). Il noleggo: start del noleggio (start), stop del noleggio (stop) e restituzione dei noleggi effettuati (done). I parcheggi: creazione e restituzione delle aree di parcheggio.

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
https://www.getpostman.com/collections/a2d441399d8ff8a5a892

Dall'app di Postman è necessario andare nell'ambiente "My Workspace" e clickare su import, andare nella sezione "link" e incollare l'url sopra scritto.
Le varie richieste sono organizzate per tipologia, basta selezionarne una e premere "Send".

Una volta importate le rotte è possibile testarle con Postman, inoltre il token jwt è già presente nell'header. 

In caso servissero i token JWT generati sono i seguenti:
Utente 1: 
```bash
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQcm9nUGEiLCJpYXQiOjE2NTQ4NzI0NTksImV4cCI6MTY4NjQwODQ2MSwiYXVkIjoid3d3LnByb2dwYS5jb20iLCJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0.8ImqkqNGaLxpzbzlVwGbapV8WOyGiYg4iqFvVfQwicc
```
Utente 2:
```bash
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQcm9nUGEiLCJpYXQiOjE2NTQ4NzI0NTksImV4cCI6MTY4NjQwODQ2MSwiYXVkIjoid3d3LnByb2dwYS5jb20iLCJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJlbWFpbCI6InVzZXIyQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0.pTdQFz8t1_wAawyXCyRZyqIRJ2D8foaY_CwsTUQFrFc
```
Utente 3: 
```bash
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQcm9nUGEiLCJpYXQiOjE2NTQ4NzI0NTksImV4cCI6MTY4NjQwODQ2MSwiYXVkIjoid3d3LnByb2dwYS5jb20iLCJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJlbWFpbCI6InVzZXIzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0.9_bnGaDsDDj022j2AnyrBbojy1HKbHRlcfSoWgLZY0g
```
Admin
```bash
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQcm9nUGEiLCJpYXQiOjE2NTQ4NzI0NTksImV4cCI6MTY4NjQwODQ2MSwiYXVkIjoid3d3LnByb2dwYS5jb20iLCJzdWIiOiJ1c2VyMUBnbWFpbC5jb20iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.y8pdcfHTQX9VWiLr2iY4w3VPfqCc5GAR6kv0NFVmiJY
```
User expired:
```bash
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQcm9nUGEiLCJpYXQiOjE2NTQ4NzI0NTksImV4cCI6MTY1NDg3MjQ2MCwiYXVkIjoid3d3LnByb2dwYS5jb20iLCJzdWIiOiJ1c2VyX3NiYWdsaWF0b0BnbWFpbC5jb20iLCJlbWFpbCI6InVzZXJfc2JhZ2xpYXRvQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0.681EaapwkkaYHHhILhTZARZD-pP69vkp7Ft3eBm12x0
```
User credito minore di 0:
```bash
Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQcm9nUGEiLCJpYXQiOjE2NTQ4NzI0NTksImV4cCI6MTY1NDg3MjQ2MCwiYXVkIjoid3d3LnByb2dwYS5jb20iLCJzdWIiOiJ1ZXJzX2NyZWRpdG9fbm90X3N1ZmZAZ21haWwuY29tIiwiZW1haWwiOiJ1ZXJzX2NyZWRpdG9fbm90X3N1ZmZAZ21haWwuY29tIiwicm9sZSI6InVzZXIifQ.ZHEzZ-JO29D_TqR_ME2Xub1cyaPaEHC0qqV-ZrJlMws
```
### Esempi di test effettuati
