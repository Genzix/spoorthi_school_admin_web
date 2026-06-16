import{l as ye,q as be,b as d,j as e,A as je,i as j,k as s,m as Q}from"./index-DLjENkrc.js";import{A as ke}from"./add-DFGXhUn7.js";import{A as Fe}from"./AddStudentDialog-HD_A0DUA.js";import{T as Se}from"./TestMarksDialog-ITasJ6up.js";import"./jspdf.plugin.autotable-C3x-pDDg.js";const Ae=Q`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,De=Q`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,G=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 20px;
`,J=s.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${Ae} 1s ease-in-out infinite;
`,V=s.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${De} 1.5s ease-in-out infinite;
`,U=s.div`
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
`,q=s.button`
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
`,Ce=s.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background:  #FEA592;
  display: flex;
  cursor: pointer;
  position: fixed;
  top: 3vh;
  border: 1px solid #FEA592;
  align-items: center;
  z-index: 999;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FF7E62;
    transform: scale(1.05);
  }
`,ze=s.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background:  #FFB942;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: scale(1.05);
  }
`,C=s.div`
  background-color: #EFEFEF;
  min-height: 90vh;
  transition: all 0.3s ease;
  position: relative;
`,_e=s.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  flex-wrap: wrap;
  margin-top: 4vh;
  margin-bottom: 4vh;
  gap: 15px;
  background: #EFEFEF;
  border-radius: 10px;
  transition: all 0.3s ease;
`,m=s.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 500;
  color: #000000;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`,Te=s.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,g=s.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: grey;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,Me=s.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({status:u})=>u==="admission"?"#BEFFB6":"#FEA592"};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
   letter-spacing: 1px;
  font-weight: 500;
  display: inline-block;
  transition: all 0.2s;
`,Ee=s.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({status:u})=>{switch(u){case"Yes":return"#BEFFB6";case"No":return"#FEB2B2";default:return"#FEB2B2"}}};

  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  font-weight: 500;
  letter-spacing: 1px;
  display: inline-block;
  transition: all 0.2s;
`,Be=s.div`
  display: flex;
  flex-direction: column;
  padding-left: 1vh;
  padding-right: 1vh;
  height: 100%;
`,Re=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
  margin-top: auto;
`,Ie=s.h3`
  font-family: "Comfortaa", sans-serif;
  font-size: 1.2vw;
  margin-left: 2vw;
  font-weight: 700;
  color: #000000;
`,$e=s.select`
  padding: 0.5vh 0.4vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
`,Le=s.select`
   padding: 0.5vh 0.2vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
  margin-left: 0.5vw;
`,Ne=s.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5vh;
  padding: 0 0.5vw; 
`,Ye=s.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;
  display: flex;
  justify-content: center; // Center the weekday text
`,Pe=s.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5vh;
  padding: 0 0.5vw; // Add matching padding
  margin-bottom: -2vh; 
`,K=s.div`
  text-align: center;
  padding: 1vh 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  width: 1.6vw;
  height: 1.6vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto; // Center the day circle within its grid cell
  background: ${({isToday:u,isPresent:x,isHoliday:a,isWeekend:T})=>x===!0?"#BEFFB6":x===!1?"#FEB2B2":a?"#E6E6FA":"transparent"};
  color: #000;
  font-weight: 400;
`,We=s.div`
  display: flex;
  margin-right: 2vw;
  align-items: center;
`,He=s.div`
  display: flex;
  gap: 0.5vw;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1.5vw;
  padding: 1vh 0;
`,Oe=s.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;

  border-radius: 1vw;
  background: #BEFFB6;
  align-items: center;
`,Ge=s.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;

  border-radius: 1vw;
  background: #FFDA9B;
  align-items: center;
`,Je=s.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;

  border-radius: 1vw;
  background: #FEA592;
  align-items: center;
