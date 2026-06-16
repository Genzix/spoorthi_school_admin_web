import{b as a,k as n,j as o,i as m,m as T}from"./index-DLjENkrc.js";import{j as Z,k as Se,F as ke}from"./index-BGtRKvl8.js";const V=T`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,je=T`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,Be=T`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,Ce=n.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,De=n.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${V} 1s ease-in-out infinite;
`,ze=n.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
`,_e=n.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
`,H=n.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;n.div`
  height: 85vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 39vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
`;n.div`
  height: 70vh;
  background: #ffffff;
  padding: 2vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;const _=n.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 0.85vw;
  font-weight: 700;
  color: grey;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`,Q=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;n.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  margin-top: 2vh;
  font-weight: 700;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;n.input`
  padding: 1.2vh 0.5vw;
  border-radius: 0.6vw;
  border: 1px solid #000000;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  background-color: transparent;
  color: #000000;
  cursor: pointer;
  letter-spacing: 1px;
  transition: all 0.2s;
  width: 8vw;
  height: 4vh;
  box-sizing: border-box;
  
  &:hover {
    background-color: #FFEAC7;
  }
  
  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
    background-color: #FFEAC7;
  }
`;n.div`
  width: 100%;
  margin-top: 2vh;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 0.5vw;

  &::-webkit-scrollbar {
    width: 0.3vw;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1vw;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1vh 1vw;
  background: #EFEFEF;
  border-radius: 0.6vw;
  margin-bottom: 1.4vh;
  font-family: "Roboto", sans-serif;
  transition: all 0.2s;

  &:hover {
    background: #FFEAC7;
    transform: translateY(-1px);
  }
`;n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000000;
  letter-spacing: 0.7px;
`;n.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
`;n.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`;n.label`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #626060;
`;n.input`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  transition: all 0.3s;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;n.textarea`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  min-height: 8vh;
  resize: vertical;
  transition: all 0.3s;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;n.button`
  padding: 1.5vh 1vw;
  background-color: ${s=>s.disabled?"#cccccc":"#BEFFB6"};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  min-height: 4vh;
  transition: all 0.3s;

  &:hover {
    background-color: ${s=>s.disabled?"#cccccc":"#92FF84"};
    transform: ${s=>s.disabled?"none":"translateY(-1px)"};
  }
`;const E=n.div`
  width: 1.2vw;
  height: 1.2vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${V} 1s ease-in-out infinite;
`;n.button`
  padding: 0.8vh 1vw;
  background: #FFEAC7;
  border: 1px solid #FFB942;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000000;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 0.5vw;
  margin-bottom: 0.5vw;

  &:hover {
    background: #FFB942;
    transform: translateY(-1px);
  }
`;n.div`
  background: #f8f9fa;
  padding: 1.5vh 1vw;
  border-radius: 0.6vw;
  margin-bottom: 1vh;
  border: 1px solid #e9ecef;
`;n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  font-weight: 600;
  color: #000000;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;const Ee=n.div`
  position: fixed;
  top: 2vh;
  right: 2vw;
  background-color: #4CAF50;
  color: white;
  padding: 1.5vh 2vw;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.9vw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: ${s=>s.show?je:Be} 0.3s ease-in-out;
  display: ${s=>s.show?"block":"none"};
`,Te=n.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;
`,Me=n.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;
`;n.div`
  text-align: center;
  padding: 2vh 0;
  font-family: 'Roboto, sans-serif';
  font-size: 0.8vw;
  color: #666;
  margin: auto;
`;const Ae=n.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,Ie=n.div`
  border: 2px dashed ${s=>s.isDragOver?"#FFB942":"#ccc"};
  border-radius: 0.8vw;
  padding: 2vh 1vw;
  text-align: center;
  background: ${s=>s.isDragOver?"#FFEAC7":"#f8f9fa"};
  transition: all 0.3s;
  cursor: pointer;
  min-height: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;

  &:hover {
    border-color: #FFB942;
    background: #FFEAC7;
  }
`,Re=n.div`
  font-size: 2vw;
  color: #666;
  margin-bottom: 0.5vh;
`,$e=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;
  margin-bottom: 0.5vh;
`;n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.6vw;
  color: #999;
`;const Pe=n.input`
  display: none;
`,Ne=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  margin-top: 1vh;
  border: 1px solid #e9ecef;
`,Ue=n.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`,Oe=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000;
  font-weight: 500;
`,Ye=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.6vw;
  color: #666;
