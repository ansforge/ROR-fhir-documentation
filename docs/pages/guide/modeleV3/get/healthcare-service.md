---
layout: menu-guide
section: guide
title: RORHealthcareService
subTitle: Exemples GET
---

Cette page présente des exemples de requêtes `GET` sur la ressource [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

Voici quelques exemples de requêtes sur l'offre opérationnelle.

<blockquote class="callout-warning">
<p><strong>Attention :</strong> pour récupérer l'ensemble des résultats au niveau national ou au niveau d'une région, vous devez impérativement utiliser la méthode <code><a href="{{ '/pages/guide/modeleV3/methodes-fhir/export.html' | relative_url }}">$export</a></code> de FHIR. Les résultats de cette requête seront tronqués à 10 000 résultats.</p>
</blockquote>

<a id="recherche-tout"></a>
#### 1 Rechercher tout (sans critère)
**Description du scénario :** Un consommateur souhaite récupérer l'ensemble des offres opérationnelles, actives et inactives.

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService
```

**Description du scénario :** Un consommateur souhaite récupérer les offres opérationnelles ainsi que les organisations qui les portent.

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?_include=HealthcareService:organization #inclus les Organization référencées par HealthcareService
```

**Description du scénario :** Un consommateur souhaite récupérer les offres opérationnelles ainsi que l'ensemble des ressources liées (organisation et ses parentes, lieu de réalisation, situations opérationnelles et professionnels).

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?_include=HealthcareService:organization #inclus les Organization référencées par HealthcareService
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par HealthcareService
&_include=HealthcareService:location #inclus les Location référencées par HealthcareService
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
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
#### 2 Rechercher par date de mise à jour (_lastUpdated)
**Description du scénario :** Un consommateur souhaite mettre à jour toute l'offre mise à jour depuis une certaine date >= (06/11/2022).

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?_lastUpdated=ge2022-11-06T15:00 #critère de recherche de sur la date de mise à jour (ge = greater than)
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par HealthcareService
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
```

**Description du scénario :** Un consommateur souhaite par exemple mettre à jour toute l'offre mise à jour depuis une certaine date >=(06/11/2022) ou dont l'organisation est mise à jour depuis une certaine date >= (06/11/2022).

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?_filter=(_lastUpdated ge 2022-11-06T15:00 or organization._lastUpdated:above ge 2022-11-06T15:00) #critère de recherche sur la date de mise à jour 
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par HealthcareService
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
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
#### 3 Rechercher par activité opérationnelle (specialty)
**Description du scénario :** Un consommateur cherche les offres ayant une activité opérationnelle qui correspond à l'unique valeur recherchée par le consommateur.

**Exemple :** Recherche des offres caractérisées par l'activité opérationnelle « 227 - Pédopsychiatrie infanto-juvénile »

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|227 #critère de recherche sur l'activité opérationnelle
&_include=HealthcareService:organization #inclus les Organization référencées par HealthcareService 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par HealthcareService
&_include=HealthcareService:location #inclus les Location référencées par HealthcareService
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
```

**Description du scénario :** Un consommateur cherche les offres ayant une activité opérationnelle qui correspond à l'une des valeurs recherchées par le consommateur.

**Exemple :** Recherche des offres caractérisées par l'activité opérationnelle « 005 – Allergologie » ou l'activité opérationnelle « 481 - Médecine générale à orientation Allergologie ».

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?_filter=(specialty eq https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|005 or https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|481) #critère de recherche sur l'activité opérationnelle
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Servicen
&_include=HealthcareService:location #inclus les Location référencées par Healthcare Service
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
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
#### 4 Rechercher par type d'offre et modalité d'accueil (service-category, characteristic)
**Description du scénario :** Un consommateur cherche les offres ayant un type d'offre ET une modalité d'accueil qu'il indique.

**Exemple :** Recherche des offres caractérisées par un type d'offre « 50 – Institut thérapeutique éducatif et pédagogique (ITEP)» et une modalité d'accueil « 01 – Accueil séquentiel accepté »

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?service-category=https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|50 #critère de recherche sur le type d'offre
&characteristic=https://mos.esante.gouv.fr/NOS/TRE_R338-ModaliteAccueil/FHIR/TRE-R338-ModaliteAccueil|01 #critère de recherche sur la modalité d'accueil
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par Healthcare Service
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
```

**Description du scénario :** Un consommateur cherche les offres ayant un type d'offre OU une activité opérationnelle qu'il indique pour un patient d'âge donné.

**Exemple :** Recherche des offres caractérisées par le type d'offre « 102 - Soins Médicaux et de Réadaptation (SMR) locomoteur » OU une activité opérationnelle « 233 - Réadaptation des affections de l'appareil locomoteur » pour un patient de 35 ans.(age-range-low <=35 et age-range-high >=35)

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?_filter=(((service-category eq https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|102) or (specialty eq https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|233)) #critère de recherche sur l'activité opérationnelle OU (or) sur la catégorie d'organisation
and (age-range-low le 35|https://unitsofmeasure.org|a and age-range-high ge 35|https://unitsofmeasure.org|a)) #critère de recherche sur l'age du patient
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par Healthcare Service
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
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
#### 5 Rechercher à proximité géographique (location.near-insee-code, location.near)
**Description du scénario :** Un consommateur cherche les offres ayant une activité opérationnelle particulière, dans un périmètre géographique proche du lieu de résidence d'un patient.

**Exemple :** Recherche des offres caractérisées par l'activité opérationnelle « 013 – Cardiologie générale », située dans un rayon de 15 kilomètres autour de Saint-Herblain (code commune 44162)

**Requête 1 expliquée (near-insee-code) :**

```sh
GET [BASE]/HealthcareService?specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|013 #critère de recherche sur l'activité opérationnelle
&location.near-insee-code=44162|15|km #critère de périmètre géographique – paramètre chainé – exemple : YY km autour du point de référence latitude et longitude dont le système de référence est WGS84 
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par Healthcare Service
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
```

<blockquote class="stu-note">
<p>
  <b>Particularité sur « Calculated Distance »</b>
  <br>
  L'extension <a href="https://www.hl7.org/fhir/R4/extension-location-distance.html" target="_blank">location-distance</a> de <code>Bundle.entry.search</code> est utilisée par le ROR pour remonter, sur chaque <code>Location</code> incluse, sa distance calculée par rapport au point de référence de la recherche.
</p>
</blockquote>

**Requête 2 expliquée (near) :**

```sh
GET [BASE]/HealthcareService?specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|013 #critère de recherche sur l'activité opérationnelle
&location.near=47.21827323906432|-1.6369631507460436|15|km #critère de périmètre géographique – paramètre chainé – exemple : YY km autour du point de référence latitude et longitude dont le système de référence est WGS84 
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par Healthcare Service
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
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
#### 6 Rechercher par département, code postal ou commune (location.address-postalcode, location.commune-cog)
**Description du scénario :** Un consommateur recherche les offres ayant un type d'offre, un mode de prise en charge et une spécialisation de prise en charge, sur un département, ou un ensemble de département (code postal).

**Exemple :** Recherche des offres caractérisées par le type d'offre "21 - Accueil ou hébergement pour personnes âgées dépendantes, sans spécificité » proposant un mode de prise en charge « 46 – Accueil de jour » et une spécialisation de prise en charge « 24 - Handicap à prédominance cognitive avec trouble du comportement (dont traumatisé crânien, syndrome de Korsakoff,...)» et située dans le département 71.

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?location.address-postalcode=71 # critère de recherche sur un département ou un ensemble de département (2 premier chiffres du code postal)
&service-category=https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|21 #critère sur le type d'offre
&characteristic=https://mos.esante.gouv.fr/NOS/TRE_R213-ModePriseEnCharge/FHIR/TRE-R213-ModePriseEnCharge|46 #critère de recherche sur le mode de prise en charge
&characteristic=https://mos.esante.gouv.fr/NOS/TRE_R245-SpecialisationDePriseEnCharge/FHIR/TRE-R245-SpecialisationDePriseEnCharge|24 #critère de recherche sur la spécialisation de prise en charge
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par Healthcare Service
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
```

**Description du scénario :** Un consommateur recherche les offres proposant une activité opérationnelle particulière et un acte spécifique particulier sur une ville, ou un ensemble de villes (code postal).

**Exemple :** Recherche des offres caractérisées par l'activité opérationnelle «017 – Chirurgie de l'obésité (bariatrique) » et proposant l'acte spécifique «0529 - Pose d'anneau gastrique » sur les communes dont le code postal est 60000 (Frocourt) ou 76620 (Le Havre).

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?_filter=(location.address-postalcode eq "60000" or "76620") #critère de recherche sur une ville ou un ensemble de ville en rentrant le code postal 
&specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|017 #critère de recherche sur l'activité opérationnelle
&characteristic=https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique|0529 #critère de recherche sur l'acte spécifique
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par Healthcare Service
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
```

**Description du scénario :** Un consommateur recherche les offres proposant une activité opérationnelle particulière et un mode de prise en charge particulier, sur une ville, ou un ensemble de villes (code commune).

**Exemple :** Recherche des offres caractérisées par l'activité opérationnelle « 437 – médecine générale » et un mode de prise en charge « 032 – Consultation », sur les communes 18000 (Bourges) ou 13013 (Belcodène)

**Requête 2 expliquée :**

```sh
GET [BASE]/HealthcareService?location.commune-cog=https://mos.esante.gouv.fr/NOS/TRE_R13-CommuneOM/FHIR/TRE-R13-CommuneOM|18000,13013 #critere de recherche sur une ville ou un ensemble de ville via le code commune
&specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|437  #critère de recherche sur l'activité opérationnelle
&characteristic=https://mos.esante.gouv.fr/NOS/TRE_R213-ModePriseEnCharge/FHIR/TRE-R213-ModePriseEnCharge|032  #critère de recherche sur le mode de prise en charge
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par Healthcare Service
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
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
#### 7 Rechercher par zone d'intervention ou par professionnel (intervention-zone, _has)
**Description du scénario :** Un consommateur cherche les offres ayant un type d'offre particulier et une activité opérationnelle particulière, dans une commune faisant partie d'une zone d'intervention.

**Exemple :** Recherche des offres caractérisées par le type d'offre « 30 – Service d'aide et d'accompagnement à domicile (SAAD) », proposant une activité opérationnelle de type « 293 - Accompagnements pour accomplir les activités domestiques » et ayant la commune 29151 dans la zone d'intervention.

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?intervention-zone=https://mos.esante.gouv.fr/NOS/TRE_R13-CommuneOM/FHIR/TRE-R13-CommuneOM|29151 #critère de recherche sur la commune faisant partie d'une zone d'intervention
&service-category=https://mos.esante.gouv.fr/NOS/TRE_R244-CategorieOrganisation/FHIR/TRE-R244-CategorieOrganisation|30 #critère sur le type d'offre
&specialty=https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle|293 #critère de recherche sur l'activité opérationnelle
&_include=HealthcareService:organization #inclus les Organization référencées par Healthcare Service 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par Healthcare Service
&_include=HealthcareService:location #inclus les Location référencées par Healthcare Service
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
```

**Description du scénario :** Un consommateur cherche les offres d'un professionnel à partir de son identifiant fonctionnel = XXX.

**Requête expliquée :**

```sh
GET [BASE]/HealthcareService?_has:PractitionerRole:service:practitioner.identifier=XXX #critère de recherche sur l'identifiant fonctionnel du professionnel (chainage)
&_include=HealthcareService:organization #inclus les Organization référencées par HealthcareService 
&_include:iterate=Organization:partof #inclus TOUTES (iterate) les Organization liées aux Organization référencées par HealthcareService
&_include=HealthcareService:location #inclus les Location référencées par HealthcareService
&_revinclude=PractitionerRole:service #inclus les PractitionerRole qui référencent le HealthcareService
&_include=PractitionerRole:practitioner #inclus les Practitioner référencés par PractitionerRole
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
