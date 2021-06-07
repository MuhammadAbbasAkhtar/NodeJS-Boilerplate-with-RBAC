const path = require('path');
const pino = require('pino')
const log4js = require("log4js");
var jwtDecode = require('jwt-decode');
const userService = require('../services/userService.js')
const IP  = require('ip');
//#region Log4js Config
    log4js.addLayout('json', function(config) {
        return function(logEvent) { 
            return `[${JSON.stringify(logEvent.startTime)}] [${JSON.stringify(logEvent.level.levelStr)}] ${JSON.stringify(logEvent.data)} ${JSON.stringify(logEvent.callStack).split('\\n')[1].replace('"','').replace("   ",'').replaceAll(String.fromCharCode(92,92),String.fromCharCode(92))} ` ; 
        }
    });
    log4js.configure(
        {
            "appenders": { 
                "error": { 
                    "type": "file",  
                    "filename": "logs/error.log",
                    "maxLogSize": 100 * 1024 * 1024, // = 10Mb
                    "level": "error",
                    "layout": { "type": 'json', separator: ','} ,
                    backups: 3, compress: true
                    // type: 'stdout',
                    // layout: {
                    //     type: 'pattern', pattern: '%d %p %c %f:%l %m%n'
                    // }
                    // mode: 0o0640,
                    // flags: 'w+'
                }, 
                "info": { 
                    "type": 'file', 
                    "maxLogSize": 100 * 1024 * 1024, // = 100Mb
                    "filename": 'logs/info.log' ,
                    "level": "info",
                    backups: 3, compress: true
                    // type: 'stdout',
                    // layout: {
                    //     type: 'pattern', pattern: '%d %p %c %f:%l %m%n'
                    // }

                }
            }, 
            "categories": { 
                "default": { "appenders": ["error", 'info'], "level": 'DEBUG'},  
                "info": { "appenders": ['info'], "level": 'info', enableCallStack: true}  ,  
                "error": { "appenders": ["error"], "level": 'error', enableCallStack: true}  ,  
            }
        }
    );
//#endregion
const logger = pino({
    prettyPrint: {},
    prettifier: require('pino-colada') 
})

const prettyLog = (msg, label = null) => {
    if(label === null) logger.info(msg)
    else logger.info(label+" :>> "+ msg)
}
const sendResponse = (res, code, obj) => {
    if(!Number.isInteger(code)){
        obj = code;
        code = 200
    }
    if(!res.headersSent)
    return res.status(code).json(obj)
}

const sendResponseMsg = (res, message, success, code) => {
    if(!res.headersSent)
    return res.status(code).json({message, success})
}
const baseDIR = subdir => {
    return path.join(__dirname, subdir);
}

const log2File = (msg, type) => {
    const logger4js = log4js.getLogger(type);  
    logger.level = "debug";
    logger4js[type](msg) 
}
const decodeToken = req =>{
    const authorization = req.headers.authorization;
    const token = authorization.split('Bearer ')[1];
    return jwtDecode(token);
}
const getUserWithFields = async (req, fields) =>{
    const decoded = decodeToken(req)
    return await userService.getUserByEmailWithFields(decoded.email, fields)
}

const handleRedirect = (req, res) => { 
    const targetUrl = config.targetBaseUrl + res.Url;
    res.redirect(targetUrl);
}


const getLocalIP = () => { 
    return IP.address()
}
module.exports = {
    sendResponse,
    sendResponseMsg,
    prettyLog,
    baseDIR,
    log2File,
    decodeToken,
    getUserWithFields,
    handleRedirect,
    getLocalIP
}