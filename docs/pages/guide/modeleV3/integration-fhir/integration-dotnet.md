---
layout: menu-guide
section: guide
title: Utilisation de C#
subTitle: Intégration FHIR
---

Ce guide décrit comment intégrer l'API FHIR du ROR à un projet .NET Core.

Si vous n'avez pas encore vos identifiants d'accès, consultez la page [Authentification]({{ '/pages/guide/modeleV3/acces-donnees/authentification.html' | relative_url }}).

<blockquote class="stu-note">
<p>
Dans nos différents exemples, nous utilisons la librairie développée par Firely Hl7.Fhir.R4. FHIR reste une API HTTP JSON/XML qui peut être appelée avec d'autres techniques.
</p>
</blockquote>

### Dépendance

Ajoutez la dépendance Hl7.Fhir.R4 à votre projet. Nous choisissons la version R4 car l'API du ROR est basée sur FHIR R4.

```
dotnet add package Hl7.Fhir.R4 --version 4.3.0
```

&nbsp;

### Configuration du client HTTP FHIR

Par rapport à l'utilisation de base du client FHIR, nous spécifions un `HttpClientHandler` afin d'ajouter le jeton d'accès (`Authorization`) ainsi que les 4 headers `Ror-*` requis par l'API du ROR (voir la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }})).

Voici un exemple de cas nominal :
<div class="code-sample"><div class="tab-content" data-name="C#">
{% highlight csharp %}
{% raw %}
// class to add the access token and the Ror-* headers in the request:
public class AuthorizationMessageHandler : HttpClientHandler
{
    protected async override System.Threading.Tasks.Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        request.Headers.Add("Authorization", "Bearer {{access_token}}");
        request.Headers.Add("Ror-Profil-Utilisateur-Code", "{{profil_code}}");
        request.Headers.Add("Ror-Profil-Utilisateur-System", "{{profil_system}}");
        request.Headers.Add("Ror-Role-Metier-Code", "{{role_code}}");
        request.Headers.Add("Ror-Role-Metier-System", "{{role_system}}");
        return await base.SendAsync(request, cancellationToken);
    }
}

// client creation:
var settings = new FhirClientSettings
{
    Timeout = 40000,
    PreferredFormat = ResourceFormat.Json,
    VerifyFhirVersion = false,
};
var handler = new AuthorizationMessageHandler();
var client = new FhirClient("{{BASE}}", settings, handler);

// and then use the client:
var result = client.Search<Organization>();
{% endraw %}
{% endhighlight %}
</div></div>

Vous retrouverez toute la documentation de ce client sur le site de la librairie Firely HL7 FHIR SDK for .NET :
* [Site du SDK](https://fire.ly/products/firely-net-sdk/){:target="_blank"}
* [Documentation](https://docs.fire.ly/projects/Firely-NET-SDK/en/latest/){:target="_blank"}
