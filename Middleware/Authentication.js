
const axios = require('axios');
const secretKey = "GBL9Df0RWIYcA4ZbYiBGjNESysa0AesF"
const isValidEmail = (email, isStudent) => {
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (isStudent) {
      return email.endsWith('@myumanitoba.ca') && emailRegex.test(email);
    } else {

      return emailRegex.test(email);
    }
  };

  const getUser = (token) => {
    const apiUrl = `http://127.0.0.1:3001/api/users/${token}/auth`;
    return axios.get(apiUrl)
      .then((response) => {return response.data}) 
      .catch((error) => {
        return {
          success: 'sheesh',
          error: error,
        };
      });
  };

const login = (email, password) => {
    const apiUrl = 'http://127.0.0.1:3001/api/users/login';
    const requestBody = {
      email: email,
      password: password,
    };
  
    return axios.post(apiUrl, requestBody)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return {
            token : response.data.token, 
            error : null
          }
        } else {
            return {
                token : null, 
                error : `Login failed with status code: ${response.status}`
            }
          
        }
      })
      .catch((error) => {
        return {
            token : null, 
            error : `Login failed: ${error.response.data.message}`
        }
        
        
      });
  };

  const signUp = (firstName, lastName, email, password, isStudent) => {
    const apiUrl = 'http://127.0.0.1:3001/api/users/';
  
    if (!isValidEmail(email, isStudent)) {
      const message = isStudent ? "Please enter a valid University of Manitoba student email address" :  "Please enter a valid email address"
      return Promise.resolve({ success: false, error: message });
    }
  
    const requestBody = {
      firstName,
      lastName,
      email,
      password,
      isStudent,
    };
  
    return axios.post(apiUrl, requestBody)
      .then((response) => {
        if (response.status === 201) {
          return { success: true, error: null };
        } else {
          return { success: false, error: `Sign-up failed with status code: ${response.status}` };
        }
      })
      .catch((error) => {
        return { success: false, error: `Sign-up failed: ${error.response ? error.response.data.message : error.message}` };
      });
  };
  


  module.exports = {
    login : login,
    signUp : signUp, 
    getUser : getUser
  }





