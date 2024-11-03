## Objectifs

Apprendre à envoyer des requêtes HTTP asynchrones vers une API REST.

## Instructions

### Mise en place de la page web

Créer une page web avec 2 menus déroulants (pour la sélection des régions et la sélection des départements) et un bouton "Afficher les communes".

### Mise à jour des menus déroulants

* Au chargement de la page, récupérer la liste des régions de France et les ajouter comme options du menu déroulant des régions
* Lorsque l'on change de région dans le menu déroulant correspondant, récupérer la liste des départements de la région sélectionnée et les ajouter comme options du menu déroulant des départements

### Liste des villes du département choisi

Lorsque l'on clique sur le bouton "Afficher les communes" (nom de la commune et le nombre d'habitants), récupérer la liste des communes du département sélectionné et les afficher dans la page web.

### Tri des villes par population

Afficher les villes de la plus peuplée à la moins peuplée.

### [BONUS] Afficher des informations sur la ville où vous êtes

Créer un bouton pour vous géolocaliser puis récupérer les informations (nom, population, surface) de la ville dans laquelle vous vous trouvez puis les afficher.

### [BONUS++] Afficher le contour de votre ville sur une carte

En utilisant une bibliothèque de cartographie, afficher le contour de la ville dans laquelle vous êtes. Les coordonnées du contour de la ville peuvent être récupérées depuis ce type d'[url](https://geo.api.gouv.fr/communes?lat=48.6080512&lon=7.733248&fields=code,nom,codesPostaux,surface,population,centre,contour)

[Doc de la recherche géographique](https://geo.api.gouv.fr/decoupage-administratif/communes#geo)
