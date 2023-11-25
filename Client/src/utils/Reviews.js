/* eslint-disable no-unused-vars */
import axios from 'axios';

const deleteReview = (id) => {
	const apiUrl = `http://127.0.0.1:3001/api/reviews/${id}`;

	return axios
		.delete(apiUrl)
		.then((response) => {
			if (response.status === 200) {
				return { success: true, error: null };
			} else {
				return {
					success: false,
					error: `Failed to delete Service. Error: ${response.status}`,
				};
			}
		})
		.catch((error) => {
			return {
				success: false,
				error: `Failed to delete Service: ${
					error.response ? error.response.data.message : error.message
				}`,
			};
		});
};

export {deleteReview};
