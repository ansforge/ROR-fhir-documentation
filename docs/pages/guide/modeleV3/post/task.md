---
layout: menu-guide
section: guide
title: RORTask
subTitle: Exemples POST
---

Cette page présente des exemples de requêtes `POST` sur la ressource [RORTask]({{ '/pages/guide/modeleV3/resources/task.html' | relative_url }}). Pour la présentation de la ressource et ses caractéristiques techniques, voir cette même page.

#### 1 Un responsable qualité souhaite signaler une anomalie sur un élément. <code><span style="color: #22ffd3;">serveur</span></code>

**Description du scénario :** Un responsable qualité souhaite signaler une anomalie sur un élément.

**Exemple :** Signalement d’une anomalie sur la catégorie d’établissement pour un établissement spécifique.

**Requête :**

N.B.: Exemple de ressource fictif pour illustration, ces ressources ne sont pas validées par le guide d'implémentation et sont donc sujettes aux erreurs. Pour l'implémentation se baser sur les profils.


```json

Requête Postman : POST https://rortest.esante.gouv.fr/anomalies/Task

Body :
{
    "resourceType": "Task",
    "id": "ror-task-exemple",
    "meta": {
        "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-task"
        ]
    },
    "text": {
        "status": "generated",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Generated Narrative: Task ror-task-exemple</b></p><a name=\"ror-task-exemple\"> </a><a name=\"hcror-task-exemple\"> </a><a name=\"ror-task-exemple-fr-FR\"> </a><p><b>status</b>: In Progress</p><p><b>businessStatus</b>: <span title=\"Codes:{https://mos.esante.gouv.fr/NOS/TRE_R352-StatutMetierAnomalie/FHIR/TRE-R352-StatutMetierAnomalie 02}\">À traiter</span></p><p><b>intent</b>: order</p><p><b>code</b>: <span title=\"Codes:{https://mos.esante.gouv.fr/NOS/TRE_R350-ThematiqueAnomalie/FHIR/TRE-R350-ThematiqueAnomalie 06}\">Exactitude</span></p><p><b>description</b>: Ici la catégorie d'établissement n'est pas la bonne</p><p><b>focus</b>: Identifier: 1910800002</p><p><b>authoredOn</b>: 2024-01-03</p><p><b>lastModified</b>: 2024-01-04</p><p><b>reasonCode</b>: <span title=\"Codes:{https://mos.esante.gouv.fr/NOS/TRE_R349-ActionAnomalie/FHIR/TRE-R349-ActionAnomalie COR}\">Correction</span></p><blockquote><p><b>input</b></p><p><b>type</b>: <span title=\"Codes:{https://interop.esante.gouv.fr/ig/fhir/ror/CodeSystem/input-task-ror-codesystem systemRequester}\">systemRequester</span></p><p><b>value</b>: IHM</p></blockquote><blockquote><p><b>input</b></p><p><b>type</b>: <span title=\"Codes:{https://interop.esante.gouv.fr/ig/fhir/ror/CodeSystem/input-task-ror-codesystem pathElementError}\">pathElementError</span></p><p><b>value</b>: <span title=\"text/fhirpath\"><code>Organization.type.coding.where(system='https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement')</code></span></p></blockquote></div>"
    },
    "status": "in-progress",
    "businessStatus": {
        "coding": [
            {
                "system": "https://mos.esante.gouv.fr/NOS/TRE_R352-StatutMetierAnomalie/FHIR/TRE-R352-StatutMetierAnomalie",
                "code": "02",
                "display": "À traiter"
            }
        ]
    },
    "intent": "order",
    "code": {
        "coding": [
            {
                "system": "https://mos.esante.gouv.fr/NOS/TRE_R350-ThematiqueAnomalie/FHIR/TRE-R350-ThematiqueAnomalie",
                "code": "06",
                "display": "Exactitude"
            }
        ]
    },
    "description": "Ici la catégorie d'établissement n'est pas la bonne",
    "focus": {
        "type": "Organization",
        "identifier": {
            "value": "1910800002"
        }
    },
    "authoredOn": "2024-01-03",
    "lastModified": "2024-01-04",
    "reasonCode": {
        "coding": [
            {
                "system": "https://mos.esante.gouv.fr/NOS/TRE_R349-ActionAnomalie/FHIR/TRE-R349-ActionAnomalie",
                "code": "COR",
                "display": "Correction"
            }
        ]
    },
    "input": [
        {
            "type": {
                "coding": [
                    {
                        "system": "https://interop.esante.gouv.fr/ig/fhir/ror/CodeSystem/input-task-ror-codesystem",
                        "code": "systemRequester"
                    }
                ]
            },
            "valueString": "IHM"
        },
        {
            "type": {
                "coding": [
                    {
                        "system": "https://interop.esante.gouv.fr/ig/fhir/ror/CodeSystem/input-task-ror-codesystem",
                        "code": "pathElementError"
                    }
                ]
            },
            "valueExpression": {
                "language": "text/fhirpath",
                "expression": "Organization.type.coding.where(system='https://mos.esante.gouv.fr/NOS/TRE_R66-CategorieEtablissement/FHIR/TRE-R66-CategorieEtablissement')"
            }
        }
    ]
}
```
