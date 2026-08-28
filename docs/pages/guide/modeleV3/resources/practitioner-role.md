---
layout: menu-guide
section: guide
title: RORPractitionerRole
subTitle: Ressources FHIR
---

<div class="wysiwyg" markdown="1">
- [Présentation de la ressource](#presentation)
- [Caractéristiques techniques](#caracteristiques)
- [Recherche sur critères](#recherche-criteres)
  - [Rechercher tout](#recherche-tout)
  - [Rechercher par identifiant technique](#recherche-id-technique)
  - [Rechercher par identifiant fonctionnel](#recherche-identifiant)
  - [Rechercher par date de dernière mise à jour](#recherche-lastupdated)
  - [Rechercher par région source](#recherche-tag)
- [Paramètres de recherche](#parametres-recherche)
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

<a id="recherche-criteres"></a>
## 3. Recherche sur critères
Voici quelques exemples de requêtes sur les situations opérationnelles / exercices professionnels.

<blockquote class="callout-warning">
<p><strong>Attention :</strong> pour récupérer l'ensemble des résultats au niveau national ou au niveau d'une région, vous devez impérativement utiliser la méthode <code>$export</code> de FHIR. Les résultats de cette requête seront tronqués à 10 000 résultats.</p>
</blockquote>

<a id="recherche-tout"></a>
#### 3.1 Rechercher tout (sans critère)
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
#### 3.2 Rechercher par identifiant technique
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
#### 3.3 Rechercher par identifiant fonctionnel
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
#### 3.4 Rechercher par date de dernière mise à jour
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
#### 3.5 Rechercher par région source
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

<a id="parametres-recherche"></a>
## 4. Paramètres de recherche
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
