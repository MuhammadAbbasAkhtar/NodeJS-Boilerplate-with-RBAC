const Token = require('../models/token');

const getToken = async token => await Token.findOne({token}) 

const deleteUserToken = async userid => await Token.deleteMany({userId:userid})

const deleteToken = async token => await Token.findOneAndDelete({token})

const findTokens = async (fields) => await Token.find(fields)
module.exports = {
    getToken,
    deleteUserToken,
    deleteToken,
    findTokens
}