import axios from "axios";

export default class PostService {
    static async getNumber() {
        const response = await axios.get('http://localhost:8090/ServletNumberOfTask')
        return response
    }

}