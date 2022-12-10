import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";


class UrGuideApi {
    // store API token here 
    static token;

    /* Template for axios requests. User enters endpoint, data (optional), 
    method (optional), returns axios response data.
    */
    static async request(endpoint, data = {}, method = "GET") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = {
            Authorization: `Bearer ${UrGuideApi.token}`
        };
        const response = await axios({
            url,
            data,
            method,
            headers
        });
        const params = (method === "GET") ? data : {};
        console.debug("API Response:", response.data, params);

        try {
            return (await axios({
                url,
                method,
                data,
                params,
                headers
            })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }



    // Individual API calls

    static async getCurrentUser(username, data) {
        let res = await this.request(`users/${username}`, data, "GET");
        return res.user;
    }

    static async login(data) {
        let res = await this.request(`login`, data, "POST");
        return res.token;
    }

    static async signup(data) {
        let res = await this.request(`signup`, data, "POST");
        return res.token;
    }

    /** Create new user  */

    static async createUser(data) {
        let res = await this.request(`users`, data, "POST");
        return res.user;
    }


    /** Guide API routes */

    static async getGuides(data) {
        let res = await this.request(`guides`, data, "GET");
        return res.guides;
    }

    /** GET guide by id */

    static async getGuide(id, data) {
        let res = await this.request(`guides/${id}`, data, "GET");
        return res.guide;
    }



    // static async getGuides(id) {
    //     let res = await this.request(`guides/${id}`, data, "GET");
    //     return res.guide;
    // }

    static async createGuide(data) {
        let res = await this.request(`guides`, data, "POST");
        return res.guide;
    }

    /** GET potential matches for guides */

    static async getPotentialMatches(id, data = {}) {
        let res = await this.request(`/${id}/matches`, data, "GET");
        return res.matches;
    }

    /** GET potential matches for users */

    // static async getPotentialMatches(username, data = {}) {
    //     let res = await this.request(`users/${username}/matches`, data, "GET");
    //     return res.matches;
    // }

    /** GET user's guides */

    static async getUserGuides(username, data = {}) {
        let res = await this.request(`users/${username}/guides`, data, "GET");
        return res.guides;
    }

    /** GET matches for users/guides */

    static async getMatches(id) {
        let res = await this.request(`users/${id}/matches`, {}, "GET");
        return res.matches;
    }

    /** Like a potential user match */

    static async likeMatch(id) {
        let res = await this.request(`users/${id}/matches`, {}, "POST");
        return res.match;
    }

    /** Like a potential guide match */

    static async likeMatch(id, data) {
        let res = await this.request(`guides/${id}/matches`, data, "POST");
        return res.match;
    }

    /** Dislike potential user match  */

    static async dislikeMatch(id) {
        let res = await this.request(`matches/${id}`, {}, "DELETE");
        return res.message;
    }

    /** Dislike potential guide match  */

    static async dislikeMatch(id) {
        let res = await this.request(`matches/${id}`, {}, "DELETE");
        return res.message;
    }




    /** GET user's favorite */

    // static async getFavorites(username) {
    //     let res = await this.request(`users/${username}/favorites`, data, "GET");
    //     return res.favorites;
    // }

    /** WTH am I doing   */
    // static async createFavorite(username, data) {
    //     let res = await this.request(`users/${username}/favorites`, data, "POST");
    //     return res.favorite;
    // }

    // static async deleteFavorite(username, id) {
    //     let res = await this.request(`users/${username}/favorites/${id}`, data, "DELETE");
    //     return res.message;
    // }

    // static async getLikes(id) {
    //     let res = await this.request(`guides/${id}/likes`, data, "GET");
    //     return res.likes;
    // }

    // static async createLike(id, data) {
    //     let res = await this.request(`guides/${id}/likes`, data, "POST");
    //     return res.like;
    // }

    // static async deleteLike(id) {
    //     let res = await this.request(`likes/${id}`, data, "DELETE");
    //     return res.message;
    // }

    /**  */

    // need to add route for uploading images




}

/* ************************************************************* */


// Temporary API token for testing -- CHANGE THIS LATER ONCE EVERYTHING IS WORKING!
UrGuideApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default UrGuideApi;