import{l as ae,t as re,b as r,F as le,j as e,A as de,q as ce,i as T,k as t,m as $}from"./index-Dw8q8pd0.js";import{A as he}from"./add-DFGXhUn7.js";import{A as ge}from"./AddEmployeeDialog-CvSHao5f.js";import"./index-C9Urxevv.js";const pe=$`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,fe=$`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,xe=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 20px;
`,ve=t.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${pe} 1s ease-in-out infinite;
`,me=t.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${fe} 1.5s ease-in-out infinite;
`,_=t.div`
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
`,L=t.button`
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
`,ue=t.div`
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
`,ye=t.div`
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
`,C=t.div`
  background-color: #EFEFEF;
  min-height: 75vh;
  transition: all 0.3s ease;
  position: relative;
`,we=t.div`
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
`,l=t.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 500;
  color: #000000;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`,je=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,d=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: grey;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,be=t.span`
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
`,De=t.div`
  display: flex;
  flex-direction: column;
  padding-left: 1vh;
  padding-right: 1vh;
  height: 100%;
`,Se=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
  margin-top: auto;
`,Ce=t.h3`
  font-family: "Comfortaa", sans-serif;
  font-size: 1.2vw;
  margin-left: 2vw;
  font-weight: 700;
  color: #000000;
`,Ee=t.select`
  padding: 0.5vh 0.4vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
`,Fe=t.select`
  padding: 0.5vh 0.2vw;
  border-radius: 1vw;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  cursor: pointer;
  margin-left: 0.5vw;
`,ke=t.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5vh;
  padding: 0 0.5vw; 
`,Ae=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000;
  display: flex;
  justify-content: center;
`,Re=t.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5vh;
  padding: 0 0.5vw;
  margin-bottom: -2vh; 
`,M=t.div`
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
  background: ${({isPresent:h,isHoliday:g,isSickLeave:n,isAbsent:w})=>g?"#E6E6FA":n?"#ADD8E6":h?"#BEFFB6":w?"#FEA592":"transparent"};
  color: #000;
  font-weight: 400;
`,ze=t.div`
  display: flex;
  margin-right: 2vw;
  align-items: center;
`,Ie=t.div`
  display: flex;
  gap: 0.5vw;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1.5vw;
  padding: 1vh 0;
`,Be=t.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #BEFFB6;
  align-items: center;
`,Te=t.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #FFDA9B;
  align-items: center;
`,_e=t.div`
  display: flex;
  padding: 0.8vh 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  justify-content: center;
  gap: 0.3vw;
  border-radius: 1vw;
  background: #FEA592;
  align-items: center;
`,Le=t.div`
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
`,Me=t.div`
  width: 92vw;
  margin-top: 2vw;
  background-color: #fff;
  border-radius: 2vw;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 2.5vh 2vw;
`,$e=t.h3`
  margin: 0 0 1.5vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.95vw;
  font-weight: 500;
  color: #000;
`,Ye=t.div`
  &:not(:last-child) {
    margin-bottom: 1.5vh;
    padding-bottom: 1.5vh;
    border-bottom: 1px solid #f0f0f0;
  }
`,Pe=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.85vw;
  font-weight: 500;
  color: #000;
  margin-bottom: 0.8vh;
