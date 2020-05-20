import mongoose from 'mongoose';
import PoolSchema from '../schemas/pool.schema';

const { model } = mongoose;
const Pool = model('Pool', PoolSchema);

export default Pool;
