// lancer en tapant dans la console :
// node --experimental-strip-types tests.ts

import penguins from "./penguins.json" with { type: 'json' };

//** Compléter les en écrivant les parties :  */
/* TODO */
/* Désactiver COPILOT pour que vous fassiez l'effort de lire */

console.log("=== EXEMPLES DES MÉTHODES ARRAY AVEC LES DONNÉES PENGUINS ===\n");
console.log(`Nombre total de pingouins: ${Object.keys(penguins).length}\n`);

// ===== MÉTHODES D'ACCÈS AUX ÉLÉMENTS =====

console.log("--- MÉTHODES D'ACCÈS AUX ÉLÉMENTS ---");

// at() - Accède à un élément par son indice (accepte les indices négatifs)
console.log("• at() - Premier pingouin:", penguins.at(0)?.species);
console.log("• at() - Dernier pingouin:", penguins.at(-1)?.species);
console.log();

// slice() - Extrait une portion du tableau
console.log("• slice() - Les 3 premiers pingouins:");
console.log(penguins.slice(0, 3).map(p => `${p.species} de ${p.island}`));
console.log();

// ===== MÉTHODES DE RECHERCHE ET VÉRIFICATION =====

console.log("--- MÉTHODES DE RECHERCHE ET VÉRIFICATION ---");

// find() - Trouve le premier élément qui satisfait une condition
const premierChinstrap = penguins.find(e => e.species === "Chinstrap");
console.log("• find() - Premier pingouin Chinstrap:", premierChinstrap?.island);

// findIndex() - Trouve l'indice du premier élément qui satisfait une condition
const indexChinstrap = penguins.findIndex(e => e.species === "Chinstrap");
console.log("• findIndex() - Index du premier Chinstrap:", indexChinstrap);

// indexOf() - Trouve l'indice d'un élément (comparaison stricte)
const especies = penguins.map(p => p.species);
console.log("• indexOf() - Index de 'Gentoo' dans la liste des espèces:", especies.indexOf("Gentoo"));

// lastIndexOf() - Trouve le dernier indice d'un élément
console.log("• lastIndexOf() - Dernier index de 'Adelie':", especies.lastIndexOf("Adelie"));

// includes() - Vérifie si un élément existe dans le tableau
const iles = penguins.map(p => p.island);
console.log("• includes() - Île 'Dream' existe-t-elle?", iles.includes("Dream"));

// some() - Teste si au moins un élément satisfait une condition
const auMoinsUnLourd = penguins.some(p => p.body_mass_g != null && p.body_mass_g > 6000);
console.log("• some() - Y a-t-il des pingouins > 6000g?", auMoinsUnLourd);

// every() - Teste si tous les éléments satisfent une condition
const tousOntMasse = penguins.every(p => p.body_mass_g != null && p.body_mass_g > 0);
console.log("• every() - Tous ont une masse > 0?", tousOntMasse);
console.log();

// ===== MÉTHODES DE FILTRAGE =====

console.log("--- MÉTHODES DE FILTRAGE ---");

// filter() - Crée un nouveau tableau avec les éléments qui passent un test
const pingousinsMales = penguins.filter(e => e.sex === "MALE");
console.log("• filter() - Nombre de mâles:", pingousinsMales.length);

const pingouinsLourds = penguins.filter(e => e.body_mass_g != null && e.body_mass_g > 5000);
console.log("• filter() - Pingouins > 5000g:", pingouinsLourds.length);
console.log();

// ===== MÉTHODES DE TRANSFORMATION =====

console.log("--- MÉTHODES DE TRANSFORMATION ---");

// map() - Transforme chaque élément et crée un nouveau tableau
const descriptions = penguins.slice(0, 3).map(p => 
    `${p.species} (${p.sex}) - ${p.body_mass_g}g`
);
console.log("• map() - Descriptions des 3 premiers:");
descriptions.forEach(desc => console.log("  ", desc));

/* IMPORTANT : noter ce code 
 * L'usage de `map` pour n'extraire qu'une propriété.
 * Et l'usage de `[...new Set()]` sur le résultat pour ne garder que les noms uniques
 * Cela servira pour le prochain TP
 */
