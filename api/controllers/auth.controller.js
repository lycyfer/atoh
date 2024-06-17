
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';


export async function register(req, res) {
    const { firstName, secondName, patronymic, Login, Password, Avatar } = req.body;
    console.log(firstName, secondName, patronymic, Login, Password, Avatar);
    try {
        const hashedPassword = await bcrypt.hash(Password, 10);
        console.log(hashedPassword)
        const user = await prisma.users.create({
            data: {
                firstName,
                secondName,
                patronymic,
                Login,
                Password: hashedPassword,
                Avatar
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
        console.log(error)
    }
}

export async function login(req, res) {
    const { Login, Password } = req.body;
    console.log(Login, Password);
    try {
        const user = await prisma.users.findUnique({ where: { Login } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in', error });
    }
}

export async function logout(req, res) {
    res.json({ message: 'Logged out successfully' });
}