const express = require('express');
const {check} = require('express-validator');
const ProjectController = require('../controllers/projectController')
const validate = require('../middlewares/validate');
const router = express.Router();

router.get('/',  ProjectController.getProjects)

router.get('/:projectId', [
    check('projectId').not().isEmpty().withMessage('invalid url'),
    check('projectId').isLength({min: 24}).withMessage('invalid url')

], validate, ProjectController.setProject, ProjectController.authGetProject, ProjectController.getOneProject)

router.post('/add', [
    check('name').not().isEmpty().withMessage('Project name cannot be null'),
    check('name').isLength({min: 7}).withMessage('Project name must at least 7 chars long'),

], validate, ProjectController.authAddProject, ProjectController.addNewProject)

router.delete('/:projectId', [
    check('projectId').not().isEmpty().withMessage('invalid url'),
    check('projectId').isLength({min: 24}).withMessage('invalid url')

], validate,  ProjectController.setProject, ProjectController.authDeleteProject, ProjectController.removeProject)

module.exports = router