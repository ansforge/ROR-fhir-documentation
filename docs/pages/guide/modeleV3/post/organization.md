---
layout: menu-guide
section: guide
title: ROROrganization
subTitle: Exemples POST
---

Cette page présente des exemples de requêtes `POST` sur la ressource [ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Création de l'entité juridique <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Afin de décrire son offre, un établissement crée son entité juridique. 

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/Organization
{	
	"resourceType": "Organization",   
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-organization"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "name": "Quiétude",
    "identifier": [ 
        {
            "value": "2921317258",
            "type": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_G07-TypeIdentifiantStructure/FHIR/TRE-G07-TypeIdentifiantStructure",
                        "code": "40", 
                        "display": "Identifiant national de structure"
                    }
                ]
            },    
            "system": "urn:oid:1.2.250.1.71.4.2.2"
        },
        {
            "value": "921317258",
            "type": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_G07-TypeIdentifiantStructure/FHIR/TRE-G07-TypeIdentifiantStructure",
                        "code": "2",
                        "display": "SIREN"
                    }
                ]
            },
            "system": "http://sirene.fr"
        }
    ],
    "type": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R72-FinessStatutJuridique/FHIR/TRE-R72-FinessStatutJuridique",
                    "code": "72",
                    "display": "Société à responsabilité limitée (SARL)"
                }
            ]
        },
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R69-FinessAgregatStatutJuridiqueNiv2/FHIR/TRE-R69-FinessAgregatStatutJuridiqueNiv2",
                    "code": "2200",
                    "display": "Organisme privé à caractère commercial"
                }
            ]       
        }
    ],
	"address": [
        {
            "city": "BOIS-COLOMBES",
            "postalCode": "92270",
            "line": ["103 rue des Bourguignons, 92270 BOIS-COLOMBES"],
            "_line": [
                {
                    "extension": [
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber",
                            "valueString": "103"
                        },
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetNameType",
                            "valueString": "rue"
                    },
                        {
                            "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetNameBase",
                            "valueString": "des Bourguignons"
                        }
                    ]
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

#### 2 Création de l'entité géographique <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Afin de décrire son offre, un établissement crée son entité géographique.

**Prérequis :** L'entité juridique dont fait partie l'entité géographique à créer existe et son identifiant est connu (1111).

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/Organization
{	
	"resourceType": "Organization",
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-organization"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "name": "Quiétude BOIS COLOMBES",
    "partOf": {
        "reference": "Organization/1111"
    },
    "identifier": [ 
        {
            "value": "392131725800020",
            "type": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_G07-TypeIdentifiantStructure/FHIR/TRE-G07-TypeIdentifiantStructure",
                        "code": "40", 
                        "display": "Identifiant national de structure"
                    }
                ]
            },
            "system": "urn:oid:1.2.250.1.71.4.2.2"
        },
        {
            "value": "92131725800020",
            "type": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_G07-TypeIdentifiantStructure/FHIR/TRE-G07-TypeIdentifiantStructure",
                        "code": "3",
                        "display": "SIRET"
                    }
                ]
            }, 
            "system": "http://sirene.fr"
        }
    ],
    "type": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement",
                    "code": "460",
                    "display": "Service autonomie aide (SAA)"
                }
            ]    
        }
    ],
	"address": [
        {
            "city": "BOIS-COLOMBES",
            "postalCode": "92270",
            "line": ["45 rue du général Leclerc, 92270 BOIS-COLOMBES"],
            "_line": [
                {
                    "extension": [
                        {
                            "id": "Location.address.line.extension:houseNumber",
                            "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber",
                            "valueString": "45"
                        },
                        {
                            "id": "Location.address.line.extension:streetNameType",
                            "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetNameType",
                            "valueString": "rue"
                        },
                        {
                            "id": "Location.address.line.extension:streetNameBase",
                            "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetNameBase",
                            "valueString": "du général Leclerc"
                        }
                    ]
                }
            ]
        }
    ],
    "contact": [
        {
            "purpose": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_R287-NatureContact/FHIR/TRE-R287-NatureContact",
                        "code": "06",
                        "display": "standard"
                    }
                ]       
            },
            "extension": [
                {
                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-contact-confidentiality-level",
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
            ],
            "telecom": [
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
    ],
	"extension": [
        {
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-meta-creation-date",
			"valueDateTime": "2023-12-09T14:30:00+01:00"
		},
        {
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-organization-financial-help-type",
			"valueCodeableConcept": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_R241-AideFinanciere/FHIR/TRE-R241-AideFinanciere",
                        "code": "02",
                        "display": "Habilité Aide Sociale"
                    }
                ]    
            }
		},
        {
			"url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-organization-accomodation-family",
			"valueBoolean": false
		}
    ]
}
```

#### 3 Création d'un pôle <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Afin de décrire son offre, un établissement crée un pôle.

**Prérequis :** L'entité géograpghique dont fait partie le pôle à créer existe et son identifiant est connu (3536).

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/Organization
{	
	"resourceType": "Organization",
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-organization"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "name": "Pôle Chirurgical B",
    "partOf": {
        "reference": "Organization/3536"
    },
    "identifier": [
        {
            "value": "ZZZ",
            "type": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_R345-TypeIdentifiantAutre/FHIR/TRE-R345-TypeIdentifiantAutre",
                        "code": "42",
                        "display": "Identifiant fonctionnel de l'OI connu par l'instance ROR"
                    }
                ]
            },
            "system": "https://oi.esante.gouv.fr"
        }
    ],
    "type": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R207-TypeOrganisationInterne/FHIR/TRE-R207-TypeOrganisationInterne",
                    "code": "1", 
                    "display": "Pôle"
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

#### 4 Création d'un service <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Afin de décrire son offre, un établissement crée un service.

**Prérequis :** L'établissement dont fait partie le service à créer existe et son identifiant est connu (3537).

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/Organization
{	
	"resourceType": "Organization",
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-organization"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "name": "Tête et Cou",
    "partOf": {
        "reference": "Organization/3537"
    },
    "identifier": [
        {
            "value": "ZZZ",
            "type": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_R345-TypeIdentifiantAutre/FHIR/TRE-R345-TypeIdentifiantAutre",
                        "code": "42",
                        "display": "Identifiant fonctionnel de l'OI connu par l'instance ROR"
                    }
                ]
            },       
            "system": "https://oi.esante.gouv.fr"
        }
    ],
    "type": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R207-TypeOrganisationInterne/FHIR/TRE-R207-TypeOrganisationInterne",
                    "code": "2", 
                    "display": "Structure interne ou Service"
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

#### 5 Création d'une unité fonctionnelle <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Afin de décrire son offre, un établissement crée une unité fonctionnelle.

**Prérequis :** L'établissement dont fait partie l'unité fonctionnelle à créer existe et son identifiant est connu (6963).

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.

```json
POST [BASE]/Organization
{	
	"resourceType": "Organization",
    "meta": {
        "profile" : ["https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-organization"], 
        "lastUpdated": "2023-12-20T10:00:00+01:00"
    },
    "name": "Neurochirurgie",
    "partOf": {
        "reference": "Organization/6963"
    },
    "identifier": [
        {
            "value": "ZZZ",
            "type": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_R345-TypeIdentifiantAutre/FHIR/TRE-R345-TypeIdentifiantAutre",
                        "code": "42",
                        "display": "Identifiant fonctionnel de l'OI connu par l'instance ROR"
                    }
                ]
            },
            "system": "https://oi.esante.gouv.fr"
        }
    ],
    "type": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R207-TypeOrganisationInterne/FHIR/TRE-R207-TypeOrganisationInterne",
                    "code": "3", 
                    "display": "Unité fonctionnelle"
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
