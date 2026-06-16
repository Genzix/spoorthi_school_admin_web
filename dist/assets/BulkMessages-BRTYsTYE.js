import{b as r,k as o,j as e,i as y,m as ie}from"./index-fkiekIN7.js";import{j as ze,k as Ft,F as Me,l as Pe,m as kt,n as At,a as Ct,f as Tt,d as oe}from"./index-j6Pclaoc.js";const qe=ie`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,Et=ie`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,Dt=ie`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,_t=o.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,Bt=o.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${qe} 1s ease-in-out infinite;
`,zt=o.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
`,Mt=o.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
`,Ie=o.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Pt=o.div`
  height: 85vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 39vw;
  margin-top: 4vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  box-sizing: border-box;
`;o.div`
  height: 70vh;
  background: #ffffff;
  padding: 2vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;const $=o.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 0.85vw;
  font-weight: 700;
  color: grey;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`,Re=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.8vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;o.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  margin-top: 2vh;
  font-weight: 700;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
`;o.input`
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
`;o.div`
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
`;o.div`
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
`;o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #000000;
  letter-spacing: 0.7px;
`;const Le=o.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
`,A=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`,C=o.label`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #626060;
`,$e=o.input`
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
`,Ne=o.textarea`
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
`,Ue=o.button`
  padding: 1.5vh 1vw;
  background-color: ${i=>i.disabled?"#cccccc":"#BEFFB6"};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${i=>i.disabled?"not-allowed":"pointer"};
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
    background-color: ${i=>i.disabled?"#cccccc":"#92FF84"};
    transform: ${i=>i.disabled?"none":"translateY(-1px)"};
  }
`,P=o.div`
  width: 1.2vw;
  height: 1.2vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${qe} 1s ease-in-out infinite;
`;o.button`
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
`;const It=o.div`
  background: #f8f9fa;
  padding: 1.5vh 1vw;
  border-radius: 0.6vw;
  margin-bottom: 1vh;
  border: 1px solid #e9ecef;
`,Oe=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  font-weight: 600;
  color: #000000;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`,Rt=o.div`
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
  animation: ${i=>i.show?Et:Dt} 0.3s ease-in-out;
  display: ${i=>i.show?"block":"none"};
`,Lt=o.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;
`,m=o.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;
`,se=o.div`
  text-align: center;
  padding: 2vh 0;
  font-family: 'Roboto, sans-serif';
  font-size: 0.8vw;
  color: #666;
  margin: auto;
`,$t=o.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,Nt=o.div`
  border: 2px dashed ${i=>i.isDragOver?"#FFB942":"#ccc"};
  border-radius: 0.8vw;
  padding: 2vh 1vw;
  text-align: center;
  background: ${i=>i.isDragOver?"#FFEAC7":"#f8f9fa"};
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
`,Ut=o.div`
  font-size: 2vw;
  color: #666;
  margin-bottom: 0.5vh;
`,Ot=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;
  margin-bottom: 0.5vh;
`;o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.6vw;
  color: #999;
`;const Ht=o.input`
  display: none;
`,Yt=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  margin-top: 1vh;
  border: 1px solid #e9ecef;
`,qt=o.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`,Jt=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000;
  font-weight: 500;
`,Gt=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.6vw;
  color: #666;
`,Wt=o.button`
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
`,Kt=o.button`
  padding: 1vh 1.5vw;
  background-color: ${i=>i.disabled?"#cccccc":"#BEFFB6"};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${i=>i.disabled?"not-allowed":"pointer"};
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
    background-color: ${i=>i.disabled?"#cccccc":"#92FF84"};
    transform: ${i=>i.disabled?"none":"translateY(-1px)"};
  }
`,Xt=o.div`
  width: 100%;
  height: 0.3vh;
  background: #e9ecef;
  border-radius: 0.15vh;
  overflow: hidden;
  margin-top: 1vh;
`,Zt=o.div`
  height: 100%;
  background: #FFB942;
  width: ${i=>i.progress}%;
  transition: width 0.3s ease;
`,He=o.select`
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  border: 1px solid #ccc;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  transition: all 0.3s;
  background: #ffffff;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`,ae=o.button`
  padding: 1.2vh 1vw;
  background: #f4f4f4;
  border: 1px solid #d8d8d8;
  border-radius: 0.6vw;
  color: #2d2d2d;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4vw;
  transition: all 0.2s;

  &:hover {
    background: #e9e9e9;
  }
