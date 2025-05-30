import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    //_id: {type: mongoose.Schema.Types.ObjectId},
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório"]
    },
    nacionalidade: {type: String},
    imagem: {
      type: String,
      required: [false, "A imagem do(a) autor(a) não é obrigatória"],
    }
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;