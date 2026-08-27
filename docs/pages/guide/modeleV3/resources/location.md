---
layout: menu-guide
section: guide
title: RORLocation
subTitle: Ressources FHIR
---

## 1. Présentation de la ressource

`RORLocation` est un profil créé dans le cadre du ROR pour décrire l'espace disposant d'un ensemble de ressources permettant de réaliser une offre : lieu de réalisation de l'offre (adresse, coordonnées géographiques), capacités d'accueil et équipements spécifiques.

Une instance `RORLocation` est référencée par une ou plusieurs instances [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}) correspondant aux offres réalisées sur ce lieu.

## 2. Caractéristiques techniques de la ressource

<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/Location` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` |
| Header requis | `Authorization` (jeton d'accès), ainsi que les 4 headers `Ror-*` décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }}) |

</div>

## 3. Paramètres de recherche

La ressource `RORLocation` peut être interrogée à l'aide de plusieurs paramètres de recherche, notamment la localisation géographique.

L'ensemble des paramètres de recherche applicables à cette ressource est détaillé sur la page [Paramètres de recherche — RORLocation]({{ '/pages/guide/modeleV3/resources/search-params/location.html' | relative_url }}).

## 4. Profil officiel

Le profil FHIR complet de la ressource, avec l'ensemble de ses éléments, cardinalités et bindings, est disponible sur le guide d'implémentation officiel : [RORLocation]({{ site.ror.ig_url }}/StructureDefinition-ror-location.html){:target="_blank"}.
