//const test; // lecture seule
//var test; // Pas Bonne Pratique
//let sez; // Lecture/Ecriture


nameuh = "Morgan"
price = "$5000"

console.log("You're a Wanted Man Mister " + nameuh + price + "for your head Alone !")

const products = [
    "Pain au Chocolat",
    "Chocolatine",
    "Pain a l'argent",
    "Argentine"
];

for (const product in products)
    if (products == "Argentine")
        return products;
        console.log("Il y a bien une Argentine dedans")

/**
 * Récuperer le produit
 * @param {*} nom 
 */
function getProduct(nom)
{
    // For classique
    for (const index in products) 
    {
        if (products[index] == nom)
        {
            return products[index];
        }
    }
    return null;
}

// Tester la fonction
//const foundProduct = getProduct("Chocolatine");
//console.log(foundProduct);

// Predicate

const foundProduct = products.find(product => product == "Chocolatine") // on récupère l'élément product uniquement quand le return est égal a Chocolatine
console.log(foundProduct)