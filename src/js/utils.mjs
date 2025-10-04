

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}


export async function loadTemplate(path) {
  const file_response = await fetch(path);
  const file_path = file_response.text();
  return file_path;
}

export async function loadHeaderFooter() {
  const header_template = await loadTemplate("/partials/header.html");
  const footer_template = await loadTemplate("/partials/footer.html");

  const header_element = document.getElementById("header");
  const footer_element = document.getElementById("footer");

  renderWithTemplate(header_template, header_element);
  renderWithTemplate(footer_template, footer_element);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

// create the API Fetcher all it does is save the api in a json file for the user
export async function ApiToJSONFetcher(url) {
 try{ 
    const response = await fetch(url)
      if (!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }
      const data = await response.json()
      return data;
  } 
 catch (error){
    console.log($`Error: ${error}`);
    throw error;
 }
}
export async function pullUrlParamater(url, parameter) {
  const pJson  = await ApiToJSONFetcher(url);
  return pJson;
}