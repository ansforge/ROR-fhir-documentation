---
layout: menu-guide
section: guide
title: RORPractitioner
subTitle: Exemples PATCH
---

Cette page présente des exemples de requêtes `PATCH` sur la ressource [RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Modification d'informations sur un professionnel <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** L'annuaire modifie les informations concernant un professionnel, l'adossement ROR national modifie les informations du professionnel.

**Prérequis :** L'identifiant technique du professionnel est connu (159).

**Requête :**

```json
PATCH [BASE]/Practitioner/159
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
                    "valueString": "Practitioner.telecom"
                },
                {
                    "name": "value",
                    "valueContactPoint": [
                        {
                            "system": "email",
                            "value": "cyndi.chanmet@SomedNantes.mssante.fr",
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
                        }, 
                        {
                            "system": "phone",
                            "value": "01.01.01.01.01",
                            "extension": [
                                {
                                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-telecom-communication-channel",
                                    "valueCodeableConcept": {
                                        "coding": [
                                            {
                                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R200-CanalCommunication/FHIR/TRE-R200-CanalCommunication",
                                                "code": "2",
                                                "display": "Téléphone fixe"
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
                                                "code": "1",
                                                "display": "Accès libre"
                                            }
                                        ]    
                                    }    
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```
