import express from "express";
import EditoraController from "../controllers/editorasController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Editoras
 *   description: Endpoints para gerenciamento de editoras
 */

/**
 * @swagger
 * /editoras:
 *   get:
 *     summary: Lista todas as editoras
 *     tags: [Editoras]
 *     responses:
 *       200:
 *         description: Lista completa de editoras
 *   post:
 *     summary: Cadastra uma nova editora
 *     tags: [Editoras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Editora cadastrada com sucesso
 */

/**
 * @swagger
 * /editoras/busca:
 *   get:
 *     summary: Busca editoras por filtro
 *     tags: [Editoras]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome da editora
 *     responses:
 *       200:
 *         description: Lista de editoras filtrada
 */

/**
 * @swagger
 * /editoras/{id}:
 *   get:
 *     summary: Busca uma editora por ID
 *     tags: [Editoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da editora
 *     responses:
 *       200:
 *         description: Editora encontrada
 *       404:
 *         description: Editora não encontrada
 *   put:
 *     summary: Atualiza uma editora por ID
 *     tags: [Editoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da editora
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Editora atualizada com sucesso
 *       404:
 *         description: Editora não encontrada
 *   delete:
 *     summary: Remove uma editora por ID
 *     tags: [Editoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da editora
 *     responses:
 *       200:
 *         description: Editora removida com sucesso
 *       404:
 *         description: Editora não encontrada
 */

router
  .get("/editoras/paginado", EditoraController.listarEditorasPaginado, paginar)
  .get("/editoras", EditoraController.listarEditorasCompleto)
  .get("/editoras/busca", EditoraController.listarEditoraPorFiltro, paginar)
  .get("/editoras/:id", EditoraController.listarEditoraPorId)
  .post("/editoras", EditoraController.cadastrarEditora)
  .put("/editoras/:id", EditoraController.atualizarEditora)
  .delete("/editoras/:id", EditoraController.excluirEditora);

export default router;