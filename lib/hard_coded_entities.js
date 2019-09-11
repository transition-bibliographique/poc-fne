const élémentDeTypage = {
  relations: [
    { property: "Type d'entité", object: 'élément de typage' }
  ]
}

module.exports = {
  properties: {
    'données source de la zone': 'string',
    'identifiant de la zone': 'string',
    'URL pérenne': 'url',
    "Type d'entité": 'wikibase-item',
    'Identifiant ISNI': 'string',
    "Source d'import": 'string',
    'Nom': 'string',
    'Prénom': 'string',
    'Date de naissance': 'time',
    'Date de décès': 'time',
    'Activité': 'string',
    "Titre de l'oeuvre": 'string',
    "Langue de l'oeuvre": 'string'
  },
  items: {
    'élément de typage': élémentDeTypage,
    'collectivité': élémentDeTypage,
    'concept': élémentDeTypage,
    'lieu': élémentDeTypage,
    'œuvre': élémentDeTypage,
    'personne': élémentDeTypage
  }
}
