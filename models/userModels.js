import mongoose from "mongoose";

const userSchema  = mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Must provide a email address"],
        unique: [true, "Email already taken"],
    },
    image: {
        type: String,
    }, 
    sub : {
        type:String,
    },
    role:{
        type:String,
        default: "user"
    }
}, {timestamps: true})


// delete mongoose.connection.models['User'];

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;