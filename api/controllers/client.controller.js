import prisma from "../lib/prisma.js";


export async function getClientsByUser(req, res) {
    const userId = req.params.id;
    console.log(userId)
    try {
        const user = await prisma.users.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const responsibleFullName = `${user.firstName} ${user.secondName} ${user.patronymic || ''}`.trim();
        const clients = await prisma.clients.findMany({
            where: {
                Responsible: responsibleFullName
            }
        });
        console.log(clients, user)

        res.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: 'Error fetching clients', error });
    }
}

export async function updateClientStatus(req, res) {
    const { clientId, newStatus } = req.body;
    console.log(clientId, newStatus)
    if (!clientId || !newStatus) {
        return res.status(400).json({ message: 'Missing clientId or newStatus' });
    }

    try {
        const updatedClient = await prisma.clients.update({
            where: {
                id: clientId
            },
            data: {
                Status: newStatus
            }
        });
        console.log(updatedClient)
        res.json(updatedClient);
    } catch (error) {
        console.error('Error updating client status:', error);
        res.status(500).json({ message: 'Error updating client status', error });
    }
}


export async function createClient(req, res) {
    const { AccountNumber, LastName, FirstName, Patronymic, DateOfBirth, INN, Responsible, Avatar } = req.body;
    console.log(AccountNumber, LastName, FirstName, Patronymic, DateOfBirth, Responsible, Avatar);
    if (!AccountNumber || !LastName || !FirstName || !DateOfBirth || !INN || !Responsible) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newClient = await prisma.clients.create({
            data: {
                AccountNumber,
                LastName,
                FirstName,
                Patronymic,
                DateOfBirth,
                INN,
                Responsible,
                Avatar
            }
        });

        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Error creating client', error });
    }
}