---
layout: home
title: Bienvenue sur la documentation de l'API FHIR du ROR
---

<div class="figure" style="text-align: center;">
    <img src="{{ '/assets/img/pagecontent/ror-logo.png' | relative_url }}" alt="ROR" title="Logo du ROR" style="max-width:320px;width:100%;">
</div>

Le ROR (Répertoire national de l’Offre et des Ressources en santé et accompagnement médico-social) centralise la description de l’offre de Santé des établissements sanitaires (MCO, SSR, PSY), des structures de ville (cabinets libéraux, maisons de santé, centres de santé) ainsi que des établissements et services en charge des personnes âgées en perte d’autonomie et des personnes en situation de handicap. Il centralise également la disponibilité en lits et places.

Cette documentation rassemble le guide de prise en main de l'API FHIR, les modalités d'accès aux données (profils d'accès, environnements, authentification), ainsi que de nombreux exemples.

<br />

## Les enjeux du ROR

<div class="wysiwyg" markdown="1">
- Réduire le temps passé à rechercher l'offre de santé la plus adaptée au besoin de l'usager
- Diminuer le risque de rupture dans la prise en charge
- Améliorer la coordination entre acteurs du parcours de soins et du parcours de vie
- Optimiser la gestion des crises sanitaires notamment via le partage de disponilité des lits
</div>

<br />

## Dans quel cas se connecter au ROR ?

<div class="wysiwyg" markdown="1">
- Si votre service numérique répond à une des finalités suivantes : Orientation, régulation, coordination, pilotage, vous pouvez suivre le parcours éditeurs consommateurs. Ce parcours vous permettra de vous connecter au ROR National afin de consommer les données d’offre de santé.
- Si vous êtes une solution de bed management, vous devez répondre aux deux conditions ci-dessous : 
Avoir pour finalité de renseigner la disponibilité en lits d’un ou plusieurs établissements ; 
Fournir la liste exhaustive des établissements qui fournissent les informations sur la disponibilité en lits au ROR National
</div>

<br />

## Le parcours G_NIUS

Vous parcourez [G_NIUS pour réussir ma connexion ROR](https://gnius.esante.gouv.fr/fr/reussir-votre-connexion-au-ror-national) pour savoir si vous êtes un consommateur ou un fournisseur du ROR national et pour lancer les démarches pour obtenir vos accès.

<div style="display: flex; justify-content: space-around;" class="m-5">
<div markdown="1">
[parcours G_NIUS ](https://gnius.esante.gouv.fr/fr/reussir-votre-connexion-au-ror-national){:class="btn  btn--style1"}
</div>
</div>

<br />

## Vous savez si vous êtes un consommateur ou un fournisseur du ROR national

<div class="row" markdown="1">

<div class="border rounded col p-2 m-1" markdown="1">
### Je suis un consommateur
<hr aria-hidden="true">

<div style="display: flex; justify-content: space-around;" class="m-5" markdown="1">
[Démarrer](pages/guide/modeleV3/acces-donnees/vue-ensemble.html){:class="btn  btn--style1"}
</div>
</div>

<div class="border rounded col p-2 m-1" markdown="1">
### Je suis un fournisseur
<hr aria-hidden="true">

<div style="display: flex; justify-content: space-around;" class="m-5" markdown="1">
[Démarrer](todo){:class="btn  btn--style1"}
</div>
</div>

</div>

<br />
<div style="display: flex; justify-content: space-around;" class="m-5">
<div markdown="1">
[API FHIR du Modèle d'Exposition V3](pages/guide/modeleV3/acces-donnees/vue-ensemble.html){:class="btn  btn--style1"}
</div>
<!-- <div markdown="1">
[API FHIR du Modèle d'Exposition V4](pages/guide/modeleV3/acces-donnees/vue-ensemble.html){:class="btn  btn--style1"}
</div> -->
</div>

<br />

## Pour aller plus loin

<div class="row">
    <div class="col col-12 col-md-3">
        <span class="doc-section-title"><a href="./pages/guide/modeleV3/acces-donnees/vue-ensemble.html">Guide : </a></span>
        Découvrez le ROR National, sa modélisation et son API FHIR.
    </div>
    <div class="col col-12 col-md-3">
        <span class="doc-section-title"><a href="./pages/guide/modeleV3/acces-donnees/vue-ensemble.html">Modalités d'accès : </a></span>
        Profils d'accès, environnements, authentification OAuth2/mTLS et headers requis.
    </div>
    <div class="col col-12 col-md-3">
        <span class="doc-section-title"><a href="./pages/guide/modeleV3/exemples/consultation-donnees-capacitaires.html">Scénarios : </a></span>
        Scénarios détaillés de recherche, d'extraction, de saisie et de mise à jour de l'offre.
    </div>
    <div class="col col-12 col-md-3">
        <span class="doc-section-title"><a href="https://interop.esante.gouv.fr/ig/fhir/ror" target="_blank">IG (Implementation Guide) : </a></span>
        Découvrez le modèle FHIR complet du ROR au travers du guide d'implémentation officiel.
    </div>
</div>
