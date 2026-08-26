---
layout: home
title: Bienvenue sur la documentation de l'API FHIR du ROR
---

<div class="figure" style="text-align: center;">
    <img src="{{ '/assets/img/pagecontent/ror-logo.png' | relative_url }}" alt="ROR" title="Logo du ROR" style="max-width:320px;width:100%;">
</div>

Le Répertoire national de l'Offre et des Ressources en santé et accompagnement médico-social ([ROR](https://esante.gouv.fr/produits-services/repertoire-ror)) est le référentiel de description de l'offre de santé des établissements sanitaires, des établissements et services du médico-social et des structures de ville.

L'API FHIR du ROR National, basée sur le modèle d'exposition ROR 3.0, permet à toute application autorisée de rechercher une offre de santé et ses capacités (disponibilités, équipements, etc.), sous réserve de disposer des droits d'accès adaptés.

Cette documentation rassemble le guide de prise en main de l'API, les modalités d'accès aux données (profils d'accès, environnements, authentification), la description des ressources FHIR profilées, ainsi que les spécifications fonctionnelles et techniques détaillées.

<div style="display: flex; justify-content: space-around;" class="m-5">
<div markdown="1">
[Modalités d'accès aux données](pages/guide/acces-donnees/vue-ensemble.html){:class="btn  btn--style1"}
</div>
<div markdown="1">
[Démarrage rapide](pages/guide/getting-started/introduction.html){:class="btn  btn--style1"}
</div>
</div>

<br />

## À quoi sert l'API ?

En intégrant l'API FHIR du ROR dans votre système d'information, vous pouvez réaliser les recherches suivantes :
<div class="wysiwyg" markdown="1">
- Rechercher une offre de santé (activité opérationnelle, mode de prise en charge, patientèle) sur l'ensemble du territoire national
- Consulter les données capacitaires (lits, places, disponibilités) d'une offre
- Rechercher les professionnels et structures liés à une offre
- Filtrer et paginer les résultats, effectuer une recherche « full text »
</div>

### Exemples de cas d'utilisation

<div class="row">
    <div class="border rounded col p-2 m-1">
        <h3>Pour les structures de santé</h3>
        <hr aria-hidden="true">
        <div>
            <ul>
                <li>Synchroniser un annuaire local avec l'offre de santé décrite dans le ROR</li>
                <li>Consulter les capacités d'accueil (lits/places) opérationnelles d'un établissement</li>
                <li>Retrouver les professionnels rattachés à une offre opérationnelle</li>
            </ul>
        </div>
    </div>
    <div class="border rounded col p-2 m-1">
        <h3>Pour les porteurs de projets nationaux et régionaux</h3>
        <hr aria-hidden="true">
        <div>
            <ul>
                <li>Alimenter les couloirs du Ségur du Numérique en Santé</li>
                <li>Mettre en œuvre une messagerie sécurisée (BAL MSSanté) à partir de l'offre du ROR</li>
                <li>Consulter des indicateurs de pilotage sur la couverture de l'offre</li>
            </ul>
        </div>
    </div>
    <div class="border rounded col p-2 m-1">
        <h3>Pour les industriels et éditeurs</h3>
        <hr aria-hidden="true">
        <div>
            <ul>
                <li>Intégrer l'API FHIR du ROR selon leur profil d'accès aux données (0 à 5)</li>
                <li>Tester leur intégration sur l'environnement « bac-à-sable » avant la mise en production</li>
                <li>Contribuer à la mise à jour de l'offre (saisie, signalement d'anomalie)</li>
            </ul>
        </div>
    </div>
</div>

&nbsp;

## Aller plus loin

<div class="row">
    <div class="col col-12 col-md-3">
        <span class="doc-section-title"><a href="./pages/guide/getting-started/introduction.html">Guide : </a></span>
        Découvrez le ROR National, sa modélisation et son API FHIR.
    </div>
    <div class="col col-12 col-md-3">
        <span class="doc-section-title"><a href="./pages/guide/acces-donnees/vue-ensemble.html">Modalités d'accès : </a></span>
        Profils d'accès, environnements, authentification OAuth2/mTLS et headers requis.
    </div>
    <div class="col col-12 col-md-3">
        <span class="doc-section-title"><a href="./pages/guide/scenarios/consultation-donnees-capacitaires.html">Scénarios : </a></span>
        Scénarios détaillés de recherche, d'extraction, de saisie et de mise à jour de l'offre.
    </div>
    <div class="col col-12 col-md-3">
        <span class="doc-section-title"><a href="https://interop.esante.gouv.fr/ig/fhir/ror" target="_blank">IG (Implementation Guide) : </a></span>
        Découvrez le modèle FHIR complet du ROR au travers du guide d'implémentation officiel.
    </div>
</div>
