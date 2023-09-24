import axios from "axios";

export default axios.create({
  baseURL: `http://auth.redevops.store`,
  timeout: 30000,
});
