import{l as ne,q as se,b as d,j as e,A as ie,i as R,k as t,m as T}from"./index-DLjENkrc.js";import{A as ae}from"./add-DFGXhUn7.js";import{A as oe}from"./AddEmployeeDialog-7drSaEEP.js";import"./index-BGtRKvl8.js";const re=T`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,le=T`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,de=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 20px;
`,ce=t.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${re} 1s ease-in-out infinite;
`,he=t.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${le} 1.5s ease-in-out infinite;
`,z=t.div`
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
`,B=t.button`
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
`,pe=t.div`
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
`,ge=t.div`
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
`,S=t.div`
  background-color: #EFEFEF;
  min-height: 75vh;
  transition: all 0.3s ease;
  position: relative;
`,fe=t.div`
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
`,r=t.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 500;
  color: #000000;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`,xe=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,l=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: grey;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,ve=t.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({status:h})=>h?"#BEFFB6":"#FEA592"};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 1px;
  font-weight: 500;
  display: inline-block;
  transition: all 0.2s;
`,me=t.div`
  display: flex;
  flex-direction: column;
  padding-left: 1vh;
  padding-right: 1vh;
  height: 100%;
`,ue=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
  margin-top: auto;
`,ye=t.h3`
  font-family: "Comfortaa", sans-serif;
  font-size: 1.2vw;
  margin-left: 2vw;
  font-weight: 700;
  color: #000000;
`,we=t.select`
  padding: 0.5vh 0.4vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
`,je=t.select`
  padding: 0.5vh 0.2vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
  margin-left: 0.5vw;
`,be=t.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5vh;
  padding: 0 0.5vw; 
`,De=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;
  display: flex;
  justify-content: center;
`,Ee=t.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5vh;
  padding: 0 0.5vw;
  margin-bottom: -2vh; 
`,_=t.div`
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
  background: ${({isPresent:h,isHoliday:p,isSickLeave:a,isAbsent:w})=>p?"#E6E6FA":a?"#ADD8E6":h?"#BEFFB6":w?"#FEA592":"transparent"};
  color: #000;
  font-weight: 400;
`,Se=t.div`
  display: flex;
  margin-right: 2vw;
  align-items: center;
`,Fe=t.div`
  display: flex;
  gap: 0.5vw;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1.5vw;
  padding: 1vh 0;
`,Ce=t.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #BEFFB6;
  align-items: center;
`,ke=t.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #FFDA9B;
  align-items: center;
`,Ae=t.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #FEA592;
  align-items: center;
`,Ie=t.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #ADD8E6;
  align-items: center;
`,u=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;
`,y=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  color: #000;
`;t.th`
  text-align: left;
  font-family: "Roboto", sans-serif;
  padding: 1.1vh 0.6vh;
  font-weight: 400;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
`;t.div`
  text-align: left;
  font-family: "Roboto", sans-serif;
  padding: 1.1vh 0.6vh;
  font-weight: 400;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
`;t.td`
  padding: 1.1vh 0.6vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
