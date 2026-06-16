import{j as t,n as yt,o as wt,b as u,k as r,i as q,m as de}from"./index-fkiekIN7.js";import{s as bt}from"./Search-BVAmrx5H.js";import{D as xt,P as vt,S as _t,V as _e,I as jt,T as D,F as St,p as Pe}from"./react-pdf.browser-BTJNQOfy.js";import{u as ve,w as kt}from"./xlsx-D1NZSDnX.js";import"./constants-DPngPhlz.js";const Dt="/assets/fee_recepit-BUz7zJGx.jpeg",Ft=i=>{const O=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"],G=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],C=["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],F=g=>{if(g===0)return"";let N="";if(g>=100&&(N+=O[Math.floor(g/100)]+" Hundred ",g%=100),g>=10){if(g<20)return N+=C[g-10]+" ",N;N+=G[Math.floor(g/10)]+" ",g%=10}return g>0&&(N+=O[g]+" "),N};if(i===0)return"Zero";let R="";return i>=1e7&&(R+=F(Math.floor(i/1e7))+"Crore ",i%=1e7),i>=1e5&&(R+=F(Math.floor(i/1e5))+"Lakh ",i%=1e5),i>=1e3&&(R+=F(Math.floor(i/1e3))+"Thousand ",i%=1e3),R+=F(i),R.trim()+" Rupees Only"};St.register({family:"Roboto",fonts:[{src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",fontWeight:300},{src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",fontWeight:400},{src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",fontWeight:500},{src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",fontWeight:700}]});const d=_t.create({page:{position:"relative",width:"100%",height:"100%",padding:0,overflow:"hidden"},container:{position:"relative",width:"100%",height:"51%"},bgImage:{position:"absolute",top:0,left:0,width:"100%",height:"52%",minHeight:"100%"},content:{position:"absolute",top:0,left:0,width:"100%",height:"52%",padding:20},field:{position:"absolute",fontSize:10,fontFamily:"Roboto",color:"#000000",fontWeight:400},receiptNo:{top:147.3,left:200,width:120},admissionNo:{top:170.6,left:200,width:120},studentName:{top:188,left:200,width:180},fatherName:{top:206,left:200,width:180},groupCourse:{top:224,left:200,width:180},paymentMode:{top:147.3,left:490,width:120},transactionId:{top:170.6,left:490,width:120},paymentDate:{top:188,left:440,width:180},term:{top:253.2,left:155,width:160},amount:{top:253.2,left:420,width:120},amount1:{top:268,left:420,width:120},remainingBalance:{top:298,left:506,width:120},amountInWords:{top:298,left:190,width:400}}),Ct=({data:i})=>{const{receiptNo:O="",admissionNo:G="",studentName:C="",fatherName:F="",group:R="",batch:g="",paymentMode:N="",transactionId:_="",feeDetails:Se=[],paymentDate:ee="",term:te="",amount:Z="",remainingBalance:$=""}=i||{},y=Ft(parseInt(Z));return t.jsxs(_e,{style:d.content,children:[t.jsx(D,{style:{...d.field,...d.receiptNo},children:O}),t.jsx(D,{style:{...d.field,...d.admissionNo},children:G}),t.jsx(D,{style:{...d.field,...d.studentName},children:C}),t.jsx(D,{style:{...d.field,...d.fatherName},children:F}),t.jsx(D,{style:{...d.field,...d.groupCourse},children:`${R} - ${g}`}),t.jsx(D,{style:{...d.field,...d.paymentMode},children:N}),_&&t.jsx(D,{style:{...d.field,...d.transactionId},children:_}),t.jsx(D,{style:{...d.field,...d.paymentDate},children:ee}),t.jsx(D,{style:{...d.field,...d.term},children:`Tuition Fee Term - ${te}`}),t.jsx(D,{style:{...d.field,...d.amount},children:Z}),t.jsx(D,{style:{...d.field,...d.amount1},children:Z}),$&&$!=="N/A"&&t.jsx(D,{style:{...d.field,...d.remainingBalance},children:$}),t.jsx(D,{style:{...d.field,...d.amountInWords},children:y})]})},Nt=({data:i})=>t.jsx(_e,{style:d.page,children:t.jsxs(_e,{style:d.container,children:[t.jsx(jt,{style:d.bgImage,src:Dt}),t.jsx(Ct,{data:i})]})}),Oe=({data:i})=>t.jsx(xt,{children:t.jsx(vt,{size:"A4",style:d.page,children:t.jsx(Nt,{data:i})})}),We=de`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;de`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;const me=de`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,je=de`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,Tt=r.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,Rt=r.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${We} 1s ease-in-out infinite;
`,At=r.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
`,Ye=r.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
`,Et=r.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$t=r.div`
  height: 85vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 39vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