`,z=s.div`
font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;
`,_=s.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
 color: #000;
`,k=s.th`
  text-align: left;
   font-family: "Roboto", sans-serif;
  padding: 1.1vh 0.6vh;
  font-weight: 400;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
`,Ve=s.div`
  text-align: left;
  font-family: "Roboto", sans-serif;
  padding: 1.1vh 0.6vh;
  font-weight: 400;
  font-size: 0.8vw;
  letter-spacing: 0.7px;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 0.3rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.2rem;
  }
`,F=s.td`
  padding:1.1vh 0.6vh;
   font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
`,Ue=s.div`
  width: 48vw;
  height: 30vh;
  background-color: #fff;
  border-radius: 2vw;
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 2vh 2vw;
  transition: all 0.3s ease;
  overflow-y: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 200px;
    padding: 1.5rem 1rem;
    border-radius: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
    border-radius: 0.75rem;
    min-height: 180px;
  }
`,qe=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`,Ke=s(Ve)`
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`,Qe=s.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #FFB942;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  display: inline-block;
  min-height: 36px;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
    background-color: rgba(255, 185, 66, 0.1);
  }

  &:active {
    background-color: rgba(255, 185, 66, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    min-height: 40px;
    border-radius: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.55rem 0.9rem;
    min-height: 38px;
    border-radius: 0.4rem;
  }
`,Xe=s.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.4vh;
  margin-top: 0.6vh;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
`,Ze=s.div`
  border-radius: 1vw;
  display: flex;
  gap: 1vw;

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    gap: 0.5rem;
  }
`,et=s.div`
  display: flex;
  padding: 1.1vh 0.7vw;
  width: 100%;
  background-color: #F0F0F0;
  border-radius: 0.4vw;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    gap: 0.4rem;
  }
`,tt=s.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    letter-spacing: 0.3px;
  }
`,st=s.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000;
  letter-spacing: 1px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    white-space: normal;
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    letter-spacing: 0.3px;
  }
`,nt=s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 1.5rem 0.75rem;
  }
`,at=s.div`
  display: flex;
  gap: 2vw;
  margin-top: 2vw;
  margin-bottom: 2vw;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;s.button`
  padding: 0.75vh 1.25vw;
  background-color: #FFB942;
  border: none;
  border-radius: 0.45vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.75vw;
  cursor: pointer;
  letter-spacing: 0.7px;
  color: #000;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-height: 32px;

  &:hover {
    background-color: #FFA51E;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.4rem;
    font-size: 0.9rem;
    border-radius: 0.45rem;
    min-height: 40px;
  }

  @media (max-width: 480px) {
    padding: 0.65rem 1.2rem;
    font-size: 0.85rem;
    border-radius: 0.4rem;
    min-height: 38px;
  }
