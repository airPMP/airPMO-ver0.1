
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

export const getProjectApi = async () => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const getCategorieApi = async () => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories`, {
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
    const user_id = reactLocalStorage.get("user_id", false);
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/assign_user_data/${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};



 

