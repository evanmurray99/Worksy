/* eslint-disable no-unused-vars */
import axios from "axios";

export function  getCategories(){
    const apiUrl = 'http://127.0.0.1:3001/api/categories';

    return axios.get(apiUrl)
        .then((response) => {
            if (response.status === 200) {
                // Assuming the response contains an array of category names
                const categoryNames = response.data;
                return { success: true, Categories: categoryNames };
            } else {
                return { success: false, error: `Failed to fetch categories. Error: ${response.status}` };
            }
        })
        .catch((error) => {
            return { success: false, error: `Failed to fetch categories: ${error.response ? error.response.data.message : error.message}` };
        });
}

export function servicesByCategory(name){
    const apiUrl = `http://127.0.0.1:3001/api/categories/${name}`;

    return axios.get(apiUrl)
        .then((response) => {
            if (response.status === 200) {
               
                const services = response.data;
                return { success: true, services: services };
            } else {
                return { success: false, error: `Failed to fetch categories. Error: ${response.status}` };
            }
        })
        .catch((error) => {
            return { success: false, error: `Failed to fetch categories: ${error.response ? error.response.data.message : error.message}` };
        });
}

