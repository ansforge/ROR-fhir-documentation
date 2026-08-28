---
layout: menu-guide
section: guide
title: RORPractitionerRole
subTitle: GET
---

Cette page présente des exemples de requêtes `GET` sur la ressource [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

Voici quelques exemples de requêtes sur les situations opérationnelles / exercices professionnels.

<blockquote class="callout-warning">
<p><strong>Attention :</strong> pour récupérer l'ensemble des résultats au niveau national ou au niveau d'une région, vous devez impérativement utiliser la méthode <code>$export</code>  avec l'API `HealthcareService`. Les résultats de cette requête seront tronqués à 10 000 résultats.</p>
</blockquote>

<a id="recherche-tout"></a>
#### 1 Rechercher tout (sans critère)
**Description du scénario :** Un consommateur souhaite récupérer l'ensemble des situations opérationnelles, actives et inactives.

**Requête expliquée :**

```sh
GET [BASE]/PractitionerRole
```

**Description du scénario :** Un consommateur souhaite récupérer les situations opérationnelles ainsi que les professionnels et les organisations ou offres qui y sont rattachés.

**Requête expliquée :**

```sh
GET [BASE]/PractitionerRole?_include=PractitionerRole:practitioner #inclus le Practitioner référencé par la situation opérationnelle
&_include=PractitionerRole:organization #inclus l'Organization ou le HealthcareService référencé par la situation opérationnelle
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
#### 2 Rechercher par identifiant technique
**Description du scénario :** Un consommateur souhaite récupérer une situation opérationnelle à partir de son identifiant technique.

**Exemple :** Recherche de la situation opérationnelle dont l'identifiant technique est 753.

**Requête expliquée :**

```sh
GET [BASE]/PractitionerRole?_id=753 #critère de recherche sur l'identifiant technique
```

**Description du scénario :** Un consommateur cherche à récupérer une situation opérationnelle par lecture directe, connaissant son identifiant technique.

**Exemple :** Recherche de la situation opérationnelle dont l'identifiant technique est 753, par lecture directe (interaction FHIR « read »).

**Requête expliquée :**

```sh
GET [BASE]/PractitionerRole/753
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
#### 3 Rechercher par identifiant fonctionnel
**Description du scénario :** Un consommateur souhaite récupérer une situation opérationnelle à partir de son identifiant fonctionnel, unique et persistant au niveau national.

**Exemple :** Recherche de la situation opérationnelle dont l'identifiant fonctionnel est 11102379616.

**Requête expliquée :**

```sh
GET [BASE]/PractitionerRole?identifier=11102379616 #critère de recherche sur l'identifiant fonctionnel
```

**Description du scénario :** Un consommateur souhaite récupérer une situation opérationnelle à partir de son identifiant fonctionnel, ainsi que le professionnel et l'organisation ou l'offre qui lui sont rattachés.

**Exemple :** Recherche de la situation opérationnelle dont l'identifiant fonctionnel est 11102379616, avec inclusion du professionnel et de l'organisation ou de l'offre associés.

**Requête expliquée :**

```sh
GET [BASE]/PractitionerRole?identifier=11102379616 #critère de recherche sur l'identifiant fonctionnel
&_include=PractitionerRole:practitioner #inclus le Practitioner référencé par la situation opérationnelle
&_include=PractitionerRole:organization #inclus l'Organization ou le HealthcareService référencé par la situation opérationnelle
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
#### 4 Rechercher par date de dernière mise à jour
**Description du scénario :** Un consommateur souhaite récupérer toutes les situations opérationnelles mises à jour depuis une certaine date, afin de synchroniser son système d'information (mode delta).

**Exemple :** Recherche des situations opérationnelles mises à jour depuis le 1er décembre 2023 (inclus) jusqu'à aujourd'hui.

**Requête expliquée :**

```sh
GET [BASE]/PractitionerRole?_lastUpdated=ge2023-12-01 #critère de recherche sur la date de mise à jour (ge = greater or equal)
```

**Description du scénario :** Un consommateur souhaite récupérer toutes les situations opérationnelles mises à jour depuis une certaine date, ainsi que le professionnel et l'organisation ou l'offre qui leur sont rattachés.

**Exemple :** Recherche des situations opérationnelles mises à jour depuis le 1er décembre 2023, avec inclusion du professionnel et de l'organisation ou de l'offre associés.

**Requête expliquée :**

```sh
GET [BASE]/PractitionerRole?_lastUpdated=ge2023-12-01 #critère de recherche sur la date de mise à jour (ge = greater or equal)
&_include=PractitionerRole:practitioner #inclus le Practitioner référencé par la situation opérationnelle
&_include=PractitionerRole:organization #inclus l'Organization ou le HealthcareService référencé par la situation opérationnelle
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
#### 5 Rechercher par région source
**Description du scénario :** Un consommateur souhaite récupérer toutes les situations opérationnelles dont la donnée provient d'une région source donnée, afin d'en vérifier la cohérence.

**Exemple :** Recherche des situations opérationnelles dont la région source de la donnée est « 52 - Pays de la Loire ».

**Requête expliquée :**

```sh
GET [BASE]/PractitionerRole?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|52 #critère de recherche sur la région source de la donnée
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
