import{l as na,n as sa,o as ia,b as h,j as e,A as g,k as s,m as Ne}from"./index-Dw8q8pd0.js";import{F as D,a as je,b as oa,c as L}from"./index-C9Urxevv.js";import{s as W}from"./Search-BVAmrx5H.js";import{A as ta}from"./add-DFGXhUn7.js";import{A as we}from"./AddStudentDialog-DH2Y-WMV.js";import{u as I,w as ra}from"./xlsx-D1NZSDnX.js";import{E as la,a as ca}from"./jspdf.plugin.autotable-ygMoiZsk.js";import{F as da,a as ha,C as pa}from"./FormGroup-CCktE0Lo.js";import{B as _e,D as fa,a as ga,b as xa,c as ma}from"./DialogTitle-CuPH3787.js";import"./Portal-CA-4yvrI.js";const ua=Ne`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,Ee=Ne`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,ba=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 20px;
`,va=s.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${ua} 1s ease-in-out infinite;
`,ja=s.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${Ee} 1.5s ease-in-out infinite;
`,wa=s.div`
  display: flex;
  width: 100%;
  height: 70px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${Ee} 1.5s ease-in-out infinite;
  margin-bottom: 10px;
  border-radius: 8px;
`,_a=s.div`
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
`,Fa=s.button`
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
`,G=s.div`
  background-color: #EFEFEF;
  min-height: 100vh;
  transition: all 0.3s ease;
`,U=s.div`
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
`,O=s.div`
  position: relative;
  width: 20vw;
`,X=s.input`
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
`,q=s.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none; 
`,x=s.img`
  position: absolute;
  right: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 1vh;
  pointer-events: none;
`,m=s.div`
  position: relative;
  width: fit-content;
`,u=s.select`
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
`;s.button`
  padding: 10px 20px;
  background-color: ${t=>t.variant==="primary"?"#4a6cf7":t.variant==="success"?"#28a745":"#6c757d"};
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
    background-color: ${t=>t.variant==="primary"?"#3a5bd9":t.variant==="success"?"#218838":"#5a6268"};
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;const ka=s.div`
  background: #EFEFEF;
  overflow-x: auto;
  transition: all 0.3s ease;
  cursor: grab;
  user-select: none;
  
  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #FFB942;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #FFAC1E;
  }
`,Sa=s.div`
  display: inline-block;
  min-width: 100%;
`,ya=s.table`
  min-width: 1200px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`,p=s.th.withConfig({shouldForwardProp:t=>!["leftAlign"].includes(t)})`
  background: #EFEFEF;
  padding: 1.8vh 0vw;
  text-align: ${t=>t.leftAlign?"left":"center"};
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.7px;
  vertical-align: middle;
  font-weight: 400;
  color: #000000;
  border-bottom: 1px solid #A7A7A7;
  ${t=>t.leftAlign&&"padding-left: 1vw;"}

  &:nth-child(1) { width: 2vw; }
  &:nth-child(2) { width: 15vw; }
  &:nth-child(3) { width: 7vw; }
  &:nth-child(4) { width: 6vw; }
  &:nth-child(5) { width: 9vw; }
  &:nth-child(6) { width: 6vw; }
  &:nth-child(7) { width: 6vw; }
  &:nth-child(8) { width: 6vw; }
  &:nth-child(9) { width: 9vw; }
  &:nth-child(10) { width: 9vw; }
  &:nth-child(11) { width: 5vw; }
  &:nth-child(12) { width: 5vw; }
  &:nth-child(13) { width: 5vw; }
`,Fe=s.tr`
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
`,f=s.td`
  padding: 2vh 0vw;
  text-align: ${t=>t.leftAlign?"left":"center"};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  vertical-align: middle;
  line-height: 1.5;
  ${t=>t.leftAlign&&"padding-left: 25px;"}
  word-wrap: break-word;
  transition: all 0.2s;
