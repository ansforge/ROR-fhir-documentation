---
layout: menu-guide
section: guide
title: Introduction
subTitle: Démarrage rapide
---

### Le ROR, référentiel de données de description de l'offre de santé

#### Le référentiel ROR

Le Répertoire de l'Offre et des Ressources en santé et accompagnement médico-social ([ROR](https://esante.gouv.fr/produits-services/repertoire-ror)) est le référentiel (au sens gisement de données) de description de l'offre de santé des établissements sanitaires, des établissements et services du médico-social et des structures de ville.

Les acteurs de santé ont convergé sur une vision commune de l'offre de santé. L'offre de santé est définie par une ou plusieurs activités opérationnelles, réalisée(s) dans le cadre d'un mode de prise en charge et pour une patientèle, et par les ressources qui permettent la réalisation de ces activités opérationnelles sur un lieu donné. Ces ressources concernent principalement les équipements spécifiques, les capacités d'accueil et les compétences que l'on souhaite identifier pour cette offre.

<div class="figure" style="text-align: center;">
    <img src="{{ '/assets/img/pagecontent/image5.png' | relative_url }}" alt="ROR Modèle d'exposition v3" title="ROR Modèle d'exposition v3" style="max-width:100%;">
    <p><b>Référentiel ROR</b></p>
</div>

<div class="wysiwyg" markdown="1">

| Bloc | Contenu |
| --- | --- |
| Entité juridique | Identification |
| Entité géographique | Identification, tarifs |
| Organisation interne | Pôles, services, unités fonctionnelles |
| Offre opérationnelle | Activité opérationnelle, actes spécifiques, patientèle, mode de prise en charge, horaires, ... |
| Lieu de réalisation de l'offre | Adresse, ... |
| Capacité d'accueil | Équipement spécifique, ... |
| Situation opérationnelle | Mode d'exercice (salarié/libéral), ... |
| Professionnel | Identifiant, nom, profession, spécialité, ... |

</div>

Le ROR, en tant que référentiel de description de l'offre de santé (au sens gisement de données), a une couverture nationale. Il doit permettre à toute application autorisée de rechercher une offre de santé.

#### Instances des ROR régionaux

Dans les faits, chaque région met en œuvre, alimente et exploite une partie du référentiel limité à une couverture régionale, sans intersection de périmètre entre les régions. Chaque région est maîtresse de la solution technique qu'elle met en œuvre.

Les solutions techniques sont qualifiées de « solution ROR ». Deux solutions ROR sont déployées sur le territoire : ROR IR et ROR IeSS.

L'instance régionale de la solution ROR mise en œuvre dans une région, et alimentée de la description de l'offre de santé de la région, est appelée « ROR régional ».

Chaque ROR régional propose à ses utilisateurs un écran de recherche de l'offre régionale, et permet une recherche d'offre dans les autres régions. Historiquement, cette recherche d'une offre au-delà de la région s'appuie sur des services proposés par chaque ROR régional, et nécessite que chaque instance régionale soit interconnectée avec les instances des 17 autres régions.

#### Instance du ROR national

Dans un contexte de sollicitation croissante des ROR régionaux, la nécessité d'améliorer la qualité du service rendu aux utilisateurs et le vieillissement technologique des solutions logicielles ROR rendent indispensable une évolution des logiciels et de leur architecture. Pour répondre à ce besoin, il a été décidé collectivement en 2020 de construire une solution logicielle ROR unique, avec un stockage centralisé des données (base de données unique) qui remplacera à terme les solutions ROR régionales.

La construction du ROR national est réalisée par étape. Lors des deux premières étapes, le ROR national est alimenté par les ROR régionaux.

La mise en œuvre du ROR national et de son webservice de recherche permet de centraliser la recherche auprès du ROR national en remplacement des différentes instances régionales.

Ce service peut ainsi permettre à une instance régionale de s'appuyer sur le ROR national pour réaliser l'équivalent d'une « recherche inter-ROR », et permet également aux autres systèmes consommateurs des données du ROR de disposer d'un service pour lancer une recherche et obtenir en résultat la description des offres de santé recherchées.

