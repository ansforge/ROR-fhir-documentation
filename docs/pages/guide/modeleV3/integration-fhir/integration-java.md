---
layout: menu-guide
section: guide
title: Utilisation de Java
subTitle: Intégration FHIR
---

Ce guide décrit comment intégrer l'API FHIR du ROR à un projet Java.

Si vous n'avez pas encore vos identifiants d'accès, consultez la page [Authentification]({{ '/pages/guide/modeleV3/acces-donnees/authentification.html' | relative_url }}).

<blockquote class="stu-note">
<p>
Dans nos différents exemples, nous utilisons Maven et la librairie HAPI FHIR. FHIR reste une API HTTP JSON/XML qui peut être appelée avec d'autres techniques.
</p>
</blockquote>

### Dépendances Maven

Pour l'exemple, le projet est un projet Java Maven. Nous utilisons la librairie [HAPI FHIR](https://hapifhir.io/){:target="_blank"} qui permet de structurer les données.

Pour utiliser les librairies HAPI, nous allons ajouter les dépendances suivantes dans le fichier `pom.xml` :

```xml
<properties>
    <hapifhir_version>7.6.1</hapifhir_version>
</properties>
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13</version>
        <scope>test</scope>
    </dependency>
    <!-- Hapi classes -->
    <dependency>
        <groupId>ca.uhn.hapi.fhir</groupId>
        <artifactId>hapi-fhir-base</artifactId>
        <version>${hapifhir_version}</version>
    </dependency>
    <dependency>
        <groupId>ca.uhn.hapi.fhir</groupId>
        <artifactId>hapi-fhir-client</artifactId>
        <version>${hapifhir_version}</version>
    </dependency>
    <dependency>
        <groupId>ca.uhn.hapi.fhir</groupId>
        <artifactId>hapi-fhir-structures-r4</artifactId>
        <version>${hapifhir_version}</version>
    </dependency>
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.3</version>
    </dependency>
</dependencies>
```

&nbsp;

### Configuration du client HTTP FHIR avec HAPI

Par rapport à l'utilisation de base du client HAPI, nous spécifions un intercepteur afin d'ajouter le jeton d'accès (`Authorization`) ainsi que les 4 headers `Ror-*` requis par l'API du ROR (voir la page [Consommation des API FHIR]({{ '/pages/guide/modeleV3/acces-donnees/consommation-api.html' | relative_url }})).

Voici un exemple de cas nominal :
<div class="code-sample"><div class="tab-content" data-name="java">
{% highlight java %}
{% raw %}
// register the interceptor only one time:
var client = ctx.newRestfulGenericClient("{{BASE}}");
client.registerInterceptor(new IClientInterceptor() {
    @Override
    public void interceptRequest(IHttpRequest iHttpRequest) {
        iHttpRequest.addHeader("Authorization", "Bearer {{access_token}}");
        iHttpRequest.addHeader("Ror-Profil-Utilisateur-Code", "{{profil_code}}");
        iHttpRequest.addHeader("Ror-Profil-Utilisateur-System", "{{profil_system}}");
        iHttpRequest.addHeader("Ror-Role-Metier-Code", "{{role_code}}");
        iHttpRequest.addHeader("Ror-Role-Metier-System", "{{role_system}}");
    }
    @Override
    public void interceptResponse(IHttpResponse iHttpResponse) throws IOException {}
});
// and then use the client:
var conf = client
   .capabilities()
   .ofType(CapabilityStatement.class)
   .execute();
{% endraw %}
{% endhighlight %}
</div></div>

<blockquote class="stu-note">
<p>
La création du client est coûteuse, nous recommandons de conserver le client pour plusieurs appels.
</p>
</blockquote>

La documentation HAPI est très riche sur le fonctionnement de son client, vous pourrez y trouver différents usages : [Documentation Client HAPI](https://hapifhir.io/hapi-fhir/docs/client/generic_client.html){:target="_blank"}
