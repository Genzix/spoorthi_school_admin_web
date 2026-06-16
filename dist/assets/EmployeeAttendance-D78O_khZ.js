import{p as st,b as r,j as e,i as E,k as n,m as q}from"./index-DLjENkrc.js";import{F as Fe,a as rt,b as it,d as lt}from"./index-BGtRKvl8.js";import{s as ne}from"./Search-BVAmrx5H.js";import{u as $,w as dt}from"./xlsx-D1NZSDnX.js";import{E as ct,a as pt}from"./jspdf.plugin.autotable-C3x-pDDg.js";import{F as ht,a as ft,C as gt}from"./FormGroup-DD5KQoEg.js";import{B as Se,D as xt,a as ut,b as mt,c as bt}from"./DialogTitle-Ds-LsB-7.js";import"./Portal-Cbjfu8Ux.js";const wt=q`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,Re=q`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,vt=q`
  from { opacity: 0; }
  to { opacity: 1; }
`,yt=q`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`,jt=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 20px;
`,T=n.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${wt} 1s ease-in-out infinite;
`,kt=n.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${Re} 1.5s ease-in-out infinite;
`,Ft=n.div`
  display: flex;
  width: 100%;
  height: 70px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${Re} 1.5s ease-in-out infinite;
  margin-bottom: 10px;
  border-radius: 8px;
`,St=n.div`
  padding: 20px;
  background-color: #FEA592;
  color: white;
  border-radius: 8px;
  text-align: center;
  margin: 20px auto;
  max-width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`,Et=n.button`
  padding: 8px 16px;
  background-color: white;
  color: #FF6745;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`,oe=n.div`
  padding: 2rem;
  background-color: #EFEFEF;
  min-height: 100vh;
  width: 100%;
`,ae=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 4vh;
  margin-bottom: 4vh;
  gap: 15px;
  background: #EFEFEF;
  border-radius: 10px;
  transition: all 0.3s ease;
`;n.div`
  display: flex;
  gap: 10px;
`;n.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #FFB942;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;const se=n.div`
  position: relative;
  width: 20vw;
`,re=n.input`
  padding: 10px 15px 10px 2.4vw;
  width: 100%;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #FFFFFF;
  background-color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  transition: all 0.3s;
  
  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`,ie=n.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none;
`;n.img`
  position: absolute;
  right: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 1vh;
  pointer-events: none;
`;n.div`
  position: relative;
  width: fit-content;
`;n.select`
  padding: 10px 15px 10px 1.2vw;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2vw;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;const Dt=n.div`
  background: #EFEFEF;
  overflow-x: auto;
  transition: all 0.3s ease;
  cursor: grab;
  user-select: none;
  
  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #FFB942;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #FFAC1E;
  }
`,Ct=n.div`
  display: inline-block;
  min-width: 100%;
`,At=n.table`
  min-width: 100%;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`,_=n.th.withConfig({shouldForwardProp:a=>!["leftAlign"].includes(a)})`
  background: #EFEFEF;
  padding: 1.8vh 0vw;
  text-align: ${a=>a.$leftAlign?"left":"center"};
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.7px;
  vertical-align: middle;
  font-weight: 400;
  color: #000000;
  border-bottom: 1px solid #A7A7A7;
  ${a=>a.$leftAlign&&"padding-left: 1vw;"}

  &:nth-child(1) { width: 20vw; }  /* Employee */
  &:nth-child(2) { width: 13vw; }  /* Employee No */
  &:nth-child(3) { width: 7vw; }   /* Attendance */
  &:nth-child(4) { width: 15vw; }  /* Remarks */
  &:nth-child(5) { width: 15vw; }   /* Edit */