`,Aa=s.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({status:t})=>t==="admission"?"#BEFFB6":"#FEA592"};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  display: inline-block;
  transition: all 0.2s;
`,Ca=s.span`
  color: #FF6745;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`,Na=s.span`
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`,ke=s.input.attrs({type:"checkbox"})`
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
`,V=s.span`
  color: ${t=>t.color||"#28a745"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  transition: all 0.2s;
`,H=s.span`
  display: inline-flex;
  align-items: center;
  margin-right: 1vw;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  color: ${t=>t.given?"#28a745":"#FF866B"};
  transition: all 0.2s;
`,Se=s.button`
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
`,Ea=s.button`
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
`,Ba=s.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: black;
  font-weight: 400;
`,Da=s.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 0.7vw;
  background-color: ${t=>t.color||"#4a6cf7"};
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
`,Ra=s.div`
  display: flex;
  align-items: center;
  transition: all 0.2s;
`,$a=s.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;s.div`
  font-size: 0.7vw;
  color: #6c757d;
  margin-top: 0.3vh;
`;const ye=s.div`
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
`,Ae=s.div`
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
`,Ta=s.div`
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
`;s.button`
  padding: 10px 20px;
  background-color: #4a6cf7;
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
    background-color: #3a5bd9;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;const za=s(fa)`
  .MuiDialog-paper {
    border-radius: 12px;
    padding: 20px;
  }
`,Ma=s(ga)`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
`,Pa=s(xa)`
  padding: 20px !important;
`,Ya=s(ma)`
  padding: 16px 24px !important;
