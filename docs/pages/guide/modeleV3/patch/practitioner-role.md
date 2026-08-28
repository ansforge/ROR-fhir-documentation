---
layout: menu-guide
section: guide
title: RORPractitionerRole
subTitle: Exemples PATCH
---

Cette page présente des exemples de requêtes `PATCH` sur la ressource [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Modification d'informations sur une situation opérationnelle <code><span style="color: #22ffd3;">serveur</span></code> <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** L'annuaire enrichit le savoir faire d'un professionnel de santé, l'adossement du ROR national modifie les informations de la situation opérationnelle.

**Prérequis :** L'identifiant technique de la situation opérationnelle est connu (753).

**Requête :**

```json
PATCH [BASE]/PractitionerRole/753
{
    "resourceType": "Parameters",
    "parameter": [ 
        {
            "name": "operation",
            "part": [ 
                {
                    "name": "type",
                    "valueString": "add"
                }, 
                {
                    "name": "path",
                    "valueString": "PractitionerRole"
                },
                {
                    "name": "name",
                    "valueString": "specialty"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R04-TypeSavoirFaire/FHIR/TRE-R04-TypeSavoirFaire",
                            "code": "S",
                            "display": "Spécialité ordinale"
                        }
                    }
                }
            ]
        },
        {
            "name": "operation",
            "part": [ 
                {
                    "name": "type",
                    "valueString": "add"
                }, 
                {
                    "name": "path",
                    "valueString": "PractitionerRole"
                },
                {
                    "name": "name",
                    "valueString": "specialty"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R38-SpecialiteOrdinale/FHIR/TRE-R38-SpecialiteOrdinale",
                            "code": "SI02",
                            "display": "Exercice infirmier en pratique avancée oncologie et hémato-oncologie (SI)"
                        }
                    }
                }
            ]
        }
    ]
}
```
