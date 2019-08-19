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

`npm run extract echantillons/PaulVidal_BnF_13949089.txt`

### Détails des scripts

- `etl-notices [chemin de FICHIER]...`:

Extrait, tranforme et charge une ou plusieurs notices dans Wikibase.

exemple:

```sh
npm run etl-notices echantillons/PaulVidal_BnF_13949089.txt echantillons/LesReveriesDuPromeneur_BnF_11935154.txt

# > creating /path/to/poc-fne/echantillons/PaulVidal_BnF_13949089.txt
# > creating /path/to/poc-fne/echantillons/LesReveriesDuPromeneur_BnF_11935154.txt
# > /path/to/poc-fne/echantillons/LesReveriesDuPromeneur_BnF_11935154.json was created.
# > /path/to/poc-fne/echantillons/PaulVidal_BnF_13949089.json was created.
# > loaded {
# >   "Q10": "0  b.Vidal.Paul.1863-1931",
# >   "Q9": ".0..b.fre..Les rêveries du promeneur solitaire",
# >   "Q11": "11922879..0..b......Rousseau.Jean-Jacques.1712-1778"
# > }
```

- `extract [chemin de FICHIER]`

Extrait une notice (fichier `.txt`) dans un fichier JSON dans le même dossier que la notice `.txt`. Utile principalement pour des besoins de développement.

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
