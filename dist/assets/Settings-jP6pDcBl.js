import{j as e,k as n}from"./index-DLjENkrc.js";const l=n.div`
  padding: 20px;
`,c=n.h1`
  color: #333;
  margin-bottom: 20px;
`,a=n.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`,i=n.div`
  margin-bottom: 30px;
`,s=n.h2`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 15px;
`,o=n.div`
  margin-bottom: 20px;
`,r=n.label`
  display: block;
  margin-bottom: 8px;
  color: #666;
`,t=n.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #FFB942;
  }
`,d=n.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #FFB942;
  }
`,x=n.button`
  background: #FFB942;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #e6a73d;
  }
`,h=()=>e.jsxs(l,{children:[e.jsx(c,{children:"Settings"}),e.jsxs(a,{children:[e.jsxs(i,{children:[e.jsx(s,{children:"Profile Settings"}),e.jsxs(o,{children:[e.jsx(r,{children:"Display Name"}),e.jsx(t,{type:"text",placeholder:"Enter your display name"})]}),e.jsxs(o,{children:[e.jsx(r,{children:"Email"}),e.jsx(t,{type:"email",placeholder:"Enter your email"})]})]}),e.jsxs(i,{children:[e.jsx(s,{children:"Preferences"}),e.jsxs(o,{children:[e.jsx(r,{children:"Theme"}),e.jsxs(d,{children:[e.jsx("option",{value:"light",children:"Light"}),e.jsx("option",{value:"dark",children:"Dark"}),e.jsx("option",{value:"system",children:"System"})]})]}),e.jsxs(o,{children:[e.jsx(r,{children:"Language"}),e.jsxs(d,{children:[e.jsx("option",{value:"en",children:"English"}),e.jsx("option",{value:"es",children:"Spanish"}),e.jsx("option",{value:"fr",children:"French"})]})]})]}),e.jsx(x,{children:"Save Changes"})]})]});export{h as default};