`;const $e=()=>{const h=ne(),{id:p}=se(),[a,w]=d.useState(null),[i,$]=d.useState(null),[M,F]=d.useState(!0),[C,L]=d.useState(null),[Y,k]=d.useState(!1),[Re,A]=d.useState(new Date),[g,P]=d.useState(new Date().getMonth()),[f,J]=d.useState(new Date().getFullYear()),H=["January","February","March","April","May","June","July","August","September","October","November","December"],N=["M","T","W","T","F","S","S"],W=Array.from({length:10},(n,s)=>new Date().getFullYear()-5+s),x=async(n=g,s=f)=>{try{F(!0);const c=localStorage.getItem("token"),[j,v]=await Promise.all([R.get(`https://spoorthi-dev.genzix.space/employees/employees/${p}/`,{headers:{Authorization:`Bearer ${c}`}}),R.get(`https://spoorthi-dev.genzix.space/employees/attendance/employee/${p}/?month=${n+1}&year=${s}`,{headers:{Authorization:`Bearer ${c}`}})]);j.data.status==="success"&&w(j.data.data),v.data.status==="success"&&$(v.data)}catch(c){console.error("Failed to fetch data",c),L("Failed to load data. Please try again.")}finally{F(!1)}};d.useEffect(()=>{x()},[p]);const O=()=>{h(-1)},I=()=>{k(!0)},q=async()=>{await x()},G=n=>{const s=parseInt(n.target.value);P(s),A(new Date(f,s,1)),x(s,f)},U=n=>{const s=parseInt(n.target.value);J(s),A(new Date(s,g,1)),x(g,s)},V=()=>{const n=f,s=g,c=new Date(n,s,1),v=new Date(n,s+1,0).getDate();let b=c.getDay()-1;b<0&&(b=6);const D=new Date,K=D.getFullYear()===n&&D.getMonth()===s;let E=[];for(let o=0;o<b;o++)E.push(e.jsx(_,{},`empty-${o}`));for(let o=1;o<=v;o++){const m=`${n}-${String(s+1).padStart(2,"0")}-${String(o).padStart(2,"0")}`,Q=i==null?void 0:i.dates.present_dates.includes(m),X=i==null?void 0:i.dates.absent_dates.includes(m),Z=i==null?void 0:i.dates.holiday_dates.includes(m),ee=i==null?void 0:i.dates.sick_leave_dates.includes(m),te=K&&o===D.getDate();E.push(e.jsx(_,{isToday:te,isPresent:Q,isAbsent:X,isHoliday:Z,isSickLeave:ee,children:o},`day-${o}`))}return E};return M?e.jsxs(de,{children:[e.jsx(ce,{}),e.jsx(he,{children:"Loading employee details..."})]}):C?e.jsx(S,{children:e.jsxs(z,{children:[C,e.jsx(B,{onClick:()=>window.location.reload(),children:"Retry"})]})}):a?e.jsxs(S,{children:[e.jsx(pe,{onClick:O,style:{cursor:"pointer"},children:e.jsx("img",{src:ie,style:{height:"1.2vh",transform:"rotate(90deg)"},alt:"Close"})}),e.jsxs(fe,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"end",gap:"0.5vw"},children:[e.jsx(r,{children:a.name}),e.jsxs(l,{children:["(",a.employee_no,")"]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx(xe,{onClick:I,children:"Edit Employee"}),e.jsx(ge,{onClick:I,children:e.jsx("img",{src:ae,style:{height:"1.8vh"},alt:"Add"})})]})]}),e.jsxs("div",{style:{display:"flex",gap:"2vw"},children:[e.jsxs("div",{style:{width:"55vw",height:"40vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)",display:"flex",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(l,{children:"Name"}),e.jsx(r,{children:a.name})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(l,{children:"Department"}),e.jsx(r,{children:a.department_name})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(l,{children:"Category"}),e.jsx(r,{children:a.category_name})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(l,{children:"Email"}),e.jsx(r,{children:a.email})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(l,{children:"Phone"}),e.jsx(r,{children:a.phone})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(l,{children:"Status"}),e.jsx(r,{children:e.jsx(ve,{status:a.is_active,children:a.is_active?"Active":"Inactive"})})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(l,{children:"Employee ID"}),e.jsx(r,{children:a.employee_no})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(l,{children:"Salary"}),e.jsxs(r,{children:["₹",a.salary]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(l,{children:"Joined On"}),e.jsx(r,{children:new Date(a.joining_date).toLocaleDateString()})]})]})]}),e.jsx("div",{style:{width:"35vw",height:"40vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)"},children:e.jsxs(me,{children:[e.jsxs(ue,{children:[e.jsx(ye,{children:"Attendance"}),e.jsxs(Se,{children:[e.jsx(we,{value:g,onChange:G,children:H.map((n,s)=>e.jsx("option",{value:s,children:n},n))}),e.jsx(je,{value:f,onChange:U,children:W.map(n=>e.jsx("option",{value:n,children:n},n))})]})]}),e.jsx(be,{children:N.map(n=>e.jsx(De,{children:n},n))}),e.jsx(Ee,{children:V()}),i&&e.jsxs(Fe,{children:[e.jsxs(ke,{children:[e.jsx(u,{children:i.statistics.holiday_days}),e.jsx(y,{children:"Holidays"})]}),e.jsxs(Ce,{children:[e.jsx(u,{children:i.statistics.present_days}),e.jsx(y,{children:"Present"})]}),e.jsxs(Ae,{children:[e.jsx(u,{children:i.statistics.absent_days}),e.jsx(y,{children:"Absent"})]}),e.jsxs(Ie,{children:[e.jsx(u,{children:i.statistics.sick_leave_days}),e.jsx(y,{children:"Sick Leave"})]})]})]})})]}),Y&&e.jsx(oe,{onClose:()=>k(!1),onSuccess:q,isEditMode:!0,initialData:a})]}):e.jsx(S,{children:e.jsxs(z,{children:["Employee not found",e.jsx(B,{onClick:()=>window.location.reload(),children:"Retry"})]})})};export{$e as default};
