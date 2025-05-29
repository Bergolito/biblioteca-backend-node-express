import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, editoras, livros } from "../models/index.js";

class LivroController {

  static listarLivrosPaginado = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivrosCompleto = async (req, res, next) => {
    try {

      const livroResultado = await livros.find()
        .populate("autor", "nome")
        .populate("editora", "nome")
        .sort({ titulo: 1 })
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
    
      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    console.log('listarLivroPorFiltro => ', req.query);
    try {
      const busca = await processaBusca(req.query);
      console.log('busca => ', busca);
      
      if (busca !== null) {
        const livrosResultado = livros
          .find(busca)
          .populate("autor")
          .populate("editora");

        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };

}

async function processaBusca(parametros) {
  console.log('params => ', parametros);

  const { titulo, autor, editora, numeroPaginas } = parametros;

  let busca = {};

  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (editora) busca.editora = editora;
  if (autor) busca.autor = autor;

  // autor
  if (autor) {
    console.log('autor => ', autor);
    const autorEncontrado = await autores.findById(autor);
    console.log('autorEncontrado => ', autorEncontrado);

    if (autorEncontrado !== null) {
      busca.autor = autorEncontrado._id;
    } else {
      busca = null;
    }
  } 

  // editora
  if (editora) {
    console.log('editora => ', editora);
    const editoraEncontrada = await editoras.findById(editora);
    console.log('editoraEncontrada => ', editoraEncontrada);

    if (editoraEncontrada !== null) {
      busca.editora = editoraEncontrada._id;
    } else {
      busca = null;
    }
  }

  // numeroPaginas
  if (numeroPaginas) busca.numeroPaginas = Number(numeroPaginas);

  return busca;
}

export default LivroController;