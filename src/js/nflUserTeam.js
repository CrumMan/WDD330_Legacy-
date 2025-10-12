import { loadHeaderFooter,ApiToJSONFetcher, getLocalStorage, setLocalStorage, QuarterbackPoints, WideRecieverPoints, RunningBackPoints } from "./utils.mjs";
loadHeaderFooter();
getAndLoadPlayers();

async function getAndLoadPlayers(){
    const players = getLocalStorage('players') || []
    for (const id of players){
        await GetAndDisplayPlayer(id)
    }
    setupRemoveButtons(getAndLoadPlayers);
}

async function GetAndDisplayPlayer(id){
    const avgTotalPoints = 0
    const url=`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes?limit=1000&active=true`
    const playerDataWebs = await ApiToJSONFetcher(url)
    const playerRefs =  await playerDataWebs.items.map(item => item.$ref);
    for (const ref of playerRefs){
        const secureRef = ref.replace('http://', 'https://');
        const buildPlayer = await ApiToJSONFetcher(secureRef);
        if(buildPlayer.id === id){
            const name = buildPlayer.displayName;
            const teamurl = buildPlayer.team.$ref
            const secureRefT = await teamurl.replace('http://', 'https://');
            const teamData = await ApiToJSONFetcher(secureRefT);
            const team = teamData.displayName;
            const position = buildPlayer.position?.displayName || "";
            const statisticsURL = buildPlayer.statistics?.$ref || "";
            const secureRefS = await statisticsURL.replace('http://', 'https://');
            const statisticsData = await ApiToJSONFetcher(secureRefS);
            const headshot = buildPlayer.headshot?.href || '../public/images/default_player.png';
            console.log({ id, name, team, position, headshot,statisticsData });

            if (position === "Wide Receiver"){
                    let scoringCategory = null
                    for (const category of statisticsData.splits.categories){
                        if (category.name === "scoring"){
                           scoringCategory = category;
                           break
                            }
                    }
                    const gamesPlayed = statisticsData.splits.categories[0].stats[6].value
                    const totalRecieveingYards = statisticsData.splits.categories[3].stats[12].value
                    const receptions = statisticsData.splits.categories[3].stats[16].value
                    let avgReceptions = Math.floor(receptions/gamesPlayed)
                    if (receptions === 0 ) avgReceptions = 0
                    const avgGameGain = (totalRecieveingYards/gamesPlayed).toFixed(2)
                    const totalTouchdowns = scoringCategory ? scoringCategory.stats[6].value : 0;
                    let averageTouchdowns = (totalTouchdowns/gamesPlayed).toFixed(2)
                    if(totalTouchdowns === 0){averageTouchdowns = 0}

                    const playerAvgPoints = await WideRecieverPoints(avgGameGain, avgReceptions, averageTouchdowns)
                    console.log(playerAvgPoints);
                    let  playerhtml = document.querySelector('.players')
                    playerhtml.innerHTML += await DisplayPlayer(id, name, position, headshot,playerAvgPoints)
                    setupRemoveButtons();
            }
           
           
            else if (position === "Quarterback"){
                    let scoringCategory = null
                    for (const category of statisticsData.splits.categories){
                        if (category.name === "scoring"){
                           scoringCategory = category;
                           break
                            }
                    }
                    const totalGames = statisticsData.splits.categories[0].stats[6].value
                    const totalPassingTouchdowns = statisticsData.splits.categories[1].stats[18].value
                    const avgPassingTouchdowns = parseFloat((totalPassingTouchdowns/totalGames).toFixed(2))
                    const avgPassingYards = statisticsData.splits.categories[1].stats[22].value
                    const totalRushingYards = statisticsData.splits.categories[2].stats[12].value
                    const averageRushingYards = parseFloat(totalRushingYards/totalGames.toFixed(2))
                    const totalRushTouchdowns = scoringCategory.stats[8].value
                    const averageRushingTouchdowns = parseFloat((totalRushTouchdowns/totalGames).toFixed(2))
                    2
                    const totalFumbles = statisticsData.splits.categories[0].stats[0].value
                    let avgFumbles = parseFloat((totalFumbles/totalGames).toFixed(2))
                    if (totalFumbles === 0) avgFumbles = 0
                    const twoPointConversions = scoringCategory.stats[12].value
                    let average2PointConversions = parseFloat((twoPointConversions/totalGames).toFixed(2))
                    if (twoPointConversions === 0 ) average2PointConversions = 0

                    const playerAvgPoints= await QuarterbackPoints(avgPassingYards, avgPassingTouchdowns, averageRushingYards, averageRushingTouchdowns,avgFumbles,average2PointConversions)
                    console.log(playerAvgPoints)
                    let  playerhtml = document.querySelector('.players')
                    playerhtml.innerHTML += await DisplayPlayer(id, name, position, headshot,playerAvgPoints)  
            }
           
           
            else if (position === "Running Back"){
                let scoringCategory = null
                    for (const category of statisticsData.splits.categories){
                        if (category.name === "scoring"){
                           scoringCategory = category;
                           break
                            }
                    }
                    const totalGames = statisticsData.splits.categories[0].stats[6].value
                    const avgRushingYards = statisticsData.splits.categories[2].stats[5].value.toFixed(2)
                    const totalTouchdowns = scoringCategory ? scoringCategory.stats[8].value : 0;
                    let averageTouchdowns = parseFloat(totalTouchdowns/totalGames).toFixed(2)
                    if (totalTouchdowns === 0){
                        averageTouchdowns = 0;
                    }
            
                    const playerAvgPoints = await RunningBackPoints(avgRushingYards, averageTouchdowns)
                    console.log(playerAvgPoints);
                    let  playerhtml = document.querySelector('.players')
                    playerhtml.innerHTML += await DisplayPlayer(id, name, position, headshot,playerAvgPoints)
            }
           
           
            else if (position === "Tight End"){
                let scoringCategory = null
                    for (const category of statisticsData.splits.categories){
                        if (category.name === "scoring"){
                           scoringCategory = category;
                           break
                            }
                    }
                const gamesPlayed= statisticsData.splits.categories[0].stats[6].value
                const avgReceptions = parseFloat((statisticsData.splits.categories[3].stats[16].displayValue/gamesPlayed).toFixed(2))
                const totalRecieveingYards = statisticsData.splits.categories[3].stats[12].value
                const totalTouchdowns = scoringCategory ? scoringCategory.stats[6].value : 0;
                let averageTouchdowns = parseFloat((totalTouchdowns/gamesPlayed).toFixed(2))
                let avgGameGain= parseFloat((totalRecieveingYards/gamesPlayed).toFixed(2));
                if(totalTouchdowns === 0){avgGameGain = 0}
                console.log(avgGameGain, avgReceptions, averageTouchdowns);
                const playerAvgPoints = await WideRecieverPoints(avgGameGain, avgReceptions, averageTouchdowns)
                console.log(playerAvgPoints);
                let  playerhtml = document.querySelector('.players')
                    playerhtml.innerHTML += await DisplayPlayer(id, name, position, headshot,playerAvgPoints)
            }
        }   
    }
}
async function DisplayPlayer(id, name, position, headshot,playerAvgPoints) {
    const newPlayer = `
    <li class='Player_Card_Holders'>
        <div class = "playersHolder">
        <h1 class='card__names centered' >${name}</h1>
        <a class='player_Images'>
            <img class= 'player_Images'
            src='${headshot}' />
        </a>
        <h2>Position: ${position} </h2>
        <p>Player Fantasy Points Per Game: ${playerAvgPoints} <br>
            <div class="remove-container">
                <a href='#' class='remove' data-id='${id}'><strong>Remove Player</strong></a></p>
            </div>
        </div>
    </li>`
    const numberTotalFantasyPoints = document.getElementById("totalPoints");
    if(numberTotalFantasyPoints){
        const currentPoints = parseFloat(numberTotalFantasyPoints.textContent) || 0
        numberTotalFantasyPoints.textContent = currentPoints + playerAvgPoints
    }
    return newPlayer;
}

async function removePlayer(id){
    const players = getLocalStorage("players") || [];
            const updatedplayers = players.filter(playerId => String(playerId) !== String(id));;
            setLocalStorage("players",updatedplayers)

}
function setupRemoveButtons() {
    document.querySelectorAll(".remove").forEach(button => {
        button.replaceWith(button.cloneNode(true))
    });
  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log('Removing');
      //.closest part I learned from gpt during this project
      const id = event.target.closest('.remove').dataset.id;
      await removePlayer(id);
        console.log('RemovedPlayer');

      let  playerhtml = document.querySelector('.players')
      playerhtml.innerHTML = "";
      document.getElementById("totalPoints").textContent = 0;
     console.log('Refreshed');
       await getAndLoadPlayers();
    });
  });
}