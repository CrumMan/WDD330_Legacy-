import { loadHeaderFooter,ApiToJSONFetcher,getParam, getLocalStorage, setLocalStorage} from "./utils.mjs";
loadHeaderFooter();
GetPlayer();

async function GetPlayer(){
    const id = getParam("id")
    const url=`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes?limit=1000&active=true`
    const playerDataWebs = await ApiToJSONFetcher(url)
    const playerRefs =  await playerDataWebs.items.map(item => item.$ref);
    for (const ref of playerRefs){
      const secureRef = await ref.replace('http://', 'https://');
        const buildPlayer = await ApiToJSONFetcher(secureRef);
        if(buildPlayer.id == id){
            console.log(buildPlayer);
            const name = buildPlayer.displayName;
            const teamurl = buildPlayer.team.$ref
            const secureRefT = await teamurl.replace('http://', 'https://');
            const teamData = await ApiToJSONFetcher(secureRefT);
            const team = teamData.displayName;
            const position = buildPlayer.position?.displayName || "";
            const statisticsURL = buildPlayer.statistics?.$ref || "";
            const secureRefS = await statisticsURL.replace('http://', 'https://');
            const headshot = buildPlayer.headshot?.href || '../public/images/default_player.png';
            if(secureRefS){
                const statisticsData = await ApiToJSONFetcher(secureRefS);
                console.log(statisticsData);
                const categoriesLength = statisticsData?.splits?.categories?.length || 0;
                if (position === "Wide Receiver" && categoriesLength > 6){
                    let scoringCategory = null
                    for (const category of statisticsData.splits.categories){
                        if (category.name === "scoring"){
                           scoringCategory = category;
                           break
                            }
                    }
                    const gamesPlayed = statisticsData.splits.categories[0].stats[6].value
                    const totalRecieveingYards = statisticsData.splits.categories[3].stats[12].value
                    console.log(totalRecieveingYards);
                    const receptions = statisticsData.splits.categories[3].stats[16].value
                    const avgGameGain = (totalRecieveingYards/gamesPlayed).toFixed(2)
                    console.log(avgGameGain);
                    const totalTouchdowns = scoringCategory ? scoringCategory.stats[6].value : 0;
                    const rating = statisticsData.splits.categories[3].stats[1].value
                    let averageTouchdownsPerGame = (totalTouchdowns/gamesPlayed).toFixed(2)
                    if(totalTouchdowns === 0){averageTouchdownsPerGame = 0}
                    document.querySelector('.player').innerHTML= await buildWideReciever(name, team, position,rating,id,receptions,avgGameGain, totalTouchdowns, gamesPlayed, headshot,averageTouchdownsPerGame)
                     setupAddButtons();
                }
                else if (position === "Quarterback" && categoriesLength > 6){
                                    let scoringCategory = null
                    for (const category of statisticsData.splits.categories){
                        if (category.name === "scoring"){
                           scoringCategory = category;
                           break
                            }
                    }
                    const totalGames = statisticsData.splits.categories[0].stats[6].value
                    const totalPassingTouchdowns = statisticsData.splits.categories[1].stats[18].value
                    const avgPassingTouchdowns = statisticsData.splits.categories[1].stats[39].value.toFixed(2)
                    const avgPassingYards = statisticsData.splits.categories[1].stats[22].value.toFixed(2)
                    const averageRushingYards = statisticsData.splits.categories[2].stats[5].value.toFixed(2)
                    const totalRushTouchdowns = scoringCategory.stats[8].value
                    const averageRushingTouchdowns = scoringCategory.stats[8].value
                    const totalPoints = ((avgPassingTouchdowns + averageRushingTouchdowns)*6).toFixed(0)
                    const averagePointsPerGame = (totalPoints/totalGames).toFixed(2)
                    const averageTouchdownsPerGame = ((totalRushTouchdowns+totalPassingTouchdowns)/totalGames).toFixed(2)
                    2
                    const totalFumbles = statisticsData.splits.categories[0].stats[0].value
                    let averageFumbles = (totalFumbles/totalGames).toFixed(2)
                    if (totalFumbles === 0) averageFumbles = 0
                    const rating = statisticsData.splits.categories[1].stats[3].value
                    const twoPointConversions = scoringCategory.stats[12].value
                    let average2PointConversions = (twoPointConversions/totalGames).toFixed(2)
                    if (twoPointConversions === 0 ) average2PointConversions = 0
                    document.querySelector('.player').innerHTML= await buildQuarterBack(name, team, position,totalGames, avgPassingYards, avgPassingTouchdowns,totalPoints,averageRushingYards, averageRushingTouchdowns, averagePointsPerGame, averageTouchdownsPerGame, rating, headshot, id, averageFumbles, average2PointConversions);
                    setupAddButtons();

                }
                else if (position === "Running Back" && categoriesLength > 6){
                    let scoringCategory = null;
                    for (const category of statisticsData.splits.categories){
                        if (category.name === "scoring"){
                           scoringCategory = category;
                           break
                            }
                    }
                    const gamesPlayed = statisticsData.splits.categories[0].stats[6].value
                    const avgRushingYards = statisticsData.splits.categories[2].stats[5].value.toFixed(2)
                    const totalTouchdowns = scoringCategory ? scoringCategory.stats[8].value : 0;
                         console.log("All categories:", statisticsData.splits.categories.map(c => c.name));
                    let averageTouchdowns = (totalTouchdowns/gamesPlayed).toFixed(2)
                    if (totalTouchdowns === 0){
                        averageTouchdowns = 0;
                    }
                    //.stats[8].value
                    const rating = statisticsData.splits.categories[2].stats[1].value

                    document.querySelector('.player').innerHTML= await buildRunningBack(name, team, position,rating,id,avgRushingYards, totalTouchdowns, gamesPlayed, headshot,averageTouchdowns)
                    setupAddButtons();
                }
                else if (position === "Tight End" && categoriesLength > 6 ){
                    let scoringCategory = null;
                    for (const category of statisticsData.splits.categories){
                        if (category.name === "scoring"){
                           scoringCategory = category;
                           break
                            }
                    }
                    const rating = statisticsData.splits.categories[3].stats[1].value
                    const gamesPlayed= statisticsData.splits.categories[0].stats[6].value
                    const avgReceptions = (statisticsData.splits.categories[3].stats[16].displayValue/gamesPlayed).toFixed(2)
                    const totalRecieveingYards = statisticsData.splits.categories[3].stats[12].value
                    const totalTouchdowns = scoringCategory ? parseFloat(scoringCategory.stats[6].value) : 0;
                    let avgReceivingTouchdowns = (totalTouchdowns/gamesPlayed).toFixed(2)
                    if(totalTouchdowns === 0){avgReceivingTouchdowns = 0}
                    const avgYards= (totalRecieveingYards/gamesPlayed).toFixed(2);
                    document.querySelector('.player').innerHTML= await buildTightEnd(name, team, position,rating,id, totalTouchdowns, gamesPlayed, headshot,avgReceivingTouchdowns, avgReceptions, avgYards)
                    setupAddButtons();
                }
                else{
                    document.querySelector('.player').innerHTML= await loadDefault(name, team, position, headshot);
                }
                
            }
            else{
                    document.querySelector('.player').innerHTML= await loadDefault(name, team, position, headshot);
                }
        }
    }
}
async function buildQuarterBack(name, team, position,totalGames, avgPassingYards, avgPassingTouchdowns,totalPoints,averageRushingYards, averageRushingTouchdowns, averagePointsPerGame, averageTouchdownsPerGame, rating, headshot, id, averageFumbles, average2PointConversions){
     const newplayer = `<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class='card__name'>${name}   <a href='#' class = 'add' id='${id}'>+</a></h1>
     <h2 class='card_team_player'>${team}</h2>
  <a class='player_Image'>
  <img
  src='${headshot}' />
  </a>
  <h2>Position: ${position} </h2>
  </div>
  <div class='stats'>
        <h3>Stats</h3>
        <h4>General</h4>
        <p class='generalStats'>Rating: ${rating}<br>
        Games Played: ${totalGames}<br>
        Total Game Points: ${totalPoints}<br>
        Average Points Per Game: ${averagePointsPerGame}<br>
        Average Touchdowns per Game: ${averageTouchdownsPerGame}</p>
        <h4>Passing</h4>
        <p class='passingStats'> Average Yards: ${avgPassingYards}<br> Average touchdowns: ${avgPassingTouchdowns}<p>
        <h4>Rushing</h4>
        <p class ='rushingStats'>Average Yards:${averageRushingYards}<br>
        Average Touchdowns: ${averageRushingTouchdowns}<br>
        <h4>Other</h4><br>
        Average Fumbles: ${averageFumbles}<br>
        Average 2pt. Conversions: ${average2PointConversions}
        </p>
    </div>
</li>`;
  return newplayer;
}
async function buildWideReciever(name, team, position, rating, id, receptions,avgGameGain, totalTouchdowns, gamesPlayed, headshot, averageTouchdownsPerGame){
    const newplayer = `<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class='card__name'>${name}   <a href='#' class = 'add' id='${id}'>+</a></h1>
     <h2 class='card_team_player'>${team}</h2>
  <a class='player_Image'>
  <img
  src='${headshot}' />
  </a>
  <h2>Position: ${position} </h2>
  </div>
  <div class='stats'>
        <h3>Stats</h3>
        <h4>General</h4>
        <p class='generalStats'>Rating: ${rating}<br>
        Games Played: ${gamesPlayed}<br>
        Total Touchdowns: ${totalTouchdowns}<br>
        Average Receptions: ${receptions}<br>
        Average Yards Per Game: ${avgGameGain}<br>
        Average Touchdowns per Game: ${averageTouchdownsPerGame}</p>

    </div>
  </li>`
    return newplayer;
}

