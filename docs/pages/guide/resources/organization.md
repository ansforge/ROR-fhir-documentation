---
layout: menu-guide
section: guide
title: ROROrganization
subTitle: Ressources FHIR
---

## 1. Présentation de la ressource

`ROROrganization` est un profil créé dans le cadre du ROR pour décrire les organismes du domaine sanitaire, médico-social et social immatriculés dans le FINESS (entité juridique, entité géographique) ainsi que les organisations internes (pôles, services, unités fonctionnelles).

Les organisations sont structurées de façon hiérarchique : une entité géographique peut être rattachée à une entité juridique, et une organisation interne est elle-même rattachée à une entité géographique. Cette hiérarchie est portée par le mécanisme `partOf` de la ressource FHIR `Organization`.

## 2. Caractéristiques techniques de la ressource

<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/Organization` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` |
| Header requis | `Authorization` (jeton d'accès), ainsi que les 4 headers `Ror-*` décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/acces-donnees/consommation-api.html' | relative_url }}) |

</div>

## 3. Paramètres de recherche

La ressource `ROROrganization` peut être interrogée à l'aide de plusieurs paramètres de recherche, notamment le numéro FINESS.

L'ensemble des paramètres de recherche applicables à cette ressource est détaillé sur la page [Paramètres de recherche — ROROrganization]({{ '/pages/guide/resources/search-params/organization.html' | relative_url }}).

## 4. Profil officiel

Le profil FHIR complet de la ressource, avec l'ensemble de ses éléments, cardinalités et bindings, est disponible sur le guide d'implémentation officiel : [ROROrganization]({{ site.ror.ig_url }}/StructureDefinition-ror-organization.html){:target="_blank"}.
