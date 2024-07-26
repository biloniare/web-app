import { kroger } from "./kroger";
import express from "express";
import productRoutes from "./products/routes.products";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const locations = await kroger.getStoreLocations({
    zipCodeNear: "30307",
    limit: 1,
  });
  const location = locations.data[0];
  res.render("index", { location });
});

app.use("/product", productRoutes);

app.listen(port, () => {
  console.log(`Kroger API listening at http://localhost:${port}`);
});
