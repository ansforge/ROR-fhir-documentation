---
layout: menu-guide
section: guide
title: Exemple cURL complet
subTitle: Modalités d'accès aux données
---

Les exemples suivants pointent sur l'environnement **bac-à-sable**. Les éléments entre doubles-accolades ({% raw %}`{{...}}`{% endraw %}) sont les éléments variables, propres à votre intégration.

## Récupération de l'access_token pour un profil 0 d'accès aux données (OAuth2)

{% raw %}
```bash
curl --location 'https://bas-auth-api.qualif.ror.esante.gouv.fr/auth/realms/ror/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id={{client_id}}' \
--data-urlencode 'client_secret={{client_secret}}' \
--data-urlencode 'grant_type=client_credentials'
```
{% endraw %}

## Récupération de l'access_token pour les autres profils (OAuth2 avec mTLS)

{% raw %}
```bash
curl --location 'https://bas-auth-api.qualif.ror.esante.gouv.fr/auth/realms/ror/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id={{client_id}}' \
--data-urlencode 'grant_type=client_credentials' \
--cert ./{{mon_certificat}}.pem \
--key ./{{ma_cle_privee}}.key \
--cacert ./{{certificat_organisation_igc_sante_test}}.pem
```
{% endraw %}

### Conversion d'un certificat .p12

Pour convertir votre certificat `.p12` « IGC-SANTE test » (bac-à-sable) ou « IGC-SANTE » (production) :

{% raw %}
```bash
openssl pkcs12 -in mycert.p12 -out {{mon_certificat}}.pem -clcerts -nokeys
openssl pkcs12 -in mycert.p12 -out {{ma_cle_privee}}.key -nocerts -nodes
```
{% endraw %}

### Certificats racines IGC-Santé

Pour intégrer les certificats racines d'« IGC-SANTE test » (bac-à-sable) ou d'« IGC-SANTE » (production), ajoutez les certificats **Élémentaire**, **Racine** et **Organisation** d'IGC-SANTE dans l'équivalent d'un truststore :

<div class="wysiwyg" markdown="1">
1. Conversion des `.cer` téléchargés sur [igc-sante.esante.gouv.fr/PC%20TEST/](http://igc-sante.esante.gouv.fr/PC%20TEST/) (bac-à-sable) ou [igc-sante.esante.gouv.fr/PC/](http://igc-sante.esante.gouv.fr/PC/) (production) en `.pem` :
   ```bash
   openssl x509 -inform der -in certificate.cer -out certificate.pem
   ```
2. Concaténation en un seul fichier :
   ```bash
   cat first_cert.pem second_cert.pem > combined_cert.pem
   ```
</div>

## Requête sur l'API FHIR HealthcareService

{% raw %}
```bash
curl --location 'https://bas-api-fhir.qualif.ror.esante.gouv.fr/ws-diffusion-fhir/HealthcareService?organization.identifier%3Aabove=1290004324&_include=HealthcareService%3Alocation&_revinclude=PractitionerRole%3Aservice&_include=PractitionerRole%3Apractitioner&_include=HealthcareService%3Aorganization&_include%3Aiterate=Organization%3Apartof' \
--header 'Authorization: Bearer {{access_token}}' \
--header 'Ror-Role-Metier-Code: AUTOMATE' \
--header 'Ror-Role-Metier-System: 1.2.250.1.213.1.1.4.6' \
--header 'Ror-Profil-Utilisateur-Code: CU20' \
--header 'Ror-Profil-Utilisateur-System: 1.2.250.1.213.1.6.1.66' \
--header 'Accept: application/json'
```
{% endraw %}

<blockquote class="stu-note">
<p>
Pour un usage en production, remplacez les hôtes <code>bas-auth-api.qualif.ror.esante.gouv.fr</code> et <code>bas-api-fhir.qualif.ror.esante.gouv.fr</code> par <code>auth-api.ror.esante.gouv.fr</code> et <code>api-fhir.ror.esante.gouv.fr</code> — voir <a href="{{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}">Environnements et endpoints</a>.
</p>
</blockquote>
