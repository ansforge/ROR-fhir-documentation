---
layout: menu-guide
section: guide
title: $export
subTitle: Méthodes FHIR
---

Pour les consommateurs des API FHIR hébergeant une base de données synchronisée avec les données nationales ou d'une région, 2 scénarios de synchronisation sont possibles:

- effectuer un appel à $export quotidien
- effectuer un appel à $export hebdomadaire et des appels delta chaque jour (ou plusieurs fois par jour), voir l'exemple [Rechercher par date de mise à jour]({{ '/pages/guide/modeleV3/get/healthcare-service.html#2-rechercher-par-date-de-mise-à-jour-_lastupdated' | relative_url }})

Il est important d'avoir **à minima une synchronisation complète par semaine**. Les systèmes se basant uniquement sur des deltas et n'effectuant des synchronisations complètes que sporadiquement subissent un phénomène de divergence progressive avec la base référentiel génératrice de frustration et d'incompréhension.

Cette page décrit l'opération asynchrone `$export`, qui permet à un consommateur de réaliser une extraction complète à partir de l'API  `HealthcareService`.

Deux scénarios sont décrits:
- extraction de la france entière
- extration d'une région


Deux implémentations Python sont fournis à la fin de cette page, l'un pour les profil0 (avec clientsecret) et l'autre pour les autres profils (avec certificat).

#### Extraction complète de l'offre nationale <code><span style="color: #ff0000;">draft</span></code>

<p style="background-color: #ffcccc; border:1px solid grey; padding: 5px; max-width: 790px;">
<b>Note importante :</b> Cette fonctionnalité est implémentée dans la version actuelle du ROR elle ne respecte pas strictement les points suivants de la spécification du bulkdata <a href="https://hl7.org/fhir/uv/bulkdata/export.html" target="_blank">https://hl7.org/fhir/uv/bulkdata/export.html</a> :<br>
- le paramètre <code>_outputFormat</code> ne supporte pas <code>application/fhir+ndjson</code>, les valeurs possibles sont <code>application/fhir+json</code> ou <code>application/json</code><br>
- le header <code>'Prefer: respond-async'</code> n'est pas obligatoire<br>
- que le paramètre <code>includeAssociatedData=_myCompleteExtract</code> soit présent ou non, l'export retourne toujours l'ensemble complet des ressources FHIR en lien avec la ressource HealthcareService
</p>

**Description du scénario :** Un consommateur souhaite mettre à jour toutes les offres de santé sur le périmètre national de manière asynchrone (pour une question de performance et de volumétrie). Il réalise donc une extraction complète de l'offre nationale. Pour réaliser cette opération, nous utilisons l'opération FHIR bulk data export : <https://hl7.org/fhir/uv/bulkdata/STU2/export.html>

<blockquote class="stu-note">
<p>
Dans le header il est nécessaire de préciser <code>Prefer: respond-async</code>. Plus d'information ici : <a href="http://hl7.org/fhir/R4/async.html" target="_blank">http://hl7.org/fhir/R4/async.html</a>.
</p>
</blockquote>

**Requête expliquée :**

```sh
GET [BASE]/$export? #utilisation de l'operation export. Plus d'information ici : <http://hl7.org/fhir/uv/bulkdata/STU2/export.html#endpoint---system-level-export>
_outputFormat=application/fhir+ndjson #précise le format de sortie attendu. Plus d'information sur le format ici : <http://ndjson.org/>
&_type=HealthcareService #précise le type de ressources 
&includeAssociatedData=_myCompleteExtract #un serveur prenant en charge ce paramètre DOIT renvoyer ou omettre un ensemble prédéfini de ressources FHIR associées à la demande. La valeur _myCompleteExtract correspond à une valeur personnalisée précédée d'un underscore et pris en charge par le serveur. Plus d'information ici : <http://hl7.org/fhir/uv/bulkdata/STU2/export.html#query-parameters>
```

