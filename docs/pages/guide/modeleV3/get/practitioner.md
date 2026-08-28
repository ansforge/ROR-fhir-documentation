---
layout: menu-guide
section: guide
title: RORPractitioner
subTitle: Exemples GET
---

Cette page présente des exemples de requêtes `GET` sur la ressource [RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

Voici quelques exemples de requêtes sur les professionnels.

<blockquote class="callout-warning">
<p><strong>Attention :</strong> pour récupérer l'ensemble des résultats au niveau national ou au niveau d'une région, vous devez impérativement utiliser la méthode <code><a href="{{ '/pages/guide/modeleV3/methodes-fhir/export.html' | relative_url }}">$export</a></code> avec l'API `HealthcareService`. Les résultats de cette requête seront tronqués à 10 000 résultats.</p>
</blockquote>

<a id="recherche-tout"></a>
#### 1 Rechercher tout (sans critère)
**Description du scénario :** Un consommateur souhaite récupérer l'ensemble des professionnels, actifs et inactifs.

**Requête expliquée :**

```sh
GET [BASE]/Practitioner
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
     "{{BASE}}/Practitioner"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Practitioner.class)
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Practitioner practitioner = (Practitioner) entry.getResource();
    logger.info("Practitioner found: id={}", practitioner.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Practitioner"
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
    practitioner = entry["resource"]
    print(f"Practitioner found: id={practitioner['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-identifiant"></a>
#### 2 Rechercher par identifiant national du professionnel
**Description du scénario :** Un consommateur souhaite récupérer le professionnel correspondant à un identifiant national donné (idNat_PS, ex : numéro RPPS), afin par exemple de compléter les informations d'un `RORPractitionerRole` retrouvé par ailleurs.

**Exemple :** Recherche du professionnel dont l'identifiant national (RPPS) est « 10001234567 ».

**Requête expliquée :**

```sh
GET [BASE]/Practitioner?identifier=urn:oid:1.2.250.1.71.4.2.1|10001234567 #critère de recherche sur l'identifiant national du professionnel (RPPS)
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
     "{{BASE}}/Practitioner?identifier=urn:oid:1.2.250.1.71.4.2.1|10001234567"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Practitioner.class)
        .where(Practitioner.IDENTIFIER.exactly()
                .systemAndCode("urn:oid:1.2.250.1.71.4.2.1", "10001234567"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Practitioner practitioner = (Practitioner) entry.getResource();
    logger.info("Practitioner found: id={}", practitioner.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Practitioner"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "identifier": "urn:oid:1.2.250.1.71.4.2.1|10001234567",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    practitioner = entry["resource"]
    print(f"Practitioner found: id={practitioner['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-id-technique"></a>
#### 3 Rechercher par identification technique
**Description du scénario :** Un consommateur souhaite récupérer directement un professionnel à partir de son identifiant technique ROR, par exemple après l'avoir obtenu via une recherche sur `RORPractitionerRole` ou `RORHealthcareService`.

**Exemple :** Recherche du professionnel dont l'identifiant technique ROR est « 245876 ».

**Requête expliquée :**

```sh
GET [BASE]/Practitioner?_id=245876 #critère de recherche sur l'identifiant technique ROR
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
     "{{BASE}}/Practitioner?_id=245876"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Practitioner practitioner = client.read()
        .resource(Practitioner.class)
        .withId("245876")
        .execute();

logger.info("Practitioner found: id={}", practitioner.getIdElement().getIdPart());
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Practitioner/245876"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}

response = requests.get(base_url, headers=headers)
response.raise_for_status()
practitioner = response.json()
print(f"Practitioner found: id={practitioner['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-derniere-maj"></a>
#### 4 Rechercher par date de mise à jour
**Description du scénario :** Un consommateur souhaite récupérer l'ensemble des professionnels mis à jour depuis une date donnée, afin de synchroniser son système d'information avec le ROR.

**Exemple :** Recherche des professionnels mis à jour depuis le 1er janvier 2026 (inclus).

**Requête expliquée :**

```sh
GET [BASE]/Practitioner?_lastUpdated=ge2026-01-01 #critère de recherche sur la date de mise à jour (ge = greater or equal)
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
     "{{BASE}}/Practitioner?_lastUpdated=ge2026-01-01"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Practitioner.class)
        .lastUpdated(new DateRangeParam().setLowerBoundInclusive("2026-01-01"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Practitioner practitioner = (Practitioner) entry.getResource();
    logger.info("Practitioner found: id={}", practitioner.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Practitioner"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "_lastUpdated": "ge2026-01-01",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    practitioner = entry["resource"]
    print(f"Practitioner found: id={practitioner['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-region"></a>
#### 5 Rechercher par région source
**Description du scénario :** Un consommateur régional souhaite récupérer l'ensemble des professionnels dont la donnée est issue d'une région source donnée.

**Exemple :** Recherche des professionnels dont la région source de la donnée est « 84 - Auvergne-Rhône-Alpes ».

**Requête expliquée :**

```sh
GET [BASE]/Practitioner?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|84 #critère de recherche sur la région source de la donnée
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
     "{{BASE}}/Practitioner?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|84"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Practitioner.class)
        .where(new TokenClientParam("_tag")
                .exactly()
                .systemAndCode("https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM", "84"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Practitioner practitioner = (Practitioner) entry.getResource();
    logger.info("Practitioner found: id={}", practitioner.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Practitioner"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "_tag": "https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|84",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    practitioner = entry["resource"]
    print(f"Practitioner found: id={practitioner['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-filtre-avance"></a>
#### 6 Rechercher sur plusieurs identifiants (filtre avancé)
**Description du scénario :** Un consommateur souhaite récupérer en une seule requête plusieurs professionnels connus par leur identifiant national (ex : rapprochement d'une liste de RPPS), en utilisant le paramètre de filtre avancé `_filter`.

**Exemple :** Recherche des professionnels dont l'identifiant national (RPPS) est « 10001234567 » ou « 10009876543 ».

**Requête expliquée :**

```sh
GET [BASE]/Practitioner?_filter=(identifier eq urn:oid:1.2.250.1.71.4.2.1|10001234567 or urn:oid:1.2.250.1.71.4.2.1|10009876543) #critère de recherche sur plusieurs identifiants nationaux (RPPS), combinés via un opérateur OU
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
     -G "{{BASE}}/Practitioner" \
     --data-urlencode "_filter=(identifier eq urn:oid:1.2.250.1.71.4.2.1|10001234567 or urn:oid:1.2.250.1.71.4.2.1|10009876543)"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

String filter = "(identifier eq urn:oid:1.2.250.1.71.4.2.1|10001234567"
        + " or urn:oid:1.2.250.1.71.4.2.1|10009876543)";

Bundle bundle = client.search()
        .forResource(Practitioner.class)
        .where(new StringClientParam("_filter").matches().value(filter))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Practitioner practitioner = (Practitioner) entry.getResource();
    logger.info("Practitioner found: id={}", practitioner.getIdElement().getIdPart());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Practitioner"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "_filter": (
        "(identifier eq urn:oid:1.2.250.1.71.4.2.1|10001234567"
        " or urn:oid:1.2.250.1.71.4.2.1|10009876543)"
    ),
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    practitioner = entry["resource"]
    print(f"Practitioner found: id={practitioner['id']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />
