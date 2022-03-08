const user = require("../model/user")

module.exports = {

    create: async (req, res) => {

        const param = req.body
        if (!param.email) {
            return res.send('email is missing')
        }
        if (!param.password) {
            return res.send('password is missing')
        }
        const obj = await user.signUp(param)
        let message = obj.message
        let data = obj.data
        if (obj.status == true) {
            return res.status(200).send({ message, data })
        }
        return res.status(404).send({ message, data })

    },
    login: async (req, res) => {
        const param = req.body
        if (!param.email) {
            return res.send('email required')
        }
        if (!param.password) {
            return res.send('password required')
        }
        const obj = await user.login(param.email, param.password)
        let message = obj.message
        let data = obj.data
        if (obj.status == true) {
            return res.status(200).send({ message, data })
        }
        return res.status(404).send({ message, data })

    }
}