import{F as Gt,b as l,k as o,j as e,I as et,i as B,m as Fe}from"./index-Dw8q8pd0.js";import{j as tt,k as Jt,F as nt,l as st,m as Wt,n as Vt,a as Kt,f as Xt,d as be}from"./index-C9Urxevv.js";const ne=[{value:"ALL",label:"All"},{value:"EMPLOYEES",label:"Employees"},{value:"PARENTS",label:"Parents Only"},{value:"CLASS",label:"Specific Class"},{value:"SECTION",label:"Specific Section"}],H=[{value:"CIRCULAR",label:"School Circular"},{value:"EVENT",label:"Event"},{value:"HOLIDAY",label:"Holiday"},{value:"MEETING",label:"Meeting"},{value:"NOTICE",label:"Notice"}],Q={title:"",description:"",target_audience:"ALL",category:"NOTICE",class_name:"",section:""},Zt=new Set(ne.map(n=>n.value)),Qt=new Set(H.map(n=>n.value)),se=n=>n==="CLASS"||n==="SECTION",oe=n=>n==="SECTION",te=(n,c,j=c||"—")=>{var f;return((f=n.find(v=>v.value===c))==null?void 0:f.label)??j},J=n=>(typeof n=="object"&&(n!=null&&n.id)?n.id:n)||"",pt=n=>{const c=(n==null?void 0:n.target_audience)||(n==null?void 0:n.target_type)||"ALL";return Zt.has(c)?c:"ALL"},en=n=>{const c=(n==null?void 0:n.category)||(n==null?void 0:n.notification_type)||"NOTICE";return Qt.has(c)?c:"NOTICE"},ot=(n={})=>({title:n.title||"",description:n.description||"",target_audience:pt(n),category:en(n),class_name:J(n.class_name),section:J(n.section)}),at=n=>{const c={},j=n.title.trim(),f=n.description.trim();return j?j.length<5?c.title="Title should be at least 5 characters":j.length>120&&(c.title="Title should not exceed 120 characters"):c.title="Title is required",f?f.length<10?c.description="Description should be at least 10 characters":f.length>1e3&&(c.description="Description should not exceed 1000 characters"):c.description="Description is required",n.target_audience||(c.target_audience="Please select target audience"),n.category||(c.category="Please select category"),se(n.target_audience)&&!n.class_name&&(c.class_name="Please select a class"),oe(n.target_audience)&&(n.class_name||(c.class_name="Please select a class"),n.section||(c.section="Please select a section")),c},it=n=>{const c={title:n.title.trim(),description:n.description.trim(),category:n.category,target_audience:n.target_audience};return se(n.target_audience)&&(c.class_name=n.class_name),oe(n.target_audience)&&(c.section=n.section),c},we=(n,c={},j={})=>{var I,W,Y;const f=pt(n),v=te(ne,f);if(f==="CLASS"){const C=J(n.class_name),M=(I=c[C])==null?void 0:I.name;return M?`${v} — ${M}`:v}if(f==="SECTION"){const C=J(n.class_name),M=J(n.section),S=(W=c[C])==null?void 0:W.name,V=(Y=j[M])==null?void 0:Y.name;return S&&V?`${v} — ${S} (${V})`:S?`${v} — ${S}`:v}return v},mt=Fe`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,tn=Fe`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,nn=Fe`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`,sn=o.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,on=o.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${mt} 1s ease-in-out infinite;
`,an=o.div`
  height: 85vh;
  display: flex;
  gap: 2.4vw;
`,rn=o.div`
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vh;
  gap: 2vw;
  align-items: center;
`,rt=o.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ln=o.div`
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
`;const ee=o.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 0.85vw;
  font-weight: 700;
  color: grey;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`,lt=o.div`
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
`;const ct=o.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
`,b=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
`,w=o.label`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  font-weight: 400;
  color: #626060;
`,dt=o.input`
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
`,ut=o.textarea`
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
`,ht=o.button`
  padding: 1.5vh 1vw;
  background-color: ${n=>n.disabled?"#cccccc":"#BEFFB6"};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${n=>n.disabled?"not-allowed":"pointer"};
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
    background-color: ${n=>n.disabled?"#cccccc":"#92FF84"};
    transform: ${n=>n.disabled?"none":"translateY(-1px)"};
  }
`,G=o.div`
  width: 1.2vw;
  height: 1.2vw;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${mt} 1s ease-in-out infinite;
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
`;const cn=o.div`
  background: #f8f9fa;
  padding: 1.5vh 1vw;
  border-radius: 0.6vw;
  margin-bottom: 1vh;
  border: 1px solid #e9ecef;
`,gt=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  font-weight: 600;
  color: #000000;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`,dn=o.div`
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
  animation: ${n=>n.show?tn:nn} 0.3s ease-in-out;
  display: ${n=>n.show?"block":"none"};