**Réponse :** En réponse, dans le header, le lien de suivi de la demande sera disponible dans `Content-Location`, par exemple `[BASE]/$export-poll-status?_jobId=990789c0-f170-400f-97dd-ed2ac6fd22dc`. Il convient ensuite d'interroger cette url jusqu'à obtention de la liste des fichiers d'export (un par tranche de résultats), puis de télécharger chacun d'entre eux. Plus d'information ici : <http://hl7.org/fhir/R4/async.html#3.1.6.4>

#### Extraction complète asynchrone par région 

<p style="background-color: #ffcccc; border:1px solid grey; padding: 5px; max-width: 790px;">
<b>Note importante :</b> Cette fonctionnalité est implémentée dans la version actuelle du ROR elle ne respecte pas strictement les points suivants de la spécification du bulkdata <a href="https://hl7.org/fhir/uv/bulkdata/export.html" target="_blank">https://hl7.org/fhir/uv/bulkdata/export.html</a> :<br>
- le paramètre <code>_outputFormat</code> ne supporte pas <code>application/fhir+ndjson</code>, les valeurs possibles sont <code>application/fhir+json</code> ou <code>application/json</code><br>
- le header <code>'Prefer: respond-async'</code> n'est pas obligatoire<br>
- que le paramètre <code>includeAssociatedData=_myCompleteExtract</code> soit présent ou non, l'export retourne toujours l'ensemble prédéfini des ressources FHIR définies
</p>

**Description du scénario :** Un consommateur souhaite mettre à jour toutes les offres de santé sur un périmètre régional de manière asynchrone (pour une question de performance et de volumétrie). Il réalise donc une extraction complète de l'offre régionale. Pour réaliser cette opération, nous utilisons l'opération FHIR bulk data export : <https://hl7.org/fhir/uv/bulkdata/STU2/export.html>

<blockquote class="stu-note">
<p>
Dans le header il est nécessaire de préciser <code>Prefer: respond-async</code>. Plus d'information ici : <a href="http://hl7.org/fhir/R4/async.html" target="_blank">http://hl7.org/fhir/R4/async.html</a>.
</p>
</blockquote>

**Requête expliquée :**

```sh
GET [BASE]/$export? #utilisation de l'operation export. Plus d'information ici : <http://hl7.org/fhir/uv/bulkdata/STU2/export.html#endpoint---system-level-export>
_outputFormat=application/fhir+ndjson #précise le format de sortie attendu. Plus d'information sur le format ici : <http://ndjson.org/>
&_type=HealthcareService #précise le type de ressources 
&_typeFilter=HealthcareService%3F_tag%3Dhttps%3A%2F%2Fmos.esante.gouv.fr%2FNOS%2FTRE_R30-RegionOM%2FFHIR%2FTRE-R30-RegionOM%7C11 #utilisation de filtre pour cibler le code Région. Ici 11 correspond au code de l'Ile de France, pour plus d'explication sur la construction de la requête : <http://hl7.org/fhir/uv/bulkdata/STU2/export.html#example-request>
&includeAssociatedData=_myCompleteExtract #un serveur prenant en charge ce paramètre DOIT renvoyer ou omettre un ensemble prédéfini de ressources FHIR associées à la demande. La valeur _myCompleteExtract correspond à une valeur personnalisée précédée d'un underscore et pris en charge par le serveur. Plus d'information ici : <http://hl7.org/fhir/uv/bulkdata/STU2/export.html#query-parameters>
```

**Réponse :** En réponse, dans le header, le lien de suivi de la demande sera disponible dans `Content-Location`, par exemple `[BASE]/$export-poll-status?_jobId=990789c0-f170-400f-97dd-ed2ac6fd22dc`. Il convient ensuite d'interroger cette url jusqu'à obtention de la liste des fichiers d'export (un par tranche de résultats), puis de télécharger chacun d'entre eux. Plus d'information ici : <http://hl7.org/fhir/R4/async.html#3.1.6.4>

### Exemples de code Python

Les deux exemples ci-dessous illustrent l'enchaînement complet (authentification, demande d'export, suivi de la demande, téléchargement des fichiers), selon le profil d'accès utilisé (voir la page [Authentification]({{ '/pages/guide/modeleV3/acces-donnees/authentification.html' | relative_url }})) :

