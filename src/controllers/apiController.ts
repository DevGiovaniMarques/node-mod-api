import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { Phrase } from '../models/Phrases';

export const ping = (req: Request, res: Response) => {
  res.json({pong:true});
};

export const random = (req: Request, res: Response) => {
  let nRand : number = Math.floor(Math.random() * 10);
  res.json({number:nRand});
};

export const nome = (req: Request, res: Response) => {
  let nome : string = req.params.nome;
  res.json({nome});
}

export const createPhrase = async (req: Request, res: Response) => {
  let { author, phrase} = req.body;

  let newPhrase = await Phrase.create({author,phrase});
  res.json({author, phrase});
}

export const listPhrase = async (req: Request, res: Response) => {
  let list = await Phrase.findAll();
  res.json(list);
}

export const getPhrase = async (req: Request, res: Response) => {
  let { id } = req.params;
  let phrase = await Phrase.findByPk(id);

  if(phrase) {
    res.json(phrase);
  } else {
   res.json({error: 'Frase não encontrada'});
  }
};

export const updatePhrase = async (req: Request, res: Response) =>{
  let { id } = req.params;
  let { author, phrase } = req.body;

  let updatePhrases = await Phrase.findByPk(id);

  if(updatePhrases) {
    updatePhrases.author = author;
    updatePhrases.phrase = phrase;
    await updatePhrases.save();
    res.json(updatePhrases);
  } else {
   res.json({error: 'Frase não encontrada'});
  }
};

export const deletePhrase = async (req: Request, res: Response) => {
  let { id } = req.params;

  await Phrase.destroy({where:{id}});
  res.json();
};

export const randomPhrase = async (req: Request, res: Response) => {
  let phrase = await Phrase.findOne({
    order:[
        Sequelize.fn('RANDOM')
       ]
  });
  if(phrase){
      res.json({phrase});
    } else {
      res.json({error: 'Frase não encontrada'});
    }
};