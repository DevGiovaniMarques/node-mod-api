import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg'

export interface PhraseInstance extends Model {
  id: number;
  author: string;
  phrase: string;
  
}

export const Phrase = sequelize.define<PhraseInstance>('Phrases',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.STRING,
  },
  phrase: {
    type: DataTypes.STRING,
    }
},{
  tableName: 'phrases',
  timestamps: false,
});