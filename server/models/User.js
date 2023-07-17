const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

 const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password:{
            type: String,
            required: true 
        },
        surfs: [{
            type: Schema.Types.ObjectId,
            ref: 'Surfs'
        }],
    },
        {
            toJson: {
                virtuals: true
            }
        }

        
 );
 // hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // custom method to compare and validate password for logging in
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  userSchema.virtual('surfCount').get(function(){
    return this.surfs.length
  })

  const User = mongoose.model('User', userSchema);
  module.exports = User