* le premier utilise le profil 0 (OAuth2 `client_credentials` avec `client_secret`, sans mTLS) ;
* le second utilise les profils 1 à 4 (OAuth2 avec authentification mTLS par certificat client).

Il est nécessaire d'insérer le certificat racine d'IGC SANTE test [comme expliqué ici]({{ '/pages/guide/modeleV3/acces-donnees/exemple-curl.html#certificats-racines-igc-santé' | relative_url }})

<blockquote class="stu-note">
<p>
Remplacez les valeurs <code>client_id</code>, <code>client_secret</code> et les chemins des certificats par les vôtres. Ces exemples ciblent l'environnement bac-à-sable (voir la page <a href="{{ '/pages/guide/modeleV3/acces-donnees/environnements-endpoints.html' | relative_url }}">Environnements et endpoints</a>).
</p>
</blockquote>

#### Profil 0 : `client_credentials` avec `client_secret`

<div class="code-sample"><div class="tab-content" data-name="python">
{% highlight python %}
import requests
import jwt
from datetime import datetime, timedelta
import json
import sys


#####  Paramètres généraux #########
####################################

# endpoint access_token
token_url = 'https://bas-auth-api.qualif.ror.esante.gouv.fr/auth/realms/ror/protocol/openid-connect/token'
# client_id / client_secret fournis par l'ANS pour votre application
client_id = 'votre-client-id'
client_secret = 'votre-client-secret'

# requête initiale
request_first = 'https://bas-api-fhir.qualif.ror.esante.gouv.fr/ws-diffusion-fhir/$export?_outputFormat=application/fhir+json&_type=HealthcareService&includeAssociatedData=_myCompleteExtract'

# certificat racine IGC SANTE ou IGC SANTE Test en fonction de l'environnement ciblé
# http://igc-sante.esante.gouv.fr/PC/ ou http://igc-sante.esante.gouv.fr/PC%20TEST/
# openssl x509 -inform der -in ACR-EL.cer -out ca_root_igc.pem
# openssl x509 -inform der -in ACR-EL-TEST.cer -out ca_root_igc_test.pem
ca_bundle = 'ca_root_igc_test.pem'

##########################################################

# headers pour toutes les requêtes vers le ROR
rorHeaders = {
    'Ror-Profil-Utilisateur-Code': 'CU23',
    'Ror-Profil-Utilisateur-System': '1.2.250.1.213.1.6.1.66',
    'Ror-Role-Metier-Code': 'AUTOMATE',
    'Ror-Role-Metier-System': '1.2.250.1.213.1.1.4.6',
    'Prefer': 'respond-async',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + 'notYetDefined'
}


########################################################
####                  FONCTIONS                     ####
########################################################

# demande d'un token d'accès auprès du serveur d'autorisation
def tokenRequest():
    token_response = requests.post(
        token_url,
        data=token_params,
        verify=ca_bundle)

    if token_response.status_code == 200:
        access_token = token_response.json().get('access_token')
        print('Token d\'accès obtenu avec succès')
    else:
        print(f'Erreur lors de la demande du token: {token_response.status_code} - {token_response.text}')
        sys.exit("EXIT: demande de token KO!")
    return access_token


# indique si le token expire dans moins de 10s, et doit donc être renouvelé
def is_token_expired(token):
    decoded_token = jwt.decode(token, options={'verify_signature': False})
    expiration_timestamp = decoded_token.get('exp')
    if expiration_timestamp:
        current_timestamp_10s = datetime.now() + timedelta(seconds=10)
        return int(current_timestamp_10s.timestamp()) >= expiration_timestamp
    else:
        print('Erreur lors de la vérification de la date d expiration du token')
        sys.exit("EXIT: impossible de savoir si le token est expiré!")


# téléchargement d'un fichier d'export du ROR
def download_file_url(url):
    global access_token
    if is_token_expired(access_token):
        print('!!! demande d un nouveau token !!!!')
        access_token = tokenRequest()
        rorHeaders["Authorization"] = f"Bearer {access_token}"
    response = requests.get(url, headers=rorHeaders, verify=ca_bundle)
    if response.status_code == 200:
        name = url[url.rfind('/') + 1:len(url) - 5]
        print(name)
        data = response.text
        fichier = open(name + '.json', 'w', encoding='utf-8', newline='\r\n')
        fichier.write(data)
        fichier.close()
    else:
        print('KO : ' + url)
        print('httpCode: ' + str(response.status_code))
        sys.exit("EXIT ON ERROR")

