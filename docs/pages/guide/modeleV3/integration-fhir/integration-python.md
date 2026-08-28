---
layout: menu-guide
section: guide
title: Utilisation de Python
subTitle: Intégration FHIR
---

Ce guide décrit comment intégrer l'API FHIR du ROR à un projet Python.

Si vous n'avez pas encore vos identifiants d'accès, consultez la page [Authentification]({{ '/pages/guide/modeleV3/acces-donnees/authentification.html' | relative_url }}).

<blockquote class="stu-note">
<p>
Dans nos différents exemples, nous utilisons pip et la librairie fhir.resources ainsi que requests. FHIR reste une API HTTP JSON/XML qui peut être appelée avec d'autres techniques.
</p>
</blockquote>

### Dépendances Python

Pour l'exemple, le projet est un projet Python utilisant pip pour la gestion des dépendances. Nous utilisons la librairie [fhir.resources](https://pypi.org/project/fhir.resources/){:target="_blank"} qui permet de structurer les données, ainsi que la librairie `requests` pour effectuer les appels HTTP.

Pour utiliser ces librairies, nous allons ajouter les dépendances suivantes dans le fichier `requirements.txt` :

```
fhir.resources==7.1.0
requests==2.31.0
```

&nbsp;

### Configuration du client HTTP FHIR avec fhir.resources

Par rapport à un simple appel HTTP, nous ajoutons le jeton d'accès (`Authorization`) ainsi que les 4 headers `Ror-*` requis par l'API du ROR (voir la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }})), puis nous structurons la réponse à l'aide de `fhir.resources`.

Voici un exemple de cas nominal :
<div class="code-sample"><div class="tab-content" data-name="python">
{% highlight python %}
{% raw %}
import requests
from fhir.resources.fhirtypes import CapabilityStatement

# Configuration du client
base_url = "{{BASE}}"
headers = {
    "Authorization": f"Bearer {{access_token}}",
    "Ror-Profil-Utilisateur-Code": "{{profil_code}}",
    "Ror-Profil-Utilisateur-System": "{{profil_system}}",
    "Ror-Role-Metier-Code": "{{role_code}}",
    "Ror-Role-Metier-System": "{{role_system}}",
}

# Fonction pour effectuer une requête FHIR
def fetch_capability_statement():
    response = requests.get(f"{base_url}/metadata", headers=headers)
    if response.status_code == 200:
        return CapabilityStatement(**response.json())
    else:
        response.raise_for_status()

# Utilisation du client
capability_statement = fetch_capability_statement()
print(capability_statement)
{% endraw %}
{% endhighlight %}
</div></div>

<blockquote class="stu-note">
<p>
La création du client est coûteuse, nous recommandons de conserver le client (la session) pour plusieurs appels.
</p>
</blockquote>
