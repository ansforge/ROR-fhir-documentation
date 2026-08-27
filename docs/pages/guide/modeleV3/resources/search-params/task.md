---
layout: menu-guide
section: guide
title: RORTask
subTitle: Paramètres de recherche
---

Critères de recherches applicables à la ressource Task.

Profil officiel : [RORTask]({{ site.ror.ig_url }}/StructureDefinition-ror-task.html){:target="_blank"}

<div class="wysiwyg" markdown="1">

| Attributs Anomalie | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _filter | Oui | special | Paramètre de recherche de filtre qui prend en charge une grammaire de recherche plus sophistiquée. Voir la documentation (https://hl7.org/fhir/search_filter.html) pour plus de détails |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource <code><span style="color: #ff0000;">draft</span></code> |
| - | _id | Oui | token | Identifiant technique de la ressource. <code><span style="color: #ff0000;">draft</span></code> |
| Metadonnee / dateMiseJour | _ lastUpdated | Oui | date | Date de dernière mise à jour. <code><span style="color: #ff0000;">draft</span></code> |
| Identifiant | Identifier | Oui | token | Identifiant de l’anomalie. <code><span style="color: #ff0000;">draft</span></code> |
| - | focus | Oui | Reference | Référence vers la ressource en anomalie. <code><span style="color: #ff0000;">draft</span></code> |
| Statut Métier | business - status | Oui | token | Différent type de statut métier de l'anomalie. <code><span style="color: #ff0000;">draft</span></code> |
| Date création | authored-on | Oui | date | Date création de l'anomalie <code><span style="color: #ff0000;">draft</span></code> |

</div>
