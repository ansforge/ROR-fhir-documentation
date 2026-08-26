---
layout: menu-guide
section: guide
title: RORHealthcareService
subTitle: Ressources FHIR
---

## 1. Présentation de la ressource

`RORHealthcareService` décrit les prestations — l'offre opérationnelle — que peut réaliser une structure et qui permettent de répondre au besoin de santé d'une personne : activité opérationnelle, actes spécifiques, patientèle, mode de prise en charge, horaires.

C'est la ressource pivot du modèle : elle référence l'organisation qui porte l'offre ([ROROrganization]({{ '/pages/guide/resources/organization.html' | relative_url }})), les lieux où elle est réalisée ([RORLocation]({{ '/pages/guide/resources/location.html' | relative_url }})), et elle est elle-même référencée par les professionnels qui y exercent ([RORPractitionerRole]({{ '/pages/guide/resources/practitioner-role.html' | relative_url }})).

## 2. Caractéristiques techniques de la ressource

<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/HealthcareService` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` |
| Header requis | `Authorization` (jeton d'accès), ainsi que les 4 headers `Ror-*` décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/acces-donnees/consommation-api.html' | relative_url }}) |

</div>

## 3. Paramètres de recherche

La ressource `RORHealthcareService` peut être interrogée à l'aide de plusieurs paramètres de recherche, notamment l'activité opérationnelle, la date de mise à jour ou l'organisation rattachée.

L'ensemble des paramètres de recherche applicables à cette ressource est détaillé sur la page [Paramètres de recherche — RORHealthcareService]({{ '/pages/guide/resources/search-params/healthcareservice.html' | relative_url }}).

## 4. Profil officiel

Le profil FHIR complet de la ressource, avec l'ensemble de ses éléments, cardinalités et bindings, est disponible sur le guide d'implémentation officiel : [RORHealthcareService]({{ site.ror.ig_url }}/StructureDefinition-ror-healthcareservice.html){:target="_blank"}.
