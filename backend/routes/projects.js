const express = require('express');
const { createProject, getAllProjects, updateProject, updateProjectStatus } = require('../controllers/projectController');
const requireAuth = require('../middleware/requireAuth');
const upload = require('../middleware/fileUpload');

const router = express.Router();

//require authentication for all routes
router.use(requireAuth);

router.get('/', getAllProjects);
router.post('/', upload.single("image"), createProject);
router.put('/:id', upload.single("image"), updateProject);
router.patch('/:id', updateProjectStatus);


module.exports = router;