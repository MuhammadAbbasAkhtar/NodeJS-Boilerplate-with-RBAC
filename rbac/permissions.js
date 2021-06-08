const { ROLE } = require('./roles')
const ObjectID = require('mongoose').Types.ObjectId; 

function canViewProject(user, project){
    return (
        user.role === ROLE.ADMIN ||
        user.role === ROLE.MODERATOR ||
        project.createdBy == user.id
    )
}

function canAddProject(user, project){
    return (
        user.role === ROLE.ADMIN || user.role === ROLE.USER
    )
}

function canDeleteProject(user, project){
    return ( project.createdBy == user.id  )
}

function scopedProjects(user, projects){
    if(user.role === ROLE.ADMIN || user.role === ROLE.MODERATOR) return projects
    
    return projects.filter(project => project.createdBy == user.id)
}

module.exports = {
    canViewProject,
    canAddProject,
    canDeleteProject,
    scopedProjects
}