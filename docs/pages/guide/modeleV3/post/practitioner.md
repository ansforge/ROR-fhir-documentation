---
layout: menu-guide
section: guide
title: RORPractitioner
subTitle: Exemples POST
---

Cette page présente des exemples de requêtes `POST` sur la ressource [RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Création d'un professionnel <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Afin de décrire son offre, un établissement ajoute un professionnel.

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/Practitioner
{	
	"resourceType": "Practitioner",
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-practitioner"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "name": [
        {
            "family": "CHANMET",
            "given": ["Cyndi"]
        }
    ],
    "identifier": [
        {
            "value": "11111573474",
            "system": "urn:oid:1.2.250.1.71.4.2.1"
        }
    ],
    "gender": "female",
    "telecom": [
        {
            "system": "email",
            "value": "cyndi.chanmet@lifen.mssante.fr",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-telecom-communication-channel",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R200-CanalCommunication/FHIR/TRE-R200-CanalCommunication",
                                "code": "3",
                                "display": "Courrier électronique"
                            }
                        ]    
                    }
                },
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-telecom-confidentiality-level",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R283-NiveauConfidentialite/FHIR/TRE-R283-NiveauConfidentialite",
                                "code": "2",
                                "display": "Accès restreint"
                            }
                        ]    
                    }    
                }
            ]
        }
    ],
    "extension": [
        {
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-meta-creation-date",
			"valueDateTime": "2023-12-09T14:30:00+01:00"
		}
    ]
}
```
