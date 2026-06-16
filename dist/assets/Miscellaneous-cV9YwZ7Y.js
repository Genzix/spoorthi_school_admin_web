import{j as e,n as Me,o as $e,b as d,i as Y,k as n,m as te}from"./index-DLjENkrc.js";import{s as Ye}from"./Search-BVAmrx5H.js";import{D as Oe,P as Ve,S as Ue,V as c,I as We,T as r,F as ve,p as qe}from"./react-pdf.browser-Bs4WFYTe.js";import{l as Ge}from"./logo1-DDmja1Ha.js";import"./constants-DPngPhlz.js";ve.register({family:"Roboto",src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"});ve.register({family:"Noto Sans",src:"https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNjXhFVZNyB.woff2"});const o=Ue.create({page:{flexDirection:"column",backgroundColor:"#ffffff",padding:15},firstPage:{marginTop:20},header:{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:10,position:"relative",width:"100%"},logo:{width:35,height:35,position:"absolute",left:0},schoolInfo:{flexDirection:"column",alignItems:"center"},schoolName:{fontSize:18,fontFamily:"Roboto",fontWeight:"bold",marginBottom:2,color:"#1a1a1a",textAlign:"center"},schoolAddress:{fontSize:8,fontFamily:"Roboto",marginBottom:2,color:"#666666",textAlign:"center"},title:{fontSize:12,fontFamily:"Roboto",textAlign:"center",marginBottom:6,color:"#1a1a1a",fontWeight:"normal",textTransform:"uppercase"},academicYear:{fontSize:9,fontFamily:"Roboto",textAlign:"center",marginBottom:10,color:"#666666"},studentInfo:{borderWidth:1,borderColor:"#000000",borderStyle:"solid",padding:6,marginBottom:10,borderRadius:4,backgroundColor:"transparent"},studentInfoRow:{flexDirection:"row",marginBottom:3,justifyContent:"space-between"},studentInfoItem:{width:"48%"},studentInfoLabel:{fontSize:8,fontFamily:"Roboto",color:"#666666"},studentInfoValue:{fontSize:8,fontFamily:"Roboto",color:"#1a1a1a",fontWeight:"bold"},table:{marginBottom:10},tableHeader:{flexDirection:"row",borderBottomWidth:1,borderBottomColor:"#000000",borderBottomStyle:"solid",paddingBottom:3,marginBottom:3,backgroundColor:"#f5f5f5"},tableRow:{flexDirection:"row",marginBottom:3},tableCell:{fontSize:8,fontFamily:"Roboto",padding:3},col1:{width:"10%"},col2:{width:"40%"},col3:{width:"15%"},col4:{width:"15%"},col5:{width:"10%"},col6:{width:"10%"},totalRow:{flexDirection:"row",justifyContent:"flex-end",marginTop:6,borderTopWidth:1,borderTopColor:"#000000",borderTopStyle:"solid",paddingTop:3},totalLabel:{fontSize:9,fontFamily:"Roboto",fontWeight:"bold",marginRight:6,color:"#1a1a1a"},totalValue:{fontSize:9,fontFamily:"Roboto",fontWeight:"bold",color:"#1a1a1a"},signatures:{flexDirection:"row",justifyContent:"space-between",marginTop:34},signature:{alignItems:"center"},signatureLine:{width:100,borderBottomWidth:1,borderBottomColor:"#000000",borderBottomStyle:"solid",marginBottom:3},signatureText:{fontSize:8,fontFamily:"Roboto",color:"#666666"},divider:{borderBottomWidth:1,borderBottomColor:"#cccccc",borderBottomStyle:"dashed",marginVertical:30},amountContainer:{flexDirection:"row",alignItems:"center"}}),He=({data:p,isFirstPage:V})=>{const{studentName:E,admissionNo:u,className:Q,section:j,fatherName:X,paymentDate:U,paided_amount:P,paymentMode:I,category:Z,amount:ne,academicYear:W="2025-2026"}=p,q=ae=>ae.replace(/[^0-9.]/g,"");return e.jsxs(c,{style:[o.page,V&&o.firstPage],children:[e.jsxs(c,{style:o.header,children:[e.jsx(We,{style:o.logo,src:Ge}),e.jsxs(c,{style:o.schoolInfo,children:[e.jsx(r,{style:o.schoolName,children:"Spoorthi Educational Institute"}),e.jsx(r,{style:o.schoolAddress,children:"123 School Street, City, State"})]})]}),e.jsx(r,{style:o.title,children:"Miscellaneous Payment Receipt"}),e.jsxs(r,{style:o.academicYear,children:["Academic Year: ",W]}),e.jsxs(c,{style:o.studentInfo,children:[e.jsxs(c,{style:o.studentInfoRow,children:[e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Student Name:"}),e.jsx(r,{style:o.studentInfoValue,children:E})]}),e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Admission No:"}),e.jsx(r,{style:o.studentInfoValue,children:u})]})]}),e.jsxs(c,{style:o.studentInfoRow,children:[e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Class & Section:"}),e.jsxs(r,{style:o.studentInfoValue,children:[Q," - ",j]})]}),e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Father's Name:"}),e.jsx(r,{style:o.studentInfoValue,children:X})]})]}),e.jsxs(c,{style:o.studentInfoRow,children:[e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Payment Date:"}),e.jsx(r,{style:o.studentInfoValue,children:U})]}),e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Payment Mode:"}),e.jsx(r,{style:o.studentInfoValue,children:I})]})]})]}),e.jsxs(c,{style:o.table,children:[e.jsxs(c,{style:o.tableHeader,children:[e.jsx(r,{style:[o.tableCell,o.col1],children:"S.No"}),e.jsx(r,{style:[o.tableCell,o.col2],children:"Category"}),e.jsx(r,{style:[o.tableCell,o.col3],children:"Amount"}),e.jsx(r,{style:[o.tableCell,o.col4],children:"CGST"}),e.jsx(r,{style:[o.tableCell,o.col5],children:"SGST"}),e.jsx(r,{style:[o.tableCell,o.col6],children:"Total"})]}),e.jsxs(c,{style:o.tableRow,children:[e.jsx(r,{style:[o.tableCell,o.col1],children:"1"}),e.jsx(r,{style:[o.tableCell,o.col2],children:Z}),e.jsx(r,{style:[o.tableCell,o.col3],children:q(P)}),e.jsx(r,{style:[o.tableCell,o.col4],children:"0"}),e.jsx(r,{style:[o.tableCell,o.col5],children:"0"}),e.jsx(r,{style:[o.tableCell,o.col6],children:q(P)})]})]}),e.jsxs(c,{style:o.totalRow,children:[e.jsx(r,{style:o.totalLabel,children:"Total Amount:"}),e.jsx(r,{style:o.totalValue,children:q(P)})]}),e.jsxs(c,{style:o.signatures,children:[e.jsxs(c,{style:o.signature,children:[e.jsx(c,{style:o.signatureLine}),e.jsx(r,{style:o.signatureText,children:"Signature Of the Principal"})]}),e.jsxs(c,{style:o.signature,children:[e.jsx(c,{style:o.signatureLine}),e.jsx(r,{style:o.signatureText,children:"Signature Of the Accountant"})]})]})]})},Qe=({data:p})=>e.jsx(Oe,{children:e.jsx(Ve,{size:"A4",style:o.page,children:e.jsx(He,{data:p,isFirstPage:!0})})}),je=te`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,oe=te`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,_e=te`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,Xe=n.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,Ze=n.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${je} 1s ease-in-out infinite;
`,Je=n.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
`,xe=n.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
`,Ke=n.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,be=n.div`
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
`,et=n.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 700;
  color: #000000;
  display: flex;
  align-items: center;
`,tt=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,ot=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  margin-top: 2vh;
  font-weight: 500;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,nt=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,at=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.2vw;
  margin-top: 2vh;
  font-weight: 500;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,st=n.div`
  position: relative;
  width: 100%;
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,rt=n.input`
  padding: 10px 15px 10px 2.4vw;
  width: 100%;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #FFEAC7;
  background-color: #FFEAC7;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  transition: all 0.3s;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`,it=n.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none;
`,lt=n.div`
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
`,dt=n.div`
  display: flex;
  justify-content: space-between;
  padding: 1.1vh 1vw;
  background: #EFEFEF;
  border-radius: 0.6vw;
  margin-bottom: 1.4vh;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
`,we=n.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,ct=n.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
`,w=n.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`,v=n.label`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #626060;
`,N=n.input`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`,H=n.select`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
`,mt=n.div`
  position: relative;
  width: 100%;
`,ut=n.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 20vh;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.6vw;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,ht=n.div`
  padding: 1vh 1vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;

  &:hover {
    background-color: #f1f1f1;
  }
`,ft=n.button`
  padding: 1.5vh 1vw;
  background-color: #BEFFB6;
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;

  &:hover {
    background-color: #92FF84;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`,pt=n.div`
  width: 1vw;
  height: 1vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${je} 1s linear infinite;
`,gt=n.div`
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
  animation: ${p=>p.show?oe:_e} 0.3s ease-in-out;
  display: ${p=>p.show?"block":"none"};
`,yt=n.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;
`,C=n.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;
`,xt=n.div`
  position: relative;
  display: inline-block;
`,bt=n.div`
  position: absolute;
  top: calc(100% + 0.5vh);
  right: 0;
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 0.6vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 10vw;
  max-height: 30vh;
  overflow-y: auto;
  display: ${p=>p.show?"block":"none"};
  animation: ${p=>p.show?oe:_e} 0.2s ease-in-out;

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
`,wt=n.div`
  padding: 1vh 1.2vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #FFEAC7;
  }

  ${p=>p.selected&&`
    background-color: #FFEAC7;
    font-weight: 500;
  `}
`,vt=n.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`,jt=n.div`
  background-color: white;
  padding: 2vw;
  border-radius: 1.5vw;
  width: 35vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${oe} 0.3s ease-in-out;
`,_t=n.button`
  position: absolute;
  top: 1vw;
  right: 1vw;
  background: #f5f5f5;
  border: none;
  width: 1.8vw;
  height: 1.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: #666;
  font-size: 1.2vw;
  transition: all 0.2s;

  &:hover {
    background-color: #FFEAC7;
    color: #1a1a1a;
    transform: rotate(90deg);
  }
`,Ct=n.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.1vw;
  margin-bottom: 1.5vw;
  color: #1a1a1a;
  font-weight: 400;
  text-align: center;
`,O=n.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  gap: 1vw;
`,S=n.div`
  font-family: "Roboto", sans-serif;
  padding: 0.8vw;
  border-radius: 0.8vw;
  transition: all 0.2s;
  background-color: #fafafa;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3vw;

  &:hover {
    background-color: #FFEAC7;
    transform: translateY(-2px);
  }
`,k=n.span`
  font-weight: 500;
  color: #666;
  font-size: 0.75vw;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=n.span`
  color: #000000;
  font-weight: 400;
  font-size: 0.9vw;
`,St=n.button`
  background-color: #FFEAC7;
  color: #1a1a1a;
  border: none;
  padding: 1vh 1.5vw;
  border-radius: 0.8vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  margin-top: 1.5vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  transition: all 0.2s;

  &:hover {
    background-color: #FFB942;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`,Pt=()=>{const{students:p,getFilteredStudents:V}=Me(),{academicYears:E,selectedAcademicYear:u,setSelectedAcademicYearId:Q}=$e(),[j,X]=d.useState(""),[U,P]=d.useState(!1),[I,Z]=d.useState([]),[ne,W]=d.useState(!1),[q,ae]=d.useState("month");new Date().getFullYear(),new Date().getMonth()+1;const Ce=[{value:"Bus",label:"Bus"},{value:"Practical",label:"Practical"},{value:"Exam",label:"Exam"},{value:"Books",label:"Books"},{value:"Building Fund",label:"Building Fund"},{value:"Record",label:"Record"},{value:"Other",label:"Other"}],Se=[{value:"cash",label:"Cash"},{value:"upi",label:"UPI"},{value:"card",label:"Card"},{value:"cheque",label:"Cheque"}],[a,D]=d.useState({student_id:"",category:"",amount:"",paided_amount:"",payment_mode:"cash",payment_date:new Date().toISOString().split("T")[0],custom_category:"",transaction_number:"",bank_name_id:"",academic_year_id:""}),[J,K]=d.useState(""),[se,ke]=d.useState([]),[Fe,ee]=d.useState(!1),[A,re]=d.useState(null),[g,ie]=d.useState(null),[Re,le]=d.useState(!1),[Ie,de]=d.useState(!1),[ce,me]=d.useState(!1),[i,T]=d.useState({}),[ue,he]=d.useState([]),[B,L]=d.useState(null),[z,M]=d.useState(0),[De,Ae]=d.useState([]),Pe={...{marginTop:"auto",alignSelf:"flex-end",width:"auto",padding:"1.2vh 1vw",backgroundColor:"transparent",border:"1px solid #000000",color:"#000000",borderRadius:"0.6vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer"},backgroundColor:"#FFEAC7"},R=t=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(t).replace("₹","₹"),G=t=>{const s={year:"numeric",month:"short",day:"numeric"};return new Date(t).toLocaleDateString("en-US",s)},$=()=>localStorage.getItem("token"),fe=async()=>{try{W(!0);const t=$();if(!t){console.error("No authentication token found");return}const s=await Y.get("https://spoorthi-dev.genzix.space/masters/miscellaneous/",{headers:{Authorization:`Bearer ${t}`}});Z(s.data)}catch(t){console.error("Error fetching miscellaneous data:",t)}finally{W(!1)}},Be=async()=>{try{const t=$();if(!t)return;const s=await Y.get("https://spoorthi-dev.genzix.space/masters/bank/",{headers:{Authorization:`Bearer ${t}`}});Ae(s.data)}catch(t){console.error("Error fetching bank accounts:",t)}};d.useEffect(()=>{const t=V({searchTerm:J});ke(t)},[J,p,V]),d.useEffect(()=>{if(j){const t=I.filter(s=>s.student.name.toLowerCase().includes(j.toLowerCase())||G(s.payment_date).toLowerCase().includes(j.toLowerCase())||s.category.toLowerCase().includes(j.toLowerCase())||s.student.admission_no.toLowerCase().includes(j.toLowerCase()));he(t)}else he(I)},[j,I]),d.useEffect(()=>{fe(),Be()},[]);const pe=async(t,s)=>{try{const y=$();if(!y)return;const m=I.filter(h=>h.student.id===t&&h.category===s);if(m.length>0){const h=parseFloat(m[0].amount),l=m.reduce((b,f)=>b+parseFloat(f.paided_amount),0),x=h-l;L({totalAmount:h,totalPaidAmount:l,pendingAmount:x,previousPayments:m}),M(x),D(b=>({...b,amount:h.toString(),paided_amount:""}))}else{const h=await Y.post("https://spoorthi-dev.genzix.space/masters/miscellaneous/check-payment/",{student_id:t,category:s},{headers:{Authorization:`Bearer ${y}`,"Content-Type":"application/json"}});if(h.data&&h.data.exists){const l=h.data.payment;L({totalAmount:parseFloat(l.amount),totalPaidAmount:0,pendingAmount:parseFloat(l.amount),previousPayments:[]}),M(parseFloat(l.amount)),D(x=>({...x,amount:l.amount,paided_amount:""}))}else L(null),M(0),D(l=>({...l,amount:"",paided_amount:""}))}}catch(y){console.error("Error checking existing payment:",y),L(null),M(0),D(m=>({...m,amount:"",paided_amount:""}))}},ze=t=>{re(t),D(s=>({...s,student_id:t.id})),K(`${t.name} (${t.admission_no})`),ee(!1),T(s=>({...s,student_id:null})),L(null),M(0),a.category&&pe(t.id,a.category)},_=t=>{const{name:s,value:y}=t.target;D(m=>({...m,[s]:y})),s==="category"&&a.student_id&&pe(a.student_id,y),i[s]&&T(m=>({...m,[s]:null}))},Ne=()=>{const t={};return(!A||!a.student_id)&&(t.student_id="Please select a student"),a.category||(t.category="Please select a category"),a.amount?(isNaN(a.amount)||parseFloat(a.amount)<=0)&&(t.amount="Please enter a valid amount"):t.amount="Please enter an amount",a.paided_amount?isNaN(a.paided_amount)||parseFloat(a.paided_amount)<0?t.paided_amount="Please enter a valid amount":B&&parseFloat(a.paided_amount)>z&&(t.paided_amount=`Paid amount cannot exceed pending amount of ${R(z)}`):t.paided_amount="Please enter paid amount",a.payment_date||(t.payment_date="Please select a payment date"),a.payment_mode||(t.payment_mode="Please select a payment mode"),["upi","card","cheque"].includes(a.payment_mode)&&(a.transaction_number||(t.transaction_number="Please enter transaction number"),a.bank_name_id||(t.bank_name_id="Please select a bank")),T(t),Object.keys(t).length===0},ge=async t=>new Promise(async(s,y)=>{try{const l=await(await qe(e.jsx(Qe,{data:t}))).toBlob(),x=window.URL.createObjectURL(l),b=window.open(x,"_blank");if(b){b.document.title=`Misc_Receipt_${t.studentName}_${t.paymentDate}`;const f=document.createElement("a");f.href=x,f.download=`Misc_Receipt_${t.studentName}_${t.paymentDate}.pdf`,b.document.body.appendChild(f),f.click(),setTimeout(()=>{b.close(),window.URL.revokeObjectURL(x),s()},1e3)}else{const f=document.createElement("a");f.href=x,f.download=`Misc_Receipt_${t.studentName}_${t.paymentDate}.pdf`,document.body.appendChild(f),f.click(),document.body.removeChild(f),setTimeout(()=>{window.URL.revokeObjectURL(x),s()},1e3)}}catch(m){console.error("Error generating receipt:",m),y(m)}}),Ee=async t=>{var s,y,m;if(t.preventDefault(),!!Ne()){me(!0);try{const h=$();if(!h){console.error("No authentication token found");return}const l={...a};if(l.academic_year_id=a.academic_year_id||(u==null?void 0:u.id),l.payment_mode==="cash"&&(delete l.bank_name_id,delete l.transaction_number),(await Y.post("https://spoorthi-dev.genzix.space/masters/miscellaneous/",l,{headers:{Authorization:`Bearer ${h}`,"Content-Type":"application/json"}})).data){const b={studentName:A.name,admissionNo:A.admission_no,className:((s=A.class_name)==null?void 0:s.name)||"N/A",section:((y=A.section)==null?void 0:y.name)||"N/A",fatherName:A.father_name||"N/A",paymentDate:G(a.payment_date),paymentMode:a.payment_mode.charAt(0).toUpperCase()+a.payment_mode.slice(1),category:a.category,amount:a.amount,paided_amount:a.paided_amount,academicYear:((m=E.find(f=>f.id===(a.academic_year_id||(u==null?void 0:u.id))))==null?void 0:m.name)||"2026-2027"};D({student_id:"",category:"",amount:"",paided_amount:"",payment_mode:"cash",payment_date:new Date().toISOString().split("T")[0],custom_category:"",transaction_number:"",bank_name_id:"",academic_year_id:""}),re(null),K(""),T({}),de(!0),setTimeout(()=>{de(!1)},3e3);try{await ge(b)}catch(f){console.error("Error generating PDF:",f),alert("Payment recorded successfully but there was an error generating the receipt. Please try downloading it from the recent payments list.")}fe()}}catch(h){console.error("Error submitting miscellaneous payment:",h);let l="Failed to record payment. Please try again.";h.response&&(l=h.response.data.message||l),alert(l)}finally{me(!1)}}},Te=t=>{ie(t),le(!0)},ye=()=>{le(!1),ie(null)},Le=async t=>{var s,y;try{const m=$(),l=(await Y.get(`https://spoorthi-dev.genzix.space/masters/students/${t.student.id}/`,{headers:{Authorization:`Bearer ${m}`}})).data.data,x={studentName:l.name,admissionNo:l.admission_no,className:((s=l.class_name)==null?void 0:s.name)||"N/A",section:((y=l.section)==null?void 0:y.name)||"N/A",fatherName:l.father_name||"N/A",paymentDate:G(t.payment_date),paymentMode:t.payment_mode.charAt(0).toUpperCase()+t.payment_mode.slice(1),category:t.category,amount:t.amount,paided_amount:t.paided_amount,academicYear:"2025-2026"};await ge(x)}catch(m){console.error("Error generating receipt:",m),alert("Failed to generate receipt. Please try again.")}};return ne?e.jsx("div",{style:{height:" 75vh",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Xe,{children:e.jsx(Ze,{})})}):e.jsxs(Je,{children:[e.jsxs(gt,{show:Ie,children:[e.jsx(yt,{children:"✓"}),"Miscellaneous payment recorded successfully!"]}),e.jsxs(xe,{children:[e.jsxs(Ke,{children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"end",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:[e.jsx(et,{children:"Miscellaneous Collection"}),e.jsxs(tt,{children:["(",(u==null?void 0:u.name)||"",")"]})]}),e.jsx(ot,{children:I.reduce((t,s)=>t+parseFloat(s.paided_amount),0).toLocaleString("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).replace("₹","₹")})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:e.jsxs(xt,{className:"year-dropdown-container",children:[e.jsx("button",{style:Pe,onClick:()=>P(!U),children:(u==null?void 0:u.name)||"Select Year"}),e.jsx(bt,{show:U,children:E.map(t=>e.jsx(wt,{selected:t.id===(u==null?void 0:u.id),onClick:()=>{Q(t.id),P(!1)},children:t.name},t.id))})]})})})]}),e.jsxs(be,{children:[e.jsxs(st,{children:[e.jsx(it,{src:Ye}),e.jsx(rt,{type:"text",placeholder:"Search by date or student name",value:j,onChange:t=>X(t.target.value)})]}),e.jsx(nt,{children:"Recent Payments"}),e.jsx(lt,{children:ue.length>0?[...ue].reverse().map(t=>e.jsxs(dt,{onClick:()=>Te(t),children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:e.jsxs(we,{children:[t.category," - ",t.student.name," (",t.student.admission_no,")"]})}),e.jsx(we,{children:R(t.paided_amount)})]},t.id)):e.jsx("div",{style:{textAlign:"center",padding:"2vh 0",fontFamily:"Roboto, sans-serif",margin:"auto"},children:"No miscellaneous records found"})})]})]}),e.jsx(xe,{children:e.jsxs(be,{children:[e.jsx(at,{style:{marginBottom:"3vh"},children:"Add Miscellaneous Payment"}),e.jsxs(ct,{children:[e.jsxs(w,{children:[e.jsx(v,{children:"Academic Year*"}),e.jsxs(H,{name:"academic_year_id",value:a.academic_year_id||(u==null?void 0:u.id)||"",onChange:_,style:{borderColor:i.academic_year_id?"#ff4444":"#ccc"},required:!0,children:[e.jsx("option",{value:"",children:"Select Academic Year"}),E.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),i.academic_year_id&&e.jsx(C,{children:i.academic_year_id})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Student*"}),e.jsxs(mt,{children:[e.jsx(N,{type:"text",style:{width:"100%",borderColor:i.student_id?"#ff4444":"#ccc"},placeholder:"Search by student name or admission no",value:J,onChange:t=>{K(t.target.value),ee(!0),A&&T(s=>({...s,student_id:null}))},onFocus:()=>ee(!0)}),i.student_id&&e.jsx(C,{children:i.student_id}),Fe&&se.length>0&&e.jsx(ut,{children:se.map(t=>{var s;return e.jsxs(ht,{onClick:()=>ze(t),children:[t.name," (",t.admission_no,") - ",((s=t.class_name)==null?void 0:s.name)||"N/A"]},t.id)})})]})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Category*"}),e.jsxs(H,{name:"category",value:a.category,onChange:_,style:{borderColor:i.category?"#ff4444":"#ccc"},children:[e.jsx("option",{value:"",children:"Select Category"}),Ce.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))]}),i.category&&e.jsx(C,{children:i.category})]}),a.category==="Other"&&e.jsxs(w,{children:[e.jsx(v,{children:"Custom Category"}),e.jsx(N,{type:"text",name:"custom_category",value:a.custom_category,onChange:_,placeholder:"Enter custom category"})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Amount*"}),e.jsx(N,{type:"number",name:"amount",value:a.amount,onChange:_,placeholder:"Enter amount",style:{borderColor:i.amount?"#ff4444":"#ccc"},disabled:B!==null}),B&&e.jsxs("div",{style:{fontSize:"0.7vw",color:"#666",marginTop:"0.3vh",fontFamily:"Roboto, sans-serif"},children:["Total Amount: ",R(B.totalAmount),B.totalPaidAmount>0&&e.jsxs("span",{style:{marginLeft:"1vw"},children:["(Paid: ",R(B.totalPaidAmount),")"]})]}),i.amount&&e.jsx(C,{children:i.amount})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Paid Amount*"}),e.jsx(N,{type:"number",name:"paided_amount",value:a.paided_amount,onChange:_,placeholder:z>0?`Enter amount (max: ${R(z)})`:"Enter paid amount",style:{borderColor:i.paided_amount?"#ff4444":"#ccc"}}),z>0&&e.jsxs("div",{style:{fontSize:"0.7vw",color:"#666",marginTop:"0.3vh",fontFamily:"Roboto, sans-serif"},children:["Pending Amount: ",R(z)]}),i.paided_amount&&e.jsx(C,{children:i.paided_amount})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Payment Date*"}),e.jsx(N,{type:"date",name:"payment_date",value:a.payment_date,onChange:_,style:{borderColor:i.payment_date?"#ff4444":"#ccc"}}),i.payment_date&&e.jsx(C,{children:i.payment_date})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Payment Mode*"}),e.jsx(H,{name:"payment_mode",value:a.payment_mode,onChange:_,style:{borderColor:i.payment_mode?"#ff4444":"#ccc"},children:Se.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))}),i.payment_mode&&e.jsx(C,{children:i.payment_mode})]}),a.payment_mode!=="cash"&&e.jsxs(e.Fragment,{children:[e.jsxs(w,{children:[e.jsx(v,{children:"Transaction Number*"}),e.jsx(N,{type:"text",name:"transaction_number",value:a.transaction_number,onChange:_,placeholder:"Enter transaction number",style:{borderColor:i.transaction_number?"#ff4444":"#ccc"}}),i.transaction_number&&e.jsx(C,{children:i.transaction_number})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Bank*"}),e.jsxs(H,{name:"bank_name_id",value:a.bank_name_id,onChange:_,style:{borderColor:i.bank_name_id?"#ff4444":"#ccc"},children:[e.jsx("option",{value:"",children:"Select Bank"}),De.map(t=>e.jsxs("option",{value:t.id,children:[t.name," (",t.code,")"]},t.id))]}),i.bank_name_id&&e.jsx(C,{children:i.bank_name_id})]})]}),e.jsx(ft,{type:"submit",onClick:Ee,disabled:ce,children:ce?e.jsxs(e.Fragment,{children:[e.jsx(pt,{}),"Recording Payment..."]}):"Record Payment"})]})]})}),Re&&g&&e.jsx(vt,{onClick:ye,children:e.jsxs(jt,{onClick:t=>t.stopPropagation(),children:[e.jsx(_t,{onClick:ye,children:"×"}),e.jsx(Ct,{children:"Miscellaneous Payment Details"}),e.jsxs(O,{children:[e.jsxs(S,{children:[e.jsx(k,{children:"Student Name"}),e.jsx(F,{children:g.student.name})]}),e.jsxs(S,{children:[e.jsx(k,{children:"Amount"}),e.jsx(F,{children:R(g.amount)})]})]}),e.jsxs(O,{children:[e.jsxs(S,{children:[e.jsx(k,{children:"Category"}),e.jsx(F,{children:g.category})]}),e.jsxs(S,{children:[e.jsx(k,{children:"Paid Amount"}),e.jsx(F,{children:R(g.paided_amount)})]})]}),e.jsxs(O,{children:[e.jsxs(S,{children:[e.jsx(k,{children:"Payment Date"}),e.jsx(F,{children:G(g.payment_date)})]}),e.jsxs(S,{children:[e.jsx(k,{children:"Payment Mode"}),e.jsx(F,{children:g.payment_mode.charAt(0).toUpperCase()+g.payment_mode.slice(1)})]})]}),g.payment_mode!=="cash"&&e.jsxs(O,{children:[e.jsxs(S,{children:[e.jsx(k,{children:"Transaction Number"}),e.jsx(F,{children:g.transaction_number})]}),g.bank_name&&e.jsxs(S,{children:[e.jsx(k,{children:"Bank"}),e.jsx(F,{children:g.bank_name.name})]})]}),g.custom_category&&e.jsx(O,{children:e.jsxs(S,{children:[e.jsx(k,{children:"Custom Category"}),e.jsx(F,{children:g.custom_category})]})}),e.jsx(St,{onClick:()=>Le(g),children:"Download Receipt"})]})})]})};export{Pt as default};
