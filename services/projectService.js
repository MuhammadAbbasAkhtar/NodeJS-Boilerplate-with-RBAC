const Project = require('../models/project');
var ObjectID = require('mongoose').Types.ObjectId; 

const addProject = async data => { return await new Project(data).save() }

const getProjects = async () => { return await Project.find({}) }

const getOneProject = async projectID => { return await Project.findById(projectID) }

const deleteProject = async projectID => { 
    var deleted = false
    await Project.findByIdAndRemove(projectID, function (err, docs) { if (err){ } else  deleted = true })
    return deleted;
}

module.exports = {
    addProject,
    getProjects,
    getOneProject,
    deleteProject
}