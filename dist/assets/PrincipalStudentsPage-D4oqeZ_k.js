import{l as ae,n as se,o as oe,b as h,j as e,k as r,m as _}from"./index-DLjENkrc.js";import{F as f,a as de,f as G,g as R,h as le,i as me,c as C}from"./index-BGtRKvl8.js";import{S as ce}from"./SEO-C7GKnlqh.js";const t={primary:"#FFE5B9",secondary:"#FFE5B9",light:"#EFEFEF",dark:"#212529",success:"#CCFFC7",danger:"#FF8468"},pe=_`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,xe=_`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,he=_`
  from { opacity: 0; transform: translateY(-10px); max-height: 0; }
  to { opacity: 1; transform: translateY(0); max-height: 500px; }
`,S=r.div`
  padding: 2rem;
  background-color: ${t.light};
  min-height: 100vh;
  width: 94vw;
  margin-left: ${a=>a.hiddenClassmobile?"0.9vw":"1vw"};

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100% !important;
    margin-left: 0;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`,z=r.div`
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
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-top: -0.5rem;
    margin-bottom: 0.75rem;
    gap: 0.5rem;
  }
`,$=r.h1`
  font-size: 1.8rem;
  color: ${t.dark};
  margin: 0;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`,Y=r.div`
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
    padding: 0.5rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    border-radius: 30px;
  }
`,D=r.input`
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  background: transparent;
`,ge=r.div`
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`,M=r.button`
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

  ${a=>a.active&&`
    background: ${t.primary};
    color: ${t.dark};
  `}

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.9rem;
    font-size: 0.85rem;
    border-radius: 30px;
  }
`,ue=r.span`
  background: ${t.danger};
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
`,fe=r.div`
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
    width: 90%;
    max-width: 400px;
    box-sizing: border-box;
  }
`,be=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`,je=r.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${t.dark};
  font-weight: 600;
`,we=r.button`
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
`,l=r.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`,m=r.h4`
  margin: 0 0 0.8rem 0;
  font-size: 0.9rem;
  color: ${t.dark};
  font-weight: 600;
`,c=r.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`,s=r.button`
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

  ${a=>a.active&&`
    background: ${t.primary};
    border-color: ${t.primary};
    color: ${t.dark};
    font-weight: 500;
  `}
`,ve=r.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`,T=r.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;

  ${a=>a.primary?`
    background: ${t.primary};
    color: ${t.dark};
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
`,ke=r.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: ${t.primary};
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${t.dark};
`,ye=r.button`
  background: none;
  border: none;
  color: ${t.danger};
  cursor: pointer;
  font-size: 0.8rem;
  text-decoration: underline;
  margin-left: auto;

  &:hover {
    color: #d00000;
  }
`,Fe=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  animation: ${pe} 0.5s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`,Ce=r.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  min-width: 0;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  }

  @media (max-width: 768px) {
    border-radius: 8px;
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
`,Se=r.div`
  position: relative;
  height: 120px;
  background: linear-gradient(135deg, ${t.primary}, ${t.secondary});
  display: flex;
  align-items: flex-end;
  padding: 1rem;

  @media (max-width: 768px) {
    height: 100px;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    height: 90px;
    padding: 0.5rem;
  }
`,ze=r.div`
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
  color: ${t.primary};
  border: 4px solid white;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    bottom: -35px;
    left: 16px;
    font-size: 1.5rem;
    border: 3px solid white;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    bottom: -30px;
    left: 12px;
    font-size: 1.2rem;
    border: 3px solid white;
  }
`,$e=r.div`
  padding: 3rem 1.5rem 1.5rem;

  @media (max-width: 768px) {
    padding: 2.5rem 1rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.75rem 0.75rem;
  }
`,Be=r.h3`
  margin: 0;
  font-size: 1.3rem;
  color: ${t.dark};
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`,b=r.p`
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  strong {
    color: ${t.dark};
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin: 0.4rem 0;
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 0.3rem 0;
    gap: 0.3rem;
  }
`,_e=r.div`
  height: 1px;
  background: #eee;
  margin: 1rem 0;

  @media (max-width: 768px) {
    margin: 0.75rem 0;
  }

  @media (max-width: 480px) {
    margin: 0.5rem 0;
  }
`,Ae=r.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${a=>a.status==="admission"?t.success:t.danger};
  color: black;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
`,Ee=r.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`,B=r.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  background: ${a=>a.given?t.success:t.danger};
  color: black;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    gap: 0.25rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    gap: 0.2rem;
  }
