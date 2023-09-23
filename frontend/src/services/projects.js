import { projectApiUrl, apiMethods } from "../config/constants";
const { POST, PUT, PATCH } = apiMethods;

const getProjectsAPI = (token) => fetch(projectApiUrl, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

const createProjectAPI = (payload, token) => fetch(projectApiUrl, {
    method: POST,
    body: payload,
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});


const updateProjectAPI = (id, payload, token) => fetch(`${projectApiUrl}/${id}`, {
    method: PUT,
    body: payload,
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});

const updateProjectStatusAPI = (id, payload, token) => fetch(`${projectApiUrl}/${id}`, {
    method: PATCH,
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

export {
    getProjectsAPI,
    createProjectAPI,
    updateProjectAPI,
    updateProjectStatusAPI
}