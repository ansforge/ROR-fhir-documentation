---
layout: menu-guide
section: guide
title: RORTask
subTitle: Exemples PATCH
---

Cette page présente des exemples de requêtes `PATCH` sur la ressource [RORTask]({{ '/pages/guide/modeleV3/resources/task.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Mise à jour du statut d'une anomalie

**Description du scénario :** Le responsable de la donnée en anomalie corrige l’anomalie, le responsable qualité ou un système numérique met à jour le statut de l’anomalie.

**Exemple :** Le responsable de la donnée souhaite corriger une anomalie relevée précédemment, dont l'identifiant technique est 1309.

**Requête :**

```json
Content-Type: application/fhir+json

Requête Postman : PATCH https://rortest.esante.gouv.fr/anomalies/Task/1309

Body : 
{
    "resourceType": "Parameters",
    "parameter": [
        {
            "name": "operation",
            "part": [
                {
                    "name": "type",
                    "valueString": "replace"
                },
                {
                    "name": "path",
                    "valueString": "Task.businessStatus"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R352-StatutMetierAnomalie/FHIR/TRE-R352-StatutMetierAnomalie",
                                "code": "08",
                                "display": "Corrigé"
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
```

#### 2 Inactivation d’une anomalie

**Description du scénario :** Un responsable qualité ou un système numérique décide d’inactiver une anomalie (elle a été saisie par erreur par exemple).

**Exemple :** Le déclarant de l’anomalie souhaite annuler l’anomalie en question dont l'identifiant technique est 1310.

**Requête :**

```json
Content-Type: application/fhir+json

PRequête Postman : PATCH https://rortest.esante.gouv.fr/anomalies/Task/1310

Body :
{
    "resourceType": "Parameters",
    "parameter": [
        {
            "name": "operation",
            "part": [
                {
                    "name": "type",
                    "valueString": "replace"
                },
                {
                    "name": "path",
                    "valueString": "Task.businessStatus"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R352-StatutMetierAnomalie/FHIR/TRE-R352-StatutMetierAnomalie",
                                "code": "03",
                                "display": "Annulé"
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
```
