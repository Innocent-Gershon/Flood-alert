const url = "https://flood-alert-5.onrender.com";
import axios from "axios";

interface User {
    email:String,
    password:String
};

const loginUser = async (email:any,password:any) => {
    try {
        const data = {email,password}
        const response = await axios.post(`${url}/api/auth/login`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export default loginUser;