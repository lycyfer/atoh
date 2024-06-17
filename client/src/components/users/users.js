import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./users.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import Time from 'react-time-format'
import apiRequest from "../lib/apiRequest";
import noAvatar from "./no-avatar.png"

const User = () => {
    const { currentUser } = useContext(AuthContext);
    const data = useLoaderData()
    console.log(currentUser);
    const [isDate, setIsDate] = useState()
    const [clients, setClients] = useState(data.clientResponse.data || []);
    console.log(clients)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    console.log(data)
    let date = new Date(`${isDate}`);
    const handleLogout = async () => {
        try {
            await apiRequest.post("auth/logout")
            navigate("/");
            localStorage.removeItem("user")
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (currentUser) {
            setIsLoading(false)
        }
    })
    useEffect(() => {
        setClients(data.clientResponse.data || [])
    }, [data])
    useEffect(() => {
        console.log('Clients updated:', clients)
    }, [clients]);
    const handleStatusChange = async (clientId, newStatus) => {
        try {
            const response = await apiRequest.put('/client/clients/status', {
                clientId,
                newStatus
            });
            const updatedClient = response.data;
            console.log('Updated Client:', updatedClient);
            setClients(clients.map(client =>
                client.id === clientId ? updatedClient : client
            ));
        } catch (error) {
            console.error('Error updating client status:', error);
        }
    };

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className="user">
            <div class="background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="user_header">
                <div className="currentUser">
                    <img src={currentUser.user.Avatar || { noAvatar }} alt="" />
                    <span>{currentUser.user.firstName}</span>
                </div>
                <button className="user_header_button" onClick={handleLogout}>
                    Выйти
                </button>
            </div>
            <div className="user_block">
                {data.clientResponse.data.map((item) => {

                    return (
                        <div key={item.id} className="user_block_item">
                            <p>AccountNumber:{" "}{item.AccountNumber}</p>
                            <div className="user_block_item_header">
                                <img src={item.Avatar} alt="" />
                                <span>{item.FirstName}</span>
                            </div>
                            <p>LastName:{" "}{item.LastName}</p>
                            <p>Patronymic:{" "} {item.Patronymic}</p>
                            <p>Date Of Birthday:{" "}<Time format="YYYY.MM.DD hh:mm" value={new Date(`${item.DateOfBirth}`)} /></p>
                            <p>INN:{" "}{item.INN}</p>
                            <select className="status-input"
                                value={item.Status}
                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            >
                                <option value="NotInWork">NotInWork</option>
                                <option value="AtWork">AtWork</option>
                                <option value="Rejection">Rejection</option>
                                <option value="DealIsClosed">DealIsClosed</option>
                            </select>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default User;
