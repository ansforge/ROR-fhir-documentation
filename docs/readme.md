Projet de documentation sur l'utilisation de l'API FHIR du ROR.

Ce projet a été pensé pour être distribué au travers de Github pages. Il utilise Jekyll qui est supporté par Github.

Le projet Jekyll se trouve dans le dossier docs/.

# Développement

Pour lancer le projet localement, allez dans le dossier docs/ puis lancez la commande `bundle exec jekyll serve`.

Le site sera accessible sur l'url : `http://127.0.0.1:4000/ROR-fhir-documentation/`.

# Rédaction

Pour rédiger de la documentation, vous pouvez créer / modifier les fichiers .md (markdown) dans le dossier "docs/pages/".

Répertoires :

* _data : gère le menu principal (menu.yml, clé `header`) et le menu latéral gauche (menu.yml, clé `sidebar`)
* _includes : contient le footer, la navigation et le bouton "page suivante"
* _layouts : contient le layout qui génère le menu latéral de gauche à partir de `page.section`
* assets : contient le css, des images et du javascript
* pages : contient les répertoires guide, specifications-techniques, saisie-et-mise-a-jour et changelog

# Menu

Le menu du haut est géré avec la clé `header` de `_data/menu.yml`. Le menu latéral de gauche est géré avec la clé `sidebar`, indexée par section (`guide`, `specifications-techniques`). Chaque page doit déclarer dans son en-tête (front-matter) à quelle section elle appartient :

```yaml
---
layout: menu-guide
section: guide
title: ...
---
```

Quand vous ajoutez une nouvelle page, il faut la renseigner dans la section correspondante de `menu.yml` pour la voir apparaître dans le menu latéral. Il faut bien faire attention aux indentations dans le fichier YAML.

# Publication (déploiement)

Pour mettre en ligne, publiez le projet sur un projet GitHub et dans la section "Settings > Pages", activez la fonctionnalité Github pages.

# Liens utiles

Guide d'implémentation FHIR officiel du ROR - https://interop.esante.gouv.fr/ig/fhir/ror
Code source de l'IG - https://github.com/ansforge/IG-fhir-repertoire-offre-ressources-sante
