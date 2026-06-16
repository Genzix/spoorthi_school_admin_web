import{o as Se,b as d,j as e,i as _,k as u,m as ne}from"./index-Dw8q8pd0.js";import{A as je}from"./add-DFGXhUn7.js";const se=u.div`
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
`,ae=u.div`
  position: absolute;
  right: 0;
  background-color: #FFE6BB;
  width: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,Fe=u.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;u.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;u.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  padding: 5px;
  
  &:hover {
    color: #333;
  }
`;const Ce=u.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
`,Re=ne`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;ne`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;const Be=u.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,ze=u.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${Re} 1s ease-in-out infinite;
`,ke=u.div`
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
`,Ae=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4vh;
`,Ie=u.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;u.label`
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
`;const I=u.input.attrs({type:"checkbox"})`
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
`,Pe=({onClose:T,onSuccess:N,isEditMode:f=!1,initialData:i={}})=>{const{academicYears:ie,selectedAcademicYear:y}=Se(),re=[{value:"reservation",label:"Reservation"},{value:"admission",label:"Admission"}],l=o=>(o||"").toString().replace(/\s+/g," ").trim(),de=Array.from({length:8},(o,s)=>s+1),[t,b]=d.useState({name:"",father_name:"",phone_numbers:["",""],class_name_id:"",section_id:"",group:"",batch:"",admission_no:"",pen_no:"",status:"admission",date_of_admission:new Date().toISOString().split("T")[0],no_of_turns:4,committed_fees:"",initial_fee_paid:"",is_bookes_given:!1,is_uniform_given:!1,is_bag_given:!1,photo:null,dob:"",student_aadhar:"",father_aadhar:"",mother_aadhar:"",application_form:null,caste_id:"",sub_caste_id:"",educational_officer_id:"",permanent_address:"",correcspondent_address:"",previous_school:"",academic_year_id:(y==null?void 0:y.id)||""}),[B,g]=d.useState(!1),[P,x]=d.useState(null),[le,ce]=d.useState([]),[pe,$]=d.useState([]),[v,z]=d.useState([]),[fe,he]=d.useState([]),[me,O]=d.useState([]),[ue,ge]=d.useState([]),[E,G]=d.useState(!1),[j,L]=d.useState(!1),[q,U]=d.useState(!1),[V,H]=d.useState(!1),[Y,J]=d.useState(!1),[K,Q]=d.useState(null),[W,X]=d.useState(null),F=d.useMemo(()=>{const o=new Set,s=new Set;return v.forEach(a=>{const r=l(a.group),c=l(a.batch);r&&o.add(r),c&&s.add(c)}),{hasGroups:o.size>0,hasBatches:s.size>0}},[v]),ve=d.useMemo(()=>{const o=l(t.batch);return[...new Set(v.filter(s=>!o||l(s.batch)===o).map(s=>l(s.group)).filter(Boolean))].sort((s,a)=>s.localeCompare(a))},[v,t.batch]),be=d.useMemo(()=>{const o=l(t.group);return[...new Set(v.filter(s=>!o||l(s.group)===o).map(s=>l(s.batch)).filter(Boolean))].sort((s,a)=>s.localeCompare(a))},[v,t.group]),Z=!t.group||!t.batch,xe=!!t.class_name_id&&(F.hasGroups||F.hasBatches);d.useEffect(()=>{var o,s,a,r,c,h;if(f&&i){const m=i.phone_numbers||["",""];b({name:i.name||"",father_name:i.father_name||"",phone_numbers:m.length>=2?m:[...m,""],class_name_id:((o=i.class_name)==null?void 0:o.id)||i.class_name_id||"",section_id:((s=i.section)==null?void 0:s.id)||i.section_id||"",group:i.group||"",batch:i.batch||"",admission_no:i.admission_no||"",pen_no:i.pen_no||"",status:i.status||"admission",date_of_admission:i.date_of_admission||new Date().toISOString().split("T")[0],no_of_turns:i.no_of_turns||4,committed_fees:i.committed_fees||"",initial_fee_paid:i.initial_fee_paid||"",is_bookes_given:i.is_bookes_given||!1,is_uniform_given:i.is_uniform_given||!1,is_bag_given:i.is_bag_given||!1,photo:i.photo||null,dob:i.dob||"",student_aadhar:i.student_aadhar||"",father_aadhar:i.father_aadhar||"",mother_aadhar:i.mother_aadhar||"",application_form:i.application_form||null,caste_id:((a=i.caste)==null?void 0:a.id)||"",sub_caste_id:((r=i.sub_caste)==null?void 0:r.id)||"",educational_officer_id:((c=i.educational_officer)==null?void 0:c.id)||"",permanent_address:i.permanent_address||"",correcspondent_address:i.correcspondent_address||"",previous_school:i.previous_school||"",academic_year_id:((h=i.academic_year)==null?void 0:h.id)||""}),i.photo&&Q(i.photo),i.application_form&&X(i.application_form)}},[f,i]),d.useEffect(()=>{(async()=>{try{g(!0),G(!0);const s=localStorage.getItem("token"),a=await _.get("https://spoorthischool.genzix.space/masters/classes/",{headers:{Authorization:`Bearer ${s}`}});ce(a.data.data)}catch(s){console.error("Error fetching classes:",s),x("Failed to fetch classes")}finally{G(!1),g(!1)}})()},[]),d.useEffect(()=>{(async()=>{if(f)try{g(!0),U(!0);const s=localStorage.getItem("token"),a=await _.get("https://spoorthischool.genzix.space/masters/caste/",{headers:{Authorization:`Bearer ${s}`}});he(a.data)}catch(s){console.error("Error fetching castes:",s),x("Failed to fetch castes")}finally{U(!1),g(!1)}})()},[f]),d.useEffect(()=>{(async()=>{if(!f||!t.caste_id){O([]);return}try{g(!0),H(!0);const s=localStorage.getItem("token"),r=(await _.get("https://spoorthischool.genzix.space/masters/subcaste/",{headers:{Authorization:`Bearer ${s}`}})).data.filter(c=>c.caste.id===t.caste_id);O(r)}catch(s){console.error("Error fetching sub-castes:",s),x("Failed to fetch sub-castes")}finally{g(!1),H(!1)}})()},[t.caste_id,f]),d.useEffect(()=>{(async()=>{if(f)try{g(!0),J(!0);const s=localStorage.getItem("token"),a=await _.get("https://spoorthischool.genzix.space/masters/eduofficer/",{headers:{Authorization:`Bearer ${s}`}});ge(a.data)}catch(s){console.error("Error fetching educational officers:",s),x("Failed to fetch educational officers")}finally{J(!1),g(!1)}})()},[f]),d.useEffect(()=>{(async()=>{var s;if(!t.class_name_id){z([]),$([]);return}try{g(!0),L(!0);const a=localStorage.getItem("token"),r=await _.get(`https://spoorthischool.genzix.space/masters/sections/?class_name=${t.class_name_id}`,{headers:{Authorization:`Bearer ${a}`}}),c=Array.isArray((s=r==null?void 0:r.data)==null?void 0:s.data)?r.data.data:[];z(c)}catch(a){console.error("Error fetching sections:",a),x("Failed to fetch sections"),z([])}finally{g(!1),L(!1)}})()},[t.class_name_id]),d.useEffect(()=>{const o=new Map;v.forEach(s=>{const a=l(s.name),r=l(s.group),c=l(s.batch),h=!t.group||r===l(t.group),m=!t.batch||c===l(t.batch);if(!h||!m||!a)return;const n=`${a}|${r}|${c}`;o.has(n)||o.set(n,{...s,displayName:Z?`${a}${r?` - ${r}`:""}${c?` (${c})`:""}`:a})}),$([...o.values()])},[v,t.group,t.batch,Z]);const p=o=>{const{name:s,value:a}=o.target,r=s==="group"||s==="batch"?l(a):a;b(c=>{const h={...c,[s]:r};return s==="class_name_id"?(h.section_id="",h.group="",h.batch="",h):((s==="group"||s==="batch")&&(h.section_id="",s==="group"&&c.batch&&(v.some(n=>l(n.group)===r&&l(n.batch)===l(c.batch))||(h.batch="")),s==="batch"&&c.group&&(v.some(n=>l(n.batch)===r&&l(n.group)===l(c.group))||(h.group=""))),h)})},M=(o,s)=>{const a=[...t.phone_numbers];a[o]=s,b(r=>({...r,phone_numbers:a}))},_e=o=>{const s=o.target.value,a=v.find(r=>r.id===s);if(!a){b(r=>({...r,section_id:""}));return}b(r=>({...r,section_id:a.id,group:l(a.group),batch:l(a.batch)}))},k=o=>{const{name:s,checked:a}=o.target;b(r=>({...r,[s]:a}))},D=o=>{const s=o.target.files[0];if(s){b(r=>({...r,photo:s}));const a=new FileReader;a.onloadend=()=>{Q(a.result)},a.readAsDataURL(s)}},ye=o=>{const s=o.target.files[0];if(s){b(r=>({...r,application_form:s}));const a=new FileReader;a.onloadend=()=>{X(a.result)},a.readAsDataURL(s)}},we=async o=>{var s,a,r,c,h;o.preventDefault(),g(!0),x(null);try{const m=localStorage.getItem("token");if(!m)throw new Error("No authentication token found");const n=new FormData;n.append("name",t.name),n.append("father_name",t.father_name);const A=t.phone_numbers.filter(R=>R&&R.trim()!=="");n.append("phone_numbers",JSON.stringify(A)),t.class_name_id&&n.append("class_name_id",t.class_name_id),t.section_id&&n.append("section_id",t.section_id);const C=t.academic_year_id||(y==null?void 0:y.id);C&&n.append("academic_year_id",C);const w=v.find(R=>R.id===t.section_id),ee=t.group||l(w==null?void 0:w.group),te=t.batch||l(w==null?void 0:w.batch);ee&&n.append("group",ee),te&&n.append("batch",te),n.append("admission_no",t.admission_no),t.pen_no&&n.append("pen_no",t.pen_no),n.append("status",t.status),n.append("date_of_admission",t.date_of_admission),n.append("no_of_turns",t.no_of_turns),n.append("committed_fees",parseFloat(t.committed_fees)||0),n.append("initial_fee_paid",parseFloat(t.initial_fee_paid)||0),n.append("is_bookes_given",t.is_bookes_given),n.append("is_uniform_given",t.is_uniform_given),n.append("is_bag_given",t.is_bag_given),t.educational_officer_id&&n.append("educational_officer_id",t.educational_officer_id),t.caste_id&&n.append("caste_id",t.caste_id),t.sub_caste_id&&n.append("sub_caste_id",t.sub_caste_id),t.dob&&n.append("dob",t.dob),t.student_aadhar&&n.append("student_aadhar",t.student_aadhar),t.father_aadhar&&n.append("father_aadhar",t.father_aadhar),t.mother_aadhar&&n.append("mother_aadhar",t.mother_aadhar),t.photo&&t.photo instanceof File&&n.append("photo",t.photo),t.application_form&&t.application_form instanceof File&&n.append("application_form",t.application_form),t.permanent_address&&n.append("permanent_address",t.permanent_address),t.correcspondent_address&&n.append("correcspondent_address",t.correcspondent_address),t.previous_school&&n.append("previous_school",t.previous_school);const oe={headers:{Authorization:`Bearer ${m}`,"Content-Type":"multipart/form-data"}};let S;f&&i.id?S=await _.put(`https://spoorthischool.genzix.space/masters/students/${i.id}/`,n,oe):S=await _.post("https://spoorthischool.genzix.space/masters/students/",n,oe),console.log("Student operation successful:",S.data),T(),N&&N(((s=S.data)==null?void 0:s.data)||S.data)}catch(m){if(console.error("Error in student operation:",m),(r=(a=m.response)==null?void 0:a.data)!=null&&r.errors){const n=Object.entries(m.response.data.errors).map(([A,C])=>`${A}: ${C.join(", ")}`).join(`
`);x(n)}else x(((h=(c=m.response)==null?void 0:c.data)==null?void 0:h.message)||m.message||`Failed to ${f?"update":"add"} student`)}finally{g(!1)}};return d.useEffect(()=>{const o=window.getComputedStyle(document.body).overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=o}},[]),B?e.jsx(se,{children:e.jsx(ae,{children:e.jsx(Be,{children:e.jsx(ze,{})})})}):e.jsx(se,{children:e.jsxs(ae,{children:[e.jsx(Fe,{children:e.jsx(ke,{onClick:T,children:e.jsx("img",{src:je,style:{height:"1.8vh",transform:"rotate(-45deg)"},alt:"Close"})})}),e.jsxs(Ce,{children:[P&&e.jsx("div",{style:{color:"red",marginBottom:"15px",padding:"10px",backgroundColor:"rgba(255, 0, 0, 0.1)",borderRadius:"4px",whiteSpace:"pre-line"},children:P}),e.jsxs("form",{onSubmit:we,children:[e.jsxs(Ae,{children:[K?e.jsxs("label",{style:{display:"contents",cursor:"pointer"},children:[e.jsx(Ie,{src:K,style:{width:"13vh",height:"13vh",borderRadius:"2vh",backgroundColor:"#fff",marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},alt:"Student Preview"}),e.jsx("input",{type:"file",accept:"image/*",onChange:D,style:{display:"none"}})]}):e.jsxs("label",{style:{display:"contents",cursor:"pointer"},children:[e.jsx("div",{style:{width:"13vh",height:"13vh",borderRadius:"2vh",backgroundColor:"#fff",marginBottom:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:e.jsx("span",{style:{textAlign:"center",fontFamily:'"Roboto", sans-serif',fontSize:"0.7vw",letterSpacing:"0.7px"},children:"Upload Photo"})}),e.jsx("input",{type:"file",accept:"image/*",onChange:D,style:{display:"none"}})]}),e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"0.1vh",fontSize:"0.8vw",letterSpacing:"0.7px",color:"#000"},children:"Add Student Photo"})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"name",placeholder:"Name *",value:t.name,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,maxLength:100})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"admission_no",placeholder:"Admission No *",value:t.admission_no,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Pen No"}),e.jsx("input",{type:"text",name:"pen_no",placeholder:"Pen No",value:t.pen_no,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"number",name:"committed_fees",placeholder:"Committed Fees *",value:t.committed_fees,onChange:o=>{const s=o.target.value.replace(/[^0-9.]/g,"");(s.match(/\./g)||[]).length<=1&&b(a=>({...a,committed_fees:s}))},style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0})}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"number",name:"initial_fee_paid",placeholder:f?"Initial Fee Paid":"Initial Fee Paid *",value:t.initial_fee_paid,onChange:o=>{const s=o.target.value.replace(/[^0-9.]/g,"");(s.match(/\./g)||[]).length<=1&&b(a=>({...a,initial_fee_paid:s}))},style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!f})}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Status *"}),e.jsx("select",{name:"status",value:t.status,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,children:re.map(o=>e.jsx("option",{value:o.value,children:o.label},o.value))})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Number of Terms *"}),e.jsx("select",{name:"no_of_turns",value:t.no_of_turns,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,children:de.map(o=>e.jsxs("option",{value:o,children:[o," Term",o!==1?"s":""]},o))})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsx("input",{type:"text",name:"father_name",placeholder:"Father's Name *",value:t.father_name,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,maxLength:100})}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Date of Admission *"}),e.jsx("input",{type:"date",name:"date_of_admission",placeholder:"Date of Admission *",value:t.date_of_admission,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsx("div",{style:{marginBottom:"2.4vh"},children:e.jsxs("div",{style:{display:"flex",gap:"1vw"},children:[e.jsx("input",{type:"tel",value:t.phone_numbers[0],onChange:o=>M(0,o.target.value),style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},placeholder:"Primary phone number",required:!0}),e.jsx("input",{type:"tel",value:t.phone_numbers[1],onChange:o=>M(1,o.target.value),style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},placeholder:"Secondary phone number (optional)"})]})}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Academic Year *"}),e.jsxs("select",{name:"academic_year_id",value:t.academic_year_id,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},required:!0,children:[e.jsx("option",{value:"",children:"Select Academic Year"}),ie.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsxs("select",{name:"class_name_id",value:t.class_name_id,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:E,children:[e.jsx("option",{value:"",children:"Select Class"}),le.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]}),E&&e.jsx("div",{children:"Loading classes..."})]}),xe&&e.jsxs("div",{style:{display:"flex",gap:"1vw",marginBottom:"3vh"},children:[F.hasGroups&&e.jsx("div",{style:{flex:1},children:e.jsxs("select",{name:"group",value:t.group,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:j,children:[e.jsx("option",{value:"",children:"Select Group (optional)"}),ve.map(o=>e.jsx("option",{value:o,children:o},o))]})}),F.hasBatches&&e.jsx("div",{style:{flex:1},children:e.jsxs("select",{name:"batch",value:t.batch,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:j,children:[e.jsx("option",{value:"",children:"Select Batch (optional)"}),be.map(o=>e.jsx("option",{value:o,children:o},o))]})})]}),e.jsxs("div",{style:{marginBottom:"3vh"},children:[e.jsxs("select",{name:"section_id",value:t.section_id,onChange:_e,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:!t.class_name_id||j,children:[e.jsx("option",{value:"",children:"Select Section"}),pe.map(o=>e.jsx("option",{value:o.id,children:o.displayName||o.name},o.id))]}),j&&e.jsx("div",{children:"Loading sections..."})]}),f&&e.jsxs("div",{style:{marginBottom:"3vh",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},children:[e.jsx(I,{type:"checkbox",name:"is_bookes_given",checked:t.is_bookes_given,onChange:k}),"Books Given"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},children:[e.jsx(I,{type:"checkbox",name:"is_uniform_given",checked:t.is_uniform_given,onChange:k}),"Uniform Given"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},children:[e.jsx(I,{type:"checkbox",name:"is_bag_given",checked:t.is_bag_given,onChange:k}),"Bag Given"]})]}),f&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Student Aadhaar Number"}),e.jsx("input",{type:"text",name:"student_aadhar",placeholder:"Student Aadhaar Number",value:t.student_aadhar,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Father's Aadhaar Number"}),e.jsx("input",{type:"text",name:"father_aadhar",placeholder:"Father's Aadhaar Number",value:t.father_aadhar,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Mother's Aadhaar Number"}),e.jsx("input",{type:"text",name:"mother_aadhar",placeholder:"Mother's Aadhaar Number",value:t.mother_aadhar,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Date of Birth"}),e.jsx("input",{type:"date",name:"dob",value:t.dob,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Permanent Address"}),e.jsx("input",{type:"text",name:"permanent_address",placeholder:"Permanent Address",value:t.permanent_address,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Correspondent Address"}),e.jsx("input",{type:"text",name:"correcspondent_address",placeholder:"Correspondent Address",value:t.correcspondent_address,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',marginTop:"-0.6vh",fontSize:"0.7vw",letterSpacing:"0.7px",color:"#626060"},children:"Previous School"}),e.jsx("input",{type:"text",name:"previous_school",placeholder:"Previous School",value:t.previous_school,onChange:p,maxLength:100,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]})]}),f&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",gap:"1vw",marginBottom:"3vh"},children:[e.jsxs("div",{style:{flex:1},children:[e.jsxs("select",{name:"caste_id",value:t.caste_id,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:q,children:[e.jsx("option",{value:"",children:"Select Caste"}),fe.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]}),q&&e.jsx("div",{children:"Loading castes..."})]}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("select",{name:"sub_caste_id",value:t.sub_caste_id,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:!t.caste_id||V,children:[e.jsx("option",{value:"",children:"Select Sub-Caste"}),me.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]}),V&&e.jsx("div",{children:"Loading sub-castes..."})]})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsxs("select",{name:"educational_officer_id",value:t.educational_officer_id,onChange:p,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"},disabled:Y,children:[e.jsx("option",{value:"",children:"Select Educational Officer"}),ue.map(o=>e.jsx("option",{value:o.id,children:o.name},o.id))]}),Y&&e.jsx("div",{children:"Loading educational officers..."})]}),e.jsxs("div",{style:{marginBottom:"2.4vh"},children:[e.jsx("label",{style:{display:"block",marginBottom:"0.6vh",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px",color:"#000"},children:"Application Form"}),W?e.jsx("div",{style:{marginBottom:"10px"},children:e.jsx("a",{href:W,target:"_blank",rel:"noopener noreferrer",style:{color:"#FFB942",textDecoration:"none",fontSize:"0.8vw"},children:"View Current Application Form"})}):null,e.jsx("input",{type:"file",accept:".pdf,.doc,.docx,image/*",onChange:ye,style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",border:"1px solid #fff",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px"}})]})]}),e.jsx("button",{type:"submit",style:{width:"100%",padding:"0.6vw",borderRadius:"0.6vw",backgroundColor:"#FFB942",border:"1px solid #FFB942",fontFamily:'"Roboto", sans-serif',fontSize:"0.8vw",letterSpacing:"0.7px",marginBottom:"5vh",cursor:"pointer"},disabled:B,children:B?f?"Updating...":"Adding...":f?"Update Student":"Add Student"})]})]})]})})};export{Pe as A};
