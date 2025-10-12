import { loadHeaderFooter,ApiToJSONFetcher, setupPageTransition } from "./utils.mjs";
setupPageTransition();

loadHeaderFooter();
loadAndDisplayTeams();

async function loadAndDisplayTeams(){
    const url=`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`
    const data= await ApiToJSONFetcher(url)
    const teams = data.sports[0].leagues[0].teams;
    console.log(teams);
    const template = document.querySelector('#team_card_template')
    const container = document.querySelector('#cards')
    teams.forEach(team => {
        const clone = template.content.cloneNode(true);
        const name = team.team.displayName
        const id = team.team.id
        const logo = team.team.logos[1].href

        clone.querySelector('.team_card').style.backgroundColor = `#${team.team.color}`
        clone.querySelector(".team_image").src = logo
        clone.querySelector('.team_image_click').href = `./nfl_team/index.html?id=${id}`
        clone.querySelector('.team_name').textContent = name;
        container.appendChild(clone)
   });
    }
