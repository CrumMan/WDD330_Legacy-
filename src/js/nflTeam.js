import { loadHeaderFooter,ApiToJSONFetcher,getParam, pullUrlParamater } from "./utils.mjs";
loadHeaderFooter();
createTeam();
createPlayersList();


async function createTeam(){

    const id = getParam('id');


    const url=`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`
    const data= await ApiToJSONFetcher(url)
    const teams = data.sports[0].leagues[0].teams;
    const template = document.querySelector('#team_card_template')
    const container = document.querySelector('#team_hero')
    
    
    teams.forEach(team => {
        
        if(team.team.id === id){
        const clone = template.content.cloneNode(true);
        const name = team.team.displayName
        const logo = team.team.logos[1].href

        clone.querySelector('#team_hero_div').style.backgroundColor = `#${team.team.color}`
        clone.querySelector(".team_image").src = logo
        // clone.querySelector('.team_image_click').href = `./nfl_team/index.html?id=${abb}`

        clone.querySelector('.team_name').textContent = name;
        container.appendChild(clone)
        }
   });
}

async function createPlayersList(){
    const id = getParam('id');
    const url=`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes?limit=1000&active=true`
    const PlayersObjects = await ApiToJSONFetcher(url)
    const PlayerRefs = await PlayersObjects.items.map(item => item.$ref)
    const teamPlayers = [];
    const players=[]
    for (const ref of PlayerRefs){
        const buildPlayer = await ApiToJSONFetcher(ref);
        const teamUrlData = await pullUrlParamater(buildPlayer.team.$ref)
        buildPlayer.team = teamUrlData.id
        if(buildPlayer.team === id && (buildPlayer.position.displayName === "Wide Receiver" || buildPlayer.position.displayName ==="Quarterback" || buildPlayer.position.displayName === "Tight End" || buildPlayer.position.displayName === "Running Back")){
             teamPlayers.push(buildPlayer)
        }
    }
    console.log(teamPlayers);
    for (const player of teamPlayers){
        // const statisticsLogURL = await(player.statistics.$ref)
        
        // player.position = player.position.displayName
        delete player.birthPlace
        delete player.draft
        delete player.guid
        delete player.slug
    };

    // building the team
    const template = document.querySelector('#player_cards')
    const container = document.querySelector('#player_card_container')
    teamPlayers.map(player => {
        const clone = template.content.cloneNode(true);

        const name = player.displayName;
        const headshot = player.headshot?.href || '../public/images/default_player.png';
        const position = player.position.displayName;
        const playerId = player.id;
        const number = player.jersey;

        if (number !== undefined && number !== null){
            clone.querySelector('.player_name').textContent = `#${number} ${name}`;
        }
        else{
            clone.querySelector('.player_name').textContent = `${name}`;
        }

        clone.querySelector('.player_card_click').href = `../nfl_player/index.html?id=${playerId}&teamId=${id}`
        clone.querySelector('.player_image').src = headshot;

        clone.querySelector('.positionC').innerHTML = `<strong>Position: </strong> ${position}`

        container.appendChild(clone); 

    });

    // for (const player of teamPlayers)
    //     const clone = template.content.cloneNode(true);
    //     const name = player.displayName;
    //     const headshot = player.headshot.href

    //     document.querySelector('.player_image').src = headshot
    //     document.querySelector('.player_name').textContent = name
    //     container.appendChild(clone)
    // });
}