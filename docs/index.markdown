---
layout: home
title: Bienvenue sur la documentation de l'API FHIR du ROR
---

<div class="figure" style="text-align: center;">
    <img src="{{ '/assets/img/pagecontent/ror-logo.png' | relative_url }}" alt="ROR" title="Logo du ROR" style="max-width:320px;width:100%;">
</div>

Le ROR (Répertoire national de l’Offre et des Ressources en santé et accompagnement médico-social) centralise la description de l’offre de Santé des établissements sanitaires (MCO, SSR, PSY), des structures de ville (cabinets libéraux, maisons de santé, centres de santé) ainsi que des établissements et services en charge des personnes âgées en perte d’autonomie et des personnes en situation de handicap. Il centralise également la disponibilité en lits et places.

Vidéo : Qu'est ce que le ROR ? 

Ces informations sont saisies par les structures ou alimentées de façon automatisée par des outils métiers tels que les outils de bed management pour la disponibilité en lits.

Vidéo : Comment fonctionne le ROR ? 

Le ROR alimente les services numériques utilisés par les professionnels de santé. Ainsi, les professionnels peuvent consulter l'offre directement dans leur outil métier et orienter rapidement leurs patients vers le professionnel ou la structure qui répond le mieux à leur besoin. Un nombre croissant de services numériques utilisent ces données.
Positionné comme référentiel unique de description de l'offre, le ROR évolue avec les pratiques professionnelles et modalités de prise en charge des patients. Afin d'assurer un service de diffusion des données à haute disponibilité, évolutif et pérenne,  les ROR régionaux alimentent depuis février 2023 une instance nationale du ROR avec les informations normalisées de description de l'offre. Les services numériques peuvent ainsi accéder à une vision nationale de l'offre de santé via un flux unique.


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

## Les enjeux 
<div class="wysiwyg" markdown="1">
- Réduire le temps passé à rechercher l'offre de santé la plus adaptée au besoin de l'usager
- Diminuer le risque de rupture dans la prise en charge
- Améliorer la coordination entre acteurs du parcours de soins et du parcours de vie
- Optimiser la gestion des crises sanitaires notamment via le partage de disponilité des lits
</div>

## Dans quel cas se connecter au ROR ?
<div class="wysiwyg" markdown="1">
- Si votre service numérique répond à une des finalités suivantes : Orientation, régulation, coordination, pilotage, vous pouvez suivre le parcours éditeurs consommateurs. Ce parcours vous permettra de vous connecter au ROR National afin de consommer les données d’offre de santé.
- Si vous êtes une solution de bed management, vous devez répondre aux deux conditions ci-dessous : 
Avoir pour finalité de renseigner la disponibilité en lits d’un ou plusieurs établissements ; 
Fournir la liste exhaustive des établissements qui fournissent les informations sur la disponibilité en lits au ROR National
</div>


### Exemples de cas d'utilisation

<!-- 
Cas 1 : je récupère l'initialisation complète du ROR national via une extraction $export.
Cas 2 : je récupère les données d'offre via des requêtes FHIR ciblées (plusieurs critères de recherches, moins de 10 000 résultats).
Cas 3 : je récupère les données capacitaires de façon très régulières via un cache dédié.
 -->

<!-- <div class="row">
    <div class="border rounded col p-2 m-1">
        <h3>Cas 1</h3>
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
</div> -->

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