`,un=o.span`
  margin-right: 0.5vw;
  font-size: 1.2vw;
`,g=o.div`
  color: #ff4444;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  margin-top: 0.3vh;
`,je=o.div`
  text-align: center;
  padding: 2vh 0;
  font-family: 'Roboto, sans-serif';
  font-size: 0.8vw;
  color: #666;
  margin: auto;
`,hn=o.div`
  height: 23vh;
  background: #ffffff;
  padding: 3vh 2vw;
  border-radius: 1.4vw;
  width: 40vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,gn=o.div`
  border: 2px dashed ${n=>n.isDragOver?"#FFB942":"#ccc"};
  border-radius: 0.8vw;
  padding: 2vh 1vw;
  text-align: center;
  background: ${n=>n.isDragOver?"#FFEAC7":"#f8f9fa"};
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
`,fn=o.div`
  font-size: 2vw;
  color: #666;
  margin-bottom: 0.5vh;
`,pn=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;
  margin-bottom: 0.5vh;
`;o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.6vw;
  color: #999;
`;const mn=o.input`
  display: none;
`,vn=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 1vh 1vw;
  border-radius: 0.6vw;
  margin-top: 1vh;
  border: 1px solid #e9ecef;
`,xn=o.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`,yn=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  color: #000;
  font-weight: 500;
`,bn=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.6vw;
  color: #666;
`,wn=o.button`
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
`,jn=o.button`
  padding: 1vh 1.5vw;
  background-color: ${n=>n.disabled?"#cccccc":"#BEFFB6"};
  color: black;
  border: none;
  border-radius: 0.6vw;
  cursor: ${n=>n.disabled?"not-allowed":"pointer"};
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
    background-color: ${n=>n.disabled?"#cccccc":"#92FF84"};
    transform: ${n=>n.disabled?"none":"translateY(-1px)"};
  }
`,Sn=o.div`
  width: 100%;
  height: 0.3vh;
  background: #e9ecef;
  border-radius: 0.15vh;
  overflow: hidden;
  margin-top: 1vh;
`,Fn=o.div`
  height: 100%;
  background: #FFB942;
  width: ${n=>n.progress}%;
  transition: width 0.3s ease;
`,D=o.select`
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
`,Se=o.button`
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
`,Cn=o.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 2vh 2vw;
`,_n=o.div`
  width: min(92vw, 1100px);
  max-height: 90vh;
  background: #ffffff;
  border-radius: 1.2vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`,An=o.div`
  padding: 2vh 1.4vw;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,kn=o.div`
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5vw;
`,En=o.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1vw;
  padding: 1.5vh 1.2vw 2vh;
  overflow: hidden;
  min-height: 56vh;
`,Tn=o.div`
  border: 1px solid #ececec;
  border-radius: 0.8vw;
  padding: 1vh 0.8vw;
  display: flex;
  flex-direction: column;
  min-height: 0;
`,Bn=o.div`
  display: flex;
  align-items: center;
  gap: 0.6vw;
  margin-bottom: 1vh;
`,Dn=o.input`
  flex: 1;
  padding: 0.9vh 0.8vw;
  border: 1px solid #d7d7d7;
  border-radius: 0.6vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
`,In=o.div`
  overflow-y: auto;
  padding-right: 0.3vw;
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
`,zn=o.div`
  border: 1px solid ${n=>n.active?"#ffb942":"#ececec"};
  background: ${n=>n.active?"#fff8ed":"#fafafa"};
  border-radius: 0.7vw;
  padding: 1vh 0.8vw;
`,Mn=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.82vw;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.5vh;
`,ft=o.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.65vw;
  color: #666;
  margin-bottom: 0.7vh;
`,Rn=o.div`
  display: flex;
  gap: 0.5vw;
`,Pn=o.button`
  padding: 0.5vh 0.6vw;
  border: 1px solid #dedede;
  border-radius: 0.5vw;
  background: #fff;
  font-size: 0.68vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3vw;
`,Ln=o.div`
  border: 1px solid #ececec;
  border-radius: 0.8vw;
  padding: 1.2vh 0.9vw;
  overflow-y: auto;