`,Ne=r.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f9f9f9;
  border-top: 1px solid #eee;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
  }
`,U=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 1rem;
`,I=r.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(67, 97, 238, 0.2);
  border-radius: 50%;
  border-top-color: ${t.primary};
  animation: ${xe} 1.5s ease-in-out infinite;
`,H=r.p`
  font-size: 1rem;
  color: #666;
`,Pe=r.div`
  padding: 2rem;
  background: rgba(239, 35, 60, 0.1);
  border-radius: 8px;
  color: ${t.danger};
  text-align: center;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`,Le=r.button`
  padding: 0.5rem 1.5rem;
  background: ${t.danger};
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
`,Ge=r.div`
  padding: 3rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  margin: 2rem 0;

  h3 {
    color: ${t.dark};
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    max-width: 500px;
    margin: 0 auto;
  }
`,Te=()=>{const a=ae(),{students:Re,loading:O,error:A,isRefreshing:E,refreshStudents:V,getFilteredStudents:W,getUniqueValues:g}=se(),{academicYears:q,selectedAcademicYear:v,setSelectedAcademicYear:X}=oe(),[k,N]=h.useState(""),[p,j]=h.useState(!1),[y,J]=h.useState(""),[n,F]=h.useState({batch:"",class:"",group:"",section:"",status:"",hasPendingFees:!1,materials:{books:null,uniform:null,bag:null}}),K=g("batch"),Q=g("class"),Z=g("group"),ee=g("section"),ie=g("status");h.useEffect(()=>{const i=()=>{J(window.innerWidth<767?"hidden":"")};return window.addEventListener("resize",i),i(),()=>{window.removeEventListener("resize",i)}},[]),h.useEffect(()=>{const i=o=>{p&&!o.target.closest(".filter-container")&&j(!1)};return document.addEventListener("mousedown",i),()=>document.removeEventListener("mousedown",i)},[p]);const re=()=>{V()},u=(i,o)=>{F(d=>({...d,[i]:d[i]===o?"":o}))},x=(i,o)=>{F(d=>({...d,materials:{...d.materials,[i]:d.materials[i]===o?null:o}}))},P=()=>{F({batch:"",class:"",group:"",section:"",status:"",hasPendingFees:!1,materials:{books:null,uniform:null,bag:null}}),N("")},w=()=>{let i=0;return k&&i++,n.batch&&i++,n.class&&i++,n.group&&i++,n.section&&i++,n.status&&i++,n.hasPendingFees&&i++,n.materials.books!==null&&i++,n.materials.uniform!==null&&i++,n.materials.bag!==null&&i++,i},L=W({searchTerm:k,...n}),te=i=>i.split(" ").map(d=>d[0]).join("").toUpperCase(),ne=i=>{a(`/principal/students/${i}`)};return A?e.jsxs(S,{hiddenClassmobile:y,children:[e.jsx(z,{children:e.jsx($,{children:"Students"})}),e.jsxs(Pe,{children:[e.jsx(f,{size:24}),A,e.jsxs(Le,{onClick:re,children:[e.jsx(de,{size:16}),"Retry"]})]})]}):O&&!E?e.jsxs(S,{hiddenClassmobile:y,children:[e.jsxs(z,{children:[e.jsx($,{children:"Students"}),e.jsxs(Y,{children:[e.jsx(G,{}),e.jsx(D,{placeholder:"Search students...",disabled:!0})]}),e.jsxs(M,{disabled:!0,children:[e.jsx(R,{}),"Filter"]})]}),e.jsxs(U,{children:[e.jsx(I,{}),e.jsx(H,{children:"Loading students..."})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(ce,{title:"Principal - Students Management",description:"Principal view for comprehensive student management. View, search, and manage student records, attendance, and academic information.",keywords:"principal, student management, student records, student search, academic records",structuredData:{"@context":"https://schema.org","@type":"WebPage",name:"Principal - Students Management",description:"Principal view for managing student records and attendance.",url:"https://spoorthi-crm.netlify.app/principal/students"}}),e.jsxs(S,{hiddenClassmobile:y,children:[e.jsxs(z,{children:[e.jsx($,{children:"Students"}),e.jsxs(Y,{children:[e.jsx(G,{}),e.jsx(D,{type:"text",placeholder:"Search students...",value:k,onChange:i=>N(i.target.value)})]}),e.jsxs(ge,{className:"filter-container",children:[e.jsxs(M,{onClick:()=>j(!p),active:p,children:[e.jsx(R,{}),"Filter",w()>0&&e.jsx(ue,{children:w()}),p?e.jsx(le,{}):e.jsx(me,{})]}),p&&e.jsxs(fe,{children:[e.jsxs(be,{children:[e.jsx(je,{children:"Filters"}),e.jsx(we,{onClick:()=>j(!1),children:e.jsx(f,{})})]}),e.jsxs(l,{children:[e.jsx(m,{children:"Academic Year"}),e.jsx(c,{children:q.map(i=>e.jsx(s,{active:(v==null?void 0:v.id)===i.id,onClick:()=>X(i.id),children:i.name},i.id))})]}),e.jsxs(l,{children:[e.jsx(m,{children:"Batch"}),e.jsx(c,{children:K.map(i=>e.jsx(s,{active:n.batch===i,onClick:()=>u("batch",i),children:i},i))})]}),e.jsxs(l,{children:[e.jsx(m,{children:"Class"}),e.jsx(c,{children:Q.map(i=>e.jsx(s,{active:n.class===i,onClick:()=>u("class",i),children:i},i))})]}),e.jsxs(l,{children:[e.jsx(m,{children:"Group"}),e.jsx(c,{children:Z.map(i=>e.jsx(s,{active:n.group===i,onClick:()=>u("group",i),children:i},i))})]}),e.jsxs(l,{children:[e.jsx(m,{children:"Section"}),e.jsx(c,{children:ee.map(i=>e.jsx(s,{active:n.section===i,onClick:()=>u("section",i),children:i},i))})]}),e.jsxs(l,{children:[e.jsx(m,{children:"Status"}),e.jsx(c,{children:ie.map(i=>e.jsx(s,{active:n.status===i,onClick:()=>u("status",i),children:i},i))})]}),e.jsxs(l,{children:[e.jsx(m,{children:"Materials"}),e.jsxs(c,{children:[e.jsx(s,{active:n.materials.books===!0,onClick:()=>x("books",!0),children:"Books Given"}),e.jsx(s,{active:n.materials.books===!1,onClick:()=>x("books",!1),children:"Books Not Given"}),e.jsx(s,{active:n.materials.uniform===!0,onClick:()=>x("uniform",!0),children:"Uniform Given"}),e.jsx(s,{active:n.materials.uniform===!1,onClick:()=>x("uniform",!1),children:"Uniform Not Given"}),e.jsx(s,{active:n.materials.bag===!0,onClick:()=>x("bag",!0),children:"Bag Given"}),e.jsx(s,{active:n.materials.bag===!1,onClick:()=>x("bag",!1),children:"Bag Not Given"})]})]}),e.jsxs(ve,{children:[e.jsx(T,{onClick:P,children:"Clear All"}),e.jsx(T,{primary:!0,onClick:()=>j(!1),children:"Apply Filters"})]})]})]})]}),w()>0&&e.jsxs(ke,{children:[e.jsxs("span",{children:["Active filters: ",w()]}),e.jsx(ye,{onClick:P,children:"Clear all"})]}),E?e.jsxs(U,{children:[e.jsx(I,{}),e.jsx(H,{children:"Refreshing data..."})]}):L.length===0?e.jsxs(Ge,{children:[e.jsx("h3",{children:"No students found"}),e.jsx("p",{children:"Try adjusting your search or filters."})]}):e.jsx(Fe,{children:L.map(i=>{var o;return e.jsxs(Ce,{onClick:()=>ne(i.id),children:[e.jsx(Se,{children:e.jsx(ze,{children:i.photo?e.jsx("img",{src:i.photo,alt:i.name}):te(i.name)})}),e.jsxs($e,{children:[e.jsx(Be,{children:i.name}),e.jsxs(b,{children:[e.jsx("strong",{children:"Admission No:"})," ",i.admission_no]}),e.jsxs(b,{children:[e.jsx("strong",{children:"Father:"})," ",i.father_name||"N/A"]}),e.jsxs(b,{children:[e.jsx("strong",{children:"Phone:"})," ",Array.isArray(i.phone_numbers)?i.phone_numbers.join(", "):i.phone_numbers||"N/A"]}),e.jsx(_e,{}),e.jsxs(b,{children:[e.jsx("strong",{children:"Class:"})," ",((o=i.class_name)==null?void 0:o.name)||"N/A"," (",i.batch,")"]}),e.jsxs(b,{children:[e.jsx("strong",{children:"Group:"})," ",i.group||"N/A"]}),e.jsxs(Ee,{children:[e.jsxs(B,{given:i.is_bookes_given,children:[i.is_bookes_given?e.jsx(C,{}):e.jsx(f,{}),"Books"]}),e.jsxs(B,{given:i.is_uniform_given,children:[i.is_uniform_given?e.jsx(C,{}):e.jsx(f,{}),"Uniform"]}),e.jsxs(B,{given:i.is_bag_given,children:[i.is_bag_given?e.jsx(C,{}):e.jsx(f,{}),"Bag"]})]})]}),e.jsx(Ne,{children:e.jsx(Ae,{status:i.status,children:i.status})})]},i.id)})})]})]})};export{Te as default};
