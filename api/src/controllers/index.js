const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller function to handle GET requests
const getIndex = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

// Controller function to create a new user
const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const newUser = await User.create({ firstName, lastName, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(`This is the error: ${error}`);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

const uploadFile = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = file.path;
    const mimeType = file.mimetype;
    const fileName = file.originalname;

    try {
        const fileData = await uploadFileToDrive(filePath, mimeType, fileName);

        // Save file info to the database
        const newFile = await File.create({
            userId: req.user.id,
            name: fileData.name,
            googleId: fileData.id,
            size: fileData.size,
            webViewLink: fileData.webViewLink,
            createdAt: fileData.createdTime,
        });

        res.json(newFile);
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error);
        res.status(500).json({ error: 'Error uploading file to Google Drive.' });
    }
};

const getFiles = async (req, res) => {
    try {
        const files = await File.findAll({ where: { userId: req.user.id } });
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Error fetching files.' });
    }
};

module.exports = {
    getIndex,
    createUser,
    loginUser,
    uploadFile,
    getFiles
};