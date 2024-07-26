import {
  ProductFilter,
  StoreFilter,
  generateProductQueryParams,
  generateStoreQueryParams,
} from "./filters";
import { StoreData } from "./types/locations";
import { Product } from "./types/products";

const BASE_URL = "https://api-ce.kroger.com/v1";
const TOKEN = btoa(
  `${process.env.KROGER_CLIENT_ID}:${process.env.KROGER_CLIENT_SECRET}`
);

export class KrogerApi {
  private token: string = "";
  private defaultHeaders: { Accept: string; Authorization: string } = {
    Accept: "",
    Authorization: "",
  };

  private async initialize(): Promise<void> {
    this.token = await this.getAccessToken();

    this.defaultHeaders = {
      Accept: "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  public static async init(): Promise<KrogerApi> {
    const api = new KrogerApi();
    await api.initialize();
    return api;
  }

  private async getAccessToken(): Promise<string> {
    const { access_token } = await this.fetchEndpoint<{ access_token: string }>(
      "/connect/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${TOKEN}`,
        },
        body: "grant_type=client_credentials&scope=product.compact",
      }
    );
    return access_token;
  }

  public async getStoreLocations(filter: StoreFilter): Promise<StoreData> {
    const queryParams = generateStoreQueryParams(filter);
    return await this.fetchEndpoint<StoreData>(`/locations${queryParams}`, {
      method: "GET",
      headers: this.defaultHeaders,
    });
  }

  public async getProducts(filter: ProductFilter): Promise<any> {
    const queryParams = generateProductQueryParams(filter);
    return await this.fetchEndpoint<Product[]>(`/products${queryParams}`, {
      method: "GET",
      headers: this.defaultHeaders,
    });
  }

  private async fetchEndpoint<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      const responseData = await response.clone().json();
      console.log("Error fetching from the endpoint:", endpoint, options);
      // catch {"error":"API-401: Invalid Access Token","error_description":"API-401: Invalid Access Token"}
      // if (responseData.error) {
      //   if (responseData.error.includes("API-401")) {
      //     console.log("Refreshing token...");
      //     await this.initialize();
      //     return await this.fetchEndpoint(endpoint, options);
      //   }
      // }
      throw new Error(`HTTP error! Status: ${JSON.stringify(responseData)}`);
    }
    return (await response.json()) as T;
  }
}
export const kroger = await (async () => {
  return await KrogerApi.init();
})();
