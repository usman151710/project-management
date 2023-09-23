const cloudinary = require('cloudinary');
const { default: mongoose } = require('mongoose');
const Project = require('../models/projectModel');
const { promisify } = require('util');
const cloudinaryUpload = promisify(cloudinary.v2.uploader.upload);

const getAllProjects = async (req, res) => {
    const user_id = req.user._id
    const projects = await Project.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
}

const createProject = async (req, res) => {
    const { name, description, githubUrl, siteUrl, techStacks } = req.body;
    const user_id = req.user._id;

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const result = await cloudinaryUpload(req.file.path);

        const project = await Project.create({
            name,
            description,
            githubUrl,
            siteUrl,
            techStacks,
            imageUrl: result.secure_url,
            user_id,
            status: 'active',
        });

        res.status(201).json(project);
    } catch (error) {
        console.error('Error in createProject:', error);
        res.status(400).json({ error: error.message });
    }
};

const updateProject = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user._id;
    const { name, description, githubUrl, siteUrl, techStacks } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Project not found " })
    }

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const result = await cloudinaryUpload(req.file.path);

        const project = await Project.findOneAndReplace(
            { _id: id },
            {
                name,
                description,
                githubUrl,
                siteUrl,
                techStacks,
                imageUrl: result.secure_url,
                user_id,
                status: 'active',
            },
            { returnOriginal: false });

        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateProjectStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Project not found " })
    }

    if (status === "active") return res.status(400).json({ error: "Incorrect payload!" });

    try {
        const project = await Project.findOneAndUpdate({ _id: id }, { status }, { returnOriginal: false });
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createProject, getAllProjects, updateProject, updateProjectStatus };