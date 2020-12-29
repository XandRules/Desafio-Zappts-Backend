import * as Yup from 'yup';

import Letter from '../models/Letter';

class LetterController {

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        content : Yup.string().required(),
        user_id :Yup.string().required(),
        title :Yup.string().required()
  
      });


  
      console.log(req.role)
  
      if (!(await schema.isValid(req.body))) {
        return res.status(500).json({message: 'Validation fail'});
      }
  
      const newLetter = await Letter.create(req.body);    

      console.log(newLetter)
  
      return res.json({
        newLetter
      });
      
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "error": error
        });
      }
    }
  }

  
  async index(req, res) {

    console.log(req.role, req.userId)
    let letter = null;
    if(req.role === 'Santa'){
      letter = await Letter.findAll();
    }
    else{
      letter = await Letter.findAll({
        where: {
          user_id : req.userId
        }
      });
    }

    return res.json(letter);
  }
  
  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        content : Yup.string(),
        title : Yup.string(),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });
      
      const letter = await Letter.findByPk(req.params.id);

      if (!letter) {
        return res.status(500).json({
          error: 'Carta não encontrada'
        });
      }

      if(letter.user_id !== req.userId){
        return res.status(500).json({
          error: 'Carta não pode ser atualizada por não ser de sua autoria'
        });
      }

      const letterUpdated = await letter.update(
        req.body
      );

      return res.json(letterUpdated);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "error": error
        });
      }
    }

  }

  async delete(req, res) {

    try {
      const letter = await Letter.findByPk(req.params.id);

      if (!letter) {
        return res.status(500).json({
          error: 'Carta não encontrado'
        });
      }

      if(letter.user_id !== req.userId){
        return res.status(500).json({
          error: 'Carta não pode ser removida por não ser de sua autoria'
        });
      }

      const response = await Letter.destroy({
        where: {
          id: req.params.id
        }
      });

      return res.json(response);

    } catch (error) {
      return res.json({
        error: error
      });
    }

  }

}

export default new LetterController();
