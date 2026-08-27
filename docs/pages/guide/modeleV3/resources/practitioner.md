---
layout: menu-guide
section: guide
title: RORPractitioner
subTitle: Ressources FHIR
---

<div class="wysiwyg" markdown="1">
- [Présentation de la ressource](#presentation)
- [Caractéristiques techniques](#caracteristiques)
- [Paramètres de recherche](#parametres-recherche)
</div>
<br />

<a id="presentation"></a>
## 1. Présentation de la ressource
`RORPractitioner` est un profil créé dans le cadre du ROR pour décrire les données d'identification pérennes d'une personne physique, qui travaille en tant que professionnel. Il porte notamment l'identifiant national du professionnel, son nom et son prénom d'exercice, ainsi que sa profession et sa spécialité.

Cette ressource ne décrit que les caractéristiques intrinsèques et stables du professionnel : ses modalités d'exercice opérationnelles (mode d'exercice, situation opérationnelle, rattachement à une organisation ou à une offre) sont, elles, portées par la ressource [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}), qui référence `RORPractitioner`.

`RORPractitioner` est en général consommé en complément d'une recherche sur [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}) ou [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}), via les mécanismes d'inclusion (`_include=PractitionerRole:practitioner`) ou de chaînage/chaînage inversé décrits sur la page [Recherche d'offre sur critères principaux]({{ '/pages/guide/modeleV3/exemples/recherche-criteres-principaux.html' | relative_url }}), mais peut également être interrogé directement, notamment pour retrouver un professionnel à partir de son identifiant national.

<a id="caracteristiques"></a>
## 2. Caractéristiques techniques de la ressource
<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/Practitioner` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` (recherche) ; `POST` (création, voir [Saisie de l'offre — Scénario 9 : Création d'un professionnel]({{ '/pages/guide/modeleV3/exemples/saisie-offre.html' | relative_url }})) ; `PATCH` (mise à jour, voir [Mise à jour de l'offre]({{ '/pages/guide/modeleV3/exemples/mise-a-jour-offre.html' | relative_url }})) |
| Header requis | `Authorization` (jeton d'accès de type `Bearer`), ainsi que les 4 headers `Ror-*` (`Ror-Profil-Utilisateur-Code`, `Ror-Profil-Utilisateur-System`, `Ror-Role-Metier-Code`, `Ror-Role-Metier-System`) décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }}) |

</div>

<a id="parametres-recherche"></a>
## 3. Paramètres de recherche
La ressource `RORPractitioner` peut être interrogée à l'aide des paramètres de recherche suivants, notamment l'identifiant national du professionnel.

Profil officiel : [RORPractitioner]({{ site.ror.ig_url }}/StructureDefinition-ror-practitioner.html){:target="_blank"}

<blockquote class="callout-warning">
<p><strong>Attention :</strong> pour récupérer l'ensemble des résultats au niveau national ou au niveau d'une région, vous devez impérativement utiliser la méthode <code>$export</code> de FHIR. Les résultats de cette requête seront tronqués à 10 000 résultats.</p>
</blockquote>

<div class="wysiwyg" markdown="1">

| Attribut ME 3.0 | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _filter | Oui | special | Paramètre de recherche de filtre qui prend en charge une grammaire de recherche plus sophistiquée. Voir la documentation (https://hl7.org/fhir/search_filter.html) pour plus de détails <code><span style="color: #ff0000;">draft</span></code> |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource <code><span style="color: #ff0000;">draft</span></code> |
| - | _id | Oui | token | Identification technique de la ressource |
| Metadonnee / dateMiseJour | _ lastUpdated | Oui | date | Date de dernière mise à jour. |
| Metadonnee / regionSource | _tag | Oui | token | Code région de la source de la donnée. |
| Identifiant | identifier | Oui | token | idNat_PS (Professionnel) : Identification nationale du professionnel définie par le CI-SIS. |

</div>
