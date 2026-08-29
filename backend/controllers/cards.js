import mongoose from 'mongoose';
import Card from '../models/cards.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';

export async function getCards(req, res, next) {
  console.log(req)
  try {
    const cards = await Card.find({}).populate('owner');

    return res.status(200).json(cards);
  } catch (err) {
    return next(err);
  }
}

export async function createCard(req, res, next) {
  const { name, link } = req.body;

  try {
    const newCard = await Card.create({
      name,
      owner: req.user._id,
      link,
    });
    return res.status(201).json(newCard);
  } catch (err) {
    return next(err);
  }
}

export async function likeCard(req, res, next) {
  const { _id } = req.user;
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return next(new BadRequestError('Invalid card ID'));
  }

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: _id } },
      { new: true, runValidators: true },
    )
      .orFail(() => { throw new NotFoundError('Card not found'); });

    return res.status(200).json(updatedCard);
  } catch (err) {
    return next(err);
  }
}

export async function unlikeCard(req, res, next) {
  const { _id } = req.user;
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return next(new BadRequestError('Invalid card ID'));
  }

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: _id } },
      { new: true, runValidators: true },
    )
      .orFail(() => { throw new NotFoundError('Card not found'); });

    return res.status(200).json(updatedCard);
  } catch (err) {
    return next(err);
  }
}

export async function deleteCard(req, res, next) {
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return next(new BadRequestError('Invalid card ID'));
  }

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId)
      .orFail(() => { throw new NotFoundError('Card not found'); });
    return res.status(200).json(deletedCard);
  } catch (err) {
    return next(err);
  }
}