import axios from "axios";

export const baseUrl = "localhist";

axios({method:'get',url:`${baseUrl}/api/arr`})
