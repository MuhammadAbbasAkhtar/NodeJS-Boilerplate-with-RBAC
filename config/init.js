const config = require('./keys')
const DIRHelper  = require('../helpers/DIR_helper')
const helper = require('../helpers/common')

const createDirectories = async () => {
    try {
        Object.values(config.directories).forEach(d => { 
            if(!DIRHelper.checkDIR(d)){ 
                DIRHelper.createDIR(d) 
                console.log(`Directory ${d} Created Successfully`)
            }  
        })          
    } catch (error) {
        helper.log2File(error.message,'error')
    }
}



createDirectories()

