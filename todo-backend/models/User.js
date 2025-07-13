const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

// Cascade delete: Remove all todos when user is deleted
userSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
  try {
    const user = await this.model.findOne(this.getFilter());
    if (user) {
      // Delete all todos belonging to this user
      const TodoItem = mongoose.model('TodoItem');
      await TodoItem.deleteMany({ user: user._id });
      console.log(`Deleted all todos for user: ${user.email}`);
    }
    next();
  } catch (error) {
    console.log('Error in cascade delete:', error);
    next();
  }
});

module.exports = mongoose.model('User', userSchema);