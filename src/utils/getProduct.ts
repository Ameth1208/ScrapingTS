import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";
import { IProduct } from "../interface/interface.product";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

async function getProductData(item: string) {
  try {
    let ProductData: IProduct;

    let i: any = item.toLowerCase().split(" ").join("-");
    let response = await axios.get(`https://tiendasisimo.com/producto/${i}`, {
      timeout: 60000 * 10,
    });

    const $ = await cheerio.load(response.data);
    ProductData = {
      name: $(".text-4xl").text(),
      description: $(".woocommerce-product-details__short-description").text(),
      price: $(`.woocommerce-Price-amount`).first().text(),
      productMeta: {
        category: $(".product_meta>.posted_in").first().text().split(": ")[1],
        sku: $(".product_meta>.sku_wrapper").text().split(": ")[1],
        brand: $(".product_meta>.posted_in").last().text().split(": ")[1],
      },
    };
    return ProductData;
  } catch (error: AxiosError | any) {
    if (error.code === "ECONNABORTED") {
      console.error("La solicitud se ha abortado por un timeout.");
    } else if (error.response) {
      console.error(
        `Error en la respuesta del servidor: ${error.response.status}`
      );
    } else if (error.request) {
      console.error("No se recibió respuesta para la solicitud hecha.");
    } else {
      console.error("Error al realizar la solicitud:", error.message);
    }
  }
}

export default getProductData;
