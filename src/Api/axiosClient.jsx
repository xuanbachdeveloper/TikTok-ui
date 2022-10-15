import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY2MzE1Mjc4NSwiZXhwIjoxNjY1NzQ0Nzg1LCJuYmYiOjE2NjMxNTI3ODUsImp0aSI6ImxVQ1JWSTlGeElvbEw4cmQiLCJzdWIiOjIxMSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.0vZzzJiRlqNJbd2or2PFVY1axEwAXmeGzHvlThsy6iY`,
    },
    paramsSerializer: (params) =>
        queryString.stringify({
            ...params,
        }),
});

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    },
);

export default axiosClient;
