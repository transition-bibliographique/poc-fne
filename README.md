# PoC FNE basé sur Wikibase

Preuve de concept de modélisation de données d’autorité pour un outil de production mutualisée "Fichier National d'Entités" ([ABES](http://www.abes.fr/)-[BNF](https://www.bnf.fr/fr)) basé sur Wikibase.


Proof of concept of an authority control data model (Fichier national
d’entités) for a mutual data production tool ([ABES](http://www.abes.fr/)-[BNF](https://www.bnf.fr)) based on Wikibase .

## Installation

### Pré-requis

NodeJS version 8 ou supérieure installée sur le serveur. Peut être installé via [une image Docker](https://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html)

Veiller également à ce que le serveur Wikibase soit actif via la commande `docker ps` ou bien le lancer via la commande `docker-compose up` à exécuter à la racine du dossier [wikibase](https://github.com/abes-esr/poc-fne-wikibase-docker).

### Copier le répertoire
```sh
git clone https://github.com/abes-esr/poc-fne/
```

### Installer les dépendences
```sh
cd poc-fne
npm install
```

## Utilisation

### Lancer des scripts

Les scripts sont référencés dans le fichier [package.json](https://github.com/abes-esr/poc-fne/blob/naive-etl/package.json) et executables via la commande `npm run [nom du script] [arguments]`

exemple:

`npm run extract ./echantillons/BNF_echantillon_donnes_ALL.xml`

### Détails des scripts

- `etl-notices [chemin de FICHIER]...`:

Extrait, tranforme et charge une ou plusieurs notices dans Wikibase.

exemple:

```sh
# Extrait, tranforme et charge les données BNF, en gardant les logs de chargement dans etl-bnf.log
# et les logs d'erreurs dans etl-bnf.err
npm run etl-notices ./echantillons/BNF_echantillon_donnes_ALL.xml > etl-bnf.log 2> etl-bnf.err
# idem pour l'ABES
npm run etl-notices ./echantillons/ABES_echantillon_donnees_ALL.xml  > etl-abes.log 2> etl-abes.err
```

- `extract [chemin de FICHIER]`

Extrait une notice (fichier `.xml`) dans un fichier NDJSON dans le même dossier que la notice `.xml`. Utile principalement pour des besoins de développement.

exemple:

```sh
npm run extract echantillons/PaulVidal_BnF_13949089.txt
# > /path/to/poc-fne/echantillons/PaulVidal_BnF_13949089.json was created.
```

- `test`:

Lance les tests unitaire et d'intégration via [MochaJS](https://mochajs.org/), en passant par la commande NodeJS `npm test` (et non `npm run test`)

exemple:

```sh
npm test
```