########################################################
####               PROGRAMME                        ####
########################################################

access_token = 'notYetDefined'

token_params = {
    'client_id': client_id,
    'client_secret': client_secret,
    'grant_type': 'client_credentials',
}

# Demande d'un 1er token d'accès
access_token = tokenRequest()
rorHeaders["Authorization"] = f"Bearer {access_token}"
print('headers pour la demande d\'export:')
print(rorHeaders)

# 1ère requête vers le ROR : demande d'export
print("GO: DEMANDE D'EXPORT VIA API FHIR ROR...")
print('1ère requête : \n\t ' + request_first)
response = requests.get(request_first, headers=rorHeaders, verify=ca_bundle)

# 202 : la demande est acceptée et en cours de traitement
if response.status_code != 200 and response.status_code != 202:
    sys.exit("EXIT: KO sur demande d'export status => " + str(response.status_code))

# l'url de suivi ('etat') se trouve dans le header Content-Location de la réponse
url_etat = response.headers.get('Content-Location')
if url_etat is None:
    sys.exit("EXIT: KO pas de header Content-Location sur req status 202")

# 2ème requête : appel de l'url 'etat' de la demande d'export
response = requests.get(url_etat, headers=rorHeaders, verify=ca_bundle)
print('httpCode sur demande de la liste des fichiers: ' + str(response.status_code))

# la réponse contient la liste des urls de téléchargement des fichiers d'export
y = json.loads(response.text)
output_list = y.get('output', [])
i = 0
for entry in output_list:
    i += 1
    print(i)
    download_file_url(entry['url'])

print('nbre de fichiers téléchargés: ' + str(i))
print('    "End successfully      ')
{% endhighlight %}
</div></div>

#### Profils 1 à 4 : authentification mTLS par certificat client

<div class="code-sample"><div class="tab-content" data-name="python">
{% highlight python %}
import requests
import jwt
from datetime import datetime, timedelta
import json
import sys


#####  Paramètres généraux #########
####################################

# endpoint access_token
token_url = 'https://bas-auth-api.qualif.ror.esante.gouv.fr/auth/realms/ror/protocol/openid-connect/token'
# client_id fourni par l'ANS pour votre application
client_id = 'mon-client-id'

# requête initiale (exemple : export filtré sur une région)
request_first = 'https://bas-api-fhir.qualif.ror.esante.gouv.fr/ws-diffusion-fhir/$export?_outputFormat=application/json&_typeFilter=HealthcareService%3F_tag%3Dhttps%3A%2F%2Fmos.esante.gouv.fr%2FNOS%2FTRE_R30-RegionOM%2FFHIR%2FTRE-R30-RegionOM%7C27'

# certificat client pour le mTLS.
# Les fichiers indiqués doivent être dans le répertoire courant.
# clé privée : openssl pkcs12 -in mycert.p12 -out certif.key -nocerts -nodes
# clé publique (crt) : openssl pkcs12 -in mycert.p12 -out certif.pem -clcerts -nokeys
cert = ('certif.pem', 'certif.key')  # clé publique et clé privée du client consommateur issues d'IGC SANTE (ou IGC SANTE Test)

# certificat racine IGC SANTE ou IGC SANTE Test en fonction de l'environnement ciblé
# http://igc-sante.esante.gouv.fr/PC/ ou http://igc-sante.esante.gouv.fr/PC%20TEST/
# openssl x509 -inform der -in ACR-EL.cer -out ca_root_igc.pem
# openssl x509 -inform der -in ACR-EL-TEST.cer -out ca_root_igc_test.pem
ca_bundle = 'ca_root_igc_test.pem'

##########################################################

