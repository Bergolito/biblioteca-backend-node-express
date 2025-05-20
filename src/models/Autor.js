import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    //"_id": ObjectId(),
    //_id: {type: ObjectId(), auto: true},
    id: {type: String},
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório"]
    },
    nacionalidade: {type: String}
  },
  {
    versionKey: false
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;