`,It=r.div`
  height: 70vh;
  background: #ffffff;
  padding: 2vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`,zt=r.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 0.85vw;
  font-weight: 700;
  color: grey;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`,Mt=r.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,Lt=r.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  margin-top: 2vh;
 font-weight: 700;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,Bt=r.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,Pt=r.div`
  position: relative;
  width: 100%;
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Ot=r.input`
  padding: 10px 15px 10px 2.4vw;
  width: 100%;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #FFEAC7;
  background-color: #FFEAC7;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  transition: all 0.3s;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`,Yt=r.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none;
`,Ut=r.div`
  width: 100%;
  margin-top: 2vh;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 0.5vw;

  &::-webkit-scrollbar {
    width: 0.3vw;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`,Wt=r.div`
  display: flex;
  justify-content: space-between;
  padding: 1.1vh 1vw;
  background: #EFEFEF;
  border-radius: 0.6vw;
  margin-bottom: 1.4vh;
  font-family: "Roboto", sans-serif;
`,Ue=r.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,qt=r.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
`,z=r.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`,M=r.label`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #626060;
`,ce=r.input`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`,Jt=r.input`
  padding: 1.2vh 0.5vw;
  border-radius: 0.6vw;
  border: 1px solid #000000;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  background-color: transparent;
  color: #000000;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.2s;
  width: 8vw;
  height: 4vh;
  box-sizing: border-box;
  
  &:hover {
    background-color: #FFEAC7;
  }
  
  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
    background-color: #FFEAC7;
  }
`,le=r.select`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
`,Vt=r.button`
  padding: 1.5vh 1vw;
  background-color: ${i=>i.disabled?"#cccccc":"#BEFFB6"};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${i=>i.disabled?"not-allowed":"pointer"};
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  min-height: 4vh;

  &:hover {
    background-color: ${i=>i.disabled?"#cccccc":"#92FF84"};
  }
`,Ht=r.div`
  width: 1.2vw;
  height: 1.2vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${We} 1s ease-in-out infinite;
`,Gt=r.div`
  position: relative;
  width: 100%;
`,Zt=r.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 20vh;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.6vw;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,Kt=r.div`
  padding: 1vh 1vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;

  &:hover {
    background-color: #f1f1f1;
  }
`,Qt=r.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`,Xt=r.div`
  background-color: white;
  padding: 2vw;
  border-radius: 1.5vw;
  width: 35vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${me} 0.3s ease-in-out;
`,en=r.button`
  position: absolute;
  top: 1vw;
  right: 1vw;
  background: #f5f5f5;
  border: none;
  width: 1.8vw;
  height: 1.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: #666;
  font-size: 1.2vw;
  transition: all 0.2s;

  &:hover {
    background-color: #FFEAC7;
    color: #1a1a1a;
    transform: rotate(90deg);
  }
`,tn=r.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.1vw;
  margin-bottom: 1.5vw;
  color: #1a1a1a;
  font-weight: 400;
  text-align: center;
`,X=r.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  gap: 1vw;
`,L=r.div`
  font-family: "Roboto", sans-serif;
  padding: 0.8vw;
  border-radius: 0.8vw;
  transition: all 0.2s;
  background-color: #fafafa;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3vw;

  &:hover {
    background-color: #FFEAC7;
    transform: translateY(-2px);
  }
`,B=r.span`
  font-weight: 500;
  color: #666;
  font-size: 0.75vw;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,P=r.span`
  color: #000000;
  font-weight: 400;
  font-size: 0.9vw;
