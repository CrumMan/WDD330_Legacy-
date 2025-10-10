import{l as L,a as k,A as T,g as q,s as D}from"./utils-DOcU9-q_.js";L();M();async function M(){const s=k("id"),c=await(await T("https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes?limit=1000&active=true")).items.map(r=>r.$ref);for(const r of c){const i=await T(r);if(i.id==s){console.log(i);const n=i.displayName,y=i.team.$ref,d=(await T(y)).displayName,l=i.position?.displayName||"",P=i.statistics?.$ref||"",$=i.headshot?.href||"../public/images/default_player.png";if(P){const e=await T(P);console.log(e);const _=e?.splits?.categories?.length||0;if(l==="Wide Receiver"&&_>6){let o=null;for(const w of e.splits.categories)if(w.name==="scoring"){o=w;break}const u=e.splits.categories[0].stats[6].value,g=e.splits.categories[3].stats[12].value;console.log(g);const m=e.splits.categories[3].stats[16].value,v=(g/u).toFixed(2);console.log(v);const h=o?o.stats[6].value:0,p=e.splits.categories[3].stats[1].value;let b=(h/u).toFixed(2);h===0&&(b=0),document.querySelector(".player").innerHTML=await E(n,d,l,p,s,m,v,h,u,$,b),G()}else if(l==="Quarterback"&&_>6){for(const Y of e.splits.categories)if(Y.name==="scoring")break;const o=e.splits.categories[0].stats[6].value,u=e.splits.categories[1].stats[18].value,g=e.splits.categories[1].stats[39].value.toFixed(2),m=e.splits.categories[1].stats[22].value.toFixed(2),v=e.splits.categories[2].stats[5].value.toFixed(2),h=e.splits.categories[7].stats[8].value,p=e.splits.categories[7].stats[8].value,b=((g+p)*6).toFixed(0),w=(b/o).toFixed(2),H=((h+u)/o).toFixed(2),R=e.splits.categories[0].stats[0].value;let A=(R/o).toFixed(2);R===0&&(A=0);const C=e.splits.categories[1].stats[3].value,F=e.splits.categories[7].stats[12].value;let x=(F/o).toFixed(2);F===0&&(x=0),document.querySelector(".player").innerHTML=await B(n,d,l,o,m,g,b,v,p,w,H,C,$,s,A,x),G()}else if(l==="Running Back"&&_>6){let o=null;for(const p of e.splits.categories)if(p.name==="scoring"){o=p;break}const u=e.splits.categories[0].stats[6].value,g=e.splits.categories[2].stats[5].value.toFixed(2),m=o?o.stats[8].value:0;console.log("All categories:",e.splits.categories.map(p=>p.name));let v=(m/u).toFixed(2);m===0&&(v=0);const h=e.splits.categories[2].stats[1].value;document.querySelector(".player").innerHTML=await I(n,d,l,h,s,g,m,u,$,v),G()}else if(l==="Tight End"&&_>6){let o=null;for(const w of e.splits.categories)if(w.name==="scoring"){o=w;break}const u=e.splits.categories[3].stats[1].value,g=e.splits.categories[0].stats[6].value,m=(e.splits.categories[3].stats[16].displayValue/g).toFixed(2),v=e.splits.categories[3].stats[12].value,h=o?parseFloat(o.stats[6].value):0;let p=(h/g).toFixed(2);h===0&&(p=0);const b=(v/g).toFixed(2);document.querySelector(".player").innerHTML=await N(n,d,l,u,s,h,g,$,p,m,b),G()}else document.querySelector(".player").innerHTML=await S(n,d,l,$)}else document.querySelector(".player").innerHTML=await S(n,d,l,$)}}}async function B(s,t,a,c,r,i,n,y,f,d,l,P,$,e,_,o){return`<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class='card__name'>${s}   <a href='#' class = 'add' id='${e}'>+</a></h1>
     <h2 class='card_team_player'>${t}</h2>
  <a class='player_Image'>
  <img
  src='${$}' />
  </a>
  <h2>Position: ${a} </h2>
  </div>
  <div class='stats'>
        <h3>Stats</h3>
        <h4>General</h4>
        <p class='generalStats'>Rating: ${P}<br>
        Games Played: ${c}<br>
        Total Game Points: ${n}<br>
        Average Points Per Game: ${d}<br>
        Average Touchdowns per Game: ${l}</p>
        <h4>Passing</h4>
        <p class='passingStats'> Average Yards: ${r}<br> Average touchdowns: ${i}<p>
        <h4>Rushing</h4>
        <p class ='rushingStats'>Average Yards:${y}<br>
        Average Touchdowns: ${f}<br>
        <h4>Other</h4><br>
        Average Fumbles: ${_}<br>
        Average 2pt. Conversions: ${o}
        </p>
    </div>
</li>`}async function E(s,t,a,c,r,i,n,y,f,d,l){return`<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class='card__name'>${s}   <a href='#' class = 'add' id='${r}'>+</a></h1>
     <h2 class='card_team_player'>${t}</h2>
  <a class='player_Image'>
  <img
  src='${d}' />
  </a>
  <h2>Position: ${a} </h2>
  </div>
  <div class='stats'>
        <h3>Stats</h3>
        <h4>General</h4>
        <p class='generalStats'>Rating: ${c}<br>
        Games Played: ${f}<br>
        Total Touchdowns: ${y}<br>
        Average Receptions: ${i}<br>
        Average Yards Per Game: ${n}<br>
        Average Touchdowns per Game: ${l}</p>

    </div>
  </li>`}async function I(s,t,a,c,r,i,n,y,f,d){return`<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class='card__name'>${s}   <a href='#' class = 'add' id='${r}'>+</a></h1>
     <h2 class='card_team_player'>${t}</h2>
  <a class='player_Image'>
  <img
  src='${f}' />
  </a>
  <h2>Position: ${a} </h2>
  </div>
  <div class='stats'>
        <h3>Stats</h3>
        <h4>General</h4>
        <p class='generalStats'>Rating: ${c}<br>
        Games Played: ${y}<br>
        Total Touchdowns: ${n}<br>
        Average Yards Per Game: ${i}<br>
        Average Touchdowns per Game: ${d}</p>

    </div>
  </li>`}async function N(s,t,a,c,r,i,n,y,f,d,l){return`<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class='card__name'>${s}   <a href='#' class = 'add' id='${r}'>+</a></h1>
     <h2 class='card_team_player'>${t}</h2>
  <a class='player_Image'>
  <img
  src='${y}' />
  </a>
  <h2>Position: ${a} </h2>
  </div>
  <div class='stats'>
        <h3>Stats</h3>
        <h4>General</h4>
        <p class='generalStats'>Rating: ${c}<br>
        Games Played: ${n}<br>
        Total Touchdowns: ${i}<br>
        Average Receptions: ${d}<br>
        Average Yards Per Game: ${l}<br>
        Average Touchdowns per Game: ${f}</p>

    </div>
    </li>`}async function S(s,t,a,c){return`<li class='Player_Card_Holder'>
     <div class = "playerHolder">
     <h1 class'userConnect'class='card__name'>${s}</h1>
     <h2 class='card_team_player'>${t}</h2>
  <a class='player_Image'>
  <img
  src='${c}' />
  </a>
  <h2 class'userConnect'>Position: ${a} </h2>
  <p>This Player does not have the experience to be added to a legacy team.</p>
  </div>
  </li>`}async function W(s){const t=q("players")||[];t.includes(s)||(t.push(s),D("players",t))}function G(){document.querySelectorAll(".add").forEach(s=>{s.addEventListener("click",t=>{t.preventDefault();const a=t.target.id;W(a);const c=t.clientX,r=t.clientY;O(c,r)})})}function O(s,t){const a=document.createElement("div");a.className="flying-football",a.style.left=s+"px",a.style.top=t+"px",a.textContent="🏈",document.body.appendChild(a),setTimeout(()=>{const r=document.querySelector(".legacy-teamview").getBoundingClientRect();a.style.left=r.left+"px",a.style.top=r.top+"px",a.style.transform="rotate(720deg)",a.style.opacity="0"},10),setTimeout(()=>{a.remove()},1110)}
