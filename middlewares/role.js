const helper = require('../helpers/common')

function authRole(role){
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401)
            return res.send('Not Allowed')
        }
        next()
    }
}
module.exports = {
    authRole
}