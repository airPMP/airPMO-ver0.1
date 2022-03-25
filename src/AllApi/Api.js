
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

export const getUserApi = async () => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
};


export const getRoleApi = async () => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/roles`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getClientApi = async () => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/client`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const getAllJobCardApi = async () => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_all_job_card`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getMyJobCardApi = async () => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/find_all_assign_job_card`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};



 

