[![pages-build-deployment](https://github.com/ansforge/ROR-fhir-documentation/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/ansforge/ROR-fhir-documentation/actions/workflows/pages/pages-build-deployment)

# Documentation API FHIR du ROR (Répertoire national de l'Offre et des Ressources)

## Introduction

Le Répertoire national de l'Offre et des Ressources en santé et accompagnement médico-social ([ROR](https://esante.gouv.fr/produits-services/repertoire-ror)) est le référentiel de description de l'offre de santé des établissements sanitaires, des établissements et services du médico-social et des structures de ville.

L'API FHIR du ROR National expose ces données au format JSON, structurées selon le standard d'interopérabilité [FHIR](https://www.hl7.org/fhir/) (Fast Healthcare Interoperability Resources), développé et maintenu par l'Agence du Numérique en Santé ([ANS](https://esante.gouv.fr/)).

Ce dépôt contient la documentation "grand public" de cette API : prise en main, modalités d'accès aux données (profils d'accès, environnements, authentification OAuth2/mTLS), description des ressources FHIR profilées, spécifications fonctionnelles et techniques, cas d'utilisation.

## À propos des endpoints de l'API

Il s'agit d'une API RESTful, basée sur la spécification HL7 FHIR R4, exposée sur deux environnements :

> - **Bac-à-sable** (test, synchronisé mensuellement avec la production et anonymisé) : `https://bas-api-fhir.qualif.ror.esante.gouv.fr`
> - **Production** : `https://api-fhir.ror.esante.gouv.fr`

Les ressources exposées : `Practitioner`, `PractitionerRole`, `Organization`, `HealthcareService`, `Location`.

Le détail des modalités d'accès (profils, authentification, endpoints) est disponible dans la section [Modalités d'accès aux données](docs/pages/guide/acces-donnees/vue-ensemble.md) de ce guide.

## Modèle de données FHIR

Le projet utilise le standard FHIR sur la version R4, en cohérence avec le modèle d'exposition ROR 3.0.1 et le Modèle des Objets de Santé (MOS) de l'ANS.

Le guide d'implémentation FHIR complet (profils, StructureDefinition, ValueSets) est disponible ici : [interop.esante.gouv.fr/ig/fhir/ror](https://interop.esante.gouv.fr/ig/fhir/ror)

## Documentation

* Documentation : https://ansforge.github.io/ROR-fhir-documentation/
* Guide d'implémentation FHIR (IG officiel) : https://interop.esante.gouv.fr/ig/fhir/ror
* Code source de l'IG : https://github.com/ansforge/IG-fhir-repertoire-offre-ressources-sante
* Répertoire ROR : https://esante.gouv.fr/produits-services/repertoire-ror
* Météo des services : https://status.ror.esante.gouv.fr/s

## Développement local

Ce projet utilise [Jekyll](https://jekyllrb.com/), supporté nativement par GitHub Pages. Le projet Jekyll se trouve dans le dossier [docs/](docs/).

```
cd docs
bundle install
bundle exec jekyll serve
```

Le site est alors accessible sur `http://127.0.0.1:4000/ROR-fhir-documentation/`.

## Acronymes

* ROR : Répertoire national de l'Offre et des Ressources
* FHIR : Fast Healthcare Interoperability Resources
* IG : Implementation Guide
* HL7 : Health Level Seven
* IGC-Santé : Infrastructure de Gestion de Certificats de Santé
* mTLS : mutual TLS
