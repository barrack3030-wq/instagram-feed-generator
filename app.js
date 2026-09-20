const canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d");
const state={layout:1,accent:"#d9f1ee",position:50,zoom:100,photo:null,logo:null};
const $=id=>document.getElementById(id);
const fields=["location","headline","subheadline","cta"];

function wrap(text,maxWidth,font){
  ctx.font=font; const words=(text||"").trim().split(/\s+/); let lines=[],line="";
  for(const word of words){const test=line?line+" "+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word}else line=test}
  if(line)lines.push(line); return lines;
}
function drawText(text,x,y,maxWidth,font,color,lineHeight,maxLines=4){
  ctx.font=font;ctx.fillStyle=color;ctx.textBaseline="top";
  const lines=wrap(text,maxWidth,font).slice(0,maxLines);
  lines.forEach((line,i)=>ctx.fillText(line,x,y+i*lineHeight));
  return lines.length;
}
function roundedRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.closePath()}
function photoBox(x,y,w,h){
  ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
  if(state.photo) drawImageCover(state.photo,x,y,w,h,state.position,state.zoom);
  else{
    const g=ctx.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,"#78929a");g.addColorStop(.5,"#42646e");g.addColorStop(1,"#102d38");
    ctx.fillStyle=g;ctx.fillRect(x,y,w,h);
    ctx.fillStyle="rgba(255,255,255,.55)";ctx.font="600 15px DM Sans";ctx.fillText("ADD YOUR TRAVEL PHOTO",x+30,y+h/2);
  }
  ctx.restore();
}
function drawImageCover(img,x,y,w,h,pos,zoom){
  const r=Math.max(w/img.width,h/img.height)*(zoom/100),nw=img.width*r,nh=img.height*r;
  const maxX=Math.max(0,nw-w),maxY=Math.max(0,nh-h);
  ctx.drawImage(img,x-maxX*pos/100,y-maxY*.5,nw,nh);
}
function overlay(x,y,w,h,top=0.03,bottom=.86){
  const g=ctx.createLinearGradient(x,y,x,y+h);g.addColorStop(0,"rgba(4,15,21,"+top+")");g.addColorStop(.55,"rgba(4,15,21,.10)");g.addColorStop(1,"rgba(4,15,21,"+bottom+")");
  ctx.fillStyle=g;ctx.fillRect(x,y,w,h);
}
function base(color="#eef0eb"){ctx.clearRect(0,0,1080,1350);ctx.fillStyle=color;ctx.fillRect(0,0,1080,1350)}
function logo(x,y,max){
  if(!state.logo)return;
  const r=Math.min(max/state.logo.width,max/state.logo.height);ctx.drawImage(state.logo,x,y,state.logo.width*r,state.logo.height*r);
}
function label(text,x,y,color=state.accent){ctx.font="700 12px DM Sans";ctx.fillStyle=color;ctx.fillText((text||"").toUpperCase(),x,y)}
function line(x1,y1,x2,y2,color="#b8c3c0"){ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}

