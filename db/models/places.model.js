import { mongoose } from 'mongoose';
import PlacesSchema from '../schemas/places.schema';

const { model } = mongoose;
const Places = model('Places', PlacesSchema);

export default Places;
