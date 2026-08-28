---
layout: menu-guide
section: guide
title: Consommation des API FHIR
subTitle: Modalités d'accès aux données
---

## Les 4 headers « Ror-… » uniquement pour les requêtes GET des ressources Organization, HealthcareService, Location, Practitioner, PractitionerRole

Pour consommer l'une des API FHIR des ressources `Organization`, `HealthcareService`, `Location`, `Practitioner`, `PractitionerRole` avec la méthode `GET`, en plus de joindre le header `Authorization` contenant l'`access_token`, **4 headers supplémentaires doivent être présents** :

<div class="wysiwyg" markdown="1">
- **Profil de l'utilisateur** dans l'application, correspond à sa fonction au sein d'une organisation (ex : gestionnaire de cas) :
  - `Ror-Profil-Utilisateur-Code` (exemple de valeur : `CU22`)
  - `Ror-Profil-Utilisateur-System` (exemple de valeur : `1.2.250.1.213.1.6.1.66`)
- **Métier de l'utilisateur**, correspond à la profession ou spécialité qu'il exerce dans un domaine professionnel (ex : infirmier) :
  - `Ror-Role-Metier-Code` (exemple de valeur : `AUTOMATE`)
  - `Ror-Role-Metier-System` (exemple de valeur : `1.2.250.1.213.1.1.4.6`)
</div>

Les valeurs de ces 4 headers sont transmises à l'éditeur en même temps que le `client_id`, lors de son intégration au cercle de confiance.

A noter, **ces 4 headers ne sont pas nécessaires pour les autres méthodes `PUT`, `POST` et `PATCH`**, seul le header `Authorization` reste, bien entendu, indispensable.

Elles ne sont pas nécessaires pour les méthodes GET des ressources autres que celles-ci listées au début de cette section.

## Description des API FHIR

De nombreux exemples sont disponibles dans la section [Ressources]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }})

Par exemple, pour consulter une offre, remplacer `[BASE]` par la base de l'URL des API FHIR décrite sur la page [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}) :

```
GET [BASE]/HealthcareService?_filter=(_lastUpdated ge 2022-11-06T15:00 or organization._lastUpdated:above ge 2022-11-06T15:00)
    #critère de recherche sur la date de mise à jour
  &_include=HealthcareService:organization
    #inclus les Organization référencées par HealthcareService
  &_include:iterate=Organization:partof
    #inclus TOUTES (iterate) les Organization liées aux Organization référencées par HealthcareService
  &_include=HealthcareService:location
    #inclus les Location référencées par HealthcareService
  &_revinclude=PractitionerRole:service
    #inclus les PractitionerRole qui référencent le HealthcareService
  &_include=PractitionerRole:practitioner
    #inclus les Practitioner référencés par PractitionerRole
```

Voir la page [Exemple cURL complet]({{ '/pages/guide/modeleV3/acces-donnees/exemple-curl.html' | relative_url }}) pour un exemple exécutable de bout en bout (authentification + requête).
