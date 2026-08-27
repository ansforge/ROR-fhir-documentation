---
layout: menu-guide
section: guide
title: RORHealthcareService
subTitle: Ressources FHIR
---

<div class="wysiwyg" markdown="1">
- [Présentation de la ressource](#presentation)
- [Caractéristiques techniques](#caracteristiques)
- [Paramètres de recherche](#parametres-recherche)
- [Recherche sur critères](#recherche-criteres)
  - [Rechercher tout](#recherche-tout)
  - [Rechercher par date de mise à jour](#recherche-par-date)
  - [Rechercher par activité opérationnelle](#recherche-par-activite)
  - [Rechercher par type d'offre et modalité d'accueil](#recherche-par-type-modalite)
  - [Rechercher à proximité géographique](#recherche-par-proximite)
  - [Rechercher par département, code postal ou commune](#recherche-par-localisation)
  - [Rechercher par zone d'intervention, professionnel ou région source](#recherche-par-zone-professionnel-region)
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

<a id="parametres-recherche"></a>
## 3. Paramètres de recherche
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

<a id="recherche-criteres"></a>
## 4. Recherche sur critères
Voici quelques exemples de requêtes sur l'offre opérationnelle.

<a id="recherche-tout"></a>
#### 4.1 Rechercher tout (sans critère)
**Récit utilisateur :**
En tant que client de l'API, je souhaite récupérer l'ensemble des offres opérationnelles.

**Requêtes :**

```sh
GET [BASE]/HealthcareService
# récupère l'ensemble des HealthcareService (actifs et inactifs)

GET [BASE]/HealthcareService?_include=HealthcareService:organization
# inclus les Organization référencées par HealthcareService

GET [BASE]/HealthcareService?_include=HealthcareService:organization&_include:iterate=Organization:partof&_include=HealthcareService:location&_revinclude=PractitionerRole:service&_include=PractitionerRole:practitioner
# inclus l'ensemble des ressources liées : Organization (et ses parentes), Location, PractitionerRole et Practitioner
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% highlight bash %}
{% raw %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/HealthcareService"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(HealthcareService.class)
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    HealthcareService healthcareService = (HealthcareService) entry.getResource();
    logger.info("HealthcareService found: id={}", healthcareService.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/HealthcareService"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}

response = requests.get(base_url, headers=headers)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    healthcare_service = entry["resource"]
    print(f"HealthcareService found: id={healthcare_service['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-date"></a>
#### 4.2 Rechercher par date de mise à jour (_lastUpdated)
**Récit utilisateur :**
En tant que client de l'API, je souhaite récupérer les offres qui ont été mises à jour depuis une certaine date (y compris les mises à jour de l'organisation rattachée), afin de synchroniser mon système d'information.

**Requêtes :**

```sh
GET [BASE]/HealthcareService?_lastUpdated=ge2022-11-06T15:00
# récupère les HealthcareService mis à jour depuis le 06/11/2022 15h00 inclus

GET [BASE]/HealthcareService?_filter=(_lastUpdated ge 2022-11-06T15:00 or organization._lastUpdated:above ge 2022-11-06T15:00)&_include=HealthcareService:organization&_include:iterate=Organization:partof&_include=HealthcareService:location&_revinclude=PractitionerRole:service&_include=PractitionerRole:practitioner
# critère de recherche sur la date de mise à jour de l'offre OU de l'une de ses organisations parentes, avec inclusion des ressources liées
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% highlight bash %}
{% raw %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/HealthcareService?_lastUpdated=ge2022-11-06T15:00"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

DateClientParam lastUpdatedParam = new DateClientParam("_lastUpdated");

Bundle bundle = client.search()
        .forResource(HealthcareService.class)
        .where(lastUpdatedParam.afterOrEquals().day("2022-11-06"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    HealthcareService healthcareService = (HealthcareService) entry.getResource();
    logger.info("HealthcareService found: id={} lastUpdated={}", healthcareService.getIdElement().getIdPart(), healthcareService.getMeta().getLastUpdated());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/HealthcareService"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"_lastUpdated": "ge2022-11-06T15:00"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    healthcare_service = entry["resource"]
    print(f"HealthcareService found: id={healthcare_service['id']} lastUpdated={healthcare_service['meta']['lastUpdated']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-activite"></a>
#### 4.3 Rechercher par activité opérationnelle (specialty)
**Récit utilisateur :**
En tant que client de l'API, je souhaite rechercher les offres qui correspondent à une (ou plusieurs) activité(s) opérationnelle(s).

**Requêtes :**

```sh
GET [BASE]/HealthcareService?specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|227
# recherche les offres caractérisées par l'activité opérationnelle 227 - Pédopsychiatrie infanto-juvénile

GET [BASE]/HealthcareService?_filter=(specialty eq https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|005 or https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|481)
# recherche les offres caractérisées par l'activité opérationnelle 005 - Allergologie OU 481 - Médecine générale à orientation Allergologie
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% highlight bash %}
{% raw %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/HealthcareService?specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle%7C227"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

TokenClientParam specialtyParam = new TokenClientParam("specialty");

Bundle bundle = client.search()
        .forResource(HealthcareService.class)
        .where(specialtyParam.exactly().systemAndCode(
                "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                "227"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    HealthcareService healthcareService = (HealthcareService) entry.getResource();
    logger.info("HealthcareService found: id={}", healthcareService.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/HealthcareService"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "specialty": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|227",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    healthcare_service = entry["resource"]
    print(f"HealthcareService found: id={healthcare_service['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-type-modalite"></a>
#### 4.4 Rechercher par type d'offre et modalité d'accueil (service-category, characteristic)
**Récit utilisateur :**
En tant que client de l'API, je souhaite rechercher les offres qui correspondent à la fois à un type d'offre ET à une modalité d'accueil donnés (recherche multicritères).

**Requêtes :**

```sh
GET [BASE]/HealthcareService?service-category=https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|50&characteristic=https://mos.esante.gouv.fr/NOS/TRE_R338-ModaliteAccueil/FHIR/TRE-R338-ModaliteAccueil|01
# recherche les offres caractérisées par le type d'offre 50 - Institut thérapeutique éducatif et pédagogique (ITEP) ET la modalité d'accueil 01 - Accueil séquentiel accepté

GET [BASE]/HealthcareService?_filter=(((service-category eq https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|102) or (specialty eq https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|233)) and (age-range-low le 35|https://unitsofmeasure.org|a and age-range-high ge 35|https://unitsofmeasure.org|a))
# recherche les offres caractérisées par le type d'offre 102 - SMR locomoteur OU l'activité opérationnelle 233 - Réadaptation des affections de l'appareil locomoteur, adaptées à un patient de 35 ans
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% highlight bash %}
{% raw %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/HealthcareService?service-category=https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation%7C50&characteristic=https://mos.esante.gouv.fr/NOS/TRE_R338-ModaliteAccueil/FHIR/TRE-R338-ModaliteAccueil%7C01"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

TokenClientParam serviceCategoryParam = new TokenClientParam("service-category");
TokenClientParam characteristicParam = new TokenClientParam("characteristic");

Bundle bundle = client.search()
        .forResource(HealthcareService.class)
        .where(serviceCategoryParam.exactly().systemAndCode(
                "https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation",
                "50"))
        .and(characteristicParam.exactly().systemAndCode(
                "https://mos.esante.gouv.fr/NOS/TRE_R338-ModaliteAccueil/FHIR/TRE-R338-ModaliteAccueil",
                "01"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    HealthcareService healthcareService = (HealthcareService) entry.getResource();
    logger.info("HealthcareService found: id={}", healthcareService.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/HealthcareService"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "service-category": "https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|50",
    "characteristic": "https://mos.esante.gouv.fr/NOS/TRE_R338-ModaliteAccueil/FHIR/TRE-R338-ModaliteAccueil|01",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    healthcare_service = entry["resource"]
    print(f"HealthcareService found: id={healthcare_service['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-proximite"></a>
#### 4.5 Rechercher à proximité géographique (location.near-insee-code, location.near)
**Récit utilisateur :**
En tant que client de l'API, je souhaite rechercher les offres caractérisées par une activité opérationnelle, situées dans un rayon donné autour du lieu de résidence d'un patient (chainage sur `location`).

**Requêtes :**

```sh
GET [BASE]/HealthcareService?specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|013&location.near-insee-code=44162|15|km
# recherche les offres caractérisées par l'activité opérationnelle 013 - Cardiologie générale, dans un rayon de 15 km autour de la commune 44162 (Saint-Herblain)

GET [BASE]/HealthcareService?specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|013&location.near=47.21827323906432|-1.6369631507460436|15|km
# recherche les offres caractérisées par la même activité opérationnelle, dans un rayon de 15 km autour du point latitude/longitude (WGS84) fourni
```

<blockquote class="stu-note">
<p>
  <b>Particularité sur « Calculated Distance »</b>
  <br>
  L'extension <a href="https://www.hl7.org/fhir/R4/extension-location-distance.html" target="_blank">location-distance</a> de <code>Bundle.entry.search</code> est utilisée par le ROR pour remonter, sur chaque <code>Location</code> incluse, sa distance calculée par rapport au point de référence de la recherche.
</p>
</blockquote>

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% highlight bash %}
{% raw %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/HealthcareService?specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle%7C013&location.near-insee-code=44162%7C15%7Ckm"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

TokenClientParam specialtyParam = new TokenClientParam("specialty");
StringClientParam nearInseeCodeParam = new StringClientParam("location.near-insee-code");

Bundle bundle = client.search()
        .forResource(HealthcareService.class)
        .where(specialtyParam.exactly().systemAndCode(
                "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                "013"))
        .and(nearInseeCodeParam.matches().value("44162|15|km"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    HealthcareService healthcareService = (HealthcareService) entry.getResource();
    logger.info("HealthcareService found: id={}", healthcareService.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/HealthcareService"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "specialty": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|013",
    "location.near-insee-code": "44162|15|km",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    healthcare_service = entry["resource"]
    print(f"HealthcareService found: id={healthcare_service['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-localisation"></a>
#### 4.6 Rechercher par département, code postal ou commune (location.address-postalcode, location.commune-cog)
**Récit utilisateur :**
En tant que client de l'API, je souhaite rechercher les offres proposant une activité opérationnelle sur un département (2 premiers chiffres du code postal), un ensemble de codes postaux, ou une (ou plusieurs) commune(s) précise(s) (chainage sur `location`).

**Requêtes :**

```sh
GET [BASE]/HealthcareService?location.address-postalcode=71&service-category=https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|21
# recherche les offres du type d'offre 21 - Accueil ou hébergement pour personnes âgées dépendantes, situées dans le département 71

GET [BASE]/HealthcareService?_filter=(location.address-postalcode eq "60000" or "76620")&specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|017
# recherche les offres caractérisées par l'activité opérationnelle 017 - Chirurgie de l'obésité, sur les communes de code postal 60000 ou 76620

GET [BASE]/HealthcareService?location.commune-cog=https://mos.esante.gouv.fr/NOS/TRE_R13-CommuneOM/FHIR/TRE-R13-CommuneOM|18000,13013&specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|437
# recherche les offres caractérisées par l'activité opérationnelle 437 - Médecine générale, sur les communes 18000 (Bourges) ou 13013 (Belcodène) (code officiel géographique)
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% highlight bash %}
{% raw %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/HealthcareService?location.address-postalcode=71&service-category=https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation%7C21"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

StringClientParam addressPostalcodeParam = new StringClientParam("location.address-postalcode");
TokenClientParam serviceCategoryParam = new TokenClientParam("service-category");

Bundle bundle = client.search()
        .forResource(HealthcareService.class)
        .where(addressPostalcodeParam.matches().value("71"))
        .and(serviceCategoryParam.exactly().systemAndCode(
                "https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation",
                "21"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    HealthcareService healthcareService = (HealthcareService) entry.getResource();
    logger.info("HealthcareService found: id={}", healthcareService.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/HealthcareService"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "location.address-postalcode": "71",
    "service-category": "https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|21",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    healthcare_service = entry["resource"]
    print(f"HealthcareService found: id={healthcare_service['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-zone-professionnel-region"></a>
#### 4.7 Rechercher par zone d'intervention, professionnel ou région source (intervention-zone, _has, _tag)
**Récit utilisateur :**
En tant que client de l'API, je souhaite : rechercher les offres à domicile dont la zone d'intervention couvre une commune donnée ; retrouver les offres d'un professionnel identifié par son identifiant fonctionnel (chainage inversé) ; ou filtrer les offres par région source de la donnée.

**Requêtes :**

```sh
GET [BASE]/HealthcareService?intervention-zone=https://mos.esante.gouv.fr/NOS/TRE_R13-CommuneOM/FHIR/TRE-R13-CommuneOM|29151&specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|293&service-category=https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|30
# recherche les offres de type SAAD, proposant l'activité opérationnelle 293, et ayant la commune 29151 dans leur zone d'intervention

GET [BASE]/HealthcareService?_has:PractitionerRole:service:practitioner.identifier=XXX
# recherche les offres (HealthcareService) auxquelles est rattaché, via une situation opérationnelle (PractitionerRole), le professionnel dont l'identifiant fonctionnel est XXX

GET [BASE]/HealthcareService?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|XX
# recherche les offres dont la région source de la donnée est XX
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% highlight bash %}
{% raw %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/HealthcareService?_has:PractitionerRole:service:practitioner.identifier=XXX"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

StringClientParam practitionerIdentifierParam =
        new StringClientParam("_has:PractitionerRole:service:practitioner.identifier");

Bundle bundle = client.search()
        .forResource(HealthcareService.class)
        .where(practitionerIdentifierParam.matches().value("XXX"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    HealthcareService healthcareService = (HealthcareService) entry.getResource();
    logger.info("HealthcareService found: id={}", healthcareService.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/HealthcareService"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "_has:PractitionerRole:service:practitioner.identifier": "XXX",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    healthcare_service = entry["resource"]
    print(f"HealthcareService found: id={healthcare_service['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />
