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
  
  module.exports = {
    getIndex,
    createUser,
    loginUser
  };