Ce webservice, basé sur le modèle d'exposition V3 au format FHIR, permet aux systèmes consommateurs de réaliser une recherche sur les informations capacitaires en lits/places, sous réserve de disposer des droits d'accès adaptés — voir la section [Modalités d'accès aux données]({{ '/pages/guide/modeleV3/acces-donnees/vue-ensemble.html' | relative_url }}).

### Modélisation

#### Données utilisées pour la modélisation UML

Les attributs de description de l'offre, fournis en résultat d'une recherche, sont décrits dans le document ROR - Modèle d'exposition. Ces attributs sont décrits en utilisant la norme UML et en cohérence avec le Modèle des Objets de Santé (MOS) et les nomenclatures associées (NOS) gérés par l'ANS.

Ces attributs sont associés à des règles de gestion communes qui sont également présentées dans le document ROR - Modèle d'exposition.

#### Nomenclatures

La capacité à échanger de l'information entre les ROR et les systèmes consommateurs repose sur l'interopérabilité sémantique et syntaxique des deux systèmes. On entend par « sémantique » à la fois la signification des mots et le rapport entre le sens des mots (homonymie, synonymie, etc.). Assurer l'interopérabilité des échanges nécessite donc que chacun de ces systèmes puisse interpréter la signification de l'information reçue et utiliser cette information en correspondance sémantique avec ses données locales.

Cet objectif conduit à mettre en œuvre des nomenclatures (terminologies de référence et jeux de valeurs) qui permettent de renseigner les concepts du modèle d'exposition et qui font le lien avec les concepts des modèles des ROR régionaux. Ces nomenclatures d'échange sont précisées dans le document de référence ROR - Modèle d'exposition.

Chaque nomenclature des outils interopérables doit trouver son équivalence dans la nomenclature du concept associé dans le modèle d'exposition.

Les systèmes consommateurs du web service du ROR national doivent pouvoir intégrer les évolutions régulières des nomenclatures (ajout de code, modification de libellé, mise en obsolescence d'un code, réactivation de code).

#### Ressources profilées

Le guide d'implémentation FHIR du ROR profile 5 ressources génériques :

<div class="wysiwyg" markdown="1">

| Titre du profil | Description |
| --- | --- |
| [RORPractitioner]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }}) | Profil créé dans le cadre du ROR pour décrire les données d'identification pérennes d'une personne physique, qui travaille en tant que professionnel |
| [RORPractitionerRole]({{ '/pages/guide/modeleV3/resources/practitioner-role.html' | relative_url }}) | Profil créé dans le cadre du ROR pour décrire les modalités d'exercice opérationnelles du professionnel dans la réalisation de l'offre |
| [ROROrganization]({{ '/pages/guide/modeleV3/resources/organization.html' | relative_url }}) | Profil créé dans le cadre du ROR pour décrire les organismes du domaine sanitaire, médico-social et social immatriculés dans le FINESS et les organisations internes |
| [RORHealthcareService]({{ '/pages/guide/modeleV3/resources/healthcare-service.html' | relative_url }}) | Ressource décrivant les prestations que peut réaliser une structure et qui permettent de répondre au besoin de santé d'une personne |
| [RORLocation]({{ '/pages/guide/modeleV3/resources/location.html' | relative_url }}) | Profil créé dans le cadre du ROR pour décrire l'espace disposant d'un ensemble de ressources pour réaliser une offre |

</div>

Le schéma de correspondance complet entre ces ressources et le modèle d'exposition ROR, ainsi que la vue fonctionnelle détaillée, sont disponibles sur le [guide d'implémentation officiel]({{ site.ror.ig_url }}).

### Documents de référence

<div class="wysiwyg" markdown="1">

| Référence | Version | Descriptif |
| --- | --- | --- |
| [Ref_01] ROR – Modèle d'exposition | 3.0.1 | Description des données communes aux échanges entre les ROR et les SI externes. [Télécharger le document](https://esante.gouv.fr/sites/default/files/media/document/ROR_ME_V3.0.1_ModeleExposition_VFD_20260316.pdf) |
| [Ref_02] ROR – IG | 1.0 | [Guide d'implémentation FHIR du ROR National]({{ site.ror.ig_url }}) |
| [Ref_03] ROR – Mapping FHIR et modèle d'exposition 3.0 | 1.0 | Description du mapping des concepts du modèle d'exposition ROR au format FHIR. Voir le [guide d'implémentation officiel]({{ site.ror.ig_url }}) |
| [Ref_04] Politique d'accès | 3.0 | [Annexe « Politique d'accès » de la doctrine d'urbanisation](https://industriels.esante.gouv.fr/sites/default/files/media/document/ROR%20Politique%20d%27acc%C3%A8s%20aux%20donn%C3%A9es_ME3.0_VFD.pdf) — voir aussi [Modalités d'accès aux données]({{ '/pages/guide/modeleV3/acces-donnees/vue-ensemble.html' | relative_url }}) |
| [Ref_05] Annexe sources de données personnes et structures | 1.5 | [esante.gouv.fr/annexe-sources-des-donnees-personnes-et-structures](https://esante.gouv.fr/annexe-sources-des-donnees-personnes-et-structures) |

</div>

Pour plus d'information sur les versions du guide d'implémentation, consultez le [changelog]({{ '/pages/changelog/changelog.html' | relative_url }}). Si vous avez des questions ou des suggestions concernant ce guide, vous pouvez les adresser [ici](https://github.com/ansforge/IG-fhir-repertoire-offre-ressources-sante/issues/new/choose).

<blockquote class="stu-note">
<p>
Dans ce guide, certains éléments peuvent être signalés comme <code><span style="color: #E67E22;">deprecated</span></code> (bientôt retiré de la solution ROR National), <code><span style="color: #ff0000;">draft</span></code> (en cours d'implémentation, pas encore disponible) ou <code><span style="color: #8E44AD;">under consideration</span></code> (à l'étude pour une prochaine version). Les éléments sans mention particulière sont implémentés et disponibles dans la version courante de la solution ROR National.
</p>
</blockquote>
