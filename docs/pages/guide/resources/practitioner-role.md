---
layout: menu-guide
section: guide
title: RORPractitionerRole
subTitle: Ressources FHIR
---

## 1. Présentation de la ressource

`RORPractitionerRole` est un profil créé dans le cadre du ROR pour décrire les modalités d'exercice opérationnelles du professionnel dans la réalisation de l'offre : mode d'exercice (salarié / libéral), situation opérationnelle, ainsi que le rattachement au professionnel ([RORPractitioner]({{ '/pages/guide/resources/practitioner.html' | relative_url }})) et à l'organisation ou à l'offre concernée ([ROROrganization]({{ '/pages/guide/resources/organization.html' | relative_url }}) et/ou [RORHealthcareService]({{ '/pages/guide/resources/healthcare-service.html' | relative_url }})).

Un même professionnel peut être décrit par plusieurs instances `RORPractitionerRole`, une pour chaque situation opérationnelle dans laquelle il intervient.

## 2. Caractéristiques techniques de la ressource

<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/PractitionerRole` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` |
| Header requis | `Authorization` (jeton d'accès), ainsi que les 4 headers `Ror-*` décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/acces-donnees/consommation-api.html' | relative_url }}) |

</div>

## 3. Paramètres de recherche

La ressource `RORPractitionerRole` peut être interrogée à l'aide de plusieurs paramètres de recherche, notamment le rattachement au professionnel ou à l'organisation.

L'ensemble des paramètres de recherche applicables à cette ressource est détaillé sur la page [Paramètres de recherche — RORPractitionerRole]({{ '/pages/guide/resources/search-params/practitionerrole.html' | relative_url }}).

## 4. Profil officiel

Le profil FHIR complet de la ressource, avec l'ensemble de ses éléments, cardinalités et bindings, est disponible sur le guide d'implémentation officiel : [RORPractitionerRole]({{ site.ror.ig_url }}/StructureDefinition-ror-practitionerrole.html){:target="_blank"}.
