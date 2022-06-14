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

#### Diagramma delle sequenze


![PA-Diagramma Sequenze drawio (1)](https://user-images.githubusercontent.com/86098337/173559478-d5d62af7-7cf7-45d6-a3fb-44ee20dfa4cc.png)



### Design Pattern
Al fine di separare le varie funzionalità del back-end si è scelto di seguire il pattern MVC (Model View Controller). Per quanto riguarda il modello, esso gestisce i dati, la logica e le regole dell'applicazione. Il controller riceve i comandi, tramite le rotte, e reagisce eseguendo le operazioni desiderate. La View rappresenta i dati in output del sistema, che in questo progetto non è previsto, ma che è implementabile in futuro. I vantaggi che ci hanno spinto a scegliere il pattern MVC sono legate all'indipendenza delle varie componenti che permette di organizzare il lavoro, flessibilità dal database in caso sia necessario modificare il modello, la possibilità di avere un controller separatamente rende possibile concentrarsi sulla logica del funzionamento.
Nello specifico il modello gestisce le classi di utenti, veicoli, noleggi e parcheggi. I modelli sono scritti in TypeScript per garantire il legame stretto con il tipo di dato. Inoltre si è utlizzato il modulo sequelize per la gestione del database in Postgres.
Per quanto riguarda il controller, anch'esso è gestito in quattro file relativi a utenti, veicoli, noleggi e parcheggi. Ogni file del controller presenta delle funzioni che prendono in input una request e restituiscono una response. In particolare il controller dell'utente ha funzioni per: creazione di un nuovo utente (create), restituzione del credito dell'utente (credit) e aggiornamento del credito (updateCredit). Quello relativo ai veicoli: creazione di un veicolo (create), lista dei veicoli disponibili (listAvailable), filtraggio dei veicoli (filterVehicles). Il noleggo: start del noleggio (start), stop del noleggio (stop) e restituzione dei noleggi effettuati (done). I parcheggi: creazione e restituzione delle aree di parcheggio.

Sono state utilizzate le funzionalità di middleware per la gestione dell'autenticazione mediante token JWT e per la gestione di eventuali errori relativi alle rotte.

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

Dall'app di Postman è necessario andare nell'ambiente "My Workspace" e cliccare su import, andare nella sezione "link" e incollare l'url sopra scritto.
Le varie richieste sono organizzate per tipologia, basta selezionarne una e premere "Send" (il token JWT è già presente nell'header). 

I token JWT utilizzati sono i seguenti:


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
#### Creazione user 
![CreateUser](https://user-images.githubusercontent.com/86098337/173400396-e76b250c-c70b-4ade-a03c-9dd3aaa30dd5.PNG)
#### Creazione parcheggio
![creazione_parcheggio](https://user-images.githubusercontent.com/86098337/173400486-80c8ff3f-8f38-4d07-8ab3-d02b03ce5547.PNG)
#### Creazione veicolo
![creazione_veicolo](https://user-images.githubusercontent.com/86098337/173400546-74e23d20-bce7-4a39-bd40-409a24a848bd.PNG)
#### Noleggi effettuati
![done_rent](https://user-images.githubusercontent.com/86098337/173400586-c991ce42-0047-42c4-a2ee-122a28724632.PNG)
#### Restituzione credito utenti
![get_credit](https://user-images.githubusercontent.com/86098337/173401220-091b2a75-ff0d-4f36-ab94-38d658db93c1.PNG)
#### Lista dei parcheggi
![lista_parcheggi](https://user-images.githubusercontent.com/86098337/173401608-062ce982-af86-4115-8e56-fff8a8ecf84f.PNG)
#### Lista dei veicoli disponibili
![listAvailable_veicoli](https://user-images.githubusercontent.com/86098337/173401698-f852f3ab-14e5-4f72-9a18-23e541d0ea42.PNG)
#### Start noleggio
![start_rent](https://user-images.githubusercontent.com/86098337/173401857-bcb9ab7c-7a75-470c-839a-2df7b8129806.PNG)
#### Stop noleggio
![stop_rent](https://user-images.githubusercontent.com/86098337/173401901-f4855e51-d2dc-4aec-92b5-65f0c2b119e8.PNG)
#### Aggiornamento del credito 
![update_credit](https://user-images.githubusercontent.com/86098337/173401956-38469d03-de09-4198-80d0-dbd6c8290af9.PNG)


### Eccezioni 

#### Errore creazione utente con stessa mail
![errore_creazione_utente_con_stessa_mail](https://user-images.githubusercontent.com/86098337/173400688-6d1edb4f-be88-4885-9ae8-83609a76c45e.PNG)
#### Errore creazione utente parametro vuoto
![errore_creazione_utente_parametro_vuoto](https://user-images.githubusercontent.com/86098337/173400749-d8551f4e-2e71-4073-b077-7c28d866b456.PNG)
#### Errore latitudine longitudine in filtraggio veicoli
![errore_lat_long_filtro_Veicoli](https://user-images.githubusercontent.com/86098337/173400847-d6a4ce38-5d0c-409a-850c-e2b714207d9a.PNG)
#### Errore mancanza parametro su aggiornamento del credito di un utente
![errore_senza_parametro_update_credit](https://user-images.githubusercontent.com/86098337/173401094-f407fc7a-60df-4c36-ae1b-11479a8a6a4d.PNG)
#### Noleggio di un utente che già dispone di un noleggio attivo
![rent_utente_già_renting](https://user-images.githubusercontent.com/86098337/173401809-daeb2d49-c7f3-4499-af90-bc5678acb9a4.PNG)
#### Creazione veicolo di con tipo invalido
![invalid_type_creazione_veicolo](https://user-images.githubusercontent.com/86098337/173401550-bc392bda-93e9-4bcf-b19f-f19ad9652e7d.PNG)
#### Restituzione credito utente expired
![get_credit_utente_expired](https://user-images.githubusercontent.com/86098337/173401281-ad49e200-851b-448f-bb86-d45352920d8d.PNG)
#### User con token errato
![get_user_token_errato](https://user-images.githubusercontent.com/86098337/173401393-b433b663-66ac-4175-ab32-c55072adfcaa.PNG)
#### Filtraggio veicoli errore del type
![filtro_veicoli_errore_type](https://user-images.githubusercontent.com/86098337/173401176-fa83055a-0c3b-4f36-afda-bd9563d6ef93.PNG)
