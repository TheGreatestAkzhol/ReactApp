import axios from "axios";

export default class AutoLoad{
   static async addDefaultUsers() {
        const users = [{
            id: "1",
            name: "Akzhol",
            surname: "Serikbek",
            password: "admin"
        },{
            id: "2",
            name: "Tural",
            surname: "Turalovich",
            password: "admin"
        },{
            id: "3",
            name: "Denys",
            surname: "Denisovich",
            password: "admin"
        }, {
            id: "4",
            name: "Evgeny",
            surname: "Bykov",
            password: "admin"
        }
        ]
       await axios.post("http://localhost:8090/ServletAutoLoadUser", users)
   }
}