async function buildRunningBack(name, team, position,rating,id,avgRushingYards, totalTouchdowns, gamesPlayed, headshot,averageTouchdowns){
    const newplayer = `<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class='card__name'>${name}   <a href='#' class = 'add' id='${id}'>+</a></h1>
     <h2 class='card_team_player'>${team}</h2>
  <a class='player_Image'>
  <img
  src='${headshot}' />
  </a>
  <h2>Position: ${position} </h2>
  </div>
  <div class='stats'>
        <h3>Stats</h3>
        <h4>General</h4>
        <p class='generalStats'>Rating: ${rating}<br>
        Games Played: ${gamesPlayed}<br>
        Total Touchdowns: ${totalTouchdowns}<br>
        Average Yards Per Game: ${avgRushingYards}<br>
        Average Touchdowns per Game: ${averageTouchdowns}</p>

    </div>
  </li>`
    return newplayer;
}
async function buildTightEnd(name, team, position,rating,id, totalTouchdowns, gamesPlayed, headshot,averageTouchdowns,avgReceptions, avgYards){
    const newplayer = `<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class='card__name'>${name}   <a href='#' class = 'add' id='${id}'>+</a></h1>
     <h2 class='card_team_player'>${team}</h2>
  <a class='player_Image'>
  <img
  src='${headshot}' />
  </a>
  <h2>Position: ${position} </h2>
  </div>
  <div class='stats'>
        <h3>Stats</h3>
        <h4>General</h4>
        <p class='generalStats'>Rating: ${rating}<br>
        Games Played: ${gamesPlayed}<br>
        Total Touchdowns: ${totalTouchdowns}<br>
        Average Receptions: ${avgReceptions}<br>
        Average Yards Per Game: ${avgYards}<br>
        Average Touchdowns per Game: ${averageTouchdowns}</p>

    </div>
    </li>`
    return newplayer;
}
async function loadDefault(name, team, position, headshot){
    const newplayer = `<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class'userConnect'class='card__name'>${name}</h1>
     <h2 class='card_team_player'>${team}</h2>
  <a class='player_Image'>
  <img
  src='${headshot}' />
  </a>
  <h2 class'userConnect'>Position: ${position} </h2>
  <p>This Player does not have the experience to be added to a legacy team.</p>
  </div>
  </li>`
  return newplayer;
}

async function addPlayer(id){
    const players = getLocalStorage("players") || [];   
        if (!players.includes(id)){
            players.push(id)
            setLocalStorage("players",players)}
}
function setupAddButtons() {
  document.querySelectorAll(".add").forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const id = event.target.id;
      addPlayer(id);

      //add animation
      const startX = event.clientX;
      const startY = event.clientY;
      createFootballAnimation(startX, startY);  

    });
  });
}
function createFootballAnimation(startX, startY) {
  // Create a new element
  const football = document.createElement('div');
  football.className = 'flying-football';
  

  football.style.left = startX + 'px';
  football.style.top = startY + 'px';
  
  football.textContent = '🏈';
  document.body.appendChild(football);

  setTimeout(()=> {
    const trophy = document.querySelector('.legacy-teamview')
    const trophyRect = trophy.getBoundingClientRect();

    football.style.left = trophyRect.left +'px'
    football.style.top = trophyRect.top +'px'
    football.style.transform = 'rotate(720deg)'
    football.style.opacity = '0'
  },10)

  setTimeout(() => {
    football.remove();
  },1110)

}