
const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({

    Token: { type: String, },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, { collection: "token" });

const token = mongoose.model("token", modelSchema);

module.exports = {
    createToken: async (userId) => {
        let randomToken = require('random-token');
        let Token = randomToken(16)
        let accessToken = new token({ Token, userId })
        await accessToken.save();
        return (accessToken);
    }, token
}