function layout1(){
  base("#17323b");photoBox(0,0,1080,1350);overlay(0,0,1080,1350,.03,.9);
  label($(fields[0]).value,70,72);logo(875,55,135);
  ctx.font='600 78px "Playfair Display"';drawText($(fields[1]).value,70,850,890,'600 78px "Playfair Display"',"#fff",84,3);
  ctx.font="400 24px DM Sans";drawText($(fields[2]).value,72,1078,720,"400 24px DM Sans","#edf3f2",35,3);
  ctx.font="700 14px DM Sans";ctx.fillStyle=state.accent;ctx.fillText($(fields[3]).value.toUpperCase()+"  /  EXPLORE",72,1250);
}
function layout2(){
  base("#e7ebe7");ctx.fillStyle="#d4ddd9";ctx.fillRect(34,34,1012,1282);
  photoBox(66,66,948,790);ctx.fillStyle="#f8f8f4";ctx.fillRect(66,856,948,394);
  label($(fields[0]).value,110,912,"#647b7c");
  ctx.font='600 60px "Playfair Display"';drawText($(fields[1]).value,110,950,810,'600 60px "Playfair Display"',"#14272f",66,2);
  ctx.font="400 20px DM Sans";drawText($(fields[2]).value,112,1096,690,"400 20px DM Sans","#596b70",29,3);
  line(112,1195,790,1195);ctx.font="700 11px DM Sans";ctx.fillStyle="#4f6d70";ctx.fillText($(fields[3]).value.toUpperCase(),112,1215);logo(875,1172,82);
}
function layout3(){
  base("#f0eee8");label("FIELD NOTES / 01",70,68,"#27383d");line(70,92,1010,92);
  photoBox(70,138,570,700);
  ctx.font='600 55px "Playfair Display"';drawText($(fields[1]).value,690,180,300,'600 55px "Playfair Display"',"#18313a",62,4);
  ctx.font="400 18px DM Sans";drawText($(fields[2]).value,692,430,280,"400 18px DM Sans","#5c6b6d",27,5);
  label($(fields[0]).value,692,690,"#718887");
  ctx.font='600 30px "Playfair Display"';ctx.fillStyle="#18313a";ctx.fillText($(fields[3]).value,70,950);
  line(70,980,1010,980);ctx.font="400 13px DM Sans";ctx.fillStyle="#738084";ctx.fillText("A visual note from the road.",70,1028);logo(900,1090,90);
}
function layout4(){
  base("#122731");ctx.fillStyle="#122731";ctx.fillRect(0,0,510,1350);photoBox(510,0,570,1350);overlay(510,0,570,1350,.08,.42);
  label($(fields[0]).value,70,110);ctx.font='600 68px "Playfair Display"';drawText($(fields[1]).value,68,420,380,'600 68px "Playfair Display"',"#fff",74,4);
  ctx.font="400 20px DM Sans";drawText($(fields[2]).value,70,770,350,"400 20px DM Sans","#c9d7d9",29,5);
  ctx.font="700 12px DM Sans";ctx.fillStyle=state.accent;ctx.fillText($(fields[3]).value.toUpperCase()+"   →",70,1120);logo(70,1195,105);
}
function layout5(){
  base("#f5f3ed");photoBox(80,72,920,690);label($(fields[0]).value,80,820,"#536b6d");
  ctx.font='600 69px "Playfair Display"';drawText($(fields[1]).value,80,875,850,'600 69px "Playfair Display"',"#14282f",75,3);
  ctx.font="400 19px DM Sans";drawText($(fields[2]).value,82,1082,650,"400 19px DM Sans","#5a696d",28,4);
  line(82,1200,1000,1200);ctx.font="700 11px DM Sans";ctx.fillStyle="#18313a";ctx.fillText($(fields[3]).value.toUpperCase(),82,1228);logo(890,1210,75);
}
function layout6(){
  base("#dfe7e3");ctx.fillStyle="#f1f3ef";ctx.fillRect(44,44,992,1262);photoBox(70,70,940,760);
  ctx.fillStyle="#18333b";ctx.fillRect(70,830,940,400);ctx.fillStyle=state.accent;ctx.fillRect(70,830,8,400);
  label($(fields[0]).value,115,882);ctx.font='600 57px "Playfair Display"';drawText($(fields[1]).value,115,930,790,'600 57px "Playfair Display"',"#fff",64,3);
  ctx.font="400 18px DM Sans";drawText($(fields[2]).value,116,1100,680,"400 18px DM Sans","#d2dcdc",27,3);
  logo(890,1168,78);ctx.font="700 10px DM Sans";ctx.fillStyle="#18333b";ctx.fillText($(fields[3]).value.toUpperCase(),70,1270);
}
const layouts={1:layout1,2:layout2,3:layout3,4:layout4,5:layout5,6:layout6};
function render(){layouts[state.layout]()}
fields.forEach(id=>$(id).addEventListener("input",render));
["position","zoom"].forEach(id=>$(id).addEventListener("input",e=>{state[id]=+e.target.value;render()}));
document.querySelectorAll(".layout").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".layout").forEach(x=>x.classList.remove("active"));b.classList.add("active");
  state.layout=+b.dataset.layout;document.getElementById("layoutName").textContent=b.querySelector("b").textContent+" / Editorial";render();
}));
document.querySelectorAll(".swatches button").forEach(b=>b.addEventListener("click",()=>{
  state.accent=b.dataset.accent;document.querySelectorAll(".swatches button").forEach(x=>x.style.outline="");
  b.style.outline="2px solid rgba(255,255,255,.55)";b.style.outlineOffset="2px";render();
}));
function loadImage(input,key){input.addEventListener("change",()=>{const f=input.files[0];if(!f)return;const img=new Image();img.onload=()=>{state[key]=img;render()};img.src=URL.createObjectURL(f)})}
loadImage(document.getElementById("photoInput"),"photo");loadImage(document.getElementById("logoInput"),"logo");
function exportPNG(){render();const a=document.createElement("a");a.download="travel-feed-"+Date.now()+".png";a.href=canvas.toDataURL("image/png");a.click()}
document.getElementById("downloadTop").addEventListener("click",exportPNG);render();