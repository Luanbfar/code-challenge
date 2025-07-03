import { Mongo } from 'meteor/mongo';
import { Community as ICommunity } from '../types';

export const Communities = new Mongo.Collection<ICommunity>('communities');
