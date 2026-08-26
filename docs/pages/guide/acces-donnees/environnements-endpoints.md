---
layout: menu-guide
section: guide
title: Environnements et endpoints
subTitle: Modalités d'accès aux données
---

Deux environnements sont mis à disposition des éditeurs consommant l'API FHIR du ROR National : le **bac-à-sable**, pour les tests, puis la **production**.

## Le bac-à-sable

Nous mettons à disposition pour les éditeurs l'environnement « bac-à-sable » afin de pouvoir tester la consommation des API FHIR du ROR National.

Celui-ci est **synchronisé tous les mois avec la production**, en y appliquant une anonymisation des données sensibles et personnelles.

<div class="wysiwyg" markdown="1">

| Ressource | URL |
| --- | --- |
| Endpoint pour récupérer l'`access_token` | `{{ site.ror.bas_auth_url }}/auth/realms/ror/protocol/openid-connect/token` |
| Base de l'URL des API FHIR | `{{ site.ror.bas_api_url }}` |

</div>

Dans le cas où le profil d'accès aux données de l'éditeur est différent du profil 0, l'éditeur doit commander un certificat **« IGC-SANTE Test »** du type `ORG / AUTH_CLI`. Le `client_id` est, lui, transmis par l'équipe du ROR lors de l'intégration.

Si l'éditeur est un consommateur profil 0 (accès public), l'équipe du ROR transmet un `client_id` et un `client_secret` ; il n'est pas nécessaire de commander de certificat.

## La production

L'accès à la production est la dernière étape du processus d'intégration.

<div class="wysiwyg" markdown="1">

| Ressource | URL |
| --- | --- |
| Endpoint pour récupérer l'`access_token` | `{{ site.ror.prod_auth_url }}/auth/realms/ror/protocol/openid-connect/token` |
| Base de l'URL des API FHIR | `{{ site.ror.prod_api_url }}` |

</div>

Dans le cas où le profil d'accès aux données de l'éditeur est différent du profil 0, l'éditeur doit commander un certificat **« IGC-SANTE »** du type `ORG / AUTH_CLI`. Le `client_id` est, lui, transmis par l'équipe du ROR lors de l'intégration.

Si l'éditeur est un consommateur profil 0 (accès public), l'équipe du ROR transmet un `client_id` et un `client_secret` ; il n'est pas nécessaire de commander de certificat.

<blockquote class="stu-note">
<p>
Le choix de l'environnement (bac-à-sable vs production) et du type de certificat (IGC-SANTE Test vs IGC-SANTE) dépend uniquement de l'environnement cible. Le mode d'authentification (client_secret vs certificat) dépend, lui, du <a href="{{ '/pages/guide/acces-donnees/vue-ensemble.html#politique-dacces-aux-donnees' | relative_url }}">profil d'accès aux données</a> — voir la page <a href="{{ '/pages/guide/acces-donnees/authentification.html' | relative_url }}">Authentification</a>.
</p>
</blockquote>
