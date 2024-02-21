import { writeFile, readFile } from "fs/promises"; // Usa la versión promisificada para un mejor manejo de async/await
import { IProductData } from "../interface/interface.product";

async function addToJSON(newProduct: IProductData) {
  try {
    let products: IProductData[] = [];

    try {
      // Intenta leer el archivo existente
      const data = await readFile("products.json", { encoding: "utf8" });
      // Solo analiza el contenido si no está vacío
      if (data) {
        products = JSON.parse(data);
      }
    } catch (readError) {
      // Si el archivo no existe o no se puede leer, se inicializa `products` como un arreglo vacío
      console.log("Archivo no encontrado o vacío, creando uno nuevo.");
    }

    // Agrega el nuevo producto a la lista existente
    products.push(newProduct);

    // Convierte la lista actualizada a una cadena JSON formateada
    const jsonString = JSON.stringify(products, null, 2);

    // Guarda la lista actualizada en el archivo
    await writeFile(`products.json`, jsonString);
    console.log("Producto agregado y archivo guardado con éxito.");
  } catch (err) {
    console.error("Error al leer o guardar el archivo:", err);
  }
}

export default addToJSON;