`,nn=r.button`
  background-color: #FFEAC7;
  color: #1a1a1a;
  border: none;
  padding: 1vh 1.5vw;
  border-radius: 0.8vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.9vw;
  font-weight: 400;
  margin-top: 1.5vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  transition: all 0.2s;

  &:hover {
    background-color: #FFB942;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`,on=r.div`
  position: fixed;
  top: 2vh;
  right: 2vw;
  background-color: #4CAF50;
  color: white;
  padding: 1.5vh 2vw;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.9vw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: ${i=>i.show?me:je} 0.3s ease-in-out;
  display: ${i=>i.show?"block":"none"};
`,an=r.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;
`,E=r.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;
`,rn=r.div`
  position: relative;
  display: inline-block;
`,sn=r.div`
  position: absolute;
  top: calc(100% + 0.5vh);
  right: 0;
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 0.6vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 10vw;
  max-height: 30vh;
  overflow-y: auto;
  display: ${i=>i.show?"block":"none"};
  animation: ${i=>i.show?me:je} 0.2s ease-in-out;

  &::-webkit-scrollbar {
    width: 0.3vw;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`,cn=r.div`
  padding: 1vh 1.2vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #FFEAC7;
  }

  ${i=>i.selected&&`
    background-color: #FFEAC7;
    font-weight: 500;
  `}
`,ln=r.div`
  position: relative;
  display: inline-block;
`,dn=r.div`
  position: absolute;
  top: calc(100% + 0.5vh);
  right: 0;
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 0.6vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 10vw;
  max-height: 30vh;
  overflow-y: auto;
  display: ${i=>i.show?"block":"none"};
  animation: ${i=>i.show?me:je} 0.2s ease-in-out;

  &::-webkit-scrollbar {
    width: 0.3vw;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`,mn=r.div`
  padding: 1vh 1.2vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #FFEAC7;
  }

  ${i=>i.selected&&`
    background-color: #FFEAC7;
    font-weight: 500;
  `}
`,yn=()=>{var Me,Le,Be;const{students:i,getFilteredStudents:O}=yt(),{academicYears:G,selectedAcademicYear:C}=wt(),[F,R]=u.useState(""),[g,N]=u.useState(null),[_,Se]=u.useState([]),[ee,te]=u.useState([]),[Z,$]=u.useState(!1),[y,ue]=u.useState("month"),[I,ke]=u.useState(new Date().toISOString().split("T")[0]),[qe,Je]=u.useState([]),he=new Date().getFullYear(),Ve=new Date().getMonth()+1;new Date().getDate();const[A,He]=u.useState(Ve),[ne,fe]=u.useState(!1),[j,Ge]=u.useState(Math.max(he,2025)),[oe,pe]=u.useState(!1),Ze=[{value:"cash",label:"Cash"},{value:"upi",label:"UPI"},{value:"card",label:"Card"},{value:"cheque",label:"Cheque"}],[c,ae]=u.useState({student:"",amount:"",payment_date:new Date().toISOString().split("T")[0],turn:"",payment_mode:"cash",transaction_number:"",bank_name_id:"",academic_year_id:""}),[K,ge]=u.useState(""),[ye,Ke]=u.useState([]),[Qe,we]=u.useState(!1),[l,J]=u.useState(null),[k,De]=u.useState(null),[Xe,Fe]=u.useState(!1),[et,re]=u.useState(!1),[tt,Ce]=u.useState(""),[Ne,Te]=u.useState(!1),[m,T]=u.useState({}),[se,be]=u.useState(!1),V=e=>(e??"").toString().trim().toLowerCase(),Re=e=>{var a,h;const n=((a=e==null?void 0:e.class_name)==null?void 0:a.name)||(e==null?void 0:e.class_name)||(e==null?void 0:e.class)||(e==null?void 0:e.student_class)||"N/A",o=((h=e==null?void 0:e.section)==null?void 0:h.name)||(e==null?void 0:e.section_name)||(e==null?void 0:e.section)||"N/A";return{className:n,sectionName:o}},Ae=e=>{const{className:n,sectionName:o}=Re(e);return`${e.name} (${e.admission_no}) - Class ${n} / Section ${o}`},Ee=u.useMemo(()=>{if(!Array.isArray(ye))return[];const e=V(K);return ye.map((o,a)=>{if(!e)return{student:o,score:2,index:a};const{className:h,sectionName:p}=Re(o),w=V(o.name),v=V(o.admission_no),b=V(h),s=V(p),f=V(`${o.name} ${o.admission_no} ${h} ${p}`);let x=999;return w.startsWith(e)||v.startsWith(e)?x=0:w.includes(e)||v.includes(e)||b.includes(e)||s.includes(e)?x=1:f.includes(e)&&(x=2),{student:o,score:x,index:a}}).filter(o=>o.score<999).sort((o,a)=>o.score-a.score||o.index-a.index).slice(0,50).map(o=>o.student)},[ye,K]),Y=e=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(e).replace("₹","₹"),U=e=>{try{const n=new Date(e);if(isNaN(n.getTime())){const a=e.split("-");if(a.length===3){const[h,p,w]=a,v=new Date(h,p-1,w);if(!isNaN(v.getTime())){const b={year:"numeric",month:"short",day:"numeric"};return v.toLocaleDateString("en-US",b)}}return e}const o={year:"numeric",month:"short",day:"numeric"};return n.toLocaleDateString("en-US",o)}catch(n){return console.error("Error formatting date:",n),e}},Q=e=>["January","February","March","April","May","June","July","August","September","October","November","December"][e-1],H=()=>localStorage.getItem("token"),$e=async()=>{try{$(!0);const e=H();if(!e){console.error("No authentication token found");return}const n=await q.get("https://spoorthischool.genzix.space/masters/fees-collection/",{headers:{Authorization:`Bearer ${e}`}});N(n.data.data)}catch(e){console.error("Error fetching fees data:",e)}finally{$(!1)}},Ie=async()=>{try{$(!0);const e=H();if(!e){console.error("No authentication token found");return}const n=await q.get("https://spoorthischool.genzix.space/masters/fees/",{headers:{Authorization:`Bearer ${e}`}});Se(n.data.data),te(n.data.data)}catch(e){console.error("Error fetching fees list:",e)}finally{$(!1)}},nt=async()=>{try{const e=H();if(!e)return;const n=await q.get("https://spoorthischool.genzix.space/masters/bank/",{headers:{Authorization:`Bearer ${e}`}});Je(n.data)}catch(e){console.error("Error fetching bank accounts:",e)}};u.useEffect(()=>{const e=O({searchTerm:K});Ke(e)},[K,i,O]),u.useEffect(()=>{let e=_;y==="day"?e=_.filter(n=>{try{const o=new Date(n.payment_date);return isNaN(o.getTime())?!1:o.toISOString().split("T")[0]===I}catch{return!1}}):y==="month"?e=_.filter(n=>{try{const o=new Date(n.payment_date);if(isNaN(o.getTime()))return!1;const a=o.getFullYear(),h=o.getMonth()+1;return a===j&&h===A}catch{return!1}}):y==="year"&&(e=_.filter(n=>{try{const o=new Date(n.payment_date);return isNaN(o.getTime())?!1:o.getFullYear()===j}catch{return!1}})),F&&(e=e.filter(n=>{const o=F.toLowerCase().trim(),a=n.student_name?n.student_name.toLowerCase():"",h=U(n.payment_date).toLowerCase(),p=n.receipt_no?n.receipt_no.toString().toLowerCase():"";return a.includes(o)||h.includes(o)||p.includes(o)})),te(e)},[F,_,y,I,A,j]),u.useEffect(()=>{$e(),Ie(),nt()},[]),u.useEffect(()=>{const e=n=>{ne&&!n.target.closest(".month-dropdown-container")&&fe(!1),oe&&!n.target.closest(".year-dropdown-container")&&pe(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[ne,oe]);const ot=()=>{if(!g)return"₹0";const e=g.monthly_collection.find(n=>n.month===Q(A)&&n.year===j);return e?Y(e.total):"₹0"},at=()=>{if(!g)return"₹0";if(_&&Array.isArray(_)){const n=_.filter(o=>{try{const a=new Date(o.payment_date);return isNaN(a.getTime())?!1:a.getFullYear()===j}catch{return!1}}).reduce((o,a)=>{const h=parseFloat(a.amount)||0;return o+h},0);return Y(n)}return j===he&&g.yearly_revenue?Y(g.yearly_revenue):"₹0"},rt=()=>{if(!g)return"₹0";const e=y==="day"?I:new Date().toISOString().split("T")[0],n=new Date(e),o=n.getDate(),a=n.getMonth()+1,h=n.getFullYear();if(g.daily_collection&&Array.isArray(g.daily_collection)){const p=g.daily_collection.find(w=>w.day===o&&w.month===Q(a)&&w.year===h);if(p)return Y(p.total)}if(_&&Array.isArray(_)){const w=_.filter(v=>{try{const b=new Date(v.payment_date);return isNaN(b.getTime())?!1:b.toISOString().split("T")[0]===e}catch(b){return console.error("Error parsing fee date:",b),!1}}).reduce((v,b)=>{const s=parseFloat(b.amount)||0;return v+s},0);return Y(w)}return"₹0"},st=()=>{try{let e,n;y==="day"?(e=I,n=`Fees_${new Date(I).toISOString().split("T")[0]}`):y==="month"?(n=`Fees_${j}_${A.toString().padStart(2,"0")}`,e=`${j}-${A.toString().padStart(2,"0")}`):y==="year"&&(n=`Fees_${j}`,e=j.toString());let o=[];if(y==="day"?o=_.filter(s=>{try{const f=new Date(s.payment_date);return isNaN(f.getTime())?!1:f.toISOString().split("T")[0]===e}catch{return!1}}):y==="month"?o=_.filter(s=>{try{const f=new Date(s.payment_date);if(isNaN(f.getTime()))return!1;const x=f.getFullYear(),S=f.getMonth()+1;return x===j&&S===A}catch{return!1}}):y==="year"&&(o=_.filter(s=>{try{const f=new Date(s.payment_date);return isNaN(f.getTime())?!1:f.getFullYear()===j}catch{return!1}})),o.length===0){alert("No fees found for the selected period.");return}const a=o.map(s=>{var f;return{"Receipt No":s.receipt_no||"N/A","Student Name":s.student_name,"Payment Date":U(s.payment_date),Amount:s.amount,Term:s.turn,"Payment Mode":s.payment_mode.charAt(0).toUpperCase()+s.payment_mode.slice(1),"Transaction Number":s.transaction_number||"N/A","Bank Name":((f=s.bank_name)==null?void 0:f.name)||"N/A"}}),p={"Receipt No":"TOTAL","Student Name":"","Payment Date":"",Amount:o.reduce((s,f)=>s+(parseFloat(f.amount)||0),0),Term:"","Payment Mode":"","Transaction Number":"","Bank Name":""},w=ve.book_new(),v=ve.json_to_sheet([...a,p]),b=[{wch:15},{wch:25},{wch:15},{wch:12},{wch:8},{wch:15},{wch:20},{wch:20}];v["!cols"]=b,ve.book_append_sheet(w,v,"Fees Report"),kt(w,`${n}.xlsx`),Ce("Excel file downloaded successfully!"),re(!0),setTimeout(()=>{re(!1)},3e3)}catch(e){console.error("Error generating Excel file:",e),alert("Failed to generate Excel file. Please try again.")}},W=e=>{const{name:n,value:o}=e.target;ae(a=>({...a,[n]:o}))},it=async e=>{ae(n=>({...n,student:e.id,turn:"",amount:""})),ge(Ae(e)),we(!1),T(n=>({...n,student:null})),be(!0);try{const n=H();if(!n){J({...e,fee_terms:[]}),be(!1);return}const o=await q.get(`https://spoorthischool.genzix.space/masters/students/${e.id}/term-pending-fees/`,{headers:{Authorization:`Bearer ${n}`}});if(o.data&&o.data.data&&o.data.data.terms){const a=o.data.data.terms.filter(h=>h.pending_amount>0);J({...e,fee_terms:a})}else if(o.data&&o.data.data){const h=(o.data.data.terms||o.data.data.fee_terms||[]).filter(p=>p.pending_amount>0);J({...e,fee_terms:h})}else J({...e,fee_terms:[]})}catch(n){console.error("Error fetching pending fee terms:",n),J({...e,fee_terms:[]})}finally{be(!1)}},ct=()=>{const e={};return(!l||!c.student)&&(e.student="Please select a student"),c.turn||(e.turn="Please select a term"),c.amount?(isNaN(c.amount)||parseFloat(c.amount)<=0)&&(e.amount="Please enter a valid amount"):e.amount="Please enter an amount",c.payment_date||(e.payment_date="Please select a payment date"),c.payment_mode||(e.payment_mode="Please select a payment mode"),c.payment_mode!=="cash"&&(c.transaction_number||(e.transaction_number="Please enter transaction number"),c.bank_name_id||(e.bank_name_id="Please select a bank")),T(e),Object.keys(e).length===0},lt=async e=>new Promise(async(n,o)=>{try{const p=await(await Pe(t.jsx(Oe,{data:e}))).toBlob(),w=window.URL.createObjectURL(p),v=window.open(w,"_blank");if(v){const b=new Date(e.originalDate).toISOString().split("T")[0];v.document.title=`Fee_Receipt_${e.studentName}_${b}`;const s=document.createElement("a");s.href=w,s.download=`Fee_Receipt_${e.studentName}_${b}.pdf`,v.document.body.appendChild(s),s.click(),setTimeout(()=>{v.close(),window.URL.revokeObjectURL(w),n()},1e3)}else{const b=new Date(e.originalDate).toISOString().split("T")[0],s=document.createElement("a");s.href=w,s.download=`Fee_Receipt_${e.studentName}_${b}.pdf`,document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>{window.URL.revokeObjectURL(w),n()},1e3)}}catch(a){console.error("Error generating receipt:",a),o(a)}}),dt=async e=>{if(e.preventDefault(),!ct())return;Te(!0);let n=!1;try{const o=H();if(!o){console.error("No authentication token found");return}const a=c.academic_year_id||(C==null?void 0:C.id),h={student:c.student,amount:parseFloat(c.amount),payment_date:c.payment_date,turn:parseInt(c.turn),payment_mode:c.payment_mode,academic_year_id:a};c.payment_mode!=="cash"&&(h.transaction_number=c.transaction_number,h.bank_account=c.bank_name_id);const p=await q.post("https://spoorthischool.genzix.space/masters/fees/",h,{headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});if(p.data&&p.data.data){n=!0;const w=parseFloat(c.amount)||0,b=l.fee_terms.reduce((f,x)=>f+x.pending_amount,0)-w,s={receiptNo:p.data.data.receipt_no,transactionId:p.data.data.transaction_number,studentName:l.name,admissionNo:l.admission_no,group:l.group||"N/A",batch:l.batch||"N/A",fatherName:l.father_name||"N/A",paymentDate:U(c.payment_date),originalDate:c.payment_date,paymentMode:c.payment_mode.charAt(0).toUpperCase()+c.payment_mode.slice(1),term:c.turn,amount:c.amount,remainingBalance:b>0?`₹${b.toFixed(2)}`:"₹0.00",academicYear:"2025-2026",feeDetails:[{particulars:`Term ${c.turn} Fee`,amount:c.amount}]};await Promise.all([Ie(),$e()]),ae({student:"",amount:"",payment_date:new Date().toISOString().split("T")[0],turn:"",payment_mode:"cash",transaction_number:"",bank_name_id:"",academic_year_id:""}),J(null),ge(""),T({}),Ce("Fee payment recorded successfully!"),re(!0),setTimeout(()=>{re(!1)},3e3);try{await lt(s)}catch(f){console.error("Error generating PDF:",f),alert("Payment recorded successfully but there was an error generating the receipt. Please try downloading it from the recent payments list.")}}}catch(o){console.error("Error submitting fee payment:",o);let a="Failed to record fee payment. Please try again.";o.response?(a=o.response.data.message||a,console.error("Error response:",o.response.data)):o.request?console.error("No response received:",o.request):console.error("Error setting up request:",o.message),alert(a)}finally{Te(!1)}},ie={marginTop:"auto",alignSelf:"flex-end",width:"auto",padding:"1.2vh 1vw",backgroundColor:"transparent",border:"1px solid #000000",color:"#000000",borderRadius:"0.6vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer"},xe={...ie,backgroundColor:"#FFEAC7"},mt={marginTop:"auto",alignSelf:"flex-end",width:"12vw",height:"5.5vh",padding:"1vh 0.7vw",backgroundColor:"#FFEAC7",border:"none",color:"#000000",borderRadius:"3vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer"},ut=r.div`
    font-family: "Roboto", sans-serif;
    font-size: 0.8vw;
    margin-top: 2vh;
    font-weight: 400;
    margin-right: 0.1vw;
    color: #000000;
    letter-spacing: 0.7px;
    transition: all 0.2s;
  `,ht=e=>{De(e),Fe(!0)},ze=()=>{Fe(!1),De(null)},ft=async e=>{try{const n=H(),a=(await q.get(`https://spoorthischool.genzix.space/masters/students/${e.student}/`,{headers:{Authorization:`Bearer ${n}`}})).data.data;let h="N/A";try{const x=await q.get(`https://spoorthischool.genzix.space/masters/students/${e.student}/term-pending-fees/`,{headers:{Authorization:`Bearer ${n}`}});if(x.data&&x.data.data&&x.data.data.terms){const S=x.data.data.terms.reduce((pt,gt)=>pt+gt.pending_amount,0);h=S>0?`₹${S.toFixed(2)}`:"₹0.00"}}catch(x){console.error("Error fetching pending fees:",x)}const p={receiptNo:e.receipt_no,transactionId:e.transaction_number,studentName:a.name,admissionNo:a.admission_no,group:a.group||"N/A",batch:a.batch||"N/A",fatherName:a.father_name||"N/A",paymentDate:U(e.payment_date),originalDate:e.payment_date,paymentMode:e.payment_mode.charAt(0).toUpperCase()+e.payment_mode.slice(1),term:e.turn,amount:e.amount,remainingBalance:h,academicYear:"2025-2026",feeDetails:[{particulars:`Term ${e.turn} Fee`,amount:e.amount}]},b=await(await Pe(t.jsx(Oe,{data:p}))).toBlob(),s=window.URL.createObjectURL(b),f=window.open(s,"_blank");if(f){const x=new Date(p.originalDate).toISOString().split("T")[0];f.document.title=`Fee_Receipt_${a.name}_${x}`;const S=document.createElement("a");S.href=s,S.download=`Fee_Receipt_${a.name}_${x}.pdf`,f.document.body.appendChild(S),S.click(),setTimeout(()=>{f.close(),window.URL.revokeObjectURL(s)},1e3)}else{const x=new Date(p.originalDate).toISOString().split("T")[0],S=document.createElement("a");S.href=s,S.download=`Fee_Receipt_${a.name}_${x}.pdf`,document.body.appendChild(S),S.click(),document.body.removeChild(S),setTimeout(()=>{window.URL.revokeObjectURL(s)},1e3)}}catch(n){console.error("Error generating receipt:",n),alert("Failed to generate receipt. Please try again.")}};return Z?t.jsx("div",{style:{height:" 75vh",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(Tt,{children:t.jsx(Rt,{})})}):t.jsxs(At,{children:[t.jsxs(on,{show:et,children:[t.jsx(an,{children:"✓"}),tt]}),t.jsxs(Ye,{children:[t.jsxs(Et,{children:[t.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:[t.jsx(zt,{children:"Fees Collection"}),t.jsxs(Bt,{children:["(",y==="day"?I===new Date().toISOString().split("T")[0]?"Today":U(I):y==="month"?`${Q(A)} ${j}`:j,")"]})]}),t.jsx(Mt,{children:g?y==="month"?ot():y==="year"?at():rt():"₹0"})]}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:[y==="day"&&t.jsx(Jt,{type:"date",value:I,onChange:e=>ke(e.target.value)}),t.jsx("button",{style:y==="day"?xe:ie,onClick:()=>{ue("day"),ke(new Date().toISOString().split("T")[0])},children:"Today"}),t.jsxs(rn,{className:"month-dropdown-container",children:[t.jsx("button",{style:y==="month"?xe:ie,onClick:()=>{ue("month"),fe(!ne)},children:Q(A)}),t.jsx(sn,{show:ne&&y==="month",children:[1,2,3,4,5,6,7,8,9,10,11,12].map(e=>t.jsx(cn,{selected:e===A,onClick:()=>{He(e),fe(!1)},children:Q(e)},e))})]}),t.jsxs(ln,{className:"year-dropdown-container",children:[t.jsx("button",{style:y==="year"?xe:ie,onClick:()=>{ue("year"),pe(!oe)},children:j}),t.jsx(dn,{show:oe&&y==="year",children:Array.from({length:Math.max(1,he-2025+1)},(e,n)=>2025+n).map(e=>t.jsx(mn,{selected:e===j,onClick:()=>{Ge(e),pe(!1)},children:e},e))})]})]}),t.jsx("button",{style:mt,onClick:st,children:"Download Excel"})]})]}),t.jsxs(It,{children:[t.jsxs(Pt,{children:[t.jsx(Yt,{src:bt}),t.jsx(Ot,{type:"text",placeholder:"Search by date, student name, or receipt number",value:F,onChange:e=>R(e.target.value)})]}),t.jsx(ut,{children:"Recent Payments"}),t.jsx(Ut,{children:ee.length>0?[...ee].reverse().map(e=>t.jsxs(Wt,{onClick:()=>ht(e),style:{cursor:"pointer"},children:[t.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:t.jsxs(Ue,{children:[U(e.payment_date)," - ",e.student_name]})}),t.jsx(Ue,{children:Y(e.amount)})]},e.id)):t.jsx("div",{style:{textAlign:"center",padding:"2vh 0",fontFamily:"Roboto, sans-serif",margin:"auto"},children:"No fees records found"})})]})]}),t.jsx(Ye,{children:t.jsxs($t,{children:[t.jsx(Lt,{style:{marginBottom:"3vh"},children:"Add Fee"}),t.jsxs(qt,{children:[t.jsxs(z,{children:[t.jsx(M,{children:"Academic Year*"}),t.jsxs(le,{name:"academic_year_id",value:c.academic_year_id||(C==null?void 0:C.id)||"",onChange:W,style:{borderColor:m.academic_year_id?"#ff4444":"#ccc"},required:!0,children:[t.jsx("option",{value:"",children:"Select Academic Year"}),G.map(e=>t.jsx("option",{value:e.id,children:e.name},e.id))]}),m.academic_year_id&&t.jsx(E,{children:m.academic_year_id})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Student*"}),t.jsxs(Gt,{children:[t.jsx(ce,{type:"text",style:{width:"100%",borderColor:m.student?"#ff4444":"#ccc"},placeholder:"Search by student name or admission no",value:K,onChange:e=>{ge(e.target.value),we(!0),l&&T(n=>({...n,student:null}))},onFocus:()=>we(!0)}),m.student&&t.jsx(E,{children:m.student}),Qe&&Ee.length>0&&t.jsx(Zt,{children:Ee.map(e=>t.jsx(Kt,{onClick:()=>it(e),children:Ae(e)},e.id))})]}),l&&t.jsx("div",{style:{marginTop:"0.5vh",fontSize:"0.7vw",color:"#666",fontFamily:"Roboto, sans-serif"},children:se?"Loading pending terms...":l.fee_terms?l.fee_terms.length>0?`Total pending: ₹${l.fee_terms.reduce((e,n)=>e+n.pending_amount,0).toFixed(2)}`:"No pending terms available":"Student selected"})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Term*"}),t.jsxs(le,{name:"turn",value:c.turn,onChange:e=>{var n;if(W(e),m.turn&&T(o=>({...o,turn:null})),e.target.value){const o=(n=l==null?void 0:l.fee_terms)==null?void 0:n.find(a=>a.term===parseInt(e.target.value));o&&ae(a=>({...a,amount:o.pending_amount.toString()}))}},style:{borderColor:m.turn?"#ff4444":"#ccc"},disabled:se||!l,required:!0,children:[t.jsx("option",{value:"",children:se?"Loading terms...":l?((Me=l==null?void 0:l.fee_terms)==null?void 0:Me.length)===0?"No pending terms available":`Select Term (${((Le=l==null?void 0:l.fee_terms)==null?void 0:Le.length)||0} available)`:"Select a student first"}),(Be=l==null?void 0:l.fee_terms)==null?void 0:Be.map(e=>t.jsxs("option",{value:e.term,children:["Term ",e.term," (₹",e.pending_amount.toFixed(2)," pending)"]},e.term))]}),m.turn&&t.jsx(E,{children:m.turn}),l&&l.fee_terms&&l.fee_terms.length===0&&!se&&t.jsx(E,{children:"No pending fee terms available for this student"})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Amount*"}),t.jsx(ce,{type:"number",name:"amount",value:c.amount,onChange:e=>{W(e),m.amount&&T(n=>({...n,amount:null}))},placeholder:l?"Enter amount":"Select a student first",style:{borderColor:m.amount?"#ff4444":"#ccc"},disabled:!l,required:!0}),m.amount&&t.jsx(E,{children:m.amount})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Payment Date*"}),t.jsx(ce,{type:"date",name:"payment_date",value:c.payment_date,onChange:e=>{W(e),m.payment_date&&T(n=>({...n,payment_date:null}))},style:{borderColor:m.payment_date?"#ff4444":"#ccc"},required:!0}),m.payment_date&&t.jsx(E,{children:m.payment_date})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Payment Mode*"}),t.jsx(le,{name:"payment_mode",value:c.payment_mode,onChange:e=>{W(e),m.payment_mode&&T(n=>({...n,payment_mode:null}))},style:{borderColor:m.payment_mode?"#ff4444":"#ccc"},required:!0,children:Ze.map(e=>t.jsx("option",{value:e.value,children:e.label},e.value))}),m.payment_mode&&t.jsx(E,{children:m.payment_mode})]}),c.payment_mode!=="cash"&&t.jsxs(t.Fragment,{children:[t.jsxs(z,{children:[t.jsx(M,{children:"Transaction Number*"}),t.jsx(ce,{type:"text",name:"transaction_number",value:c.transaction_number,onChange:e=>{W(e),m.transaction_number&&T(n=>({...n,transaction_number:null}))},placeholder:"Enter transaction number",style:{borderColor:m.transaction_number?"#ff4444":"#ccc"},required:!0}),m.transaction_number&&t.jsx(E,{children:m.transaction_number})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Bank*"}),t.jsxs(le,{name:"bank_name_id",value:c.bank_name_id,onChange:e=>{W(e),m.bank_name_id&&T(n=>({...n,bank_name_id:null}))},style:{borderColor:m.bank_name_id?"#ff4444":"#ccc"},required:!0,children:[t.jsx("option",{value:"",children:"Select Bank"}),qe.map(e=>t.jsxs("option",{value:e.id,children:[e.name," (",e.code,")"]},e.id))]}),m.bank_name_id&&t.jsx(E,{children:m.bank_name_id})]})]}),t.jsx(Vt,{onClick:dt,disabled:Ne,children:Ne?t.jsxs(t.Fragment,{children:[t.jsx(Ht,{}),"Recording Payment..."]}):"Record Payment"})]})]})}),Xe&&k&&t.jsx(Qt,{onClick:ze,children:t.jsxs(Xt,{onClick:e=>e.stopPropagation(),children:[t.jsx(en,{onClick:ze,children:"×"}),t.jsx(tn,{children:"Fee Details"}),t.jsxs(X,{children:[t.jsxs(L,{children:[t.jsx(B,{children:"Student Name"}),t.jsx(P,{children:k.student_name})]}),t.jsxs(L,{children:[t.jsx(B,{children:"Amount"}),t.jsx(P,{children:Y(k.amount)})]})]}),t.jsxs(X,{children:[t.jsxs(L,{children:[t.jsx(B,{children:"Payment Date"}),t.jsx(P,{children:U(k.payment_date)})]}),t.jsxs(L,{children:[t.jsx(B,{children:"Term"}),t.jsx(P,{children:k.turn})]})]}),t.jsxs(X,{children:[t.jsxs(L,{children:[t.jsx(B,{children:"Payment Mode"}),t.jsx(P,{children:k.payment_mode.charAt(0).toUpperCase()+k.payment_mode.slice(1)})]}),k.transaction_number&&t.jsxs(L,{children:[t.jsx(B,{children:"Transaction No"}),t.jsx(P,{children:k.transaction_number})]})]}),k.receipt_no&&t.jsx(X,{children:t.jsxs(L,{children:[t.jsx(B,{children:"Receipt No"}),t.jsx(P,{children:k.receipt_no})]})}),k.bank_name&&t.jsx(X,{children:t.jsxs(L,{children:[t.jsx(B,{children:"Bank"}),t.jsx(P,{children:k.bank_name.name})]})}),t.jsx(nn,{onClick:()=>ft(k),children:"Download Receipt"})]})})]})};export{yn as default};
