// src/services/dataService.js

// Product Services
export const getAllProducts = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
  };
  
  export const addProduct = (product) => {
    const products = getAllProducts();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  };
  
  export const updateProduct = (updatedProduct) => {
    const products = getAllProducts();
    const updatedList = products.map((p) =>
      p.productID === updatedProduct.productID ? updatedProduct : p
    );
    localStorage.setItem("products", JSON.stringify(updatedList));
  };
  
  export const deleteProduct = (productID) => {
    const products = getAllProducts();
    const updatedList = products.filter((p) => p.productID !== productID);
    localStorage.setItem("products", JSON.stringify(updatedList));
  };
  