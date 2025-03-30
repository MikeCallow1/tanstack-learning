import axios from "axios";
import { AuthoritiesResponse, Establishment, EstablishmentsResponse, SortOptionsResponse } from "../types";

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
  return response.data as AuthoritiesResponse;
};

export const fetchEstablishments = async ({
  localAuthorityId,
  name,
  pageSize,
  pageNumber,
  ratingKey,
  sortOptionKey
}: {
    localAuthorityId: number;
    name?: string;
    pageSize?: number;
    pageNumber?: number,
    ratingKey?: string;
    sortOptionKey?: string
}) => {
  const params: Record<string, string | number> = { localAuthorityId };
  if (name) params.name = name;
  if (pageSize !== undefined) params.pageSize = pageSize;
  if (pageNumber !== undefined) params.pageNumber = pageNumber;
  if (ratingKey !== undefined) params.ratingKey = ratingKey;
  if (sortOptionKey !== undefined) params.sortOptionKey = sortOptionKey;

  const queryString = new URLSearchParams(params).toString();
  const response = await apiClient.get(`/Establishments?${queryString}`);
  return response.data as EstablishmentsResponse;
};

export const fetchEstablishment = async (fhrsId: number) => {
  const response = await apiClient.get(`/Establishments/${fhrsId}`);
  return response.data as Establishment;
};

export const getSortOptions = async () => {
  const response = await apiClient.get("/SortOptions");
  return response.data as SortOptionsResponse;
};