export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

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
    console.log(`Error: ${error}`);
    throw error;
 }
}
export async function pullUrlParamater(url, parameter) {
  const pJson  = await ApiToJSONFetcher(url);
  return pJson;
}
async function averageTouchdownPoints(averageTouchdowns) {
  return averageTouchdowns * 6
}


export async function RunningBackPoints(avgRushingYards, averageTouchdowns) {
  const avgRushingPoints = Math.floor(avgRushingYards/10)
  const totalPoints = Math.floor(await averageTouchdownPoints(averageTouchdowns) + avgRushingPoints)
  return totalPoints
}
export async function WideRecieverPoints(avgGameGain, avgReceptions, averageTouchdowns){
  const touchdownPoints = await averageTouchdownPoints(averageTouchdowns)
  const averageGameGainPoints = Math.floor(avgGameGain/25)
  return Math.floor(avgReceptions + touchdownPoints + averageGameGainPoints)
}
export async function QuarterbackPoints(avgPassingYards, avgPassingTouchdowns, averageRushingYards, averageRushingTouchdowns,avgFumbles,average2PointConversions) {
  const avgPassingPoints = (avgPassingTouchdowns * 4) + parseInt(Math.floor(avgPassingYards/25))
  const avgRushingPoints = (averageRushingTouchdowns *6) + Math.floor(averageRushingYards/10)
  const totalPoints = Math.floor(avgPassingPoints + avgRushingPoints - (avgFumbles*2) + average2PointConversions * 2)
  return  totalPoints
}

export function setupPageTransition(){
if (document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", () =>{
    document.body.classList.remove("fade-out")
  })
}
  document.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#")) return;

    console.log("transitioning to:", href);
    e.preventDefault();
    document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = href;
      },500)
    })
}
