---
layout: menu-guide
section: guide
title: RORQuestionnaire
subTitle: Paramètres de recherche
---

Critères de recherches applicables à la ressource Questionnaire.

Profil officiel : [RORQuestionnaire]({{ site.ror.ig_url }}/StructureDefinition-ror-questionnaire.html){:target="_blank"}

<div class="wysiwyg" markdown="1">

| Attributs Modèle | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _id | Oui | token | Identifiant technique de la ressource. |
| Metadonnee / dateMiseJour | _ lastUpdated | Oui | date | Date de dernière mise à jour. |
| Identifiant | identifier | Oui | token | Identifiant du modèle. <code><span style="color: #ff0000;">draft</span></code> |
| Contexte d'usage | context | Oui | token | Critère pour récupérer un ensemble de modèles de saisie par catégorie(s) d'EG définie(s) ainsi que potentiellemnt la spécialité ordinale et la profession <code><span style="color: #ff0000;">draft</span></code> |
| Statut du modèle | status | Oui | token | Statut courant du modèle <code><span style="color: #ff0000;">draft</span></code> |
| Date de publication | date | Oui | date | Date de publication du modèle. <code><span style="color: #ff0000;">draft</span></code> |
| Version | version | Oui | token | Version du modèle. <code><span style="color: #ff0000;">draft</span></code> |
| Titre | title | Oui | string | Critère pour rechercher dans le titre du modèle de saisie <code><span style="color: #ff0000;">draft</span></code> |
| Description | description | Oui | string | Critère pour rechercher dans la description. <code><span style="color: #ff0000;">draft</span></code> |
| Nom technique du modèle | name | Oui | string | Nom technique du modèle de saisie <code><span style="color: #ff0000;">draft</span></code> |

</div>
