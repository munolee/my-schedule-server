import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  pw: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
