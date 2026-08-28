---
layout: menu-guide
section: guide
title: RORHealthcareService
subTitle: Exemples PATCH
---

Cette page présente des exemples de requêtes `PATCH` sur la ressource [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Modification d'une offre opérationnelle (Ajout d'un acte spécifique) <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un établissement ajoute un acte spécifique dans une offre opérationnelle déjà décrite au sein d'une structure.

**Prérequis :** L'identifiant technique de l'offre opérationnelle est connu (741).

**Requête :**

```json
PATCH [BASE]/HealthcareService/741
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
                    "valueString": "HealthcareService"
                },
                {
                    "name": "name",
                    "valueString": "characteristic"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                            "code": "316",
                            "display": "Neurochirurgie éveillée avec mapping cortical"
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 2 Modification d'une offre opérationnelle (Retrait d'une activité opérationnelle) <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un établissement retire une activité opérationnelle au sein d'une offre opérationnelle déjà décrite au sein d'une structure.

**Prérequis :** L'identifiant technique de l'offre opérationnelle est connu (852).

**Requête :**

```json
PATCH [BASE]/HealthcareService/852
{
    "resourceType": "Parameters",
    "parameter": [
        {
            "name": "operation",
            "part": [ 
                {
                    "name": "type",
                    "valueString": "delete"
                }, 
                {
                    "name": "path",
                    "valueString": "HealthcareService"
                },
                {
                    "name": "name",
                    "valueString": "specialty"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                            "code": "040",
                            "display": "Diététique et Nutrition"
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 3 Modification d'une offre opérationnelle (Précision sur l'offre opérationnelle d'un cabinet de ville) <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un professionnel de santé précise son offre opérationnelle et ajoute des valeurs d'activité opérationnelle et d'acte spécifique.

**Prérequis :** L'identifiant technique de l'offre opérationnelle est connu (963).

**Requête :**

```json
PATCH [BASE]/HealthcareService/963
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
                    "valueString": "HealthcareService"
                },
                {
                    "name": "name",
                    "valueString": "specialty"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                            "code": "040",
                            "display": "Diététique et Nutrition"
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
                    "valueString": "HealthcareService"
                },
                {
                    "name": "name",
                    "valueString": "specialty"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                            "code": "483",
                            "display": "Médecine générale à orientation Diabétologie"
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
                    "valueString": "HealthcareService"
                },
                {
                    "name": "name",
                    "valueString": "characteristic"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                            "code": "0628",
                            "display": "Education thérapeutique du patient non labellisée ou psychoéducation"
                        },
                        "extension": {
                            "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-act-type",
                            "valueCode": "specificAct"
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
                    "valueString": "HealthcareService"
                },
                {
                    "name": "name",
                    "valueString": "characteristic"
                },
                {
                    "name": "value",
                    "value": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                            "code": "1181",
                            "display": "Diagnostic par dermatoscope"
                        },
                        "extension": {
                            "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-act-type",
                            "valueCode": "specificAct"
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
                    "valueString": "HealthcareService"
                },
                {
                    "name": "name",
                    "valueString": "characteristic"
                },
                {
                    "name": "value",
                    "value": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                            "code": "1270",
                            "display": "Tamponnement nasal antérieur"
                        },
                        "extension": {
                            "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-act-type",
                            "valueCode": "specificAct"
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
                    "valueString": "HealthcareService"
                },
                {
                    "name": "name",
                    "valueString": "characteristic"
                },
                {
                    "name": "value",
                    "valueCodeableConcept": {
                        "coding": {
                            "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                            "code": "1282",
                            "display": "Programme d'ETP labellisée - Diabète"
                        },
                    "extension": {
                            "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-act-type",
                            "valueCode": "outsideOfficeAct"
                        }
                    }
                }
            ]
        }
    ]
}
```
