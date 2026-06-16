import{l as $e,q as Ye,b as o,j as e,A as Ne,i as b,k as a,m as oe}from"./index-DLjENkrc.js";import{F as Pe}from"./index-BGtRKvl8.js";import{A as Le}from"./add-DFGXhUn7.js";import{A as We}from"./AddStudentDialog-HD_A0DUA.js";import{T as Oe}from"./TestMarksDialog-ITasJ6up.js";import"./jspdf.plugin.autotable-C3x-pDDg.js";const He=oe`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,Ge=oe`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,ee=a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 20px;
`,te=a.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${He} 1s ease-in-out infinite;
`,ae=a.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${Ge} 1.5s ease-in-out infinite;
`,ne=a.div`
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
`,se=a.button`
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
`,Je=a.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background: #FEA592;
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
`,Ve=a.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background: #FFB942;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: scale(1.05);
  }
`,A=a.div`
  background-color: #EFEFEF;
  min-height: 90vh;
  transition: all 0.3s ease;
  position: relative;
  padding: 2vh 2vw;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1vh 1vw;
    width: 100% !important;
    max-width: 100%;
  }
`,Ue=a.div`
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

  @media (max-width: 768px) {
    margin-top: 2vh;
    margin-bottom: 2vh;
  }
`,g=a.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 500;
  color: #000000;
  letter-spacing: 1px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`,qe=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`,f=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: grey;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`,Xe=a.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({status:l})=>l==="admission"?"#BEFFB6":"#FEA592"};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 1px;
  font-weight: 500;
  display: inline-block;
  transition: all 0.2s;

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 0.5vh 2vw;
  }
`,Ke=a.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({status:l})=>{switch(l){case"Yes":case"No":return l==="No"?"#BEFFB6":"#FEB2B2";default:return"#FEB2B2"}}};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  font-weight: 500;
  letter-spacing: 1px;
  display: inline-block;
  transition: all 0.2s;

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 0.5vh 2vw;
  }
`,Qe=a.div`
  display: flex;
  flex-direction: column;
  padding-left: 1vh;
  padding-right: 1vh;
  height: 100%;
`,Ze=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
  margin-top: auto;
  flex-wrap: wrap;
  gap: 10px;
`,et=a.h3`
  font-family: "Comfortaa", sans-serif;
  font-size: 1.2vw;
  margin-left: 2vw;
  font-weight: 700;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 4vw;
    margin-left: 4vw;
  }
`,tt=a.select`
  padding: 0.5vh 0.4vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 1vh 2vw;
  }
`,at=a.select`
  padding: 0.5vh 0.2vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
  margin-left: 0.5vw;

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 1vh 2vw;
    margin-left: 2vw;
  }
`,nt=a.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5vh;
  padding: 0 0.5vw;
`,st=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`,it=a.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5vh;
  padding: 0 0.5vw;
  margin-bottom: -2vh;
`,ie=a.div`
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
  margin: 0 auto;
  background: ${({isToday:l,isPresent:m,isHoliday:n})=>m===!0?"#BEFFB6":m===!1?"#FEB2B2":n?"#E6E6FA":"transparent"};
  color: #000;
  font-weight: 400;
  cursor: ${l=>l.isClickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    ${l=>l.isClickable&&`
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `}
  }

  @media (max-width: 768px) {
    width: 8vw;
    height: 8vw;
    font-size: 3vw;
  }
`,rt=a.div`
  display: flex;
  margin-right: 2vw;
  align-items: center;

  @media (max-width: 768px) {
    margin-right: 4vw;
  }
`,ot=a.div`
  display: flex;
  gap: 0.5vw;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1.5vw;
  padding: 1vh 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 2vw;
    margin-left: 4vw;
  }
`,dt=a.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #BEFFB6;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 1vh 2vw;
  }
`,lt=a.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #FFDA9B;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 1vh 2vw;
  }
`,ct=a.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #FEA592;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 1vh 2vw;
  }
`,E=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`,I=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  color: #000;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`,C=a.th`
  text-align: left;
  font-family: "Roboto", sans-serif;
  padding: 1.1vh 0.6vh;
  font-weight: 400;
  font-size: 0.8vw;
  letter-spacing: 0.7px;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`,pt=a.div`
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
`,D=a.td`
  padding: 1.1vh 0.6vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`,ht=a.div`
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
`,mt=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`,xt=a(pt)`
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`,gt=a.div`
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
`,ft=a.div`
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
`,vt=a.div`
  border-radius: 1vw;
  display: flex;
  gap: 1vw;

  @media (max-width: 768px) {
    border-radius: 0.5rem;
    gap: 0.5rem;
  }
`,ut=a.div`
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
`,wt=a.div`
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
`,bt=a.div`
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
`,yt=a.div`
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
`;a.button`
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
`;const re=a.button`
  padding: 0.5vh 1vw;
  border: 1px solid #FFB942;
  border-radius: 4px;
  background: ${l=>l.selected?"#FFB942":"white"};
  color: ${l=>l.selected?"white":"#FFB942"};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.7vw;
  font-family: "Roboto", sans-serif;
  margin: 0.2vh;

  &:hover {
    background: #FFB942;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 1vh 2vw;
    margin: 0.5vh;
  }
`,jt=a.div`
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
`,kt=a.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 4vh 4vw;
    width: 95%;
  }
`,Ft=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`,St=a.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.4rem;
  color: #333;
  margin: 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 5vw;
  }
`,zt=a.button`
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
`,At=a.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`,Ct=a.button`
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

  @media (max-width: 768px) {
    font-size: 4vw;
    padding: 2vh;
  }
`,Dt=a.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 3vh 3vw;
  }
`,_t=a.h3`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`,Mt=a.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`,Nt=()=>{var q,X,K,Q;const l=$e(),{id:m}=Ye(),[n,de]=o.useState(null),[R,le]=o.useState(null),[$,ce]=o.useState([]),[u,pe]=o.useState([]),[he,Y]=o.useState(!0),[N,me]=o.useState(null),[xe,P]=o.useState(!1),[ge,L]=o.useState(!1),[Tt,W]=o.useState(new Date),[y,fe]=o.useState(new Date().getMonth()),[j,ve]=o.useState(new Date().getFullYear()),[_,ue]=o.useState({present:0,absent:0,holidays:0}),[we,k]=o.useState(!1),[S,be]=o.useState(""),[w,M]=o.useState(null),[O,ye]=o.useState(null),[H,G]=o.useState(!1),je=["January","February","March","April","May","June","July","August","September","October","November","December"],ke=["M","T","W","T","F","S","S"],Fe=Array.from({length:10},(t,s)=>new Date().getFullYear()-5+s),Se=t=>t?t.split("_").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" "):"Test",ze=async()=>{try{const t=localStorage.getItem("token"),s=await b.get(`https://spoorthi-dev.genzix.space/masters/test-marks/student/${m}/`,{headers:{Authorization:`Bearer ${t}`}});if(s.data.status==="success"){const p=s.data.data.map(r=>{if(!r.subject_marks||!Array.isArray(r.subject_marks)||r.subject_marks.length===0)return{...r,marks_obtained:"0.00",total_marks:"0.00",overall_percentage:"0.0",best_subject:null,message_sent:!1};const i=r.subject_marks.reduce((x,d)=>x+(parseFloat(d.marks_obtained)||0),0),h=r.subject_marks.reduce((x,d)=>x+(parseFloat(d.total_marks)||0),0),T=r.subject_marks.reduce((x,d)=>{const F=h>0?parseFloat(d.marks_obtained||0)/parseFloat(d.total_marks||1)*100:0,v=h>0?parseFloat(x.marks_obtained||0)/parseFloat(x.total_marks||1)*100:0;return F>v?d:x}),B=h>0?i/h*100:0;return{...r,marks_obtained:i.toFixed(2),total_marks:h.toFixed(2),overall_percentage:B.toFixed(1),best_subject:T,message_sent:!1}}).sort((r,i)=>new Date(r.test_date)-new Date(i.test_date)).reverse().slice(0,4);ce(p)}}catch(t){console.error("Failed to fetch test marks",t)}},J=async()=>{try{const t=localStorage.getItem("token"),s=await b.get(`https://spoorthi-dev.genzix.space/masters/students/${m}/term-pending-fees/`,{headers:{Authorization:`Bearer ${t}`}});s.data.status==="success"&&le(s.data.data)}catch(t){console.error("Failed to fetch fee terms",t)}},z=async()=>{try{Y(!0);const t=localStorage.getItem("token"),[s,c]=await Promise.all([b.get(`https://spoorthi-dev.genzix.space/masters/students/${m}/`,{headers:{Authorization:`Bearer ${t}`}}),b.get(`https://spoorthi-dev.genzix.space/masters/attendance/student/${m}/`,{headers:{Authorization:`Bearer ${t}`}})]);if(s.data.status==="success"&&de(s.data.data),c.data.status==="success"){const p={};c.data.data.forEach(r=>{p[r.date]=r}),pe(p),V(c.data.data)}}catch(t){console.error("Failed to fetch data",t),me("Failed to load data. Please try again.")}finally{Y(!1)}},V=t=>{let s=0,c=0,p=0;t.filter(i=>{const h=new Date(i.date);return h.getMonth()===y&&h.getFullYear()===j}).forEach(i=>{i.is_holiday?p++:i.is_present?s++:i.is_present===!1&&c++}),ue({present:s,absent:c,holidays:p})};o.useEffect(()=>{if(u&&Object.keys(u).length>0){const t=Object.values(u);V(t)}},[y,j,u]),o.useEffect(()=>{J(),z(),ze()},[m]);const Ae=()=>{l("/principal/students")},U=()=>{P(!0)},Ce=()=>{L(!0)},De=async()=>{z(),J()},_e=t=>{const s=parseInt(t.target.value);fe(s),W(new Date(j,s,1))},Me=t=>{const s=parseInt(t.target.value);ve(s),W(new Date(s,y,1))},Te=t=>{const s=t.getFullYear(),c=String(t.getMonth()+1).padStart(2,"0"),p=String(t.getDate()).padStart(2,"0"),r=`${s}-${c}-${p}`;return u[r]},Be=t=>{const s=t.getFullYear(),c=String(t.getMonth()+1).padStart(2,"0"),p=String(t.getDate()).padStart(2,"0"),r=`${s}-${c}-${p}`,i=u[r];be(r),M((i==null?void 0:i.is_present)===!0?"present":(i==null?void 0:i.is_present)===!1?"absent":null),ye(i==null?void 0:i.id),k(!0)},Ee=async()=>{if(!(!S||!w))try{G(!0);const t=localStorage.getItem("token");O?(await b.put(`https://spoorthi-dev.genzix.space/masters/attendance/${O}/`,{student_id:m,date:S,is_present:w==="present"},{headers:{Authorization:`Bearer ${t}`}})).data.status==="success"&&(await z(),k(!1)):(await b.post("https://spoorthi-dev.genzix.space/masters/attendance/",{student_id:m,date:S,is_present:w==="present"},{headers:{Authorization:`Bearer ${t}`}})).data.status==="success"&&(await z(),k(!1))}catch(t){console.error("Failed to save attendance",t),alert("Failed to save attendance. Please try again.")}finally{G(!1)}},Ie=()=>{const t=j,s=y,c=new Date(t,s,1),r=new Date(t,s+1,0).getDate();let i=c.getDay()-1;i<0&&(i=6);const h=new Date,T=h.getFullYear()===t&&h.getMonth()===s,B=new Date;let x=[];for(let d=0;d<i;d++)x.push(e.jsx(ie,{},`empty-${d}`));for(let d=1;d<=r;d++){const F=new Date(t,s,d),v=Te(F),Re=T&&d===h.getDate(),Z=F<=B;x.push(e.jsx(ie,{isToday:Re,isPresent:v==null?void 0:v.is_present,isHoliday:v==null?void 0:v.is_holiday,isClickable:Z,onClick:()=>Z&&Be(F),children:d},`day-${d}`))}return x};return he?e.jsx(A,{children:e.jsxs(ee,{children:[e.jsx(te,{}),e.jsx(ae,{children:"Loading student details..."})]})}):N?e.jsx(A,{children:e.jsxs(ne,{children:[N,e.jsx(se,{onClick:()=>window.location.reload(),children:"Retry"})]})}):n?e.jsxs(A,{children:[e.jsx(Je,{onClick:Ae,style:{cursor:"pointer"},children:e.jsx("img",{src:Ne,style:{height:"1.2vh",transform:"rotate(90deg)"},alt:"Back"})}),e.jsxs(Ue,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"end",gap:"0.5vw",flexWrap:"wrap"},children:[e.jsx(g,{children:n.name}),e.jsxs(f,{children:["(",n.admission_no,")"]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx(qe,{onClick:U,children:"Edit Student"}),e.jsx(Ve,{onClick:U,children:e.jsx("img",{src:Le,style:{height:"1.8vh"},alt:"Edit"})})]})]}),e.jsxs("div",{style:{display:"flex",gap:"2vw",flexWrap:"wrap",width:"100%"},children:[e.jsxs("div",{style:{width:"55vw",minWidth:"300px",flex:1,height:"40vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)",display:"flex",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(f,{children:"Name"}),e.jsx(g,{children:n.name})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(f,{children:"Class"}),e.jsxs(g,{children:[((q=n.class_name)==null?void 0:q.name)||"N/A","-(",n.batch,")"]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(f,{children:"Committed Fee"}),e.jsxs(g,{children:["₹",n.committed_fees]})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(f,{children:"Phone No"}),e.jsx(g,{children:Array.isArray(n.phone_numbers)&&n.phone_numbers[0]?n.phone_numbers[0]:"N/A"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(f,{children:"Group"}),e.jsxs(g,{children:[n.group," - ",((X=n.section)==null?void 0:X.name)||"N/A"]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(f,{children:"Pending Fee"}),e.jsxs(g,{style:{color:"#FF6745"},children:["₹",n.pending_fees]})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(f,{children:"Pen No"}),e.jsx(g,{children:n.pen_no||"N/A"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(f,{children:"Status"}),e.jsx(g,{children:e.jsx(Xe,{status:n.status,children:n.status})})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(f,{children:"Is Left"}),e.jsx(g,{children:e.jsx(Ke,{status:n.is_join?"No":"Yes",children:n.is_join?"No":"Yes"})})]})]})]}),e.jsx("div",{style:{width:"35vw",minWidth:"300px",flex:1,height:"40vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)"},children:e.jsxs(Qe,{children:[e.jsxs(Ze,{children:[e.jsx(et,{children:"Attendance"}),e.jsxs(rt,{children:[e.jsx(tt,{value:y,onChange:_e,children:je.map((t,s)=>e.jsx("option",{value:s,children:t},t))}),e.jsx(at,{value:j,onChange:Me,children:Fe.map(t=>e.jsx("option",{value:t,children:t},t))})]})]}),e.jsx(nt,{children:ke.map(t=>e.jsx(st,{children:t},t))}),e.jsx(it,{children:Ie()}),e.jsxs(ot,{children:[e.jsxs(lt,{children:[e.jsx(E,{children:_.holidays}),e.jsx(I,{children:"Holidays"})]}),e.jsxs(dt,{children:[e.jsx(E,{children:_.present}),e.jsx(I,{children:"Present"})]}),e.jsxs(ct,{children:[e.jsx(E,{children:_.absent}),e.jsx(I,{children:"Absent"})]})]})]})})]}),e.jsxs("div",{style:{display:"flex",gap:"2vw",marginTop:"2vw",marginBottom:"2vw",flexWrap:"wrap"},children:[e.jsx("div",{style:{width:"48vw",minWidth:"300px",flex:1,height:"30vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)",padding:"2vh 2vw",overflow:"auto"},children:R?e.jsx("div",{style:{width:"100%",height:"100%",overflow:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx(C,{style:{textAlign:"center"},children:"Term"}),e.jsx(C,{style:{textAlign:"center"},children:"Amount"}),e.jsx(C,{style:{textAlign:"center"},children:"Paid"}),e.jsx(C,{style:{textAlign:"center"},children:"Pending"})]})}),e.jsx("tbody",{children:R.terms.map(t=>e.jsxs("tr",{children:[e.jsxs(D,{style:{textAlign:"center"},children:["Term ",t.term]}),e.jsxs(D,{style:{textAlign:"center"},children:["₹",t.amount]}),e.jsxs(D,{style:{textAlign:"center"},children:["₹",t.paid_amount]}),e.jsxs(D,{style:{textAlign:"center",color:"#FF6745"},children:["₹",t.pending_amount]})]},t.term))})]})}):e.jsxs(ee,{style:{height:"100%"},children:[e.jsx(te,{}),e.jsx(ae,{children:"Loading fee terms..."})]})}),e.jsxs(ht,{children:[e.jsxs(mt,{children:[e.jsx(xt,{children:"Latest Test Marks"}),e.jsx(gt,{onClick:Ce,children:"View All →"})]}),$.length>0?e.jsx(ft,{children:$.map(t=>e.jsx(vt,{children:e.jsxs(ut,{children:[e.jsxs(wt,{children:[new Date(t.test_date).toLocaleDateString()," - ",Se(t.test_name)]}),e.jsxs(bt,{children:[parseFloat(t.marks_obtained).toFixed(0),"/",parseFloat(t.total_marks).toFixed(0)," (",t.overall_percentage,"%) - Rank ",t.rank||"N/A"]})]})},t.id))}):e.jsx(yt,{children:"No test marks available"})]})]}),xe&&e.jsx(We,{onClose:()=>P(!1),onSuccess:De,isEditMode:!0,initialData:n}),ge&&e.jsx(Oe,{onClose:()=>L(!1),studentId:m,studentName:(n==null?void 0:n.name)||"Student"}),we&&e.jsx(jt,{onClick:()=>k(!1),children:e.jsxs(kt,{onClick:t=>t.stopPropagation(),children:[e.jsxs(Ft,{children:[e.jsx(St,{children:"Mark Attendance"}),e.jsx(zt,{onClick:()=>k(!1),children:e.jsx(Pe,{})})]}),e.jsxs(Dt,{children:[e.jsx(_t,{children:n==null?void 0:n.name}),e.jsxs(Mt,{children:[n==null?void 0:n.admission_no," • ",(K=n==null?void 0:n.class_name)==null?void 0:K.name," ",(Q=n==null?void 0:n.section)==null?void 0:Q.name," • ",S]})]}),e.jsxs(At,{children:[e.jsx(re,{selected:w==="present",onClick:()=>M("present"),children:"Present"}),e.jsx(re,{selected:w==="absent",onClick:()=>M("absent"),children:"Absent"})]}),e.jsx(Ct,{onClick:Ee,disabled:H||!w,children:H?"Saving...":"Save Attendance"})]})})]}):e.jsx(A,{children:e.jsxs(ne,{children:["Student not found",e.jsx(se,{onClick:()=>window.location.reload(),children:"Retry"})]})})};export{Nt as default};
