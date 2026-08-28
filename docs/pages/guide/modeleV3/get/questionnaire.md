---
layout: menu-guide
section: guide
title: RORQuestionnaire
subTitle: GET
---

Cette page présente des exemples de requêtes `GET` sur la ressource [RORQuestionnaire]({{ '/pages/guide/modeleV3/resources/questionnaire.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Récupérer l'ensemble des modèles <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Un consommateur souhaite récupérer l'ensemble des modèles.

**Requête expliquée :**

```sh
GET [BASE]/Questionnaire #recherche sans critère pour récupérer tous les modèles
```

#### 2 Récupérer un modèle <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Un consommateur souhaite récupérer un modèle.

**Requête expliquée :**

```sh
GET [BASE]/Questionnaire?identifier=XXX #critère de recherche sur l'identifiant du modèle
```

#### 3 Récupérer un ensemble de modèles de saisie sur un critère donné <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Un consommateur souhaite récupérer un ensemble de modèles de saisie pour une catégorie d'EG donnée. Par exemple, un Centre de santé.

**Requête expliquée :**

```sh
GET [BASE]/Questionnaire?context=https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement|124 #critère permettant de rechercher les modèles utilisés pour la catégorie d'EG « Centre de santé » (voir binding)
```
