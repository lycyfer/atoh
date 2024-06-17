import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) return res.status(401).json({ message: "Not Authenticated!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Token is not Valid!" });

        console.log(payload)
        const user = await prisma.users.findUnique({ where: { id: payload.id } });
        console.log(user)
        if (!user) return res.status(404).json({ message: "User not found!" });


        next();
    });
};


export const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Not Authenticated!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded)
        req.id = decoded.id;

        const user = await prisma.users.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = {
            firstName: user.firstName,
            secondName: user.secondName,
            patronymic: user.patronymic
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Failed to authenticate token' });
    }
};
