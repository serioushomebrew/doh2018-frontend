const baseUrl = 'https://dohdatasciencevm2.westeurope.cloudapp.azure.com/';
// let auth = 'e7BO3PwUXPZrGT3lPJUQKip6hD5tBTIcPG2aO7psGDKLet6SiOBWm9e4PnoGrAo0';
let auth = 'lV475jlAla8aCir45PAtNdPlbG46ih5Ji5bqwzJeFQLU23aXAvYECSYUj7GirgsW'; // hacker

export async function login(email, password) {
  const formData = new FormData();
  formData.append('email', email);
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  return fetch(new Request(baseUrl + 'api/login', {
    method: 'POST',
    body: formData,
    headers,
  }))
    .then(r => r.json())
    .then(json => {
      auth = json.api_token;
      return json;
    })
}

export function apiPost(path, formData, method = 'POST') {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${auth}`);
  headers.append('Accept', 'application/json');

  return fetch(new Request(baseUrl + path, {
    method,
    headers,
    body: formData,
    cors: 'cors',
  })).then(r => r.json());
}
