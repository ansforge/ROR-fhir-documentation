---
layout: menu-guide
section: guide
title: ROROrganization
subTitle: Exemples PATCH
---

Cette page présente des exemples de requêtes `PATCH` sur la ressource [ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Modification d'une entité juridique <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Une entité juridique enregistre un changement d'adresse.

**Prérequis :** L'identifiant technique de l'entité juridique est connu (1234).

**Requête :**

```json
PATCH [BASE]/Organization/1234
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
                    "valueString": "Organization"
                },
                {
                    "name": "name",
                    "valueString": "address"
                },
                {
                    "name": "value",
                    "value": {
                        "city": "BOIS-COLOMBES",
                        "postalCode": "92270",
                        "line": ["42 Rue d'Estienne d'Orves, 92270 BOIS-COLOMBES"],
                        "_line": [
                            {
                                "extension": [
                                    {
                                        "id": "Location.address.line.extension:houseNumber",
                                        "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber",
                                        "valueString": "42"
                                    },
                                    {
                                        "id": "Location.address.line.extension:streetNameType",
                                        "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetNameType",
                                        "valueString": "rue"
                                    },
                                    {
                                        "id": "Location.address.line.extension:streetNameBase",
                                        "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetNameBase",
                                        "valueString": "d'Estienne d'Orves"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
```

#### 2 Modification d'une entité géographique <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Une entité géographique enregistre un changement de numéro de téléphone (passage de 01.01.01.02.01 à 01.01.01.02.02) et ajoute un contact (GREDIN Thierry).

**Prérequis :** L'identifiant technique de l'entité géographique est connu (4569).

**Requête :**

```json
PATCH [BASE]/Organization/4569
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
                    "valueString": "Organization.telecom"
                },
                {
                    "name": "value",
                    "valueContactPoint": [
                        {
                            "system": "phone",
                            "value": "01.01.01.02.02",
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
                    "valueString": "Organization"
                },
                {
                    "name": "name",
                    "valueString": "contact"
                },
                {
                    "name": "value",
                    "value": {
                        "name": {
                            "family": "GREDIN",
                            "given": "Thierry"
                        },
                        "purpose": {
                            "coding": {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R251-FonctionContact/FHIR/TRE-R251-FonctionContact",
                                "code": "01",
                                "display": "Directeur"
                            }
                        },
                        "extension": {
                            "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-contact-confidentiality-level",
                            "valueCodeableConcept": {
                                "coding": {
                                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R283-NiveauConfidentialite/FHIR/TRE-R283-NiveauConfidentialite",
                                    "code": "2",
                                    "display": "Accès restreint"
                                }
                            }
                        },
                        "telecom": {
                            "value": "01.01.01.02.03", 
                            "extension": [
                                {
                                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-telecom-communication-channel"
                                    "valueCodeableConcept": {
                                        "coding": {
                                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R200-CanalCommunication/FHIR/TRE-R200-CanalCommunication",
                                            "code": "2",
                                            "display": "Téléphone fixe"
                                        }
                                    }
                                },
                                {
                                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-contact-confidentiality-level",
                                    "valueCodeableConcept": {
                                        "coding": {
                                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R283-NiveauConfidentialite/FHIR/TRE-R283-NiveauConfidentialite",
                                            "code": "2",
                                            "display": "Accès restreint"
                                        }
                                    }    
                                }
                            ]
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 3 Modification d'une organisation interne <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un établissement sanitaire modifie le nom d'un service.

**Prérequis :** L'identifiant technique du service est connu (789).

**Requête :**

```json
PATCH [BASE]/Organization/789
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
                    "valueString": "Organization"
                },
                {
                    "name": "name",
                    "valueString": "name"
                },
                {
                    "name": "value",
                    "valueString": "TECOTRO (Tête, cou et tronc)"
                }
            ]
        }
    ]
}
```
