import{b as u,j as e,R as D,i as S,k as t,m as $}from"./index-fkiekIN7.js";import{A as E}from"./add-DFGXhUn7.js";import"./jspdf.plugin.autotable-HhFt6zHb.js";const _=t.div`
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

  @media (max-width: 768px) {
    align-items: flex-start;
    padding: 0;
  }
`,z=t.div`
  position: absolute;
  right: 0;
  background: linear-gradient(135deg, #FFE6BB 0%, #FFD89B 50%, #FFC97A 100%);
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
`,B=t.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding-right: 1rem;
  }

  @media (max-width: 480px) {
    margin-left: 0.75rem;
    margin-top: 0.75rem;
    gap: 0.5rem;
    padding-right: 0.75rem;
  }
`,H=t.button`
  padding: 0.8vh 1.2vw;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 0.5vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5vw;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
  margin-right: 0.8vw;
  border: 2px solid transparent;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1rem;
    font-size: 0.85rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    gap: 0.4rem;
    min-height: 40px;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.85rem;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    margin-right: 0.4rem;
    gap: 0.3rem;
    min-height: 38px;
  }
`,N=t.button`
  padding: 0.8vh 1.2vw;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
  color: white;
  border: none;
  border-radius: 0.5vw;
  font-family: "Roboto", sans-serif;
  font-size: 0.7vw;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5vw;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
  margin-right: 1.5vw;
  border: 2px solid transparent;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #FF5252 0%, #FF1744 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(255, 107, 107, 0.3);
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1rem;
    font-size: 0.85rem;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    gap: 0.4rem;
    min-height: 40px;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.85rem;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    margin-right: 0.4rem;
    gap: 0.3rem;
    min-height: 38px;
  }
`;t.h2`
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #333 0%, #555 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: "Comfortaa", sans-serif;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;const P=t.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 2vh;
  padding-right: 2vw;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-top: 0.75rem;
  }
`,L=t.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background: linear-gradient(135deg, #FEA592 0%, #FF7E62 100%);
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(254, 165, 146, 0.3);
  flex-shrink: 0;

  &:hover {
    background: linear-gradient(135deg, #FF7E62 0%, #FF6745 100%);
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 6px 20px rgba(254, 165, 146, 0.4);
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
`,V=$`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,O=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 20px;
`,Y=t.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${V} 1s ease-in-out infinite;
`,I=t.p`
  font-size: 1.2rem;
  color: #666;
  font-family: "Roboto", sans-serif;
`,U=t.div`
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
  font-family: "Roboto", sans-serif;
`,W=t.button`
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
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: #f0f0f0;
  }
`,G=t.div`
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 1.5vh 1.5vw;
  margin-bottom: 1.5vh;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  border: 1px solid rgba(255, 185, 66, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    border-radius: 0.5rem;
  }
`,Z=t.h3`
  font-family: "Comfortaa", sans-serif;
  font-size: 1.2vw;
  font-weight: 700;
  background: linear-gradient(135deg, #000 0%, #333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1vh 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #FFB942 0%, #FF7E62 100%);
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin: 0 0 0.4rem 0;
  }
`,q=t.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  color: #666;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`,J=t.div`
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 1.5vh 1.5vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  border: 1px solid rgba(255, 185, 66, 0.1);
  overflow-x: auto;
  max-height: 65vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 0.75rem;
    max-height: calc(100vh - 200px);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 0.5rem;
    max-height: calc(100vh - 180px);
  }
`,K=t.div`
  margin-bottom: 1.5vh;
  padding: 1.5vh 1.2vw;
  background: linear-gradient(135deg, #fff 0%, #fafbfc 100%);
  border-radius: 12px;
  border: 1px solid #e3e6ea;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    border: 1px solid rgba(255, 185, 66, 0.3);
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 0.75rem;
    padding: 0.85rem;
    border-radius: 0.5rem;
  }
`,Q=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;
  padding-bottom: 0.8vh;
  border-bottom: 1px solid #f0f0f0;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.6rem;
    padding-bottom: 0.6rem;
  }
`,X=t.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 0.75rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`,ee=t.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
    width: 100%;
  }
`,te=t.h4`
  margin: 0 0 0.3vh 0;
  font-family: "Comfortaa", sans-serif;
  font-size: 1vw;
  color: #000;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 0 0.3rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 0 0.25rem 0;
  }
`,ae=t.p`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`,re=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.1vw;
  font-weight: 600;
  color: #000;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`,oe=t.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.85vw;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`,ie=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
  align-items: center;
  line-height: 1.6;

  @media (max-width: 768px) {
    gap: 0.6rem;
    margin-top: 0.6rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`,ne=t.span`
  font-family: "Roboto", sans-serif;
  font-size: 0.75vw;
  color: #000;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`,se=t.span`
  color: #999;
  margin: 0 0.3rem;

  @media (max-width: 768px) {
    margin: 0 0.25rem;
  }

  @media (max-width: 480px) {
    margin: 0 0.2rem;
  }
`,de=t.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${c=>c.color||"#4CAF50"};
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 480px) {
    width: 9px;
    height: 9px;
  }
