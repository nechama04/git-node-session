const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
         unique:true,
         lowercase:true,
         trim:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        lowercase:true,
    },
    address:{
        street:String,
        city:String,
        buildNumber:String,
        zipCode:String
    },
    phone:{
        type:Number
    },
    roles:{
        type:String,
        enum:['regular', 'manager'],
        default:'regular'
    },
    },
    {
        timestamps:true
    })
    module.exports=mongoose.model('User',userSchema)
    

