import axios from "axios";

export const baseUrl = "https://api.everrest.educata.dev/";

export const UseServiceGet = async (
  endpoint: string,
  params?: any,
  token?: string
) => {
  try {
    const response = await axios.get(baseUrl + endpoint, { params });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in UseServiceGet:", error);
  }
};

export const UseServicePost = async (
  endpoint: string,
  data?: any,
  token?: string
) => {
  try {
    const response = await axios.post(baseUrl + endpoint, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in UseServicePost:", error);
  }
};

export const UseServicePut = async (
  endpoint: string,
  data?: any,
  token?: string
) => {
  try {
    const response = await axios.put(baseUrl + endpoint, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in UseServicePut:", error);
  }
};

export const UseServicePatch = async (
  endpoint: string,
  data?: any,
  token?: string
) => {
  try {
    const response = await axios.patch(baseUrl + endpoint, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in UseServicePatch:", error);
  }
};

export const UseServiceDelete = async (
  endpoint: string,
  data?: any,
  token?: string
) => {
  try {
    const response = await axios.delete(baseUrl + endpoint, { data });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in UseServiceDelete:", error);
  }
};
