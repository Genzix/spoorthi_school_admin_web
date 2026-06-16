import{b as i,j as e,i as y,k as d,m as k}from"./index-DLjENkrc.js";import{F as L}from"./index-BGtRKvl8.js";import{A as N}from"./add-DFGXhUn7.js";const S=d.div`
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
`,C=d.div`
  position: absolute;
  right: 0;
  background-color: #FFE6BB;
  width: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,T=d.div`
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
`;const H=d.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
`,J=k`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;k`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;const O=d.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,X=d.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${J} 1s ease-in-out infinite;
`,G=d.div`
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
`,K=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4vh;
`,Q=d.img`
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
`;d.input.attrs({type:"checkbox"})`
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
`;const M=({onClose:v,onSuccess:R,isEditMode:p=!1,initialData:o=null})=>{const[t,g]=i.useState({name:(o==null?void 0:o.name)||"",employee_no:(o==null?void 0:o.employee_no)||"",email:(o==null?void 0:o.email)||"",phone:(o==null?void 0:o.phone)||"",salary:(o==null?void 0:o.salary)||"",department:(o==null?void 0:o.department)||"",category:(o==null?void 0:o.category)||"",is_active:(o==null?void 0:o.is_active)??!0,photo:null,joining_date:(o==null?void 0:o.joining_date)||""}),[f,h]=i.useState(!1),[x,m]=i.useState(null),[z,B]=i.useState([]),[_,A]=i.useState([]),[E,b]=i.useState(!1),[I,w]=i.useState(!1),[u,j]=i.useState(o!=null&&o.photo?`https://spoorthi-dev.genzix.space${o.photo}`:null);i.useEffect(()=>{const r=async()=>{try{h(!0),b(!0);const n=localStorage.getItem("token"),s=await y.get("https://spoorthi-dev.genzix.space/employees/departments/",{headers:{Authorization:`Bearer ${n}`}});B(s.data.data)}catch(n){console.error("Error fetching departments:",n),m("Failed to fetch departments")}finally{b(!1),h(!1)}},a=async()=>{try{h(!0),w(!0);const n=localStorage.getItem("token"),s=await y.get("https://spoorthi-dev.genzix.space/employees/categories/",{headers:{Authorization:`Bearer ${n}`}});A(s.data.data)}catch(n){console.error("Error fetching categories:",n),m("Failed to fetch categories")}finally{w(!1),h(!1)}};r(),a()},[]);const c=r=>{const{name:a,value:n}=r.target;g(s=>({...s,[a]:n}))},F=r=>{const a=r.target.files[0];if(a){g(s=>({...s,photo:a}));const n=new FileReader;n.onloadend=()=>{j(n.result)},n.readAsDataURL(a)}},$=()=>{g(r=>({...r,photo:null})),j(null)},P=async r=>{var a,n;r.preventDefault(),h(!0),m(null);try{const s=localStorage.getItem("token");if(!s)throw new Error("No authentication token found");const l=new FormData;l.append("name",t.name),l.append("employee_no",t.employee_no),l.append("email",t.email),l.append("phone",t.phone),l.append("salary",t.salary),l.append("department",t.department),l.append("category",t.category),l.append("is_active",t.is_active),l.append("joining_date",t.joining_date),t.photo?l.append("photo",t.photo):p&&!u&&l.append("photo","");const q=p?`https://spoorthi-dev.genzix.space/employees/employees/${o.id}/`:"https://spoorthi-dev.genzix.space/employees/employees/",U=await y[p?"put":"post"](q,l,{headers:{Authorization:`Bearer ${s}`,"Content-Type":"multipart/form-data"}});console.log(p?"Employee updated successfully:":"Employee added successfully:",U.data),v(),R()}catch(s){console.error(`Error ${p?"updating":"adding"} employee:`,s),m(((n=(a=s.response)==null?void 0:a.data)==null?void 0:n.message)||s.message||`Failed to ${p?"update":"add"} employee`)}finally{h(!1)}};return i.useEffect(()=>{const r=window.getComputedStyle(document.body).overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=r}},[]),f?e.jsx(S,{children:e.jsx(C,{children:e.jsx(O,{children:e.jsx(X,{})})})}):e.jsx(S,{children:e.jsxs(C,{children:[e.jsx(T,{children:e.jsx(G,{onClick:v,children:e.jsx("img",{src:N,style:{height:"1.8vh",transform:"rotate(-45deg)"},alt:"Close"})})}),e.jsxs(H,{children:[x&&e.jsx("div",{style:{color:"red",marginBottom:"15px"},children:x}),e.jsxs("form",{onSubmit:P,children:[e.jsxs(K,{children:[u?e.jsxs("div",{style:{position:"relative",display:"inline-block"},children:[e.jsxs("label",{style:{display:"contents",cursor:"pointer"},children:[e.jsx(Q,{src:u,style:{width:"13vh",height:"13vh",borderRadius:"2vh",backgroundColor:"#fff",marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},alt:"Employee Preview"}),e.jsx("input",{type:"file",accept:"image/*",onChange:F,style:{display:"none"}})]}),e.jsx("button",{type:"button",onClick:$,style:{position:"absolute",top:0,right:0,background:"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",color:"white",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:e.jsx(L,{size:16})})]}):e.jsxs("label",{style:{display:"contents",cursor:"pointer"},children:[e.jsx("div",{style:{width:"13vh",height:"13vh",borderRadius:"2vh",backgroundColor:"#fff",marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:e.jsx("span",{style:{fontSize:"12px",textAlign:"center"},children:"Upload Photo"})}),e.jsx("input",{type:"file",accept:"image/*",onChange:F,style:{display:"none"}})]}),e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"0.1vh",fontSize:"0.8vw",letterSpacing:"0.7px",color:"#000"},children:"Add Employee Photo"})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"name",placeholder:"Name *",value:t.name,onChange:c,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,maxLength:100})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"employee_no",placeholder:"Employee No",value:t.employee_no,onChange:c,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"email",name:"email",placeholder:"Email *",value:t.email,onChange:c,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"tel",name:"phone",placeholder:"Phone *",value:t.phone,onChange:c,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"number",name:"salary",placeholder:"Salary *",value:t.salary,onChange:c,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"date",name:"joining_date",placeholder:"Joining Date",value:t.joining_date,onChange:c,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})}),e.jsxs("div",{style:{display:"flex",gap:"1vw",marginBottom:"2.4vh"},children:[e.jsx("div",{style:{flex:1},children:e.jsxs("select",{name:"department",value:t.department,onChange:c,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:E,required:!0,children:[e.jsx("option",{value:"",children:"Select Department *"}),z.map(r=>e.jsx("option",{value:r.id,children:r.name},r.id))]})}),e.jsx("div",{style:{flex:1},children:e.jsxs("select",{name:"category",value:t.category,onChange:c,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:I,required:!0,children:[e.jsx("option",{value:"",children:"Select Category *"}),_.map(r=>e.jsx("option",{value:r.id,children:r.name},r.id))]})})]}),e.jsx("button",{type:"submit",style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",backgroundColor:"#FFB942",border:"1px solid #FFB942",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px",marginBottom:"5vh"},disabled:f,children:f?p?"Updating...":"Adding...":p?"Update Employee":"Add Employee"})]})]})]})})};export{M as A};
