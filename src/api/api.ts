import axios, { type AxiosResponse } from 'axios';
import type { Product } from '../types/types';

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com'
});

export const fetchProducts = (): Promise<AxiosResponse<Product[]>> => 
  apiClient.get<Product[]>('/products');

export const fetchCategories = (): Promise<AxiosResponse<string[]>> => 
  apiClient.get<string[]>('/products/categories');

export const fetchProductsByCategory = (category: string): Promise<AxiosResponse<Product[]>> => 
  apiClient.get<Product[]>(`/products/category/${category}`);