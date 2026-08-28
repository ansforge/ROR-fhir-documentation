---
layout: menu-guide
section: guide
title: RORLocation
subTitle: GET
---

Cette page présente des exemples de requêtes `GET` sur la ressource [RORLocation]({{ '/pages/guide/modeleV3/resources/location.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

Voici quelques exemples de requêtes sur les lieux de réalisation de l'offre.

<blockquote class="callout-warning">
<p><strong>Attention :</strong> pour récupérer l'ensemble des résultats au niveau national ou au niveau d'une région, vous devez impérativement utiliser la méthode <code>$export</code> avec l'API `HealthcareService`. Les résultats de cette requête seront tronqués à 10 000 résultats.</p>
</blockquote>

<a id="recherche-tout"></a>
#### 1 Rechercher tout (sans critère)
**Description du scénario :** Un consommateur souhaite récupérer l'ensemble des lieux de réalisation de l'offre, actifs et inactifs.

**Requête expliquée :**

```sh
GET [BASE]/Location
```

**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre ainsi que les organisations (Organization) qu'ils référencent.

**Requête expliquée :**

```sh
GET [BASE]/Location?_include=Location:organization #inclus, le cas échéant, les Organization référencées par le lieu
```

**Description du scénario :** Un consommateur souhaite récupérer uniquement les lieux de réalisation de l'offre actifs.

**Requête expliquée :**

```sh
GET [BASE]/Location?status=active #critère de recherche sur le statut actif du lieu
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
     "{{BASE}}/Location"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Location.class)
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Location location = (Location) entry.getResource();
    logger.info("Location found: id={} name={}", location.getIdElement().getIdPart(), location.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Location"
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
    location = entry["resource"]
    print(f"Location found: id={location['id']} name={location.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-identifiant"></a>
#### 2 Rechercher par identifiant
**Description du scénario :** Un consommateur souhaite récupérer un lieu de réalisation de l'offre à partir de son identifiant fonctionnel.

**Requête expliquée :**

```sh
GET [BASE]/Location?identifier=XXX #critère de recherche sur l'identifiant fonctionnel du lieu (Location.identifier.type = 25 | JDV_J236)
```

**Description du scénario :** Un consommateur souhaite récupérer un lieu de réalisation de l'offre à partir de son identifiant, en précisant explicitement le système de la typologie d'identifiant.

**Requête expliquée :**

```sh
GET [BASE]/Location?identifier=https://mos.esante.gouv.fr/NOS/JDV_J236-TypologieIdentifiantLieu-ROR/FHIR/JDV-J236-TypologieIdentifiantLieu-ROR|XXX #critère de recherche sur l'identifiant du lieu, système de la typologie d'identifiant explicite
```

**Description du scénario :** Un consommateur souhaite récupérer un lieu de réalisation de l'offre à partir de l'identifiant externe de synchronisation défini par le porteur d'offre pour la zone d'hébergement des lits, ainsi que l'organisation à laquelle il est rattaché.

**Requête expliquée :**

```sh
GET [BASE]/Location?identifier=YYY #critère de recherche sur l'identifiant externe de synchronisation du lieu (Location.identifier.type = 26 | JDV_J236)
&_include=Location:organization #inclus l'Organization associée
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
     "{{BASE}}/Location?identifier=XXX"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Location.class)
        .where(Location.IDENTIFIER.exactly().identifier("XXX"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Location location = (Location) entry.getResource();
    logger.info("Location found: id={} name={}", location.getIdElement().getIdPart(), location.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Location"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"identifier": "XXX"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    location = entry["resource"]
    print(f"Location found: id={location['id']} name={location.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-fonction-lieu"></a>
#### 3 Rechercher par fonction du lieu
**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre correspondant à une fonction donnée, codée dans la JDV_J198-FonctionLieu-ROR issue de la TRE_R343-FonctionLieu.

**Exemple :** Recherche des lieux dont la fonction est « 001 - Hébergement ».

**Requête expliquée :**

```sh
GET [BASE]/Location?type=https://mos.esante.gouv.fr/NOS/TRE_R343-FonctionLieu/FHIR/TRE-R343-FonctionLieu|001 #critère de recherche sur la fonction du lieu
```

**Description du scénario :** Un consommateur souhaite récupérer les lieux actifs correspondant à une fonction donnée.

**Exemple :** Recherche des lieux actifs dont la fonction est « 002 - Consultation ».

**Requête expliquée :**

```sh
GET [BASE]/Location?type=https://mos.esante.gouv.fr/NOS/TRE_R343-FonctionLieu/FHIR/TRE-R343-FonctionLieu|002 #critère de recherche sur la fonction du lieu
&status=active #critère de recherche sur le statut actif du lieu
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
     "{{BASE}}/Location?type=https://mos.esante.gouv.fr/NOS/TRE_R343-FonctionLieu/FHIR/TRE-R343-FonctionLieu|001"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Location.class)
        .where(Location.TYPE.exactly()
                .systemAndCode("https://mos.esante.gouv.fr/NOS/TRE_R343-FonctionLieu/FHIR/TRE-R343-FonctionLieu", "001"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Location location = (Location) entry.getResource();
    logger.info("Location found: id={} name={}", location.getIdElement().getIdPart(), location.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Location"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "type": "https://mos.esante.gouv.fr/NOS/TRE_R343-FonctionLieu/FHIR/TRE-R343-FonctionLieu|001",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    location = entry["resource"]
    print(f"Location found: id={location['id']} name={location.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-localisation"></a>
#### 4 Rechercher par localisation (code postal, ville, commune)
**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre situés dans une ville donnée, à partir de son code postal.

**Exemple :** Recherche des lieux dont le code postal est « 44000 » (Nantes).

**Requête expliquée :**

```sh
GET [BASE]/Location?address-postalcode=44000 #critère de recherche sur le code postal
```

**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre situés dans une ville donnée, à partir de son nom.

**Exemple :** Recherche des lieux dont la localité est « Nantes ».

**Requête expliquée :**

```sh
GET [BASE]/Location?address-city=Nantes #critère de recherche sur la localité
```

**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre situés dans une commune identifiée par son code officiel géographique (COG).

**Exemple :** Recherche des lieux situés dans la commune de Nantes (code COG « 44109 »).

**Requête expliquée :**

```sh
GET [BASE]/Location?commune-cog=https://mos.esante.gouv.fr/NOS/TRE_R13-CommuneOM/FHIR/TRE-R13-CommuneOM|44109 #critère de recherche sur le code officiel géographique (COG) de la commune
```

**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre situés sur un ensemble de villes, à partir de plusieurs codes postaux à la fois.

**Exemple :** Recherche des lieux situés sur les communes dont le code postal est « 60000 » ou « 76620 ».

**Requête expliquée :**

```sh
GET [BASE]/Location?_filter=(address-postalcode eq "60000" or "76620") #critère de recherche avancé (filter) sur plusieurs codes postaux
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
     "{{BASE}}/Location?address-postalcode=44000"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Location.class)
        .where(Location.ADDRESS_POSTALCODE.matches().value("44000"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Location location = (Location) entry.getResource();
    logger.info("Location found: id={} name={}", location.getIdElement().getIdPart(), location.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Location"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"address-postalcode": "44000"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    location = entry["resource"]
    print(f"Location found: id={location['id']} name={location.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-proximite"></a>
#### 5 Rechercher par proximité géographique
**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre situés dans un rayon donné autour d'un point de référence défini par ses coordonnées géographiques.

**Exemple :** Recherche des lieux situés dans un rayon de « 15 km » autour du point de référence de latitude « 47.21827323906432 » et de longitude « -1.6369631507460436 » (système WGS84).

**Requête expliquée :**

```sh
GET [BASE]/Location?near=47.21827323906432|-1.6369631507460436|15|km #critère de recherche positionnelle (latitude|longitude|distance|unité, système WGS84)
```

**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre situés dans un rayon donné autour d'une commune identifiée par son code INSEE.

**Exemple :** Recherche des lieux situés dans un rayon de « 15 km » autour de la commune « 44162 » (Saint-Herblain).

**Requête expliquée :**

```sh
GET [BASE]/Location?near-insee-code=44162|15|km #critère de recherche positionnelle (code INSEE commune|distance|unité)
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
     "{{BASE}}/Location?near=47.21827323906432|-1.6369631507460436|15|km"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Location.class)
        .where(Location.NEAR.withCoordinates(47.21827323906432, -1.6369631507460436)
                .withinDistance(15.0)
                .units("km"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Location location = (Location) entry.getResource();
    logger.info("Location found: id={} name={}", location.getIdElement().getIdPart(), location.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Location"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"near": "47.21827323906432|-1.6369631507460436|15|km"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    location = entry["resource"]
    print(f"Location found: id={location['id']} name={location.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<blockquote class="stu-note">
<p>
  <b>Particularité sur "Calculated Distance"</b>
  <br>
L'extension <a href="https://www.hl7.org/fhir/R4/extension-location-distance.html" target="_blank">https://www.hl7.org/fhir/R4/extension-location-distance.html</a> de <code>Bundle.entry.search</code> est utilisée dans l'implémentation du ROR, afin de remonter la distance calculée entre le point de référence et chaque lieu trouvé.
</p>
</blockquote>

<a id="recherche-date-maj"></a>
#### 6 Rechercher par date de mise à jour
**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre qui ont été mis à jour depuis une certaine date, afin de synchroniser son système d'information.

**Exemple :** Recherche des lieux mis à jour depuis le « 1er janvier 2024 ».

**Requête expliquée :**

```sh
GET [BASE]/Location?_lastUpdated=ge2024-01-01 #critère de recherche sur la date de mise à jour (ge = greater or equal)
```

**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre mis à jour sur une période donnée.

**Exemple :** Recherche des lieux mis à jour entre le « 1er » et le « 31 janvier 2024 ».

**Requête expliquée :**

```sh
GET [BASE]/Location?_lastUpdated=ge2024-01-01T00:00:00%2B01:00 #borne basse de la période (ge = greater or equal)
&_lastUpdated=le2024-01-31T23:59:59%2B01:00 #borne haute de la période (le = less or equal)
```

**Description du scénario :** Un consommateur souhaite récupérer les lieux de réalisation de l'offre mis à jour depuis une certaine date, triés par date de mise à jour croissante.

**Exemple :** Recherche des lieux mis à jour depuis le « 1er janvier 2024 », triés par date de mise à jour croissante.

**Requête expliquée :**

```sh
GET [BASE]/Location?_lastUpdated=ge2024-01-01 #critère de recherche sur la date de mise à jour (ge = greater or equal)
&_sort=_lastUpdated #tri des résultats par date de mise à jour croissante
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
     "{{BASE}}/Location?_lastUpdated=ge2024-01-01"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Location.class)
        .lastUpdated(new DateRangeParam().setLowerBound("2024-01-01"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Location location = (Location) entry.getResource();
    logger.info("Location found: id={} name={}", location.getIdElement().getIdPart(), location.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Location"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"_lastUpdated": "ge2024-01-01"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    location = entry["resource"]
    print(f"Location found: id={location['id']} name={location.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />
