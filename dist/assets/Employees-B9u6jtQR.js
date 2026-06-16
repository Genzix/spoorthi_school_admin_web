import{l as K,p as O,b as g,j as e,A as v,q as Q,k as n,m as T}from"./index-Dw8q8pd0.js";import{F as Z,a as ee}from"./index-C9Urxevv.js";import{s as u}from"./Search-BVAmrx5H.js";import{A as te}from"./add-DFGXhUn7.js";import{A as ne}from"./AddEmployeeDialog-CvSHao5f.js";const ie=T`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,D=T`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,re=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 20px;
`,oe=n.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${ie} 1s ease-in-out infinite;
`,se=n.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${D} 1.5s ease-in-out infinite;
`,ae=n.div`
  display: flex;
  width: 100%;
  height: 70px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${D} 1.5s ease-in-out infinite;
  margin-bottom: 10px;
  border-radius: 8px;
`,le=n.div`
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
`,ce=n.button`
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
`,m=n.div`
  background-color: #EFEFEF;
  min-height: 100vh;
  transition: all 0.3s ease;
`,b=n.div`
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
`,w=n.div`
  position: relative;
  width: 20vw;
`,j=n.input`
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
`,y=n.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none; 
`,F=n.img`
  position: absolute;
  right: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 1vh;
  pointer-events: none;
`,k=n.div`
  position: relative;
  width: fit-content;
`,E=n.select`
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
`;n.button`
  padding: 10px 20px;
  background-color: ${i=>i.variant==="primary"?"#4a6cf7":i.variant==="success"?"#28a745":"#6c757d"};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: ${i=>i.variant==="primary"?"#3a5bd9":i.variant==="success"?"#218838":"#5a6268"};
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;const de=n.div`
  background: #EFEFEF;
  overflow-x: auto;
  transition: all 0.3s ease;
`,he=n.table`
  min-width: 1200px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`,o=n.th`
  background: #EFEFEF;
  padding: 1.8vh 0vw;
  text-align: ${i=>i.leftAlign?"left":"center"};
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.7px;
  vertical-align: middle;
  font-weight: 400;
  color: #000000;
  border-bottom: 1px solid #A7A7A7;
  ${i=>i.leftAlign&&"padding-left: 1vw;"}

  &:nth-child(1) { width: 2vw; }
  &:nth-child(2) { width: 15vw; }
  &:nth-child(3) { width: 7vw; }
  &:nth-child(4) { width: 9vw; }
  &:nth-child(5) { width: 6vw; }
  &:nth-child(6) { width: 6vw; }
  &:nth-child(7) { width: 6vw; }
  &:nth-child(8) { width: 9vw; }
  &:nth-child(9) { width: 9vw; }
  &:nth-child(10) { width: 5vw; }
`,B=n.tr`
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
`,s=n.td`
  padding: 2.4vh 0vw;
  text-align: ${i=>i.leftAlign?"left":"center"};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  vertical-align: middle;
  line-height: 1.5;
  ${i=>i.leftAlign&&"padding-left: 25px;"}
  word-wrap: break-word;
  transition: all 0.2s;
