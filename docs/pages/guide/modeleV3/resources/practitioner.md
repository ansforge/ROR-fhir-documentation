---
layout: menu-guide
section: guide
title: RORPractitioner
subTitle: Ressources FHIR
---

<div class="wysiwyg" markdown="1">
- [Présentation de la ressource](#presentation)
- [Caractéristiques techniques](#caracteristiques)
- [Paramètres de recherche](#parametres-recherche)
- [Recherche sur critères](#recherche-criteres)
  - [Rechercher tout](#recherche-tout)
  - [Rechercher par identifiant national du professionnel](#recherche-identifiant)
  - [Rechercher par identification technique](#recherche-id-technique)
  - [Rechercher par date de mise à jour](#recherche-derniere-maj)
  - [Rechercher par région source](#recherche-region)
  - [Rechercher sur plusieurs identifiants (filtre avancé)](#recherche-filtre-avance)
</div>
<br />

<a id="presentation"></a>
## 1. Présentation de la ressource
`RORPractitioner` est un profil créé dans le cadre du ROR pour décrire les données d'identification pérennes d'une personne physique, qui travaille en tant que professionnel. Il porte notamment l'identifiant national du professionnel, son nom et son prénom d'exercice, ainsi que sa profession et sa spécialité.

Cette ressource ne décrit que les caractéristiques intrinsèques et stables du professionnel : ses modalités d'exercice opérationnelles (mode d'exercice, situation opérationnelle, rattachement à une organisation ou à une offre) sont, elles, portées par la ressource [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}), qui référence `RORPractitioner`.

`RORPractitioner` est en général consommé en complément d'une recherche sur [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}) ou [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}), via les mécanismes d'inclusion (`_include=PractitionerRole:practitioner`) ou de chaînage/chaînage inversé décrits sur la page [Recherche d'offre sur critères principaux]({{ '/pages/guide/modeleV3/exemples/recherche-criteres-principaux.html' | relative_url }}), mais peut également être interrogé directement, notamment pour retrouver un professionnel à partir de son identifiant national.

<a id="caracteristiques"></a>
## 2. Caractéristiques techniques de la ressource
<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/Practitioner` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` (recherche) ; `POST` (création, voir [Saisie de l'offre — Scénario 9 : Création d'un professionnel]({{ '/pages/guide/modeleV3/exemples/saisie-offre.html' | relative_url }})) ; `PATCH` (mise à jour, voir [Mise à jour de l'offre]({{ '/pages/guide/modeleV3/exemples/mise-a-jour-offre.html' | relative_url }})) |
| Header requis | `Authorization` (jeton d'accès de type `Bearer`), ainsi que les 4 headers `Ror-*` (`Ror-Profil-Utilisateur-Code`, `Ror-Profil-Utilisateur-System`, `Ror-Role-Metier-Code`, `Ror-Role-Metier-System`) décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }}) |

</div>

<a id="parametres-recherche"></a>
## 3. Paramètres de recherche
La ressource `RORPractitioner` peut être interrogée à l'aide des paramètres de recherche suivants, notamment l'identifiant national du professionnel.

Profil officiel : [RORPractitioner]({{ site.ror.ig_url }}/StructureDefinition-ror-practitioner.html){:target="_blank"}

<div class="wysiwyg" markdown="1">

| Attribut ME 3.0 | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _filter | Oui | special | Paramètre de recherche de filtre qui prend en charge une grammaire de recherche plus sophistiquée. Voir la documentation (https://hl7.org/fhir/search_filter.html) pour plus de détails <code><span style="color: #ff0000;">draft</span></code> |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource <code><span style="color: #ff0000;">draft</span></code> |
| - | _id | Oui | token | Identification technique de la ressource |
| Metadonnee / dateMiseJour | _ lastUpdated | Oui | date | Date de dernière mise à jour. |
| Metadonnee / regionSource | _tag | Oui | token | Code région de la source de la donnée. |
| Identifiant | identifier | Oui | token | idNat_PS (Professionnel) : Identification nationale du professionnel définie par le CI-SIS. |

</div>

<a id="recherche-criteres"></a>
## 4. Recherche sur critères
Voici quelques exemples de requêtes sur les professionnels.

<a id="recherche-tout"></a>
#### 4.1 Rechercher tout (sans critère)
**Récit utilisateur :**
En tant que client de l'API, je souhaite récupérer l'ensemble des professionnels.

**Requêtes :**

```sh
GET [BASE]/Practitioner
# récupère l'ensemble des professionnels (actifs et inactifs)
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% raw %}
{% highlight bash %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/Practitioner"
{% endhighlight %}
{% endraw %}
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
{% raw %}
{% highlight python %}
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
{% endhighlight %}
{% endraw %}
</div>
</div>
<br />

<a id="recherche-identifiant"></a>
#### 4.2 Rechercher par identifiant national du professionnel
**Récit utilisateur :**
En tant que client de l'API, je souhaite récupérer le professionnel correspondant à un identifiant national donné (idNat_PS, ex : numéro RPPS), afin par exemple de compléter les informations d'un `RORPractitionerRole` retrouvé par ailleurs.

**Requêtes :**

```sh
GET [BASE]/Practitioner?identifier=urn:oid:1.2.250.1.71.4.2.1|10001234567
# recherche le professionnel dont l'identifiant national (RPPS) vaut 10001234567
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% raw %}
{% highlight bash %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/Practitioner?identifier=urn:oid:1.2.250.1.71.4.2.1|10001234567"
{% endhighlight %}
{% endraw %}
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
{% raw %}
{% highlight python %}
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
{% endhighlight %}
{% endraw %}
</div>
</div>
<br />

<a id="recherche-id-technique"></a>
#### 4.3 Rechercher par identification technique
**Récit utilisateur :**
En tant que client de l'API, je souhaite récupérer directement un professionnel à partir de son identifiant technique ROR, par exemple après l'avoir obtenu via une recherche sur `RORPractitionerRole` ou `RORHealthcareService`.

**Requêtes :**

```sh
GET [BASE]/Practitioner?_id=245876
# récupère le professionnel dont l'identifiant technique ROR vaut 245876
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% raw %}
{% highlight bash %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/Practitioner?_id=245876"
{% endhighlight %}
{% endraw %}
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
{% raw %}
{% highlight python %}
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
{% endhighlight %}
{% endraw %}
</div>
</div>
<br />

<a id="recherche-derniere-maj"></a>
#### 4.4 Rechercher par date de mise à jour
**Récit utilisateur :**
En tant que client de l'API, je souhaite récupérer l'ensemble des professionnels mis à jour depuis une date donnée, afin de synchroniser mon système d'information avec le ROR.

**Requêtes :**

```sh
GET [BASE]/Practitioner?_lastUpdated=ge2026-01-01
# récupère les professionnels dont la date de dernière mise à jour est postérieure ou égale au 1er janvier 2026
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% raw %}
{% highlight bash %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/Practitioner?_lastUpdated=ge2026-01-01"
{% endhighlight %}
{% endraw %}
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
{% raw %}
{% highlight python %}
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
{% endhighlight %}
{% endraw %}
</div>
</div>
<br />

<a id="recherche-region"></a>
#### 4.5 Rechercher par région source
**Récit utilisateur :**
En tant que client régional de l'API, je souhaite récupérer l'ensemble des professionnels dont la donnée est issue d'une région source donnée (ex : région 84 - Auvergne-Rhône-Alpes).

**Requêtes :**

```sh
GET [BASE]/Practitioner?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|84
# récupère les professionnels dont la région source vaut 84 (Auvergne-Rhône-Alpes)
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% raw %}
{% highlight bash %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     "{{BASE}}/Practitioner?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|84"
{% endhighlight %}
{% endraw %}
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
{% raw %}
{% highlight python %}
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
{% endhighlight %}
{% endraw %}
</div>
</div>
<br />

<a id="recherche-filtre-avance"></a>
#### 4.6 Rechercher sur plusieurs identifiants (filtre avancé)
**Récit utilisateur :**
En tant que client de l'API, je souhaite récupérer en une seule requête plusieurs professionnels connus par leur identifiant national (ex : rapprochement d'une liste de RPPS), en utilisant le paramètre de filtre avancé `_filter`.

**Requêtes :**

```sh
GET [BASE]/Practitioner?_filter=(identifier eq urn:oid:1.2.250.1.71.4.2.1|10001234567 or urn:oid:1.2.250.1.71.4.2.1|10009876543)
# recherche les professionnels dont l'identifiant national (RPPS) vaut 10001234567 OU 10009876543
```

**Exemples de code :**

<div class="code-sample">
<div class="tab-content" data-name="curl">
{% raw %}
{% highlight bash %}
curl -H "Authorization: Bearer {{access_token}}" \
     -H "Ror-Profil-Utilisateur-Code: {{profil_code}}" \
     -H "Ror-Profil-Utilisateur-System: {{profil_system}}" \
     -H "Ror-Role-Metier-Code: {{role_code}}" \
     -H "Ror-Role-Metier-System: {{role_system}}" \
     -G "{{BASE}}/Practitioner" \
     --data-urlencode "_filter=(identifier eq urn:oid:1.2.250.1.71.4.2.1|10001234567 or urn:oid:1.2.250.1.71.4.2.1|10009876543)"
{% endhighlight %}
{% endraw %}
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
{% raw %}
{% highlight python %}
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
{% endhighlight %}
{% endraw %}
</div>
</div>
<br />
