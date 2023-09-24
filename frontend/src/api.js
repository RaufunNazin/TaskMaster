import axios from "axios";

export default axios.create({
  baseURL: `http://api.redevops.store/api`,
  timeout: 30000,
});
