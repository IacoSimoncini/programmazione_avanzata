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
* Effettuare la chiusura (fine) del noleggio con fatturazione che considera: tempo trascorso, tariffa del noleggio e un fattore moltiplicativo se il veicolo non risulta entro un raggio di 50 metri
 * Restituire la lista delle aree di parcheggio
 * Restituire il credito residuo dell'utente
 * Resistituire l'elenco dei noleggi effettuati 
        
## Progettazione

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

