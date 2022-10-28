import axios from "axios";
import {API_URL} from './constants/index';
const AUTH_URL = API_URL + ":8000/account/login/";

const login = (username, password)=>{
    return axios
        .post(AUTH_URL, {
            username,
            password,
        })
        .then((response) => {
            if (response.data.username){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const AuthService = {
    login,
}

export default AuthService;