`;t.span`
  font-family: "Roboto", sans-serif;
  color: #F44336;
  font-weight: 600;
  font-size: 0.7vw;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;t.span`
  font-family: "Roboto", sans-serif;
  color: #666;
  font-weight: 500;
  font-size: 0.75vw;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;t.span`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  color: ${c=>c.color||"#666"};
  font-size: 0.75vw;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;t.span`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: ${c=>c.color||"#666"};
  font-size: 0.65vw;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;t.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Roboto", sans-serif;
`;t.th`
  text-align: left;
  padding: 1.5vh 1vw;
  background-color: #F0F0F0;
  font-weight: 500;
  font-size: 0.8vw;
  color: #000;
  border-bottom: 1px solid #ddd;
`;const le=t.td`
  padding: 1.5vh 1vw;
  font-size: 0.75vw;
  color: #333;
  border-bottom: 1px solid #eee;
`;t(le)`
  font-weight: 500;
  color: ${c=>{const g=parseFloat(c.marksObtained)/parseFloat(c.totalMarks)*100;return g>=90?"#2E7D32":g>=80?"#388E3C":g>=70?"#FF8F00":g>=60?"#F57C00":"#D32F2F"}};
`;const me=t.div`
  text-align: center;
  padding: 4vh 2vw;
  color: #666;
  font-family: "Roboto", sans-serif;
  font-size: 0.9vw;
`,he=({onClose:c,studentId:g,studentName:b})=>{const[h,A]=u.useState([]),[R,F]=u.useState(!0),[y,C]=u.useState(null),v=r=>r?r.split("_").map(l=>l.charAt(0).toUpperCase()+l.slice(1)).join(" "):"Test";u.useEffect(()=>{g&&(async()=>{try{F(!0);const l=localStorage.getItem("token"),s=await S.get(`https://spoorthischool.genzix.space/masters/test-marks/student/${g}/`,{headers:{Authorization:`Bearer ${l}`}});if(s.data.status==="success"){const f=s.data.data.map(m=>{if(!m.subject_marks||!Array.isArray(m.subject_marks)||m.subject_marks.length===0)return{...m,marks_obtained:"0.00",total_marks:"0.00",overall_percentage:"0.0",best_subject:null,message_sent:!1};const a=m.subject_marks.reduce((p,d)=>p+(parseFloat(d.marks_obtained)||0),0),i=m.subject_marks.reduce((p,d)=>p+(parseFloat(d.total_marks)||0),0),o=m.subject_marks.reduce((p,d)=>{const w=i>0?parseFloat(d.marks_obtained||0)/parseFloat(d.total_marks||1)*100:0,j=i>0?parseFloat(p.marks_obtained||0)/parseFloat(p.total_marks||1)*100:0;return w>j?d:p}),n=i>0?a/i*100:0;return{...m,marks_obtained:a.toFixed(2),total_marks:i.toFixed(2),overall_percentage:n.toFixed(1),best_subject:o,message_sent:!1}}).sort((m,a)=>new Date(m.test_date)-new Date(a.test_date)).reverse();A(f)}}catch(l){console.error("Failed to fetch test marks",l),C("Failed to load test marks. Please try again.")}finally{F(!1)}})()},[g]);const k=r=>r?new Date(r).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}):"N/A",M=()=>{if(h.length===0){alert("No test marks available to download");return}const r=new Set;h.forEach(o=>{o.subject_marks&&o.subject_marks.length>0&&o.subject_marks.forEach(n=>{r.add(n.subject)})});const l=Array.from(r).sort(),s=["Test Name","Test Date",...l.flatMap(o=>[`${o} Marks`,`${o} Rank`]),"Obtained Marks","Total Marks","Rank"],x=[];h.forEach(o=>{const n=[v(o.test_name),k(o.test_date)];l.forEach(p=>{var w;const d=(w=o.subject_marks)==null?void 0:w.find(j=>j.subject===p);d?d.is_absent?n.push("AB",""):n.push(`${parseFloat(d.marks_obtained||0).toFixed(0)}/${parseFloat(d.total_marks||0).toFixed(0)}`,d.rank||"N/A"):n.push("","")}),n.push(parseFloat(o.marks_obtained||0).toFixed(0),parseFloat(o.total_marks||0).toFixed(0),o.rank||"N/A"),x.push(n)});const f=[s.join(","),...x.map(o=>o.map(n=>`"${n}"`).join(","))].join(`
`),m=new Blob([f],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a"),i=URL.createObjectURL(m);a.setAttribute("href",i),a.setAttribute("download",`${b}_Test_Marks_${new Date().toISOString().split("T")[0]}.csv`),a.style.visibility="hidden",document.body.appendChild(a),a.click(),document.body.removeChild(a)},T=()=>{try{if(h.length===0){alert("No test marks available to print");return}console.log("Starting print generation...");const r=new Set;h.forEach(a=>{a.subject_marks&&a.subject_marks.length>0&&a.subject_marks.forEach(i=>{r.add(i.subject)})});const l=Array.from(r).sort();console.log("Subjects found:",l);const s=window.open("","_blank","width=800,height=600");if(!s){alert("Please allow popups to print the report");return}const x=["Test Name","Test Date",...l.flatMap(a=>[`${a} Marks`,`${a} Rank`]),"Obtained Marks","Total Marks","Rank"],f=h.map(a=>{const i=[v(a.test_name),k(a.test_date)];return l.forEach(o=>{var p;const n=(p=a.subject_marks)==null?void 0:p.find(d=>d.subject===o);n?n.is_absent?i.push("AB",""):i.push(`${parseFloat(n.marks_obtained||0).toFixed(0)}/${parseFloat(n.total_marks||0).toFixed(0)}`,(n.rank||"N/A").toString()):i.push("","")}),i.push(parseFloat(a.marks_obtained||0).toFixed(0),parseFloat(a.total_marks||0).toFixed(0),(a.rank||"N/A").toString()),i}),m=`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${b} - Test Marks Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              color: #000;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #000;
              padding-bottom: 15px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #000;
              margin-bottom: 5px;
            }
            .subtitle {
              font-size: 14px;
              color: #000;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 12px;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f0f0f0;
              color: #000;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .test-name {
              text-align: left;
              font-weight: 500;
            }
            .date {
              text-align: center;
            }
            @media print {
              body { margin: 0; }
              .header { page-break-after: avoid; }
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
              * { -webkit-print-color-adjust: exact; color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${b} - Test Marks Report</div>
            <div class="subtitle">Generated on: ${new Date().toLocaleDateString()}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                ${x.map(a=>`<th>${a}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${f.map(a=>`
                <tr>
                  <td class="test-name">${a[0]}</td>
                  <td class="date">${a[1]}</td>
                  ${a.slice(2).map(i=>`<td>${i}</td>`).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
        </html>
      `;s.document.write(m),s.document.close(),s.onload=()=>{setTimeout(()=>{s.print(),s.onafterprint=()=>{s.close()}},250)},console.log("Print dialog opened")}catch(r){console.error("Error generating print report:",r),alert("Error generating print report. Please check the console for details.")}};return R?e.jsx(_,{children:e.jsx(z,{children:e.jsxs(O,{children:[e.jsx(Y,{}),e.jsx(I,{children:"Loading test marks..."})]})})}):e.jsx(_,{children:e.jsxs(z,{children:[e.jsxs(B,{children:[e.jsx(L,{onClick:c,children:e.jsx("img",{src:E,style:{height:"1.8vh",transform:"rotate(-45deg)"},alt:"Close"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5vw",flexWrap:"wrap"},children:[e.jsxs(H,{onClick:M,children:[e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"})}),"Download CSV"]}),e.jsxs(N,{onClick:T,children:[e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z"})}),"Print Report"]})]})]}),e.jsx(P,{children:y?e.jsxs(U,{children:[y,e.jsx(W,{onClick:()=>window.location.reload(),children:"Retry"})]}):e.jsxs(e.Fragment,{children:[e.jsxs(G,{children:[e.jsx(Z,{children:b}),e.jsxs(q,{children:["Total Tests: ",h.length]})]}),e.jsx(J,{children:h.length>0?e.jsx("div",{children:h.map((r,l)=>{const s=parseFloat(r.overall_percentage)>=80?"#4CAF50":parseFloat(r.overall_percentage)>=60?"#FF9800":"#F44336";return e.jsxs(K,{children:[e.jsx("div",{style:{position:"absolute",top:0,right:0,width:"0",height:"0",borderStyle:"solid",borderWidth:"0 20px 20px 0",borderColor:`transparent ${s} transparent transparent`,opacity:.8}}),e.jsxs(Q,{children:[e.jsxs(X,{children:[e.jsx(de,{color:s}),e.jsxs("div",{children:[e.jsx(te,{children:v(r.test_name)}),e.jsxs(ae,{children:[k(r.test_date)," • Rank: ",r.rank||"N/A"]})]})]}),e.jsxs(ee,{children:[e.jsxs(re,{children:[parseFloat(r.marks_obtained||0).toFixed(0),"/",parseFloat(r.total_marks||0).toFixed(0)]}),e.jsxs(oe,{children:[r.overall_percentage,"%"]})]})]}),r.subject_marks&&r.subject_marks.length>0?e.jsx(ie,{children:r.subject_marks.map((x,f)=>e.jsxs(D.Fragment,{children:[f>0&&e.jsx(se,{children:"•"}),e.jsxs(ne,{children:[x.subject," = ",x.is_absent?"AB":parseFloat(x.marks_obtained||0).toFixed(0)]})]},x.id))}):e.jsx("div",{style:{textAlign:"center",color:"#666",fontFamily:'"Roboto", sans-serif',fontSize:"0.75vw",padding:"1.5vh 0",background:"rgba(255, 185, 66, 0.05)",borderRadius:"6px",border:"1px dashed rgba(255, 185, 66, 0.3)"},children:"No subject details available"})]},r.id)})}):e.jsx(me,{children:"No test marks available for this student."})})]})})]})})};export{he as T};
