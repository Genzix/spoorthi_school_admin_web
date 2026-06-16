import{o as he,b as l,j as e,i as v,k as p,m as Z}from"./index-fkiekIN7.js";import{A as me}from"./add-DFGXhUn7.js";const W=p.div`
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
`,X=p.div`
  position: absolute;
  right: 0;
  background-color: #FFE6BB;
  width: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,ue=p.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;p.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;p.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  padding: 5px;
  
  &:hover {
    color: #333;
  }
`;const ge=p.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
`,ve=Z`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;Z`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;const be=p.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,xe=p.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${ve} 1s ease-in-out infinite;
`,_e=p.div`
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
`,ye=p.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4vh;
`,Se=p.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;p.label`
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
`;const R=p.input.attrs({type:"checkbox"})`
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
`,Re=({onClose:F,onSuccess:C,isEditMode:d=!1,initialData:s={}})=>{const{academicYears:M,selectedAcademicYear:b}=he(),D=[{value:"reservation",label:"Reservation"},{value:"admission",label:"Admission"}],ee=[{value:"CO-SPARK STAR",label:"CO-SPARK STAR"},{value:"CO-SPARK  GIRLS",label:"CO-SPARK  GIRLS"},{value:"CO-SPARK BOYS",label:"CO-SPARK BOYS"},{value:"S-SPARK STAR",label:"S-SPARK STAR"},{value:"S-SPARK BOYS",label:"S-SPARK BOYS"},{value:"SPARK GIRLS",label:"SPARK GIRLS"},{value:"SPARK BOYS",label:"SPARK BOYS"},{value:"SPARK III",label:"SPARK III"},{value:"SMPL",label:"SMPL"}],te=[{value:"MPC",label:"MPC"},{value:"BiPC",label:"BIPC"},{value:"cec",label:"CEC"},{value:"mec",label:"MEC"}],oe=Array.from({length:8},(o,a)=>a+1),[t,u]=l.useState({name:"",father_name:"",phone_numbers:["",""],class_name_id:"",section_id:"",group:"",batch:"",admission_no:"",pen_no:"",status:"admission",date_of_admission:new Date().toISOString().split("T")[0],no_of_turns:4,committed_fees:"",initial_fee_paid:"",is_bookes_given:!1,is_uniform_given:!1,is_bag_given:!1,photo:null,dob:"",student_aadhar:"",father_aadhar:"",mother_aadhar:"",application_form:null,caste_id:"",sub_caste_id:"",educational_officer_id:"",permanent_address:"",correcspondent_address:"",previous_school:"",academic_year_id:(b==null?void 0:b.id)||""}),[S,f]=l.useState(!1),[B,g]=l.useState(null),[ae,se]=l.useState([]),[ne,z]=l.useState([]),[ie,re]=l.useState([]),[le,k]=l.useState([]),[de,ce]=l.useState([]),[A,P]=l.useState(!1),[I,O]=l.useState(!1),[T,L]=l.useState(!1),[N,K]=l.useState(!1),[$,E]=l.useState(!1),[q,U]=l.useState(null),[G,Y]=l.useState(null);l.useEffect(()=>{var o,a,i,c,m,x;if(d&&s){const h=s.phone_numbers||["",""];u({name:s.name||"",father_name:s.father_name||"",phone_numbers:h.length>=2?h:[...h,""],class_name_id:((o=s.class_name)==null?void 0:o.id)||"",section_id:((a=s.section)==null?void 0:a.id)||"",group:s.group||"",batch:s.batch||"",admission_no:s.admission_no||"",pen_no:s.pen_no||"",status:s.status||"admission",date_of_admission:s.date_of_admission||new Date().toISOString().split("T")[0],no_of_turns:s.no_of_turns||4,committed_fees:s.committed_fees||"",initial_fee_paid:s.initial_fee_paid||"",is_bookes_given:s.is_bookes_given||!1,is_uniform_given:s.is_uniform_given||!1,is_bag_given:s.is_bag_given||!1,photo:s.photo||null,dob:s.dob||"",student_aadhar:s.student_aadhar||"",father_aadhar:s.father_aadhar||"",mother_aadhar:s.mother_aadhar||"",application_form:s.application_form||null,caste_id:((i=s.caste)==null?void 0:i.id)||"",sub_caste_id:((c=s.sub_caste)==null?void 0:c.id)||"",educational_officer_id:((m=s.educational_officer)==null?void 0:m.id)||"",permanent_address:s.permanent_address||"",correcspondent_address:s.correcspondent_address||"",previous_school:s.previous_school||"",academic_year_id:((x=s.academic_year)==null?void 0:x.id)||""}),s.photo&&U(s.photo),s.application_form&&Y(s.application_form)}},[d,s]),l.useEffect(()=>{(async()=>{try{f(!0),P(!0);const a=localStorage.getItem("token"),i=await v.get("https://spoorthischool.genzix.space/masters/classes/",{headers:{Authorization:`Bearer ${a}`}});se(i.data.data)}catch(a){console.error("Error fetching classes:",a),g("Failed to fetch classes")}finally{P(!1),f(!1)}})()},[]),l.useEffect(()=>{(async()=>{if(d)try{f(!0),L(!0);const a=localStorage.getItem("token"),i=await v.get("https://spoorthischool.genzix.space/masters/caste/",{headers:{Authorization:`Bearer ${a}`}});re(i.data)}catch(a){console.error("Error fetching castes:",a),g("Failed to fetch castes")}finally{L(!1),f(!1)}})()},[d]),l.useEffect(()=>{(async()=>{if(!d||!t.caste_id){k([]);return}try{f(!0),K(!0);const a=localStorage.getItem("token"),c=(await v.get("https://spoorthischool.genzix.space/masters/subcaste/",{headers:{Authorization:`Bearer ${a}`}})).data.filter(m=>m.caste.id===t.caste_id);k(c)}catch(a){console.error("Error fetching sub-castes:",a),g("Failed to fetch sub-castes")}finally{f(!1),K(!1)}})()},[t.caste_id,d]),l.useEffect(()=>{(async()=>{if(d)try{f(!0),E(!0);const a=localStorage.getItem("token"),i=await v.get("https://spoorthischool.genzix.space/masters/eduofficer/",{headers:{Authorization:`Bearer ${a}`}});ce(i.data)}catch(a){console.error("Error fetching educational officers:",a),g("Failed to fetch educational officers")}finally{E(!1),f(!1)}})()},[d]),l.useEffect(()=>{d&&(async()=>{if(!t.class_name_id||!t.group||!t.batch){z([]);return}try{f(!0),O(!0);const a=localStorage.getItem("token"),c=(await v.get(`https://spoorthischool.genzix.space/masters/sections/?class_name=${t.class_name_id}&group=${t.group}&batch=${t.batch}`,{headers:{Authorization:`Bearer ${a}`}})).data.data.filter(m=>m.class_name===t.class_name_id&&m.group===t.group&&m.batch===t.batch);z(c)}catch(a){console.error("Error fetching sections:",a),g("Failed to fetch sections")}finally{f(!1),O(!1)}})()},[t.class_name_id,t.group,t.batch,d]);const r=o=>{const{name:a,value:i}=o.target;u(c=>({...c,[a]:i,...a==="class_name_id"||a==="group"||a==="batch"?{section_id:""}:{}}))},H=(o,a)=>{const i=[...t.phone_numbers];i[o]=a,u(c=>({...c,phone_numbers:i}))},w=o=>{const{name:a,checked:i}=o.target;u(c=>({...c,[a]:i}))},J=o=>{const a=o.target.files[0];if(a){u(c=>({...c,photo:a}));const i=new FileReader;i.onloadend=()=>{U(i.result)},i.readAsDataURL(a)}},pe=o=>{const a=o.target.files[0];if(a){u(c=>({...c,application_form:a}));const i=new FileReader;i.onloadend=()=>{Y(i.result)},i.readAsDataURL(a)}},fe=async o=>{var a,i,c,m,x;o.preventDefault(),f(!0),g(null);try{const h=localStorage.getItem("token");if(!h)throw new Error("No authentication token found");const n=new FormData;n.append("name",t.name),n.append("father_name",t.father_name);const j=t.phone_numbers.filter(Q=>Q&&Q.trim()!=="");n.append("phone_numbers",JSON.stringify(j)),t.class_name_id&&n.append("class_name_id",t.class_name_id),t.section_id&&n.append("section_id",t.section_id);const y=t.academic_year_id||(b==null?void 0:b.id);y&&n.append("academic_year_id",y),n.append("group",t.group),n.append("batch",t.batch),n.append("admission_no",t.admission_no),t.pen_no&&n.append("pen_no",t.pen_no),n.append("status",t.status),n.append("date_of_admission",t.date_of_admission),n.append("no_of_turns",t.no_of_turns),n.append("committed_fees",parseFloat(t.committed_fees)||0),n.append("initial_fee_paid",parseFloat(t.initial_fee_paid)||0),n.append("is_bookes_given",t.is_bookes_given),n.append("is_uniform_given",t.is_uniform_given),n.append("is_bag_given",t.is_bag_given),t.educational_officer_id&&n.append("educational_officer_id",t.educational_officer_id),t.caste_id&&n.append("caste_id",t.caste_id),t.sub_caste_id&&n.append("sub_caste_id",t.sub_caste_id),t.dob&&n.append("dob",t.dob),t.student_aadhar&&n.append("student_aadhar",t.student_aadhar),t.father_aadhar&&n.append("father_aadhar",t.father_aadhar),t.mother_aadhar&&n.append("mother_aadhar",t.mother_aadhar),t.photo&&t.photo instanceof File&&n.append("photo",t.photo),t.application_form&&t.application_form instanceof File&&n.append("application_form",t.application_form),t.permanent_address&&n.append("permanent_address",t.permanent_address),t.correcspondent_address&&n.append("correcspondent_address",t.correcspondent_address),t.previous_school&&n.append("previous_school",t.previous_school);const V={headers:{Authorization:`Bearer ${h}`,"Content-Type":"multipart/form-data"}};let _;d&&s.id?_=await v.put(`https://spoorthischool.genzix.space/masters/students/${s.id}/`,n,V):_=await v.post("https://spoorthischool.genzix.space/masters/students/",n,V),console.log("Student operation successful:",_.data),F(),C&&C(((a=_.data)==null?void 0:a.data)||_.data)}catch(h){if(console.error("Error in student operation:",h),(c=(i=h.response)==null?void 0:i.data)!=null&&c.errors){const n=Object.entries(h.response.data.errors).map(([j,y])=>`${j}: ${y.join(", ")}`).join(`
`);g(n)}else g(((x=(m=h.response)==null?void 0:m.data)==null?void 0:x.message)||h.message||`Failed to ${d?"update":"add"} student`)}finally{f(!1)}};return l.useEffect(()=>{const o=window.getComputedStyle(document.body).overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=o}},[]),S?e.jsx(W,{children:e.jsx(X,{children:e.jsx(be,{children:e.jsx(xe,{})})})}):e.jsx(W,{children:e.jsxs(X,{children:[e.jsx(ue,{children:e.jsx(_e,{onClick:F,children:e.jsx("img",{src:me,style:{height:"1.8vh",transform:"rotate(-45deg)"},alt:"Close"})})}),e.jsxs(ge,{children:[B&&e.jsx("div",{style:{color:"red",marginBottom:"15px",padding:"10px",backgroundColor:"rgba(255, 0, 0, 0.1)",borderRadius:"4px",whiteSpace:"pre-line"},children:B}),e.jsxs("form",{onSubmit:fe,children:[e.jsxs(ye,{children:[q?e.jsxs("label",{style:{display:"contents",cursor:"pointer"},children:[e.jsx(Se,{src:q,style:{width:"13vh",height:"13vh",borderRadius:"2vh",backgroundColor:"#fff",marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},alt:"Student Preview"}),e.jsx("input",{type:"file",accept:"image/*",onChange:J,style:{display:"none"}})]}):e.jsxs("label",{style:{display:"contents",cursor:"pointer"},children:[e.jsx("div",{style:{width:"13vh",height:"13vh",borderRadius:"2vh",backgroundColor:"#fff",marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:e.jsx("span",{style:{textAlign:"center",fontFamily:'"Roboto", sans-serif',fontSize:"0.7vw",letterSpacing:"0.7px"},children:"Upload Photo"})}),e.jsx("input",{type:"file",accept:"image/*",onChange:J,style:{display:"none"}})]}),e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"0.1vh",fontSize:"0.8vw",letterSpacing:"0.7px",color:"#000"},children:"Add Student Photo"})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"name",placeholder:"Name *",value:t.name,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,maxLength:100})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"admission_no",placeholder:"Admission No *",value:t.admission_no,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Pen No"}),e.jsx("input",{type:"text",name:"pen_no",placeholder:"Pen No",value:t.pen_no,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"number",name:"committed_fees",placeholder:"Committed Fees *",value:t.committed_fees,onChange:o=>{const a=o.target.value.replace(/[^0-9.]/g,"");(a.match(/\./g)||[]).length<=1&&u(i=>({...i,committed_fees:a}))},style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"number",name:"initial_fee_paid",placeholder:d?"Initial Fee Paid":"Initial Fee Paid *",value:t.initial_fee_paid,onChange:o=>{const a=o.target.value.replace(/[^0-9.]/g,"");(a.match(/\./g)||[]).length<=1&&u(i=>({...i,initial_fee_paid:a}))},style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!d})}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Status *"}),e.jsx("select",{name:"status",value:t.status,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,children:D.map(o=>e.jsx("option",{value:o.value,children:o.label},o.value))})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Number of Terms *"}),e.jsx("select",{name:"no_of_turns",value:t.no_of_turns,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,children:oe.map(o=>e.jsxs("option",{value:o,children:[o," Term",o!==1?"s":""]},o))})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"father_name",placeholder:"Father's Name *",value:t.father_name,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,maxLength:100})}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Date of Admission *"}),e.jsx("input",{type:"date",name:"date_of_admission",placeholder:"Date of Admission *",value:t.date_of_admission,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsxs("div",{style:{display:"flex",gap:"1vw"},children:[e.jsx("input",{type:"tel",value:t.phone_numbers[0],onChange:o=>H(0,o.target.value),style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},placeholder:"Primary phone number",required:!0}),e.jsx("input",{type:"tel",value:t.phone_numbers[1],onChange:o=>H(1,o.target.value),style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},placeholder:"Secondary phone number (optional)"})]})}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Academic Year *"}),e.jsxs("select",{name:"academic_year_id",value:t.academic_year_id,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,children:[e.jsx("option",{value:"",children:"Select Academic Year"}),M.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]})]}),e.jsxs("div",{style:{display:"flex",gap:"1vw",marginBottom:"3vh"},children:[e.jsxs("div",{style:{flex:1},children:[e.jsxs("select",{name:"class_name_id",value:t.class_name_id,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:A,children:[e.jsx("option",{value:"",children:"Select Class"}),ae.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]}),A&&e.jsx("div",{children:"Loading classes..."})]}),d&&e.jsxs("div",{style:{flex:1},children:[e.jsxs("select",{name:"section_id",value:t.section_id,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:!t.class_name_id||!t.group||!t.batch||I,children:[e.jsx("option",{value:"",children:"Select Section"}),ne.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]}),I&&e.jsx("div",{children:"Loading sections..."})]})]}),e.jsxs("div",{style:{display:"flex",gap:"1vw",marginBottom:"3vh"},children:[e.jsx("div",{style:{flex:1},children:e.jsxs("select",{name:"group",value:t.group,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,children:[e.jsx("option",{value:"",children:"Select Group"}),ee.map(o=>e.jsx("option",{value:o.value,children:o.label},o.value))]})}),e.jsx("div",{style:{flex:1},children:e.jsxs("select",{name:"batch",value:t.batch,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,children:[e.jsx("option",{value:"",children:"Select Batch"}),te.map(o=>e.jsx("option",{value:o.value,children:o.label},o.value))]})})]}),d&&e.jsxs("div",{style:{marginBottom:"3vh",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},children:[e.jsx(R,{type:"checkbox",name:"is_bookes_given",checked:t.is_bookes_given,onChange:w}),"Books Given"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},children:[e.jsx(R,{type:"checkbox",name:"is_uniform_given",checked:t.is_uniform_given,onChange:w}),"Uniform Given"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},children:[e.jsx(R,{type:"checkbox",name:"is_bag_given",checked:t.is_bag_given,onChange:w}),"Bag Given"]})]}),d&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Student Aadhaar Number"}),e.jsx("input",{type:"text",name:"student_aadhar",placeholder:"Student Aadhaar Number",value:t.student_aadhar,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Father's Aadhaar Number"}),e.jsx("input",{type:"text",name:"father_aadhar",placeholder:"Father's Aadhaar Number",value:t.father_aadhar,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Mother's Aadhaar Number"}),e.jsx("input",{type:"text",name:"mother_aadhar",placeholder:"Mother's Aadhaar Number",value:t.mother_aadhar,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Date of Birth"}),e.jsx("input",{type:"date",name:"dob",value:t.dob,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Permanent Address"}),e.jsx("input",{type:"text",name:"permanent_address",placeholder:"Permanent Address",value:t.permanent_address,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Correspondent Address"}),e.jsx("input",{type:"text",name:"correcspondent_address",placeholder:"Correspondent Address",value:t.correcspondent_address,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Previous School"}),e.jsx("input",{type:"text",name:"previous_school",placeholder:"Previous School",value:t.previous_school,onChange:r,maxLength:100,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]})]}),d&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",gap:"1vw",marginBottom:"3vh"},children:[e.jsxs("div",{style:{flex:1},children:[e.jsxs("select",{name:"caste_id",value:t.caste_id,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:T,children:[e.jsx("option",{value:"",children:"Select Caste"}),ie.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]}),T&&e.jsx("div",{children:"Loading castes..."})]}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("select",{name:"sub_caste_id",value:t.sub_caste_id,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:!t.caste_id||N,children:[e.jsx("option",{value:"",children:"Select Sub-Caste"}),le.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]}),N&&e.jsx("div",{children:"Loading sub-castes..."})]})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsxs("select",{name:"educational_officer_id",value:t.educational_officer_id,onChange:r,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:$,children:[e.jsx("option",{value:"",children:"Select Educational Officer"}),de.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]}),$&&e.jsx("div",{children:"Loading educational officers..."})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px",color:"#000"},children:"Application Form"}),G?e.jsx("div",{style:{marginBottom:"10px"},children:e.jsx("a",{href:G,target:"_blank",rel:"noopener noreferrer",style:{color:"#FFB942",textDecoration:"none",fontSize:"0.8vw"},children:"View Current Application Form"})}):null,e.jsx("input",{type:"file",accept:".pdf,.doc,.docx,image/*",onChange:pe,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]})]}),e.jsx("button",{type:"submit",style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",backgroundColor:"#FFB942",border:"1px solid #FFB942",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px",marginBottom:"5vh",cursor:"pointer"},disabled:S,children:S?d?"Updating...":"Adding...":d?"Update Student":"Add Student"})]})]})]})})};export{Re as A};
