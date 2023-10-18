/* eslint-disable no-unused-vars */
import axios from "axios";

export function addService(seller, description, title, price, categories){
    const apiUrl = `http://127.0.0.1:3001/api/services/`;

    var requestBody = {
        seller: seller,
        price: price,
        description: description,
        title: title,
        created: Date.now(),
        updated: Date.now(),
        categories: categories,
    };

    // Store sellerId and serviceId
    let sellerId;
    let serviceId;

    return axios
        .post(apiUrl, requestBody)
        .then((response) => {
            if (response.status === 201) {
                sellerId = response.data.seller;
                serviceId = response.data._id;

                // Array to store success/failure of category addition requests
                const categoryAddRequests = [];

                // Loop through categories to add service to each category
                categories.forEach((categoryName) => {
                    const categoryUrl = `http://127.0.0.1:3001/api/categories/${categoryName}/add-service/${serviceId}`;
                    const categoryRequest = {
                        method: 'PUT', // Use the PUT method to add service to category
                    };

                    categoryAddRequests.push(
                        axios(categoryUrl, categoryRequest)
                            .then((categoryResponse) => categoryResponse.status === 200)
                            .catch((categoryError) => false)
                    );
                });

                // Check if all category addition requests are successful
                return Promise.all(categoryAddRequests).then((categoryAddResults) => {
                    if (categoryAddResults.some((result) => !result)) {
                        // If any category addition request failed, roll back by removing service from all categories
                        return rollback(serviceId, categories)
                            .then((rollbackResult) => {
                                return { success: false, error: 'Category addition failed', rollback: rollbackResult };
                            });
                    } else {
                        // Update the user's list of services
                        const userServicesUrl = `http://127.0.0.1:3001/api/users/${sellerId}/add-service/${serviceId}`;
                        const userServicesRequest = {
                            method: 'PUT', // Use the PUT method to add service to user's services
                        };

                        return axios(userServicesUrl, userServicesRequest)
                            .then((userServicesResponse) => {
                                if (userServicesResponse.status === 200) {
                                    return { success: true, message: 'Service created and added to categories and user' };
                                } else {
                                    return { success: false, error: `Could not update user's services. Error: ${userServicesResponse.status}` };
                                }
                            })
                            .catch((userServicesError) => {
                                return { success: false, error: `Could not update user's services: ${
                                    userServicesError.response ? userServicesError.response.data.message : userServicesError.message
                                }` };
                            });
                    }
                });
            } else {
                return { success: false, error: `Could not create service. Error: ${response.status}` };
            }
        })
        .catch((error) => {
            return {
                success: false,
                error: `Could not create service: ${
                    error.response ? error.response.data.message : error.message
                }`,
            };
        });
}

const rollback = (serviceId, categories) => {
    const categoryRemoveRequests = categories.map((categoryName) => {
        const categoryUrl = `http://127.0.0.1:3001/api/categories/${categoryName}/remove-service/${serviceId}`;
        const categoryRequest = {
            method: 'DELETE', // Use the DELETE method to remove service from category
        };

        return axios(categoryUrl, categoryRequest)
            .then((categoryResponse) => categoryResponse.status === 200)
            .catch((categoryError) => false);
    });

    return Promise.all(categoryRemoveRequests)
        .then((categoryRemoveResults) => {
            if (categoryRemoveResults.every((result) => result)) {
                return { success: true, message: 'Rollback successful' };
            } else {
                return { success: false, error: 'Rollback failed' };
            }
        });
};


