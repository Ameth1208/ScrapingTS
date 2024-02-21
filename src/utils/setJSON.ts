import { writeFile } from "fs";
import { IProductData } from "../interface/interface.product";

async function setJSON(content: IProductData[]) {
  const jsonString = JSON.stringify(content, null, 2);
  await writeFile("products-data.json", jsonString, (err) => {
    if (err) {
      console.error("Error al guardar el archivo:", err);
    } else {
      console.log("Archivo guardado con éxito.");
    }
  });
}

export default setJSON;
