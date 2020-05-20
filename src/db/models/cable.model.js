import mongoose from 'mongoose';
import CableSchema from '../schemas/cable.schema';

const { model } = mongoose;
const Cable = model('Cable', CableSchema);

export default Cable;
