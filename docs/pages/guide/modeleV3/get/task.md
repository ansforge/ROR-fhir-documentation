---
layout: menu-guide
section: guide
title: RORTask
subTitle: Exemples GET
---

Cette page présente des exemples de requêtes `GET` sur la ressource [RORTask]({{ '/pages/guide/modeleV3/resources/task.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Consultation du statut d'une anomalie <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un responsable qualité ou un système numérique consommateur souhaite consulter le statut d'une anomalie.

**Exemple :** Recherche de l'anomalie ayant pour identifiant technique 687

**Requête expliquée :**

```sh
GET [BASE]/Task/687 #recherche d'une anomalie à partir de son identifiant technique
```

#### 2 Consultation de la liste des anomalies <code><span style="color: #22ffd3;">serveur</span></code> <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Un responsable qualité ou le moteur de règle souhaite consulter la liste des anomalies d'un élément dont l'identifiant est XXX.

**Requête expliquée :**

```sh
GET [BASE]/Task?focus:HealthcareService.identifier=XXX #critère de recherche sur l'identifiant de l'élément référencé par l'anomalie
```

#### 3 Consultation de la liste des anomalies sur un périmètre <code><span style="color: #22ffd3;">serveur</span></code> <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** un responsable qualité souhaite consulter la liste des anomalies sur son périmètre : région = XXX.

**Requête expliquée :** exemple avec HealthcareService :

```sh
GET [BASE]/Task?focus:HealthcareService:_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|XXX #critère de recherche sur la région source
```

Exemple avec Organization :

```sh
GET [BASE]/Task?focus:Organization:_tag=https://mos.esante.gouv.fr/NOS/TRE_R30-RegionOM/FHIR/TRE-R30-RegionOM|XXX #critère de recherche sur la région source
```

#### 4 Consommation de toutes les anomalies <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** le BI consomme toutes les anomalies pour faire des tableaux de suivi.

**Requête expliquée :**

```sh
GET [BASE]/Task #recherche sans critère pour récupérer toutes les anomalies
```
