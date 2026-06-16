import{b as a,q as G,G as ge,j as e,H as K,I as me,i as v,J as V,k as d,K as fe,m as M}from"./index-Dw8q8pd0.js";import{F as ue}from"./index-C9Urxevv.js";import{A as ye}from"./add-DFGXhUn7.js";const m="https://spoorthischool.genzix.space",W=d.div`
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
`,X=d.div`
  position: absolute;
  right: 0;
  background-color: #FFE6BB;
  width: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,xe=d.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;d.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;d.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  padding: 5px;
  
  &:hover {
    color: #333;
  }
`;const ve=d.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
`,be=M`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;M`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;const we=d.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,je=d.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${be} 1s ease-in-out infinite;
`,Se=d.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background:  #FEA592;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FF7E62;
    transform: scale(1.05);
  }
`,Ce=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4vh;
`,Fe=d.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;d.label`
  padding: 8px 16px;
  background-color: #FFB942;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFA726;
  }
`;const Q=d.input.attrs({type:"checkbox"})`
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
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  
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
`,Re=d.div`
  margin-bottom: 2.4vh;
  padding: 1.2vh 0.8vw;
  border-radius: 0.6vw;
  background-color: rgba(255, 255, 255, 0.55);
  border: 1px solid #fff;
`,ke=d.label`
  display: block;
  margin-bottom: 1vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  color: #000;
  font-weight: 500;
`,ze=d.p`
  margin: 0 0 1.2vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  letter-spacing: 0.5px;
  color: #555;
`,Be=d.p`
  margin: 0 0 1vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  color: #c62828;
`,Y=d.div`
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  max-height: 18vh;
  overflow-y: auto;
`,Z=d.label`
  display: flex;
  align-items: center;
  gap: 0.5vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.78vw;
  letter-spacing: 0.5px;
  cursor: pointer;
  color: ${f=>f.$warning?"#c62828":"#000"};
`,Ae=d.div`
  margin-top: 1.2vh;
  padding-top: 1vh;
  border-top: 1px solid rgba(255, 255, 255, 0.8);
`,$e=d.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  letter-spacing: 0.5px;
  font-weight: 500;
  margin-bottom: 0.8vh;
  color: ${f=>f.$warning?"#c62828":"#333"};
