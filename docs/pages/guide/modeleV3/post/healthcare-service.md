---
layout: menu-guide
section: guide
title: RORHealthcareService
subTitle: Exemples POST
---

Cette page présente des exemples de requêtes `POST` sur la ressource [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Création d'une offre opérationnelle directement rattachée à l'établissement <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un établissement ajoute une offre opérationnelle couvrant une autre zone d'intervention que les offres opérationnelles précédemment enregistrées.

**Prérequis :** L'établissement dont fait partie l'offre opérationnelle à créer et son lieu de réalisation existent et leurs identifiants respectifs sont connus (2424 et 654).

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/HealthcareService
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
        }
    ],
    "availableTime": [
        {
            "availableStartTime": "09:00:00",
            "availableEndTime": "17:00:00",
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
            "availableEndTime": "17:00:00",
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
            "availableEndTime": "17:00:00",
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
                    "valueInteger": "3"
                }
            ]    
        },
        {
            "availableStartTime": "09:00:00",
            "availableEndTime": "17:00:00",
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
            "availableEndTime": "17:00:00",
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
        }
    ]
}
```

#### 2 Création d'une offre opérationnelle dans une unité fonctionnelle préexistante <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un établissement ajoute une offre opérationnelle de consultation neurochirurgicale dans une unité fonctionnelle de consultation.

**Prérequis :** L'établissement dont fait partie l'offre opéréationnelle à créer et son lieu de réalisation existent et leurs identifiants respectifs sont connus (5958 et 5253).

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/HealthcareService
{	
	"resourceType": "HealthcareService",
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "name": "Hospitalisation complète de Neurochirurgie",
    "providedBy": {
        "reference": "Organization/5958"
    },
    "location": [
        {
            "reference": "Location/5253"
        }
    ],
    "identifier": {
        "value": "ZZZ"
    },
    "type": {
        "coding": [
            {
                "system": "https://mos.esante.gouv.fr/NOS/TRE_R227-ChampActivite/FHIR/TRE-R227-ChampActivite",
                "code": "01", 
                "display": "Médecine, Chirurgie, Obstétrique (MCO)"
            }
        ]    
    },
    "specialty": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                    "code": "183", 
                    "display": "Traitement neurochirurgical de la douleur"
                }
            ]    
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                    "code": "440", 
                    "display": "Chirurgie intracrânienne"
                }
            ]    
        }
    ],
    "characteristic": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R213-ModePriseEnCharge/FHIR/TRE-R213-ModePriseEnCharge",
                    "code": "28", 
                    "display": "Hospitalisation complète (HC)"
                }
            ]    
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R210-ActeSpecifique/FHIR/TRE-R210-ActeSpecifique",
                    "code": "0320", 
                    "display": "Neuromodulation sacrée"
                }   
            ]
        }       
    ],
    "availableTime": [
        {
            "allDay": true,
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
            "allDay": true,
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
            "allDay": true,
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
                    "valueInteger": "3"
                }
            ]
        },
        {
            "allDay": true,
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
            "allDay": true,
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
        },
        {
            "allDay": true,
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
                    "valueInteger": "6"
                }
            ]
        },
        {
            "allDay": true,
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
                    "valueInteger": "7"
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
                            "value": 18
                        },
                        "high": {
                            "value": 90
                        }
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
                                "code": "06",
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R287-NatureContact/FHIR/TRE-R287-NatureContact",
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
                                "code": "1",
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R283-NiveauConfidentialite/FHIR/TRE-R283-NiveauConfidentialite",
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
                                        "system": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-telecom-communication-channel",
                                        "code": "2",
                                        "display": "Téléphone fixe"
                                    }
                                ]
                            }        
                        },
                        {
                            "url": "telecomAddress",
                            "valueString": "01.01.01.01.02"
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

#### 3 Création d'une offre opérationnelle de ville <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** A la suite d'un adossement à l'annuaire, le ROR national crée l'offre opérationnelle d'un cabinet de ville.

**Prérequis :** L'établissement dont fait partie l'offre opéréationnelle à créer et son lieu de réalisation existent et leurs identifiants respectifs sont connus (4947 et 1215).

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/HealthcareService
{	
	"resourceType": "HealthcareService",
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "name": "Cabinet du Dr Julie JOURDIN",
    "providedBy": {
        "reference": "Organization/4947"
    },
    "location": [
        {
            "reference": "Location/1215"
        }
    ],
    "identifier": {
        "value": "ZZZ"
    },
    "type": {
        "coding": [
            {
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R227-ChampActivite/FHIR/TRE-R227-ChampActivite",
            "code": "05", 
            "display": "Ville"
            }
        ]    
    },
    "specialty": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R211-ActiviteOperationnelle/FHIR/TRE-R211-ActiviteOperationnelle",
                    "code": "437", 
                    "display": "Médecine générale"
                }
            ]          
        }
    ],
    "characteristic": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R213-ModePriseEnCharge/FHIR/TRE-R213-ModePriseEnCharge",
                    "code": "32", 
                    "display": "Consultation (CS)"
                }
            ]
        }
    ],
    "availableTime": [
        {
            "availableStartTime": "09:00:00",
            "availableEndTime": "19:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "07",
                                "display": "Horaire de consultation sur RDV"
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
            "availableEndTime": "19:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "07",
                                "display": "Horaire de consultation sur RDV"
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
            "availableEndTime": "19:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "07",
                                "display": "Horaire de consultation sur RDV"
                            }
                        ]        
                    }
                }, 
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-number-days-of-week",
                    "valueInteger": "3"
                }
            ]    
        },
        {
            "availableStartTime": "09:00:00",
            "availableEndTime": "19:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "07",
                                "display": "Horaire de consultation sur RDV"
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
            "availableStartTime": "14:00:00",
            "availableEndTime": "19:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "07",
                                "display": "Horaire de consultation sur RDV"
                            }
                        ]        
                    }
                }, 
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-number-days-of-week",
                    "valueInteger": "5"
                }
            ]    
        },
        {
            "availableStartTime": "09:00:00",
            "availableEndTime": "12:00:00",
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-available-time-type-of-time", 
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "https://mos.esante.gouv.fr/NOS/TRE_R252-TypeHoraire/FHIR/TRE-R252-TypeHoraire",
                                "code": "06",
                                "display": "Horaire de consultation sans RDV"
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
                            "value": 0
                        },
                        "high": {
                            "value": 120
                        }
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
                                "code": "02",
                                "display": "Prise de rendez-vous"
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
                                        "system": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-telecom-communication-channel",
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
        }
    ]
}
```
