const express = require('express');
const axios = require('axios');
const app = express();

app.set('views', __dirname + '/views'); // Ruta de la carpeta de vistas
app.set('view engine', 'ejs');

// Ruta para obtener los productos desde la API de VTEX
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('https://offcorss.myvtex.com/api/catalog_system/pub/products/search');
    const products = response.data;

    const formattedProducts = products.map((product) => {
      return {
        productId: product.productId,
        brand: product.brand,
        productTitle: product.productTitle,
        items: product.items.map((item) => item.itemId),
        images: product.items.map((item) => item.images[0]),
      };
    });

    res.render('products', { products: formattedProducts });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});






