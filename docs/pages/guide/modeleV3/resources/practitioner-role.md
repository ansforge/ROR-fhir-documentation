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
- [Recherche sur critères](#recherche-criteres)
  - [Rechercher tout](#recherche-tout)
  - [Rechercher par identifiant technique](#recherche-id-technique)
  - [Rechercher par identifiant fonctionnel](#recherche-identifiant)
  - [Rechercher par date de dernière mise à jour](#recherche-lastupdated)
  - [Rechercher par région source](#recherche-tag)
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

<a id="recherche-criteres"></a>
## 4. Recherche sur critères
Voici quelques exemples de requêtes sur les situations opérationnelles / exercices professionnels.

<a id="recherche-tout"></a>
#### 4.1 Rechercher tout (sans critère)
**Récit utilisateur :**
En tant que client de l'API, je souhaite récupérer l'ensemble des situations opérationnelles.

**Requêtes :**

```sh
GET [BASE]/PractitionerRole
# récupère l'ensemble des PractitionerRole (actifs et inactifs)

GET [BASE]/PractitionerRole?_include=PractitionerRole:practitioner&_include=PractitionerRole:organization
# inclure les Practitioner et Organization référencés
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
     "{{BASE}}/PractitionerRole"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(PractitionerRole.class)
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    PractitionerRole practitionerRole = (PractitionerRole) entry.getResource();
    logger.info("PractitionerRole found: id={}", practitionerRole.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/PractitionerRole"
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
    practitioner_role = entry["resource"]
    print(f"PractitionerRole found: id={practitioner_role['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-id-technique"></a>
#### 4.2 Rechercher par identifiant technique
**Récit utilisateur :**
En tant que client de l'API, connaissant l'identifiant technique (`id`) d'une situation opérationnelle, je souhaite récupérer la ressource `PractitionerRole` correspondante.

**Requêtes :**

```sh
GET [BASE]/PractitionerRole?_id=753
# récupère la situation opérationnelle dont l'identifiant technique est 753

GET [BASE]/PractitionerRole/753
# équivalent en lecture directe (interaction FHIR "read")
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
     "{{BASE}}/PractitionerRole?_id=753"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(PractitionerRole.class)
        .where(new TokenClientParam("_id").exactly().code("753"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    PractitionerRole practitionerRole = (PractitionerRole) entry.getResource();
    logger.info("PractitionerRole found: id={}", practitionerRole.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/PractitionerRole"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"_id": "753"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    practitioner_role = entry["resource"]
    print(f"PractitionerRole found: id={practitioner_role['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-identifiant"></a>
#### 4.3 Rechercher par identifiant fonctionnel
**Récit utilisateur :**
En tant que client de l'API, connaissant l'identifiant fonctionnel (`identifier`), unique et persistant au niveau national, d'une situation opérationnelle, je souhaite récupérer la ressource `PractitionerRole` correspondante ainsi que le professionnel et l'offre associés.

**Requêtes :**

```sh
GET [BASE]/PractitionerRole?identifier=11102379616
# récupère la situation opérationnelle dont l'identifiant fonctionnel est 11102379616

GET [BASE]/PractitionerRole?identifier=11102379616&_include=PractitionerRole:practitioner&_include=PractitionerRole:organization
# inclure le Practitioner et l'Organization / HealthcareService référencés
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
     "{{BASE}}/PractitionerRole?identifier=11102379616"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(PractitionerRole.class)
        .where(new TokenClientParam("identifier").exactly().code("11102379616"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    PractitionerRole practitionerRole = (PractitionerRole) entry.getResource();
    logger.info("PractitionerRole found: id={}", practitionerRole.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/PractitionerRole"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"identifier": "11102379616"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    practitioner_role = entry["resource"]
    print(f"PractitionerRole found: id={practitioner_role['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-lastupdated"></a>
#### 4.4 Rechercher par date de dernière mise à jour
**Récit utilisateur :**
En tant que client de l'API, je souhaite récupérer les situations opérationnelles ayant fait l'objet d'une mise à jour depuis une date donnée, afin de synchroniser mon système d'information (mode delta).

**Requêtes :**

```sh
GET [BASE]/PractitionerRole?_lastUpdated=ge2023-12-01
# récupère les situations opérationnelles mises à jour depuis le 1er décembre 2023

GET [BASE]/PractitionerRole?_lastUpdated=ge2023-12-01&_include=PractitionerRole:practitioner&_include=PractitionerRole:organization
# idem, en incluant le Practitioner et l'Organization / HealthcareService référencés
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
     "{{BASE}}/PractitionerRole?_lastUpdated=ge2023-12-01"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(PractitionerRole.class)
        .where(new DateClientParam("_lastUpdated").afterOrEquals().day("2023-12-01"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    PractitionerRole practitionerRole = (PractitionerRole) entry.getResource();
    logger.info("PractitionerRole found: id={}", practitionerRole.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/PractitionerRole"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"_lastUpdated": "ge2023-12-01"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    practitioner_role = entry["resource"]
    print(f"PractitionerRole found: id={practitioner_role['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-tag"></a>
#### 4.5 Rechercher par région source
**Récit utilisateur :**
En tant que responsable qualité régional, je souhaite récupérer les situations opérationnelles dont la région source de la donnée est la mienne, afin d'en vérifier la cohérence.

**Requêtes :**

```sh
GET [BASE]/PractitionerRole?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|52
# récupère les situations opérationnelles dont la région source est 52 (Pays de la Loire)
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
     "{{BASE}}/PractitionerRole?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM%7C52"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(PractitionerRole.class)
        .where(new TokenClientParam("_tag").exactly()
                .systemAndCode("https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM", "52"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    PractitionerRole practitionerRole = (PractitionerRole) entry.getResource();
    logger.info("PractitionerRole found: id={}", practitionerRole.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/PractitionerRole"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"_tag": "https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|52"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    practitioner_role = entry["resource"]
    print(f"PractitionerRole found: id={practitioner_role['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />
