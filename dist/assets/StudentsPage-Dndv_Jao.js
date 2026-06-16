import{n as te,o as se,b as x,j as e,k as i,m as B}from"./index-Dw8q8pd0.js";import{F as f,a as oe,f as G,g as R,h as ae,i as de,c as C}from"./index-C9Urxevv.js";import{S as le}from"./SEO-YDGMfUwq.js";const n={primary:"#FFE5B9",secondary:"#FFE5B9",light:"#EFEFEF",dark:"#212529",success:"#CCFFC7",danger:"#FF8468"},ce=B`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,me=B`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,he=B`
  from { opacity: 0; transform: translateY(-10px); max-height: 0; }
  to { opacity: 1; transform: translateY(0); max-height: 500px; }
`,S=i.div`
  padding: 2rem;
  background-color: ${n.light};
  min-height: 100vh;
  width: 94vw;
  margin-left: ${s=>s.hiddenClassmobile?"0.9vw":"1vw"};
`,$=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
     margin-top: -1rem;
     margin-bottom: 1rem;
  }
`,D=i.h1`
  font-size: 1.8rem;
  color: ${n.dark};
  margin: 0;
  font-weight: 600;
`,M=i.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`,Y=i.input`
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  background: transparent;
`,ge=i.div`
  position: relative;
`,I=i.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.2s;
  position: relative;

  &:hover {
    background: #f1f1f1;
  }

  ${s=>s.active&&`
    background: ${n.primary};
    color: ${n.dark};
  `}
`,xe=i.span`
  background: ${n.danger};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  position: absolute;
  top: -5px;
  right: -5px;
`,pe=i.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  padding: 1.5rem;
  min-width: 300px;
  z-index: 1000;
  animation: ${he} 0.3s ease-out;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 400px;
  }
`,ue=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`,fe=i.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${n.dark};
  font-weight: 600;
`,be=i.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  color: #666;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`,l=i.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`,c=i.h4`
  margin: 0 0 0.8rem 0;
  font-size: 0.9rem;
  color: ${n.dark};
  font-weight: 600;
`,m=i.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`,o=i.button`
  padding: 0.4rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  ${s=>s.active&&`
    background: ${n.primary};
    border-color: ${n.primary};
    color: ${n.dark};
    font-weight: 500;
  `}
`,je=i.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`,P=i.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;

  ${s=>s.primary?`
    background: ${n.primary};
    color: ${n.dark};
    &:hover {
      background: #e6d4a3;
    }
  `:`
    background: #f5f5f5;
    color: #666;
    &:hover {
      background: #e5e5e5;
    }
  `}
`,ve=i.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: ${n.primary};
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${n.dark};
`,we=i.button`
  background: none;
  border: none;
  color: ${n.danger};
  cursor: pointer;
  font-size: 0.8rem;
  text-decoration: underline;
  margin-left: auto;

  &:hover {
    color: #d00000;
  }
`,ke=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  animation: ${ce} 0.5s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ye=i.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
`,Fe=i.div`
  position: relative;
  height: 120px;
  background: linear-gradient(135deg, ${n.primary}, ${n.secondary});
  display: flex;
  align-items: flex-end;
  padding: 1rem;
`,Ce=i.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  position: absolute;
  bottom: -40px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${n.primary};
  border: 4px solid white;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Se=i.div`
  padding: 3rem 1.5rem 1.5rem;
`,$e=i.h3`
  margin: 0;
  font-size: 1.3rem;
  color: ${n.dark};
  font-weight: 600;
`,b=i.p`
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  strong {
    color: ${n.dark};
    font-weight: 500;
  }
`,ze=i.div`
  height: 1px;
  background: #eee;
  margin: 1rem 0;
`,Be=i.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${s=>s.status==="admission"?n.success:n.danger};
  color: black;
`,Ee=i.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
`,z=i.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  background: ${s=>s.given?n.success:n.danger};
  color: black;
