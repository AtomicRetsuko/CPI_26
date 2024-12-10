const express = require('express');
const mongoose = require('mongoose');

// Connexion à la base MongoDB
mongoose.connection.once('open', () => {
    console.log("Connexion à la base de données effectuée");
});
mongoose.connection.on('error', () => {
    console.error("Erreur dans la BDD");
});
mongoose.connect("mongodb://localhost:27017/db_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Définition du modèle Product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
});
const Product = mongoose.model('Product', productSchema, 'products');

const app = express();
app.use(express.json());

// Récupérer tous les produits
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ code: "701", message: "No products found" });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ code: "500", message: "Internal Server Error" });
    }
});

// Récupérer un produit par ID
app.get('/product/:id', async (req, res) => {
    const idParam = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(idParam)) {
        return res.status(400).json({ code: "706", message: "Invalid ID format" });
    }
    try {
        const product = await Product.findById(idParam);
        if (!product) {
            return res.status(404).json({ code: "705", message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ code: "500", message: "Internal Server Error" });
    }
});

// Ajouter un produit
app.post("/save-product", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(400).json({ code: "702", message: "Error saving product", error });
    }
});

// Lancer le serveur
app.listen(3000, () => {
    console.log("Le serveur a démarré sur le port 3000");
});