import axios from "axios";

const API_BASE_URL = "https://api.ratings.food.gov.uk";
const API_HEADERS = {
  "x-api-version": "2",
  Accept: "application/json",
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: API_HEADERS,
});

export const fetchAuthorities = async () => {
  const response = await apiClient.get("/Authorities");
  return response.data;
};

export const fetchEstablishments = async (authorityId: number) => {
  const response = await apiClient.get(`/Establishments?localAuthorityId=${authorityId}`);
  return response.data;
};