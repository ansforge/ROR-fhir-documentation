---
layout: menu-guide
section: guide
title: RORTask
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
`RORTask` est un profil créé dans le cadre du ROR pour décrire une anomalie signalée sur une ressource du ROR. Elle référence, via l'attribut `focus`, la ressource concernée par l'anomalie ([ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html' | relative_url }}), [RORLocation]({{ '/pages/guide/modeleV3/resources/location.html' | relative_url }}), [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}), [RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }}) ou [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }})), et porte son statut de traitement métier (`business-status`) ainsi que sa date de création (`authored-on`).

<a id="caracteristiques"></a>
## 2. Caractéristiques techniques de la ressource
<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/Task` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` (recherche), [`POST`]({{ '/pages/guide/modeleV3/exemples/signalement-anomalie.html' | relative_url }}) (signalement d'une anomalie), [`PATCH`]({{ '/pages/guide/modeleV3/exemples/mise-a-jour-anomalie.html' | relative_url }}) (mise à jour du statut, limitée aux attributs de premier niveau) |
| Header requis | `Authorization` (jeton d'accès), ainsi que les 4 headers `Ror-*` décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }}) : `Ror-Profil-Utilisateur-Code`, `Ror-Profil-Utilisateur-System`, `Ror-Role-Metier-Code`, `Ror-Role-Metier-System` |

</div>

<a id="recherche-criteres"></a>
## 3. Recherche sur critères
Des exemples de requêtes `GET` sur cette ressource sont disponibles sur la page [GET &gt; RORTask]({{ '/pages/guide/modeleV3/get/task.html' | relative_url }}).

<a id="parametres-recherche"></a>
## 4. Paramètres de recherche
<div class="wysiwyg" markdown="1">

| Attributs Anomalie | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _filter | Oui | special | Paramètre de recherche de filtre qui prend en charge une grammaire de recherche plus sophistiquée. Voir la documentation (https://hl7.org/fhir/search_filter.html) pour plus de détails |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource <code><span style="color: #ff0000;">draft</span></code> |
| - | _id | Oui | token | Identifiant technique de la ressource. <code><span style="color: #ff0000;">draft</span></code> |
| Metadonnee / dateMiseJour | _lastUpdated | Oui | date | Date de dernière mise à jour. <code><span style="color: #ff0000;">draft</span></code> |
| Identifiant | identifier | Oui | token | Identifiant de l'anomalie. <code><span style="color: #ff0000;">draft</span></code> |
| - | focus | Oui | Reference | Référence vers la ressource en anomalie. <code><span style="color: #ff0000;">draft</span></code> |
| Statut Métier | business-status | Oui | token | Différent type de statut métier de l'anomalie. <code><span style="color: #ff0000;">draft</span></code> |
| Date création | authored-on | Oui | date | Date création de l'anomalie <code><span style="color: #ff0000;">draft</span></code> |

</div>

Profil officiel : [RORTask]({{ site.ror.ig_url }}/StructureDefinition-ror-task.html){:target="_blank"}