`,pe=n.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({status:i})=>i?"#BEFFB6":"#FEA592"};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  display: inline-block;
  transition: all 0.2s;
`,_=n.input.attrs({type:"checkbox"})`
  width: 1.2vw;
  height: 1.2vw;
  margin-left: 0.4vw;
  cursor: pointer;
  border-radius: 8px;
  background-color: white;
  border: 0px solid #e0e0e0;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  transition: all 0.2s;
  
  &:checked {
    background-color: #FFB942;
    border-color: #FFB942;
    
    &::after {
      content: "✓";
      position: absolute;
      color: black;
      font-size: 0.8vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  &:hover {
    border-color: #FFB942;
  }
`;n.span`
  color: ${i=>i.color||"#28a745"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  transition: all 0.2s;
`;n.button`
  padding: 1vh 0.8vw;
  border-radius: 5vw;
  color: '#000000';
  margin-left:auto;
  margin-right: auto;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  border: none; 
  font-weight: 400;
  display: inline-block;
  background-color: #FFB942;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;const ge=n.button`
  padding: 1vh 0.8vw;
  border-radius: 5vw;
  color: '#000000';
  margin-left: 0.1vw;
  height: 5.7vh;
  margin-right: auto;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  border: none; 
  font-weight: 400;
  display: inline-block;
  background-color: #FFB942;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`,xe=n.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 0.7vw;
  background-color: ${i=>i.color||"#4a6cf7"};
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
`,fe=n.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
`,ve=n.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`,ue=n.div`
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
`,$=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  cursor: pointer;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  &:hover {
    color: #FFB942;
  }
`,me=n.div`
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
`,be=n.div`
  max-width: 14vw;
  font-size: 0.75vw;
  line-height: 1.4;
  color: #333;
  white-space: normal;
`,Ce=()=>{const i=K(),{employees:we,loading:I,error:A,isRefreshing:C,fetchEmployees:je,refreshEmployees:S,getFilteredEmployees:Y,getUniqueValues:R,assignmentsLookupLoading:L,getAssignmentsSummary:q}=O(),[h,x]=g.useState(""),[l,z]=g.useState({department:"",category:"",is_active:""}),[c,p]=g.useState([]),[N,f]=g.useState(!1),U=t=>{i(`/employees/${t}`)},M=()=>{S()},P=t=>{c.includes(t)?p(c.filter(r=>r!==t)):p([...c,t])},V=t=>{t.target.checked?p(d.map(r=>r.id)):p([])},W=t=>{setEmployees(r=>r.map(a=>a.id===t?{...a,isSendingReminder:!0}:a)),setTimeout(()=>{setEmployees(r=>r.map(a=>a.id===t?{...a,isSendingReminder:!1}:a)),alert(`Salary reminder sent to employee with ID: ${t}`)},1e3)},d=Y({searchTerm:h,department:l.department,category:l.category,is_active:l.is_active}),X=R("department"),G=R("category"),H=t=>{const r=["#FFB942"],a=t.charCodeAt(0)||0;return r[a%r.length]},J=()=>{S()};return A?e.jsxs(m,{children:[e.jsx(b,{children:e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:e.jsxs(w,{children:[e.jsx(y,{src:u}),e.jsx(j,{type:"text",placeholder:"Search",value:h,onChange:t=>x(t.target.value),disabled:!0})]})})}),e.jsxs(le,{children:[e.jsx(Z,{size:20}),A,e.jsxs(ce,{onClick:M,children:[e.jsx(ee,{size:16}),"Retry"]})]})]}):I&&!C?e.jsxs(m,{children:[e.jsx(b,{children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:[e.jsxs(w,{children:[e.jsx(y,{src:u}),e.jsx(j,{type:"text",placeholder:"Search",value:h,onChange:t=>x(t.target.value),disabled:!0})]}),e.jsxs(k,{children:[e.jsx(E,{value:"",disabled:!0,children:e.jsx("option",{value:"",children:"All Employees"})}),e.jsx(F,{src:v})]})]})}),e.jsxs(re,{children:[e.jsx(oe,{}),e.jsx(se,{children:"Loading employees..."})]})]}):e.jsxs(m,{children:[e.jsxs(b,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:[e.jsxs(w,{children:[e.jsx(y,{src:u}),e.jsx(j,{type:"text",placeholder:"Search",value:h,onChange:t=>x(t.target.value)})]}),e.jsxs(k,{children:[e.jsxs(E,{value:l.department,onChange:t=>z({...l,department:t.target.value}),children:[e.jsx("option",{value:"",children:"All Departments"}),X.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(F,{src:v})]}),e.jsxs(k,{children:[e.jsxs(E,{value:l.category,onChange:t=>z({...l,category:t.target.value}),children:[e.jsx("option",{value:"",children:"All Categories"}),G.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(F,{src:v})]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx($,{onClick:()=>f(!0),children:"Add Employee"}),e.jsx(ue,{onClick:()=>f(!0),children:e.jsx("img",{src:te,style:{height:"1.8vh"}})}),N&&e.jsx(ne,{onClose:()=>f(!1),onSuccess:J}),c.length>0&&e.jsx(ge,{onClick:()=>c.forEach(t=>W(t)),children:"Send Reminder"})]})]}),e.jsx(de,{children:C?e.jsx("div",{style:{padding:"20px"},children:[...Array(5)].map((t,r)=>e.jsx(ae,{},r))}):d.length===0?e.jsxs(me,{children:[e.jsx("h3",{children:"No employees found"}),e.jsx($,{style:{marginTop:"1vh"},children:"Try adjusting your search or filters"})]}):e.jsxs(he,{children:[e.jsx("thead",{children:e.jsxs(B,{children:[e.jsx(o,{children:e.jsx(_,{checked:c.length===d.length&&d.length>0,onChange:V})}),e.jsx(o,{leftAlign:!0,children:"Employee"}),e.jsx(o,{children:"Employee No"}),e.jsx(o,{children:"Email"}),e.jsx(o,{children:"Phone"}),e.jsx(o,{children:"Salary"}),e.jsx(o,{children:"Department"}),e.jsx(o,{children:"Category"}),e.jsx(o,{children:"Classes / Sections"}),e.jsx(o,{children:"Sick"}),e.jsx(o,{children:"Absent"}),e.jsx(o,{children:"Status"})]})}),e.jsx("tbody",{children:d.map(t=>e.jsxs(B,{children:[e.jsx(s,{children:e.jsx(_,{checked:c.includes(t.id),onChange:()=>P(t.id)})}),e.jsx(s,{leftAlign:!0,children:e.jsxs(fe,{onClick:()=>U(t.id),children:[t.photo?e.jsx("img",{src:t.photo,alt:t.name,style:{width:"5.7vh",height:"5.7vh",borderRadius:"0.7vw",objectFit:"cover",marginRight:"0.8vw"}}):e.jsx(xe,{color:H(t.name),children:e.jsx("div",{children:t.name.charAt(0).toUpperCase()})}),e.jsxs(ve,{children:[e.jsx("div",{style:{fontWeight:"400"},children:t.name}),e.jsx("div",{style:{fontSize:"0.8vw",color:"grey"},children:t.employee_no})]})]})}),e.jsx(s,{children:t.employee_no||"-"}),e.jsx(s,{children:t.email}),e.jsx(s,{children:t.phone}),e.jsxs(s,{children:["₹",t.salary]}),e.jsx(s,{children:t.department_name}),e.jsx(s,{children:t.category_name}),e.jsx(s,{children:e.jsx(be,{children:L&&Q(t.handled_classes).length>0?"Loading...":q(t)})}),e.jsx(s,{children:t.sick_leave_count}),e.jsx(s,{children:t.present_days}),e.jsx(s,{children:e.jsx(pe,{status:t.is_active,children:t.is_active?"Active":"Inactive"})})]},t.id))})]})})]})};export{Ce as default};
