type FulfillmentType = "ais" | "csp" | "dth" | "sth";

export interface ProductFilter {
  term?: string;
  locationId?: string;
  productId?: string;
  brand?: string;
  fulfillment?: FulfillmentType[];
  start?: number;
  limit?: number;
}

export type StoreFilter = {
  zipCodeNear?: string;
  latLongNear?: string;
  latNear?: string;
  lonNear?: string;
  radiusInMiles?: number;
  limit?: number;
  chain?: string;
  department?: string;
  locationId?: string;
};

export function generateStoreQueryParams(filter: StoreFilter): string {
  let params: string[] = [];

  if (filter.zipCodeNear) {
    params.push(`filter.zipCode.near=${filter.zipCodeNear}`);
  }
  if (filter.latLongNear) {
    params.push(`filter.latLong.near=${filter.latLongNear}`);
  }
  if (filter.latNear) {
    params.push(`filter.lat.near=${filter.latNear}`);
  }
  if (filter.lonNear) {
    params.push(`filter.lon.near=${filter.lonNear}`);
  }
  if (filter.radiusInMiles !== undefined) {
    params.push(`filter.radiusInMiles=${filter.radiusInMiles}`);
  }
  if (filter.limit !== undefined) {
    params.push(`filter.limit=${filter.limit}`);
  }
  if (filter.chain) {
    params.push(`filter.chain=${filter.chain}`);
  }
  if (filter.department) {
    params.push(`filter.department=${filter.department}`);
  }
  if (filter.locationId) {
    params.push(`filter.locationId=${filter.locationId}`);
  }

  let res = params.join("&");
  if (res.length > 0) {
    return "?" + res;
  }

  return "";
}

export function generateProductQueryParams(filter: ProductFilter): string {
  let params: string[] = [];

  if (filter.term) {
    params.push(`filter.term=${filter.term}`);
  }
  if (filter.locationId) {
    params.push(`filter.locationId=${filter.locationId}`);
  }
  if (filter.productId) {
    params.push(`filter.productId=${filter.productId}`);
  }
  if (filter.brand) {
    params.push(`filter.brand=${filter.brand}`);
  }
  if (filter.fulfillment) {
    params.push(`filter.fulfillment=${filter.fulfillment.join(",")}`);
  }
  if (filter.start !== undefined) {
    params.push(`filter.start=${filter.start}`);
  }
  if (filter.limit !== undefined) {
    params.push(`filter.limit=${filter.limit}`);
  }

  let res = params.join("&");
  if (res.length > 0) {
    return "?" + res;
  }

  return "";
}