`,Ee=n.tr`
  border-bottom: 1px solid #A7A7A7;
  transition: all 0.2s;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  font-weight: 400;

  &:hover {
    background-color: #FFF3DF;
    transform: scale(1);
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`,B=n.td.withConfig({shouldForwardProp:a=>!["leftAlign","isEditColumn"].includes(a)})`
  padding: 2vh 0vw;
  text-align: ${a=>a.$leftAlign?"left":"center"};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  vertical-align: middle;
  line-height: 1.5;
  ${a=>a.$leftAlign&&"padding-left: 25px;"}
  word-wrap: break-word;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${a=>a.$isEditColumn&&`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`,zt=n.span.withConfig({shouldForwardProp:a=>!["status"].includes(a)})`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({$status:a})=>a==="present"?"#BEFFB6":a==="absent"?"#FEA592":"#FFB942"};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  display: inline-block;
  transition: all 0.2s;
`,Rt=n.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 0.7vw;
  background-color: #FFB942;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  font-weight: 700;
  margin-right: 0.8vw;
  transition: all 0.2s;
`,$t=n.div`
  display: flex;
  align-items: center;
  transition: all 0.2s;
  min-width: 0;
`,Tt=n.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 0;
  overflow: hidden;
`,_t=n.div`
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Bt=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  font-weight: 700;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #000000;
`,De=n.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Ce=n.input`
  padding: 10px 15px;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`,It=n.button`
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #FFB942;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.7vh;

  &:hover {
    color: #FFAC1E;
    transform: scale(1.1);
  }
`,Mt=n.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 1vh;
`,H=n.button`
  padding: 6px 12px;
  border: 1px solid #FFB942;
  border-radius: 4px;
  background: ${a=>a.selected?"#FFB942":"white"};
  color: ${a=>a.selected?"white":"#FFB942"};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;

  &:hover {
    background: #FFB942;
    color: white;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`,Lt=n.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${vt} 0.3s ease-out;
`,Wt=n.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: ${yt} 0.3s ease-out;
`,Ot=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`,Pt=n.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.4rem;
  color: #333;
  margin: 0;
  font-weight: 500;
`,Nt=n.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 50%;
  width: 40px;
  height: 40px;

  &:hover {
    color: #000;
    background: #f5f5f5;
  }
`,Yt=n.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`,Ut=n.button`
  width: 100%;
  padding: 1.2rem;
  background: #FFB942;
  border: none;
  border-radius: 1rem;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #FFAC1E;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 185, 66, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,Xt=n.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`,Ht=n.h3`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 0.5rem 0;
`,qt=n.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`,Gt=n.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background-color: #FFB942;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
  }
`,Jt=n.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.8vw;
  width: 100%;
  margin-top: 8px;
  font-family: "Roboto", sans-serif;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`,Kt=n(xt)`
  .MuiDialog-paper {
    border-radius: 12px;
    padding: 20px;
  }
`,Qt=n(ut)`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
`,Vt=n(mt)`
  padding: 20px !important;
`,Zt=n(bt)`
  padding: 16px 24px !important;
`,en=n.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`,Ae=n.button`
  padding: 10px 20px;
  background-color: ${a=>a.isActive?"#4a6cf7":"#f5f5f5"};
  color: ${a=>a.isActive?"white":"#333"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${a=>a.isActive?"#3a5bd9":"#e0e0e0"};
  }
`,tn=n.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`,ze=n.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
`,mn=()=>{const{employees:a,loading:$e,error:nn,isRefreshing:le,refreshEmployees:Te}=st(),[D,_e]=r.useState([]),[I,G]=r.useState(""),[on,an]=r.useState(!1),[de,sn]=r.useState(null),[rn,Be]=r.useState(!1),[Ie,ce]=r.useState(!1),[Me,Le]=r.useState(0),[We,Oe]=r.useState(0),[j,M]=r.useState(new Date().toISOString().split("T")[0]),C=r.useRef(null),[Pe,L]=r.useState(!1),[b,pe]=r.useState(null),[u,W]=r.useState(null),[ln,Ne]=r.useState(null),[he,fe]=r.useState(!1),[O,ge]=r.useState(null),[xe,ue]=r.useState(!1),[J,Ye]=r.useState(""),[P,N]=r.useState(""),[Ue,Y]=r.useState(!1),[K,me]=r.useState("excel"),[Q,Xe]=r.useState(new Date().toISOString().split("T")[0]),[V,He]=r.useState(new Date().toISOString().split("T")[0]),[be,qe]=r.useState({name:!0,employee_no:!0,attendance:!0,remarks:!0}),Ge=[{id:"name",label:"Employee Name"},{id:"employee_no",label:"Employee No"},{id:"attendance",label:"Attendance Status"},{id:"remarks",label:"Remarks"}],Je=t=>{qe(o=>({...o,[t]:!o[t]}))},A=()=>{const t=new Date,o=5.5*60*60*1e3;return new Date(t.getTime()+o).toISOString().split("T")[0]},k=t=>{const o=new Date(t),s=5.5*60*60*1e3;return new Date(o.getTime()+s).toISOString().split("T")[0]},U=t=>new Date(t).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),Z=async()=>{try{ue(!0);const t=localStorage.getItem("token"),o=k(j),s=await E.get(`https://spoorthi-dev.genzix.space/employees/attendance/?start_date=${o}&end_date=${o}`,{headers:{Authorization:`Bearer ${t}`}});s.data.status==="success"&&_e(s.data.data)}catch(t){console.error("Failed to fetch attendance records",t)}finally{ue(!1)}};r.useEffect(()=>{a.length>0&&Z()},[j,a]);const Ke=()=>{Be(!0),Te()},F=t=>{if(xe)return"loading";const o=D.find(s=>s.employee.id===t&&s.date===j);return o?o.is_present?"present":"absent":"none"},Qe=t=>{const o=a.find(p=>p.id===t),s=F(t),l=D.find(p=>p.employee.id===t);pe(o),W(s),Ne(l==null?void 0:l.id),L(!0)},Ve=async()=>{var t,o,s;if(!(!b||!u))try{fe(!0);const l=localStorage.getItem("token"),p=k(j),f=D.find(c=>c.employee.id===b.id&&c.date===p);let d;if(f){const c={date:p,is_present:u==="present",remarks:u==="present"?"":P};d=await E.put(`https://spoorthi-dev.genzix.space/employees/attendance/${f.id}/`,c,{headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"}})}else{const c={employee_id:b.id,date:p,is_present:u==="present",remarks:u==="present"?"":P};d=await E.post("https://spoorthi-dev.genzix.space/employees/attendance/",c,{headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"}})}if(d.data&&d.data.status==="success")await Z(),L(!1),N("");else throw new Error(((t=d.data)==null?void 0:t.message)||"Failed to save attendance")}catch(l){console.error("Failed to save attendance:",l);const p=((s=(o=l.response)==null?void 0:o.data)==null?void 0:s.message)||l.message||"Failed to save attendance. Please try again.";alert(p)}finally{fe(!1)}},we=async(t,o)=>{try{const s=k(j);if(D.find(d=>d.employee.id===t&&d.date===s))return;if(!o){pe(a.find(d=>d.id===t)),W("absent"),N(""),L(!0);return}ge(t);const p=localStorage.getItem("token");(await E.post("https://spoorthi-dev.genzix.space/employees/attendance/",{employee_id:t,date:s,is_present:o,remarks:""},{headers:{Authorization:`Bearer ${p}`}})).data.status==="success"&&await Z()}catch(s){console.error("Failed to mark attendance",s)}finally{ge(null)}},ve=a.filter(t=>{const o=I.toLowerCase(),s=t.name.toLowerCase().includes(o),l=t.employee_no.toLowerCase().includes(o);return s||l}),Ze=t=>{ce(!0),Le(t.pageX-C.current.offsetLeft),Oe(C.current.scrollLeft)},ye=()=>{ce(!1)},et=t=>{if(!Ie)return;t.preventDefault();const s=(t.pageX-C.current.offsetLeft-Me)*2;C.current.scrollLeft=We-s};r.useEffect(()=>{const t=localStorage.getItem("userEmail");Ye(t),M(A())},[]);const tt=async()=>{try{const t=localStorage.getItem("token"),o=k(Q),s=k(V),l=await E.get(`https://spoorthi-dev.genzix.space/employees/attendance/?start_date=${o}&end_date=${s}`,{headers:{Authorization:`Bearer ${t}`}});if(l.data.status!=="success")throw new Error("Failed to fetch attendance records");const p=l.data.data,f={};p.forEach(g=>{const h=g.date;f[h]||(f[h]={}),f[h][g.employee.id]={is_present:g.is_present,remarks:g.remarks}});const d=[],c=new Date(o),ee=new Date(s);for(;c<=ee;)d.push(c.toISOString().split("T")[0]),c.setDate(c.getDate()+1);const i=[];i.push(["Employee Name","Employee No","Status","Remarks"]),d.forEach(g=>{i.push([U(g),"","",""]),a.forEach(h=>{var x;const m=(x=f[g])==null?void 0:x[h.id];i.push([h.name,h.employee_no,m?m.is_present?"Present":"Absent":"Not Marked",m&&!m.is_present&&m.remarks||"-"])}),i.push(["","","",""])});const z=$.aoa_to_sheet(i),X=[{wch:30},{wch:15},{wch:15},{wch:40}];z["!cols"]=X;const w=$.decode_range(z["!ref"]);for(let g=0;g<=w.e.r;g++){const h=z[$.encode_cell({r:g,c:0})];h&&h.v&&h.v.includes("2024")&&(h.s={font:{bold:!0,color:{rgb:"4A6CF7"}},alignment:{horizontal:"center"}})}const te=$.book_new();$.book_append_sheet(te,z,"Attendance"),dt(te,`employee_attendance_${o}_to_${s}.xlsx`)}catch(t){console.error("Failed to export attendance data",t)}},nt=async()=>{try{const t=localStorage.getItem("token"),o=k(Q),s=k(V),l=await E.get(`https://spoorthi-dev.genzix.space/employees/attendance/?start_date=${o}&end_date=${s}`,{headers:{Authorization:`Bearer ${t}`}});if(l.data.status!=="success")throw new Error("Failed to fetch attendance records");const p=l.data.data,f={};p.forEach(v=>{const S=v.date;f[S]||(f[S]={}),f[S][v.employee.id]={is_present:v.is_present,remarks:v.remarks}});const d=[],c=new Date(o),ee=new Date(s);for(;c<=ee;)d.push(c.toISOString().split("T")[0]),c.setDate(c.getDate()+1);const i=new ct("l","mm","a4"),z=i.internal.pageSize.width,X=i.internal.pageSize.height,w=15,g=30+10;i.setFontSize(14),i.setTextColor(74,108,247),i.text("Employee Attendance Report",w,20),i.setFontSize(10),i.setTextColor(100),i.text(`Date Range: ${U(o)} to ${U(s)}`,w,30);const h=["Employee Name","Employee No","Status","Remarks"],m=[50,30,25,70];let x=g,je=1;for(let v=0;v<d.length;v++){const S=d[v];x>X-w&&(i.addPage(),je++,x=w),i.setFontSize(12),i.setTextColor(74,108,247),i.text(U(S),w,x),x+=8;const at=a.map(y=>{var ke;const R=(ke=f[S])==null?void 0:ke[y.id];return[y.name,y.employee_no,R?R.is_present?"Present":"Absent":"Not Marked",R&&!R.is_present&&R.remarks||"-"]});pt(i,{head:[h],body:at,startY:x,theme:"grid",styles:{fontSize:8,cellPadding:2,overflow:"linebreak",cellWidth:"wrap",halign:"center",valign:"middle",font:"helvetica"},headStyles:{fillColor:[74,108,247],textColor:255,fontSize:9,fontStyle:"bold",halign:"center",valign:"middle",font:"helvetica"},alternateRowStyles:{fillColor:[245,245,245]},columnStyles:{0:{cellWidth:m[0],halign:"left"},1:{cellWidth:m[1]},2:{cellWidth:m[2]},3:{cellWidth:m[3],halign:"left"}},margin:{top:x,bottom:w},pageBreak:"auto",didDrawPage:function(y){i.setFontSize(8),i.setTextColor(100),i.text(`Page ${je}`,w,X-10)},willDrawCell:function(y){y.cell.text&&y.cell.text.length>50&&(y.cell.text=y.cell.text.substring(0,47)+"...")}}),x=i.lastAutoTable.finalY+10,v<d.length-1&&(x+=5)}i.save(`employee_attendance_${o}_to_${s}.pdf`)}catch(t){console.error("Failed to export attendance data",t),alert("Failed to export PDF. Please try again with a smaller date range.")}},ot=()=>{K==="excel"?tt():nt(),Y(!1)};return de?e.jsxs(oe,{children:[e.jsx(ae,{children:e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:e.jsxs(se,{children:[e.jsx(ie,{src:ne}),e.jsx(re,{type:"text",placeholder:"Search",value:I,onChange:t=>G(t.target.value),disabled:!0})]})})}),e.jsxs(St,{children:[e.jsx(Fe,{size:20}),de,e.jsxs(Et,{onClick:Ke,children:[e.jsx(rt,{size:16}),"Retry"]})]})]}):$e&&!le?e.jsxs(oe,{children:[e.jsx(ae,{children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px",flexWrap:"wrap"},children:[e.jsxs(se,{children:[e.jsx(ie,{src:ne}),e.jsx(re,{type:"text",placeholder:"Search",value:I,onChange:t=>G(t.target.value),disabled:!0})]}),J!=="incharge@gmail.com"&&e.jsx(De,{children:e.jsx(Ce,{type:"date",value:j,onChange:t=>M(t.target.value)})})]})}),e.jsxs(jt,{children:[e.jsx(T,{}),e.jsx(kt,{children:"Loading employees..."})]})]}):e.jsxs(oe,{children:[e.jsxs(ae,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px",flexWrap:"wrap"},children:[e.jsxs(se,{children:[e.jsx(ie,{src:ne}),e.jsx(re,{type:"text",placeholder:"Search",value:I,onChange:t=>G(t.target.value)})]}),J!=="incharge@gmail.com"&&e.jsx(De,{children:e.jsx(Ce,{type:"date",value:j,onChange:t=>M(t.target.value),max:A()})})]}),J!=="incharge@gmail.com"&&e.jsx("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:e.jsx(Gt,{onClick:()=>Y(!0),children:e.jsx(it,{size:20,strokeWidth:1.3})})})]}),e.jsx(Dt,{ref:C,onMouseDown:Ze,onMouseUp:ye,onMouseLeave:ye,onMouseMove:et,children:le||xe?e.jsx("div",{style:{padding:"20px"},children:[...Array(5)].map((t,o)=>e.jsx(Ft,{},o))}):ve.length===0?e.jsxs(Bt,{children:[e.jsx("h3",{children:"No employees found"}),e.jsx("div",{children:"Try adjusting your search"})]}):e.jsx(Ct,{children:e.jsxs(At,{children:[e.jsx("thead",{children:e.jsxs(Ee,{children:[e.jsx(_,{$leftAlign:!0,children:"Employee"}),e.jsx(_,{children:"Employee No"}),e.jsx(_,{children:"Attendance"}),e.jsx(_,{children:"Remarks"}),e.jsx(_,{children:"Edit"})]})}),e.jsx("tbody",{children:ve.map(t=>{const o=D.find(s=>s.employee.id===t.id&&s.date===j);return e.jsxs(Ee,{children:[e.jsx(B,{$leftAlign:!0,children:e.jsxs($t,{children:[e.jsx(Rt,{children:t.name.charAt(0).toUpperCase()}),e.jsx(Tt,{children:e.jsx(_t,{children:t.name})})]})}),e.jsx(B,{children:t.employee_no}),e.jsx(B,{children:F(t.id)==="loading"?e.jsx(T,{style:{width:"20px",height:"20px",borderWidth:"2px",margin:"0 auto"}}):e.jsx(zt,{$status:F(t.id),children:F(t.id)})}),e.jsx(B,{children:(o==null?void 0:o.remarks)||"-"}),e.jsx(B,{$isEditColumn:!0,children:F(t.id)==="loading"?e.jsx(T,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):F(t.id)==="none"?e.jsxs(Mt,{children:[e.jsx(H,{onClick:()=>we(t.id,!0),disabled:O===t.id,children:O===t.id?e.jsx(T,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):"Present"}),e.jsx(H,{onClick:()=>we(t.id,!1),disabled:O===t.id,children:O===t.id?e.jsx(T,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):"Absent"})]}):e.jsx(It,{onClick:()=>Qe(t.id),children:e.jsx(lt,{size:18})})})]},t.id)})})]})})}),Pe&&e.jsx(Lt,{children:e.jsxs(Wt,{children:[e.jsxs(Ot,{children:[e.jsx(Pt,{children:"Edit Attendance"}),e.jsx(Nt,{onClick:()=>L(!1),children:e.jsx(Fe,{})})]}),e.jsxs(Xt,{children:[e.jsx(Ht,{children:b==null?void 0:b.name}),e.jsx(qt,{children:b==null?void 0:b.employee_no})]}),e.jsxs(Yt,{children:[e.jsx(H,{selected:u==="present",onClick:()=>{W("present"),N("")},children:e.jsx("span",{children:"Present"})}),e.jsx(H,{selected:u==="absent",onClick:()=>W("absent"),children:e.jsx("span",{children:"Absent"})})]}),u==="absent"&&e.jsxs("div",{style:{marginTop:"20px",marginBottom:"30px"},children:[e.jsx("label",{style:{display:"block",marginBottom:"8px",fontSize:"0.9rem"},children:"Remarks (Required)"}),e.jsx(Jt,{type:"text",value:P,onChange:t=>N(t.target.value),placeholder:"Enter reason for absence",required:!0})]}),e.jsx(Ut,{onClick:Ve,disabled:he||!u||u==="absent"&&!P,children:he?"Saving...":"Save Attendance"})]})}),e.jsxs(Kt,{open:Ue,onClose:()=>Y(!1),maxWidth:"sm",fullWidth:!0,children:[e.jsx(Qt,{children:"Export Attendance Data"}),e.jsxs(Vt,{children:[e.jsxs(tn,{children:[e.jsx(ze,{type:"date",value:Q,onChange:t=>Xe(t.target.value),max:A()}),e.jsx("span",{children:"to"}),e.jsx(ze,{type:"date",value:V,onChange:t=>He(t.target.value),max:A()})]}),e.jsxs(en,{children:[e.jsx(Ae,{isActive:K==="excel",onClick:()=>me("excel"),children:"Excel"}),e.jsx(Ae,{isActive:K==="pdf",onClick:()=>me("pdf"),children:"PDF"})]}),e.jsx(ht,{children:Ge.map(t=>e.jsx(ft,{control:e.jsx(gt,{checked:be[t.id],onChange:()=>Je(t.id)}),label:t.label},t.id))})]}),e.jsxs(Zt,{children:[e.jsx(Se,{onClick:()=>Y(!1),children:"Cancel"}),e.jsx(Se,{onClick:ot,variant:"contained",color:"primary",disabled:!Object.values(be).some(Boolean),children:"Export"})]})]})]})};export{mn as default};
