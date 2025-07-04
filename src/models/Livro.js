import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"]
    },
    subtitulo: {
      type: String,
      required: [false, "O subtítulo do livro não é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório"]
    },
    editora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "editoras",
      required: [true, "A editora é obrigatória"]
    },    
    edicao: {
      type: Number,
      required: [false, "A edição não é obrigatória"],
    },
    ano: {
      type: Number,
      required: [false, "O ano de publicação não é obrigatório"],
    },
    isbn: {
      type: String,
      required: [false, "O ISBN não é obrigatório"],
      validate: {
        validator: (valor) => {
          return valor.length === 13;
        },
        message: "O ISBN deve conter 13 caracteres. Valor fornecido: {VALUE}"
      }
    },
    numeroPaginas: {
      type: Number,
      required: [false, "A quantidade de páginas não é obrigatória"],
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    }
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;