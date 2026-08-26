---
layout: menu-guide
section: scenarios
title: Consultation d'anomalie
subTitle: Scénarios
---

### Construction de la requête de base

<table>
<tbody>
<tr>
<td width="141">
<p><strong>Interaction FHIR</strong></p>
</td>
<td width="538">
<p>Search<a href="#_ftn1" name="_ftnref1"><sup>[1]</sup></a></p>
</td>
</tr>
<tr>
<td width="141">
<p><strong>M&eacute;thode http associ&eacute;e</strong></p>
</td>
<td width="538">
<p>GET</p>
</td>
</tr>
<tr>
<td width="141">
<p><strong>Ressource recherch&eacute;e</strong></p>
</td>
<td width="538">
<p>Task</p>
</td>
</tr>
<tr>
<td width="141">
<p><strong>Construction requ&ecirc;te de base</strong></p>
</td>
<td width="538">
<p><code>GET [base]/Task{?[parameters]{&amp;_format=[mime-type]}}</code></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><a href="#_ftnref1" name="_ftn1">[1]</a> <a href="https://www.hl7.org/fhir/R4/http.html#search">https://www.hl7.org/fhir/R4/http.html#search</a> et <a href="https://www.hl7.org/fhir/R4/http.html#general">https://www.hl7.org/fhir/R4/http.html#general</a></p>

### Construction de la réponse de base

#### Réponse de base -- Succès

Lien vers la spécification FHIR : <https://www.hl7.org/fhir/R4/http.html>

Si la recherche est un succès, le serveur répond :

Un header avec un code 200 OK HTTP

Un body contenant une ressource [Bundle]( https://www.hl7.org/fhir/R4/bundle.html) dont le type = searchset. Le bundle encapsule 0 à n ressources HealthcareService corespondant aux critères de recherche plus les ressources incluses correspondant aux critères de recherche. Le service développé renvoie les 200 premiers résultats et indique le total trouvé dans une balise `total`. Dans le cas où il n'y a pas de résultat le service renvoie `total`: 0.

Remarque : la recherche est un succès à partir du moment où la requête
peut être exécutée. Il peut il y avoir 0 à n correspondances.

#### Réponse de base -- Echec

Lien vers la spécification FHIR :
[https://www.hl7.org/fhir/R4/operationoutcome.html](https://www.hl7.org/fhir/R4/operationoutcome.html)

Si la recherche échoue, le serveur doit répondre :
-   Un header avec un un code erreur HTTP 4XX ou 5XX
-   Un body contenant une ressource OperationOutcome qui donne les
détails sur la raison de l'échec

Remarque : l'échec d'une recherche est la non-possibilité d'exécuter la
requête, ce qui est différent d'aucune correspondance à la recherche.
Plus de précision sur la spécification FHIR :
[https://www.hl7.org/fhir/R4/http.html](https://www.hl7.org/fhir/R4/http.html)

### Critères de recherche

  Les critères de recherche applicables sont définis sur la page dédiée pour :
-    [StructureDefinition-ror-task]({{ '/pages/guide/resources/search-params/task.html' | relative_url }})
-    [StructureDefinition-ror-healthcareservice]({{ '/pages/guide/resources/search-params/healthcareservice.html' | relative_url }}) (critères de recherche applicables à la ressource Task, grâce au chainage. Pour cela utiliser la syntaxe suivante : `focus:HealthcareService:[NOM CRITERE]`)
-    [Structuredefinition-ror-organization]({{ '/pages/guide/resources/search-params/organization.html' | relative_url }}) (critères de recherche applicables à la ressource Task, grâce au chainage. Pour cela utiliser la syntaxe suivante : `focus:Organization:[NOM CRITERE]`)
-    [StructureDefinition-ror-location]({{ '/pages/guide/resources/search-params/location.html' | relative_url }}) (critères de recherche applicables à la ressource Task, grâce au chainage. Pour cela utiliser la syntaxe suivante : `focus:Location:[NOM CRITERE]`)
-    [StructureDefinition-ror-practioner]({{ '/pages/guide/resources/search-params/practitioner.html' | relative_url }}) (critères de recherche applicables à la ressource ressource Task, grâce au chainage. Pour cela utiliser la syntaxe suivante : `focus:Practitioner:[NOM CRITERE]`)
-    [StructureDefinition-ror-practionerrole]({{ '/pages/guide/resources/search-params/practitionerrole.html' | relative_url }}) (critères de recherche applicables à la ressource Task, grâce au chainage. Pour cela utiliser la syntaxe suivante : `focus:PractitionerRole:[NOM CRITERE]`)

**En complément, vous pouvez accéder aux Capability Statements [ici]({{ site.ror.ig_url }}/artifacts.html#behavior-capability-statements)**

### Paramètres et modificateurs de requêtes FHIR

Les paramètres et modificateurs de requêtes sont décrits [ici]({{ site.ror.ig_url }}/modifiers.html).

### Exemple de requêtes

#### Scénario 1 : Consultation du statut d’une anomalie

**Description du scénario :** Un responsable qualité ou un système numérique consommateur souhaite consulter le statut d’une anomalie.

**Exemple :** Recherche de l’anomalie ayant pour identifiant technique 687

**Requête :**

`GET [BASE]/Task/687`

**Requête expliquée :**

```sh
GET [BASE]/Task/687 #recherche d'une anomalie à partir de son identifiant technique
```

#### Scénario 2 : Consultation de la liste des anomalies <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Un responsable qualité ou le moteur de règle souhaite consulter la liste des anomalies d'un élément dont l’identifiant est XXX.

**Requête :**

`GET [BASE]/Task?focus:HealthcareService:identifier=XXX`

**Requête expliquée :**

```sh
GET [BASE]/Task?focus:HealthcareService.identifier=XXX #critère de recherche sur l’identifiant de l’élément référencé par l’anomalie
```

#### Scénario 3 : Consultation de la liste des anomalies sur un périmètre <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** un responsable qualité souhaite consulter la liste des anomalies sur son périmètre : région = XXX.

**Requête :**

`GET [BASE]/Task?focus:[Ressource]:_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|XXX`

**Requête expliquée :**
Exemple avec HealthcareService :

```sh
GET [BASE]/Task?focus:HealthcareService:_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|XXX #critère de recherche sur la région source
Exemple avec Organization : 
GET [BASE]/Task?focus:Organization:_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|XXX #critère de recherche sur la région source

```
#### Scénario 4 : Consommation de toutes les anomalies

**Description du scénario :** le BI consomme toutes les anomalies pour faire des tableaux de suivi.

**Requête :**

`GET [BASE]/Task `

**Requête expliquée :**

```sh
GET [BASE]/Task #recherche sans critère pour récupérer toutes les anomalies
```
