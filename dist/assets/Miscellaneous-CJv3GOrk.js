import{j as e,n as ze,b as m,i as $,k as a,m as oe}from"./index-fkiekIN7.js";import{s as Ee}from"./Search-BVAmrx5H.js";import{D as Te,P as Me,S as Le,V as c,I as $e,T as r,F as we,p as Ye}from"./react-pdf.browser-BTJNQOfy.js";import{l as Oe}from"./logo1-DDmja1Ha.js";import"./constants-DPngPhlz.js";we.register({family:"Roboto",src:"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"});we.register({family:"Noto Sans",src:"https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNjXhFVZNyB.woff2"});const o=Le.create({page:{flexDirection:"column",backgroundColor:"#ffffff",padding:15},firstPage:{marginTop:20},header:{flexDirection:"row",justifyContent:"center",alignItems:"center",marginBottom:10,position:"relative",width:"100%"},logo:{width:35,height:35,position:"absolute",left:0},schoolInfo:{flexDirection:"column",alignItems:"center"},schoolName:{fontSize:18,fontFamily:"Roboto",fontWeight:"bold",marginBottom:2,color:"#1a1a1a",textAlign:"center"},schoolAddress:{fontSize:8,fontFamily:"Roboto",marginBottom:2,color:"#666666",textAlign:"center"},title:{fontSize:12,fontFamily:"Roboto",textAlign:"center",marginBottom:6,color:"#1a1a1a",fontWeight:"normal",textTransform:"uppercase"},academicYear:{fontSize:9,fontFamily:"Roboto",textAlign:"center",marginBottom:10,color:"#666666"},studentInfo:{borderWidth:1,borderColor:"#000000",borderStyle:"solid",padding:6,marginBottom:10,borderRadius:4,backgroundColor:"transparent"},studentInfoRow:{flexDirection:"row",marginBottom:3,justifyContent:"space-between"},studentInfoItem:{width:"48%"},studentInfoLabel:{fontSize:8,fontFamily:"Roboto",color:"#666666"},studentInfoValue:{fontSize:8,fontFamily:"Roboto",color:"#1a1a1a",fontWeight:"bold"},table:{marginBottom:10},tableHeader:{flexDirection:"row",borderBottomWidth:1,borderBottomColor:"#000000",borderBottomStyle:"solid",paddingBottom:3,marginBottom:3,backgroundColor:"#f5f5f5"},tableRow:{flexDirection:"row",marginBottom:3},tableCell:{fontSize:8,fontFamily:"Roboto",padding:3},col1:{width:"10%"},col2:{width:"40%"},col3:{width:"15%"},col4:{width:"15%"},col5:{width:"10%"},col6:{width:"10%"},totalRow:{flexDirection:"row",justifyContent:"flex-end",marginTop:6,borderTopWidth:1,borderTopColor:"#000000",borderTopStyle:"solid",paddingTop:3},totalLabel:{fontSize:9,fontFamily:"Roboto",fontWeight:"bold",marginRight:6,color:"#1a1a1a"},totalValue:{fontSize:9,fontFamily:"Roboto",fontWeight:"bold",color:"#1a1a1a"},signatures:{flexDirection:"row",justifyContent:"space-between",marginTop:34},signature:{alignItems:"center"},signatureLine:{width:100,borderBottomWidth:1,borderBottomColor:"#000000",borderBottomStyle:"solid",marginBottom:3},signatureText:{fontSize:8,fontFamily:"Roboto",color:"#666666"},divider:{borderBottomWidth:1,borderBottomColor:"#cccccc",borderBottomStyle:"dashed",marginVertical:30},amountContainer:{flexDirection:"row",alignItems:"center"}}),Ve=({data:x,isFirstPage:O})=>{const{studentName:b,admissionNo:H,className:R,section:q,fatherName:J,paymentDate:V,paided_amount:I,paymentMode:U,category:W,amount:Q,academicYear:X="2025-2026"}=x,z=s=>s.replace(/[^0-9.]/g,"");return e.jsxs(c,{style:[o.page,O&&o.firstPage],children:[e.jsxs(c,{style:o.header,children:[e.jsx($e,{style:o.logo,src:Oe}),e.jsxs(c,{style:o.schoolInfo,children:[e.jsx(r,{style:o.schoolName,children:"Spoorthi Educational Institute"}),e.jsx(r,{style:o.schoolAddress,children:"123 School Street, City, State"})]})]}),e.jsx(r,{style:o.title,children:"Miscellaneous Payment Receipt"}),e.jsxs(r,{style:o.academicYear,children:["Academic Year: ",X]}),e.jsxs(c,{style:o.studentInfo,children:[e.jsxs(c,{style:o.studentInfoRow,children:[e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Student Name:"}),e.jsx(r,{style:o.studentInfoValue,children:b})]}),e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Admission No:"}),e.jsx(r,{style:o.studentInfoValue,children:H})]})]}),e.jsxs(c,{style:o.studentInfoRow,children:[e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Class & Section:"}),e.jsxs(r,{style:o.studentInfoValue,children:[R," - ",q]})]}),e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Father's Name:"}),e.jsx(r,{style:o.studentInfoValue,children:J})]})]}),e.jsxs(c,{style:o.studentInfoRow,children:[e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Payment Date:"}),e.jsx(r,{style:o.studentInfoValue,children:V})]}),e.jsxs(c,{style:o.studentInfoItem,children:[e.jsx(r,{style:o.studentInfoLabel,children:"Payment Mode:"}),e.jsx(r,{style:o.studentInfoValue,children:U})]})]})]}),e.jsxs(c,{style:o.table,children:[e.jsxs(c,{style:o.tableHeader,children:[e.jsx(r,{style:[o.tableCell,o.col1],children:"S.No"}),e.jsx(r,{style:[o.tableCell,o.col2],children:"Category"}),e.jsx(r,{style:[o.tableCell,o.col3],children:"Amount"}),e.jsx(r,{style:[o.tableCell,o.col4],children:"CGST"}),e.jsx(r,{style:[o.tableCell,o.col5],children:"SGST"}),e.jsx(r,{style:[o.tableCell,o.col6],children:"Total"})]}),e.jsxs(c,{style:o.tableRow,children:[e.jsx(r,{style:[o.tableCell,o.col1],children:"1"}),e.jsx(r,{style:[o.tableCell,o.col2],children:W}),e.jsx(r,{style:[o.tableCell,o.col3],children:z(I)}),e.jsx(r,{style:[o.tableCell,o.col4],children:"0"}),e.jsx(r,{style:[o.tableCell,o.col5],children:"0"}),e.jsx(r,{style:[o.tableCell,o.col6],children:z(I)})]})]}),e.jsxs(c,{style:o.totalRow,children:[e.jsx(r,{style:o.totalLabel,children:"Total Amount:"}),e.jsx(r,{style:o.totalValue,children:z(I)})]}),e.jsxs(c,{style:o.signatures,children:[e.jsxs(c,{style:o.signature,children:[e.jsx(c,{style:o.signatureLine}),e.jsx(r,{style:o.signatureText,children:"Signature Of the Principal"})]}),e.jsxs(c,{style:o.signature,children:[e.jsx(c,{style:o.signatureLine}),e.jsx(r,{style:o.signatureText,children:"Signature Of the Accountant"})]})]})]})},Ue=({data:x})=>e.jsx(Te,{children:e.jsx(Me,{size:"A4",style:o.page,children:e.jsx(Ve,{data:x,isFirstPage:!0})})}),ve=oe`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,je=oe`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,We=oe`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,Ge=a.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,He=a.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${ve} 1s ease-in-out infinite;
`,qe=a.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
`,ye=a.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
`,Je=a.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,xe=a.div`
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
`,Qe=a.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  letter-spacing: 0px;
  margin-right: auto;
  font-weight: 700;
  color: #000000;
  display: flex;
  align-items: center;
`,Xe=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,Ze=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  margin-top: 2vh;
  font-weight: 500;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,Ke=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  margin-top: 2vh;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,et=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.2vw;
  margin-top: 2vh;
  font-weight: 500;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;
`,tt=a.div`
  position: relative;
  width: 100%;
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,ot=a.input`
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
`,nt=a.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none;
`,at=a.div`
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
`,st=a.div`
  display: flex;
  justify-content: space-between;
  padding: 1.1vh 1vw;
  background: #EFEFEF;
  border-radius: 0.6vw;
  margin-bottom: 1.4vh;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
`,be=a.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`,rt=a.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
`,w=a.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`,v=a.label`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #626060;
`,N=a.input`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`,te=a.select`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
`,it=a.div`
  position: relative;
  width: 100%;
`,lt=a.div`
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
`,ct=a.div`
  padding: 1vh 1vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;

  &:hover {
    background-color: #f1f1f1;
  }
`,dt=a.button`
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
`,mt=a.div`
  width: 1vw;
  height: 1vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${ve} 1s linear infinite;
`,ut=a.div`
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
  animation: ${x=>x.show?je:We} 0.3s ease-in-out;
  display: ${x=>x.show?"block":"none"};
`,ht=a.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;
`,k=a.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;
`,ft=a.div`
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
`,pt=a.div`
  background-color: white;
  padding: 2vw;
  border-radius: 1.5vw;
  width: 35vw;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${je} 0.3s ease-in-out;
`,gt=a.button`
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
`,yt=a.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.1vw;
  margin-bottom: 1.5vw;
  color: #1a1a1a;
  font-weight: 400;
  text-align: center;
`,Y=a.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vw;
  gap: 1vw;
`,j=a.div`
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
`,_=a.span`
  font-weight: 500;
  color: #666;
  font-size: 0.75vw;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,C=a.span`
  color: #000000;
  font-weight: 400;
  font-size: 0.9vw;
`,xt=a.button`
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
`,Ct=()=>{const{students:x,getFilteredStudents:O}=ze(),[b,H]=m.useState(""),[R,q]=m.useState([]),[J,V]=m.useState(!1),[I,U]=m.useState("month"),W=new Date().getFullYear(),Q=new Date().getMonth()+1,X=[{value:"Bus",label:"Bus"},{value:"Practical",label:"Practical"},{value:"Exam",label:"Exam"},{value:"Books",label:"Books"},{value:"Building Fund",label:"Building Fund"},{value:"Record",label:"Record"},{value:"Other",label:"Other"}],z=[{value:"cash",label:"Cash"},{value:"upi",label:"UPI"},{value:"card",label:"Card"},{value:"cheque",label:"Cheque"}],[s,A]=m.useState({student_id:"",category:"",amount:"",paided_amount:"",payment_mode:"cash",payment_date:new Date().toISOString().split("T")[0],custom_category:"",transaction_number:"",bank_name_id:""}),[Z,K]=m.useState(""),[ne,_e]=m.useState([]),[Ce,ee]=m.useState(!1),[D,ae]=m.useState(null),[h,se]=m.useState(null),[Se,re]=m.useState(!1),[Fe,ie]=m.useState(!1),[le,ce]=m.useState(!1),[i,E]=m.useState({}),[de,me]=m.useState([]),[P,T]=m.useState(null),[B,M]=m.useState(0),[ke,Re]=m.useState([]),S=t=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(t).replace("₹","₹"),G=t=>{const n={year:"numeric",month:"short",day:"numeric"};return new Date(t).toLocaleDateString("en-US",n)},ue=t=>["January","February","March","April","May","June","July","August","September","October","November","December"][t-1],L=()=>localStorage.getItem("token"),he=async()=>{try{V(!0);const t=L();if(!t){console.error("No authentication token found");return}const n=await $.get("https://spoorthischool.genzix.space/masters/miscellaneous/",{headers:{Authorization:`Bearer ${t}`}});q(n.data)}catch(t){console.error("Error fetching miscellaneous data:",t)}finally{V(!1)}},Ie=async()=>{try{const t=L();if(!t)return;const n=await $.get("https://spoorthischool.genzix.space/masters/bank/",{headers:{Authorization:`Bearer ${t}`}});Re(n.data)}catch(t){console.error("Error fetching bank accounts:",t)}};m.useEffect(()=>{const t=O({searchTerm:Z});_e(t)},[Z,x,O]),m.useEffect(()=>{if(b){const t=R.filter(n=>n.student.name.toLowerCase().includes(b.toLowerCase())||G(n.payment_date).toLowerCase().includes(b.toLowerCase())||n.category.toLowerCase().includes(b.toLowerCase())||n.student.admission_no.toLowerCase().includes(b.toLowerCase()));me(t)}else me(R)},[b,R]),m.useEffect(()=>{he(),Ie()},[]);const fe=async(t,n)=>{try{const f=L();if(!f)return;const l=R.filter(d=>d.student.id===t&&d.category===n);if(l.length>0){const d=parseFloat(l[0].amount),u=l.reduce((y,g)=>y+parseFloat(g.paided_amount),0),p=d-u;T({totalAmount:d,totalPaidAmount:u,pendingAmount:p,previousPayments:l}),M(p),A(y=>({...y,amount:d.toString(),paided_amount:""}))}else{const d=await $.post("https://spoorthischool.genzix.space/masters/miscellaneous/check-payment/",{student_id:t,category:n},{headers:{Authorization:`Bearer ${f}`,"Content-Type":"application/json"}});if(d.data&&d.data.exists){const u=d.data.payment;T({totalAmount:parseFloat(u.amount),totalPaidAmount:0,pendingAmount:parseFloat(u.amount),previousPayments:[]}),M(parseFloat(u.amount)),A(p=>({...p,amount:u.amount,paided_amount:""}))}else T(null),M(0),A(u=>({...u,amount:"",paided_amount:""}))}}catch(f){console.error("Error checking existing payment:",f),T(null),M(0),A(l=>({...l,amount:"",paided_amount:""}))}},Ae=t=>{ae(t),A(n=>({...n,student_id:t.id})),K(`${t.name} (${t.admission_no})`),ee(!1),E(n=>({...n,student_id:null})),T(null),M(0),s.category&&fe(t.id,s.category)},F=t=>{const{name:n,value:f}=t.target;A(l=>({...l,[n]:f})),n==="category"&&s.student_id&&fe(s.student_id,f),i[n]&&E(l=>({...l,[n]:null}))},De=()=>{const t={};return(!D||!s.student_id)&&(t.student_id="Please select a student"),s.category||(t.category="Please select a category"),s.amount?(isNaN(s.amount)||parseFloat(s.amount)<=0)&&(t.amount="Please enter a valid amount"):t.amount="Please enter an amount",s.paided_amount?isNaN(s.paided_amount)||parseFloat(s.paided_amount)<0?t.paided_amount="Please enter a valid amount":P&&parseFloat(s.paided_amount)>B&&(t.paided_amount=`Paid amount cannot exceed pending amount of ${S(B)}`):t.paided_amount="Please enter paid amount",s.payment_date||(t.payment_date="Please select a payment date"),s.payment_mode||(t.payment_mode="Please select a payment mode"),["upi","card","cheque"].includes(s.payment_mode)&&(s.transaction_number||(t.transaction_number="Please enter transaction number"),s.bank_name_id||(t.bank_name_id="Please select a bank")),E(t),Object.keys(t).length===0},pe=async t=>new Promise(async(n,f)=>{try{const u=await(await Ye(e.jsx(Ue,{data:t}))).toBlob(),p=window.URL.createObjectURL(u),y=window.open(p,"_blank");if(y){y.document.title=`Misc_Receipt_${t.studentName}_${t.paymentDate}`;const g=document.createElement("a");g.href=p,g.download=`Misc_Receipt_${t.studentName}_${t.paymentDate}.pdf`,y.document.body.appendChild(g),g.click(),setTimeout(()=>{y.close(),window.URL.revokeObjectURL(p),n()},1e3)}else{const g=document.createElement("a");g.href=p,g.download=`Misc_Receipt_${t.studentName}_${t.paymentDate}.pdf`,document.body.appendChild(g),g.click(),document.body.removeChild(g),setTimeout(()=>{window.URL.revokeObjectURL(p),n()},1e3)}}catch(l){console.error("Error generating receipt:",l),f(l)}}),Pe=async t=>{var n,f;if(t.preventDefault(),!!De()){ce(!0);try{const l=L();if(!l){console.error("No authentication token found");return}const d={...s};if(d.payment_mode==="cash"&&(delete d.bank_name_id,delete d.transaction_number),(await $.post("https://spoorthischool.genzix.space/masters/miscellaneous/",d,{headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"}})).data){const p={studentName:D.name,admissionNo:D.admission_no,className:((n=D.class_name)==null?void 0:n.name)||"N/A",section:((f=D.section)==null?void 0:f.name)||"N/A",fatherName:D.father_name||"N/A",paymentDate:G(s.payment_date),paymentMode:s.payment_mode.charAt(0).toUpperCase()+s.payment_mode.slice(1),category:s.category,amount:s.amount,paided_amount:s.paided_amount,academicYear:"2025-2026"};A({student_id:"",category:"",amount:"",paided_amount:"",payment_mode:"cash",payment_date:new Date().toISOString().split("T")[0],custom_category:"",transaction_number:"",bank_name_id:""}),ae(null),K(""),E({}),ie(!0),setTimeout(()=>{ie(!1)},3e3);try{await pe(p)}catch(y){console.error("Error generating PDF:",y),alert("Payment recorded successfully but there was an error generating the receipt. Please try downloading it from the recent payments list.")}he()}}catch(l){console.error("Error submitting miscellaneous payment:",l);let d="Failed to record payment. Please try again.";l.response&&(d=l.response.data.message||d),alert(d)}finally{ce(!1)}}},Be=t=>{se(t),re(!0)},ge=()=>{re(!1),se(null)},Ne=async t=>{var n,f;try{const l=L(),u=(await $.get(`https://spoorthischool.genzix.space/masters/students/${t.student.id}/`,{headers:{Authorization:`Bearer ${l}`}})).data.data,p={studentName:u.name,admissionNo:u.admission_no,className:((n=u.class_name)==null?void 0:n.name)||"N/A",section:((f=u.section)==null?void 0:f.name)||"N/A",fatherName:u.father_name||"N/A",paymentDate:G(t.payment_date),paymentMode:t.payment_mode.charAt(0).toUpperCase()+t.payment_mode.slice(1),category:t.category,amount:t.amount,paided_amount:t.paided_amount,academicYear:"2025-2026"};await pe(p)}catch(l){console.error("Error generating receipt:",l),alert("Failed to generate receipt. Please try again.")}};return J?e.jsx("div",{style:{height:" 75vh",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Ge,{children:e.jsx(He,{})})}):e.jsxs(qe,{children:[e.jsxs(ut,{show:Fe,children:[e.jsx(ht,{children:"✓"}),"Miscellaneous payment recorded successfully!"]}),e.jsxs(ye,{children:[e.jsxs(Je,{children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"end",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:[e.jsx(Qe,{children:"Miscellaneous Collection"}),e.jsxs(Xe,{children:["(",I==="month"?ue(Q):W,")"]})]}),e.jsx(Ze,{children:R.reduce((t,n)=>t+parseFloat(n.paided_amount),0).toLocaleString("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).replace("₹","₹")})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:[e.jsx("button",{style:{padding:"0.7vh 1vw",backgroundColor:I==="year"?"#FFB942":"#EFEFEF",border:"none",borderRadius:"0.4vw",fontFamily:"Roboto, sans-serif",fontSize:"0.65vw",cursor:"pointer",letterSpacing:"0.7px"},onClick:()=>U("year"),children:W}),e.jsx("button",{style:{padding:"0.7vh 1vw",backgroundColor:I==="month"?"#FFB942":"#EFEFEF",border:"none",borderRadius:"0.4vw",fontFamily:"Roboto, sans-serif",fontSize:"0.65vw",cursor:"pointer",letterSpacing:"0.7px"},onClick:()=>U("month"),children:ue(Q)})]})})]}),e.jsxs(xe,{children:[e.jsxs(tt,{children:[e.jsx(nt,{src:Ee}),e.jsx(ot,{type:"text",placeholder:"Search by date or student name",value:b,onChange:t=>H(t.target.value)})]}),e.jsx(Ke,{children:"Recent Payments"}),e.jsx(at,{children:de.length>0?[...de].reverse().map(t=>e.jsxs(st,{onClick:()=>Be(t),children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:e.jsxs(be,{children:[t.category," - ",t.student.name," (",t.student.admission_no,")"]})}),e.jsx(be,{children:S(t.paided_amount)})]},t.id)):e.jsx("div",{style:{textAlign:"center",padding:"2vh 0",fontFamily:"Roboto, sans-serif",margin:"auto"},children:"No miscellaneous records found"})})]})]}),e.jsx(ye,{children:e.jsxs(xe,{children:[e.jsx(et,{style:{marginBottom:"3vh"},children:"Add Miscellaneous Payment"}),e.jsxs(rt,{children:[e.jsxs(w,{children:[e.jsx(v,{children:"Student*"}),e.jsxs(it,{children:[e.jsx(N,{type:"text",style:{width:"100%",borderColor:i.student_id?"#ff4444":"#ccc"},placeholder:"Search by student name or admission no",value:Z,onChange:t=>{K(t.target.value),ee(!0),D&&E(n=>({...n,student_id:null}))},onFocus:()=>ee(!0)}),i.student_id&&e.jsx(k,{children:i.student_id}),Ce&&ne.length>0&&e.jsx(lt,{children:ne.map(t=>{var n;return e.jsxs(ct,{onClick:()=>Ae(t),children:[t.name," (",t.admission_no,") - ",((n=t.class_name)==null?void 0:n.name)||"N/A"]},t.id)})})]})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Category*"}),e.jsxs(te,{name:"category",value:s.category,onChange:F,style:{borderColor:i.category?"#ff4444":"#ccc"},children:[e.jsx("option",{value:"",children:"Select Category"}),X.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))]}),i.category&&e.jsx(k,{children:i.category})]}),s.category==="Other"&&e.jsxs(w,{children:[e.jsx(v,{children:"Custom Category"}),e.jsx(N,{type:"text",name:"custom_category",value:s.custom_category,onChange:F,placeholder:"Enter custom category"})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Amount*"}),e.jsx(N,{type:"number",name:"amount",value:s.amount,onChange:F,placeholder:"Enter amount",style:{borderColor:i.amount?"#ff4444":"#ccc"},disabled:P!==null}),P&&e.jsxs("div",{style:{fontSize:"0.7vw",color:"#666",marginTop:"0.3vh",fontFamily:"Roboto, sans-serif"},children:["Total Amount: ",S(P.totalAmount),P.totalPaidAmount>0&&e.jsxs("span",{style:{marginLeft:"1vw"},children:["(Paid: ",S(P.totalPaidAmount),")"]})]}),i.amount&&e.jsx(k,{children:i.amount})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Paid Amount*"}),e.jsx(N,{type:"number",name:"paided_amount",value:s.paided_amount,onChange:F,placeholder:B>0?`Enter amount (max: ${S(B)})`:"Enter paid amount",style:{borderColor:i.paided_amount?"#ff4444":"#ccc"}}),B>0&&e.jsxs("div",{style:{fontSize:"0.7vw",color:"#666",marginTop:"0.3vh",fontFamily:"Roboto, sans-serif"},children:["Pending Amount: ",S(B)]}),i.paided_amount&&e.jsx(k,{children:i.paided_amount})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Payment Date*"}),e.jsx(N,{type:"date",name:"payment_date",value:s.payment_date,onChange:F,style:{borderColor:i.payment_date?"#ff4444":"#ccc"}}),i.payment_date&&e.jsx(k,{children:i.payment_date})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Payment Mode*"}),e.jsx(te,{name:"payment_mode",value:s.payment_mode,onChange:F,style:{borderColor:i.payment_mode?"#ff4444":"#ccc"},children:z.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))}),i.payment_mode&&e.jsx(k,{children:i.payment_mode})]}),s.payment_mode!=="cash"&&e.jsxs(e.Fragment,{children:[e.jsxs(w,{children:[e.jsx(v,{children:"Transaction Number*"}),e.jsx(N,{type:"text",name:"transaction_number",value:s.transaction_number,onChange:F,placeholder:"Enter transaction number",style:{borderColor:i.transaction_number?"#ff4444":"#ccc"}}),i.transaction_number&&e.jsx(k,{children:i.transaction_number})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Bank*"}),e.jsxs(te,{name:"bank_name_id",value:s.bank_name_id,onChange:F,style:{borderColor:i.bank_name_id?"#ff4444":"#ccc"},children:[e.jsx("option",{value:"",children:"Select Bank"}),ke.map(t=>e.jsxs("option",{value:t.id,children:[t.name," (",t.code,")"]},t.id))]}),i.bank_name_id&&e.jsx(k,{children:i.bank_name_id})]})]}),e.jsx(dt,{type:"submit",onClick:Pe,disabled:le,children:le?e.jsxs(e.Fragment,{children:[e.jsx(mt,{}),"Recording Payment..."]}):"Record Payment"})]})]})}),Se&&h&&e.jsx(ft,{onClick:ge,children:e.jsxs(pt,{onClick:t=>t.stopPropagation(),children:[e.jsx(gt,{onClick:ge,children:"×"}),e.jsx(yt,{children:"Miscellaneous Payment Details"}),e.jsxs(Y,{children:[e.jsxs(j,{children:[e.jsx(_,{children:"Student Name"}),e.jsx(C,{children:h.student.name})]}),e.jsxs(j,{children:[e.jsx(_,{children:"Amount"}),e.jsx(C,{children:S(h.amount)})]})]}),e.jsxs(Y,{children:[e.jsxs(j,{children:[e.jsx(_,{children:"Category"}),e.jsx(C,{children:h.category})]}),e.jsxs(j,{children:[e.jsx(_,{children:"Paid Amount"}),e.jsx(C,{children:S(h.paided_amount)})]})]}),e.jsxs(Y,{children:[e.jsxs(j,{children:[e.jsx(_,{children:"Payment Date"}),e.jsx(C,{children:G(h.payment_date)})]}),e.jsxs(j,{children:[e.jsx(_,{children:"Payment Mode"}),e.jsx(C,{children:h.payment_mode.charAt(0).toUpperCase()+h.payment_mode.slice(1)})]})]}),h.payment_mode!=="cash"&&e.jsxs(Y,{children:[e.jsxs(j,{children:[e.jsx(_,{children:"Transaction Number"}),e.jsx(C,{children:h.transaction_number})]}),h.bank_name&&e.jsxs(j,{children:[e.jsx(_,{children:"Bank"}),e.jsx(C,{children:h.bank_name.name})]})]}),h.custom_category&&e.jsx(Y,{children:e.jsxs(j,{children:[e.jsx(_,{children:"Custom Category"}),e.jsx(C,{children:h.custom_category})]})}),e.jsx(xt,{onClick:()=>Ne(h),children:"Download Receipt"})]})})]})};export{Ct as default};
