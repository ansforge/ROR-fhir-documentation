---
layout: menu-guide
section: guide
title: RORPractitioner
subTitle: Ressources FHIR
---

## 1. Présentation de la ressource

`RORPractitioner` est un profil créé dans le cadre du ROR pour décrire les données d'identification pérennes d'une personne physique, qui travaille en tant que professionnel. Il porte notamment l'identifiant national du professionnel, son nom et son prénom d'exercice, ainsi que sa profession et sa spécialité.

Cette ressource ne décrit que les caractéristiques intrinsèques et stables du professionnel : ses modalités d'exercice opérationnelles (mode d'exercice, situation opérationnelle, rattachement à une organisation ou à une offre) sont, elles, portées par la ressource [RORPractitionerRole]({{ '/pages/guide/resources/practitioner-role.html' | relative_url }}), qui référence `RORPractitioner`.

## 2. Caractéristiques techniques de la ressource

<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/Practitioner` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` |
| Header requis | `Authorization` (jeton d'accès), ainsi que les 4 headers `Ror-*` décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/acces-donnees/consommation-api.html' | relative_url }}) |

</div>

## 3. Paramètres de recherche

La ressource `RORPractitioner` peut être interrogée à l'aide de plusieurs paramètres de recherche, notamment l'identifiant national du professionnel.

L'ensemble des paramètres de recherche applicables à cette ressource est détaillé sur la page [Paramètres de recherche — RORPractitioner]({{ '/pages/guide/resources/search-params/practitioner.html' | relative_url }}).

## 4. Profil officiel

Le profil FHIR complet de la ressource, avec l'ensemble de ses éléments, cardinalités et bindings, est disponible sur le guide d'implémentation officiel : [RORPractitioner]({{ site.ror.ig_url }}/StructureDefinition-ror-practitioner.html){:target="_blank"}.
