---
layout: menu-guide
section: guide
title: RORLocation
subTitle: Ressources FHIR
---

<div class="wysiwyg" markdown="1">
- [Présentation de la ressource](#presentation)
- [Caractéristiques techniques](#caracteristiques)
- [Recherche sur critères](#recherche-criteres)
  - [Rechercher tout](#recherche-tout)
  - [Rechercher par identifiant](#recherche-identifiant)
  - [Rechercher par fonction du lieu](#recherche-fonction-lieu)
  - [Rechercher par localisation (code postal, ville, commune)](#recherche-localisation)
  - [Rechercher par proximité géographique](#recherche-proximite)
  - [Rechercher par date de mise à jour](#recherche-date-maj)
- [Paramètres de recherche](#parametres-recherche)
</div>
<br />

<a id="presentation"></a>
## 1. Présentation de la ressource
`RORLocation` est un profil créé dans le cadre du ROR pour décrire l'espace disposant d'un ensemble de ressources permettant de réaliser une offre : lieu de réalisation de l'offre (adresse, coordonnées géographiques), capacités d'accueil et équipements spécifiques.

Une instance `RORLocation` est référencée par une ou plusieurs instances [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}) correspondant aux offres réalisées sur ce lieu.

Selon les cas d'usage, la ressource `RORLocation` porte également :
- des informations de **capacité d'accueil opérationnelle** (nombre de lits/places, statut, temporalité, genre, etc.), utiles notamment aux éditeurs de solutions de bed management ;
- des informations d'**équipements spécifiques** et leurs caractéristiques limites (ex. poids maximum supporté) ;
- des informations de **capacité d'habitation** (type et nombre d'habitations), pour les structures d'hébergement.

<a id="caracteristiques"></a>
## 2. Caractéristiques techniques de la ressource
<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/Location` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` (recherche), `POST` (création — voir [Saisie de l'offre]({{ '/pages/guide/modeleV3/exemples/saisie-offre.html' | relative_url }})), `PATCH` (mise à jour — voir [Création et mise à jour du lieu de réalisation de l'offre]({{ '/pages/guide/modeleV3/exemples/creation-maj-lieu-offre.html' | relative_url }})) |
| Header requis | `Authorization: Bearer <access_token>`, ainsi que les 4 headers `Ror-*` (`Ror-Profil-Utilisateur-Code`, `Ror-Profil-Utilisateur-System`, `Ror-Role-Metier-Code`, `Ror-Role-Metier-System`) décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }}) |

</div>

<a id="recherche-criteres"></a>
## 3. Recherche sur critères
Voici quelques exemples de requêtes sur les lieux de réalisation de l'offre.

<a id="recherche-tout"></a>
#### 3.1 Rechercher tout (sans critère)
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

<blockquote class="callout-warning">
<p><strong>Attention :</strong> pour récupérer l'ensemble des résultats au niveau national ou au niveau d'une région, vous devez impérativement utiliser la méthode <code>$export</code> de FHIR. Les résultats de cette requête seront tronqués à 10 000 résultats.</p>
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
#### 3.2 Rechercher par identifiant
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
#### 3.3 Rechercher par fonction du lieu
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
#### 3.4 Rechercher par localisation (code postal, ville, commune)
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
#### 3.5 Rechercher par proximité géographique
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
#### 3.6 Rechercher par date de mise à jour
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

<a id="parametres-recherche"></a>
## 4. Paramètres de recherche
La ressource `RORLocation` peut être interrogée à l'aide de plusieurs paramètres de recherche, notamment l'identifiant, la fonction du lieu, l'adresse ou la localisation géographique.

Profil officiel : [RORLocation]({{ site.ror.ig_url }}/StructureDefinition-ror-location.html){:target="_blank"}

<div class="wysiwyg" markdown="1">

| Attribut ME 3.0 | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _filter | Oui | special | Paramètre de recherche de filtre qui prend en charge une grammaire de recherche plus sophistiquée. Voir la documentation (https://hl7.org/fhir/search_filter.html) pour plus de détails |
| - | _has | Oui | special | Permet d’utiliser les paramètres de recherche des ressources faisant référence à une autre ressource (chainage inversé) |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource <code><span style="color: #ff0000;">draft</span></code> |
| - | _id | Oui | token | Identification technique de la ressource |
| - | near | Oui | special | Recherche positionnelle (coordonnées géographique) |
| - | near - insee -code | Non | special | Recherche positionnelle (code INSEE commune) |
| - | status | Oui | token | Statut de la ressource |
| Metadonnee / dateMiseJour | _ lastUpdated | Oui | date | Date de dernière mise à jour. |
| Metadonnee / regionSource | _tag | Oui | token | Code de la région de la source de la donnée |
| idExterneSynchro | identifier | Oui | token | L'identifiant externe de synchronisation est l'identifiant défini par le porteur d'offre pour la zone d'hébergement des lits. Location.identifier.type = 26 \| JDV_J236 |
| identifiant | identifier | Oui | token | Identifiant fonctionnel du lieu. Location.identifier.type = 25 \| JDV_J236 |
| fonctionLieu | type | Oui | token | La fonction correspond à la destination d'usage du lieu JDV_J198-FonctionLieu-ROR issu de la TRE_R343-FonctionLieu |
| Adresse/ codePostal | address -postalcode | Oui | string | Code Postal ou code postal spécifique CEDEX |
| Adresse/ localite | address -city | Oui | string | Localité ou Libellé du bureau distributeur CEDEX |
| Lieu/ communeCOG | commune - cog | Non | token | Code officiel géographique (COG) de la commune dans laquelle le lieu est situé. JDV-J124-Commune issu de la TRE_R13-Commune |
| CapacitePriseCharge / affectationTemporaire | temporary -assignement | Non | token | L'affectation temporaire permet de réserver tout ou partie des lits d'une zone d'hébergement pour des patients selon qu'ils soient -ou non- concernés par une pathologie (Covid+, Covid-, ...) ou un évènement (catastrophe naturelle, attentat, ...). JDV_J195-AffectationTemporaire-ROR issu de la TRE_R337-AffectationTemporaire |
| CapaciteAccueilOperationnelle / statutCapacite | capacity -status | Non | token | Permet de préciser le statut des lits décrits. JDV_J188-TypeStatutCapacite-ROR issu de la TRE-R330-TypeStatutCapacite |
| Statut | operational -status | Oui | token | Indique si le lieu est opérationnel, fermé temporairement ou fermé définitivement. JDV_J204-StatutLieu-ROR issu de la TRE_R203-StatutLieu <code><span style="color: #ff0000;">draft</span></code> |
| CapaciteAccueilOperationnelle / nombreCapacite | nb - capacity | Non | number | Quantité de lits ou places de la capacité exprimée. |
| CapaciteAccueilOperationnelle / natureCapacite | capacity -type | Non | token | Indique si la capacité est exprimée en lits ou en places. JDV_J187-NatureCapacite-ROR issu de la TRE_R329-NatureCapacite |
| CapaciteAccueilOperationnelle / temporaliteCapacite | temporality -capacity | Non | token | Indique le moment où cette capacité sera effective. Il est ainsi possible de décrire la situation immédiate, ou de fournir des informations prospectives de capacités, prenant notamment en compte les entrées et sorties déjà identifiés de patients. JDV_J189-TemporaliteCapacite-ROR issu de la TRE_R331-Temporalite |
| CapaciteAccueilOperationnelle / genreCapaciteDispo | gender -capacity-available | Non | token | Genre des patients qui peuvent étre installés dans des lits disponibles. JDV_J190-GenreCapacite-ROR issu de la TRE_R332-GenreCapacite |
| CapaciteAccueilOperationnelle / typeFermetureCapacite | capacity - closing -type | Non | token | Indique le statut de lits fermés, permettant d'identifier le nombre de lits fermés qui peuvent être réactivés en cas de besoin et le nombre de ceux qui ne peuvent pas l'être. JDV_J191-TypeFermetureCapacite-ROR issu de la TRE_R333-TypeFermetureCapacite |
| CapaciteAccueilOperationnelle / typeLitSupplementaire | additional - bed -type | Non | token | Indique le statut de lits supplémentaires, pour identifier le nombre de lits supplémentaires déjà mobilisés et, par typologie de mobilisation possible, le nombre de lits qui ne le sont pas encore. JDV_J192-TypeLitSupplementaire-ROR issu de la TRE_R334-TypeLitSupplementaire |
| CapaciteAccueilOperationnelle / typeCrise | crisis -type | Non | token | Indique le type de crise qui permet de mobiliser le nombre de lits supplémentaires décrits. JDV_J194-TypeCrise-ROR issu de la TRE_R336-TypeCrise |
| CapaciteAccueilOperationnelle / dateMAJCapacite | capacity -update-date | Non | date | Date à laquelle la capacité d'accueil a été mise à jour dans la source. |
| EquipementSpecifique / typeEquipement | equipment -type | Non | token | Les équipements spécifiques décrits sont des ressources propres de la structure ou mises à disposition dans le cadre d'une convention à la condition qu'elles soient utilisées sur site. JDV_J18-EquipementSpecifique-ROR issu de la TRE_R212-Equipement |
| LimiteCaracteristiqueEquipement / typeCaracteristique | equipment -feature | Non | token | Indique la caractéristique de l'équipement pour laquelle une valeur limite est précisée. JDV_J228-TypeCaracteristiqueEquipement-ROR |
| LimiteCaracteristiqueEquipement / valeurLimite | limit -value | Non | quantity | Correspond à la valeur extrême associée à une caractéristique de l'équipement. TRE_R247-UcumUniteMesure |
| CapaciteHabitation / typeHabitation | residential -type | Non | token | Le type d'habitation renseigne sur la taille et le nombre de pièces d'un logement. JDV_J32-TypeHabitation-ROR issu de la TRE_R242-TypeHabitation |
| CapaciteHabitation / nbHabitation | residential -number | Non | number | Nombre d'habitations du même type. |

</div>
