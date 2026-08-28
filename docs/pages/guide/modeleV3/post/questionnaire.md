---
layout: menu-guide
section: guide
title: RORQuestionnaire
subTitle: Exemples POST
---

Cette page présente des exemples de requêtes `POST` sur la ressource [RORQuestionnaire]({{ '/pages/guide/modeleV3/resources/questionnaire.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Création d'un modèle de saisie <code><span style="color: #22ffd3;">serveur</span></code> <code><span style="color: #ff0000;">draft</span></code>

**Description du scénario :** Un consommateur (ex: établissement) souhaite créer une nouvelle offre opération.

Exemple de ressource : [questionnaire (modèle de saisie) permettant de renseigner l'Offre Opérationnelle d'une unité hospitalière de gynécologie]({{ site.ror.ig_url }}/Questionnaire-ror-questionnaire-offre-mco.json)

**Requête :**

```json
POST [BASE]/Questionnaire
{
  "resourceType": "Questionnaire",
  "id": "ror-questionnaire-offre-mco",
  "meta": {
    "profile": [
      "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-questionnaire-healthcareservice",
      "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-extr-defn"
    ]
  },
  "extension": [
    {
      "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-launchContext",
      "extension": [
        {
          "url": "name",
          "valueCoding": {
            "code": "ror-structure",
            "system": "https://interop.esante.gouv.fr/ig/fhir/ror/CodeSystem/ror-launchcontext"
          }
        },
        {
          "url": "type",
          "valueCode": "HealthcareService"
        }
      ]
    }
  ],
  "useContext": [
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "101",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "106",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "114",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "355",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "365",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "698",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "128",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "129",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "122",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "EG",
        "system": "https://mos.esante.gouv.fr/NOS/TRE_R67-TypeStructure-EJ-EG/FHIR/TRE-R67-TypeStructure-EJ-EG"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "131",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement"
          }
        ]
      }
    },
    {
      "code": {
        "code": "champAct",
        "system": "https://interop.esante.gouv.fr/ig/fhir/ror/CodeSystem/usage-context-ror-codesystem"
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "code": "01",
            "system": "https://mos.esante.gouv.fr/NOS/TRE_R227-ChampActivite/FHIR/TRE-R227-ChampActivite"
          }
        ]
      }
    }
  ],
  "version": "1",
  "name": "MS-141",
  "title": "Unité hospitalière de gynécologie",
  "identifier": [
    {
      "use": "official",
      "value": "MS-141"
    }
  ],
  "status": "active",
  "date": "2026-02-13",
  "publisher": "ANS",
  "description": "L’unité hospitalière de gynécologique assure la réalisation d’actes de gynécologie. Les valeurs proposées sont celles identifiées par le Conseil national professionnel (CNP) de gynécologie-obstétrique et de gynécologie médicale.",
  "url": "https://interop.esante.gouv.fr/ig/fhir/ror/Questionnaire/MS-141",
  "jurisdiction": [
    {
      "coding": [
        {
          "code": "FR",
          "system": "urn:iso:std:iso:3166",
          "display": "FRANCE"
        }
      ]
    }
  ],
  "subjectType": [
    "HealthcareService"
  ],
  "lastReviewDate": "2023-12-05",
  "purpose": "Les questionnaires créés à partir de cette ressource sont utilisés par les établissements pour saisir leurs offres opérationnelles.",
  "item": [
    {
      "extension": [
        {
          "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-itemExtractionContext",
          "valueExpression": {
            "language": "application/x-fhir-query",
            "expression": "HealthcareService"
          }
        }
      ],
      "linkId": "Hs1",
      "type": "group",
      "item": [
        {
          "linkId": "cing#Hs1.informationsGenerales",
          "text": "Informations générales",
          "type": "group",
          "item": [
            {
              "extension": [
                {
                  "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression",
                  "valueExpression": {
                    "language": "text/fhirpath",
                    "expression": "%user.name"
                  }
                }
              ],
              "linkId": "Hs1.name",
              "definition": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice#HealthcareService.name",
              "text": "Nom de l'offre",
              "type": "string",
              "required": true,
              "repeats": false,
              "readOnly": false
            },
            {
              "linkId": "Hs1.type",
              "definition": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice#HealthcareService.type",
              "type": "group",
              "item": [
                {
                  "extension": [
                    {
                      "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression",
                      "valueExpression": {
                        "language": "text/fhirpath",
                        "expression": "%user.type.where(coding.system = 'https://mos.esante.gouv.fr/NOS/TRE_R227-ChampActivite/FHIR/TRE-R227-ChampActivite').coding"
                      }
                    }
                  ],
                  "linkId": "Hs1.type.coding",
                  "definition": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice#HealthcareService.type.coding",
                  "text": "Champ d'activité",
                  "type": "choice",
                  "required": true,
                  "repeats": false,
                  "readOnly": false,
                  "answerOption": [
                    {
                      "valueCoding": {
                        "system": "https://mos.esante.gouv.fr/NOS/TRE_R227-ChampActivite/FHIR/TRE-R227-ChampActivite",
                        "code": "01",
                        "display": "Médecine, Chirurgie Obstétrique (MCO)"
                      },
                      "initialSelected": false
                    }
                  ]
                },
                {
                  "linkId": "Hs1.providedBy",
                  "definition": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-healthcareservice#HealthcareService.providedBy",
                  "text": "Rattachement organisationnel",
                  "type": "string",
                  "required": true,
                  "repeats": false,
                  "readOnly": false
                },
                ...
```
 Vous pouvez télécharger le json [ici]({{ site.ror.ig_url }}/Questionnaire-ror-questionnaire-offre-mco.json) et l'importer dans [https://lhcformbuilder.nlm.nih.gov/](https://lhcformbuilder.nlm.nih.gov/) pour le tester et le faire évoluer via cet IHM.
