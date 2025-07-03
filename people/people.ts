import { Mongo } from 'meteor/mongo';
import { Person as IPerson} from '../types';

export const People = new Mongo.Collection<IPerson>('people');
