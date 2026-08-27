---
layout: menu-guide
section: guide
title: RORPractitionerRole
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
`RORPractitionerRole` est un profil créé dans le cadre du ROR pour décrire les modalités d'exercice opérationnelles du professionnel dans la réalisation de l'offre : mode d'exercice (salarié / libéral), situation opérationnelle, ainsi que le rattachement au professionnel ([RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }})) et à l'organisation ou à l'offre concernée ([ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html' | relative_url }}) et/ou [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }})).

Un même professionnel peut être décrit par plusieurs instances `RORPractitionerRole`, une pour chaque situation opérationnelle dans laquelle il intervient : une situation opérationnelle porte notamment le mode d'exercice (salarié, libéral, etc.), le savoir-faire ou la spécialité exercée, ainsi que la référence vers le professionnel ([RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }})) et vers l'organisation et/ou l'offre opérationnelle ([ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html' | relative_url }}) / [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }})) au sein de laquelle le professionnel exerce.

<a id="caracteristiques"></a>
## 2. Caractéristiques techniques de la ressource
<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/PractitionerRole` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` (recherche) ; `POST` (création d'une situation opérationnelle, voir [Scénario 10 : Création d'une situation opérationnelle]({{ '/pages/guide/modeleV3/exemples/saisie-offre.html' | relative_url }})) ; `PATCH` (mise à jour d'une situation opérationnelle, voir [Mise à jour de l'offre]({{ '/pages/guide/modeleV3/exemples/mise-a-jour-offre.html' | relative_url }})) |
| Header requis | `Authorization: Bearer <access_token>`, ainsi que les 4 headers `Ror-*` (`Ror-Profil-Utilisateur-Code`, `Ror-Profil-Utilisateur-System`, `Ror-Role-Metier-Code`, `Ror-Role-Metier-System`) décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }}) |

</div>

<a id="parametres-recherche"></a>
## 3. Paramètres de recherche
La ressource `RORPractitionerRole` peut être interrogée à l'aide des paramètres de recherche suivants, notamment son identifiant technique, son identifiant fonctionnel, sa date de dernière mise à jour et la région source de la donnée.

Profil officiel : [RORPractitionerRole]({{ site.ror.ig_url }}/StructureDefinition-ror-practitionerrole.html){:target="_blank"}

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
| Identifiant | identifier | Oui | token | Identifiant de la situation opérationnelle, unique et persistant au niveau national. |

</div>
