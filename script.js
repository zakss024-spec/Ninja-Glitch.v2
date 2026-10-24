const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const history=JSON.parse(localStorage.getItem("ng_history")||"[]");
const names=["Zetas","Marcel","hanz","hadzzx","Rawoos","raps","fazy","BLEH","BLEHAJA","ABLEH","bleho","blehyo","samz","rizal","rehan","sanz","Caell"];
let current="home";

function addHistory(action){
  history.unshift({time:new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}),action});
  history.splice(20); localStorage.setItem("ng_history",JSON.stringify(history));
}
function typeLines(lines){
  const box=$("#console"); box.innerHTML="";
  lines.forEach((x,i)=>setTimeout(()=>{box.innerHTML+=`<div class="${x[1]||""}">${x[0]}</div>`;box.scrollTop=box.scrollHeight},i*220));
}
function openPage(page){
  current=page;
  $$(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  if(page==="home"){ $("#app").classList.remove("hidden"); window.scrollTo({top:0,behavior:"smooth"}); return; }
  const title=page.toUpperCase();
  $("#modalKicker").textContent=`/// ${title} MODULE`;
  $("#modalTitle").textContent=title;
  $("#modalBody").innerHTML=pageContent(page);
  $("#pageModal").classList.add("show");
  addHistory(`Opened ${title}`);
  bindModal(page);
}
function pageContent(p){
 if(p==="glitch") return `<div class="form-grid"><div class="field"><label>CONSOLE LABEL</label><input id="gLabel" value="root@ninja:~$"></div><div class="field"><label>SIMULATION MESSAGE</label><textarea id="gMsg">visual glitch sequence ready</textarea></div><button class="neon-btn" id="gRun">RUN VISUAL</button><div id="gOut" class="console"></div></div>`;
 if(p==="osint") return `<p style="color:var(--muted);line-height:1.7">Public-information practice lab. Masukkan nama/topik fiktif atau informasi publik non-sensitif untuk membuat ringkasan lokal.</p><div class="field"><label>TOPIC</label><input id="osTopic" placeholder="contoh: sejarah internet"></div><button class="neon-btn" id="osRun">ANALYZE</button><div id="osOut" class="console"></div>`;
 if(p==="network") return `<div class="field"><label>LOCAL LOAD LEVEL</label><input id="load" type="range" min="1" max="100" value="40"></div><button class="neon-btn" id="netRun">START LOCAL SIMULATION</button><div id="netOut" class="console"></div>`;
 if(p==="wifi") return `<p style="color:var(--muted);line-height:1.7">Sandbox edukasi Wi-Fi. Tidak memutus atau mengganggu perangkat apa pun.</p><div class="check-list">${["Channel scanner","Signal meter","Packet concept","Security checklist"].map(x=>`<label class="check"><span>${x}</span><input type="checkbox"></label>`).join("")}</div><button class="neon-btn" id="wifiRun">SCAN SANDBOX</button>`;
 if(p==="otp") return `<div class="form-grid"><div class="field"><label>DUMMY NUMBER</label><input id="otpNum" placeholder="+62 xxx"></div><button class="neon-btn" id="otpRun">GENERATE DUMMY OTP</button><div id="otpOut" class="console"></div></div>`;
 if(p==="rat") return `<p style="color:var(--muted);line-height:1.7">RAT Lab hanya menampilkan console palsu untuk belajar UI. Tidak ada remote access, persistence, atau kontrol perangkat.</p><div class="terminal"><div id="ratOut" class="console"></div></div><button class="neon-btn" id="ratRun">RUN FAKE CONSOLE</button>`;
 if(p==="ninja") return `<div class="hero panel" style="min-height:240px"><div class="eyebrow">/// ORIGINAL CHARACTER</div><h1 style="font-size:34px">NINJA<br><span>PROTOCOL</span></h1><p>Karakter ninja original dengan idle animation dan neon aura.</p><div style="font-size:70px;filter:drop-shadow(0 0 20px #bd19ff);animation:pulse 1.2s infinite">🥷</div></div>`;
 if(p==="tools") return `<div class="grid">${["OSINT","NETWORK LAB","WI-FI LAB","OTP LAB","AI ASSISTANT","RAT LAB"].map(x=>`<div class="tool-card"><span>◇</span><b>${x}</b><small>Local safe module</small></div>`).join("")}</div>`;
 if(p==="lab") return `<div class="form-grid"><div class="field"><label>NEON INTENSITY</label><input type="range" id="neon" min="10" max="100" value="55"></div><div class="field"><label>SCANLINES</label><input type="range" id="scan" min="0" max="100" value="45"></div><button class="neon-btn" id="labApply">APPLY UI</button></div>`;
 if(p==="history") return `<div>${history.length?history.map(x=>`<div class="log"><b>[${x.time}]</b> ${x.action}</div>`).join(""):`<div class="console">No activity yet.</div>`}</div>`;
 return `<div class="form-grid"><div class="field"><label>PROFILE</label><input value="Zakss" id="profile"></div><div class="field"><label>THEME</label><input value="Neon Purple" disabled></div><button class="neon-btn" id="saveSettings">SAVE LOCAL</button></div>`;
}
function bindModal(p){
 if(p==="glitch") $("#gRun").onclick=()=>{addHistory("Ran visual glitch simulation");$("#gOut").innerHTML="<div>loading visual layer...</div><div>injecting neon scan...</div><div class='ok'>✓ simulation complete — local only</div>";};
 if(p==="osint") $("#osRun").onclick=()=>{let t=$("#osTopic").value||"untitled";$("#osOut").innerHTML=`<div>query: ${escapeHtml(t)}</div><div>sources: local knowledge</div><div class='ok'>✓ analysis generated</div>`;addHistory("OSINT local analysis");};
 if(p==="network") $("#netRun").onclick=()=>{let n=$("#load").value;$("#netOut").innerHTML=`<div>local load: ${n}%</div><div>packets simulated: ${n*37}</div><div class='ok'>✓ no external traffic sent</div>`;addHistory("Network lab simulation");};
 if(p==="wifi") $("#wifiRun").onclick=()=>alert("Sandbox scan complete. No real devices were touched.");
 if(p==="otp") $("#otpRun").onclick=()=>{$("#otpOut").innerHTML=`<div>number: ${escapeHtml($("#otpNum").value||"not set")}</div><div class='warn'>dummy code: 482731</div><div class='ok'>✓ local simulation only</div>`;addHistory("Dummy OTP generated");};
 if(p==="rat") $("#ratRun").onclick=()=>{const out=$("#ratOut");out.innerHTML="";["connecting to sandbox...","handshake simulated","session: LOCAL-SIM","remote control: disabled","✓ finished"].forEach((x,i)=>setTimeout(()=>out.innerHTML+=`<div>${x}</div>`,i*350));addHistory("RAT fake console");};
 if(p==="lab") $("#labApply").onclick=()=>alert("UI settings applied locally.");
 if(p==="settings") $("#saveSettings").onclick=()=>{localStorage.setItem("ng_profile",$("#profile").value);alert("Saved locally.");addHistory("Saved settings");};
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

$$("[data-page]").forEach(b=>b.addEventListener("click",()=>openPage(b.dataset.page)));
$("#modalClose").onclick=()=>$("#pageModal").classList.remove("show");
$("#menuBtn").onclick=()=>$("#drawer").classList.add("show");
$("#closeDrawer").onclick=()=>$("#drawer").classList.remove("show");
$("#powerBtn").onclick=()=>alert("Ninja Glitch tetap berjalan dalam mode lokal.");
$("#runBtn").onclick=()=>{addHistory("Executed home visual simulation");typeLines([["$ ninja_glitch --local"],["initializing neon engine..."],["loading modules..."],["✓ all systems simulated","ok"],["no external requests were made","warn"]]);};

let p=0; const iv=setInterval(()=>{p+=5;$("#bootProgress").style.width=p+"%";if(p>=100){clearInterval(iv);setTimeout(()=>{$("#boot").remove();$("#fingerprint").style.display="grid";typeLines([["$ boot --local"],["biometric interface ready..."]])},250)}},45);
