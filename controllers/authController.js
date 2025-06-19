import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const validateInput = (data, requiredFields) => {
    for (const field of requiredFields) {
        if (!data[field]) {
            return `${field} is required`;
        }
    }
    return null;
};

export const signup = async (req, res, next) => {
    const { email, password } = req.body;
    const validationError = validateInput(req.body, ['email', 'password']);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const validationError = validateInput(req.body, ['email', 'password']);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};