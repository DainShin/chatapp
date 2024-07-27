const User = require("../Models/user")
const userController = {}

userController.saveUser=async(userName, sid)=> {
    // check if the user already exits
    let user = await User.findOne({ name:userName });
    // if the user doesn't exit -> create  new user
    if(!user) {
        user = new User({
            name:userName,
            token:sid,
            online:true,
        });
    }
    // if the user already exits -> change the token value only
    user.token = sid
    user.online = true

    // save the updated user info
    await user.save();
    return user;
};

userController.checkUser=async(sid)=>{
    const user = await User.findOne({token:sid});
    if(!user) throw new Error("User not found");
    return user;
};

module.exports = userController