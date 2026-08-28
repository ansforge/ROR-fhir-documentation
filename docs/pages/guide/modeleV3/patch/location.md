---
layout: menu-guide
section: guide
title: RORLocation
subTitle: Exemples PATCH
---

Cette page présente des exemples de requêtes `PATCH` sur la ressource [RORLocation]({{ '/pages/guide/modeleV3/resources/location.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Mise à jour de l'adresse du lieu de réalisation de l'offre <code><span style="color: #22ffd3;">serveur</span></code> <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Un établissement modifie le numéro de voie de l'adresse (nouvelle valeur : YYY) du lieu de réalisation de l'offre dont l'identifiant est XXX.

**Requête :**
```json
PATCH [BASE]/Location/XXX
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
          				"valueString": "Location"
        			},	
		   		{
					"name": "extension",
					"part": [
			   			{
				   			"name": "url",
				   			"valueUri": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber"
			   			},
					  	{
							"name": "value",
							"valueString": "YYY"
						}
					]
				}
			]
		 }
	]
}
```

#### 2 Ajout d'un équipement spécifique dans un lieu de réalisation de l'offre <code><span style="color: #22ffd3;">serveur</span></code> <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Ajout d'un équipement spécifique dans un lieu de réalisation de l'offre dont l'identifiant est XXX : 089 \| lit d\'hospitalisation obésité (poids entre 250 et 350 kg) - bariatrique, nb en service : 2, limite caractéristique équipement : 001 \| poids maximum, valeur limite = 300 kg.

**Requête :**
```json
PATCH [BASE]/Location/XXX
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
                    "valueString": "Location"
                }, 
                {
                    "name": "extension",
                    "part": [ 
                        {
                            "name": "url",
                            "valueUri": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition-ror-location-equipment"
                        },
                        {
                            "name": "extension",
                            "part": [
                                {
                                    "name": "url",
                                    "valueString": "equipmentType"
                                },
                                {
									"name": "value",
                                    "valueCodeableConcept": {
										"coding": [
											{
												"system": "https://mos.esante.gouv.fr/NOS/JDV_J18-EquipementSpecifique-ROR/FHIR/JDV-J18-EquipementSpecifique-ROR",
												"code": "089",
												"display": "Lit d'hospitalisation obésité (poids entre 250 et 350 kg) - bariatrique"
											}
										]
									}
                                },
                                {
									"name": "url",
									"valueString": "nbInService"
								},
								{
									"name": "value",
									"valueInteger": "2"
								}
                            ]	
						}		
					]
				},
                {
                    "name": "extension",
                    "part": [ 
                        {
                            "name": "url",
                            "valueUri": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition-ror-location-equipment-limit"
                        },
                        {
                            "name": "extension",
                            "part": [
                                {
									"name": "url",
									"valueString": "equipmentFeature"
								},
                                {
									"name": "value",
                                    "valueCodeableConcept": {
										"coding": [
											{
												"system": "https://mos.esante.gouv.fr/NOS/JDV_J228-TypeCaracteristiqueEquipement-ROR/FHIR/JDV-J228-TypeCaracteristiqueEquipement-ROR",
												"code": "001",
												"display": "Poids maximum"
											}
										]
									}
                                },
                                {
									"name": "url",
									"valueString": "limitValue"
								},
								{
									"name": "value",
									"quantity":  [
                                        {
                                            "value": "300",
                                            "unit": "kg"

                                        }
                                    ]
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

#### 3 Modification de la quantité d'équipements spécifiques dans un lieu de réalisation de l'offre <code><span style="color: #22ffd3;">serveur</span></code> <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Modification de la quantité d'équipements spécifiques dans un lieu de réalisation de l'offre dont l'identifiant est XXX : 089 \| lit d\'hospitalisation obésité (poids entre 250 et 350 kg) - bariatrique, nb en service : 3, limite caractéristique équipement : 001 \| poids maximum, valeur limite = 300 kg.

**Requête :**
```json
PATCH [BASE]/Location/XXX
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
                    "valueString": "Location.extension.where(url='https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-equipment' and extension.where(url='equipmentType' and valueCodeableConcept.coding[0].code='089') and extension.extension.where(url='https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-equipment-limit' and extension.where(url='limitValue' and valueQuantity.value=300 and valueQuantity.unit='kg') and extension.where(url='equipmentFeature' and valueCodeableConcept.coding[0].code='001'))).extension.where(url='nbInService')"
                },
                {
                    "name": "value",
                    "value": 3
                }
            ]
        }
    ]
}
```

#### 4 Suppression d'un équipement spécifique dans un lieu de réalisation de l'offre <code><span style="color: #22ffd3;">serveur</span></code> <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Un établissement indique qu'il ne dispose plus de l'échographe 3D, il modifie le nombre d'équipement en service : 030 \| Echographe 3D, nb en service : 0, aucune limite équipement associée.

**Requête :**
```json
PATCH [BASE]/Location/XXX
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
                    "valueString": "Location.extension.where(url='https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-equipment' and extension.where(url='equipmentType' and valueCodeableConcept.coding[0].code='030')).extension.where(url='nbInService')"
                },
                {
                    "name": "value",
                    "value": 0
                }
            ]
        }
    ]
}
```

#### 5 Modification de la valeur limite d'un équipement spécifique dans un lieu de réalisation de l'offre <code><span style="color: #22ffd3;">serveur</span></code> <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Un établissement modifie la valeur limite d'un équipement spécifique dans un lieu de réalisation de l'offre dont l'identifiant est XXX : 089 \| lit d\'hospitalisation obésité (poids entre 250 et 350 kg) - bariatrique, nb en service : 2, limite caractéristique équipement : 001 \| poids maximum, valeur limite = 280 kg.

**Requête :**
```json
PATCH [BASE]/Location/XXX

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
                    "valueString": "Location.extension.where(url='https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-equipment' and extension.where(url='equipmentType' and valueCodeableConcept.coding[0].code='089') and extension.extension.where(url='https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-equipment-limit' and extension.where(url='equipmentFeature' and valueCodeableConcept.coding[0].code='001') and and extension.where(url='limitValue' and valueQuantity.value=300 and valueQuantity.unit='kg'))).extension.extension.where(url='https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-equipment-limit').extension.where(url='limitValue').valueQuantity.value"
                },
                {
                    "name": "value",
                    "part": [
				{
					"name": "value",
					"value": 280
				}
			]
                }
            ]
        }
    ]
}
```
