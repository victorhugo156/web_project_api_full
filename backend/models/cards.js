import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const linkRegex = /^(https?:\/\/)(www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]+#?$/;
        return linkRegex.test(v);
      },
      message: 'Invalid URL',
    },
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model('card', cardSchema);

export default Card;