`,Ne=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;
`,Ge=t.span`
  display: inline-flex;
  align-items: center;
  padding: 0.5vh 0.7vw;
  border-radius: 1vw;
  background-color: #FFE6BB;
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  color: #333;
`,E=t.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;
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
`;const Ue=()=>{const h=ae(),{id:g}=re(),[n,w]=r.useState(null),[o,Y]=r.useState(null),[P,F]=r.useState(!0),[k,N]=r.useState(null),[G,A]=r.useState(!1),[He,R]=r.useState(new Date),[p,H]=r.useState(new Date().getMonth()),[f,J]=r.useState(new Date().getFullYear()),W=["January","February","March","April","May","June","July","August","September","October","November","December"],O=["M","T","W","T","F","S","S"],q=Array.from({length:10},(s,i)=>new Date().getFullYear()-5+i),{loading:U,getGroupedAssignments:z}=le(),I=r.useMemo(()=>n?z(n):[],[n,z]),x=async(s=p,i=f)=>{try{F(!0);const c=localStorage.getItem("token"),[j,v]=await Promise.all([T.get(`https://spoorthischool.genzix.space/employees/employees/${g}/`,{headers:{Authorization:`Bearer ${c}`}}),T.get(`https://spoorthischool.genzix.space/employees/attendance/employee/${g}/?month=${s+1}&year=${i}`,{headers:{Authorization:`Bearer ${c}`}})]);j.data.status==="success"&&w(j.data.data),v.data.status==="success"&&Y(v.data)}catch(c){console.error("Failed to fetch data",c),N("Failed to load data. Please try again.")}finally{F(!1)}};r.useEffect(()=>{x()},[g]);const V=()=>{h(-1)},B=()=>{A(!0)},K=async()=>{await x()},Q=s=>{const i=parseInt(s.target.value);H(i),R(new Date(f,i,1)),x(i,f)},X=s=>{const i=parseInt(s.target.value);J(i),R(new Date(i,p,1)),x(p,i)},Z=()=>{const s=f,i=p,c=new Date(s,i,1),v=new Date(s,i+1,0).getDate();let b=c.getDay()-1;b<0&&(b=6);const D=new Date,ee=D.getFullYear()===s&&D.getMonth()===i;let S=[];for(let a=0;a<b;a++)S.push(e.jsx(M,{},`empty-${a}`));for(let a=1;a<=v;a++){const m=`${s}-${String(i+1).padStart(2,"0")}-${String(a).padStart(2,"0")}`,te=o==null?void 0:o.dates.present_dates.includes(m),se=o==null?void 0:o.dates.absent_dates.includes(m),ne=o==null?void 0:o.dates.holiday_dates.includes(m),ie=o==null?void 0:o.dates.sick_leave_dates.includes(m),oe=ee&&a===D.getDate();S.push(e.jsx(M,{isToday:oe,isPresent:te,isAbsent:se,isHoliday:ne,isSickLeave:ie,children:a},`day-${a}`))}return S};return P?e.jsxs(xe,{children:[e.jsx(ve,{}),e.jsx(me,{children:"Loading employee details..."})]}):k?e.jsx(C,{children:e.jsxs(_,{children:[k,e.jsx(L,{onClick:()=>window.location.reload(),children:"Retry"})]})}):n?e.jsxs(C,{children:[e.jsx(ue,{onClick:V,style:{cursor:"pointer"},children:e.jsx("img",{src:de,style:{height:"1.2vh",transform:"rotate(90deg)"},alt:"Close"})}),e.jsxs(we,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"end",gap:"0.5vw"},children:[e.jsx(l,{children:n.name}),e.jsxs(d,{children:["(",n.employee_no,")"]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx(je,{onClick:B,children:"Edit Employee"}),e.jsx(ye,{onClick:B,children:e.jsx("img",{src:he,style:{height:"1.8vh"},alt:"Add"})})]})]}),e.jsxs("div",{style:{display:"flex",gap:"2vw"},children:[e.jsxs("div",{style:{width:"55vw",height:"40vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)",display:"flex",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(d,{children:"Name"}),e.jsx(l,{children:n.name})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(d,{children:"Department"}),e.jsx(l,{children:n.department_name})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(d,{children:"Category"}),e.jsx(l,{children:n.category_name})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(d,{children:"Email"}),e.jsx(l,{children:n.email})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(d,{children:"Phone"}),e.jsx(l,{children:n.phone})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(d,{children:"Status"}),e.jsx(l,{children:e.jsx(be,{status:n.is_active,children:n.is_active?"Active":"Inactive"})})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",paddingTop:"5vh",paddingBottom:"5vh",paddingLeft:"3vw",paddingRight:"3vw"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh"},children:[e.jsx(d,{children:"Employee ID"}),e.jsx(l,{children:n.employee_no})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(d,{children:"Salary"}),e.jsxs(l,{children:["₹",n.salary]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",gap:"1vh",marginTop:"auto"},children:[e.jsx(d,{children:"Joined On"}),e.jsx(l,{children:new Date(n.joining_date).toLocaleDateString()})]})]})]}),e.jsx("div",{style:{width:"35vw",height:"40vh",backgroundColor:"#fff",borderRadius:"2vw",boxShadow:"0 4px 4px rgba(0,0,0,0.1)"},children:e.jsxs(De,{children:[e.jsxs(Se,{children:[e.jsx(Ce,{children:"Attendance"}),e.jsxs(ze,{children:[e.jsx(Ee,{value:p,onChange:Q,children:W.map((s,i)=>e.jsx("option",{value:i,children:s},s))}),e.jsx(Fe,{value:f,onChange:X,children:q.map(s=>e.jsx("option",{value:s,children:s},s))})]})]}),e.jsx(ke,{children:O.map(s=>e.jsx(Ae,{children:s},s))}),e.jsx(Re,{children:Z()}),o&&e.jsxs(Ie,{children:[e.jsxs(Te,{children:[e.jsx(u,{children:o.statistics.holiday_days}),e.jsx(y,{children:"Holidays"})]}),e.jsxs(Be,{children:[e.jsx(u,{children:o.statistics.present_days}),e.jsx(y,{children:"Present"})]}),e.jsxs(_e,{children:[e.jsx(u,{children:o.statistics.absent_days}),e.jsx(y,{children:"Absent"})]}),e.jsxs(Le,{children:[e.jsx(u,{children:o.statistics.sick_leave_days}),e.jsx(y,{children:"Sick Leave"})]})]})]})})]}),e.jsxs(Me,{children:[e.jsx($e,{children:"Handled Classes & Sections"}),U&&ce(n==null?void 0:n.handled_classes).length>0?e.jsx(E,{children:"Loading class and section details..."}):I.length===0?e.jsx(E,{children:"No classes or sections assigned to this employee."}):I.map(s=>e.jsxs(Ye,{children:[e.jsxs(Pe,{children:[s.className,s.isComplete?"":" (sections pending)"]}),s.sections.length>0?e.jsx(Ne,{children:s.sections.map(i=>e.jsx(Ge,{children:i.label},i.id))}):e.jsx(E,{children:"No sections selected for this class."})]},s.classId))]}),G&&e.jsx(ge,{onClose:()=>A(!1),onSuccess:K,isEditMode:!0,initialData:n})]}):e.jsx(C,{children:e.jsxs(_,{children:["Employee not found",e.jsx(L,{onClick:()=>window.location.reload(),children:"Retry"})]})})};export{Ue as default};
