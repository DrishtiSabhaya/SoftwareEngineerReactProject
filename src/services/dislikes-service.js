import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://tuit-node-app.herokuapp.com";
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;

const api = axios.create({
                             withCredentials: true
                         });

/**
 * A service to find all the tuits which are disliked by the user.
 * @param userId user id
 * @returns {Promise<AxiosResponse<any>>} tuits object
 */
export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

/**
 * A service to find all the users that disliked the tuit
 * @param tid tuit id
 * @returns {Promise<AxiosResponse<any>>} users object
 */
export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

/**
 * A service to dislike the tuit by a particular user.
 * @param uid user id
 * @param tid tuit id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => {
            console.log(response.data);
            return response.data;
        }).catch(e => {
            console.log("here" + e);
    });