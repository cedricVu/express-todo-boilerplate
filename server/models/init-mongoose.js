import Mongoose from 'mongoose';
import globalPlugin from './plugins/global';

Mongoose.plugin(globalPlugin);

export default Mongoose;