`,Qt=o.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 2vh 2vw;
`,Vt=o.div`
  width: min(92vw, 1100px);
  max-height: 90vh;
  background: #ffffff;
  border-radius: 1.2vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`,en=o.div`
  padding: 2vh 1.4vw;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,tn=o.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`,nn=o.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1vw;
  padding: 1.5vh 1.2vw 2vh;
  overflow: hidden;
  min-height: 56vh;
`,on=o.div`
  border: 1px solid #ececec;
  border-radius: 0.8vw;
  padding: 1vh 0.8vw;
  display: flex;
  flex-direction: column;
  min-height: 0;
`,sn=o.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  margin-bottom: 1vh;
`,an=o.input`
  flex: 1;
  padding: 0.9vh 0.8vw;
  border: 1px solid #d7d7d7;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
`,rn=o.div`
  overflow-y: auto;
  padding-right: 0.3vw;
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
`,ln=o.div`
  border: 1px solid ${i=>i.active?"#ffb942":"#ececec"};
  background: ${i=>i.active?"#fff8ed":"#fafafa"};
  border-radius: 0.7vw;
  padding: 1vh 0.8vw;
`,dn=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.82vw;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.5vh;
`,Ye=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  color: #666;
  margin-bottom: 0.7vh;
`,cn=o.div`
  display: flex;
  gap: 0.5vw;
`,un=o.button`
  padding: 0.5vh 0.6vw;
  border: 1px solid #dedede;
  border-radius: 0.5vw;
  background: #fff;
  font-size: 0.68vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3vw;
`,fn=o.div`
  border: 1px solid #ececec;
  border-radius: 0.8vw;
  padding: 1.2vh 0.9vw;
  overflow-y: auto;
`,jn=()=>{const i="https://spoorthischool.genzix.space",[Je,re]=r.useState(!1),[T,Ge]=r.useState("day"),[b,We]=r.useState(()=>{const t=new Date,n=5.5*60*60*1e3;return new Date(t.getTime()+n).toISOString().split("T")[0]}),[N,le]=r.useState([]),[hn,de]=r.useState([]),[ce,ue]=r.useState(0),[Ke,g]=r.useState(!1),[Xe,E]=r.useState(""),[gn,pn]=r.useState(!1),[mn,vn]=r.useState({}),[U,fe]=r.useState(!1),[f,he]=r.useState(null),[O,ge]=r.useState(!1),[H,pe]=r.useState(""),[w,Y]=r.useState(null),[Ze,q]=r.useState(!1),[me,ve]=r.useState(!1),[I,R]=r.useState(0),[xe,j]=r.useState(""),[D,ye]=r.useState(!1),[d,h]=r.useState({}),[_,J]=r.useState(null),[Qe,G]=r.useState(!1),[Ve,W]=r.useState([]),[be,et]=r.useState(""),[we,je]=r.useState(!1),[Se,K]=r.useState(""),[S,X]=r.useState(""),[B,Fe]=r.useState(!1),[v,L]=r.useState({title:"",description:"",target_audience:"ALL"}),[xn,yn]=r.useState({subject:"",message:""}),[p,ke]=r.useState({title:"",description:"",target_audience:"ALL"}),Z=()=>{const t=new Date,n=5.5*60*60*1e3;return new Date(t.getTime()+n)},Q=Z(),tt=Q.getFullYear(),nt=Q.getMonth()+1;Q.getDate();const ot=t=>["January","February","March","April","May","June","July","August","September","October","November","December"][t-1],x=()=>localStorage.getItem("token"),V=(t,n)=>{var s,a,l,c,u,k;return(a=(s=t==null?void 0:t.response)==null?void 0:s.data)!=null&&a.message&&typeof t.response.data.message=="string"?t.response.data.message:(c=(l=t==null?void 0:t.response)==null?void 0:l.data)!=null&&c.detail&&typeof t.response.data.detail=="string"?t.response.data.detail:(k=(u=t==null?void 0:t.response)==null?void 0:u.data)!=null&&k.error&&typeof t.response.data.error=="string"?t.response.data.error:n},st=async t=>{var n;try{re(!0);const s=x();if(!s){console.error("No authentication token found");return}const a=await y.get(`https://spoorthischool.genzix.space/masters/absent-students/${t}/`,{headers:{Authorization:`Bearer ${s}`}});if(a.data&&a.data.data){const l=a.data.data;le(l.absent_students||[]),de(l.absent_students||[]),ue(((n=l.attendance_summary)==null?void 0:n.total_absent)||0)}}catch(s){console.error("Error fetching absent students:",s);const a=[{id:1,name:"John Doe",admission_no:"ST001",group:"Class 10A",father_name:"Mr. Doe",phone:"+1234567890"},{id:2,name:"Jane Smith",admission_no:"ST002",group:"Class 9B",father_name:"Mr. Smith",phone:"+1234567891"},{id:3,name:"Mike Johnson",admission_no:"ST003",group:"Class 8A",father_name:"Mr. Johnson",phone:"+1234567892"},{id:4,name:"Sarah Wilson",admission_no:"ST004",group:"Class 10B",father_name:"Mr. Wilson",phone:"+1234567893"},{id:5,name:"David Brown",admission_no:"ST005",group:"Class 9A",father_name:"Mr. Brown",phone:"+1234567894"}];le(a),de(a),ue(a.length)}finally{re(!1)}},at=async()=>{try{const t=x();if(!t){console.error("No authentication token found");return}const n=await y.get("https://spoorthischool.genzix.space/masters/fees-collection/",{headers:{Authorization:`Bearer ${t}`}});n.data&&n.data.data&&(he(n.data.data),n.data.data.academic_year_collection&&n.data.data.academic_year_collection.length>0&&pe(n.data.data.academic_year_collection[0].academic_year))}catch(t){console.error("Error fetching fee data:",t),he({total_fees_collected:2e3,total_pending_fees:78e3,three_month_revenue:{total:0,months:[{month:"July 2025",amount:0},{month:"June 2025",amount:0},{month:"May 2025",amount:0}]},yearly_revenue:0,monthly_collection:[],academic_year_collection:[{academic_year:"2025-2027",total_collection:2e3}],last_payments:[]}),pe("2025-2027")}};r.useEffect(()=>{const t=T==="day"?b:Z().toISOString().split("T")[0];st(t),at()},[b,T]);const F=t=>{try{const n=new Date(t);if(isNaN(n.getTime()))return t;const s={year:"numeric",month:"short",day:"numeric",timeZone:"Asia/Kolkata"};return n.toLocaleDateString("en-IN",s)}catch(n){return console.error("Error formatting date:",n),t}},ee=t=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:0,maximumFractionDigits:0}).format(t),te=t=>{const{name:n,value:s}=t.target;ke(a=>({...a,[n]:s})),d[n]&&h(a=>({...a,[n]:""})),d.general&&h(a=>({...a,general:""}))},it=()=>{const t={},n=p.title.trim(),s=p.description.trim();return n?n.length<5?t.title="Title should be at least 5 characters":n.length>120&&(t.title="Title should not exceed 120 characters"):t.title="Title is required",s?s.length<10?t.description="Description should be at least 10 characters":s.length>1e3&&(t.description="Description should not exceed 1000 characters"):t.description="Description is required",p.target_audience||(t.target_audience="Please select target audience"),h(t),Object.keys(t).length===0},rt=async t=>{var n,s,a;if(t.preventDefault(),!!it()){ye(!0),J(null);try{const l=x();if(!l){h({general:"Authentication token not found. Please login again."});return}const c={title:p.title.trim(),description:p.description.trim(),target_audience:p.target_audience},u=await y.post(`${i}/masters/announcements/`,c,{headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"}});J(((n=u==null?void 0:u.data)==null?void 0:n.data)||null),(s=u==null?void 0:u.data)!=null&&s.data&&W(k=>[u.data.data,...k.filter(M=>M.id!==u.data.data.id)]),E(((a=u==null?void 0:u.data)==null?void 0:a.message)||"Announcement created successfully"),g(!0),setTimeout(()=>{g(!1)},3e3),ke({title:"",description:"",target_audience:c.target_audience}),h({})}catch(l){h({general:V(l,"Failed to create announcement. Please try again.")}),console.error("Error creating announcement:",l)}finally{ye(!1)}}},Ae=async()=>{var t;je(!0),K("");try{const n=x();if(!n){K("Authentication token not found. Please login again.");return}const s=await y.get(`${i}/masters/announcements/`,{headers:{Authorization:`Bearer ${n}`}}),a=Array.isArray((t=s==null?void 0:s.data)==null?void 0:t.data)?s.data.data:[];if(W(a),a.length>0){const l=a[0];X(l.id),L({title:l.title||"",description:l.description||"",target_audience:l.target_audience||"ALL"})}else X(""),L({title:"",description:"",target_audience:"ALL"})}catch(n){K(V(n,"Failed to fetch announcements."))}finally{je(!1)}},lt=()=>{G(!0),Ae()},dt=()=>{const t={},n=v.title.trim(),s=v.description.trim();return n?n.length<5?t.title="Title should be at least 5 characters":n.length>120&&(t.title="Title should not exceed 120 characters"):t.title="Title is required",s?s.length<10?t.description="Description should be at least 10 characters":s.length>1e3&&(t.description="Description should not exceed 1000 characters"):t.description="Description is required",h(t),Object.keys(t).length===0},ct=t=>{X(t.id),L({title:t.title||"",description:t.description||"",target_audience:t.target_audience||"ALL"}),h({})},ne=t=>{const{name:n,value:s}=t.target;L(a=>({...a,[n]:s})),d[n]&&h(a=>({...a,[n]:""}))},ut=async t=>{var n,s;if(t.preventDefault(),!!S&&dt()){Fe(!0);try{const a=x();if(!a){h({general:"Authentication token not found. Please login again."});return}const l={title:v.title.trim(),description:v.description.trim(),target_audience:v.target_audience},c=await y.put(`${i}/masters/announcements/${S}/`,l,{headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"}}),u=((n=c==null?void 0:c.data)==null?void 0:n.data)||{id:S,...l};W(k=>k.map(M=>M.id===S?{...M,...u}:M)),J(u),E(((s=c==null?void 0:c.data)==null?void 0:s.message)||"Announcement updated successfully"),g(!0),setTimeout(()=>g(!1),3e3),h({})}catch(a){h({general:V(a,"Failed to update announcement. Please try again.")})}finally{Fe(!1)}}},Ce=Ve.filter(t=>{var s,a,l,c;const n=be.trim().toLowerCase();return n?((s=t==null?void 0:t.title)==null?void 0:s.toLowerCase().includes(n))||((a=t==null?void 0:t.code)==null?void 0:a.toLowerCase().includes(n))||((l=t==null?void 0:t.description)==null?void 0:l.toLowerCase().includes(n))||((c=t==null?void 0:t.target_audience)==null?void 0:c.toLowerCase().includes(n)):!0});`${F(b)}`,`${F(b)}`,`${F(b)}`,`${H}${f?ee(f.total_pending_fees):"₹0"}`,`${H}${f?ee(f.total_pending_fees):"₹0"}`;const ft=async()=>{if(N.length===0){alert("No absent students found for the selected date.");return}fe(!0);try{const t=x();if(!t){console.error("No authentication token found"),alert("Authentication token not found. Please login again.");return}const n=await y.post("https://spoorthischool.genzix.space/masters/messages/bulk-absent-student/",{},{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});n.data&&(E(`Bulk message sent successfully to ${ce} absent students!`),g(!0),setTimeout(()=>{g(!1)},3e3),console.log("Bulk message sent successfully:",n.data))}catch(t){console.error("Error sending bulk message:",t);let n="Failed to send bulk message. Please try again.";t.response?(n=t.response.data.message||n,console.error("Error response:",t.response.data)):t.request?console.error("No response received:",t.request):console.error("Error setting up request:",t.message),alert(n)}finally{fe(!1)}},ht=async()=>{if(!f||f.total_pending_fees===0){alert("No pending fees found.");return}ge(!0);try{const t=x();if(!t){console.error("No authentication token found"),alert("Authentication token not found. Please login again.");return}const n=await y.post("https://spoorthischool.genzix.space/masters/messages/bulk-term-pending-message/",{},{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});n.data&&(E("Fee reminder sent successfully!"),g(!0),setTimeout(()=>{g(!1)},3e3),console.log("Bulk term pending message sent successfully:",n.data))}catch(t){console.error("Error sending bulk term pending message:",t);let n="Failed to send fee reminder. Please try again.";t.response?(n=t.response.data.message||n,console.error("Error response:",t.response.data)):t.request?console.error("No response received:",t.request):console.error("Error setting up request:",t.message),alert(n)}finally{ge(!1)}},gt=t=>{const n=["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel.sheet.macroEnabled.12","application/vnd.ms-excel.template.macroEnabled.12"],s=[".xls",".xlsx",".xlsm",".xltx"];if(!n.includes(t.type)){const l=t.name.toLowerCase().substring(t.name.lastIndexOf("."));if(!s.includes(l))return"Please select a valid Excel file (.xls, .xlsx, .xlsm, .xltx)"}const a=10*1024*1024;return t.size>a?"File size should be less than 10MB":null},Te=t=>{j("");const n=gt(t);if(n){j(n);return}Y(t)},pt=t=>{t.preventDefault(),q(!0)},mt=t=>{t.preventDefault(),q(!1)},vt=t=>{t.preventDefault(),q(!1);const n=t.dataTransfer.files;n.length>0&&Te(n[0])},xt=t=>{const n=t.target.files[0];n&&Te(n)},yt=()=>{Y(null),j(""),R(0)},bt=t=>{if(t===0)return"0 Bytes";const n=1024,s=["Bytes","KB","MB","GB"],a=Math.floor(Math.log(t)/Math.log(n));return parseFloat((t/Math.pow(n,a)).toFixed(2))+" "+s[a]},wt=async()=>{var t;if(!w){j("Please select a file to upload");return}ve(!0),R(0),j("");try{const n=x();if(!n)throw new Error("No authentication token found");const s=new FormData;s.append("file",w);const a=await y.post("https://spoorthischool.genzix.space/masters/test-marks/bulk-upload/",s,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"multipart/form-data"},onUploadProgress:l=>{const c=Math.round(l.loaded*100/l.total);R(c)}});a.data&&(E(typeof((t=a.data)==null?void 0:t.message)=="string"&&a.data.message.trim()?a.data.message:"Excel file uploaded successfully!"),g(!0),setTimeout(()=>{g(!1)},3e3),Y(null),R(0),console.log("File uploaded successfully:",a.data))}catch(n){console.error("Error uploading file:",n);let s="Failed to upload file. Please try again.";n.response?(s=n.response.data.message||n.response.data.error||s,console.error("Error response:",n.response.data)):n.request?console.error("No response received:",n.request):console.error("Error setting up request:",n.message),j(s)}finally{ve(!1)}},Ee={marginTop:"auto",alignSelf:"flex-end",width:"auto",padding:"1.2vh 1vw",backgroundColor:"transparent",border:"1px solid #000000",color:"#000000",borderRadius:"0.6vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer",transition:"all 0.2s"},De={...Ee,backgroundColor:"#FFEAC7"},_e={marginTop:"auto",alignSelf:"flex-end",width:"12vw",height:"5.5vh",padding:"1vh 0.7vw",backgroundColor:"#BEFFB6",border:"none",color:"#000000",borderRadius:"3vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer",transition:"all 0.3s"},jt={..._e,backgroundColor:"#cccccc",cursor:"not-allowed"},Be={marginTop:"auto",alignSelf:"flex-end",width:"12vw",height:"5.5vh",padding:"1vh 0.7vw",backgroundColor:"#BEFFB6",border:"none",color:"#000000",borderRadius:"3vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer",transition:"all 0.3s"},St={...Be,backgroundColor:"#cccccc",cursor:"not-allowed"},z=o.div`
    font-family: "Roboto", sans-serif;
    font-size: 0.8vw;
    margin-top: 2vh;
    font-weight: 400;
    margin-right: 0.1vw;
    color: #000000;
    letter-spacing: 0.7px;
    transition: all 0.2s;
  `;return Je?e.jsx("div",{style:{height:"75vh",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(_t,{children:e.jsx(Bt,{})})}):e.jsxs(zt,{children:[e.jsxs(Rt,{show:Ke,children:[e.jsx(Lt,{children:"✓"}),Xe]}),e.jsxs(Mt,{children:[e.jsxs(Ie,{children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:e.jsx($,{children:"Students Absent"})}),e.jsxs(Re,{style:{color:"#FF6745"},children:[ce," Students"]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:e.jsx("button",{style:T==="day"?De:Ee,onClick:()=>{Ge("day"),We(Z().toISOString().split("T")[0])},children:T==="day"?F(b):T==="month"?ot(nt):tt})}),e.jsx("button",{style:U||N.length===0?jt:_e,onClick:ft,disabled:U||N.length===0,children:U?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"center"},children:[e.jsx(P,{}),"Sending..."]}):"Send Message"})]})]}),e.jsxs(Ie,{children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:e.jsx($,{children:"Pending Fees"})}),e.jsx(Re,{style:{color:"#FF6745"},children:f?ee(f.total_pending_fees):"₹0"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:e.jsx("button",{style:De,onClick:()=>{},children:H||"Select Year"})}),e.jsx("button",{style:O||!f||f.total_pending_fees===0?St:Be,onClick:ht,disabled:O||!f||f.total_pending_fees===0,children:O?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"center"},children:[e.jsx(P,{}),"Sending..."]}):"Send Fee Reminder"})]})]}),e.jsx($t,{style:{height:"30vh"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"start",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"1vh"},children:e.jsx($,{children:"Upload Test Marks"})}),w?e.jsxs(Yt,{children:[e.jsxs(qt,{children:[e.jsx(Ft,{style:{fontSize:"1.2vw",color:"#FFB942"}}),e.jsxs("div",{children:[e.jsx(Jt,{children:w.name}),e.jsx(Gt,{children:bt(w.size)})]})]}),e.jsx(Wt,{onClick:yt,children:e.jsx(Me,{style:{fontSize:"1vw"}})})]}):e.jsxs(Nt,{isDragOver:Ze,onDragOver:pt,onDragLeave:mt,onDrop:vt,style:{marginTop:"0.6vh",marginBottom:"0.6vh"},onClick:()=>document.getElementById("file-input").click(),children:[e.jsx(Ut,{children:e.jsx(ze,{})}),e.jsx(Ot,{children:"Drag & drop Excel file here or click to browse"}),e.jsx(Ht,{id:"file-input",type:"file",accept:".xls,.xlsx,.xlsm,.xltx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",onChange:xt})]}),xe&&e.jsx(m,{style:{marginTop:"1vh"},children:xe}),I>0&&I<100&&e.jsx(Xt,{children:e.jsx(Zt,{progress:I})}),e.jsx(Kt,{onClick:wt,disabled:!w||me,children:me?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:[e.jsx(P,{}),"Uploading... ",I,"%"]}):e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:[e.jsx(ze,{}),"Upload Excel"]})})]})})]}),e.jsxs(Pt,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5vh"},children:[e.jsx($,{style:{marginBottom:0},children:"Post Announcement"}),e.jsxs(ae,{type:"button",onClick:lt,children:[e.jsx(Pe,{}),"Announcement History"]})]}),e.jsx(z,{style:{marginTop:0,marginBottom:"1.5vh",color:"#626060"},children:"Create and publish important notices instantly."}),e.jsxs(Le,{as:"form",onSubmit:rt,children:[e.jsxs(A,{children:[e.jsx(C,{htmlFor:"announcement-title",children:"Title"}),e.jsx($e,{id:"announcement-title",name:"title",value:p.title,onChange:te,placeholder:"e.g. School closed tomorrow",maxLength:120,disabled:D}),d.title&&e.jsx(m,{children:d.title})]}),e.jsxs(A,{children:[e.jsx(C,{htmlFor:"announcement-description",children:"Description"}),e.jsx(Ne,{id:"announcement-description",name:"description",value:p.description,onChange:te,placeholder:"Enter announcement details...",maxLength:1e3,disabled:D,style:{minHeight:"20vh"}}),d.description&&e.jsx(m,{children:d.description})]}),e.jsxs(A,{children:[e.jsx(C,{htmlFor:"announcement-target",children:"Target Audience"}),e.jsxs(He,{id:"announcement-target",name:"target_audience",value:p.target_audience,onChange:te,disabled:D,children:[e.jsx("option",{value:"ALL",children:"ALL"}),e.jsx("option",{value:"STUDENTS",children:"STUDENTS"}),e.jsx("option",{value:"PARENTS",children:"PARENTS"}),e.jsx("option",{value:"EMPLOYEES",children:"EMPLOYEES"})]}),d.target_audience&&e.jsx(m,{children:d.target_audience})]}),d.general&&e.jsx(m,{children:d.general}),e.jsx(Ue,{type:"submit",disabled:D,children:D?e.jsxs(e.Fragment,{children:[e.jsx(P,{}),"Posting..."]}):e.jsxs(e.Fragment,{children:[e.jsx(kt,{}),"Publish Announcement"]})})]}),_&&e.jsxs(It,{style:{marginTop:"2vh"},children:[e.jsxs(Oe,{children:[e.jsx(At,{}),"Latest Announcement"]}),e.jsxs(z,{style:{marginTop:0},children:[e.jsx("strong",{children:"Code:"})," ",_.code]}),e.jsxs(z,{style:{marginTop:"0.7vh"},children:[e.jsx("strong",{children:"Title:"})," ",_.title]}),e.jsxs(z,{style:{marginTop:"0.7vh"},children:[e.jsx("strong",{children:"Audience:"})," ",_.target_audience]}),e.jsxs(z,{style:{marginTop:"0.7vh"},children:[e.jsx("strong",{children:"Posted:"})," ",F(_.date_posted)]})]})]}),Qe&&e.jsx(Qt,{onClick:()=>G(!1),children:e.jsxs(Vt,{onClick:t=>t.stopPropagation(),children:[e.jsxs(en,{children:[e.jsxs(tn,{children:[e.jsx(Pe,{}),"Announcement History"]}),e.jsxs("div",{style:{display:"flex",gap:"0.5vw"},children:[e.jsxs(ae,{type:"button",onClick:Ae,disabled:we,children:[e.jsx(Ct,{}),"Refresh"]}),e.jsxs(ae,{type:"button",onClick:()=>G(!1),children:[e.jsx(Me,{}),"Close"]})]})]}),e.jsxs(nn,{children:[e.jsxs(on,{children:[e.jsxs(sn,{children:[e.jsx(Tt,{style:{color:"#777"}}),e.jsx(an,{placeholder:"Search by title, code, audience...",value:be,onChange:t=>et(t.target.value)})]}),Se&&e.jsx(m,{children:Se}),we?e.jsx(se,{children:"Loading announcements..."}):Ce.length===0?e.jsx(se,{children:"No announcements found."}):e.jsx(rn,{children:Ce.map(t=>e.jsxs(ln,{active:S===t.id,children:[e.jsx(dn,{children:t.title||"Untitled Announcement"}),e.jsxs(Ye,{children:[t.code," | ",t.target_audience," | ",F(t.date_posted)]}),e.jsx(Ye,{children:t.description||"No description"}),e.jsx(cn,{children:e.jsxs(un,{type:"button",onClick:()=>ct(t),children:[e.jsx(oe,{}),"Edit"]})})]},t.id))})]}),e.jsxs(fn,{children:[e.jsxs(Oe,{style:{marginBottom:"1.4vh"},children:[e.jsx(oe,{}),"Edit Announcement"]}),S?e.jsxs(Le,{as:"form",onSubmit:ut,children:[e.jsxs(A,{children:[e.jsx(C,{htmlFor:"edit-title",children:"Title"}),e.jsx($e,{id:"edit-title",name:"title",value:v.title,onChange:ne,maxLength:120,disabled:B}),d.title&&e.jsx(m,{children:d.title})]}),e.jsxs(A,{children:[e.jsx(C,{htmlFor:"edit-description",children:"Description"}),e.jsx(Ne,{id:"edit-description",name:"description",value:v.description,onChange:ne,maxLength:1e3,disabled:B,style:{minHeight:"24vh"}}),d.description&&e.jsx(m,{children:d.description})]}),e.jsxs(A,{children:[e.jsx(C,{htmlFor:"edit-target-audience",children:"Target Audience"}),e.jsxs(He,{id:"edit-target-audience",name:"target_audience",value:v.target_audience,onChange:ne,disabled:B,children:[e.jsx("option",{value:"ALL",children:"ALL"}),e.jsx("option",{value:"STUDENTS",children:"STUDENTS"}),e.jsx("option",{value:"PARENTS",children:"PARENTS"}),e.jsx("option",{value:"EMPLOYEES",children:"EMPLOYEES"})]})]}),d.general&&e.jsx(m,{children:d.general}),e.jsx(Ue,{type:"submit",disabled:B,children:B?e.jsxs(e.Fragment,{children:[e.jsx(P,{}),"Updating..."]}):e.jsxs(e.Fragment,{children:[e.jsx(oe,{}),"Update Announcement"]})})]}):e.jsx(se,{children:"Select an announcement to edit."})]})]})]})})]})};export{jn as default};
