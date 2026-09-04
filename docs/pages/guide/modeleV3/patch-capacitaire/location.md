---
layout: menu-guide
section: guide
title: RORLocation
subTitle: Patch capacitaire
---

Cette page décrit la mise à jour des données capacitaires (places ou lits disponibles) d'un lieu de réalisation de l'offre (`RORLocation`) via `PATCH`, réservée aux fournisseurs habilités à écrire le capacitaire.

### Prérequis

Vous devez posséder les droits d'écriture du capacitaire sur les établissements concernés (liste transmise préalablement à l'ANS).

### Principe

Le `PATCH` capacitaire fonctionne de façon similaire à une requête `GET`, à ces différences près :

| Caractéristique | Détail |
| --- | --- |
| Méthode HTTP | `PATCH` |
| Headers | Seuls 2 headers sont présents — les 4 headers `Ror-*` habituellement requis (voir [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }})) ne doivent **pas** être présents : <br>`Authorization: Bearer {{access_token}}`<br>`Content-Type: application/fhir+json` |

**Requête :**

```
PATCH [BASE]/ws-synchro-dispo-lits-fhir/Location?identifier=${identifier_location}
```

Où `${identifier_location}` est la concaténation de l'identifiant national de structure (IdNatStruct) de l'entité géographique et du code structure du lieu de réalisation, séparés par `/` : `IdNatStructEtab/id_externe_envoyé_par_la_région`.

Le body de la requête `PATCH` est construit de la façon suivante :

```json
{
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
                    "valueString": "[FHIRPath]"
                },
                {
                    "name": "value",
                    "part": [
                        {
                            "extension": [
                                {
                                    "extension": [
                                        ...
                                    ],
                                    "url": "https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-supported-capacity"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "resourceType": "Parameters"
}
```
Lors de la transmission de vos accès, l'ANS vous transmet une collection Postman d'exemple ainsi qu'un document explicatif détaillant les différents indicateurs capacitaires et leur FHIRPath correspondant.

Le capacitaire que l'on souhaite créer, mettre à jour ou supprimer est ciblé par son FHIRPath.

### Gestion des erreurs

#### Erreurs 404

Deux cas de figure impliquent une gestion différente dans votre implémentation.

**Indicateur non trouvé :** votre implémentation doit toujours tenter en premier lieu de mettre à jour un indicateur (opération `replace`). Si cet indicateur n'existe pas encore, le serveur répond avec un code HTTP `404` et un message d'erreur `not-found` précisant le FHIRPath de la ressource `Location.extension.where(url='https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-supported-capacity')` :

```json
{
    "resourceType": "OperationOutcome",
    "issue": [
        {
            "severity": "error",
            "code": "not-found",
            "diagnostics": "Les données fournies ne permettent pas de déterminer l'indicateur à mettre à jour: Aucun indicateur présent en base ne correspond",
            "expression": "Location.extension.where(url='https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-supported-capacity')"
        }
    ]
}
```

Vous devez émettre un `add` à la suite d'un `replace` en échec si la réponse a pour code HTTP `404`, pour code `not-found` et pour expression `Location.extension.where(url='https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-supported-capacity')`.

**Lieu de réalisation non trouvé :** également un code d'erreur `404` avec `not-found`, mais avec l'expression `location` :

```json
{
    "resourceType": "OperationOutcome",
    "issue": [
        {
            "severity": "error",
            "code": "not-found",
            "diagnostics": "La Location avec l'identifiant externe de synchro OU l'identifiant unique de saisie : '1350054680/SSR38888' n'a pas été trouvée.",
            "expression": [
                "Location"
            ]
        }
    ]
}
```

Dans ce cas, aucune `Location` du ROR national ne possède cet identifiant externe de synchro. Il convient de remonter l'erreur au GRADeS afin qu'il attribue le code service à un lieu de réalisation depuis l'IHM du ROR national.

#### Erreur 412

Lorsque plusieurs lieux de réalisation possèdent le même identifiant externe de synchronisation, l'erreur `412` suivante est retournée :

```json
{
    "resourceType": "OperationOutcome",
    "issue": [
        {
            "severity": "error",
            "code": "multiple-matches",
            "diagnostics": "La Location recherchée n'est pas unique, il y a '[n]' résultats",
            "expression": [
                "Location"
            ]
        }
    ]
}
```

Il convient de remonter l'erreur au GRADeS et à l'établissement concerné pour supprimer ces doublons.

#### Erreurs 400

Les erreurs `400` regroupent les erreurs métier, par exemple :

```json
{
    "resourceType": "OperationOutcome",
    "issue": [
        {
            "severity": "error",
            "code": "business-rule",
            "diagnostics": "Indicateur INDICATEUR_INCONNU : L'attribut 'natureCapacite' a un code différent de celui attendu",
            "expression": [
                "Location.extension('https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-supported-capacity').extension('capacityType')"
            ]
        },
        {
            "severity": "error",
            "code": "business-rule",
            "diagnostics": "Les valeurs du nouvel objet ne correspondent pas à un indicateur valide : capacityStatus: 02 / temporalityCapacity: 01 / genderCapacityAvailable: 03 / capacityClosingType: null / additionalBedType: null / crisisType: null / temporaryAssignement: 01",
            "expression": [
                "Location.extension('https://interop.esante.gouv.fr/ig/fhir/ror/StructureDefinition/ror-location-supported-capacity')"
            ]
        },
        {
            "severity": "error",
            "code": "business-rule",
            "diagnostics": "Les critères du FhirPath ne correspondent pas à un indicateur valide : capacityStatus: 02 / temporalityCapacity: 01 / genderCapacityAvailable: 03 / capacityClosingType: null / additionalBedType: null / crisisType: null / temporaryAssignement: 01"
        }
    ]
}
```

Il convient de remonter l'erreur au GRADeS et à l'établissement car le GRADeS doit d'être informé de tout disfonctionnement entrainant une donnée non synchronisée.
