import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://tuit-node-app.herokuapp.com";
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;

const api = axios.create({
  withCredentials: true
});

/**
 * A service to find all the tuits which are liked by the user which uses get request to fetch the response.
 * @param userId user id
 * @returns {Promise<AxiosResponse<any>>} tuits object
 */
export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

/**
 * A service to find all the users that liked the tuit which uses get request to fetch the response.
 * @param tid tuit id
 * @returns {Promise<AxiosResponse<any>>} users object
 */
export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

/**
 * A service to like the tuit by a particular user  which uses put to update the database.
 * @param uid user id
 * @param tid tuit id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);