`,_e=i.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f9f9f9;
  border-top: 1px solid #eee;
`,T=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 1rem;
`,U=i.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(67, 97, 238, 0.2);
  border-radius: 50%;
  border-top-color: ${n.primary};
  animation: ${me} 1.5s ease-in-out infinite;
`,H=i.p`
  font-size: 1rem;
  color: #666;
`,Ae=i.div`
  padding: 2rem;
  background: rgba(239, 35, 60, 0.1);
  border-radius: 8px;
  color: ${n.danger};
  text-align: center;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`,Le=i.button`
  padding: 0.5rem 1.5rem;
  background: ${n.danger};
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #d00000;
  }
`,Ne=i.div`
  padding: 3rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  margin: 2rem 0;

  h3 {
    color: ${n.dark};
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    max-width: 500px;
    margin: 0 auto;
  }
`,Me=()=>{const{students:s,loading:O,error:E,isRefreshing:_,refreshStudents:V,getFilteredStudents:W,getUniqueValues:p}=te(),{academicYears:q,selectedAcademicYear:w,setSelectedAcademicYear:X}=se(),[k,A]=x.useState(""),[h,j]=x.useState(!1),[y,J]=x.useState(""),[t,F]=x.useState({batch:"",class:"",group:"",section:"",status:"",hasPendingFees:!1,materials:{books:null,uniform:null,bag:null}}),K=p("batch"),Q=p("class"),Z=p("group"),ee=p("section"),re=p("status");x.useEffect(()=>{const r=()=>{J(window.innerWidth<767?"hidden":"")};return window.addEventListener("resize",r),r(),()=>{window.removeEventListener("resize",r)}},[]),x.useEffect(()=>{const r=a=>{h&&!a.target.closest(".filter-container")&&j(!1)};return document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[h]);const ie=()=>{V()},u=(r,a)=>{F(d=>({...d,[r]:d[r]===a?"":a}))},g=(r,a)=>{F(d=>({...d,materials:{...d.materials,[r]:d.materials[r]===a?null:a}}))},L=()=>{F({batch:"",class:"",group:"",section:"",status:"",hasPendingFees:!1,materials:{books:null,uniform:null,bag:null}}),A("")},v=()=>{let r=0;return k&&r++,t.batch&&r++,t.class&&r++,t.group&&r++,t.section&&r++,t.status&&r++,t.hasPendingFees&&r++,t.materials.books!==null&&r++,t.materials.uniform!==null&&r++,t.materials.bag!==null&&r++,r},N=W({searchTerm:k,...t}),ne=r=>r.split(" ").map(d=>d[0]).join("").toUpperCase();return E?e.jsxs(S,{hiddenClassmobile:y,children:[e.jsx($,{children:e.jsx(D,{children:"Students"})}),e.jsxs(Ae,{children:[e.jsx(f,{size:24}),E,e.jsxs(Le,{onClick:ie,children:[e.jsx(oe,{size:16}),"Retry"]})]})]}):O&&!_?e.jsxs(S,{hiddenClassmobile:y,children:[e.jsxs($,{children:[e.jsx(D,{children:"Students"}),e.jsxs(M,{children:[e.jsx(G,{}),e.jsx(Y,{placeholder:"Search students...",disabled:!0})]}),e.jsxs(I,{disabled:!0,children:[e.jsx(R,{}),"Filter"]})]}),e.jsxs(T,{children:[e.jsx(U,{}),e.jsx(H,{children:"Loading students..."})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(le,{title:"Students Management",description:"Comprehensive student management system. View, search, and manage student records, attendance, and academic information.",keywords:"student management, student records, student search, academic records, school students",structuredData:{"@context":"https://schema.org","@type":"WebPage",name:"Students Management",description:"Comprehensive student management system for viewing and managing student records.",url:"https://spoorthi-crm.netlify.app/Students",mainEntity:{"@type":"ItemList",name:"Students List",description:"List of all students in the school"}}}),e.jsxs(S,{hiddenClassmobile:y,children:[e.jsxs($,{children:[e.jsxs(M,{children:[e.jsx(G,{}),e.jsx(Y,{type:"text",placeholder:"Search students...",value:k,onChange:r=>A(r.target.value)})]}),e.jsxs(ge,{className:"filter-container",children:[e.jsxs(I,{onClick:()=>j(!h),active:h,children:[e.jsx(R,{}),"Filter",v()>0&&e.jsx(xe,{children:v()}),h?e.jsx(ae,{}):e.jsx(de,{})]}),h&&e.jsxs(pe,{children:[e.jsxs(ue,{children:[e.jsx(fe,{children:"Filters"}),e.jsx(be,{onClick:()=>j(!1),children:e.jsx(f,{})})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Academic Year"}),e.jsx(m,{children:q.map(r=>e.jsx(o,{active:(w==null?void 0:w.id)===r.id,onClick:()=>X(r.id),children:r.name},r.id))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Batch"}),e.jsx(m,{children:K.map(r=>e.jsx(o,{active:t.batch===r,onClick:()=>u("batch",r),children:r},r))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Class"}),e.jsx(m,{children:Q.map(r=>e.jsx(o,{active:t.class===r,onClick:()=>u("class",r),children:r},r))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Group"}),e.jsx(m,{children:Z.map(r=>e.jsx(o,{active:t.group===r,onClick:()=>u("group",r),children:r},r))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Section"}),e.jsx(m,{children:ee.map(r=>e.jsx(o,{active:t.section===r,onClick:()=>u("section",r),children:r},r))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Status"}),e.jsx(m,{children:re.map(r=>e.jsx(o,{active:t.status===r,onClick:()=>u("status",r),children:r},r))})]}),e.jsxs(l,{children:[e.jsx(c,{children:"Materials"}),e.jsxs(m,{children:[e.jsx(o,{active:t.materials.books===!0,onClick:()=>g("books",!0),children:"Books Given"}),e.jsx(o,{active:t.materials.books===!1,onClick:()=>g("books",!1),children:"Books Not Given"}),e.jsx(o,{active:t.materials.uniform===!0,onClick:()=>g("uniform",!0),children:"Uniform Given"}),e.jsx(o,{active:t.materials.uniform===!1,onClick:()=>g("uniform",!1),children:"Uniform Not Given"}),e.jsx(o,{active:t.materials.bag===!0,onClick:()=>g("bag",!0),children:"Bag Given"}),e.jsx(o,{active:t.materials.bag===!1,onClick:()=>g("bag",!1),children:"Bag Not Given"})]})]}),e.jsxs(je,{children:[e.jsx(P,{onClick:L,children:"Clear All"}),e.jsx(P,{primary:!0,onClick:()=>j(!1),children:"Apply Filters"})]})]})]})]}),v()>0&&e.jsxs(ve,{children:[e.jsxs("span",{children:["Active filters: ",v()]}),e.jsx(we,{onClick:L,children:"Clear all"})]}),_?e.jsxs(T,{children:[e.jsx(U,{}),e.jsx(H,{children:"Refreshing data..."})]}):N.length===0?e.jsxs(Ne,{children:[e.jsx("h3",{children:"No students found"}),e.jsx("p",{children:"Try adjusting your search or filters."})]}):e.jsx(ke,{children:N.map(r=>{var a;return e.jsxs(ye,{children:[e.jsx(Fe,{children:e.jsx(Ce,{children:r.photo?e.jsx("img",{src:r.photo,alt:r.name}):ne(r.name)})}),e.jsxs(Se,{children:[e.jsx($e,{children:r.name}),e.jsxs(b,{children:[e.jsx("strong",{children:"Admission No:"})," ",r.admission_no]}),e.jsxs(b,{children:[e.jsx("strong",{children:"Father:"})," ",r.father_name||"N/A"]}),e.jsxs(b,{children:[e.jsx("strong",{children:"Phone:"})," ",r.phone_numbers.join(", ")||"N/A"]}),e.jsx(ze,{}),e.jsxs(b,{children:[e.jsx("strong",{children:"Class:"})," ",((a=r.class_name)==null?void 0:a.name)||"N/A"," (",r.batch,")"]}),e.jsxs(b,{children:[e.jsx("strong",{children:"Group:"})," ",r.group||"N/A"]}),e.jsxs(Ee,{children:[e.jsxs(z,{given:r.is_bookes_given,children:[r.is_bookes_given?e.jsx(C,{}):e.jsx(f,{}),"Books"]}),e.jsxs(z,{given:r.is_uniform_given,children:[r.is_uniform_given?e.jsx(C,{}):e.jsx(f,{}),"Uniform"]}),e.jsxs(z,{given:r.is_bag_given,children:[r.is_bag_given?e.jsx(C,{}):e.jsx(f,{}),"Bag"]})]})]}),e.jsx(_e,{children:e.jsx(Be,{status:r.status,children:r.status})})]},r.id)})})]})]})};export{Me as default};
