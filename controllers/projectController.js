const userService = require('../services/userService');
const helper = require('../helpers/common')
const projectService = require('../services/projectService')
const { canViewProject, canAddProject, canDeleteProject, scopedProjects } = require('../rbac/permissions')
const ObjectID = require('mongoose').Types.ObjectId; 

const getOneProject = (req, res) => {

    return helper.sendResponse(res, {success:true, project:req.project})

}

const getProjects = async (req, res) => {
    try {
        const projects = await projectService.getProjects()

        return helper.sendResponse(res, {success:true, projects:scopedProjects(req.user, projects)})

    } catch (e) {
        helper.prettyLog(`catching ${e}`)
        helper.log2File(e.message,'error')
        return helper.sendResponse(res, 500, {message:e.message, success:false})
    }
}

const addNewProject = async (req, res) => {
    try{
        const data = { name } = req.body

        const createdBy = ObjectID(req.user.id)

        Object.assign(data, {createdBy})

        await projectService.addProject(data)

        return helper.sendResponseMsg(res, 'Project successfully created', true, 200 )
    }
    catch(e){
        helper.prettyLog(`catching ${e}`)
        helper.log2File(e.message,'error')
        return helper.sendResponse(res, 500, {message:e.message, success:false})
    }
}   
const removeProject = async (req, res) => {
    try{
        const deleted = await projectService.deleteProject(req.params.projectId)
        
        return helper.sendResponseMsg(res, `${deleted ? 'Project successfully deleted':'Project not found'}`, true, 200 )
    }
    catch(e){
        helper.prettyLog(`catching ${e}`)
        helper.log2File(e.message,'error')
        return helper.sendResponse(res, 500, {message:e.message, success:false})
    }
}   



async function setProject(req, res, next){
    const projectId = req.params.projectId
    req.project = await projectService.getOneProject(projectId)
    
    if (req.project == null)
        return helper.sendResponseMsg(res, 'Project not found', false, 404)
    
    next()
}

function authGetProject(req, res, next) {
    if(!canViewProject(req.user, req.project))
        return helper.sendResponseMsg(res, 'Not Allowed', false, 401)

    next()
}

function authAddProject(req, res, next){
    if(!canAddProject(req.user))
        return helper.sendResponseMsg(res, 'Not Allowed', false, 401)

    next()
}

function authDeleteProject(req, res, next){
    if(!canDeleteProject(req.user, req.project))
        return helper.sendResponseMsg(res, 'Not Allowed', false, 401) 

    next()
}
module.exports = { 
    setProject,
    authGetProject,
    authAddProject,
    authDeleteProject,
    getOneProject,
    getProjects,
    addNewProject,
    removeProject,
    
}