`,qe=n.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.2vh 0.3vw;
  border-radius: 0.3vw;
  transition: all 0.2s;

  &:hover {
    background: #ffe6e6;
  }
`,Je=n.button`
  padding: 1vh 1.5vw;
  background-color: ${s=>s.disabled?"#cccccc":"#BEFFB6"};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  transition: all 0.3s;
  align-self: flex-end;
  margin-top: 1vh;

  &:hover {
    background-color: ${s=>s.disabled?"#cccccc":"#92FF84"};
    transform: ${s=>s.disabled?"none":"translateY(-1px)"};
  }
`,Le=n.div`
  width: 100%;
  height: 0.3vh;
  background: #e9ecef;
  border-radius: 0.15vh;
  overflow: hidden;
  margin-top: 1vh;
`,Ge=n.div`
  height: 100%;
  background: #FFB942;
  width: ${s=>s.progress}%;
  transition: width 0.3s ease;
`,ot=()=>{const[s,M]=a.useState(!1),[h,ee]=a.useState("day"),[c,te]=a.useState(()=>{const e=new Date,t=5.5*60*60*1e3;return new Date(e.getTime()+t).toISOString().split("T")[0]}),[y,A]=a.useState([]),[We,I]=a.useState([]),[R,$]=a.useState(0),[oe,f]=a.useState(!1),[ne,w]=a.useState(""),[Ke,Xe]=a.useState(!1),[Ze,He]=a.useState({}),[F,P]=a.useState(!1),[l,N]=a.useState(null),[S,U]=a.useState(!1),[k,O]=a.useState(""),[u,j]=a.useState(null),[se,B]=a.useState(!1),[Y,q]=a.useState(!1),[v,b]=a.useState(0),[J,g]=a.useState(""),[Qe,Ve]=a.useState({subject:"",message:""}),C=()=>{const e=new Date,t=5.5*60*60*1e3;return new Date(e.getTime()+t)},D=C(),ae=D.getFullYear(),re=D.getMonth()+1;D.getDate();const ie=e=>["January","February","March","April","May","June","July","August","September","October","November","December"][e-1],p=()=>localStorage.getItem("token"),le=async e=>{var t;try{M(!0);const r=p();if(!r){console.error("No authentication token found");return}const i=await m.get(`https://spoorthi-dev.genzix.space/masters/absent-students/${e}/`,{headers:{Authorization:`Bearer ${r}`}});if(i.data&&i.data.data){const d=i.data.data;A(d.absent_students||[]),I(d.absent_students||[]),$(((t=d.attendance_summary)==null?void 0:t.total_absent)||0)}}catch(r){console.error("Error fetching absent students:",r);const i=[{id:1,name:"John Doe",admission_no:"ST001",group:"Class 10A",father_name:"Mr. Doe",phone:"+1234567890"},{id:2,name:"Jane Smith",admission_no:"ST002",group:"Class 9B",father_name:"Mr. Smith",phone:"+1234567891"},{id:3,name:"Mike Johnson",admission_no:"ST003",group:"Class 8A",father_name:"Mr. Johnson",phone:"+1234567892"},{id:4,name:"Sarah Wilson",admission_no:"ST004",group:"Class 10B",father_name:"Mr. Wilson",phone:"+1234567893"},{id:5,name:"David Brown",admission_no:"ST005",group:"Class 9A",father_name:"Mr. Brown",phone:"+1234567894"}];A(i),I(i),$(i.length)}finally{M(!1)}},de=async()=>{try{const e=p();if(!e){console.error("No authentication token found");return}const t=await m.get("https://spoorthi-dev.genzix.space/masters/fees-collection/",{headers:{Authorization:`Bearer ${e}`}});t.data&&t.data.data&&(N(t.data.data),t.data.data.academic_year_collection&&t.data.data.academic_year_collection.length>0&&O(t.data.data.academic_year_collection[0].academic_year))}catch(e){console.error("Error fetching fee data:",e),N({total_fees_collected:2e3,total_pending_fees:78e3,three_month_revenue:{total:0,months:[{month:"July 2025",amount:0},{month:"June 2025",amount:0},{month:"May 2025",amount:0}]},yearly_revenue:0,monthly_collection:[],academic_year_collection:[{academic_year:"2025-2027",total_collection:2e3}],last_payments:[]}),O("2025-2027")}};a.useEffect(()=>{const e=h==="day"?c:C().toISOString().split("T")[0];le(e),de()},[c,h]);const x=e=>{try{const t=new Date(e);if(isNaN(t.getTime()))return e;const r={year:"numeric",month:"short",day:"numeric",timeZone:"Asia/Kolkata"};return t.toLocaleDateString("en-IN",r)}catch(t){return console.error("Error formatting date:",t),e}},z=e=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:0,maximumFractionDigits:0}).format(e);`${x(c)}`,`${x(c)}`,`${x(c)}`,`${k}${l?z(l.total_pending_fees):"₹0"}`,`${k}${l?z(l.total_pending_fees):"₹0"}`;const ce=async()=>{if(y.length===0){alert("No absent students found for the selected date.");return}P(!0);try{const e=p();if(!e){console.error("No authentication token found"),alert("Authentication token not found. Please login again.");return}const t=await m.post("https://spoorthi-dev.genzix.space/masters/messages/bulk-absent-student/",{},{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});t.data&&(w(`Bulk message sent successfully to ${R} absent students!`),f(!0),setTimeout(()=>{f(!1)},3e3),console.log("Bulk message sent successfully:",t.data))}catch(e){console.error("Error sending bulk message:",e);let t="Failed to send bulk message. Please try again.";e.response?(t=e.response.data.message||t,console.error("Error response:",e.response.data)):e.request?console.error("No response received:",e.request):console.error("Error setting up request:",e.message),alert(t)}finally{P(!1)}},fe=async()=>{if(!l||l.total_pending_fees===0){alert("No pending fees found.");return}U(!0);try{const e=p();if(!e){console.error("No authentication token found"),alert("Authentication token not found. Please login again.");return}const t=await m.post("https://spoorthi-dev.genzix.space/masters/messages/bulk-term-pending-message/",{},{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});t.data&&(w("Fee reminder sent successfully!"),f(!0),setTimeout(()=>{f(!1)},3e3),console.log("Bulk term pending message sent successfully:",t.data))}catch(e){console.error("Error sending bulk term pending message:",e);let t="Failed to send fee reminder. Please try again.";e.response?(t=e.response.data.message||t,console.error("Error response:",e.response.data)):e.request?console.error("No response received:",e.request):console.error("Error setting up request:",e.message),alert(t)}finally{U(!1)}},ue=e=>{const t=["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel.sheet.macroEnabled.12","application/vnd.ms-excel.template.macroEnabled.12"],r=[".xls",".xlsx",".xlsm",".xltx"];if(!t.includes(e.type)){const d=e.name.toLowerCase().substring(e.name.lastIndexOf("."));if(!r.includes(d))return"Please select a valid Excel file (.xls, .xlsx, .xlsm, .xltx)"}const i=10*1024*1024;return e.size>i?"File size should be less than 10MB":null},L=e=>{g("");const t=ue(e);if(t){g(t);return}j(e)},ge=e=>{e.preventDefault(),B(!0)},he=e=>{e.preventDefault(),B(!1)},pe=e=>{e.preventDefault(),B(!1);const t=e.dataTransfer.files;t.length>0&&L(t[0])},me=e=>{const t=e.target.files[0];t&&L(t)},ve=()=>{j(null),g(""),b(0)},be=e=>{if(e===0)return"0 Bytes";const t=1024,r=["Bytes","KB","MB","GB"],i=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,i)).toFixed(2))+" "+r[i]},xe=async()=>{var e;if(!u){g("Please select a file to upload");return}q(!0),b(0),g("");try{const t=p();if(!t)throw new Error("No authentication token found");const r=new FormData;r.append("file",u);const i=await m.post("https://spoorthi-dev.genzix.space/masters/test-marks/bulk-upload/",r,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"multipart/form-data"},onUploadProgress:d=>{const Fe=Math.round(d.loaded*100/d.total);b(Fe)}});i.data&&(w(typeof((e=i.data)==null?void 0:e.message)=="string"&&i.data.message.trim()?i.data.message:"Excel file uploaded successfully!"),f(!0),setTimeout(()=>{f(!1)},3e3),j(null),b(0),console.log("File uploaded successfully:",i.data))}catch(t){console.error("Error uploading file:",t);let r="Failed to upload file. Please try again.";t.response?(r=t.response.data.message||t.response.data.error||r,console.error("Error response:",t.response.data)):t.request?console.error("No response received:",t.request):console.error("Error setting up request:",t.message),g(r)}finally{q(!1)}},G={marginTop:"auto",alignSelf:"flex-end",width:"auto",padding:"1.2vh 1vw",backgroundColor:"transparent",border:"1px solid #000000",color:"#000000",borderRadius:"0.6vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer",transition:"all 0.2s"},W={...G,backgroundColor:"#FFEAC7"},K={marginTop:"auto",alignSelf:"flex-end",width:"12vw",height:"5.5vh",padding:"1vh 0.7vw",backgroundColor:"#BEFFB6",border:"none",color:"#000000",borderRadius:"3vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer",transition:"all 0.3s"},ye={...K,backgroundColor:"#cccccc",cursor:"not-allowed"},X={marginTop:"auto",alignSelf:"flex-end",width:"12vw",height:"5.5vh",padding:"1vh 0.7vw",backgroundColor:"#BEFFB6",border:"none",color:"#000000",borderRadius:"3vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer",transition:"all 0.3s"},we={...X,backgroundColor:"#cccccc",cursor:"not-allowed"};return n.div`
    font-family: "Roboto", sans-serif;
    font-size: 0.8vw;
    margin-top: 2vh;
    font-weight: 400;
    margin-right: 0.1vw;
    color: #000000;
    letter-spacing: 0.7px;
    transition: all 0.2s;
  `,s?o.jsx("div",{style:{height:"75vh",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx(Ce,{children:o.jsx(De,{})})}):o.jsxs(ze,{children:[o.jsxs(Ee,{show:oe,children:[o.jsx(Te,{children:"✓"}),ne]}),o.jsxs(_e,{children:[o.jsxs(H,{children:[o.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:o.jsx(_,{children:"Students Absent"})}),o.jsxs(Q,{style:{color:"#FF6745"},children:[R," Students"]})]}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:o.jsx("button",{style:h==="day"?W:G,onClick:()=>{ee("day"),te(C().toISOString().split("T")[0])},children:h==="day"?x(c):h==="month"?ie(re):ae})}),o.jsx("button",{style:F||y.length===0?ye:K,onClick:ce,disabled:F||y.length===0,children:F?o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"center"},children:[o.jsx(E,{}),"Sending..."]}):"Send Message"})]})]}),o.jsxs(H,{children:[o.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:o.jsx(_,{children:"Pending Fees"})}),o.jsx(Q,{style:{color:"#FF6745"},children:l?z(l.total_pending_fees):"₹0"})]}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:o.jsx("button",{style:W,onClick:()=>{},children:k||"Select Year"})}),o.jsx("button",{style:S||!l||l.total_pending_fees===0?we:X,onClick:fe,disabled:S||!l||l.total_pending_fees===0,children:S?o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"center"},children:[o.jsx(E,{}),"Sending..."]}):"Send Fee Reminder"})]})]}),o.jsx(Ae,{style:{height:"30vh"},children:o.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"start",height:"100%"},children:[o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"1vh"},children:o.jsx(_,{children:"Upload Test Marks"})}),u?o.jsxs(Ne,{children:[o.jsxs(Ue,{children:[o.jsx(Se,{style:{fontSize:"1.2vw",color:"#FFB942"}}),o.jsxs("div",{children:[o.jsx(Oe,{children:u.name}),o.jsx(Ye,{children:be(u.size)})]})]}),o.jsx(qe,{onClick:ve,children:o.jsx(ke,{style:{fontSize:"1vw"}})})]}):o.jsxs(Ie,{isDragOver:se,onDragOver:ge,onDragLeave:he,onDrop:pe,style:{marginTop:"0.6vh",marginBottom:"0.6vh"},onClick:()=>document.getElementById("file-input").click(),children:[o.jsx(Re,{children:o.jsx(Z,{})}),o.jsx($e,{children:"Drag & drop Excel file here or click to browse"}),o.jsx(Pe,{id:"file-input",type:"file",accept:".xls,.xlsx,.xlsm,.xltx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",onChange:me})]}),J&&o.jsx(Me,{style:{marginTop:"1vh"},children:J}),v>0&&v<100&&o.jsx(Le,{children:o.jsx(Ge,{progress:v})}),o.jsx(Je,{onClick:xe,disabled:!u||Y,children:Y?o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:[o.jsx(E,{}),"Uploading... ",v,"%"]}):o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:[o.jsx(Z,{}),"Upload Excel"]})})]})})]})]})};export{ot as default};
