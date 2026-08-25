import { Router } from 'express';
import {
  createCard, deleteCard, getCards, likeCard, unlikeCard,
} from '../controllers/cards.js';

const cardsRouter = Router();

cardsRouter.get('/', getCards);

cardsRouter.post('/', createCard);

cardsRouter.put('/:cardId/likes', likeCard);

cardsRouter.delete('/:cardId/likes', unlikeCard);

cardsRouter.delete('/:cardId', deleteCard);

export default cardsRouter;