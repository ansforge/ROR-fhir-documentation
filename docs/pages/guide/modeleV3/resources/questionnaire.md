---
layout: menu-guide
section: guide
title: RORQuestionnaire
subTitle: Ressources FHIR
---

<div class="wysiwyg" markdown="1">
- [Présentation de la ressource](#presentation)
- [Caractéristiques techniques](#caracteristiques)
- [Recherche sur critères](#recherche-criteres)
- [Paramètres de recherche](#parametres-recherche)
</div>
<br />

<a id="presentation"></a>
## 1. Présentation de la ressource
`RORQuestionnaire` décrit un modèle de saisie (formulaire structuré) permettant à un consommateur (par exemple un établissement) de renseigner ou de mettre à jour son offre opérationnelle ([RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }})) de façon guidée, en fonction de son contexte d'usage (catégorie d'établissement, champ d'activité, etc.).

<a id="caracteristiques"></a>
## 2. Caractéristiques techniques de la ressource
<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/Questionnaire` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` (recherche), [`POST`]({{ '/pages/guide/modeleV3/exemples/modeles-de-saisie.html' | relative_url }}) (création), [`PUT`]({{ '/pages/guide/modeleV3/exemples/modeles-de-saisie.html' | relative_url }}) (mise à jour) |
| Header requis | `Authorization` (jeton d'accès), ainsi que les 4 headers `Ror-*` décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }}) : `Ror-Profil-Utilisateur-Code`, `Ror-Profil-Utilisateur-System`, `Ror-Role-Metier-Code`, `Ror-Role-Metier-System` |

</div>

<a id="recherche-criteres"></a>
## 3. Recherche sur critères
Des exemples de requêtes `GET` sur cette ressource sont disponibles sur la page [GET &gt; RORQuestionnaire]({{ '/pages/guide/modeleV3/get/questionnaire.html' | relative_url }}).

<a id="parametres-recherche"></a>
## 4. Paramètres de recherche
<div class="wysiwyg" markdown="1">

| Attributs Modèle | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _id | Oui | token | Identifiant technique de la ressource. |
| Metadonnee / dateMiseJour | _lastUpdated | Oui | date | Date de dernière mise à jour. |
| Identifiant | identifier | Oui | token | Identifiant du modèle. <code><span style="color: #ff0000;">draft</span></code> |
| Contexte d'usage | context | Oui | token | Critère pour récupérer un ensemble de modèles de saisie par catégorie(s) d'EG définie(s) ainsi que potentiellement la spécialité ordinale et la profession <code><span style="color: #ff0000;">draft</span></code> |
| Statut du modèle | status | Oui | token | Statut courant du modèle <code><span style="color: #ff0000;">draft</span></code> |
| Date de publication | date | Oui | date | Date de publication du modèle. <code><span style="color: #ff0000;">draft</span></code> |
| Version | version | Oui | token | Version du modèle. <code><span style="color: #ff0000;">draft</span></code> |
| Titre | title | Oui | string | Critère pour rechercher dans le titre du modèle de saisie <code><span style="color: #ff0000;">draft</span></code> |
| Description | description | Oui | string | Critère pour rechercher dans la description. <code><span style="color: #ff0000;">draft</span></code> |
| Nom technique du modèle | name | Oui | string | Nom technique du modèle de saisie <code><span style="color: #ff0000;">draft</span></code> |

</div>

Profil officiel : [RORQuestionnaire]({{ site.ror.ig_url }}/StructureDefinition-ror-questionnaire.html){:target="_blank"}