`,La=s.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`,Ce=s.button`
  padding: 10px 20px;
  background-color: ${t=>t.isActive?"#4a6cf7":"#f5f5f5"};
  color: ${t=>t.isActive?"white":"#333"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${t=>t.isActive?"#3a5bd9":"#e0e0e0"};
  }
`,Ka=()=>{const t=na(),{students:J,loading:Be,error:K,isRefreshing:Q,refreshStudents:Z,getFilteredStudents:De,getUniqueValues:A,addStudent:Re,updateStudent:$e}=sa(),{academicYears:ee,selectedAcademicYear:w,setSelectedAcademicYear:ae}=ia(),[C,R]=h.useState(""),[d,$]=h.useState({batch:"",status:"",group:"",academicYear:"",hasPendingFees:"",class:"",section:""}),[T,ne]=h.useState(""),[v,N]=h.useState([]),[Te,z]=h.useState(!1),[ze,E]=h.useState(!1),[M,se]=h.useState("excel"),[ie,oe]=h.useState(!1),[te,re]=h.useState(null),[Me,le]=h.useState(!1),[Pe,Ye]=h.useState(0),[Le,We]=h.useState(0),F=h.useRef(null),P=[{id:"name",label:"Student Name"},{id:"father_name",label:"Father Name"},{id:"admission_no",label:"Admission No"},{id:"pen_no",label:"Pen No"},{id:"phone_numbers",label:"Phone Numbers"},{id:"academic_year",label:"Academic Year"},{id:"class_name",label:"Class"},{id:"section",label:"Section"},{id:"group",label:"Group"},{id:"batch",label:"Batch"},{id:"status",label:"Status"},{id:"date_of_admission",label:"Date of Admission"},{id:"dob",label:"Date of Birth"},{id:"student_aadhar",label:"Student Aadhar"},{id:"father_aadhar",label:"Father Aadhar"},{id:"mother_aadhar",label:"Mother Aadhar"},{id:"no_of_turns",label:"No of Turns"},{id:"committed_fees",label:"Committed Fees"},{id:"initial_fee_paid",label:"Initial Fee Paid"},{id:"pending_fees",label:"Pending Fees"},{id:"materials",label:"Materials"},{id:"fee_terms",label:"Fee Terms"}],[l,Ie]=h.useState({name:!0,father_name:!1,admission_no:!0,pen_no:!0,phone_numbers:!0,academic_year:!1,class_name:!1,section:!1,group:!1,batch:!1,status:!1,date_of_admission:!1,dob:!1,student_aadhar:!1,father_aadhar:!1,mother_aadhar:!1,no_of_turns:!1,committed_fees:!1,initial_fee_paid:!1,pending_fees:!1,materials:!1,fee_terms:!1}),Ge=a=>{t(`/students/${a}`)},Ue=()=>{Z()},Oe=a=>{v.includes(a)?N(v.filter(i=>i!==a)):N([...v,a])},Xe=a=>{a.target.checked?N(j.map(i=>i.id)):N([])},ce=a=>{setStudents(i=>i.map(c=>c.id===a?{...c,isSendingReminder:!0}:c)),setTimeout(()=>{setStudents(i=>i.map(c=>c.id===a?{...c,isSendingReminder:!1}:c))},1e3)},j=De({searchTerm:C,category:T,class:d.class,group:d.group,section:d.section}),de=A("batch"),he=A("class");A("group"),A("section");const qe=a=>{const i=["#FFB942"],c=a.charCodeAt(0)||0;return i[c%i.length]},pe=a=>{a?ie?$e(a):Re(a):Z()},Ve=a=>{Ie(i=>({...i,[a]:!i[a]}))},He=()=>{const a=P.filter(n=>l[n.id]),i=j.map(n=>{const r={};return a.forEach(_=>{var k,S,y,b,ve;switch(_.id){case"name":r["Student Name"]=n.name;break;case"father_name":r["Father Name"]=n.father_name||"N/A";break;case"admission_no":r["Admission No"]=n.admission_no;break;case"pen_no":r["Pen No"]=n.pen_no||"N/A";break;case"phone_numbers":const aa=Array.isArray(n.phone_numbers)?n.phone_numbers.join(", "):((k=n.phone_numbers)==null?void 0:k.toString())||"N/A";r["Phone Numbers"]=aa;break;case"academic_year":r["Academic Year"]=((S=n.academic_year)==null?void 0:S.name)||"N/A";break;case"class_name":r.Class=((y=n.class_name)==null?void 0:y.name)||"N/A";break;case"section":r.Section=((b=n.section)==null?void 0:b.name)||"N/A";break;case"group":r.Group=n.group||"N/A";break;case"batch":r.Batch=n.batch||"N/A";break;case"status":r.Status=n.status;break;case"date_of_admission":r["Date of Admission"]=n.date_of_admission||"N/A";break;case"dob":r["Date of Birth"]=n.dob||"N/A";break;case"student_aadhar":r["Student Aadhar"]=n.student_aadhar||"N/A";break;case"father_aadhar":r["Father Aadhar"]=n.father_aadhar||"N/A";break;case"mother_aadhar":r["Mother Aadhar"]=n.mother_aadhar||"N/A";break;case"no_of_turns":r["No of Turns"]=n.no_of_turns;break;case"committed_fees":r["Committed Fees"]=`₹${n.committed_fees}`;break;case"initial_fee_paid":r["Initial Fee Paid"]=`₹${n.initial_fee_paid}`;break;case"pending_fees":r["Pending Fees"]=`₹${n.pending_fees}`;break;case"materials":r.Materials=[n.is_bookes_given?"Books":"",n.is_uniform_given?"Uniform":"",n.is_bag_given?"Bag":""].filter(Boolean).join(", ");break;case"fee_terms":r["Fee Terms"]=((ve=n.fee_terms)==null?void 0:ve.map(B=>`Term ${B.term}: ₹${B.amount} (${B.start_date} to ${B.end_date})`).join("; "))||"N/A";break}}),r}),c=I.json_to_sheet(i),Y=a.map(n=>{switch(n.id){case"name":return{wch:30};case"father_name":return{wch:25};case"admission_no":return{wch:15};case"pen_no":return{wch:12};case"phone_numbers":return{wch:25};case"academic_year":return{wch:15};case"class_name":return{wch:15};case"section":return{wch:15};case"group":return{wch:15};case"batch":return{wch:15};case"status":return{wch:15};case"date_of_admission":return{wch:20};case"dob":return{wch:20};case"student_aadhar":return{wch:20};case"father_aadhar":return{wch:20};case"mother_aadhar":return{wch:20};case"no_of_turns":return{wch:15};case"committed_fees":return{wch:15};case"initial_fee_paid":return{wch:15};case"pending_fees":return{wch:15};case"materials":return{wch:30};case"fee_terms":return{wch:100};default:return{wch:15}}});c["!cols"]=Y;const o=I.book_new();I.book_append_sheet(o,c,"Students"),ra(o,"students.xlsx")},Je=()=>{const a=new la("l","mm","a4");a.setFontSize(16),a.setTextColor(74,108,247),a.text("Students List",14,20),a.setFontSize(10),a.setTextColor(100),a.text(`Generated on: ${new Date().toLocaleDateString()}`,14,30);const i=P.filter(o=>l[o.id]).map(o=>o.label),c=j.map(o=>{var r,_,k,S,y;const n=[];if(l.name&&n.push(o.name),l.father_name&&n.push(o.father_name||"N/A"),l.admission_no&&n.push(o.admission_no),l.pen_no&&n.push(o.pen_no||"N/A"),l.phone_numbers){const b=Array.isArray(o.phone_numbers)?o.phone_numbers.join(", "):((r=o.phone_numbers)==null?void 0:r.toString())||"N/A";n.push(b)}return l.academic_year&&n.push(((_=o.academic_year)==null?void 0:_.name)||"N/A"),l.class_name&&n.push(((k=o.class_name)==null?void 0:k.name)||"N/A"),l.section&&n.push(((S=o.section)==null?void 0:S.name)||"N/A"),l.group&&n.push(o.group||"N/A"),l.batch&&n.push(o.batch||"N/A"),l.status&&n.push(o.status),l.date_of_admission&&n.push(o.date_of_admission||"N/A"),l.dob&&n.push(o.dob||"N/A"),l.student_aadhar&&n.push(o.student_aadhar||"N/A"),l.father_aadhar&&n.push(o.father_aadhar||"N/A"),l.mother_aadhar&&n.push(o.mother_aadhar||"N/A"),l.no_of_turns&&n.push(o.no_of_turns),l.committed_fees&&n.push(`₹${o.committed_fees}`),l.initial_fee_paid&&n.push(`₹${o.initial_fee_paid}`),l.pending_fees&&n.push(`₹${o.pending_fees}`),l.materials&&n.push([o.is_bookes_given?"Books":"",o.is_uniform_given?"Uniform":"",o.is_bag_given?"Bag":""].filter(Boolean).join(", ")),l.fee_terms&&n.push(((y=o.fee_terms)==null?void 0:y.map(b=>`Term ${b.term}: ₹${b.amount} (${b.start_date} to ${b.end_date})`).join("; "))||"N/A"),n}),Y=i.map((o,n)=>{const r=Math.max(...c.map(_=>(_[n]||"").toString().length),i[n].length);return Math.max(30,Math.min(60,r*2.5))});ca(a,{head:[i],body:c,startY:35,theme:"grid",styles:{fontSize:8,cellPadding:2,overflow:"linebreak",cellWidth:"wrap",halign:"center",valign:"middle",font:"helvetica"},headStyles:{fillColor:[74,108,247],textColor:255,fontSize:9,fontStyle:"bold",halign:"center",valign:"middle",font:"helvetica"},alternateRowStyles:{fillColor:[245,245,245]},columnStyles:Object.fromEntries(i.map((o,n)=>[n,{cellWidth:Y[n]}])),margin:{top:35},didDrawPage:function(o){a.setFontSize(8),a.setTextColor(100),a.text(`Page ${o.pageCount} of ${o.pageNumber}`,o.settings.margin.left,a.internal.pageSize.height-10)}}),a.save("students.pdf")},Ke=()=>{M==="excel"?He():Je(),E(!1)},Qe=a=>{re(a),oe(!0)},fe=d.class?[...new Set(J.filter(a=>{var i;return((i=a.class_name)==null?void 0:i.name)===d.class}).map(a=>a.group).filter(Boolean))]:[],ge=d.class?[...new Set(J.filter(a=>{var i;return((i=a.class_name)==null?void 0:i.name)===d.class}).map(a=>{var i;return(i=a.section)==null?void 0:i.name}).filter(Boolean))]:[],xe=a=>{const i=a.target.value;$(c=>({...c,class:i,group:"",section:""}))},me=a=>{$(i=>({...i,group:a.target.value}))},ue=a=>{$(i=>({...i,section:a.target.value}))},Ze=a=>{le(!0),Ye(a.pageX-F.current.offsetLeft),We(F.current.scrollLeft)},be=()=>{le(!1)},ea=a=>{if(!Me)return;a.preventDefault();const c=(a.pageX-F.current.offsetLeft-Pe)*2;F.current.scrollLeft=Le-c};return K?e.jsxs(G,{children:[e.jsx(U,{children:e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:e.jsxs(O,{children:[e.jsx(q,{src:W}),e.jsx(X,{type:"text",placeholder:"Search",value:C,onChange:a=>R(a.target.value),disabled:!0})]})})}),e.jsxs(_a,{children:[e.jsx(D,{size:20}),K,e.jsxs(Fa,{onClick:Ue,children:[e.jsx(je,{size:16}),"Retry"]})]})]}):Be&&!Q?e.jsxs(G,{children:[e.jsx(U,{children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px",flexWrap:"wrap"},children:[e.jsxs(O,{children:[e.jsx(q,{src:W}),e.jsx(X,{type:"text",placeholder:"Search",value:C,onChange:a=>R(a.target.value),disabled:!0})]}),e.jsxs(m,{children:[e.jsxs(u,{value:(w==null?void 0:w.id)||"",onChange:a=>ae(a.target.value),disabled:!0,children:[e.jsx("option",{value:"",children:"All Academic Years"}),ee.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]}),e.jsx(x,{src:g})]}),e.jsxs(m,{children:[e.jsxs(u,{value:T,onChange:a=>ne(a.target.value),children:[e.jsx("option",{value:"",children:"All Batches"}),de.map(a=>e.jsx("option",{value:a,children:a},a))]}),e.jsx(x,{src:g})]}),e.jsxs(m,{children:[e.jsxs(u,{value:d.class,onChange:xe,children:[e.jsx("option",{value:"",children:"All Classes"}),he.map(a=>e.jsx("option",{value:a,children:a},a))]}),e.jsx(x,{src:g})]}),e.jsxs(m,{children:[e.jsxs(u,{value:d.group,onChange:me,disabled:!d.class,children:[e.jsx("option",{value:"",children:"All Groups"}),fe.map(a=>e.jsx("option",{value:a,children:a},a))]}),e.jsx(x,{src:g})]}),e.jsxs(m,{children:[e.jsxs(u,{value:d.section,onChange:ue,disabled:!d.class,children:[e.jsx("option",{value:"",children:"All Sections"}),ge.map(a=>e.jsx("option",{value:a,children:a},a))]}),e.jsx(x,{src:g})]})]})}),e.jsxs(ba,{children:[e.jsx(va,{}),e.jsx(ja,{children:"Loading students..."})]})]}):e.jsxs(G,{children:[e.jsxs(U,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px",flexWrap:"wrap"},children:[e.jsxs(O,{children:[e.jsx(q,{src:W}),e.jsx(X,{type:"text",placeholder:"Search",value:C,onChange:a=>R(a.target.value)})]}),e.jsxs(m,{children:[e.jsxs(u,{value:(w==null?void 0:w.id)||"",onChange:a=>ae(a.target.value),children:[e.jsx("option",{value:"",children:"All Academic Years"}),ee.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]}),e.jsx(x,{src:g})]}),e.jsxs(m,{children:[e.jsxs(u,{value:T,onChange:a=>ne(a.target.value),children:[e.jsx("option",{value:"",children:"All Batches"}),de.map(a=>e.jsx("option",{value:a,children:a},a))]}),e.jsx(x,{src:g})]}),e.jsxs(m,{children:[e.jsxs(u,{value:d.class,onChange:xe,children:[e.jsx("option",{value:"",children:"All Classes"}),he.map(a=>e.jsx("option",{value:a,children:a},a))]}),e.jsx(x,{src:g})]}),e.jsxs(m,{children:[e.jsxs(u,{value:d.group,onChange:me,disabled:!d.class,children:[e.jsx("option",{value:"",children:"All Groups"}),fe.map(a=>e.jsx("option",{value:a,children:a},a))]}),e.jsx(x,{src:g})]}),e.jsxs(m,{children:[e.jsxs(u,{value:d.section,onChange:ue,disabled:!d.class,children:[e.jsx("option",{value:"",children:"All Sections"}),ge.map(a=>e.jsx("option",{value:a,children:a},a))]}),e.jsx(x,{src:g})]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx(Ae,{onClick:()=>z(!0),children:"Add Student"}),e.jsx(ye,{onClick:()=>z(!0),children:e.jsx("img",{src:ta,style:{height:"1.8vh"}})}),e.jsx(ye,{onClick:()=>E(!0),children:e.jsx(oa,{size:20,strokeWidth:1.3})}),Te&&e.jsx(we,{onClose:()=>z(!1),onSuccess:pe}),v.length>0&&e.jsx(Ea,{onClick:()=>v.forEach(a=>ce(a)),children:"Send Reminder"})]})]}),e.jsx(ka,{ref:F,onMouseDown:Ze,onMouseUp:be,onMouseLeave:be,onMouseMove:ea,children:Q?e.jsx("div",{style:{padding:"20px"},children:[...Array(5)].map((a,i)=>e.jsx(wa,{},i))}):j.length===0?e.jsxs(Ta,{children:[e.jsx("h3",{children:"No students found"}),e.jsx(Ae,{style:{marginTop:"1vh"},children:"Try adjusting your search or filters"})]}):e.jsx(Sa,{children:e.jsxs(ya,{children:[e.jsx("thead",{children:e.jsxs(Fe,{children:[e.jsx(p,{children:e.jsx(ke,{checked:v.length===j.length&&j.length>0,onChange:Xe})}),e.jsx(p,{leftAlign:!0,children:"Student"}),e.jsx(p,{children:"Pen No"}),e.jsx(p,{children:"Phone"}),e.jsx(p,{children:"Committed Fee"}),e.jsx(p,{children:"Class"}),e.jsx(p,{children:"Group"}),e.jsx(p,{children:"Section"}),e.jsx(p,{children:"Pending Fees"}),e.jsx(p,{children:"Status"}),e.jsx(p,{children:"Materials"}),e.jsx(p,{children:"Action"}),e.jsx(p,{children:"Edit"})]})}),e.jsx("tbody",{children:j.map(a=>{var i,c;return e.jsxs(Fe,{children:[e.jsx(f,{children:e.jsx(ke,{checked:v.includes(a.id),onChange:()=>Oe(a.id)})}),e.jsx(f,{leftAlign:!0,onClick:()=>Ge(a.id),style:{cursor:"pointer"},children:e.jsxs(Ra,{children:[a.photo?e.jsx("img",{src:a.photo,alt:a.name,style:{width:"5.7vh",height:"5.7vh",borderRadius:"0.7vw",objectFit:"cover",marginRight:"0.8vw"}}):e.jsx(Da,{color:qe(a.name),children:e.jsx("div",{children:a.name.charAt(0).toUpperCase()})}),e.jsxs($a,{children:[e.jsx("div",{style:{fontWeight:"400"},children:a.name}),e.jsx("div",{style:{fontSize:"0.8vw",color:"grey"},children:a.admission_no})]})]})}),e.jsx(f,{children:a.pen_no||"N/A"}),e.jsx(f,{children:e.jsx(Ba,{children:a.phone_numbers&&a.phone_numbers.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[a.phone_numbers[0],","]}),a.phone_numbers[1]&&e.jsx("div",{style:{marginTop:"0.6vh"},children:a.phone_numbers[1]})]}):e.jsx("div",{children:"No phone"})})}),e.jsxs(f,{children:["₹",a.committed_fees]}),e.jsx(f,{children:e.jsxs(Na,{children:[((i=a.class_name)==null?void 0:i.name)||"N/A","-(",a.batch,")"]})}),e.jsx(f,{children:a.group}),e.jsx(f,{children:((c=a.section)==null?void 0:c.name)||"N/A"}),e.jsx(f,{children:e.jsxs(Ca,{children:["₹",a.pending_fees]})}),e.jsx(f,{children:e.jsx(Aa,{status:a.status,children:a.status})}),e.jsx(f,{children:e.jsx("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"start"},children:e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"start",marginLeft:"auto",marginRight:"auto"},children:[e.jsxs(H,{given:a.is_bookes_given,children:[e.jsx(V,{color:a.is_bookes_given?"#28a745":"#FF866B",children:a.is_bookes_given?e.jsx(L,{}):e.jsx(D,{})}),"Books"]}),e.jsxs(H,{given:a.is_uniform_given,children:[e.jsx(V,{color:a.is_uniform_given?"#28a745":"#FF866B",children:a.is_uniform_given?e.jsx(L,{}):e.jsx(D,{})}),"Uniform"]}),e.jsxs(H,{given:a.is_bag_given,children:[e.jsx(V,{color:a.is_bag_given?"#28a745":"#FF866B",children:a.is_bag_given?e.jsx(L,{}):e.jsx(D,{})}),"Bag"]})]})})}),e.jsx(f,{children:e.jsx(Se,{onClick:()=>ce(a.id),disabled:a.isSendingReminder,children:a.isSendingReminder?e.jsx(je,{className:"spin"}):"Send"})}),e.jsx(f,{children:e.jsx(Se,{onClick:()=>Qe(a),children:"Edit"})})]},a.id)})})]})})}),ie&&te&&e.jsx(we,{onClose:()=>{oe(!1),re(null)},onSuccess:pe,isEditMode:!0,initialData:te}),e.jsxs(za,{open:ze,onClose:()=>E(!1),maxWidth:"sm",fullWidth:!0,children:[e.jsx(Ma,{children:"Export Students Data"}),e.jsxs(Pa,{children:[e.jsxs(La,{children:[e.jsx(Ce,{isActive:M==="excel",onClick:()=>se("excel"),children:"Excel"}),e.jsx(Ce,{isActive:M==="pdf",onClick:()=>se("pdf"),children:"PDF"})]}),e.jsx(da,{children:P.map(a=>e.jsx(ha,{control:e.jsx(pa,{checked:l[a.id],onChange:()=>Ve(a.id)}),label:a.label},a.id))})]}),e.jsxs(Ya,{children:[e.jsx(_e,{onClick:()=>E(!1),children:"Cancel"}),e.jsx(_e,{onClick:Ke,variant:"contained",color:"primary",disabled:!Object.values(l).some(Boolean),children:"Export"})]})]})]})};export{Ka as default};
