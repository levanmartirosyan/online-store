import { axiosDefaultInstance } from "@/config/axios";
import { HttpMethod } from "@/enums/HttpMethod";

export const useService = async (
  endpoint: string,
  method: HttpMethod,
  params?: any
) => {
  try {
    console.log(params);

    const response = await axiosDefaultInstance[method](endpoint, params);
    console.log(response);
    return response;
  } catch (error) {
    console.error(`Error while calling ${endpoint} - Get`, error);
  }
};
