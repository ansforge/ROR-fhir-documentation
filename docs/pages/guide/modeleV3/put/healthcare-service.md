---
layout: menu-guide
section: guide
title: RORHealthcareService
subTitle: Exemples PUT
---

Cette page présente des exemples de requêtes `PUT` sur la ressource [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Modification de multiples informations sur une offre <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un utilisateur ajoute une activité opérationnelle, un acte spécifique, un contact avec son numéro et modifie ses horaires.

**Prérequis :** L'identifiant technique de l'offre opérationnelle est connu (964).

**Requête :**

```json
PUT [BASE]/HealthcareService/964
{	
	"resourceType": "HealthcareService",
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "name": "Services à domicile quiétude Bois Colombes",
    "providedBy": {
        "reference": "Organization/2424"
    },
    "location": [
        {
            "reference": "Location/654"
        }
    ],
    "identifier": {
        "value": "ZZZ"
    },
    "category": {
        "coding": [
            {
                "system": "https://mos.esante.gouv.fr/NOS",
                "code": "30", 
                "display": "Service d’aide et d’accompagnement à domicile (SAAD)"
            }
        ]    
    },
    "type": {
        "coding": [
            {
                "system": "https://mos.esante.gouv.fr/NOS/TRE_R227-ChampActivite/FHIR/TRE-R227-ChampActivite",
                "code": "04", 
                "display": "Médico-social (MS)"
            }
        ]
    },
    "specialty": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                    "code": "298", 
                    "display": "Accompagnements pour vivre dans un logement"
                }
            ]
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R265-PrestationPilotageSerafin/FHIR/TRE-R265-PrestationPilotageSerafin",
                    "code": "019", 
                    "display": "2.3.2.1 Accompagnements pour vivre dans un logement"
                }
            ]
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                    "code": "299", 
                    "display": "Accompagnements pour accomplir les activités domestiques"
                }
            ]    
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R265-PrestationPilotageSerafin/FHIR/TRE-R265-PrestationPilotageSerafin",
                    "code": "020", 
                    "display": "2.3.2.2 Accompagnements pour accomplir les activités domestiques"
                }
            ]
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                    "code": "302", 
                    "display": "Accompagnements pour préparer sa vie professionnelle"
                }
            ]    
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R265-PrestationPilotageSerafin/FHIR/TRE-R265-PrestationPilotageSerafin",
                    "code": "023", 
                    "display": "2.3.3.2 Accompagnements pour préparer sa vie professionnelle"
                }
            ]
        }
    ],
    "characteristic": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R213-ModePriseEnCharge/FHIR/TRE-R213-ModePriseEnCharge",
                    "code": "59", 
                    "display": "Equipe d'intervention mobile"
                }
            ]
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R236-ModeGestion/FHIR/TRE-R236-ModeGestion",
                    "code": "02", 
                    "display": "Mandataire"
                }
            ]    
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                    "code": "0784", 
                    "display": "Entretien du logement (ménage, petit bricolage)"
                }
            ]
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                    "code": "0785", 
                    "display": "Entretien du linge"
                }
            ]    
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                    "code": "0786", 
                    "display": "Accompagnement pour faire des achats (courses)"
                }
            ]
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                    "code": "0787", 
                    "display": "Accompagnement ou apprentissage à la préparation du repas"
                }
            ]    
        }, 
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                    "code": "0788", 
                    "display": "Conduite du véhicule de la personne"
                }
            ]    
        }
    ],
    "availableTime": [
        {
            "availableStartTime": "09:00:00",
            "availableEndTime": "18:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "02",
                                "display": "Horaire de fonctionnement"
                            }
                        ]
                    }        
                },
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-number-days-of-week",
                    "valueInteger": "1"
                }
            ]    
        },
        {
            "availableStartTime": "09:00:00",
            "availableEndTime": "18:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "02",
                                "display": "Horaire de fonctionnement"
                            }
                        ]
                    }        
                },
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-number-days-of-week",
                    "valueInteger": "2"
                }
            ]    
        },
        {
            "availableStartTime": "09:00:00",
            "availableEndTime": "18:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "02",
                                "display": "Horaire de fonctionnement"
                            }
                        ]
                    }        
                },
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-number-days-of-week",
                    "valueInteger": "4"
                }
            ]    
        },
        {
            "availableStartTime": "09:00:00",
            "availableEndTime": "18:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "02",
                                "display": "Horaire de fonctionnement"
                            }
                        ]
                    }        
                },
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-number-days-of-week",
                    "valueInteger": "5"
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
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice-sensitive-unit",
			"valueBoolean": false
		},
        {
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice-patient-type",
			"extension": [
                {
                    "url": "ageRange",
                    "valueRange": {
                        "low": {
                            "value": 60
                        },
                        "high": {
                            "value": 120
                        }
                    }
                },
                {
                    "url": "supportedPatientInfo",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R239-PublicPrisEnCharge/FHIR/TRE-R239-PublicPrisEnCharge",
                                "code": "01", 
                                "display": "Personnes âgées en perte d'autonomie (PA) et aidants"
                            }
                        ]    
                    }
                }    
            ]
		},
        {
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-territorial-division",
			"extension": [
                {
                    "url": "codeTerritorialDivision",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R13-Commune/FHIR/TRE-R13-Commune",
                                "code": "92036", 
                                "display": "Bois-Colombes (92009)"
                            }
                        ] 
                    }
                },  
                {
                    "url": "typeTerritorialDivision",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R201-TypeDivisionTerritoriale/FHIR/TRE-R201-TypeDivisionTerritoriale",
                                "code": "3", 
                                "display": "Commune"
                            }
                        ]
                    }        
                }
            ]
		},
        { 
            "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice-contact",
            "extension": [
                {
                    "url": "purposeContact",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R287-NatureContact/FHIR/TRE-R287-NatureContact",
                                "code": "06",
                                "display": "Standard"
                            }
                        ] 
                    }       
                },
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-confidentiality-level",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R283-NiveauConfidentialite/FHIR/TRE-R283-NiveauConfidentialite",
                                "code": "1",
                                "display": "Accès libre"
                            }
                        ]
                    }        
                },
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice-contact-telecom",
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
                            "url": "telecomAddress",
                            "valueString": "01.01.01.01.01"
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
        },
        { 
            "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice-contact",
            "extension": [
                {
                    "url": "purposeContact",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R287-NatureContact/FHIR/TRE-R287-NatureContact",
                                "code": "01",
                                "display": "Accueil"
                            }
                        ] 
                    }       
                },
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-confidentiality-level",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R283-NiveauConfidentialite/FHIR/TRE-R283-NiveauConfidentialite",
                                "code": "1",
                                "display": "Accès libre"
                            }
                        ]
                    }        
                },
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice-contact-telecom",
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
                            "url": "telecomAddress",
                            "valueString": "01.01.01.01.03"
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
```
