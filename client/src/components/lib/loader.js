
import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export const clientPageLoader = async ({ request, params }) => {
    const userId = params.id;
    const token = localStorage.getItem("token");
    console.log(userId)
    const clientPromise = await apiRequest.get(`/client/clients/${userId}`)
    console.log(clientPromise)
    return defer({
        clientResponse: clientPromise
    })
}
