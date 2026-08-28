---
layout: menu-guide
section: guide
title: Vue d'ensemble
subTitle: Modalités d'accès aux données
---

Cette section décrit la consommation du modèle d'exposition V3.0 du ROR via les API FHIR, c'est-à-dire :

<div class="wysiwyg" markdown="1">
- Les environnements disponibles : le « bac-à-sable » pour les tests, puis la production ;
- L'authentification OAuth2 / mTLS ;
- La consommation des API FHIR.
</div>

## Modélisation des données

Les attributs de description de l'offre, fournis en résultat d'une recherche, sont décrits dans le document [ROR - Modèle d'exposition V3](https://esante.gouv.fr/sites/default/files/media/document/ROR_ME_V3.0.1_ModeleExposition_VFD_20260316.pdf). Ces attributs sont décrits en utilisant la norme UML et en cohérence avec le Modèle des Objets de Santé ([MOS](https://mos.esante.gouv.fr/)) et les nomenclatures associées ([NOS](https://esante.gouv.fr/interoperabilite/mos-nos/nos)) gérés par l'ANS. Ces attributs sont associés à des règles de gestion communes qui sont également présentées dans ce même document.

## Nomenclatures

La capacité à échanger de l'information entre les ROR et les systèmes consommateurs repose sur l'interopérabilité sémantique et syntaxique des deux systèmes. On entend par « sémantique » à la fois la signification des mots et le rapport entre le sens des mots (homonymie, synonymie, etc.). Assurer l'interopérabilité des échanges nécessite donc que chacun de ces systèmes puisse interpréter la signification de l'information reçue et utiliser cette information en correspondance sémantique avec ses données locales.

Cet objectif conduit à mettre en œuvre des nomenclatures (terminologies de référence et jeux de valeurs) qui permettent de renseigner les concepts du modèle d'exposition et qui font le lien avec les concepts des modèles des ROR régionaux. Chaque nomenclature des outils interopérables doit trouver son équivalence dans la nomenclature du concept associé dans le modèle d'exposition.

Les systèmes consommateurs du web service du ROR national doivent pouvoir intégrer les évolutions régulières des nomenclatures (ajout de code, modification de libellé, mise en obsolescence d'un code, réactivation de code).

## Guide d'implémentation FHIR du ROR

Le guide d'implémentation FHIR est disponible sur [interop.esante.gouv.fr/ig/fhir/ror]({{ site.ror.ig_url }}).

## Correspondance des ressources FHIR avec le modèle

<div class="wysiwyg" markdown="1">

| Ressource | Description |
| --- | --- |
| [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}) | Ressource décrivant les prestations que peut réaliser une structure et qui permettent de répondre au besoin de santé d'une personne |
| [RORLocation]({{ '/pages/guide/modeleV3/resources/location.html' | relative_url }}) | Profil créé dans le cadre du ROR pour décrire l'espace disposant d'un ensemble de ressources pour réaliser une offre |
| [ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html' | relative_url }}) | Profil créé dans le cadre du ROR pour décrire les organismes du domaine sanitaire, médico-social et social immatriculés dans le FINESS et les organisations internes |
| [RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }}) | Profil créée dans le cadre du ROR pour décrire les données d'identification pérennes d'une personne physique, qui travaille en tant que professionnel |
| [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}) | Profil créé dans le cadre du ROR pour décrire les modalités d'exercice opérationnelles du professionnel dans la réalisation de l'offre |

</div>

Ces correspondances sont détaillées dans [Ref_03] — voir le [guide d'implémentation officiel]({{ site.ror.ig_url }}).

## Politique d'accès aux données

La politique d'accès aux données est détaillée dans l'annexe [Politique d'accès](https://esante.gouv.fr/sites/default/files/media/document/ROR%20Politique%20d%27acc%C3%A8s%20aux%20donn%C3%A9es_ME3.0_VFD.pdf). Lors du processus d'intégration, un **profil d'accès aux données compris entre 0 et 5** est affecté à l'éditeur :

<div class="wysiwyg" markdown="1">

| Profil | Accès accordé |
| --- | --- |
| **Profil 0** | Accès aux données en libre accès |
| **Profil 1** | Accès à toutes les données |
| **Profil 2** | Accès à toutes les données, hors données en accès très restreint |
| **Profil 3** | Données de l'offre de santé médico-sociale : accès à toutes les données, hors données en accès très restreint. Données de l'offre de santé sanitaire (établissements sanitaires et offre de ville) : accès aux données en libre accès |
| **Profil 4** | Accès à toutes les données sauf les données de contact et les données personnelles |
| **Profil 5** | Accès à toutes les données, hors données en accès très restreint et hors capacitaire et disponibilités en lits et places opérationnels et exceptionnels |

</div>

Le profil d'accès conditionne directement le mode d'authentification à utiliser — voir [Authentification]({{ '/pages/guide/modeleV3/acces-donnees/authentification.html' | relative_url }}) — et les endpoints à utiliser — voir [Environnements et endpoints]({{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}).
