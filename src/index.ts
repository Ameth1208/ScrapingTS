import axios from "axios";
import * as cheerio from "cheerio";
import { IProductData } from "./interface/interface.product";
import { addToJSON, getProductData, getRandomState } from "./utils";

async function main() {
  try {
    let content: IProductData[] = [];

    let number = 14;
    for (let i = 1; i <= number; i++) {
      const response = await axios.get(
        `https://tiendasisimo.com/mercado/?product-page=${i}`
      );
      const $ = cheerio.load(response.data);

      await $(".product").each((a, element) => {
        content.push({
          name: $(element).find(".woocommerce-loop-product__title").text(),
          image:
            $(element).find(".size-woocommerce_thumbnail").attr("data-src") ||
            $(element).find(".size-woocommerce_thumbnail").attr("src"),
          state: getRandomState(),
        });
      });
      console.log(`PAGE [${i}] PRODUCTOS SCANEADO`);
    }

    await content.map(async (item: IProductData, i: number) => {
      let ProductData = await getProductData(item.name!);

      if (ProductData) {
        let newProduct = {
          image: content[i].image,
          name: content[i].name,
          state: content[i].state,
          Product: ProductData,
        };

        await addToJSON(newProduct);
      } else {
        delete content[i];
      }
    });

    // await setJSON(content);
  } catch (error) {
    // console.log(error);
  }
}

main();
