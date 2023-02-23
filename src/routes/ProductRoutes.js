const ProductController = require("../controllers/ProductController");
const routes = require("express").Router();

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
routes.post("/addNewProduct", ProductController.addNewProduct);
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
routes.put("/updateProduct", ProductController.updateProduct);
routes.delete("/deleteProduct/:id", ProductController.deleteProduct);
routes.get("/getAllProducts", ProductController.getAllProducts);
routes.get("/getProductById/:id", ProductController.getProductById);
routes.get("/getProductByName", ProductController.getProductByname);

module.exports = routes;