const nomsEspeces = penguins.map(e => e.species);
console.log("• map() - Espèces uniques:", [...new Set(nomsEspeces)]);

// flatMap() - Applique une fonction puis aplatit d'un niveau
const caracteristiques = penguins.slice(0, 2).flatMap(p => 
    [p.species, p.island, p.sex]
);
console.log("• flatMap() - Caractéristiques aplaties:", caracteristiques);

// reduce() - Réduit le tableau à une seule valeur
const masseTotale = penguins.reduce((total, p) => 
    p.body_mass_g != null ? total + p.body_mass_g : total, 0
);
console.log("• reduce() - Masse totale:", masseTotale, "grammes");

const nbrParEspece = penguins.reduce((acc, p) => {
    acc[p.species] = (acc[p.species] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
console.log("• reduce() - Comptage par espèce:", nbrParEspece);

// reduceRight() - Réduit de droite à gauche
const derniersNoms = penguins.slice(-3).reduceRight((acc, p) => 
    acc + p.species + " ", ""
);
console.log("• reduceRight() - 3 dernières espèces (inversées):", derniersNoms.trim());
console.log();

// ===== MÉTHODES DE TRI =====

console.log("--- MÉTHODES DE TRI ---");

// sort() - Trie les éléments (modifie le tableau original)
const massesCopie = penguins.slice(0, 5).map(p => p.body_mass_g).filter(m => m != null);
console.log("• sort() - Masses avant tri:", massesCopie);
massesCopie.sort((a, b) => a - b ); // différence pour tri
console.log("• sort() - Masses après tri croissant:", massesCopie);

// Tri par espèce
const pingouinsParEspece = penguins.slice(0, 10).sort((a, b) => 
    a.species.localeCompare(b.species)
);
console.log("• sort() - 10 premiers triés par espèce:");
pingouinsParEspece.forEach(p => console.log(`  ${p.species} - ${p.island}`));
console.log();

// ===== MÉTHODES D'ITÉRATION =====

console.log("--- MÉTHODES D'ITÉRATION ---");

// forEach() - Exécute une fonction pour chaque élément
console.log("• forEach() - Affichage des 3 premiers pingouins:");
penguins.slice(0, 3).forEach((p, index) => {
    console.log(`  ${index + 1}. ${p.species} de ${p.island} (${p.body_mass_g}g)`);
});
console.log();

// ===== MÉTHODES DE CONVERSION =====

console.log("--- MÉTHODES DE CONVERSION ---");

// join() - Joint tous les éléments en une chaîne
const premiersNoms = penguins.slice(0, 5).map(p => p.species);
console.log("• join() - Espèces séparées par ' | ':", premiersNoms.join(" | "));
console.log("• join() - Espèces séparées par des virgules:", premiersNoms.join(", "));

// toString() - Convertit en chaîne (équivalent à join(','))
console.log("• toString() - Premières masses:", penguins.slice(0, 3).map(p => p.body_mass_g).toString());
console.log();

// ===== MÉTHODES DE CONCATÉNATION =====

console.log("--- MÉTHODES DE CONCATÉNATION ---");

// concat() - Joint des tableaux
const adelies = penguins.filter(p => p.species === "Adelie").slice(0, 2);
const chinstraps = penguins.filter(p => p.species === "Chinstrap").slice(0, 2);
const melange = adelies.concat(chinstraps);
console.log("• concat() - Mélange Adelies + Chinstraps:");
melange.forEach(p => console.log(`  ${p.species} de ${p.island}`));
console.log();

// ===== MÉTHODES D'APLATISSEMENT =====

console.log("--- MÉTHODES D'APLATISSEMENT ---");

// flat() - Aplatit les tableaux imbriqués
const groupesParIle = [
    penguins.filter(p => p.island === "Torgersen").slice(0, 2).map(p => p.species),
    penguins.filter(p => p.island === "Biscoe").slice(0, 2).map(p => p.species),
    penguins.filter(p => p.island === "Dream").slice(0, 2).map(p => p.species)
];
console.log("• flat() - Groupes par île avant aplatissement:", groupesParIle);
console.log("• flat() - Après aplatissement:", groupesParIle.flat());
console.log();

// ===== STATISTIQUES FINALES =====

console.log("--- STATISTIQUES FINALES ---");

// Calculs statistiques utilisant différentes méthodes
const masses = penguins.map(p => p.body_mass_g).filter(m => m != null);
const masseTotaleCalc = masses.reduce((sum, mass) => sum + mass, 0);
const masseMoyenne = masseTotaleCalc / masses.length;
const masseMin = Math.min(...masses);
const masseMax = Math.max(...masses);

console.log("• Statistiques des masses:");
console.log(`  - Masse moyenne: ${masseMoyenne.toFixed(1)}g`);
console.log(`  - Masse minimale: ${masseMin}g`);
console.log(`  - Masse maximale: ${masseMax}g`);

// Répartition par île
const repartitionIles = penguins.reduce((acc, p) => {
    acc[p.island] = (acc[p.island] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
console.log("• Répartition par île:", repartitionIles);

// Répartition par sexe
const repartitionSexe = penguins.reduce((acc, p) => {
    if (p.sex != null) {
        acc[p.sex] = (acc[p.sex] || 0) + 1;
    }
    return acc;
}, {} as Record<string, number>);
console.log("• Répartition par sexe:", repartitionSexe);

// =============================================
// GROUPEMENT DES DONNÉES AVEC Object.groupBy
// =============================================

console.log("\n--- GROUPEMENT AVEC Object.groupBy ---");

// Groupement par île
console.log("• Object.groupBy() - Répartition par île:");
const pingouinsParIle = Object.groupBy(penguins, ({island}) => island);
for (const [ile, pingouins] of Object.entries(pingouinsParIle)) {
    console.log(`  ${ile}: ${pingouins?.length || 0} pingouins`);
}

// Groupement par espèce et sexe combinés
console.log("\n• Object.groupBy() - Répartition par espèce et sexe:");
const pingouinsParEspeceEtSexe = Object.groupBy(penguins, pingouin => 
    `${pingouin.species} - ${pingouin.sex || 'inconnu'}`
);
for (const [a, b] of Object.entries(pingouinsParEspeceEtSexe)) {
    console.log(`  ${a}: ${b?.length || 0} pingouins`);
}

// Groupement par sexe
console.log("\n• Object.groupBy() - Répartition par sexe:");
const pingouinsParSexe = Object.groupBy(penguins, ({sex}) => 
    `${sex || 'inconnu'}`
);
for (const [sexe, pingouins] of Object.entries(pingouinsParSexe)) {
    console.log(`  ${sexe}: ${pingouins?.length || 0} pingouins`);
}

// Groupement par catégorie de masse (léger, moyen, lourd)
console.log("\n• Object.groupBy() - Répartition par catégorie de masse:");
const pingouinsParCategorieMasse = Object.groupBy(penguins, pingouin => {
    if (!pingouin.body_mass_g) return 'masse inconnue';
    if (pingouin.body_mass_g < 3500) return 'léger';
    if (pingouin.body_mass_g < 4500) return 'moyen';
    return 'lourd';
});

Object.entries(pingouinsParCategorieMasse)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([categorie, pingouins]) => {
        console.log(`  ${categorie}: ${pingouins?.length || 0} pingouins`);
    });

console.log("\n=== FIN DES EXEMPLES ===");

/* TODO Faire de même pour d'autres dataset : https://observablehq.com/@observablehq/sample-datasets (Possible d'utiliser COPILOT) */

import cars from "./cars.json" with { type: 'json' };

console.log("=== EXEMPLES DES MÉTHODES ARRAY AVEC LES DONNÉES CARS ===\n");
console.log(`Nombre total de voitures: ${cars.length}\n`);

// ===== MÉTHODES D'ACCÈS AUX ÉLÉMENTS =====
console.log("--- MÉTHODES D'ACCÈS AUX ÉLÉMENTS ---");
console.log("• at() - Première voiture:", cars.at(0)?.name);
console.log("• at() - Dernière voiture:", cars.at(-1)?.name);
console.log("• slice() - Les 3 premières voitures:", cars.slice(0, 3).map(c => c.name));
console.log();

// ===== MÉTHODES DE RECHERCHE ET VÉRIFICATION =====
console.log("--- MÉTHODES DE RECHERCHE ET VÉRIFICATION ---");
const voiturePuissante = cars.find(c => c["power (hp)"] != null && c["power (hp)"] > 200);
console.log("• find() - Première voiture > 200hp:", voiturePuissante?.name);

const indexDiesel = cars.findIndex(c => c.name.toLowerCase().includes("diesel"));
console.log("• findIndex() - Index de la première voiture diesel:", indexDiesel);

const noms = cars.map(c => c.name);
console.log("• indexOf() - Index de 'Ford Mustang':", noms.indexOf("Ford Mustang"));
console.log("• lastIndexOf() - Dernier index de 'AMC Concord DL':", noms.lastIndexOf("AMC Concord DL"));
console.log("• includes() - Existe-t-il une 'Toyota Corolla'?", noms.includes("Toyota Corolla"));

const auMoinsUneRapide = cars.some(c => c["0-60 mph (s)"] < 9);
console.log("• some() - Y a-t-il des voitures < 9s au 0-60 mph?", auMoinsUneRapide);

const toutesOntNom = cars.every(c => c.name != null);
console.log("• every() - Toutes ont un nom?", toutesOntNom);
console.log();

// ===== MÉTHODES DE FILTRAGE =====
console.log("--- MÉTHODES DE FILTRAGE ---");
const voitures8Cyl = cars.filter(c => c.cylinders === 8);
console.log("• filter() - Nombre de voitures 8 cylindres:", voitures8Cyl.length);

const voituresEconomiques = cars.filter(c => c["economy (mpg)"] != null && c["economy (mpg)"] > 30);
console.log("• filter() - Voitures > 30mpg:", voituresEconomiques.length);
console.log();

// ===== MÉTHODES DE TRANSFORMATION =====
console.log("--- MÉTHODES DE TRANSFORMATION ---");
const descriptionsVoiture = cars.slice(0, 3).map(c =>
    `${c.name} (${c.year}) - ${c["economy (mpg)"]}mpg`
);
console.log("• map() - Descriptions des 3 premières:");
descriptionsVoiture.forEach(desc => console.log("  ", desc));

const nomsUniques = [...new Set(cars.map(c => c.name))];
console.log("• map() + Set - Noms uniques:", nomsUniques.slice(0, 5), "...");

const nomsEtPuissance = cars.slice(0, 2).flatMap(c => [c.name, c["power (hp)"]]);
console.log("• flatMap() - Noms et puissance aplatis:", nomsEtPuissance);

const poidsTotal = cars.reduce((total, c) => total + (c["weight (lb)"] || 0), 0);
console.log("• reduce() - Poids total:", poidsTotal, "lb");

const nbrParCylindre = cars.reduce((acc, c) => {
    acc[c.cylinders] = (acc[c.cylinders] || 0) + 1;
    return acc;
}, {} as Record<number, number>);
console.log("• reduce() - Comptage par nombre de cylindres:", nbrParCylindre);

const derniersNomsVoiture = cars.slice(-3).reduceRight((acc, c) => acc + c.name + " ", "");
console.log("• reduceRight() - 3 dernières voitures (inversées):", derniersNomsVoiture.trim());
console.log();

// ===== MÉTHODES DE TRI =====
console.log("--- MÉTHODES DE TRI ---");
const economiesCopie = cars.slice(0, 5).map(c => c["economy (mpg)"]).filter(e => e != null);
console.log("• sort() - Économies avant tri:", economiesCopie);
economiesCopie.sort((a, b) => a - b);
console.log("• sort() - Économies après tri croissant:", economiesCopie);

const voituresTrieesParNom = cars.slice(0, 10).sort((a, b) => a.name.localeCompare(b.name));
console.log("• sort() - 10 premières triées par nom:");
voituresTrieesParNom.forEach(c => console.log(`  ${c.name} - ${c.year}`));
console.log();

// ===== MÉTHODES D'ITÉRATION =====
console.log("--- MÉTHODES D'ITÉRATION ---");
console.log("• forEach() - Affichage des 3 premières voitures:");
cars.slice(0, 3).forEach((c, index) => {
    console.log(`  ${index + 1}. ${c.name} (${c.year}, ${c["economy (mpg)"]}mpg)`);
});
console.log();

// ===== MÉTHODES DE CONVERSION =====
console.log("--- MÉTHODES DE CONVERSION ---");
const premiersNomsVoiture = cars.slice(0, 5).map(c => c.name);
console.log("• join() - Noms séparés par ' | ':", premiersNomsVoiture.join(" | "));
console.log("• join() - Noms séparés par des virgules:", premiersNomsVoiture.join(", "));
console.log("• toString() - Premiers poids:", cars.slice(0, 3).map(c => c["weight (lb)"]).toString());
console.log();

// ===== MÉTHODES DE CONCATÉNATION =====
console.log("--- MÉTHODES DE CONCATÉNATION ---");
const toyotas = cars.filter(c => c.name.includes("Toyota")).slice(0, 2);
const hondas = cars.filter(c => c.name.includes("Honda")).slice(0, 2);
const melangeVoiture = toyotas.concat(hondas);
console.log("• concat() - Mélange Toyota + Honda:");
melangeVoiture.forEach(c => console.log(`  ${c.name} (${c.year})`));
console.log();

// ===== MÉTHODES D'APLATISSEMENT =====
console.log("--- MÉTHODES D'APLATISSEMENT ---");
const groupesParCylindre = [
    cars.filter(c => c.cylinders === 4).slice(0, 2).map(c => c.name),
    cars.filter(c => c.cylinders === 6).slice(0, 2).map(c => c.name),
    cars.filter(c => c.cylinders === 8).slice(0, 2).map(c => c.name)
];
console.log("• flat() - Groupes par cylindres avant aplatissement:", groupesParCylindre);
console.log("• flat() - Après aplatissement:", groupesParCylindre.flat());
console.log();

// ===== STATISTIQUES FINALES =====
console.log("--- STATISTIQUES FINALES ---");
const economies = cars.map(c => c["economy (mpg)"]).filter(e => e != null);
const economieTotale = economies.reduce((sum, e) => sum + e, 0);
const economieMoyenne = economieTotale / economies.length;
const economieMin = Math.min(...economies);
const economieMax = Math.max(...economies);

console.log("• Statistiques des économies:");
console.log(`  - Moyenne: ${economieMoyenne.toFixed(1)}mpg`);
console.log(`  - Min: ${economieMin}mpg`);
console.log(`  - Max: ${economieMax}mpg`);

const repartitionCylindres = cars.reduce((acc, c) => {
    acc[c.cylinders] = (acc[c.cylinders] || 0) + 1;
    return acc;
}, {} as Record<number, number>);
console.log("• Répartition par cylindres:", repartitionCylindres);

const repartitionAnnees = cars.reduce((acc, c) => {
    acc[c.year] = (acc[c.year] || 0) + 1;
    return acc;
}, {} as Record<number, number>);
console.log("• Répartition par année:", repartitionAnnees);

// =============================================
// GROUPEMENT DES DONNÉES AVEC Object.groupBy
// =============================================
console.log("\n--- GROUPEMENT AVEC Object.groupBy ---");
const voituresParCylindre = Object.groupBy(cars, ({cylinders}) => cylinders);
for (const [cyl, voitures] of Object.entries(voituresParCylindre)) {
    console.log(`  ${cyl} cylindres: ${voitures?.length || 0} voitures`);
}

const voituresParAnnee = Object.groupBy(cars, c => c.year);
for (const [annee, voitures] of Object.entries(voituresParAnnee)) {
    console.log(`  ${annee}: ${voitures?.length || 0} voitures`);
}

const voituresParCategorieEconomie = Object.groupBy(cars, c => {
    if (!c["economy (mpg)"]) return "inconnue";
    if (c["economy (mpg)"] < 15) return "gourmande";
    if (c["economy (mpg)"] < 25) return "moyenne";
    return "économique";
});
Object.entries(voituresParCategorieEconomie)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([categorie, voitures]) => {
        console.log(`  ${categorie}: ${voitures?.length || 0} voitures`);
    });

console.log("\n=== FIN DES EXEMPLES ===");

import aapl from "./aapl.json" with { type: 'json' };

console.log("=== EXEMPLES DES MÉTHODES ARRAY AVEC LES DONNÉES AAPL ===\n");
console.log(`Nombre total de jours de cotation: ${aapl.length}\n`);

// ===== MÉTHODES D'ACCÈS AUX ÉLÉMENTS =====
console.log("--- MÉTHODES D'ACCÈS AUX ÉLÉMENTS ---");
console.log("• at() - Premier jour:", aapl.at(0)?.Date);
console.log("• at() - Dernier jour:", aapl.at(-1)?.Date);
console.log("• slice() - Les 3 premiers jours:", aapl.slice(0, 3).map(d => d.Date));
console.log();

// ===== MÉTHODES DE RECHERCHE ET VÉRIFICATION =====
console.log("--- MÉTHODES DE RECHERCHE ET VÉRIFICATION ---");
const firstHighDay = aapl.find(d => d.High > 180);
console.log("• find() - Premier jour avec High > 180:", firstHighDay?.Date);

const indexBigVolume = aapl.findIndex(d => d.Volume > 150_000_000);
console.log("• findIndex() - Index du premier jour avec Volume > 150M:", indexBigVolume);

const datesList = aapl.map(d => d.Date);
console.log("• indexOf() - Index du 2013-05-13:", datesList.indexOf("2013-05-13T00:00:00.000Z"));
console.log("• lastIndexOf() - Dernier index du 2018-05-11:", datesList.lastIndexOf("2018-05-11T00:00:00.000Z"));
console.log("• includes() - Existe-t-il le 2014-01-02?", datesList.includes("2014-01-02T00:00:00.000Z"));

const hasVeryLow = aapl.some(d => d.Low < 60);
console.log("• some() - Y a-t-il des jours avec Low < 60?", hasVeryLow);

const allHaveVolume = aapl.every(d => d.Volume > 0);
console.log("• every() - Tous ont un volume > 0?", allHaveVolume);
console.log();

// ===== MÉTHODES DE FILTRAGE =====
console.log("--- MÉTHODES DE FILTRAGE ---");
const highCloseDays = aapl.filter(d => d.Close > 180);
console.log("• filter() - Nombre de jours Close > 180:", highCloseDays.length);

const bigVolumeDays = aapl.filter(d => d.Volume > 100_000_000);
console.log("• filter() - Jours avec Volume > 100M:", bigVolumeDays.length);
console.log();

// ===== MÉTHODES DE TRANSFORMATION =====
console.log("--- MÉTHODES DE TRANSFORMATION ---");
const daySummaries = aapl.slice(0, 3).map(d =>
    `${d.Date}: Open ${d.Open}, Close ${d.Close}, Volume ${d.Volume}`
);
console.log("• map() - Résumés des 3 premiers jours:");
daySummaries.forEach(desc => console.log("  ", desc));

const uniqueYears = [...new Set(aapl.map(d => d.Date.slice(0, 4)))];
console.log("• map() + Set - Années uniques:", uniqueYears);

const openClosePairs = aapl.slice(0, 2).flatMap(d => [d.Open, d.Close]);
console.log("• flatMap() - Open et Close aplatis:", openClosePairs);

const totalVolume = aapl.reduce((total, d) => total + d.Volume, 0);
console.log("• reduce() - Volume total:", totalVolume);

const countByYear = aapl.reduce((acc, d) => {
    const year = d.Date.slice(0, 4);
    acc[year] = (acc[year] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
console.log("• reduce() - Comptage par année:", countByYear);

const lastDates = aapl.slice(-3).reduceRight((acc, d) => acc + d.Date + " ", "");
console.log("• reduceRight() - 3 dernières dates (inversées):", lastDates.trim());
console.log();

// ===== MÉTHODES DE TRI =====
console.log("--- MÉTHODES DE TRI ---");
const closesCopy = aapl.slice(0, 5).map(d => d.Close);
console.log("• sort() - Closes avant tri:", closesCopy);
closesCopy.sort((a, b) => a - b);
console.log("• sort() - Closes après tri croissant:", closesCopy);

const sortedByDate = aapl.slice(0, 10).sort((a, b) => a.Date.localeCompare(b.Date));
console.log("• sort() - 10 premiers triés par date:");
sortedByDate.forEach(d => console.log(`  ${d.Date} - Close: ${d.Close}`));
console.log();

// ===== MÉTHODES D'ITÉRATION =====
console.log("--- MÉTHODES D'ITÉRATION ---");
console.log("• forEach() - Affichage des 3 premiers jours:");
aapl.slice(0, 3).forEach((d, index) => {
    console.log(`  ${index + 1}. ${d.Date}: Open ${d.Open}, Close ${d.Close}`);
});
console.log();

// ===== MÉTHODES DE CONVERSION =====
console.log("--- MÉTHODES DE CONVERSION ---");
const firstDates = aapl.slice(0, 5).map(d => d.Date);
console.log("• join() - Dates séparées par ' | ':", firstDates.join(" | "));
console.log("• join() - Dates séparées par des virgules:", firstDates.join(", "));
console.log("• toString() - Premiers volumes:", aapl.slice(0, 3).map(d => d.Volume).toString());
console.log();

// ===== MÉTHODES DE CONCATÉNATION =====
console.log("--- MÉTHODES DE CONCATÉNATION ---");
const days2013 = aapl.filter(d => d.Date.startsWith("2013")).slice(0, 2);
const days2018 = aapl.filter(d => d.Date.startsWith("2018")).slice(0, 2);
const mixedDays = days2013.concat(days2018);
console.log("• concat() - Mélange jours 2013 + 2018:");
mixedDays.forEach(d => console.log(`  ${d.Date} (Close: ${d.Close})`));
console.log();

// ===== MÉTHODES D'APLATISSEMENT =====
console.log("--- MÉTHODES D'APLATISSEMENT ---");
const groupsByYear = [
    aapl.filter(d => d.Date.startsWith("2013")).slice(0, 2).map(d => d.Date),
    aapl.filter(d => d.Date.startsWith("2014")).slice(0, 2).map(d => d.Date),
    aapl.filter(d => d.Date.startsWith("2015")).slice(0, 2).map(d => d.Date)
];
console.log("• flat() - Groupes par année avant aplatissement:", groupsByYear);
console.log("• flat() - Après aplatissement:", groupsByYear.flat());
console.log();

// ===== STATISTIQUES FINALES =====
console.log("--- STATISTIQUES FINALES ---");
const closes = aapl.map(d => d.Close);
const totalClose = closes.reduce((sum, c) => sum + c, 0);
const avgClose = totalClose / closes.length;
const minClose = Math.min(...closes);
const maxClose = Math.max(...closes);

console.log("• Statistiques des clôtures:");
console.log(`  - Moyenne: ${avgClose.toFixed(2)}`);
console.log(`  - Min: ${minClose}`);
console.log(`  - Max: ${maxClose}`);

const volumeByYear = aapl.reduce((acc, d) => {
    const year = d.Date.slice(0, 4);
    acc[year] = (acc[year] || 0) + d.Volume;
    return acc;
}, {} as Record<string, number>);
console.log("• Volume total par année:", volumeByYear);

const countByMonth = aapl.reduce((acc, d) => {
    const month = d.Date.slice(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
console.log("• Comptage par mois:", countByMonth);

// =============================================
// GROUPEMENT DES DONNÉES AVEC Object.groupBy
// =============================================
console.log("\n--- GROUPEMENT AVEC Object.groupBy ---");
const daysByYear = Object.groupBy(aapl, d => d.Date.slice(0, 4));
for (const [year, days] of Object.entries(daysByYear)) {
    console.log(`  ${year}: ${days?.length || 0} jours`);
}

console.log("\n=== FIN DES EXEMPLES ===");