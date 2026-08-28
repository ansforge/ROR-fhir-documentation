---
layout: menu-guide
section: guide
title: RORLocation
subTitle: Exemples POST
---

Cette page présente des exemples de requêtes `POST` sur la ressource [RORLocation]({{ '/pages/guide/modeleV3/resources/location.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Ajout d'un lieu de réalisation de l'offre <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un établissement ajoute dans un établissement (EG) existant, un lieu de réalisation de l\'offre de fonction \"001 \| hébergement\", associé à une offre opérationnelle existante dont l'identifiant est XXX, dans la communeCog de Versailles, avec une adresse 7 rue porte de Buc, 78000 Versailles.

**Requête :**

-   Création du nouveau lieu de réalisation de l'offre

```json
POST [BASE]/Location 
{
    "resourceType": "Location",
    "id": "ror-location-exemple",
    "meta": {
        "lastUpdated": "2023-12-20T10:00:00+01:00",
        "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location"
        ]
    },
    "text": {
        "status": "extensions",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Generated Narrative: Location ror-location-exemple</b></p><a name=\"ror-location-exemple\"> </a><a name=\"hcror-location-exemple\"> </a><a name=\"ror-location-exemple-fr-FR\"> </a><div style=\"display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\"><p style=\"margin-bottom: 0px\">Last updated: 2023-12-20 10:00:00+0100</p><p style=\"margin-bottom: 0px\">Profile: <a href=\"StructureDefinition-ror-location.html\">RORLocation</a></p></div><p><b>RORCommuneCog</b>: <span title=\"Codes:{https://mos.esante.gouv.fr/NOS/TRE_R13-CommuneOM/FHIR/TRE-R13-CommuneOM 78646}\">Versailles</span></p><p><b>RORMetaCreationDate</b>: 2022-01-01 00:00:00+0000</p><p><b>type</b>: <span title=\"Codes:{https://mos.esante.gouv.fr/NOS/TRE_R343-FonctionLieu/FHIR/TRE-R343-FonctionLieu 001}\">Hébergement</span></p><p><b>address</b>: 7 rue porte de Buc Versailles 78000 </p></div>"
    },
    "extension": [
        {
            "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-commune-cog",
            "valueCodeableConcept": {
                "coding": [
                    {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_R13-CommuneOM/FHIR/TRE-R13-CommuneOM",
                        "code": "78646",
                        "display": "Versailles"
                    }
                ]
            }
        },
        {
            "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-meta-creation-date",
            "valueDateTime": "2022-01-01T00:00:00Z"
        }
    ],
    "type": [
        {
            "coding": [
                {
                    "system": "https://mos.esante.gouv.fr/NOS/TRE_R343-FonctionLieu/FHIR/TRE-R343-FonctionLieu",
                    "code": "001",
                    "display": "Hébergement"
                }
            ]
        }
    ],
    "address": {
        "line": [
            "7 rue porte de Buc"
        ],
        "_line": [
            {
                "extension": [
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber",
                        "valueString": "7"
                    },
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetNameType",
                        "valueString": "RUE"
                    },
                    {
                        "url": "http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetNameBase",
                        "valueString": "porte de Buc"
                    }
                ]
            }
        ],
        "city": "Versailles",
        "postalCode": "78000"
    }
}
```

-   Ajout de la référence au nouveau lieu créé (dont l'identifiant est YYY) dans la ressource de l'offre opérationnelle concernée

```json
PATCH [BASE]/HealthcareService/XXX
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
                    "valueString": "location"
                },
                {
                    "name": "value",
                    "part": [
                        {
                            "name": "reference",
                            "valueString": "Location/YYY" 
                        }
                    ]
                }
            ]
        }
    ]
}
```
