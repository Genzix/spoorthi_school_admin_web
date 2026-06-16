import{j as t,n as ft,o as ht,b as m,k as r,i as W,m as ce}from"./index-DLjENkrc.js";import{s as pt}from"./Search-BVAmrx5H.js";import{D as gt,P as wt,S as yt,V as xe,I as bt,T as D,F as xt,p as ze}from"./react-pdf.browser-Bs4WFYTe.js";import{u as be,w as vt}from"./xlsx-D1NZSDnX.js";import"./constants-DPngPhlz.js";const _t="/assets/fee_recepit-BUz7zJGx.jpeg",jt=s=>{const O=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"],V=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],C=["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],F=h=>{if(h===0)return"";let N="";if(h>=100&&(N+=O[Math.floor(h/100)]+" Hundred ",h%=100),h>=10){if(h<20)return N+=C[h-10]+" ",N;N+=V[Math.floor(h/10)]+" ",h%=10}return h>0&&(N+=O[h]+" "),N};if(s===0)return"Zero";let R="";return s>=1e7&&(R+=F(Math.floor(s/1e7))+"Crore ",s%=1e7),s>=1e5&&(R+=F(Math.floor(s/1e5))+"Lakh ",s%=1e5),s>=1e3&&(R+=F(Math.floor(s/1e3))+"Thousand ",s%=1e3),R+=F(s),R.trim()+" Rupees Only"};xt.register({family:"Roboto",fonts:[{src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",fontWeight:300},{src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",fontWeight:400},{src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",fontWeight:500},{src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",fontWeight:700}]});const l=yt.create({page:{position:"relative",width:"100%",height:"100%",padding:0,overflow:"hidden"},container:{position:"relative",width:"100%",height:"51%"},bgImage:{position:"absolute",top:0,left:0,width:"100%",height:"52%",minHeight:"100%"},content:{position:"absolute",top:0,left:0,width:"100%",height:"52%",padding:20},field:{position:"absolute",fontSize:10,fontFamily:"Roboto",color:"#000000",fontWeight:400},receiptNo:{top:147.3,left:200,width:120},admissionNo:{top:170.6,left:200,width:120},studentName:{top:188,left:200,width:180},fatherName:{top:206,left:200,width:180},groupCourse:{top:224,left:200,width:180},paymentMode:{top:147.3,left:490,width:120},transactionId:{top:170.6,left:490,width:120},paymentDate:{top:188,left:440,width:180},term:{top:253.2,left:155,width:160},amount:{top:253.2,left:420,width:120},amount1:{top:268,left:420,width:120},remainingBalance:{top:298,left:506,width:120},amountInWords:{top:298,left:190,width:400}}),St=({data:s})=>{const{receiptNo:O="",admissionNo:V="",studentName:C="",fatherName:F="",group:R="",batch:h="",paymentMode:N="",transactionId:x="",feeDetails:_e=[],paymentDate:Q="",term:X="",amount:G="",remainingBalance:$=""}=s||{},p=jt(parseInt(G));return t.jsxs(xe,{style:l.content,children:[t.jsx(D,{style:{...l.field,...l.receiptNo},children:O}),t.jsx(D,{style:{...l.field,...l.admissionNo},children:V}),t.jsx(D,{style:{...l.field,...l.studentName},children:C}),t.jsx(D,{style:{...l.field,...l.fatherName},children:F}),t.jsx(D,{style:{...l.field,...l.groupCourse},children:`${R} - ${h}`}),t.jsx(D,{style:{...l.field,...l.paymentMode},children:N}),x&&t.jsx(D,{style:{...l.field,...l.transactionId},children:x}),t.jsx(D,{style:{...l.field,...l.paymentDate},children:Q}),t.jsx(D,{style:{...l.field,...l.term},children:`Tuition Fee Term - ${X}`}),t.jsx(D,{style:{...l.field,...l.amount},children:G}),t.jsx(D,{style:{...l.field,...l.amount1},children:G}),$&&$!=="N/A"&&t.jsx(D,{style:{...l.field,...l.remainingBalance},children:$}),t.jsx(D,{style:{...l.field,...l.amountInWords},children:p})]})},kt=({data:s})=>t.jsx(xe,{style:l.page,children:t.jsxs(xe,{style:l.container,children:[t.jsx(bt,{style:l.bgImage,src:_t}),t.jsx(St,{data:s})]})}),Me=({data:s})=>t.jsx(gt,{children:t.jsx(wt,{size:"A4",style:l.page,children:t.jsx(kt,{data:s})})}),Le=ce`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;ce`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;const de=ce`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,ve=ce`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,Dt=r.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,Ft=r.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${Le} 1s ease-in-out infinite;
`,Ct=r.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
`,Be=r.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
`,Nt=r.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Tt=r.div`
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
`,Rt=r.div`
  height: 70vh;
  background: #ffffff;
  padding: 2vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`,At=r.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 0.85vw;
  font-weight: 700;
  color: grey;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`,Et=r.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,$t=r.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  margin-top: 2vh;
 font-weight: 700;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,It=r.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,zt=r.div`
  position: relative;
  width: 100%;
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Mt=r.input`
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
`,Bt=r.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none;
`,Pt=r.div`
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
`,Lt=r.div`
  display: flex;
  justify-content: space-between;
  padding: 1.1vh 1vw;
  background: #EFEFEF;
  border-radius: 0.6vw;
  margin-bottom: 1.4vh;
  font-family: "Roboto", sans-serif;
`,Pe=r.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,Ot=r.div`
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
`,se=r.input`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`,Yt=r.input`
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
`,ie=r.select`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
`,Ut=r.button`
  padding: 1.5vh 1vw;
  background-color: ${s=>s.disabled?"#cccccc":"#BEFFB6"};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  min-height: 4vh;

  &:hover {
    background-color: ${s=>s.disabled?"#cccccc":"#92FF84"};
  }
`,qt=r.div`
  width: 1.2vw;
  height: 1.2vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${Le} 1s ease-in-out infinite;
`,Wt=r.div`
  position: relative;
  width: 100%;
`,Jt=r.div`
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
`,Ht=r.div`
  padding: 1vh 1vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;

  &:hover {
    background-color: #f1f1f1;
  }
`,Vt=r.div`
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
`,Gt=r.div`
  background-color: white;
  padding: 2vw;
  border-radius: 1.5vw;
  width: 35vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${de} 0.3s ease-in-out;
`,Zt=r.button`
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
`,Kt=r.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.1vw;
  margin-bottom: 1.5vw;
  color: #1a1a1a;
  font-weight: 400;
  text-align: center;
