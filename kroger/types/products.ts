type ImageSize = "xlarge" | "large" | "medium" | "small" | "thumbnail";

interface ImageSizeInfo {
  size: ImageSize;
  url: string;
}

interface ProductImage {
  perspective: string;
  featured?: boolean;
  sizes: ImageSizeInfo[];
}

interface InventoryStatus {
  stockLevel: string;
}

interface FulfillmentOptions {
  curbside: boolean;
  delivery: boolean;
  inStore: boolean;
  shipToHome: boolean;
}

interface Price {
  regular: number;
  promo: number;
}

interface Item {
  itemId: string;
  inventory: InventoryStatus;
  favorite: boolean;
  fulfillment: FulfillmentOptions;
  price: Price;
  size: string;
  soldBy: string;
}

interface TemperatureIndicator {
  indicator: string;
  heatSensitive: boolean;
}

export interface Product {
  productId: string;
  upc: string;
  aisleLocations: any[]; // Replace `any` with a more specific type if possible
  brand: string;
  categories: string[];
  description: string;
  images: ProductImage[];
  items: Item[];
  itemInformation: Record<string, unknown>; // or an interface if the structure is known
  temperature: TemperatureIndicator;
}
