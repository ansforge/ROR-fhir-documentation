---
layout: menu-guide
section: guide
title: RORPractitionerRole
subTitle: Exemples POST
---

Cette page présente des exemples de requêtes `POST` sur la ressource [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Création d'une situation opérationnelle <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Afin de décrire son offre, un établissement ajoute une situation opérationnelle.

**Prérequis :** Le professionnel et l'offre opérationnelle liés à la siutation opérationnelle à créer existent et leurs identifiants respectifs sont connus (2524 et 9597).

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/PractitionerRole
{	
	"resourceType": "PractitionerRole",
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-practitionerrole"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "practitioner": {
        "reference": "Practitioner/2524"
    },
    "healthcareService": [
        {
            "reference": "HealthcareService/9597"
        }
    ],    
    "identifier": [
        {
            "value": "11102379616"
        }
    ],
    "code": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_G15-ProfessionSante/FHIR/TRE-G15-ProfessionSante",
                    "code": "60",
                    "display": "Infirmier"
                }
            ]
        }
    ],
    "extension": [
        {
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-meta-creation-date",
			"valueDateTime": "2023-12-09T14:30:00+01:00"
		},
        {
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/RORPractitionerRoleName",
			"extension": [
                {
                    "url": "exerciseFirstName", 
                    "valueString": "Mylène"
                },
                {
                    "url": "exerciseLastName", 
                    "valueString": "Tenor"
                }
            ]
		},
        {
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-practitionerrole-unit-exercise-mode",
			"valueCodeableConcept": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_R23-ModeExercice/FHIR/TRE-R23-ModeExercice",
                        "code": "L",
                        "display": "Libéral, indépendant, artisan, commerçant"
                    }
                ]    
            }
		}
    ]
}
```
