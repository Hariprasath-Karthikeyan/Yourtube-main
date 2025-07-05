import mongoose from "mongoose";
const pointschema = mongoose.Schema({
  email: { type: String, required: true },
  points: {type: Number, required: true}
});

export default mongoose.model("Points", pointschema);
