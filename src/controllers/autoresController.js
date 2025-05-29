import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    console.log('listarAutorPorId req.params => ', req.params);
    console.log('listarAutorPorId req.query => ', req.query);
    try {
      const id = req.params.id;
      console.log('listarAutorPorId => id => ', id);

      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorFiltro = async (req, res, next) => {
    console.log('listarAutorPorFiltro => ', req.query);
    try {

      const busca = await processaBusca(req.query);

      console.log('busca => ', busca);
      
      if (busca !== null) {
        const autoresResultado = autores.find(busca);
        console.log('autoresResultado => ', autoresResultado);
        
        req.resultado = autoresResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      console.log('Erro no listarAutorPorFiltro => ', erro);
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndDelete(id);


      if (autorResultado !== null) {
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  console.log('params => ', parametros);

  const { nome } = parametros;

  let busca = {};

  if (nome) busca.nome = { $regex: nome, $options: "i" };

  return busca;
}  

export default AutorController;