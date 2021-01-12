import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const ActorSchema = new Schema({
  adult: { type: Boolean },
  id: { type: Number, required: true, unique: true },
  birthday: { type: String },
  deathday: { type: String },
  gender: { type: Number },
  homepage: { type: String },
  known_for_department: { type: String },
  name: { type: String },
  place_of_birth: { type: String },
  popularity: { type: Number }
  
});

ActorSchema.statics.findByActorDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Actors', ActorSchema);


