import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autores
 *   description: Endpoints para gerenciamento de autores
 */

/**
 * @swagger
 * /autores:
 *   get:
 *     summary: Lista todos os autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista completa de autores
 *   post:
 *     summary: Cadastra um novo autor
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Autor cadastrado com sucesso
 */

/**
 * @swagger
 * /autores/busca:
 *   get:
 *     summary: Busca autores por filtro
 *     tags: [Autores]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do autor
 *       - in: query
 *         name: nacionalidade
 *         schema:
 *           type: string
 *         description: Nacionalidade do autor
 *     responses:
 *       200:
 *         description: Lista de autores filtrada
 */

/**
 * @swagger
 * /autores/{id}:
 *   get:
 *     summary: Busca um autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor encontrado
 *       404:
 *         description: Autor não encontrado
 *   put:
 *     summary: Atualiza um autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *       404:
 *         description: Autor não encontrado
 *   delete:
 *     summary: Remove um autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor removido com sucesso
 *       404:
 *         description: Autor não encontrado
 */

router
  .get("/autores", AutorController.listarAutores, paginar)
  .get("/autores/busca", AutorController.listarAutorPorFiltro, paginar)
  .get("/autores/:id", AutorController.listarAutorPorId)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluirAutor);

export default router;