---
layout: menu-guide
section: guide
title: ROROrganization
subTitle: Ressources FHIR
---

<div class="wysiwyg" markdown="1">
- [Présentation de la ressource](#presentation)
- [Caractéristiques techniques](#caracteristiques)
- [Recherche sur critères](#recherche-criteres)
  - [Rechercher tout](#recherche-tout)
  - [Rechercher par numéro FINESS](#recherche-par-finess)
  - [Rechercher par raison sociale](#recherche-par-nom)
  - [Rechercher par date de mise à jour](#recherche-par-date)
  - [Rechercher par type / catégorie d'établissement](#recherche-par-type)
  - [Rechercher par région source](#recherche-par-region)
- [Paramètres de recherche](#parametres-recherche)
</div>
<br />

<a id="presentation"></a>
## 1. Présentation de la ressource
`ROROrganization` est un profil créé dans le cadre du ROR pour décrire les organismes du domaine sanitaire, médico-social et social immatriculés dans le FINESS (entité juridique, entité géographique) ainsi que les organisations internes (pôles, services, unités fonctionnelles).

Les organisations sont structurées de façon hiérarchique : une entité géographique peut être rattachée à une entité juridique, et une organisation interne est elle-même rattachée à une entité géographique. Cette hiérarchie est portée par le mécanisme `partOf` de la ressource FHIR `Organization`.

`ROROrganization` est référencée par la ressource [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}) qui décrit l'offre portée par l'organisation, ainsi que par [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}) pour les professionnels qui y exercent.

<a id="caracteristiques"></a>
## 2. Caractéristiques techniques de la ressource
<div class="wysiwyg" markdown="1">

| Caractéristique | Détail |
| --- | --- |
| Endpoint | `[BASE]/Organization` — `[BASE]` correspond à la base de l'URL des API FHIR du bac-à-sable ou de la production, voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) |
| Méthodes HTTP | `GET` (recherche), [`POST`]({{ '/pages/guide/modeleV3/exemples/saisie-offre.html' | relative_url }}) (création), [`PATCH`]({{ '/pages/guide/modeleV3/exemples/mise-a-jour-offre.html' | relative_url }}) (mise à jour) |
| Header requis | `Authorization` (jeton d'accès), ainsi que les 4 headers `Ror-*` décrits sur la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }}) : `Ror-Profil-Utilisateur-Code`, `Ror-Profil-Utilisateur-System`, `Ror-Role-Metier-Code`, `Ror-Role-Metier-System` |

</div>

<a id="recherche-criteres"></a>
## 3. Recherche sur critères
Voici quelques exemples de requêtes sur les organisations.

<blockquote class="callout-warning">
<p><strong>Attention :</strong> pour récupérer l'ensemble des résultats au niveau national ou au niveau d'une région, vous devez impérativement utiliser la méthode <code>$export</code> de FHIR. Les résultats de cette requête seront tronqués à 10 000 résultats.</p>
</blockquote>

<a id="recherche-tout"></a>
#### 3.1 Rechercher tout (sans critère)
**Description du scénario :** Un consommateur souhaite récupérer l'ensemble des organisations, actives et inactives.

**Requête expliquée :**

```sh
GET [BASE]/Organization
```

**Description du scénario :** Un consommateur souhaite récupérer les entités géographiques ainsi que leurs entités juridiques de rattachement.

**Requête expliquée :**

```sh
GET [BASE]/Organization?_include=Organization:partof #inclus les entités juridiques (partOf) rattachées à chaque entité géographique
```

**Description du scénario :** Un consommateur souhaite récupérer les organisations ainsi que les offres (HealthcareService) qu'elles portent.

**Requête expliquée :**

```sh
GET [BASE]/Organization?_revinclude=HealthcareService:organization #inclus les HealthcareService qui référencent l'Organization
```

**Description du scénario :** Un consommateur souhaite récupérer les organisations ainsi que les rôles professionnels (PractitionerRole) qui leur sont rattachés.

**Requête expliquée :**

```sh
GET [BASE]/Organization?_revinclude=PractitionerRole:organization #inclus les PractitionerRole qui référencent l'Organization
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
     "{{BASE}}/Organization"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
// client HAPI FHIR configuré avec l'access_token et les headers Ror-* (voir la page "Consommation des API FHIR")
IGenericClient client = FhirTestUtils.createRorClient();

Bundle bundle = client.search()
        .forResource(Organization.class)
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Organization organization = (Organization) entry.getResource();
    logger.info("Organization found: id={} name={}", organization.getIdElement().getIdPart(), organization.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Organization"
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
    organization = entry["resource"]
    print(f"Organization found: id={organization['id']} name={organization.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-finess"></a>
#### 3.2 Rechercher par numéro FINESS (identifier)
**Description du scénario :** Un consommateur souhaite récupérer une organisation à partir de son numéro FINESS.

**Exemple :** Recherche de l'organisation dont le numéro FINESS est 750000001.

**Requête expliquée :**

```sh
GET [BASE]/Organization?identifier=750000001 #critère de recherche sur le numéro FINESS
```

**Description du scénario :** Un consommateur souhaite récupérer une organisation à partir de son numéro FINESS, ainsi que son entité juridique de rattachement.

**Exemple :** Recherche de l'organisation dont le numéro FINESS est 1290004324, avec inclusion de l'entité juridique parente.

**Requête expliquée :**

```sh
GET [BASE]/Organization?identifier=1290004324 #critère de recherche sur le numéro FINESS
&_include=Organization:partof #inclus l'entité juridique (partOf) de rattachement
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
     "{{BASE}}/Organization?identifier=750000001"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

TokenClientParam identifierParam = new TokenClientParam("identifier");

Bundle bundle = client.search()
        .forResource(Organization.class)
        .where(identifierParam.exactly().code("750000001"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Organization organization = (Organization) entry.getResource();
    logger.info("Organization found: id={} finess={}", organization.getIdElement().getIdPart(), organization.getIdentifierFirstRep().getValue());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Organization"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"identifier": "750000001"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    organization = entry["resource"]
    print(f"Organization found: id={organization['id']} finess={organization['identifier'][0]['value']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-nom"></a>
#### 3.3 Rechercher par raison sociale (name)
**Description du scénario :** Un consommateur souhaite rechercher les organisations dont la raison sociale contient une chaîne de caractères donnée, sans en connaître le nom exact.

**Exemple :** Recherche des organisations dont la raison sociale, la dénomination ou le nom d'organisation interne contient « chu » (recherche non sensible à la casse).

**Requête expliquée :**

```sh
GET [BASE]/Organization?name:contains=chu #critère de recherche sur une partie de la raison sociale, insensible à la casse
```

**Description du scénario :** Un consommateur souhaite récupérer une organisation à partir de sa raison sociale exacte.

**Exemple :** Recherche de l'organisation dont le nom correspond exactement à « Centre Hospitalier Universitaire de Nantes ».

**Requête expliquée :**

```sh
GET [BASE]/Organization?name=Centre Hospitalier Universitaire de Nantes #critère de recherche sur la raison sociale exacte
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
     "{{BASE}}/Organization?name:contains=chu"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

StringClientParam nameParam = new StringClientParam("name");

Bundle bundle = client.search()
        .forResource(Organization.class)
        .where(nameParam.contains().value("chu"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Organization organization = (Organization) entry.getResource();
    logger.info("Organization found: id={} name={}", organization.getIdElement().getIdPart(), organization.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Organization"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"name:contains": "chu"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    organization = entry["resource"]
    print(f"Organization found: id={organization['id']} name={organization.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-date"></a>
#### 3.4 Rechercher par date de mise à jour (_lastUpdated)
**Description du scénario :** Un consommateur souhaite récupérer toutes les organisations mises à jour depuis une certaine date, afin de synchroniser son système d'information.

**Exemple :** Recherche des organisations mises à jour depuis le 1er juin 2026 (inclus) jusqu'à aujourd'hui.

**Requête expliquée :**

```sh
GET [BASE]/Organization?_lastUpdated=ge2026-06-01 #critère de recherche sur la date de mise à jour (ge = greater or equal)
```

**Description du scénario :** Un consommateur souhaite récupérer toutes les organisations mises à jour sur une période donnée.

**Exemple :** Recherche des organisations mises à jour entre le 1er et le 30 juin 2026.

**Requête expliquée :**

```sh
GET [BASE]/Organization?_lastUpdated=ge2026-06-01 #borne basse de la période (ge = greater or equal)
&_lastUpdated=le2026-06-30 #borne haute de la période (le = less or equal)
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
     "{{BASE}}/Organization?_lastUpdated=ge2026-06-01"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

DateClientParam lastUpdatedParam = new DateClientParam("_lastUpdated");

Bundle bundle = client.search()
        .forResource(Organization.class)
        .where(lastUpdatedParam.afterOrEquals().day("2026-06-01"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Organization organization = (Organization) entry.getResource();
    logger.info("Organization found: id={} lastUpdated={}", organization.getIdElement().getIdPart(), organization.getMeta().getLastUpdated());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Organization"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {"_lastUpdated": "ge2026-06-01"}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    organization = entry["resource"]
    print(f"Organization found: id={organization['id']} lastUpdated={organization['meta']['lastUpdated']}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-type"></a>
#### 3.5 Rechercher par type / catégorie d'établissement (type)
**Description du scénario :** Un consommateur souhaite récupérer les entités géographiques appartenant à une catégorie d'établissement donnée.

**Exemple :** Recherche des entités géographiques dont la catégorie d'établissement est « 101 - Centre Hospitalier Régional (C.H.R.) ».

**Requête expliquée :**

```sh
GET [BASE]/Organization?type=https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement|101 #critère de recherche sur la catégorie d'établissement
```

**Description du scénario :** Un consommateur souhaite récupérer les organisations internes dont le type correspond à un mode de prise en charge donné.

**Exemple :** Recherche des organisations internes dont le type correspond au mode de prise en charge « 032 - Consultation ».

**Requête expliquée :**

```sh
GET [BASE]/Organization?type=https://mos.esante.gouv.fr/NOS/TRE_R213-ModePriseEnCharge/FHIR/TRE-R213-ModePriseEnCharge|032 #critère de recherche sur le type d'organisation interne
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
     "{{BASE}}/Organization?type=https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement%7C101"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

TokenClientParam typeParam = new TokenClientParam("type");

Bundle bundle = client.search()
        .forResource(Organization.class)
        .where(typeParam.exactly().systemAndCode(
                "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement",
                "101"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Organization organization = (Organization) entry.getResource();
    logger.info("Organization found: id={} name={}", organization.getIdElement().getIdPart(), organization.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Organization"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "type": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement|101",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    organization = entry["resource"]
    print(f"Organization found: id={organization['id']} name={organization.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="recherche-par-region"></a>
#### 3.6 Rechercher par région source (_tag)
**Description du scénario :** Un consommateur souhaite récupérer toutes les organisations dont la donnée provient d'une région source donnée.

**Exemple :** Recherche des organisations dont la région source de la donnée est « 11 - Île-de-France ».

**Requête expliquée :**

```sh
GET [BASE]/Organization?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|11 #critère de recherche sur la région source de la donnée
```

**Description du scénario :** Un consommateur souhaite récupérer les organisations d'une catégorie d'établissement donnée, sur une région source donnée.

**Exemple :** Recherche des organisations de la région « 52 - Pays de la Loire » dont la catégorie d'établissement est « 101 - Centre Hospitalier Régional (C.H.R.) ».

**Requête expliquée :**

```sh
GET [BASE]/Organization?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|52 #critère de recherche sur la région source de la donnée
&type=https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement|101 #critère de recherche sur la catégorie d'établissement
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
     "{{BASE}}/Organization?_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM%7C11"
{% endraw %}
{% endhighlight %}
</div>
<div class="tab-content" data-name="java">
{% highlight java %}
IGenericClient client = FhirTestUtils.createRorClient();

TokenClientParam tagParam = new TokenClientParam("_tag");

Bundle bundle = client.search()
        .forResource(Organization.class)
        .where(tagParam.exactly().systemAndCode(
                "https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM",
                "11"))
        .returnBundle(Bundle.class)
        .execute();

for (BundleEntryComponent entry : bundle.getEntry()) {
    Organization organization = (Organization) entry.getResource();
    logger.info("Organization found: id={} name={}", organization.getIdElement().getIdPart(), organization.getName());
}
{% endhighlight %}
</div>
<div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests

base_url = "{{BASE}}/Organization"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}
params = {
    "_tag": "https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|11",
}

response = requests.get(base_url, headers=headers, params=params)
response.raise_for_status()
bundle = response.json()
for entry in bundle.get("entry", []):
    organization = entry["resource"]
    print(f"Organization found: id={organization['id']} name={organization.get('name')}")
{% endraw %}
{% endhighlight %}
</div>
</div>
<br />

<a id="parametres-recherche"></a>
## 4. Paramètres de recherche
La ressource `ROROrganization` peut être interrogée à l'aide de plusieurs paramètres de recherche, notamment le numéro FINESS, la raison sociale, la date de mise à jour ou le type d'organisation.

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
| Tarif/ montantTarif (Montant/valeur) | price - amount -value | Non | Number | Montant du tarif des prestations et services : valeur. |
| ForfaitSocleHebergement + SupplementTarifHebergement / typeHabitation | price - residential -type | Non | token | Précise les caractéristiques de l'hébergement. JDV_J32-TypeHabitation-ROR issu de TRE_R242-TypeHabitation |
| TarifAccueilDeJour + TarifAidesHumaines + ForfaitSocleHebergement + TarifPortageRepas / conditionTarifaire | special -price | Non | token | La condition tarifaire précise les conditions d’accès à un tarif modulé en fonction des critères relatifs à la personne. JDV_J39-ConditionTarifaire- ROR   issu TRE_R250-ConditionTarifaire |
| TarifDependance / groupeTarifaireDependance | price -dependency-level | Non | token | Niveau de dépendance de la personne âgée accueillie qui sera associé à un tarif. Il y a 3 niveaux de tarifs selon le GIR. JDV_J27-GroupeTarifaireDependance-ROR issu de la TRE_R237-NiveauDependance |
| ForfaitSocleHebergement + TarifDependance / temporaliteAccueil | price - welcome -type | Non | token | Le tarif peut s’appliquer à un hébergement permanent ou à un hébergement temporaire. JDV_J30-TemporaliteAccueil-ROR issu de la TRE_R240-TemporaliteAccueil |
| Tarif/ unitePrix | price -unit | Non | token | Unité de référence pour évaluer le prix des prestations et services. JDV_J205-UnitePrix-ROR issu TRE_R228-UnitePrix |
| Tarif/ dateDebutValiditeTarif | price - validity -start-date | Non | date | Dernière date de début de validité du tarif indiqué. |

</div>
