const  mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,'username already exist']
    },
    email:{
        type:String,
        unique:[true,'email already exist'],
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    profilePic:{
        type:String,
        required:false,
        default:"no.jpg" 
    },

    timestamp:{
        type:Date,
        default:Date.now(),
    }
    
});
 

/* password to be encrypted */
userSchema.pre('save', async function(next) {
 
    if (!this.isModified("password")) {
            next();
    }
    this.password = await bcrypt.hash(this.password, 10);

  });

userSchema.methods.comparePassword= async function(password){
    
    return await bcrypt.compare(password, this.password)
}

  
module.exports= mongoose.model("User", userSchema);