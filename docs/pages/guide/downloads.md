---
layout: menu-guide
section: guide
title: Téléchargements
subTitle: Guide
---

### Téléchargement

L'implementation guide contient un package [téléchargeable ici]({{ site.ror.ig_url }}/package.tgz) permettant de valider les instances par rapport aux profils qu'il contient.

Pour cela, il suffit de télécharger le [package.tgz]({{ site.ror.ig_url }}/package.tgz) et l'importer dans un serveur, par exemple sur hapi en suivant ce [script python](https://github.com/nmdp-bioinformatics/igloader) open source.

Ensemble des ressources téléchargeables :

* [L'ensemble de la specification (zip)]({{ site.ror.ig_url }}/full-ig.zip)
* [Package (tgz)]({{ site.ror.ig_url }}/package.tgz)

#### Définitions

* [Définitions JSON (zip)]({{ site.ror.ig_url }}/definitions.json.zip)
* [Définitions XML (zip)]({{ site.ror.ig_url }}/definitions.xml.zip)
* [Définitions Turtle (zip)]({{ site.ror.ig_url }}/definitions.ttl.zip)

#### Exemples

* [Exemples XML (zip)]({{ site.ror.ig_url }}/examples.xml.zip)
* [Exemples JSON (zip)]({{ site.ror.ig_url }}/examples.json.zip)
* [Exemples Turtle (zip)]({{ site.ror.ig_url }}/examples.ttl.zip)

### Usage

Ce guide d'implémentation définit des profils qui définissent la structure des instances FHIR du ROR, c'est à dire les données exposées par le serveur.

Le serveur national ROR ainsi que les clients qui envoient de la donnée au serveur devront s'assurer de la conformité des ressources envoyées par rapport aux profils indiqués dans le guide ainsi qu'à la spécification FHIR de base. Pour cela, il est possible d'utiliser le validateur officiel [FHIR Validator](https://confluence.hl7.org/display/FHIR/Using+the+FHIR+Validator) qui est également accessible [en ligne](https://validator.fhir.org/).

Pour plus d'information sur la validation des instances de ressource contre un profil issu de cette spécification, consulter la documentation de l'opération [$validate](https://www.hl7.org/fhir/resource-operation-validate.html) et la [documentation de l'ANS](https://interop.esante.gouv.fr/ig/documentation/valider_res.html).
