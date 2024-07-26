import { kroger } from "../kroger";
import { Product } from "../kroger/types/products";

const infiniteScroller = (start: number) =>
  `<div hx-get="/product/search?start=${start}" hx-trigger="revealed" hx-swap="outerHTML">Load More</div>`;

const controller = {
  productSearch: async (
    req: {
      body: { search: string };
      query: { locationId: any; start?: string; search?: string };
    },
    res: { send: (arg0: string) => void }
  ) => {
    const search = (req.query.search ?? req.body.search) as string;
    const locationId = req.query.locationId;
    const start = parseInt(req.query.start || "0");
    if (search.length > 2) {
      function generateProductCardHtml(product: Product): string {
        const item = product.items[0];
        if (
          item.inventory &&
          item.price &&
          item.inventory.stockLevel !== "TEMPORARILY_OUT_OF_STOCK" &&
          item.fulfillment.inStore
        ) {
          const imageUrl =
            product.images
              .find((image) => image.perspective === "front" && image.featured)
              ?.sizes.find((size) => size.size === "large")?.url ||
            product.images.find((image) => image.perspective === "front")
              ?.sizes[0].url;
          const priceHtml =
            item.price.regular === item.price.promo
              ? `<p>Price: <strong>$${item.price.regular}</strong></p>`
              : `<p>Price: <p class="text-red-500"><del>$${item.price.regular}</del></p> <strong class="text-green-500">$${item.price.promo}</strong></p>`;
          const cardHtml = `
                    <div id="product-${item.itemId}"class="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4 bg-white">
                    <img class="w-full" src="${imageUrl}" alt="${product.description}">
                        <h2>Product ${product.description}</h2>${priceHtml}
                        <p>Size: <strong>${item.size}</strong></p>
                        <button>Add to Cart</button>
                      </div>
                    `;
          return cardHtml;
        } else {
          return "";
        }
      }
      const productsData = await kroger.getProducts({
        locationId,
        term: search,
        limit: 50,
        start,
      });
      const productCardsHtml =
        `<div class="grid grid-flow-row grid-cols-4 text-black w-full">${productsData.data
          .map((product: Product) => generateProductCardHtml(product))
          .join("")}</div>` + infiniteScroller(start + 50);
      res.send(productCardsHtml);
    }
  },
};

export default controller;
