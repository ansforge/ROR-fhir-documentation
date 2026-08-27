---
layout: menu-guide
section: guide
title: RORLocation
subTitle: Paramètres de recherche
---

Profil officiel : [RORLocation]({{ site.ror.ig_url }}/StructureDefinition-ror-location.html){:target="_blank"}

<div class="wysiwyg" markdown="1">

| Attribut ME 3.0 | Search parameters | Natif FHIR | Type FHIR | Description |
| --- | --- | --- | --- | --- |
| - | _filter | Oui | special | Paramètre de recherche de filtre qui prend en charge une grammaire de recherche plus sophistiquée. Voir la documentation (https://hl7.org/fhir/search_filter.html) pour plus de détails |
| - | _has | Oui | special | Permet d’utiliser les paramètres de recherche des ressources faisant référence à une autre ressource (chainage inversé) |
| - | _content | Oui | special | Recherche sur le contenu textuel de la ressource <code><span style="color: #ff0000;">draft</span></code> |
| - | _id | Oui | token | Identification technique de la ressource |
| - | near | Oui | special | Recherche positionnelle (coordonnées géographique) |
| - | near - insee -code | Non | special | Recherche positionnelle (code INSEE commune) |
| - | status | Oui | token | Statut de la ressource |
| Metadonnee / dateMiseJour | _ lastUpdated | Oui | date | Date de dernière mise à jour. |
| Metadonnee / regionSource | _tag | Oui | token | Code de la région de la source de la donnée |
| idExterneSynchro | identifier | Oui | token | L'identifiant externe de synchronisation est l'identifiant défini par le porteur d'offre pour la zone d'hébergement des lits. Location.identifier.type = 26 \| JDV_J236 |
| identifiant | identifier | Oui | token | Identifiant fonctionnel du lieu. Location.identifier.type = 25 \| JDV_J236 |
| fonctionLieu | type | Oui | token | La fonction correspond à la destination d'usage du lieu JDV_J198-FonctionLieu-ROR issu de la TRE_R343-FonctionLieu |
| Adresse/ codePostal | address -postalcode | Oui | string | Code Postal ou code postal spécifique CEDEX |
| Adresse/ localite | address -city | Oui | string | Localité ou Libellé du bureau distributeur CEDEX |
| Lieu/ communeCOG | commune - cog | Non | token | Code officiel géographique (COG) de la commune dans laquelle le lieu est situé. JDV-J124-Commune issu de la TRE_R13-Commune |
| CapacitePriseCharge / affectationTemporaire | temporary -assignement | Non | token | L'affectation temporaire permet de réserver tout ou partie des lits d'une zone d'hébergement pour des patients selon qu'ils soient -ou non- concernés par une pathologie (Covid+, Covid-, ...) ou un évènement (catastrophe naturelle, attentat, ...). JDV_J195-AffectationTemporaire-ROR issu de la TRE_R337-AffectationTemporaire |
| CapaciteAccueilOperationnelle / statutCapacite | capacity -status | Non | token | Permet de préciser le statut des lits décrits. JDV_J188-TypeStatutCapacite-ROR issu de la TRE-R330-TypeStatutCapacite |
| Statut | operational -status | Oui | token | Indique si le lieu est opérationnel, fermé temporairement ou fermé définitivement. JDV_J204-StatutLieu-ROR issu de la TRE_R203-StatutLieu <code><span style="color: #ff0000;">draft</span></code> |
| CapaciteAccueilOperationnelle / nombreCapacite | nb - capacity | Non | number | Quantité de lits ou places de la capacité exprimée. |
| CapaciteAccueilOperationnelle / natureCapacite | capacity -type | Non | token | Indique si la capacité est exprimée en lits ou en places. JDV_J187-NatureCapacite-ROR issu de la TRE_R329-NatureCapacite |
| CapaciteAccueilOperationnelle / temporaliteCapacite | temporality -capacity | Non | token | Indique le moment où cette capacité sera effective. Il est ainsi possible de décrire la situation immédiate, ou de fournir des informations prospectives de capacités, prenant notamment en compte les entrées et sorties déjà identifiés de patients. JDV_J189-TemporaliteCapacite-ROR issu de la TRE_R331-Temporalite |
| CapaciteAccueilOperationnelle / genreCapaciteDispo | gender -capacity-available | Non | token | Genre des patients qui peuvent étre installés dans des lits disponibles. JDV_J190-GenreCapacite-ROR issu de la TRE_R332-GenreCapacite |
| CapaciteAccueilOperationnelle / typeFermetureCapacite | capacity - closing -type | Non | token | Indique le statut de lits fermés, permettant d'identifier le nombre de lits fermés qui peuvent être réactivés en cas de besoin et le nombre de ceux qui ne peuvent pas l'être. JDV_J191-TypeFermetureCapacite-ROR issu de la TRE_R333-TypeFermetureCapacite |
| CapaciteAccueilOperationnelle / typeLitSupplementaire | additional - bed -type | Non | token | Indique le statut de lits supplémentaires, pour identifier le nombre de lits supplémentaires déjà mobilisés et, par typologie de mobilisation possible, le nombre de lits qui ne le sont pas encore. JDV_J192-TypeLitSupplementaire-ROR issu de la TRE_R334-TypeLitSupplementaire |
| CapaciteAccueilOperationnelle / typeCrise | crisis -type | Non | token | Indique le type de crise qui permet de mobiliser le nombre de lits supplémentaires décrits. JDV_J194-TypeCrise-ROR issu de la TRE_R336-TypeCrise |
| CapaciteAccueilOperationnelle / dateMAJCapacite | capacity -update-date | Non | date | Date à laquelle la capacité d'accueil a été mise à jour dans la source. |
| EquipementSpecifique / typeEquipement | equipment -type | Non | token | Les équipements spécifiques décrits sont des ressources propres de la structure ou mises à disposition dans le cadre d'une convention à la condition qu'elles soient utilisées sur site. JDV_J18-EquipementSpecifique-ROR issu de la TRE_R212-Equipement |
| LimiteCaracteristiqueEquipement / typeCaracteristique | equipment -feature | Non | token | Indique la caractéristique de l'équipement pour laquelle une valeur limite est précisée. JDV_J228-TypeCaracteristiqueEquipement-ROR |
| LimiteCaracteristiqueEquipement / valeurLimite | limit -value | Non | quantity | Correspond à la valeur extrême associée à une caractéristique de l'équipement. TRE_R247-UcumUniteMesure |
| CapaciteHabitation / typeHabitation | residential -type | Non | token | Le type d'habitation renseigne sur la taille et le nombre de pièces d'un logement. JDV_J32-TypeHabitation-ROR issu de la TRE_R242-TypeHabitation |
| CapaciteHabitation / nbHabitation | residential -number | Non | number | Nombre d'habitations du même type. |

</div>
