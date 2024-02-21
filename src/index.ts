import axios from "axios";
import * as cheerio from "cheerio";
import { IProductData } from "./interface/interface.product";
import { getProductData, getRandomState, setJSON } from "./utils";

async function main() {
  try {
    let content: IProductData[] = [];
    let number = 14;

    for (let i = 1; i <= number; i++) {
      const response = await axios.get(
        `https://tiendasisimo.com/mercado/?product-page=${i}`
      );
      const $ = cheerio.load(response.data);
      const products = $(".product");

      for (let element of products.toArray()) {
        const name = $(element).find(".woocommerce-loop-product__title").text();
        const image =
          $(element).find(".size-woocommerce_thumbnail").attr("data-src") ||
          $(element).find(".size-woocommerce_thumbnail").attr("src");
        const state = getRandomState();
        const ProductData = await getProductData(name);

        if (ProductData) {
          content.push({
            name,
            image,
            state,
            Product: ProductData,
          });
        } else {
          // Si getProductData no devuelve nada, aún puedes decidir agregar el producto sin los datos adicionales
          content.push({ name, image, state });
        }
      }
      console.log(`PÁGINA [${i}] PRODUCTOS ESCANEADOS`);
    }

    // await addToJSON(content); // Asumiendo que quieres agregar todo el contenido al JSON
    // Si setJSON debe usarse en lugar de addToJSON, asegúrate de que cumple con lo que necesitas

    setJSON(content);
  } catch (error) {
    console.error("Error en la ejecución:", error);
  }
}

main();
