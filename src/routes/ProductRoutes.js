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
ProductRoutes.post("/addNewProduct", ProductController.addNewProduct);
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
ProductRoutes.put("/updateProduct", ProductController.updateProduct);
ProductRoutes.delete("/deleteProduct/:id", ProductController.deleteProduct);
ProductRoutes.get("/getAllProducts", ProductController.getAllProducts);
ProductRoutes.get("/getProductById/:id", ProductController.getProductById);
ProductRoutes.get("/getProductByName", ProductController.getProductByname);

module.exports = ProductRoutes;