`,K=r.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  gap: 1vw;
`,B=r.div`
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
`,P=r.span`
  font-weight: 500;
  color: #666;
  font-size: 0.75vw;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,L=r.span`
  color: #000000;
  font-weight: 400;
  font-size: 0.9vw;
`,Qt=r.button`
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
`,Xt=r.div`
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
  animation: ${s=>s.show?de:ve} 0.3s ease-in-out;
  display: ${s=>s.show?"block":"none"};
`,en=r.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;
`,E=r.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;
`,tn=r.div`
  position: relative;
  display: inline-block;
`,nn=r.div`
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
  display: ${s=>s.show?"block":"none"};
  animation: ${s=>s.show?de:ve} 0.2s ease-in-out;

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
`,on=r.div`
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

  ${s=>s.selected&&`
    background-color: #FFEAC7;
    font-weight: 500;
  `}
`,rn=r.div`
  position: relative;
  display: inline-block;
`,an=r.div`
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
  display: ${s=>s.show?"block":"none"};
  animation: ${s=>s.show?de:ve} 0.2s ease-in-out;

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
`,sn=r.div`
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

  ${s=>s.selected&&`
    background-color: #FFEAC7;
    font-weight: 500;
  `}
`,fn=()=>{var Ee,$e,Ie;const{students:s,getFilteredStudents:O}=ft(),{academicYears:V,selectedAcademicYear:C}=ht(),[F,R]=m.useState(""),[h,N]=m.useState(null),[x,_e]=m.useState([]),[Q,X]=m.useState([]),[G,$]=m.useState(!1),[p,le]=m.useState("month"),[I,je]=m.useState(new Date().toISOString().split("T")[0]),[Oe,Ye]=m.useState([]),ue=new Date().getFullYear(),Ue=new Date().getMonth()+1;new Date().getDate();const[A,qe]=m.useState(Ue),[ee,me]=m.useState(!1),[v,We]=m.useState(Math.max(ue,2025)),[te,fe]=m.useState(!1),Je=[{value:"cash",label:"Cash"},{value:"upi",label:"UPI"},{value:"card",label:"Card"},{value:"cheque",label:"Cheque"}],[c,ne]=m.useState({student:"",amount:"",payment_date:new Date().toISOString().split("T")[0],turn:"",payment_mode:"cash",transaction_number:"",bank_name_id:"",academic_year_id:""}),[he,pe]=m.useState(""),[Se,He]=m.useState([]),[Ve,ge]=m.useState(!1),[d,J]=m.useState(null),[k,ke]=m.useState(null),[Ge,De]=m.useState(!1),[Ze,oe]=m.useState(!1),[Ke,Fe]=m.useState(""),[Ce,Ne]=m.useState(!1),[u,T]=m.useState({}),[re,we]=m.useState(!1),Y=e=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(e).replace("₹","₹"),U=e=>{try{const n=new Date(e);if(isNaN(n.getTime())){const a=e.split("-");if(a.length===3){const[g,w,b]=a,_=new Date(g,w-1,b);if(!isNaN(_.getTime())){const y={year:"numeric",month:"short",day:"numeric"};return _.toLocaleDateString("en-US",y)}}return e}const o={year:"numeric",month:"short",day:"numeric"};return n.toLocaleDateString("en-US",o)}catch(n){return console.error("Error formatting date:",n),e}},Z=e=>["January","February","March","April","May","June","July","August","September","October","November","December"][e-1],H=()=>localStorage.getItem("token"),Te=async()=>{try{$(!0);const e=H();if(!e){console.error("No authentication token found");return}const n=await W.get("https://spoorthi-dev.genzix.space/masters/fees-collection/",{headers:{Authorization:`Bearer ${e}`}});N(n.data.data)}catch(e){console.error("Error fetching fees data:",e)}finally{$(!1)}},Re=async()=>{try{$(!0);const e=H();if(!e){console.error("No authentication token found");return}const n=await W.get("https://spoorthi-dev.genzix.space/masters/fees/",{headers:{Authorization:`Bearer ${e}`}});_e(n.data.data),X(n.data.data)}catch(e){console.error("Error fetching fees list:",e)}finally{$(!1)}},Qe=async()=>{try{const e=H();if(!e)return;const n=await W.get("https://spoorthi-dev.genzix.space/masters/bank/",{headers:{Authorization:`Bearer ${e}`}});Ye(n.data)}catch(e){console.error("Error fetching bank accounts:",e)}};m.useEffect(()=>{const e=O({searchTerm:he});He(e)},[he,s,O]),m.useEffect(()=>{let e=x;p==="day"?e=x.filter(n=>{try{const o=new Date(n.payment_date);return isNaN(o.getTime())?!1:o.toISOString().split("T")[0]===I}catch{return!1}}):p==="month"?e=x.filter(n=>{try{const o=new Date(n.payment_date);if(isNaN(o.getTime()))return!1;const a=o.getFullYear(),g=o.getMonth()+1;return a===v&&g===A}catch{return!1}}):p==="year"&&(e=x.filter(n=>{try{const o=new Date(n.payment_date);return isNaN(o.getTime())?!1:o.getFullYear()===v}catch{return!1}})),F&&(e=e.filter(n=>{const o=F.toLowerCase().trim(),a=n.student_name?n.student_name.toLowerCase():"",g=U(n.payment_date).toLowerCase(),w=n.receipt_no?n.receipt_no.toString().toLowerCase():"";return a.includes(o)||g.includes(o)||w.includes(o)})),X(e)},[F,x,p,I,A,v]),m.useEffect(()=>{Te(),Re(),Qe()},[]),m.useEffect(()=>{const e=n=>{ee&&!n.target.closest(".month-dropdown-container")&&me(!1),te&&!n.target.closest(".year-dropdown-container")&&fe(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[ee,te]);const Xe=()=>{if(!h)return"₹0";const e=h.monthly_collection.find(n=>n.month===Z(A)&&n.year===v);return e?Y(e.total):"₹0"},et=()=>{if(!h)return"₹0";if(x&&Array.isArray(x)){const n=x.filter(o=>{try{const a=new Date(o.payment_date);return isNaN(a.getTime())?!1:a.getFullYear()===v}catch{return!1}}).reduce((o,a)=>{const g=parseFloat(a.amount)||0;return o+g},0);return Y(n)}return v===ue&&h.yearly_revenue?Y(h.yearly_revenue):"₹0"},tt=()=>{if(!h)return"₹0";const e=p==="day"?I:new Date().toISOString().split("T")[0],n=new Date(e),o=n.getDate(),a=n.getMonth()+1,g=n.getFullYear();if(h.daily_collection&&Array.isArray(h.daily_collection)){const w=h.daily_collection.find(b=>b.day===o&&b.month===Z(a)&&b.year===g);if(w)return Y(w.total)}if(x&&Array.isArray(x)){const b=x.filter(_=>{try{const y=new Date(_.payment_date);return isNaN(y.getTime())?!1:y.toISOString().split("T")[0]===e}catch(y){return console.error("Error parsing fee date:",y),!1}}).reduce((_,y)=>{const i=parseFloat(y.amount)||0;return _+i},0);return Y(b)}return"₹0"},nt=()=>{try{let e,n;p==="day"?(e=I,n=`Fees_${new Date(I).toISOString().split("T")[0]}`):p==="month"?(n=`Fees_${v}_${A.toString().padStart(2,"0")}`,e=`${v}-${A.toString().padStart(2,"0")}`):p==="year"&&(n=`Fees_${v}`,e=v.toString());let o=[];if(p==="day"?o=x.filter(i=>{try{const f=new Date(i.payment_date);return isNaN(f.getTime())?!1:f.toISOString().split("T")[0]===e}catch{return!1}}):p==="month"?o=x.filter(i=>{try{const f=new Date(i.payment_date);if(isNaN(f.getTime()))return!1;const j=f.getFullYear(),S=f.getMonth()+1;return j===v&&S===A}catch{return!1}}):p==="year"&&(o=x.filter(i=>{try{const f=new Date(i.payment_date);return isNaN(f.getTime())?!1:f.getFullYear()===v}catch{return!1}})),o.length===0){alert("No fees found for the selected period.");return}const a=o.map(i=>{var f;return{"Receipt No":i.receipt_no||"N/A","Student Name":i.student_name,"Payment Date":U(i.payment_date),Amount:i.amount,Term:i.turn,"Payment Mode":i.payment_mode.charAt(0).toUpperCase()+i.payment_mode.slice(1),"Transaction Number":i.transaction_number||"N/A","Bank Name":((f=i.bank_name)==null?void 0:f.name)||"N/A"}}),w={"Receipt No":"TOTAL","Student Name":"","Payment Date":"",Amount:o.reduce((i,f)=>i+(parseFloat(f.amount)||0),0),Term:"","Payment Mode":"","Transaction Number":"","Bank Name":""},b=be.book_new(),_=be.json_to_sheet([...a,w]),y=[{wch:15},{wch:25},{wch:15},{wch:12},{wch:8},{wch:15},{wch:20},{wch:20}];_["!cols"]=y,be.book_append_sheet(b,_,"Fees Report"),vt(b,`${n}.xlsx`),Fe("Excel file downloaded successfully!"),oe(!0),setTimeout(()=>{oe(!1)},3e3)}catch(e){console.error("Error generating Excel file:",e),alert("Failed to generate Excel file. Please try again.")}},q=e=>{const{name:n,value:o}=e.target;ne(a=>({...a,[n]:o}))},ot=async e=>{ne(n=>({...n,student:e.id,turn:"",amount:""})),pe(`${e.name} (${e.admission_no})`),ge(!1),T(n=>({...n,student:null})),we(!0);try{const n=H();if(!n){J({...e,fee_terms:[]}),we(!1);return}const o=await W.get(`https://spoorthi-dev.genzix.space/masters/students/${e.id}/term-pending-fees/`,{headers:{Authorization:`Bearer ${n}`}});if(o.data&&o.data.data&&o.data.data.terms){const a=o.data.data.terms.filter(g=>g.pending_amount>0);J({...e,fee_terms:a})}else if(o.data&&o.data.data){const g=(o.data.data.terms||o.data.data.fee_terms||[]).filter(w=>w.pending_amount>0);J({...e,fee_terms:g})}else J({...e,fee_terms:[]})}catch(n){console.error("Error fetching pending fee terms:",n),J({...e,fee_terms:[]})}finally{we(!1)}},rt=()=>{const e={};return(!d||!c.student)&&(e.student="Please select a student"),c.turn||(e.turn="Please select a term"),c.amount?(isNaN(c.amount)||parseFloat(c.amount)<=0)&&(e.amount="Please enter a valid amount"):e.amount="Please enter an amount",c.payment_date||(e.payment_date="Please select a payment date"),c.payment_mode||(e.payment_mode="Please select a payment mode"),c.payment_mode!=="cash"&&(c.transaction_number||(e.transaction_number="Please enter transaction number"),c.bank_name_id||(e.bank_name_id="Please select a bank")),T(e),Object.keys(e).length===0},at=async e=>new Promise(async(n,o)=>{try{const w=await(await ze(t.jsx(Me,{data:e}))).toBlob(),b=window.URL.createObjectURL(w),_=window.open(b,"_blank");if(_){const y=new Date(e.originalDate).toISOString().split("T")[0];_.document.title=`Fee_Receipt_${e.studentName}_${y}`;const i=document.createElement("a");i.href=b,i.download=`Fee_Receipt_${e.studentName}_${y}.pdf`,_.document.body.appendChild(i),i.click(),setTimeout(()=>{_.close(),window.URL.revokeObjectURL(b),n()},1e3)}else{const y=new Date(e.originalDate).toISOString().split("T")[0],i=document.createElement("a");i.href=b,i.download=`Fee_Receipt_${e.studentName}_${y}.pdf`,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>{window.URL.revokeObjectURL(b),n()},1e3)}}catch(a){console.error("Error generating receipt:",a),o(a)}}),st=async e=>{if(e.preventDefault(),!rt())return;Ne(!0);let n=!1;try{const o=H();if(!o){console.error("No authentication token found");return}const a=c.academic_year_id||(C==null?void 0:C.id),g={student:c.student,amount:parseFloat(c.amount),payment_date:c.payment_date,turn:parseInt(c.turn),payment_mode:c.payment_mode,academic_year_id:a};c.payment_mode!=="cash"&&(g.transaction_number=c.transaction_number,g.bank_account=c.bank_name_id);const w=await W.post("https://spoorthi-dev.genzix.space/masters/fees/",g,{headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}});if(w.data&&w.data.data){n=!0;const b=parseFloat(c.amount)||0,y=d.fee_terms.reduce((f,j)=>f+j.pending_amount,0)-b,i={receiptNo:w.data.data.receipt_no,transactionId:w.data.data.transaction_number,studentName:d.name,admissionNo:d.admission_no,group:d.group||"N/A",batch:d.batch||"N/A",fatherName:d.father_name||"N/A",paymentDate:U(c.payment_date),originalDate:c.payment_date,paymentMode:c.payment_mode.charAt(0).toUpperCase()+c.payment_mode.slice(1),term:c.turn,amount:c.amount,remainingBalance:y>0?`₹${y.toFixed(2)}`:"₹0.00",academicYear:"2025-2026",feeDetails:[{particulars:`Term ${c.turn} Fee`,amount:c.amount}]};await Promise.all([Re(),Te()]),ne({student:"",amount:"",payment_date:new Date().toISOString().split("T")[0],turn:"",payment_mode:"cash",transaction_number:"",bank_name_id:"",academic_year_id:""}),J(null),pe(""),T({}),Fe("Fee payment recorded successfully!"),oe(!0),setTimeout(()=>{oe(!1)},3e3);try{await at(i)}catch(f){console.error("Error generating PDF:",f),alert("Payment recorded successfully but there was an error generating the receipt. Please try downloading it from the recent payments list.")}}}catch(o){console.error("Error submitting fee payment:",o);let a="Failed to record fee payment. Please try again.";o.response?(a=o.response.data.message||a,console.error("Error response:",o.response.data)):o.request?console.error("No response received:",o.request):console.error("Error setting up request:",o.message),alert(a)}finally{Ne(!1)}},ae={marginTop:"auto",alignSelf:"flex-end",width:"auto",padding:"1.2vh 1vw",backgroundColor:"transparent",border:"1px solid #000000",color:"#000000",borderRadius:"0.6vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer"},ye={...ae,backgroundColor:"#FFEAC7"},it={marginTop:"auto",alignSelf:"flex-end",width:"12vw",height:"5.5vh",padding:"1vh 0.7vw",backgroundColor:"#FFEAC7",border:"none",color:"#000000",borderRadius:"3vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer"},ct=r.div`
    font-family: "Roboto", sans-serif;
    font-size: 0.8vw;
    margin-top: 2vh;
    font-weight: 400;
    margin-right: 0.1vw;
    color: #000000;
    letter-spacing: 0.7px;
    transition: all 0.2s;
  `,dt=e=>{ke(e),De(!0)},Ae=()=>{De(!1),ke(null)},lt=async e=>{try{const n=H(),a=(await W.get(`https://spoorthi-dev.genzix.space/masters/students/${e.student}/`,{headers:{Authorization:`Bearer ${n}`}})).data.data;let g="N/A";try{const j=await W.get(`https://spoorthi-dev.genzix.space/masters/students/${e.student}/term-pending-fees/`,{headers:{Authorization:`Bearer ${n}`}});if(j.data&&j.data.data&&j.data.data.terms){const S=j.data.data.terms.reduce((ut,mt)=>ut+mt.pending_amount,0);g=S>0?`₹${S.toFixed(2)}`:"₹0.00"}}catch(j){console.error("Error fetching pending fees:",j)}const w={receiptNo:e.receipt_no,transactionId:e.transaction_number,studentName:a.name,admissionNo:a.admission_no,group:a.group||"N/A",batch:a.batch||"N/A",fatherName:a.father_name||"N/A",paymentDate:U(e.payment_date),originalDate:e.payment_date,paymentMode:e.payment_mode.charAt(0).toUpperCase()+e.payment_mode.slice(1),term:e.turn,amount:e.amount,remainingBalance:g,academicYear:"2025-2026",feeDetails:[{particulars:`Term ${e.turn} Fee`,amount:e.amount}]},y=await(await ze(t.jsx(Me,{data:w}))).toBlob(),i=window.URL.createObjectURL(y),f=window.open(i,"_blank");if(f){const j=new Date(w.originalDate).toISOString().split("T")[0];f.document.title=`Fee_Receipt_${a.name}_${j}`;const S=document.createElement("a");S.href=i,S.download=`Fee_Receipt_${a.name}_${j}.pdf`,f.document.body.appendChild(S),S.click(),setTimeout(()=>{f.close(),window.URL.revokeObjectURL(i)},1e3)}else{const j=new Date(w.originalDate).toISOString().split("T")[0],S=document.createElement("a");S.href=i,S.download=`Fee_Receipt_${a.name}_${j}.pdf`,document.body.appendChild(S),S.click(),document.body.removeChild(S),setTimeout(()=>{window.URL.revokeObjectURL(i)},1e3)}}catch(n){console.error("Error generating receipt:",n),alert("Failed to generate receipt. Please try again.")}};return G?t.jsx("div",{style:{height:" 75vh",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(Dt,{children:t.jsx(Ft,{})})}):t.jsxs(Ct,{children:[t.jsxs(Xt,{show:Ze,children:[t.jsx(en,{children:"✓"}),Ke]}),t.jsxs(Be,{children:[t.jsxs(Nt,{children:[t.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:[t.jsx(At,{children:"Fees Collection"}),t.jsxs(It,{children:["(",p==="day"?I===new Date().toISOString().split("T")[0]?"Today":U(I):p==="month"?`${Z(A)} ${v}`:v,")"]})]}),t.jsx(Et,{children:h?p==="month"?Xe():p==="year"?et():tt():"₹0"})]}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:[p==="day"&&t.jsx(Yt,{type:"date",value:I,onChange:e=>je(e.target.value)}),t.jsx("button",{style:p==="day"?ye:ae,onClick:()=>{le("day"),je(new Date().toISOString().split("T")[0])},children:"Today"}),t.jsxs(tn,{className:"month-dropdown-container",children:[t.jsx("button",{style:p==="month"?ye:ae,onClick:()=>{le("month"),me(!ee)},children:Z(A)}),t.jsx(nn,{show:ee&&p==="month",children:[1,2,3,4,5,6,7,8,9,10,11,12].map(e=>t.jsx(on,{selected:e===A,onClick:()=>{qe(e),me(!1)},children:Z(e)},e))})]}),t.jsxs(rn,{className:"year-dropdown-container",children:[t.jsx("button",{style:p==="year"?ye:ae,onClick:()=>{le("year"),fe(!te)},children:v}),t.jsx(an,{show:te&&p==="year",children:Array.from({length:Math.max(1,ue-2025+1)},(e,n)=>2025+n).map(e=>t.jsx(sn,{selected:e===v,onClick:()=>{We(e),fe(!1)},children:e},e))})]})]}),t.jsx("button",{style:it,onClick:nt,children:"Download Excel"})]})]}),t.jsxs(Rt,{children:[t.jsxs(zt,{children:[t.jsx(Bt,{src:pt}),t.jsx(Mt,{type:"text",placeholder:"Search by date, student name, or receipt number",value:F,onChange:e=>R(e.target.value)})]}),t.jsx(ct,{children:"Recent Payments"}),t.jsx(Pt,{children:Q.length>0?[...Q].reverse().map(e=>t.jsxs(Lt,{onClick:()=>dt(e),style:{cursor:"pointer"},children:[t.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:t.jsxs(Pe,{children:[U(e.payment_date)," - ",e.student_name]})}),t.jsx(Pe,{children:Y(e.amount)})]},e.id)):t.jsx("div",{style:{textAlign:"center",padding:"2vh 0",fontFamily:"Roboto, sans-serif",margin:"auto"},children:"No fees records found"})})]})]}),t.jsx(Be,{children:t.jsxs(Tt,{children:[t.jsx($t,{style:{marginBottom:"3vh"},children:"Add Fee"}),t.jsxs(Ot,{children:[t.jsxs(z,{children:[t.jsx(M,{children:"Academic Year*"}),t.jsxs(ie,{name:"academic_year_id",value:c.academic_year_id||(C==null?void 0:C.id)||"",onChange:q,style:{borderColor:u.academic_year_id?"#ff4444":"#ccc"},required:!0,children:[t.jsx("option",{value:"",children:"Select Academic Year"}),V.map(e=>t.jsx("option",{value:e.id,children:e.name},e.id))]}),u.academic_year_id&&t.jsx(E,{children:u.academic_year_id})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Student*"}),t.jsxs(Wt,{children:[t.jsx(se,{type:"text",style:{width:"100%",borderColor:u.student?"#ff4444":"#ccc"},placeholder:"Search by student name or admission no",value:he,onChange:e=>{pe(e.target.value),ge(!0),d&&T(n=>({...n,student:null}))},onFocus:()=>ge(!0)}),u.student&&t.jsx(E,{children:u.student}),Ve&&Se.length>0&&t.jsx(Jt,{children:Se.map(e=>t.jsxs(Ht,{onClick:()=>ot(e),children:[e.name," (",e.admission_no,") - ",e.group||"N/A"]},e.id))})]}),d&&t.jsx("div",{style:{marginTop:"0.5vh",fontSize:"0.7vw",color:"#666",fontFamily:"Roboto, sans-serif"},children:re?"Loading pending terms...":d.fee_terms?d.fee_terms.length>0?`Total pending: ₹${d.fee_terms.reduce((e,n)=>e+n.pending_amount,0).toFixed(2)}`:"No pending terms available":"Student selected"})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Term*"}),t.jsxs(ie,{name:"turn",value:c.turn,onChange:e=>{var n;if(q(e),u.turn&&T(o=>({...o,turn:null})),e.target.value){const o=(n=d==null?void 0:d.fee_terms)==null?void 0:n.find(a=>a.term===parseInt(e.target.value));o&&ne(a=>({...a,amount:o.pending_amount.toString()}))}},style:{borderColor:u.turn?"#ff4444":"#ccc"},disabled:re||!d,required:!0,children:[t.jsx("option",{value:"",children:re?"Loading terms...":d?((Ee=d==null?void 0:d.fee_terms)==null?void 0:Ee.length)===0?"No pending terms available":`Select Term (${(($e=d==null?void 0:d.fee_terms)==null?void 0:$e.length)||0} available)`:"Select a student first"}),(Ie=d==null?void 0:d.fee_terms)==null?void 0:Ie.map(e=>t.jsxs("option",{value:e.term,children:["Term ",e.term," (₹",e.pending_amount.toFixed(2)," pending)"]},e.term))]}),u.turn&&t.jsx(E,{children:u.turn}),d&&d.fee_terms&&d.fee_terms.length===0&&!re&&t.jsx(E,{children:"No pending fee terms available for this student"})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Amount*"}),t.jsx(se,{type:"number",name:"amount",value:c.amount,onChange:e=>{q(e),u.amount&&T(n=>({...n,amount:null}))},placeholder:d?"Enter amount":"Select a student first",style:{borderColor:u.amount?"#ff4444":"#ccc"},disabled:!d,required:!0}),u.amount&&t.jsx(E,{children:u.amount})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Payment Date*"}),t.jsx(se,{type:"date",name:"payment_date",value:c.payment_date,onChange:e=>{q(e),u.payment_date&&T(n=>({...n,payment_date:null}))},style:{borderColor:u.payment_date?"#ff4444":"#ccc"},required:!0}),u.payment_date&&t.jsx(E,{children:u.payment_date})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Payment Mode*"}),t.jsx(ie,{name:"payment_mode",value:c.payment_mode,onChange:e=>{q(e),u.payment_mode&&T(n=>({...n,payment_mode:null}))},style:{borderColor:u.payment_mode?"#ff4444":"#ccc"},required:!0,children:Je.map(e=>t.jsx("option",{value:e.value,children:e.label},e.value))}),u.payment_mode&&t.jsx(E,{children:u.payment_mode})]}),c.payment_mode!=="cash"&&t.jsxs(t.Fragment,{children:[t.jsxs(z,{children:[t.jsx(M,{children:"Transaction Number*"}),t.jsx(se,{type:"text",name:"transaction_number",value:c.transaction_number,onChange:e=>{q(e),u.transaction_number&&T(n=>({...n,transaction_number:null}))},placeholder:"Enter transaction number",style:{borderColor:u.transaction_number?"#ff4444":"#ccc"},required:!0}),u.transaction_number&&t.jsx(E,{children:u.transaction_number})]}),t.jsxs(z,{children:[t.jsx(M,{children:"Bank*"}),t.jsxs(ie,{name:"bank_name_id",value:c.bank_name_id,onChange:e=>{q(e),u.bank_name_id&&T(n=>({...n,bank_name_id:null}))},style:{borderColor:u.bank_name_id?"#ff4444":"#ccc"},required:!0,children:[t.jsx("option",{value:"",children:"Select Bank"}),Oe.map(e=>t.jsxs("option",{value:e.id,children:[e.name," (",e.code,")"]},e.id))]}),u.bank_name_id&&t.jsx(E,{children:u.bank_name_id})]})]}),t.jsx(Ut,{onClick:st,disabled:Ce,children:Ce?t.jsxs(t.Fragment,{children:[t.jsx(qt,{}),"Recording Payment..."]}):"Record Payment"})]})]})}),Ge&&k&&t.jsx(Vt,{onClick:Ae,children:t.jsxs(Gt,{onClick:e=>e.stopPropagation(),children:[t.jsx(Zt,{onClick:Ae,children:"×"}),t.jsx(Kt,{children:"Fee Details"}),t.jsxs(K,{children:[t.jsxs(B,{children:[t.jsx(P,{children:"Student Name"}),t.jsx(L,{children:k.student_name})]}),t.jsxs(B,{children:[t.jsx(P,{children:"Amount"}),t.jsx(L,{children:Y(k.amount)})]})]}),t.jsxs(K,{children:[t.jsxs(B,{children:[t.jsx(P,{children:"Payment Date"}),t.jsx(L,{children:U(k.payment_date)})]}),t.jsxs(B,{children:[t.jsx(P,{children:"Term"}),t.jsx(L,{children:k.turn})]})]}),t.jsxs(K,{children:[t.jsxs(B,{children:[t.jsx(P,{children:"Payment Mode"}),t.jsx(L,{children:k.payment_mode.charAt(0).toUpperCase()+k.payment_mode.slice(1)})]}),k.transaction_number&&t.jsxs(B,{children:[t.jsx(P,{children:"Transaction No"}),t.jsx(L,{children:k.transaction_number})]})]}),k.receipt_no&&t.jsx(K,{children:t.jsxs(B,{children:[t.jsx(P,{children:"Receipt No"}),t.jsx(L,{children:k.receipt_no})]})}),k.bank_name&&t.jsx(K,{children:t.jsxs(B,{children:[t.jsx(P,{children:"Bank"}),t.jsx(L,{children:k.bank_name.name})]})}),t.jsx(Qt,{onClick:()=>lt(k),children:"Download Receipt"})]})})]})};export{fn as default};