# headers pour toutes les requêtes vers le ROR
rorHeaders = {
    'Ror-Profil-Utilisateur-Code': 'CU22',
    'Ror-Profil-Utilisateur-System': '1.2.250.1.213.1.6.1.66',
    'Ror-Role-Metier-Code': 'AUTOMATE',
    'Ror-Role-Metier-System': '1.2.250.1.213.1.1.4.6',
    'Prefer': 'respond-async',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + 'notYetDefined'
}


########################################################
####                  FONCTIONS                     ####
########################################################

# demande d'un token d'accès auprès du serveur d'autorisation (liaison mTLS avec ce dernier)
def tokenRequest():
    token_response = requests.post(
        token_url,
        data=token_params,
        cert=cert,
        verify=ca_bundle)

    if token_response.status_code == 200:
        access_token = token_response.json().get('access_token')
        print('Token d\'accès obtenu avec succès')
    else:
        print(f'Erreur lors de la demande du token: {token_response.status_code} - {token_response.text}')
        sys.exit("EXIT: demande de token KO!")
    return access_token


# indique si le token expire dans moins de 10s, et doit donc être renouvelé
def is_token_expired(token):
    decoded_token = jwt.decode(token, options={'verify_signature': False})
    expiration_timestamp = decoded_token.get('exp')
    if expiration_timestamp:
        current_timestamp_10s = datetime.now() + timedelta(seconds=10)
        return int(current_timestamp_10s.timestamp()) >= expiration_timestamp
    else:
        print('Erreur lors de la vérification de la date d expiration du token')
        sys.exit("EXIT: impossible de savoir si le token est expiré!")


# téléchargement d'un fichier d'export du ROR
def download_file_url(url):
    global access_token
    if is_token_expired(access_token):
        print('!!! demande d un nouveau token !!!!')
        access_token = tokenRequest()
        rorHeaders["Authorization"] = f"Bearer {access_token}"
    response = requests.get(url, headers=rorHeaders, cert=cert, verify=ca_bundle)
    if response.status_code == 200:
        name = url[url.rfind('/') + 1:len(url) - 5]
        print(name)
        data = response.text
        fichier = open(name + '.json', 'w', encoding='utf-8', newline='\r\n')
        fichier.write(data)
        fichier.close()
    else:
        print('KO : ' + url)
        print('httpCode: ' + str(response.status_code))
        sys.exit("EXIT ON ERROR")

########################################################
####               PROGRAMME                        ####
########################################################

access_token = 'notYetDefined'

# Modèle mTLS : il n'y a pas de client_secret, l'authentification du client
# se fait par le certificat lors de l'appel au serveur d'autorisation.
token_params = {
    'client_id': client_id,
    'grant_type': 'client_credentials',
}

# Demande d'un 1er token d'accès
access_token = tokenRequest()
rorHeaders["Authorization"] = f"Bearer {access_token}"
print('headers pour la demande d\'export:')
print(rorHeaders)

# 1ère requête vers le ROR : demande d'export
print("GO: DEMANDE D'EXPORT VIA API FHIR ROR...")
print('1ère requête : \n\t ' + request_first)
response = requests.get(request_first, headers=rorHeaders, verify=ca_bundle)

# 202 : la demande est acceptée et en cours de traitement
if response.status_code != 200 and response.status_code != 202:
    sys.exit("EXIT: KO sur demande d'export status => " + str(response.status_code))

# l'url de suivi ('etat') se trouve dans le header Content-Location de la réponse
url_etat = response.headers.get('Content-Location')
if url_etat is None:
    sys.exit("EXIT: KO pas de header Content-Location sur req status 202")

# 2ème requête : appel de l'url 'etat' de la demande d'export
response = requests.get(url_etat, headers=rorHeaders, cert=cert, verify=ca_bundle)
print('httpCode sur demande de la liste des fichiers: ' + str(response.status_code))

# la réponse contient la liste des urls de téléchargement des fichiers d'export
y = json.loads(response.text)
output_list = y.get('output', [])
i = 0
for entry in output_list:
    i += 1
    print(i)
    download_file_url(entry['url'])

print('nbre de fichiers téléchargés: ' + str(i))
print('    "End successfully      ')
{% endhighlight %}
</div></div>
