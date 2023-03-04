const ProductController = require("../controllers/ProductController");
const ProductRoutes = require("express").Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: Object
 *          required:
 *            - name
 *            - quantity
 *          properties:
 *            id:
 *              type: String
 *            quantity:
 *              type: integer
 */

/**
 * @swagger
 *  /addNewProduct:
 *      post:
 *       summary: add new product to database
 *       responses:
 *          200:
 *           description: the new book has added previously
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Product'
 *          403:
 *           description: this product already exists
 *          500:
 *           description: something goes wrong
 */
ProductRoutes.post("/add", ProductController.addNewProduct);
/**
 * @swagger
 *  /updateProduct:
 *      post:
 *       summary: add new product to database
 *       responses:
 *          200:
 *           description: the new book has added previously
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Product'
 *          403:
 *           description: this product already exists
 *          500:
 *           description: something goes wrong
 */
ProductRoutes.put("/update/:id", ProductController.updateProduct);
ProductRoutes.delete("/delete/:id", ProductController.deleteProduct);
ProductRoutes.get("/query", ProductController.getAllProducts);
ProductRoutes.get("/get/:id", ProductController.getProductById);
ProductRoutes.get("/get", ProductController.getProductByname);
ProductRoutes.get("/get", ProductController.getProductByCate);

module.exports = ProductRoutes;
