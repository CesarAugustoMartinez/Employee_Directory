/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
export default {
  getRandomEmployee: function() {
    return axios.get("https://randomuser.me/api/?inc=id,picture,name,phone,email,dob&results=50");
  },
};
