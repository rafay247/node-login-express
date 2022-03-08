const express = require('express');
const mongoose = require('mongoose');
const routes = require("./config/routes")

const app = express();
app.use(express.urlencoded({ extended: true }));//form data to JSON
app.use(express.json())// req body to JOSN

async function main() {
    await mongoose.connect('mongodb://localhost:27017/newdb')
    console.log('successfully connected to server ')
}
app.use(routes)

main()
app.listen(3000, function () {
    console.log("Server running on 3000")
})