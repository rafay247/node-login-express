const mongoose = require("mongoose");

const token = require("./token");
var bcrypt = require('bcryptjs');

const modelSchema = new mongoose.Schema({

    name: { type: String, default: 'abc' },
    email: { type: String },
    password: { type: String },

}, { collection: "user" });

const user = mongoose.model("user", modelSchema);

module.exports = {
    signUp: async (params) => {

        params.email = params.email.toLowerCase()
        //hash password
        params.password = await bcrypt.hashSync(params.password);
        let obj = await user.findOne({ email: params.email })
        if (obj) {
            return { status: false, message: 'email already exist', data: '' }
        }
        const doc = new user(params);
        await doc.save();
        console.log(doc._id);

        let accessToken = await token.createToken(doc._id)
        doc.Token = accessToken.Token
        return { status: true, message: 'sign up successfully !!', data: doc }

    },
    login: async (email, password) => {

        email = email.toLowerCase()
        let User = await user.findOne({ email: email })
        if (User) {
            passwordCheck = await bcrypt.compareSync(password, User.password)
            if (!passwordCheck) {
                return ({ status: false, data: '', message: 'invalid password' })
            }
            let accessToken = await token.createToken(User.id)
            User.Token = accessToken.Token
            return ({ status: true, data: User, message: 'login successfully' })
        }
        else {
            return ({ status: false, data: '', message: 'invalid email' })
        }
    }
    , user

}