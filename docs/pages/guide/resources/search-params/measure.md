---
layout: menu-guide
section: guide
title: RORMeasure
subTitle: Paramètres de recherche
---

Critères de recherches applicables à la ressource Measure.

Profil officiel : [RORMeasure]({{ site.ror.ig_url }}/StructureDefinition-ror-measure.html){:target="_blank"}

<div class="wysiwyg" markdown="1">

| Attributs Indicateur | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _filter | Oui | special | Paramètre de recherche de filtre qui prend en charge une grammaire de recherche plus sophistiquée. Voir la documentation (https://hl7.org/fhir/search_filter.html) pour plus de détails <code><span style="color: #ff0000;">draft</span></code> |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource <code><span style="color: #ff0000;">draft</span></code> |
| - | _has | Oui | special | Permet d’utiliser les paramètres de recherche des ressources faisant référence à une autre ressource (chainage inversé) <code><span style="color: #ff0000;">draft</span></code> |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource <code><span style="color: #ff0000;">draft</span></code> |
| - | _id | Oui | token | Identifiant technique de la ressource. <code><span style="color: #ff0000;">draft</span></code> |
| Metadonnee / dateMiseJour | _ lastUpdated | Oui | date | Date de dernière mise à jour. <code><span style="color: #ff0000;">draft</span></code> |
| Identifiant | identifier | Oui | token | Identifiant de l’indicateur. <code><span style="color: #ff0000;">draft</span></code> |
| Sujet | topic | Oui | token | Sujet de l’indicateur. <code><span style="color: #ff0000;">draft</span></code> |

</div>