`,S=d.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.72vw;
  color: #666;
  font-style: italic;
`,Pe=({onClose:f,onSuccess:D,isEditMode:p=!1,initialData:o=null})=>{var U,O;const[i,C]=a.useState({name:(o==null?void 0:o.name)||"",employee_no:(o==null?void 0:o.employee_no)||"",email:(o==null?void 0:o.email)||"",phone:(o==null?void 0:o.phone)||"",salary:(o==null?void 0:o.salary)||"",department:((U=o==null?void 0:o.department)==null?void 0:U.id)||(o==null?void 0:o.department)||"",category:((O=o==null?void 0:o.category)==null?void 0:O.id)||(o==null?void 0:o.category)||"",is_active:(o==null?void 0:o.is_active)??!0,photo:null,joining_date:(o==null?void 0:o.joining_date)||""}),[c,k]=a.useState(()=>G(o==null?void 0:o.handled_classes)),[u,z]=a.useState(()=>G(o==null?void 0:o.handled_sections)),[b,ee]=a.useState([]),[B,oe]=a.useState([]),[te,A]=a.useState(!0),[$,F]=a.useState(!1),[_,w]=a.useState(null),[E,j]=a.useState(null),[se,ne]=a.useState([]),[re,le]=a.useState([]),[de,L]=a.useState(!1),[ie,P]=a.useState(!1),[I,N]=a.useState(!1),[R,T]=a.useState(o!=null&&o.photo?`${m}${o.photo}`:null),y=a.useMemo(()=>ge(B),[B]),q=a.useMemo(()=>{if(c.length===0)return[];const t=new Set;return u.forEach(n=>{Object.entries(y).forEach(([r,l])=>{l.some(s=>s.id===n)&&t.add(r)})}),c.filter(n=>!t.has(n))},[c,u,y]);a.useEffect(()=>{(async()=>{const n=localStorage.getItem("token");if(!n){w("No authentication token found"),A(!1);return}try{L(!0),P(!0),N(!0);const[r,l,s,g]=await Promise.all([v.get(`${m}/employees/departments/`,{headers:{Authorization:`Bearer ${n}`}}),v.get(`${m}/employees/categories/`,{headers:{Authorization:`Bearer ${n}`}}),v.get(`${m}/masters/classes/`,{headers:{Authorization:`Bearer ${n}`}}),v.get(`${m}/masters/sections/`,{headers:{Authorization:`Bearer ${n}`}})]);ne(r.data.data||[]),le(l.data.data||[]),ee(V(s)),oe(V(g))}catch(r){console.error("Error fetching employee form data:",r),w("Failed to load employee form data")}finally{L(!1),P(!1),N(!1),A(!1)}})()},[]);const h=t=>{const{name:n,value:r}=t.target;C(l=>({...l,[n]:r}))},ae=t=>{k(n=>{if(n.includes(t)){const l=new Set(K(t,y).map(s=>s.id));return z(s=>s.filter(g=>!l.has(g))),n.filter(s=>s!==t)}return[...n,t]}),j(null)},ce=(t,n)=>{z(r=>r.includes(t)?r.filter(l=>l!==t):(c.includes(n)||k(l=>[...l,n]),[...r,t])),j(null)},H=t=>{const n=t.target.files[0];if(n){C(l=>({...l,photo:n}));const r=new FileReader;r.onloadend=()=>{T(r.result)},r.readAsDataURL(n)}},pe=()=>{C(t=>({...t,photo:null})),T(null)},he=async t=>{var r;t.preventDefault(),F(!0),w(null),j(null);const n=fe(c,u,y,b);if(n){j(n),F(!1);return}try{const l=localStorage.getItem("token");if(!l)throw new Error("No authentication token found");const s=new FormData;s.append("name",i.name),s.append("employee_no",i.employee_no),s.append("email",i.email),s.append("phone",i.phone),s.append("salary",i.salary),s.append("department",i.department),s.append("category",i.category),s.append("is_active",i.is_active),s.append("joining_date",i.joining_date),s.append("handled_classes",JSON.stringify(c)),s.append("handled_sections",JSON.stringify(u)),i.photo?s.append("photo",i.photo):p&&!R&&s.append("photo","");const g=p?`${m}/employees/employees/${o.id}/`:`${m}/employees/employees/`,x=await v[p?"put":"post"](g,s,{headers:{Authorization:`Bearer ${l}`,"Content-Type":"multipart/form-data"}});console.log(p?"Employee updated successfully:":"Employee added successfully:",x.data),f(),D()}catch(l){console.error(`Error ${p?"updating":"adding"} employee:`,l);const s=(r=l.response)==null?void 0:r.data,g=(s==null?void 0:s.message)||(typeof s=="object"?Object.entries(s).map(([J,x])=>`${J}: ${Array.isArray(x)?x.join(", "):x}`).join(`
`):null)||l.message||`Failed to ${p?"update":"add"} employee`;w(g)}finally{F(!1)}};return a.useEffect(()=>{const t=window.getComputedStyle(document.body).overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=t}},[]),te?e.jsx(W,{children:e.jsx(X,{children:e.jsx(we,{children:e.jsx(je,{})})})}):e.jsx(W,{children:e.jsxs(X,{children:[e.jsx(xe,{children:e.jsx(Se,{onClick:f,children:e.jsx("img",{src:ye,style:{height:"1.8vh",transform:"rotate(-45deg)"},alt:"Close"})})}),e.jsxs(ve,{children:[_&&e.jsx("div",{style:{color:"red",marginBottom:"15px"},children:_}),e.jsxs("form",{onSubmit:he,children:[e.jsxs(Ce,{children:[R?e.jsxs("div",{style:{position:"relative",display:"inline-block"},children:[e.jsxs("label",{style:{display:"contents",cursor:"pointer"},children:[e.jsx(Fe,{src:R,style:{width:"13vh",height:"13vh",borderRadius:"2vh",backgroundColor:"#fff",marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},alt:"Employee Preview"}),e.jsx("input",{type:"file",accept:"image/*",onChange:H,style:{display:"none"}})]}),e.jsx("button",{type:"button",onClick:pe,style:{position:"absolute",top:0,right:0,background:"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",color:"white",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:e.jsx(ue,{size:16})})]}):e.jsxs("label",{style:{display:"contents",cursor:"pointer"},children:[e.jsx("div",{style:{width:"13vh",height:"13vh",borderRadius:"2vh",backgroundColor:"#fff",marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:e.jsx("span",{style:{fontSize:"12px",textAlign:"center"},children:"Upload Photo"})}),e.jsx("input",{type:"file",accept:"image/*",onChange:H,style:{display:"none"}})]}),e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"0.1vh",fontSize:"0.8vw",letterSpacing:"0.7px",color:"#000"},children:"Add Employee Photo"})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"name",placeholder:"Name *",value:i.name,onChange:h,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,maxLength:100})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"employee_no",placeholder:"Employee No",value:i.employee_no,onChange:h,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"email",name:"email",placeholder:"Email *",value:i.email,onChange:h,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"tel",name:"phone",placeholder:"Phone *",value:i.phone,onChange:h,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"number",name:"salary",placeholder:"Salary *",value:i.salary,onChange:h,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"date",name:"joining_date",placeholder:"Joining Date",value:i.joining_date,onChange:h,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})}),e.jsxs("div",{style:{display:"flex",gap:"1vw",marginBottom:"2.4vh"},children:[e.jsx("div",{style:{flex:1},children:e.jsxs("select",{name:"department",value:i.department,onChange:h,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:de,required:!0,children:[e.jsx("option",{value:"",children:"Select Department *"}),se.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]})}),e.jsx("div",{style:{flex:1},children:e.jsxs("select",{name:"category",value:i.category,onChange:h,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:ie,required:!0,children:[e.jsx("option",{value:"",children:"Select Category *"}),re.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]})})]}),e.jsxs(Re,{children:[e.jsx(ke,{children:"Handled Classes & Sections"}),e.jsx(ze,{children:"Classes are optional. If you select a class, you must select at least one section for that class."}),E&&e.jsx(Be,{children:E}),I?e.jsx(S,{children:"Loading classes..."}):b.length===0?e.jsx(S,{children:"No classes available"}):e.jsx(Y,{children:b.map(t=>e.jsxs(Z,{$warning:q.includes(t.id),children:[e.jsx(Q,{checked:c.includes(t.id),onChange:()=>ae(t.id)}),e.jsx("span",{children:t.name})]},t.id))}),c.length>0&&e.jsx(e.Fragment,{children:c.map(t=>{const n=b.find(s=>s.id===t),r=K(t,y),l=q.includes(t);return e.jsxs(Ae,{children:[e.jsxs($e,{$warning:l,children:["Sections for ",(n==null?void 0:n.name)||"Selected class",l?" *":""]}),I?e.jsx(S,{children:"Loading sections..."}):r.length===0?e.jsx(S,{children:"No sections available for this class"}):e.jsx(Y,{children:r.map(s=>e.jsxs(Z,{children:[e.jsx(Q,{checked:u.includes(s.id),onChange:()=>ce(s.id,t)}),e.jsx("span",{children:me(s,r)})]},s.id))})]},t)})})]}),e.jsx("button",{type:"submit",style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",backgroundColor:"#FFB942",border:"1px solid #FFB942",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px",marginBottom:"5vh"},disabled:$,children:$?p?"Updating...":"Adding...":p?"Update Employee":"Add Employee"})]})]})]})})};export{Pe as A};
