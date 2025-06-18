import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Endpoints para gerenciamento de livros
 */

/**
 * @swagger
 * /livros/paginado:
 *   get:
 *     summary: Lista livros paginados
 *     tags: [Livros]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: ordenacao
 *         schema:
 *           type: string
 *         description: Campo de ordenação
 *     responses:
 *       200:
 *         description: Lista de livros paginada
 */

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista completa de livros
 *   post:
 *     summary: Cadastra um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Livro cadastrado com sucesso
 */

/**
 * @swagger
 * /livros/busca:
 *   get:
 *     summary: Busca livros por filtro
 *     tags: [Livros]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Título do livro
 *       - in: query
 *         name: editora
 *         schema:
 *           type: string
 *         description: ID da editora
 *       - in: query
 *         name: nomeAutor
 *         schema:
 *           type: string
 *         description: Nome do autor
 *       - in: query
 *         name: numeroPaginas
 *         schema:
 *           type: integer
 *         description: Número de páginas
 *     responses:
 *       200:
 *         description: Lista de livros filtrada
 */

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro por ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 *   put:
 *     summary: Atualiza um livro por ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 *   delete:
 *     summary: Remove um livro por ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro removido com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router
  .get("/livros/paginado", LivroController.listarLivrosPaginado, paginar)
  .get("/livros", LivroController.listarLivrosCompleto)
  .get("/livros/busca", LivroController.listarLivroPorFiltro, paginar)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);

export default router;