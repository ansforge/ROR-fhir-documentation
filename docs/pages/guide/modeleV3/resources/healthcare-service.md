---
layout: menu-guide
section: guide
title: RORHealthcareService
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
`RORHealthcareService` décrit les prestations — l'offre opérationnelle — que peut réaliser une structure et qui permettent de répondre au besoin de santé d'une personne : activité opérationnelle, actes spécifiques, patientèle, mode de prise en charge, horaires.

C'est la ressource pivot du modèle : elle référence l'organisation qui porte l'offre ([ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html' | relative_url }})), les lieux où elle est réalisée ([RORLocation]({{ '/pages/guide/modeleV3/resources/location.html' | relative_url }})), et elle est elle-même référencée par les professionnels qui y exercent ([RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }})).

<a id="caracteristiques"></a>
## 2. Caractéristiques techniques de la ressource
<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/HealthcareService` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` (recherche), [`POST`]({{ '/pages/guide/modeleV3/exemples/saisie-offre.html' | relative_url }}) (création), [`PATCH`]({{ '/pages/guide/modeleV3/exemples/mise-a-jour-offre.html' | relative_url }}) (mise à jour) |
| Header requis | `Authorization` (jeton d'accès), ainsi que les 4 headers `Ror-*` décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }}) : `Ror-Profil-Utilisateur-Code`, `Ror-Profil-Utilisateur-System`, `Ror-Role-Metier-Code`, `Ror-Role-Metier-System` |

</div>

<a id="recherche-criteres"></a>
## 3. Recherche sur critères
Des exemples de requêtes `GET` sur cette ressource sont disponibles sur la page [GET &gt; RORHealthcareService]({{ '/pages/guide/modeleV3/get/healthcare-service.html' | relative_url }}).

<a id="parametres-recherche"></a>
## 4. Paramètres de recherche
La ressource `RORHealthcareService` peut être interrogée à l'aide de plusieurs paramètres de recherche, notamment l'activité opérationnelle, le type d'offre, la modalité d'accueil, la localisation géographique ou la date de mise à jour.

Profil officiel : [RORHealthcareService]({{ site.ror.ig_url }}/StructureDefinition-ror-healthcareservice.html){:target="_blank"}

<div class="wysiwyg" markdown="1">

| Attribut ME 3.0 | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _filter | Oui | special | Paramètre de recherche de filtre qui prend en charge une grammaire de recherche plus sophistiquée. Voir la documentation (https://hl7.org/fhir/search_filter.html) pour plus de détails |
| - | _has | Oui | special | Permet d’utiliser les paramètres de recherche des ressources faisant référence à une autre ressource (chainage inversé) <code><span style="color: #ff0000;">draft</span></code> |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource <code><span style="color: #ff0000;">draft</span></code> |
| - | _id | Oui | token | Identification technique de la ressource |
| - | location | Oui | reference | Référence à la ressource Location <code><span style="color: #ff0000;">draft</span></code> |
| Metadonnee / dateMiseJour | _ lastUpdated | Oui | date | Date de dernière mise à jour. |
| Metadonnee / regionSource | _tag | Oui | token | Code région de la source de la donnée. |
| identifiantOffre | identifier | Oui | token | Identifiant de l’offre |
| nomOffre (remplace nomOI ) | name | Oui | string | Dénomination sous laquelle l'offre est identifiée par le porteur d'offre et résultant de l'application de règles de bonne pratique pour être affichable auprès des professionnels comme du grand public. |
| typeOffre (remplace categorieOrganisation ) | service - category | Oui | token | Le type d'offre permet de distinguer les offres et de les classer en fonction de leur nature particulière, liée à un agrément, un personnel spécialement formé ou un environnement particulièrement adapté à l'état de santé des patients. JDV_J238-TypeOffre-ROR issu de la TRE_R244-CategorieOrganisation |
| champActivite | service -type | Oui | token | Un champ d’activité indique le domaine dans lequel s'inscrit l'offre. JDV_J20-ChampActivite-ROR issu de la TRE_R227-ChampActivite |
| secteurPsychiatrique | psychiatric -sector | Non | string | Le secteur de psychiatrie (ou sectorisation) correspond à une aire géographique à laquelle sont rattachées des structures de relais et de soins qui prennent en charge des patients résidants sur ce secteur. |
| modaliteAccueil (remplace accueilSequentielAccepte ) | characteristic | Oui | token | Une modalité d’accueil permet de préciser le mode de prise en charge géographiquement (ex. : sur le lieu de vie), technologiquement (ex. : téléconsultation) ou organisationnellement (ex. : accueil séquentiel). JDV_J226-ModaliteAccueil-ROR issu de la TRE_R338-ModaliteAccueil |
| specialisationPriseEnCharge | Une spécialisation de prise en charge correspond à un regroupement de troubles, de pathologies ou de déficiences qui nécessitent la mobilisation d'expertises, de compétences et/ou d'équipements spécifiques pouvant être discriminants dans le choix d’orientation du patient. JDV_J35-SpecialisationDePriseEnCharge-ROR issu de la TRE_R245-SpecialisationDePriseEnCharge | - | - | - |
| modePriseEnCharge | Le mode de prise en charge caractérise l'hébergement ainsi que le niveau de technicité et d'intensité des soins. JDV_J19-ModePriseEnCharge-ROR issu de la TRE_R213-ModePriseEnCharge | - | - | - |
| temporaliteAccueil | La temporalité d’accueil apporte une précision sur le mode de prise en charge. Elle indique si l'établissement médico-social accepte un accueil pour une durée limitée dans le temps, de 90 jours maximum par an. JDV_J30-TemporaliteAccueil-ROR issu de la TRE_R240-TemporaliteAccueil | - | - | - |
| typeFermeture (OffreOperationnelle) | Recherche sur la temporalité d'arrêt de réalisation de la prestation. JDV-J185-TypeFermeture-ROR | - | - | - |
| acteSpecifique | Un acte spécifique est une action menée par un ou plusieurs acteur(s) de santé dans le cadre d’une activité. Cet acte peut correspondre à une technique spécialisée ou traduire une expertise discriminante dans le parcours de santé. JDV_J16-ActeSpecifique-ROR issu de la TRE_R210-ActeSpecifique | - | - | - |
| professionRessource | La profession ressource traduit la mobilisation de métiers qui constituent un facteur différenciant dans la réalisation de la prestation. JDV_J186-ProfessionRessource-ROR issu de la TRE_R350-ProfessionRessource et TRE_R94-ProfessionSocial | - | - | - |
| niveauExpertise | Le niveau d'expertise atteste du niveau de ressources humaines et matérielles engagées dans la réalisation de l'offre et défini dans un cahier des charges officiel. JDV-J227-NiveauExpertise-ROR issu de la TRE_R253-TypeMaternite | - | - | - |
| competenceSpecifique | La compétence spécifique correspond à une capacité ou connaissance reconnue qui permet ou facilite l’accueil d’une personne. La compétence spécifique n’est ni une spécialité ordinale, ni une profession JDV-J33-CompetenceSpecifique-ROR issu de la TRE_R243-CompetenceSpecifique | - | - | - |
| zoneIntervention(DivisionTerritorial/code) | intervention -zone | Non | token | Correspond au code de la division territoriale du périmètre géographique dans lequel habitent les personnes pouvant être prises en charge pour la prestation décrite JDV-J124-Commune, JDV-J248-DepartementOM-ROR, JDV-J237-RegionOM-ROR, JDV-J249-TerritoireSante-ROR, JDV-J247-Pays-ROR |
| ActiviteOperationnelle / activiteOperationnelle | specialty | Oui | token | Une activité opérationnelle est un ensemble cohérent d’actions et de pratiques mises en œuvre pour répondre aux besoins en Santé de la personne. JDV_J17-ActiviteOperationnelle-ROR issu de la TRE_R211-ActiviteOperationnelle |
| Patientele / publicPrisEnCharge | patient -type | Non | token | Ensemble de personnes qui présentent des caractèristiques psychologiques, intellectuelles, physiques, psycho-motrices , comportementales leur pemettant de bénéficier de la prestation décrite. JDV-J29-PublicPrisEnCharge-ROR issu de la TRE_R239-PublicPrisEnCharge |
| Patientele / ageMin | age -range- low | Non | quantity | Age minimum (inclus) des personnes leur permettant de bénéficier de la prestation décrite. JDV_J37-UcumUniteTemps issu de la TRE_R247-UcumUniteMesure |
| Patientele / ageMax | age -range-high | Non | quantity | Age maximum (inclus) des personnes leur permettant de bénéficier de la prestation décrite. JDV_J37-UcumUniteTemps issu de la TRE_R247-UcumUniteMesure |
| OffreOperationnelle / dateFermeture et datePrevisionnelleReouverture | notavailable -closing- reopeningdate | Non | date | Paramètre de recherche pour rechercher la date dans la période de fermeture (during.start) et de réouverture prévisionnelle (during.end). |

</div>

En complément, la ressource `RORHealthcareService` peut être interrogée par chainage sur les critères de recherche des ressources qu'elle référence :

<div class="wysiwyg" markdown="1">
- [Paramètres de recherche — ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html#parametres-recherche' | relative_url }}), via `organization.[NOM CRITERE]`
- [Paramètres de recherche — RORLocation]({{ '/pages/guide/modeleV3/resources/location.html#parametres-recherche' | relative_url }}), via `location.[NOM CRITERE]`
- [Paramètres de recherche — RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html#parametres-recherche' | relative_url }}), via `_has:PractitionerRole:service:practitioner.[NOM CRITERE]`
- [Paramètres de recherche — RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html#parametres-recherche' | relative_url }}), via `_has:PractitionerRole:service:[NOM CRITERE]`
</div>