`,Wn=()=>{const n="https://spoorthischool.genzix.space",{classes:c,classMap:j,sectionMap:f,sectionsByClass:v,loading:I}=Gt(),[W,Y]=l.useState(!1),[C,M]=l.useState("day"),[S,V]=l.useState(()=>{const t=new Date,s=5.5*60*60*1e3;return new Date(t.getTime()+s).toISOString().split("T")[0]}),[ae,Ce]=l.useState([]),[Nn,_e]=l.useState([]),[Ae,ke]=l.useState(0),[vt,F]=l.useState(!1),[xt,q]=l.useState(""),[$n,On]=l.useState(!1),[Un,Hn]=l.useState({}),[ie,Ee]=l.useState(!1),[x,Te]=l.useState(null),[re,Be]=l.useState(!1),[le,De]=l.useState(""),[R,ce]=l.useState(null),[yt,de]=l.useState(!1),[Ie,ze]=l.useState(!1),[K,X]=l.useState(0),[Me,P]=l.useState(""),[A,Re]=l.useState(!1),[d,y]=l.useState({}),[z,ue]=l.useState(null),[bt,he]=l.useState(!1),[wt,ge]=l.useState([]),[Pe,jt]=l.useState(""),[Le,Ne]=l.useState(!1),[$e,fe]=l.useState(""),[L,pe]=l.useState(""),[k,Oe]=l.useState(!1),[p,Z]=l.useState(Q),[Yn,qn]=l.useState({subject:"",message:""}),[m,Ue]=l.useState(Q),He=l.useMemo(()=>v[m.class_name]||[],[v,m.class_name]),Ye=l.useMemo(()=>v[p.class_name]||[],[v,p.class_name]),me=()=>{const t=new Date,s=5.5*60*60*1e3;return new Date(t.getTime()+s)},ve=me(),St=ve.getFullYear(),Ft=ve.getMonth()+1;ve.getDate();const Ct=t=>["January","February","March","April","May","June","July","August","September","October","November","December"][t-1],E=()=>localStorage.getItem("token"),xe=(t,s)=>{var i,a,r,h,u,_;return(a=(i=t==null?void 0:t.response)==null?void 0:i.data)!=null&&a.message&&typeof t.response.data.message=="string"?t.response.data.message:(h=(r=t==null?void 0:t.response)==null?void 0:r.data)!=null&&h.detail&&typeof t.response.data.detail=="string"?t.response.data.detail:(_=(u=t==null?void 0:t.response)==null?void 0:u.data)!=null&&_.error&&typeof t.response.data.error=="string"?t.response.data.error:s},_t=async t=>{var s;try{Y(!0);const i=E();if(!i){console.error("No authentication token found");return}const a=await B.get(`https://spoorthischool.genzix.space/masters/absent-students/${t}/`,{headers:{Authorization:`Bearer ${i}`}});if(a.data&&a.data.data){const r=a.data.data;Ce(r.absent_students||[]),_e(r.absent_students||[]),ke(((s=r.attendance_summary)==null?void 0:s.total_absent)||0)}}catch(i){console.error("Error fetching absent students:",i);const a=[{id:1,name:"John Doe",admission_no:"ST001",group:"Class 10A",father_name:"Mr. Doe",phone:"+1234567890"},{id:2,name:"Jane Smith",admission_no:"ST002",group:"Class 9B",father_name:"Mr. Smith",phone:"+1234567891"},{id:3,name:"Mike Johnson",admission_no:"ST003",group:"Class 8A",father_name:"Mr. Johnson",phone:"+1234567892"},{id:4,name:"Sarah Wilson",admission_no:"ST004",group:"Class 10B",father_name:"Mr. Wilson",phone:"+1234567893"},{id:5,name:"David Brown",admission_no:"ST005",group:"Class 9A",father_name:"Mr. Brown",phone:"+1234567894"}];Ce(a),_e(a),ke(a.length)}finally{Y(!1)}},At=async()=>{try{const t=E();if(!t){console.error("No authentication token found");return}const s=await B.get("https://spoorthischool.genzix.space/masters/fees-collection/",{headers:{Authorization:`Bearer ${t}`}});s.data&&s.data.data&&(Te(s.data.data),s.data.data.academic_year_collection&&s.data.data.academic_year_collection.length>0&&De(s.data.data.academic_year_collection[0].academic_year))}catch(t){console.error("Error fetching fee data:",t),Te({total_fees_collected:2e3,total_pending_fees:78e3,three_month_revenue:{total:0,months:[{month:"July 2025",amount:0},{month:"June 2025",amount:0},{month:"May 2025",amount:0}]},yearly_revenue:0,monthly_collection:[],academic_year_collection:[{academic_year:"2025-2027",total_collection:2e3}],last_payments:[]}),De("2025-2027")}};l.useEffect(()=>{const t=C==="day"?S:me().toISOString().split("T")[0];_t(t),At()},[S,C]);const N=t=>{try{const s=new Date(t);if(isNaN(s.getTime()))return t;const i={year:"numeric",month:"short",day:"numeric",timeZone:"Asia/Kolkata"};return s.toLocaleDateString("en-IN",i)}catch(s){return console.error("Error formatting date:",s),t}},ye=t=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:0,maximumFractionDigits:0}).format(t),$=t=>{const{name:s,value:i}=t.target;Ue(a=>{const r={...a,[s]:i};return s==="target_audience"&&(r.class_name="",r.section=""),s==="class_name"&&(r.section=""),r}),d[s]&&y(a=>({...a,[s]:""})),d.general&&y(a=>({...a,general:""}))},kt=()=>{const t=at(m);return y(t),Object.keys(t).length===0},Et=async t=>{var s,i,a;if(t.preventDefault(),!!kt()){Re(!0),ue(null);try{const r=E();if(!r){y({general:"Authentication token not found. Please login again."});return}const h=it(m),u=await B.post(`${n}/masters/announcements/`,h,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});ue(((s=u==null?void 0:u.data)==null?void 0:s.data)||null),(i=u==null?void 0:u.data)!=null&&i.data&&ge(_=>[u.data.data,..._.filter(T=>T.id!==u.data.data.id)]),q(((a=u==null?void 0:u.data)==null?void 0:a.message)||"Announcement created successfully"),F(!0),setTimeout(()=>{F(!1)},3e3),Ue({...Q}),y({})}catch(r){y({general:xe(r,"Failed to create announcement. Please try again.")}),console.error("Error creating announcement:",r)}finally{Re(!1)}}},qe=async()=>{var t;Ne(!0),fe("");try{const s=E();if(!s){fe("Authentication token not found. Please login again.");return}const i=await B.get(`${n}/masters/announcements/`,{headers:{Authorization:`Bearer ${s}`}}),a=Array.isArray((t=i==null?void 0:i.data)==null?void 0:t.data)?i.data.data:[];if(ge(a),a.length>0){const r=a[0];pe(r.id),Z(ot(r))}else pe(""),Z({...Q})}catch(s){fe(xe(s,"Failed to fetch announcements."))}finally{Ne(!1)}},Tt=()=>{he(!0),qe()},Bt=()=>{const t=at(p);return y(t),Object.keys(t).length===0},Dt=t=>{pe(t.id),Z(ot(t)),y({})},O=t=>{const{name:s,value:i}=t.target;Z(a=>{const r={...a,[s]:i};return s==="target_audience"&&(r.class_name="",r.section=""),s==="class_name"&&(r.section=""),r}),d[s]&&y(a=>({...a,[s]:""}))},It=async t=>{var s,i;if(t.preventDefault(),!!L&&Bt()){Oe(!0);try{const a=E();if(!a){y({general:"Authentication token not found. Please login again."});return}const r=it(p),h=await B.put(`${n}/masters/announcements/${L}/`,r,{headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"}}),u=((s=h==null?void 0:h.data)==null?void 0:s.data)||{id:L,...r};ge(_=>_.map(T=>T.id===L?{...T,...u}:T)),ue(u),q(((i=h==null?void 0:h.data)==null?void 0:i.message)||"Announcement updated successfully"),F(!0),setTimeout(()=>F(!1),3e3),y({})}catch(a){y({general:xe(a,"Failed to update announcement. Please try again.")})}finally{Oe(!1)}}},Ge=wt.filter(t=>{var r,h,u,_,T,Ze,Qe;const s=Pe.trim().toLowerCase();if(!s)return!0;const i=we(t,j,f).toLowerCase(),a=te(H,t.category||t.notification_type,"").toLowerCase();return((r=t==null?void 0:t.title)==null?void 0:r.toLowerCase().includes(s))||((h=t==null?void 0:t.code)==null?void 0:h.toLowerCase().includes(s))||((u=t==null?void 0:t.description)==null?void 0:u.toLowerCase().includes(s))||((_=t==null?void 0:t.target_audience)==null?void 0:_.toLowerCase().includes(s))||((T=t==null?void 0:t.target_type)==null?void 0:T.toLowerCase().includes(s))||((Ze=t==null?void 0:t.category)==null?void 0:Ze.toLowerCase().includes(s))||((Qe=t==null?void 0:t.notification_type)==null?void 0:Qe.toLowerCase().includes(s))||i.includes(s)||a.includes(s)});`${N(S)}`,`${N(S)}`,`${N(S)}`,`${le}${x?ye(x.total_pending_fees):"₹0"}`,`${le}${x?ye(x.total_pending_fees):"₹0"}`;const zt=async()=>{if(ae.length===0){alert("No absent students found for the selected date.");return}Ee(!0);try{const t=E();if(!t){console.error("No authentication token found"),alert("Authentication token not found. Please login again.");return}const s=await B.post("https://spoorthischool.genzix.space/masters/messages/bulk-absent-student/",{},{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});s.data&&(q(`Bulk message sent successfully to ${Ae} absent students!`),F(!0),setTimeout(()=>{F(!1)},3e3),console.log("Bulk message sent successfully:",s.data))}catch(t){console.error("Error sending bulk message:",t);let s="Failed to send bulk message. Please try again.";t.response?(s=t.response.data.message||s,console.error("Error response:",t.response.data)):t.request?console.error("No response received:",t.request):console.error("Error setting up request:",t.message),alert(s)}finally{Ee(!1)}},Mt=async()=>{if(!x||x.total_pending_fees===0){alert("No pending fees found.");return}Be(!0);try{const t=E();if(!t){console.error("No authentication token found"),alert("Authentication token not found. Please login again.");return}const s=await B.post("https://spoorthischool.genzix.space/masters/messages/bulk-term-pending-message/",{},{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});s.data&&(q("Fee reminder sent successfully!"),F(!0),setTimeout(()=>{F(!1)},3e3),console.log("Bulk term pending message sent successfully:",s.data))}catch(t){console.error("Error sending bulk term pending message:",t);let s="Failed to send fee reminder. Please try again.";t.response?(s=t.response.data.message||s,console.error("Error response:",t.response.data)):t.request?console.error("No response received:",t.request):console.error("Error setting up request:",t.message),alert(s)}finally{Be(!1)}},Rt=t=>{const s=["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel.sheet.macroEnabled.12","application/vnd.ms-excel.template.macroEnabled.12"],i=[".xls",".xlsx",".xlsm",".xltx"];if(!s.includes(t.type)){const r=t.name.toLowerCase().substring(t.name.lastIndexOf("."));if(!i.includes(r))return"Please select a valid Excel file (.xls, .xlsx, .xlsm, .xltx)"}const a=10*1024*1024;return t.size>a?"File size should be less than 10MB":null},Je=t=>{P("");const s=Rt(t);if(s){P(s);return}ce(t)},Pt=t=>{t.preventDefault(),de(!0)},Lt=t=>{t.preventDefault(),de(!1)},Nt=t=>{t.preventDefault(),de(!1);const s=t.dataTransfer.files;s.length>0&&Je(s[0])},$t=t=>{const s=t.target.files[0];s&&Je(s)},Ot=()=>{ce(null),P(""),X(0)},Ut=t=>{if(t===0)return"0 Bytes";const s=1024,i=["Bytes","KB","MB","GB"],a=Math.floor(Math.log(t)/Math.log(s));return parseFloat((t/Math.pow(s,a)).toFixed(2))+" "+i[a]},Ht=async()=>{var t;if(!R){P("Please select a file to upload");return}ze(!0),X(0),P("");try{const s=E();if(!s)throw new Error("No authentication token found");const i=new FormData;i.append("file",R);const a=await B.post("https://spoorthischool.genzix.space/masters/test-marks/bulk-upload/",i,{headers:{Authorization:`Bearer ${s}`,"Content-Type":"multipart/form-data"},onUploadProgress:r=>{const h=Math.round(r.loaded*100/r.total);X(h)}});a.data&&(q(typeof((t=a.data)==null?void 0:t.message)=="string"&&a.data.message.trim()?a.data.message:"Excel file uploaded successfully!"),F(!0),setTimeout(()=>{F(!1)},3e3),ce(null),X(0),console.log("File uploaded successfully:",a.data))}catch(s){console.error("Error uploading file:",s);let i="Failed to upload file. Please try again.";s.response?(i=s.response.data.message||s.response.data.error||i,console.error("Error response:",s.response.data)):s.request?console.error("No response received:",s.request):console.error("Error setting up request:",s.message),P(i)}finally{ze(!1)}},We={marginTop:"auto",alignSelf:"flex-end",width:"auto",padding:"1.2vh 1vw",backgroundColor:"transparent",border:"1px solid #000000",color:"#000000",borderRadius:"0.6vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer",transition:"all 0.2s"},Ve={...We,backgroundColor:"#FFEAC7"},Ke={marginTop:"auto",alignSelf:"flex-end",width:"12vw",height:"5.5vh",padding:"1vh 0.7vw",backgroundColor:"#BEFFB6",border:"none",color:"#000000",borderRadius:"3vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer",transition:"all 0.3s"},Yt={...Ke,backgroundColor:"#cccccc",cursor:"not-allowed"},Xe={marginTop:"auto",alignSelf:"flex-end",width:"12vw",height:"5.5vh",padding:"1vh 0.7vw",backgroundColor:"#BEFFB6",border:"none",color:"#000000",borderRadius:"3vw",fontFamily:"Roboto, sans-serif",fontSize:"0.8vw",letterSpacing:"1px",cursor:"pointer",transition:"all 0.3s"},qt={...Xe,backgroundColor:"#cccccc",cursor:"not-allowed"},U=o.div`
    font-family: "Roboto", sans-serif;
    font-size: 0.8vw;
    margin-top: 2vh;
    font-weight: 400;
    margin-right: 0.1vw;
    color: #000000;
    letter-spacing: 0.7px;
    transition: all 0.2s;
  `;return W?e.jsx("div",{style:{height:"75vh",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(sn,{children:e.jsx(on,{})})}):e.jsxs(an,{children:[e.jsxs(dn,{show:vt,children:[e.jsx(un,{children:"✓"}),xt]}),e.jsxs(rn,{children:[e.jsxs(rt,{children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:e.jsx(ee,{children:"Students Absent"})}),e.jsxs(lt,{style:{color:"#FF6745"},children:[Ae," Students"]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:e.jsx("button",{style:C==="day"?Ve:We,onClick:()=>{M("day"),V(me().toISOString().split("T")[0])},children:C==="day"?N(S):C==="month"?Ct(Ft):St})}),e.jsx("button",{style:ie||ae.length===0?Yt:Ke,onClick:zt,disabled:ie||ae.length===0,children:ie?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"center"},children:[e.jsx(G,{}),"Sending..."]}):"Send Message"})]})]}),e.jsxs(rt,{children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"0.45vh"},children:e.jsx(ee,{children:"Pending Fees"})}),e.jsx(lt,{style:{color:"#FF6745"},children:x?ye(x.total_pending_fees):"₹0"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"end",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.6vw",justifyContent:"end"},children:e.jsx("button",{style:Ve,onClick:()=>{},children:le||"Select Year"})}),e.jsx("button",{style:re||!x||x.total_pending_fees===0?qt:Xe,onClick:Mt,disabled:re||!x||x.total_pending_fees===0,children:re?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"center"},children:[e.jsx(G,{}),"Sending..."]}):"Send Fee Reminder"})]})]}),e.jsx(hn,{style:{height:"30vh"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"start",height:"100%"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"0.2vw",justifyContent:"start",marginBottom:"1vh"},children:e.jsx(ee,{children:"Upload Test Marks"})}),R?e.jsxs(vn,{children:[e.jsxs(xn,{children:[e.jsx(Jt,{style:{fontSize:"1.2vw",color:"#FFB942"}}),e.jsxs("div",{children:[e.jsx(yn,{children:R.name}),e.jsx(bn,{children:Ut(R.size)})]})]}),e.jsx(wn,{onClick:Ot,children:e.jsx(nt,{style:{fontSize:"1vw"}})})]}):e.jsxs(gn,{isDragOver:yt,onDragOver:Pt,onDragLeave:Lt,onDrop:Nt,style:{marginTop:"0.6vh",marginBottom:"0.6vh"},onClick:()=>document.getElementById("file-input").click(),children:[e.jsx(fn,{children:e.jsx(tt,{})}),e.jsx(pn,{children:"Drag & drop Excel file here or click to browse"}),e.jsx(mn,{id:"file-input",type:"file",accept:".xls,.xlsx,.xlsm,.xltx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",onChange:$t})]}),Me&&e.jsx(g,{style:{marginTop:"1vh"},children:Me}),K>0&&K<100&&e.jsx(Sn,{children:e.jsx(Fn,{progress:K})}),e.jsx(jn,{onClick:Ht,disabled:!R||Ie,children:Ie?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:[e.jsx(G,{}),"Uploading... ",K,"%"]}):e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw"},children:[e.jsx(tt,{}),"Upload Excel"]})})]})})]}),e.jsxs(ln,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5vh"},children:[e.jsx(ee,{style:{marginBottom:0},children:"Post Announcement"}),e.jsxs(Se,{type:"button",onClick:Tt,children:[e.jsx(st,{}),"Announcement History"]})]}),e.jsx(U,{style:{marginTop:0,marginBottom:"1.5vh",color:"#626060"},children:"Create and publish important notices instantly."}),e.jsxs(ct,{as:"form",onSubmit:Et,children:[e.jsxs(b,{children:[e.jsx(w,{htmlFor:"announcement-title",children:"Title"}),e.jsx(dt,{id:"announcement-title",name:"title",value:m.title,onChange:$,placeholder:"e.g. School closed tomorrow",maxLength:120,disabled:A}),d.title&&e.jsx(g,{children:d.title})]}),e.jsxs(b,{children:[e.jsx(w,{htmlFor:"announcement-description",children:"Description"}),e.jsx(ut,{id:"announcement-description",name:"description",value:m.description,onChange:$,placeholder:"Enter announcement details...",maxLength:1e3,disabled:A,style:{minHeight:"20vh"}}),d.description&&e.jsx(g,{children:d.description})]}),e.jsxs(b,{children:[e.jsx(w,{htmlFor:"announcement-target",children:"Target Audience"}),e.jsx(D,{id:"announcement-target",name:"target_audience",value:m.target_audience,onChange:$,disabled:A,children:ne.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))}),d.target_audience&&e.jsx(g,{children:d.target_audience})]}),e.jsxs(b,{children:[e.jsx(w,{htmlFor:"announcement-category",children:"Category"}),e.jsx(D,{id:"announcement-category",name:"category",value:m.category,onChange:$,disabled:A,children:H.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))}),d.category&&e.jsx(g,{children:d.category})]}),se(m.target_audience)&&e.jsxs(b,{children:[e.jsx(w,{htmlFor:"announcement-class",children:"Class"}),e.jsxs(D,{id:"announcement-class",name:"class_name",value:m.class_name,onChange:$,disabled:A||I,children:[e.jsx("option",{value:"",children:"Select Class"}),c.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),d.class_name&&e.jsx(g,{children:d.class_name})]}),oe(m.target_audience)&&e.jsxs(b,{children:[e.jsx(w,{htmlFor:"announcement-section",children:"Section"}),e.jsxs(D,{id:"announcement-section",name:"section",value:m.section,onChange:$,disabled:A||I||!m.class_name,children:[e.jsx("option",{value:"",children:m.class_name?"Select Section":"Select a class first"}),He.map(t=>e.jsx("option",{value:t.id,children:et(t,He)},t.id))]}),d.section&&e.jsx(g,{children:d.section})]}),d.general&&e.jsx(g,{children:d.general}),e.jsx(ht,{type:"submit",disabled:A,children:A?e.jsxs(e.Fragment,{children:[e.jsx(G,{}),"Posting..."]}):e.jsxs(e.Fragment,{children:[e.jsx(Wt,{}),"Publish Announcement"]})})]}),z&&e.jsxs(cn,{style:{marginTop:"2vh"},children:[e.jsxs(gt,{children:[e.jsx(Vt,{}),"Latest Announcement"]}),e.jsxs(U,{style:{marginTop:0},children:[e.jsx("strong",{children:"Code:"})," ",z.code]}),e.jsxs(U,{style:{marginTop:"0.7vh"},children:[e.jsx("strong",{children:"Title:"})," ",z.title]}),e.jsxs(U,{style:{marginTop:"0.7vh"},children:[e.jsx("strong",{children:"Audience:"})," ",we(z,j,f)]}),e.jsxs(U,{style:{marginTop:"0.7vh"},children:[e.jsx("strong",{children:"Category:"})," ",te(H,z.category||z.notification_type)]}),e.jsxs(U,{style:{marginTop:"0.7vh"},children:[e.jsx("strong",{children:"Posted:"})," ",N(z.date_posted)]})]})]}),bt&&e.jsx(Cn,{onClick:()=>he(!1),children:e.jsxs(_n,{onClick:t=>t.stopPropagation(),children:[e.jsxs(An,{children:[e.jsxs(kn,{children:[e.jsx(st,{}),"Announcement History"]}),e.jsxs("div",{style:{display:"flex",gap:"0.5vw"},children:[e.jsxs(Se,{type:"button",onClick:qe,disabled:Le,children:[e.jsx(Kt,{}),"Refresh"]}),e.jsxs(Se,{type:"button",onClick:()=>he(!1),children:[e.jsx(nt,{}),"Close"]})]})]}),e.jsxs(En,{children:[e.jsxs(Tn,{children:[e.jsxs(Bn,{children:[e.jsx(Xt,{style:{color:"#777"}}),e.jsx(Dn,{placeholder:"Search by title, code, audience...",value:Pe,onChange:t=>jt(t.target.value)})]}),$e&&e.jsx(g,{children:$e}),Le?e.jsx(je,{children:"Loading announcements..."}):Ge.length===0?e.jsx(je,{children:"No announcements found."}):e.jsx(In,{children:Ge.map(t=>e.jsxs(zn,{active:L===t.id,children:[e.jsx(Mn,{children:t.title||"Untitled Announcement"}),e.jsxs(ft,{children:[t.code," | ",we(t,j,f)," | ",te(H,t.category||t.notification_type)," | ",N(t.date_posted)]}),e.jsx(ft,{children:t.description||"No description"}),e.jsx(Rn,{children:e.jsxs(Pn,{type:"button",onClick:()=>Dt(t),children:[e.jsx(be,{}),"Edit"]})})]},t.id))})]}),e.jsxs(Ln,{children:[e.jsxs(gt,{style:{marginBottom:"1.4vh"},children:[e.jsx(be,{}),"Edit Announcement"]}),L?e.jsxs(ct,{as:"form",onSubmit:It,children:[e.jsxs(b,{children:[e.jsx(w,{htmlFor:"edit-title",children:"Title"}),e.jsx(dt,{id:"edit-title",name:"title",value:p.title,onChange:O,maxLength:120,disabled:k}),d.title&&e.jsx(g,{children:d.title})]}),e.jsxs(b,{children:[e.jsx(w,{htmlFor:"edit-description",children:"Description"}),e.jsx(ut,{id:"edit-description",name:"description",value:p.description,onChange:O,maxLength:1e3,disabled:k,style:{minHeight:"24vh"}}),d.description&&e.jsx(g,{children:d.description})]}),e.jsxs(b,{children:[e.jsx(w,{htmlFor:"edit-target-audience",children:"Target Audience"}),e.jsx(D,{id:"edit-target-audience",name:"target_audience",value:p.target_audience,onChange:O,disabled:k,children:ne.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))}),d.target_audience&&e.jsx(g,{children:d.target_audience})]}),e.jsxs(b,{children:[e.jsx(w,{htmlFor:"edit-category",children:"Category"}),e.jsx(D,{id:"edit-category",name:"category",value:p.category,onChange:O,disabled:k,children:H.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))}),d.category&&e.jsx(g,{children:d.category})]}),se(p.target_audience)&&e.jsxs(b,{children:[e.jsx(w,{htmlFor:"edit-class-name",children:"Class"}),e.jsxs(D,{id:"edit-class-name",name:"class_name",value:p.class_name,onChange:O,disabled:k||I,children:[e.jsx("option",{value:"",children:"Select Class"}),c.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]}),d.class_name&&e.jsx(g,{children:d.class_name})]}),oe(p.target_audience)&&e.jsxs(b,{children:[e.jsx(w,{htmlFor:"edit-section-name",children:"Section"}),e.jsxs(D,{id:"edit-section-name",name:"section",value:p.section,onChange:O,disabled:k||I||!p.class_name,children:[e.jsx("option",{value:"",children:p.class_name?"Select Section":"Select a class first"}),Ye.map(t=>e.jsx("option",{value:t.id,children:et(t,Ye)},t.id))]}),d.section&&e.jsx(g,{children:d.section})]}),d.general&&e.jsx(g,{children:d.general}),e.jsx(ht,{type:"submit",disabled:k,children:k?e.jsxs(e.Fragment,{children:[e.jsx(G,{}),"Updating..."]}):e.jsxs(e.Fragment,{children:[e.jsx(be,{}),"Update Announcement"]})})]}):e.jsx(je,{children:"Select an announcement to edit."})]})]})]})})]})};export{Wn as default};
