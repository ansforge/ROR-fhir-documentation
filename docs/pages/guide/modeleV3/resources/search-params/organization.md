---
layout: menu-guide
section: guide
title: ROROrganization
subTitle: Paramètres de recherche
---

Critères de recherches applicables à la ressource Organization.

Profil officiel : [ROROrganization]({{ site.ror.ig_url }}/StructureDefinition-ror-organization.html){:target="_blank"}

<div class="wysiwyg" markdown="1">

| Attribut ME 3.0 | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _filter | Oui | special | Paramètre de recherche de filtre qui prend en charge une grammaire de recherche plus sophistiquée. Voir la documentation (https://hl7.org/fhir/search_filter.html) pour plus de détails <code><span style="color: #ff0000;">draft</span></code> |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource |
| - | _id | Oui | token | Identification technique de la ressource |
| Metadonnee / dateMiseJour | _ lastUpdated | Oui | date | Date de dernière mise à jour. |
| Metadonnee / regionSource | _tag | Oui | token | Code région de la source de la donnée. |
| idNat _Struct | identifier | Oui | token | Identification nationale de l'Entité Géographique définie dans le CI-SIS. |
| nomOI (OI) ou raisonSociale (EJ) ou denominationEG (EG) | name | Oui | string | Nom de l'organisation interne. |
| numFINESS | identifier | Oui | token | Numéro FINESS de l'entité géographique. |
| categorieEG | type | Oui | token | La catégorie d'établissement est le cadre réglementaire dans lequel s'exerce l'activité de l'entité géographique. JDV_J55-CategorieEG-ROR issu de TRE_R66-CategorieEtablissement, TRE_R316-AutreCategorieEtablissement et TRE_R02-SecteurActivite |
| typeOI | type | Oui | token | Type d'organisation interne. JDV_J203-TypeOrganisationInterne-ROR/FHIR/JDV-J203-TypeOrganisationInterne-ROR issu de la TRE_R213-ModePriseEnCharge |
| zonePoser | drop -zone | Non | token | Cet indicateur précise l’existence d’une zone de poser pour hélicoptère. |
| typeFermeture | closing -type | Non | token | Type de fermeture de l'entité géographique, au sens des règles de gestion du SI FINESS (par exemple: fermeture définitive, fermeture provisoire). JDV-J201-TypeFermeture-ROR issu de la TRE_R286-TypeFermeture |
| dateFermeture | period -end | Non | date | Date de fermeture de l'entité géographique. La date doit être supérieure à la date d’ouverture. |
| Tarif/ typeTarif | price -type | Non | token | Un type de tarif s’applique à une catégorie de services pour lesquels l’entité géographique a fixé un prix. JDV_J36-TypeTarif-ROR issu de la TRE_R246-TypeTarif |
| Tarif/ montantTarif (Montant/valeur) | price - amount -value | Non | Number | Montant du tarif des prestations et services : valeur. |
| ForfaitSocleHebergement + SupplementTarifHebergement / typeHabitation | price - residential -type | Non | token | Précise les caractéristiques de l'hébergement. JDV_J32-TypeHabitation-ROR issu de TRE_R242-TypeHabitation |
| TarifAccueilDeJour + TarifAidesHumaines + ForfaitSocleHebergement + TarifPortageRepas / conditionTarifaire | special -price | Non | token | La condition tarifaire précise les conditions d’accès à un tarif modulé en fonction des critères relatifs à la personne. JDV_J39-ConditionTarifaire- ROR   issu TRE_R250-ConditionTarifaire |
| TarifDependance / groupeTarifaireDependance | price -dependency-level | Non | token | Niveau de dépendance de la personne âgée accueillie qui sera associé à un tarif. Il y a 3 niveaux de tarifs selon le GIR. JDV_J27-GroupeTarifaireDependance-ROR issu de la TRE_R237-NiveauDependance |
| ForfaitSocleHebergement + TarifDependance / temporaliteAccueil | price - welcome -type | Non | token | Le tarif peut s’appliquer à un hébergement permanent ou à un hébergement temporaire. JDV_J30-TemporaliteAccueil-ROR issu de la TRE_R240-TemporaliteAccueil |
| Tarif/ unitePrix | price -unit | Non | token | Unité de référence pour évaluer le prix des prestations et services. JDV_J205-UnitePrix-ROR issu TRE_R228-UnitePrix |
| Tarif/ dateDebutValiditeTarif | price - validity -start-date | Non | date | Dernière date de début de validité du tarif indiqué. |

</div>
