import axios from "axios";
import * as cheerio from "cheerio";
import { IProductData } from "./interface/interface.product";
import {
  getDiscountRandom,
  getProductData,
  getRandomState,
  setJSON,
} from "./utils";

async function main() {
  try {
    let content: IProductData[] = [];
    let number = 14;

    for (let i = 1; i <= number; i++) {
      const response = await axios.get(
        `https://tiendasisimo.com/mercado/?product-page=${i}`
      );
      const $ = cheerio.load(response.data);

      //Array  que guarda los productos de la página actual
      const products = $(".product");

      for (let element of products.toArray()) {
        //Se toma los datos de cada producto
        const name = $(element).find(".woocommerce-loop-product__title").text();
        const image =
          $(element).find(".size-woocommerce_thumbnail").attr("data-src") ||
          $(element).find(".size-woocommerce_thumbnail").attr("src");
        const state = getRandomState();

        //Se busca cada productos de forma individual en la pagina para agregar a la nueva variable
        let ProductData = await getProductData(name);

        if (ProductData) {
          content.push({
            name,
            image,
            state,
            discount: getDiscountRandom(),
            Product: ProductData,
          });
        }
      }
      console.log(`PÁGINA [${i}/${number}] PRODUCTOS ESCANEADOS`);
    }

    //Save JSON File
    setJSON(content);
  } catch (error) {
    console.error("Error en la ejecución:", error);
  }
}

main();
