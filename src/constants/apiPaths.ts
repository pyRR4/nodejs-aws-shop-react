const API_PATHS = {
  product: import.meta.env.PRODUCT_SERVICE_API_URL,
  order: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  import: import.meta.env.IMPORT_SERVICE_API_URL,
  bff: "https://.execute-api.eu-west-1.amazonaws.com/dev",
  cart: "https://.execute-api.eu-west-1.amazonaws.com/dev",
};

export default API_PATHS;
