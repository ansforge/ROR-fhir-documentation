---
layout: menu-guide
section: guide
title: Mapping FHIR du modèle de données du ROR
subTitle: Guide
---

<p style="background-color: #ffcccc; border:1px solid grey; padding: 5px; max-width: 790px;">
A noter que Task, Measure et MeasureReport ne font pas partie du mapping, car cela ne fait pas partie du modèle d'exposition du ROR
</p>

### Mapping global

*Schéma disponible sur le [guide d'implémentation officiel]({{ site.ror.ig_url }})*

Le fichier définissant le mapping FHIR pour le modèle d'exposition 3.0 du ROR est consultable et téléchargeable [ici]({{ site.ror.ig_url }}/mappingFHIR_ROR_ME3.0.1_2026_04_08.xlsx)

<div style="background-color: #ffcccc; border:1px solid grey; padding: 5px; max-width: 790px;">
<b>Notes:</b>
    <ol>
        <li>Dans l'implémentation actuelle du ROR, une <i>organisation interne (OI)</i> ne peut être rattachée qu'à une <i>entité géographique (EG)</i>, par exemple un pôle ne peut être rattaché qu'à une EG. Concernant les pôles multi-sites, une copie du pôle est créée pour chaque EG;</li>
        <li><code>PractitionerRole</code> contient l'<i>exercice professionnel</i> et la <i>situation opérationnelle</i>. Dans le cas ou l'<i>exercice professionnel</i> est rattaché à plusieurs <i>situations opérationnelles</i>, alors il aura autant d'instance <code>PractitionerRole</code> qu'il y a de <i>situations opérationnelles</i> (les attributs de l'<i>exercice professionnel</i> sont dupliqués dans chacune de ces ressources);</li>
        <li>La cardinalité implémentée d'une instance de <code>Location</code> référencée dans une instance <code>HealthcareService</code> est 0..* au lieu de 1..*. Cela est dû à la temporalité de la création d'une instance <code>HealthcareService</code>, créée avant que les lieux de réalisation de l'offre (les instances <code>Location</code>) rattachés à l'offre ne soient connus.</li>
    </ol>
</div>

### Mapping HealthcareService

*Voir le schéma de mapping [HealthcareService]({{ site.ror.ig_url }}) sur le guide d'implémentation officiel.*

### Mapping Practitioner & PractitionerRole

*Voir le schéma de mapping [Practitioner & PractitionerRole]({{ site.ror.ig_url }}) sur le guide d'implémentation officiel.*

### Mapping Organization

*Voir le schéma de mapping [Organization]({{ site.ror.ig_url }}) sur le guide d'implémentation officiel.*

### Mapping Location

*Voir le schéma de mapping [Location]({{ site.ror.ig_url }}) sur le guide d'implémentation officiel.*