`;const ht=()=>{var H,O;const u=ye(),{id:x}=be(),[a,T]=d.useState(null),[M,X]=d.useState(null),[E,Z]=d.useState([]),[v,ee]=d.useState([]),[te,B]=d.useState(!0),[R,se]=d.useState(null),[ne,I]=d.useState(!1),[ae,$]=d.useState(!1),[it,L]=d.useState(new Date),[w,ie]=d.useState(new Date().getMonth()),[y,re]=d.useState(new Date().getFullYear()),[S,oe]=d.useState({present:0,absent:0,holidays:0}),de=["January","February","March","April","May","June","July","August","September","October","November","December"],le=["M","T","W","T","F","S","S"],ce=Array.from({length:10},(t,n)=>new Date().getFullYear()-5+n),he=t=>t?t.split("_").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" "):"Test",pe=async()=>{try{const t=localStorage.getItem("token"),n=await j.get(`https://spoorthi-dev.genzix.space/masters/test-marks/student/${x}/`,{headers:{Authorization:`Bearer ${t}`}});if(n.data.status==="success"){const p=n.data.data.map(i=>{if(!i.subject_marks||!Array.isArray(i.subject_marks)||i.subject_marks.length===0)return{...i,marks_obtained:"0.00",total_marks:"0.00",overall_percentage:"0.0",best_subject:null,message_sent:!1};const o=i.subject_marks.reduce((r,f)=>r+(parseFloat(f.marks_obtained)||0),0),l=i.subject_marks.reduce((r,f)=>r+(parseFloat(f.total_marks)||0),0),A=i.subject_marks.reduce((r,f)=>{const h=l>0?parseFloat(f.marks_obtained||0)/parseFloat(f.total_marks||1)*100:0,D=l>0?parseFloat(r.marks_obtained||0)/parseFloat(r.total_marks||1)*100:0;return h>D?f:r}),b=l>0?o/l*100:0;return{...i,marks_obtained:o.toFixed(2),total_marks:l.toFixed(2),overall_percentage:b.toFixed(1),best_subject:A,message_sent:!1}}).sort((i,o)=>new Date(i.test_date)-new Date(o.test_date)).reverse().slice(0,4);Z(p)}}catch(t){console.error("Failed to fetch test marks",t)}},N=async()=>{try{const t=localStorage.getItem("token"),n=await j.get(`https://spoorthi-dev.genzix.space/masters/students/${x}/term-pending-fees/`,{headers:{Authorization:`Bearer ${t}`}});n.data.status==="success"&&X(n.data.data)}catch(t){console.error("Failed to fetch fee terms",t)}},Y=async()=>{try{B(!0);const t=localStorage.getItem("token"),[n,c]=await Promise.all([j.get(`https://spoorthi-dev.genzix.space/masters/students/${x}/`,{headers:{Authorization:`Bearer ${t}`}}),j.get(`https://spoorthi-dev.genzix.space/masters/attendance/student/${x}/`,{headers:{Authorization:`Bearer ${t}`}})]);if(n.data.status==="success"&&T(n.data.data),c.data.status==="success"){const p={};c.data.data.forEach(i=>{p[i.date]=i}),ee(p),P(c.data.data)}}catch(t){console.error("Failed to fetch data",t),se("Failed to load data. Please try again.")}finally{B(!1)}},P=t=>{let n=0,c=0,p=0;t.filter(o=>{const l=new Date(o.date);return l.getMonth()===w&&l.getFullYear()===y}).forEach(o=>{o.is_holiday?p++:o.is_present?n++:o.is_present===!1&&c++}),oe({present:n,absent:c,holidays:p})};d.useEffect(()=>{if(v&&Object.keys(v).length>0){const t=Object.values(v);P(t)}},[w,y,v]),d.useEffect(()=>{N(),Y(),pe()},[x]);const me=()=>{u(-1)},W=()=>{I(!0)},ge=()=>{$(!0)},xe=async()=>{Y(),N()},fe=t=>{const n=parseInt(t.target.value);ie(n),L(new Date(y,n,1))},ue=t=>{const n=parseInt(t.target.value);re(n),L(new Date(n,w,1))},ve=t=>{const n=t.getFullYear(),c=String(t.getMonth()+1).padStart(2,"0"),p=String(t.getDate()).padStart(2,"0"),i=`${n}-${c}-${p}`;return v[i]},we=()=>{const t=y,n=w,c=new Date(t,n,1),i=new Date(t,n+1,0).getDate();let o=c.getDay()-1;o<0&&(o=6);const l=new Date,A=l.getFullYear()===t&&l.getMonth()===n;let b=[];for(let r=0;r<o;r++)b.push(e.jsx(K,{},`empty-${r}`));for(let r=1;r<=i;r++){const f=new Date(t,n,r),h=ve(f),D=A&&r===l.getDate();b.push(e.jsx(K,{isToday:D,isPresent:h==null?void 0:h.is_present,isHoliday:h==null?void 0:h.is_holiday,isWeekend:h==null?void 0:h.is_weekend,children:r},`day-${r}`))}return b};return te?e.jsxs(G,{children:[e.jsx(J,{}),e.jsx(V,{children:"Loading student details..."})]}):R?e.jsx(C,{children:e.jsxs(U,{children:[R,e.jsx(q,{onClick:()=>window.location.reload(),children:"Retry"})]})}):a?e.jsxs(C,{children:[e.jsx(Ce,{onClick:me,style:{cursor:"pointer"},children:e.jsx("img",{src:je,style:{height:"1.2vh",transform:"rotate(90deg)"},alt:"Close"})}),e.jsxs(_e,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"end",gap:"0.5vw"},children:[e.jsx(m,{children:a.name}),e.jsxs(g,{children:["(",a.admission_no,")"]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx(Te,{onClick:W,children:"Edit Student"}),e.jsx(ze,{onClick:W,children:e.jsx("img",{src:ke,style:{height:"1.8vh"}})})]})]}),e.jsxs("div",{style:{display:"flex",gap:"2vw"},children:[e.jsxs("div",{style:{width:"55vw",height:"40vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)",display:"flex",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(g,{children:"Name"}),e.jsx(m,{children:a.name})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(g,{children:"Class"}),e.jsxs(m,{children:[((H=a.class_name)==null?void 0:H.name)||"N/A","-(",a.batch,")"]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(g,{children:"Committed Fee"}),e.jsxs(m,{children:["₹",a.committed_fees]})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(g,{children:"Phone No"}),e.jsx(m,{children:a.phone_numbers[0]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(g,{children:"Group"}),e.jsxs(m,{children:[a.group," - ",((O=a.section)==null?void 0:O.name)||"N/A"]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(g,{children:"Pending Fee"}),e.jsxs(m,{style:{color:"#FF6745"},children:["₹",a.pending_fees]})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(g,{children:"Pen No"}),e.jsx(m,{children:a.pen_no||"N/A"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(g,{children:"Status"}),e.jsx(m,{children:e.jsx(Me,{status:a.status,children:a.status})})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(g,{children:"Is Left"}),e.jsx(m,{children:e.jsx(Ee,{status:a.is_join?"joined":"not-joined",children:a.is_join?"No":"yes"})})]})]})]}),e.jsx("div",{style:{width:"35vw",height:"40vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)"},children:e.jsxs(Be,{children:[e.jsxs(Re,{children:[e.jsx(Ie,{children:"Attendance"}),e.jsxs(We,{children:[e.jsx($e,{value:w,onChange:fe,children:de.map((t,n)=>e.jsx("option",{value:n,children:t},t))}),e.jsx(Le,{value:y,onChange:ue,children:ce.map(t=>e.jsx("option",{value:t,children:t},t))})]})]}),e.jsx(Ne,{children:le.map(t=>e.jsx(Ye,{children:t},t))}),e.jsx(Pe,{children:we()}),e.jsxs(He,{children:[e.jsxs(Ge,{children:[e.jsx(z,{children:S.holidays}),e.jsx(_,{children:"Holidays"})]}),e.jsxs(Oe,{children:[e.jsx(z,{children:S.present}),e.jsx(_,{children:"Present"})]}),e.jsxs(Je,{children:[e.jsx(z,{children:S.absent}),e.jsx(_,{children:"Absent"})]})]})]})})]}),e.jsxs(at,{children:[e.jsx("div",{style:{width:"48vw",height:"30vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)",padding:"2vh 2vw"},children:M?e.jsx("div",{style:{width:"100%",height:"100%",overflow:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx(k,{style:{textAlign:"center"},children:"Term"}),e.jsx(k,{style:{textAlign:"center"},children:"Amount"}),e.jsx(k,{style:{textAlign:"center"},children:"Paid"}),e.jsx(k,{style:{textAlign:"center"},children:"Pending"})]})}),e.jsx("tbody",{children:M.terms.map(t=>e.jsxs("tr",{children:[e.jsxs(F,{style:{textAlign:"center"},children:["Term ",t.term]}),e.jsxs(F,{style:{textAlign:"center"},children:["₹",t.amount]}),e.jsxs(F,{style:{textAlign:"center"},children:["₹",t.paid_amount]}),e.jsxs(F,{style:{textAlign:"center",color:"#FF6745"},children:["₹",t.pending_amount]})]},t.term))})]})}):e.jsxs(G,{style:{height:"100%"},children:[e.jsx(J,{}),e.jsx(V,{children:"Loading fee terms..."})]})}),e.jsxs(Ue,{children:[e.jsxs(qe,{children:[e.jsx(Ke,{children:"Latest Test Marks"}),e.jsx(Qe,{onClick:ge,children:"View All →"})]}),E.length>0?e.jsx(Xe,{children:E.map(t=>e.jsx(Ze,{children:e.jsxs(et,{children:[e.jsxs(tt,{children:[new Date(t.test_date).toLocaleDateString()," - ",he(t.test_name)]}),e.jsxs(st,{children:[parseFloat(t.marks_obtained).toFixed(0),"/",parseFloat(t.total_marks).toFixed(0)," (",t.overall_percentage,"%) - Rank ",t.rank||"N/A"]})]})},t.id))}):e.jsx(nt,{children:"No test marks available"})]})]}),ne&&e.jsx(Fe,{onClose:()=>I(!1),onSuccess:xe,isEditMode:!0,initialData:a}),ae&&e.jsx(Se,{onClose:()=>$(!1),studentId:x,studentName:(a==null?void 0:a.name)||"Student"})]}):e.jsx(C,{children:e.jsxs(U,{children:["Student not found",e.jsx(q,{onClick:()=>window.location.reload(),children:"Retry"})]})})};export{ht as default};
