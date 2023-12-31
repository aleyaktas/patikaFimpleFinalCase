export const BASE_URL = "https://api-ticketly.aleynaaktas.com/api";

const options = {
  baseUrl: BASE_URL,
};

const POST = "POST";
const PUT = "PUT";
const GET = "GET";
const DELETE = "DELETE";

const send = async (endpoint, params, method, data, isFormData) => {
  let uri = options.baseUrl + endpoint + params;
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const response = await fetch(uri, {
    method: method,
    headers: !isFormData
      ? {
          "Content-Type": "application/json; charset=UTF-8",
          "fimple-auth-token": localStorage.getItem("token"),
        }
      : undefined,
    body: data && isFormData ? data : JSON.stringify(data),
  });

  const result = await response.json();
  if (response.status === 401) {
    localStorage.removeItem("token");
    return window.location.reload();
  }
  return result;
};

const methods = {
  post: (endpoint, params, data, isFormData) => {
    return send(endpoint, params, POST, data, isFormData);
  },
  get: (endpoint, params) => {
    return send(endpoint, params, GET);
  },
  put: (endpoint, params, data) => {
    return send(endpoint, params, PUT, data);
  },
  del: (endpoint, params, data) => {
    return send(endpoint, params, DELETE, data);
  },
};

export const { post, get, put, del } = methods;
