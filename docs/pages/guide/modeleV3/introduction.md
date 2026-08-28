---
layout: menu-guide
section: guide
title: Introduction
subTitle: Guide
---

### Introduction

Ce site dédié à l'API FHIR du ROR (Répertoire national de l'Offre et des Ressources en santé et accompagnement médico-social) est une documentation essentielle pour tous les acteurs (éditeurs, établissements de santé, structures de ville, structures médico-sociales, etc.) souhaitant mettre en place un système d'information basé sur l'API FHIR du ROR.

### Modèle de données FHIR

FHIR est un standard d'interopérabilité conçu pour l'échange de données de santé entre les différents acteurs de l'écosystème de Santé, développé par HL7 (Health Level 7). Le standard FHIR est de plus en plus utilisé en France et son usage est poussé par l'Union Européenne.
L'API FHIR du ROR est une API RESTful qui a pour objectif de respecter le standard d'interopérabilité FHIR afin d'exposer les données de l'offre de santé et des ressources en santé et accompagnement médico-social portées par le ROR national.

### Qu'est-ce qu'une ressource FHIR ?

Une ressource est un ensemble de données qui représente un concept spécifique dans le domaine de la santé. Chaque ressource est un objet structuré qui encapsule des informations définies pour un domaine précis (exemple : un professionnel de santé, une organisation, une offre de soins).

L'API FHIR contient près de 161 ressources, mais nous utilisons 5 ressources principales dans l'API FHIR du ROR.

### Ressources API FHIR du ROR

Les 5 ressources disponibles sur l'API FHIR du ROR sont les suivantes :

<div class="wysiwyg" markdown="1">

| Ressources | Description |
| --- | --- |
| [RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }}) | Contient les données d'identification, de contact et d'exercice professionnel d'une personne intervenant dans le système de santé. |
| [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}) | Contient les informations liées à la situation d'exercice / activité d'un professionnel : genre d'activité, fonction, mode d'exercice, Practitioner rattaché, Organization et/ou HealthcareService rattachés. |
| [ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html' | relative_url }}) | Décrit les organismes du domaine sanitaire, médico-social et social (entités juridiques, entités géographiques, organisations internes). |
| [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}) | Décrit l'offre opérationnelle portée par une organisation : activité opérationnelle, actes spécifiques, patientèle, mode de prise en charge. |
| [RORLocation]({{ '/pages/guide/modeleV3/resources/location.html' | relative_url }}) | Décrit les lieux de réalisation de l'offre, y compris leurs données capacitaires (disponibilité en lits et places). |

</div>

### Météo des services du ROR

Il est possible de consulter la page [Météo des services](https://status.esante.gouv.fr){:target="_blank"} afin de vérifier si l'API FHIR du ROR est opérationnelle ou non.
Il est également possible de s'abonner, depuis cette page, pour être notifié lorsque le statut de l'API FHIR du ROR est mis à jour.
