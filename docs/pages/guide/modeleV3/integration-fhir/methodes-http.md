---
layout: menu-guide
section: guide
title: Méthodes HTTP et codes d'erreur
subTitle: Intégration FHIR
---

FHIR est un standard qui s'appuie sur les principes REST : chaque ressource est accessible via une URL dédiée (`[BASE]/[Ressource]/[id]`) et manipulée à l'aide des méthodes HTTP standards. L'API FHIR du ROR n'introduit pas de méthode ou de code retour propriétaire : elle respecte le [modèle RESTful de la spécification FHIR](https://hl7.org/fhir/R4/http.html){:target="_blank"}.

### Méthodes HTTP

<div class="wysiwyg" markdown="1">

| Méthode | Usage | Exemple |
| --- | --- | --- |
| `GET` | Recherche et lecture d'une ressource (avec ou sans critères). | [Recherche et consultation de l'offre]({{ '/pages/guide/modeleV3/exemples/consultation-donnees-capacitaires.html' | relative_url }}) |
| `POST` | Création d'une nouvelle ressource. | [Saisie de l'offre]({{ '/pages/guide/modeleV3/exemples/saisie-offre.html' | relative_url }}) |
| `PATCH` | Mise à jour partielle d'une ressource existante (seuls les éléments transmis sont modifiés). | [Mise à jour de l'offre]({{ '/pages/guide/modeleV3/exemples/mise-a-jour-offre.html' | relative_url }}) |
| `PUT` | Remplacement complet d'une ressource existante par la représentation transmise. | [Modèles de saisie]({{ '/pages/guide/modeleV3/exemples/modeles-de-saisie.html' | relative_url }}) |

</div>

Les méthodes HTTP effectivement supportées, ainsi que le détail des paramètres de requête, sont précisés ressource par ressource sur la page [Ressources FHIR]({{ '/pages/guide/modeleV3/resources/practitioner.html' | relative_url }}) (section « Caractéristiques techniques » de chaque ressource).

### Codes de retour HTTP

Comme le prévoit la spécification FHIR, chaque réponse de l'API porte un code de statut HTTP standard permettant de déterminer si la requête a réussi ou échoué, sans avoir à analyser le corps de la réponse.

<div class="wysiwyg" markdown="1">

| Code | Signification | Cas d'usage typique |
| --- | --- | --- |
| `200 OK` | La requête a réussi. | Réponse à un `GET` (recherche, lecture) ou à un `PATCH`/`PUT` de mise à jour. |
| `201 Created` | La ressource a été créée avec succès. | Réponse à un `POST` de création. |
| `4XX` | La requête est en erreur du fait du client (paramètre invalide, ressource inexistante, absence ou invalidité du jeton d'accès, droits insuffisants, etc.). | Réponse à toute méthode. |
| `5XX` | La requête est en erreur du fait du serveur. | Réponse à toute méthode. |

</div>

En cas d'erreur (codes `4XX` ou `5XX`), le corps de la réponse contient une ressource [OperationOutcome](https://hl7.org/fhir/R4/operationoutcome.html){:target="_blank"} qui détaille la raison de l'échec.

<blockquote class="stu-note">
<p>
Un échec de la requête (le serveur ne peut pas la traiter) est différent d'une recherche sans résultat : dans ce second cas, le serveur répond normalement avec un code <code>200 OK</code> et un <code>Bundle</code> dont le nombre d'entrées est nul. Plus de précisions sur la <a href="https://hl7.org/fhir/R4/http.html" target="_blank">spécification FHIR</a>.
</p>
</blockquote>
