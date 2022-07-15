
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { ProjectObjectData } from "../SimplerR/auth";

export const getUserApi = async () => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

};

export const getUserApiOrgnization_id = async () => {
    const token = reactLocalStorage.get("access_token", false);
    const organization_id = reactLocalStorage.get("organization_id", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/${organization_id}/user`, {
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

    const projectobjectdata = ProjectObjectData.use()

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

export const getAllOrganization = async () => {
    const token = reactLocalStorage.get("access_token", false);
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/organization`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getUserByOrgId = async (org_id) => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/organization/${org_id}/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getUserById = async (user_id) => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/${user_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getOrganizationByUserId = async (user_id) => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${user_id}/organization`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getOrganizationById = async (org_id) => {
    const token = reactLocalStorage.get("access_token", false);

    return await axios.get(`${process.env.REACT_APP_BASE_URL}/api/organization/${org_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};