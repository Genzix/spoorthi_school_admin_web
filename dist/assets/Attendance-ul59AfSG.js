import{o as Pn,n as In,b as r,j as e,A,i as D,k as n,m as Me}from"./index-Dw8q8pd0.js";import{f as yt,c as Le,F as Se,g as kt,a as _n,b as Ct,d as Rn}from"./index-C9Urxevv.js";import{s as Oe}from"./Search-BVAmrx5H.js";import{u as Ue,w as Wn}from"./xlsx-D1NZSDnX.js";import{E as Nn,a as Ln}from"./jspdf.plugin.autotable-ygMoiZsk.js";import{c as Je,B as Ae,D as Kt,a as Vt,b as Qt}from"./DialogTitle-CuPH3787.js";import{F as On,a as Un,C as Yn}from"./FormGroup-CCktE0Lo.js";import"./Portal-CA-4yvrI.js";const Gn=Me`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,Zt=Me`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`,Jt=Me`
  from { opacity: 0; }
  to { opacity: 1; }
`,Hn=Me`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`,Ye=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 20px;
`,j=n.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${Gn} 1s ease-in-out infinite;
`,Ge=n.p`
  font-size: 1.2rem;
  color: #666;
  animation: ${Zt} 1.5s ease-in-out infinite;
`,Xn=n.div`
  display: flex;
  width: 100%;
  height: 70px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${Zt} 1.5s ease-in-out infinite;
  margin-bottom: 10px;
  border-radius: 8px;
`,qn=n.div`
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
`,Kn=n.button`
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
`,He=n.div`
  padding: 2rem;
  background-color: #EFEFEF;
  min-height: 100vh;
  width: 100%;
`,Xe=n.div`
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
`,qe=n.div`
  position: relative;
  width: 20vw;
`,Ke=n.input`
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
`,Ve=n.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none;
`,E=n.img`
  position: absolute;
  right: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 1vh;
  pointer-events: none;
`,z=n.div`
  position: relative;
  width: fit-content;
`,B=n.select`
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
`,Vn=n.div`
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
`,Qn=n.div`
  display: inline-block;
  min-width: 100%;
`,Zn=n.table`
  min-width: 100%;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`,O=n.th.withConfig({shouldForwardProp:i=>!["leftAlign"].includes(i)})`
  background: #EFEFEF;
  padding: 1.8vh 0vw;
  text-align: ${i=>i.$leftAlign?"left":"center"};
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.7px;
  vertical-align: middle;
  font-weight: 400;
  color: #000000;
  border-bottom: 1px solid #A7A7A7;
  ${i=>i.$leftAlign&&"padding-left: 1vw;"}

  &:nth-child(1) { width: 20vw; }  /* Student */
  &:nth-child(2) { width: 13vw; }  /* Admission No */
  &:nth-child(3) { width: 7vw; }  /* Class */
  &:nth-child(4) { width: 7vw; }  /* Group */
  &:nth-child(5) { width: 7vw; }  /* Section */
  &:nth-child(6) { width: 7vw; }  /* Batch */
  &:nth-child(7) { width: 7vw; }   /* Edit */
   &:nth-child(8) { width: 15vw; }   /* Edit */
`,Ft=n.tr`
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
`,U=n.td.withConfig({shouldForwardProp:i=>!["leftAlign","isEditColumn"].includes(i)})`
  padding: 2vh 0vw;
  text-align: ${i=>i.$leftAlign?"left":"center"};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  vertical-align: middle;
  line-height: 1.5;
  ${i=>i.$leftAlign&&"padding-left: 25px;"}
  word-wrap: break-word;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${i=>i.$isEditColumn&&`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`,Jn=n.span.withConfig({shouldForwardProp:i=>!["status"].includes(i)})`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({$status:i})=>i==="present"?"#BEFFB6":i==="absent"?"#FEA592":"#FFB942"};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  display: inline-block;
  transition: all 0.2s;
`,es=n.span`
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
`,ts=n.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 0.7vw;
  background-color: #FFB942;
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
`,ns=n.div`
  display: flex;
  align-items: center;
  transition: all 0.2s;
  min-width: 0;
`,ss=n.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 0;
  overflow: hidden;
`,os=n.div`
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Qe=n.div`
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
`,St=n.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,At=n.input`
  padding: 10px 15px;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`,is=n.button`
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #FFB942;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.7vh;

  &:hover {
    color: #FFAC1E;
    transform: scale(1.1);
  }
`,as=n.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 1vh;
`,De=n.button`
  padding: 6px 12px;
  border: 1px solid #FFB942;
  border-radius: 4px;
  background: ${i=>i.selected?"#FFB942":"white"};
  color: ${i=>i.selected?"white":"#FFB942"};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;

  &:hover {
    background: #FFB942;
    color: white;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`,rs=n.div`
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
  animation: ${Jt} 0.3s ease-out;
`,ls=n.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: ${Hn} 0.3s ease-out;
`,ds=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`,cs=n.h2`
  font-family: "Roboto", sans-serif;
  font-size: 1.4rem;
  color: #333;
  margin: 0;
  font-weight: 500;
`,hs=n.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 50%;
  width: 40px;
  height: 40px;

  &:hover {
    color: #000;
    background: #f5f5f5;
  }
`,ps=n.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`,xs=n.button`
  width: 100%;
  padding: 1.2rem;
  background: #FFB942;
  border: none;
  border-radius: 1rem;
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #FFAC1E;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 185, 66, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,gs=n.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`,us=n.h3`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 0.5rem 0;
`,fs=n.p`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;n.button`
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
`;const ms=n(Kt)`
  .MuiDialog-paper {
    border-radius: 12px;
    padding: 20px;
  }
`,bs=n(Vt)`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
`,ws=n(Qt)`
  padding: 20px !important;
`,vs=n(Je)`
  padding: 16px 24px !important;
`,js=n.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`,Dt=n.button`
  padding: 10px 20px;
  background-color: ${i=>i.isActive?"#4a6cf7":"#f5f5f5"};
  color: ${i=>i.isActive?"white":"#333"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${i=>i.isActive?"#3a5bd9":"#e0e0e0"};
  }
`,ys=n.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`,Et=n.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
`,zt=n.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background-color: #FFB942;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
  }
`,Bt=n.div`
  padding: 0.8vh;
  background-color: #EFEFEF;
  min-height: 100vh;
  width: 100%;
`,$t=n.div`
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  margin-bottom: 0.8vh;
  position: sticky;
  top: 0;
  background: #EFEFEF;
  padding: 0.8vh 0;
  z-index: 100;
`,Mt=n.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  width: 100%;
`,Tt=n.input`
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  background: transparent;
`,Pt=n.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1rem;
  
  &::-webkit-scrollbar {
    display: none;
  }
`,Y=n.button`
  padding: 0.5rem 1rem;
  background: ${i=>i.active?"#FFB942":"white"};
  color: ${i=>i.active?"white":"#333"};
  border: none;
  border-radius: 50px;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`,It=n.div`
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  padding: 1vh 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 0.5vh;
`,_t=n.div`
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04);
  animation: ${Jt} 0.3s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #FFB942 0%, #FFAC1E 50%, #FFB942 100%);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 6px 20px rgba(0, 0, 0, 0.06);
  }
`,Rt=n.div`
  position: relative;
  height: 120px;
  background: linear-gradient(135deg, #FFE5B9 0%, #FFD54F 50%, #FFE5B9 100%);
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  position: relative;
  // overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, rgba(255, 185, 66, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(20px, 20px);
  }
`,Wt=n.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  position: absolute;
  bottom: -40px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: #FFB942;
  border: 4px solid white;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`,Nt=n.div`
  padding: 3rem 0.8vh 0.8vh;
`,Lt=n.h3`
  margin: 0;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  letter-spacing: 0.5px;
`,Ee=n.p`
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  strong {
    color: #333;
    font-weight: 500;
  }
`,Ot=n.div`
  height: 1px;
  background: #eee;
  margin: 0.8vh 0;
`,ze=n.div`
  display: flex;
  gap: 0.8vh;
  margin-top: 1rem;
  flex-direction: column;
`,Be=n.button`
  flex: 1;
  padding: 0.8vh 1rem;
  height: 0.8vh;
  min-height: 40px;
  border: 1px solid #FFB942;
  border-radius: 8px;
  background: ${i=>i.selected?"#FFB942":"white"};
  color: ${i=>i.selected?"white":"#FFB942"};
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`,ks=n.button`
  width: 100%;
  padding: 0.6vh 1rem;
  height: auto;
  min-height: 32px;
  background: #4CAF50;
  border: none;
  border-radius: 10vw;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.6vh;

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: #ccc;
  }

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    width: auto;
    padding: 0.8vh 1.5vh;
    height: auto;
    min-height: 36px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    background: #4CAF50;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
    
    &:hover {
      background: #45A049;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`,Cs=n.div`
  background: white;
  padding: 0.8vh;
  border-radius: 8px;
  margin-bottom: 0.8vh;
  margin-top: 0.8vh;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
  overflow: hidden;

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    padding: 1vh 1.5vh;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    margin-bottom: 1.5vh;
    margin-top: 0.8vh;
  }
`,Fs=n.div`
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 1vh;
  font-weight: 400;
  margin-left: 1vw;
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    font-size: 0.8rem;
    font-weight: 400;
    margin-bottom: 1vh;
    color: #2c3e50;
    letter-spacing: 0.5px;
  }
`,Ss=n.div`
  display: flex;
  gap: 1vh;
  font-size: 0.9rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: stretch;

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    gap: 1.5vh;
    font-size: 1rem;
    margin-bottom: 0.5vh;
    justify-content: space-around;
  }
`,et=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8vh 1vh;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  min-width: 60px;
  border: 1px solid #e0e0e0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${i=>i.$color||"#FFB942"};
  }
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    padding: 1vh 1.5vh;
    border-radius: 10px;
    min-width: 80px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
  }
`,Ze=n.div`
  font-size: 0.7rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 0.3vh;
  text-align: center;
  letter-spacing: 0.3px;
  text-transform: uppercase;

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.4vh;
    font-weight: 600;
  }
`,tt=n.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${i=>i.$color||"#333"};
  text-align: center;
  line-height: 1;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);

  /* Desktop specific enhancements */
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`,As=n(et)`
  &::before {
    background: linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%);
  }
`,Ds=n(et)`
  &::before {
    background: linear-gradient(90deg, #F44336 0%, #EF5350 100%);
  }
`,Es=n(et)`
  &::before {
    background: linear-gradient(90deg, #FF9800 0%, #FFB74D 100%);
  }
`,zs=n(tt)`
  color: #4CAF50;
`,Bs=n(tt)`
  color: #F44336;
`,$s=n(tt)`
  color: #FF9800;
`,Ms=n.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin: 0.5rem;
  padding: 0.8rem;
  
  &::-webkit-scrollbar {
    display: none;
  }
`,$e=n.button`
  padding: 0.5rem 1rem;
  background: ${i=>i.active?"#FFB942":"white"};
  color: ${i=>i.active?"white":"#333"};
  border: none;
  border-radius: 50px;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.2s;
  font-weight: 500;

  &:active {
    transform: scale(0.95);
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Ts=n.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
  
  /* Ensure it works on all mobile browsers */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  /* Remove default styling */
  border: none;
  background: transparent;
  font-size: 16px; /* Prevents zoom on iOS */
  
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: auto;
    color: transparent;
    background: transparent;
    cursor: pointer;
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-clear-button {
    display: none;
    -webkit-appearance: none;
  }
`,Ps=n.div`
  position: relative;
  display: inline-block;
`,Is=n.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`,_s=n.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`,Rs=n.h3`
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
  color: #333;
  text-align: center;
`,Ws=n.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  
  &:focus {
    outline: none;
    border-color: #FFB942;
  }
`,Ns=n.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`,Ut=n.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${i=>i.primary?`
    background: #FFB942;
    color: white;
    
    &:hover {
      background: #FFAC1E;
    }
  `:`
    background: #f5f5f5;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
    }
  `}
`,Ls=n.div`
  background: linear-gradient(135deg, #FFB942 0%, #FFAC1E 100%);
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  margin: 0.5rem;
  box-shadow: 0 4px 15px rgba(255, 185, 66, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`,T=n.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`,P=n.span`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.2rem;
`,I=n.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  width: 100%;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8.825L1.175 4 2.05 3.125 6 7.075 9.95 3.125 10.825 4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
`,Yt=n(Kt)`
  .MuiDialog-paper {
    border-radius: 12px;
    padding: 20px;
  }
`,Gt=n(Vt)`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #333;
`,Ht=n(Qt)`
  padding: 20px !important;
`,Xt=n.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #FFB942;
  border: none;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 100;
`,qt=n.div.withConfig({shouldForwardProp:i=>!["status"].includes(i)})`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: ${({$status:i})=>i==="present"?"#BEFFB6":i==="absent"?"#FEA592":"#FFB942"};
  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
`,Qs=()=>{var wt,vt;const{academicYears:i,selectedAcademicYear:$,setSelectedAcademicYearId:Te}=Pn(),{students:te,loading:en,error:nt,isRefreshing:ce,refreshStudents:st,getFilteredStudents:tn,getUniqueValues:he}=In(),[Pe,nn]=r.useState([]),[q,ne]=r.useState(""),[c,se]=r.useState({batch:"",class:"",group:"",section:""}),[sn,ot]=r.useState(!1),[on,an]=r.useState(0),[rn,ln]=r.useState(0),[g,pe]=r.useState(new Date().toISOString().split("T")[0]),oe=r.useRef(null),[dn,xe]=r.useState(!1),[m,cn]=r.useState(null),[K,Ie]=r.useState(null),[it,hn]=r.useState(null),[at,rt]=r.useState(!1),[k,lt]=r.useState(null),[b,_]=r.useState(!1),[ge,dt]=r.useState(!1),[pn,ie]=r.useState(!1),[_e,ct]=r.useState("excel"),[R,xn]=r.useState(new Date().toISOString().split("T")[0]),[W,gn]=r.useState(new Date().toISOString().split("T")[0]),[C,un]=r.useState({name:!0,admission_no:!0,class:!0,group:!0,section:!0,batch:!0,attendance:!0}),[ht,fn]=r.useState(!1),[V,mn]=r.useState(""),[S,bn]=r.useState("all"),[Os,wn]=r.useState([]),[pt,Q]=r.useState(!1),[xt,gt]=r.useState(!1),[ae,ut]=r.useState(!1),[ue,ft]=r.useState(!1),[re,Re]=r.useState(""),[fe,We]=r.useState({processed:0,total:0,failed:0}),me=[{id:"name",label:"Student Name"},{id:"admission_no",label:"Admission No"},{id:"class",label:"Class"},{id:"group",label:"Group"},{id:"section",label:"Section"},{id:"batch",label:"Batch"},{id:"attendance",label:"Attendance Status"}],vn=t=>{un(o=>({...o,[t]:!o[t]}))},jn=async()=>{try{const t=localStorage.getItem("token"),o=await D.get("https://spoorthischool.genzix.space/masters/students/",{headers:{Authorization:`Bearer ${t}`}});if(o.data.status!=="success")throw new Error("Failed to fetch students");const a=o.data.data.filter(h=>h.status==="admission"),l=await D.get(`https://spoorthischool.genzix.space/masters/attendance/?start_date=${R}&end_date=${W}`,{headers:{Authorization:`Bearer ${t}`}});if(l.data.status!=="success")throw new Error("Failed to fetch attendance records");const s=l.data.data,x={};s.forEach(h=>{const v=h.date;x[v]||(x[v]={}),x[v][h.student.id]=h.is_present});const u=[],y=new Date(R),F=new Date(W);for(;y<=F;)u.push(y.toISOString().split("T")[0]),y.setDate(y.getDate()+1);const w=me.filter(h=>C[h.id]),ee=a.map(h=>{const v={};return w.forEach(H=>{var X,L;switch(H.id){case"name":v["Student Name"]=h.name;break;case"admission_no":v["Admission No"]=h.admission_no;break;case"class":v.Class=((X=h.class_name)==null?void 0:X.name)||"N/A";break;case"group":v.Group=h.group||"N/A";break;case"section":v.Section=((L=h.section)==null?void 0:L.name)||"N/A";break;case"batch":v.Batch=h.batch||"N/A";break}}),u.forEach(H=>{var L;const X=(L=x[H])==null?void 0:L[h.id];v[H]=X===void 0?"Not Marked":X?"Present":"Absent"}),v}),de=Ue.json_to_sheet(ee),f=[{wch:30},{wch:15},{wch:15},{wch:15},{wch:15},{wch:15},...u.map(()=>({wch:12}))];de["!cols"]=f;const d=Ue.book_new();Ue.book_append_sheet(d,de,"Attendance"),Wn(d,`attendance_${R}_to_${W}.xlsx`)}catch(t){console.error("Failed to export attendance data",t)}},yn=async()=>{try{const t=localStorage.getItem("token"),o=await D.get("https://spoorthischool.genzix.space/masters/students/",{headers:{Authorization:`Bearer ${t}`}});if(o.data.status!=="success")throw new Error("Failed to fetch students");const a=o.data.data.filter(d=>d.status==="admission"),l=await D.get(`https://spoorthischool.genzix.space/masters/attendance/?start_date=${R}&end_date=${W}`,{headers:{Authorization:`Bearer ${t}`}});if(l.data.status!=="success")throw new Error("Failed to fetch attendance records");const s=l.data.data,x={};s.forEach(d=>{const h=d.date;x[h]||(x[h]={}),x[h][d.student.id]=d.is_present});const u=[],y=new Date(R),F=new Date(W);for(;y<=F;)u.push(y.toISOString().split("T")[0]),y.setDate(y.getDate()+1);const w=new Nn("l","mm","a4");w.setFontSize(16),w.setTextColor(74,108,247),w.text("Attendance Report",14,20),w.setFontSize(10),w.setTextColor(100),w.text(`Date Range: ${R} to ${W}`,14,30);const ee=[...me.filter(d=>C[d.id]).map(d=>d.label),...u],de=a.map(d=>{var v,H;const h=[];return C.name&&h.push(d.name),C.admission_no&&h.push(d.admission_no),C.class&&h.push(((v=d.class_name)==null?void 0:v.name)||"N/A"),C.group&&h.push(d.group||"N/A"),C.section&&h.push(((H=d.section)==null?void 0:H.name)||"N/A"),C.batch&&h.push(d.batch||"N/A"),u.forEach(X=>{var jt;const L=(jt=x[X])==null?void 0:jt[d.id];h.push(L===void 0?"Not Marked":L?"Present":"Absent")}),h}),f=[...me.filter(d=>C[d.id]).map(()=>30),...u.map(()=>20)];Ln(w,{head:[ee],body:de,startY:35,theme:"grid",styles:{fontSize:8,cellPadding:2,overflow:"linebreak",cellWidth:"wrap",halign:"center",valign:"middle",font:"helvetica"},headStyles:{fillColor:[74,108,247],textColor:255,fontSize:9,fontStyle:"bold",halign:"center",valign:"middle",font:"helvetica"},alternateRowStyles:{fillColor:[245,245,245]},columnStyles:Object.fromEntries(ee.map((d,h)=>[h,{cellWidth:f[h]}])),margin:{top:35},didDrawPage:function(d){w.setFontSize(8),w.setTextColor(100),w.text(`Page ${d.pageCount} of ${d.pageNumber}`,d.settings.margin.left,w.internal.pageSize.height-10)}}),w.save(`attendance_${R}_to_${W}.pdf`)}catch(t){console.error("Failed to export attendance data",t)}},kn=()=>{_e==="excel"?jn():yn(),ie(!1)},Z=async()=>{try{dt(!0);const t=localStorage.getItem("token"),o=await D.get(`https://spoorthischool.genzix.space/masters/attendance/?start_date=${g}&end_date=${g}`,{headers:{Authorization:`Bearer ${t}`}});o.data.status==="success"&&nn(o.data.data)}catch(t){console.error("Failed to fetch attendance records",t)}finally{dt(!1)}};r.useEffect(()=>{te.length>0&&Z()},[g,te]);const Cn=()=>{st()},p=t=>{if(ge)return"loading";const o=Pe.find(a=>a.student.id===t);return o?o.is_present?"present":"absent":"none"},Fn=()=>{const t=M.filter(l=>p(l.id)==="present").length,o=M.filter(l=>p(l.id)==="absent").length,a=M.filter(l=>p(l.id)==="none").length;return{presentCount:t,absentCount:o,unmarkedCount:a}},Sn=async()=>{const t=M.filter(a=>p(a.id)==="none");if(!(t.length===0||!window.confirm(`Are you sure you want to mark ${t.length} remaining student${t.length>1?"s":""} as present?

This action cannot be undone.`)))try{gt(!0),We({processed:0,total:t.length,failed:0});const a=localStorage.getItem("token"),l=25,s=500;let x=0,u=0;const y=[];for(let F=0;F<t.length;F+=l){const ee=t.slice(F,F+l).map(async f=>{try{return await D.post("https://spoorthischool.genzix.space/masters/attendance/",{student_id:f.id,date:g,is_present:!0},{headers:{Authorization:`Bearer ${a}`}}),{success:!0,student:f}}catch(d){return console.error(`Failed to mark ${f.name} as present:`,d),{success:!1,student:f,error:d.message}}});(await Promise.allSettled(ee)).forEach(f=>{var d;f.status==="fulfilled"?f.value.success?x++:(u++,y.push({student:f.value.student.name,error:f.value.error})):(u++,y.push({student:"Unknown",error:((d=f.reason)==null?void 0:d.message)||"Unknown error"}))}),We({processed:x,total:t.length,failed:u}),F+l<t.length&&await new Promise(f=>setTimeout(f,s))}if(await Z(),st(),u===0)alert(`Successfully marked ${x} student${x>1?"s":""} as present!`);else{const F=`Processed ${x} student${x>1?"s":""} successfully.
${u} student${u>1?"s":""} failed to mark.

Please try again for failed students.`;alert(F),console.error("Failed students:",y)}}catch(a){console.error("Failed to mark remaining students as present",a),alert("Failed to mark students as present. Please try again.")}finally{gt(!1),We({processed:0,total:0,failed:0})}},An=t=>{const o=te.find(s=>s.id===t),a=p(t),l=Pe.find(s=>s.student.id===t);cn(o),Ie(a),hn(l==null?void 0:l.id),xe(!0)},Dn=async()=>{if(!(!m||!K))try{rt(!0);const t=localStorage.getItem("token");it?(await D.put(`https://spoorthischool.genzix.space/masters/attendance/${it}/`,{student_id:m.id,date:g,is_present:K==="present"},{headers:{Authorization:`Bearer ${t}`}})).data.status==="success"&&(await Z(),xe(!1)):(await D.post("https://spoorthischool.genzix.space/masters/attendance/",{student_id:m.id,date:g,is_present:K==="present"},{headers:{Authorization:`Bearer ${t}`}})).data.status==="success"&&(await Z(),xe(!1))}catch(t){console.error("Failed to save attendance",t)}finally{rt(!1)}},J=async(t,o)=>{try{lt(t);const a=localStorage.getItem("token"),l=Pe.find(s=>s.student.id===t);l?(await D.put(`https://spoorthischool.genzix.space/masters/attendance/${l.id}/`,{student_id:t,date:g,is_present:o},{headers:{Authorization:`Bearer ${a}`}})).data.status==="success"&&await Z():(await D.post("https://spoorthischool.genzix.space/masters/attendance/",{student_id:t,date:g,is_present:o},{headers:{Authorization:`Bearer ${a}`}})).data.status==="success"&&await Z()}catch(a){console.error("Failed to mark attendance",a)}finally{lt(null)}},M=tn({searchTerm:q,batch:c.batch,class:c.class,group:c.group,section:c.section,admissionOnly:!0}),be=he("batch"),we=he("class");he("group"),he("section");const ve=c.class?[...new Set(te.filter(t=>{var o;return((o=t.class_name)==null?void 0:o.name)===c.class}).map(t=>t.group).filter(Boolean))]:[],je=c.class?[...new Set(te.filter(t=>{var o;return((o=t.class_name)==null?void 0:o.name)===c.class}).map(t=>{var o;return(o=t.section)==null?void 0:o.name}).filter(Boolean))]:[],ye=async t=>{const o=t.target.value;_(!0),se(a=>({...a,class:o,group:"",section:""})),await new Promise(a=>setTimeout(a,500)),_(!1)},ke=async t=>{_(!0),se(o=>({...o,group:t.target.value})),await new Promise(o=>setTimeout(o,500)),_(!1)},Ce=async t=>{_(!0),se(o=>({...o,section:t.target.value})),await new Promise(o=>setTimeout(o,500)),_(!1)},Ne=async t=>{_(!0),se(o=>({...o,batch:t.target.value})),await new Promise(o=>setTimeout(o,500)),_(!1)},En=t=>{ot(!0),an(t.pageX-oe.current.offsetLeft),ln(oe.current.scrollLeft)},mt=()=>{ot(!1)},zn=t=>{if(!sn)return;t.preventDefault();const a=(t.pageX-oe.current.offsetLeft-on)*2;oe.current.scrollLeft=rn-a};r.useEffect(()=>{const t=()=>{fn(window.innerWidth<768)};return window.addEventListener("resize",t),t(),()=>{window.removeEventListener("resize",t)}},[]),r.useEffect(()=>{const t=localStorage.getItem("userEmail");if(mn(t),t==="incharge@gmail.com"){const o=new Date().toISOString().split("T")[0];pe(o)}},[]),r.useEffect(()=>{const t=[],o=new Date;t.push({label:"Today",value:o.toISOString().split("T")[0]});const a=new Date(o);a.setDate(a.getDate()-1),t.push({label:"Yesterday",value:a.toISOString().split("T")[0]});for(let l=2;l<=7;l++){const s=new Date(o);s.setDate(s.getDate()-l),t.push({label:s.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),value:s.toISOString().split("T")[0]})}wn(t)},[]),r.useEffect(()=>{const t=o=>{o.key==="Escape"&&ue&&le()};return ue&&(document.addEventListener("keydown",t),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",t),document.body.style.overflow="unset"}},[ue]);const N=t=>{bn(t)},G=async t=>{ut(!0),pe(t),await new Promise(o=>setTimeout(o,500)),ut(!1)},Fe=()=>{Re(g),ft(!0)},le=()=>{ft(!1),Re("")},bt=async()=>{re&&await G(re),le()},Bn=t=>{t.key==="Escape"?le():t.key==="Enter"&&re&&bt()},$n=()=>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Mn=()=>/iPad|iPhone|iPod/.test(navigator.userAgent),Tn=()=>{if($n())if(Mn())try{const t=document.createElement("input");t.type="date",t.value=g,t.style.position="fixed",t.style.top="-100px",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.opacity="0",t.style.zIndex="9999",document.body.appendChild(t),t.focus();const o=s=>{s.target.value&&G(s.target.value),l()},a=()=>{setTimeout(()=>{t.value||Fe(),l()},100)},l=()=>{t.removeEventListener("change",o),t.removeEventListener("blur",a),document.body.removeChild(t)};t.addEventListener("change",o),t.addEventListener("blur",a),t.click(),setTimeout(()=>{document.body.contains(t)&&(l(),Fe())},1e3)}catch{console.log("Native date picker failed, using modal fallback"),Fe()}else Fe();else{const t=document.createElement("input");t.type="date",t.value=g,t.style.position="absolute",t.style.opacity="0",t.style.pointerEvents="none",document.body.appendChild(t),t.focus(),t.click(),t.onchange=o=>{G(o.target.value),document.body.removeChild(t)},t.onblur=()=>{document.body.removeChild(t)}}};if(ht){const t=M.filter(s=>{if(S==="all")return!0;const x=p(s.id);return S===x}),{presentCount:o,absentCount:a,unmarkedCount:l}=Fn();return e.jsxs(Bt,{children:[e.jsxs($t,{children:[e.jsxs(Mt,{children:[e.jsx(yt,{size:20,color:"#666"}),e.jsx(Tt,{type:"text",placeholder:"Search students...",value:q,onChange:s=>ne(s.target.value)})]}),V!=="incharge@gmail.com"&&e.jsxs(Ms,{children:[e.jsx($e,{active:g===new Date().toISOString().split("T")[0],onClick:()=>G(new Date().toISOString().split("T")[0]),disabled:ae,children:"📅 Today"}),e.jsxs(Ps,{children:[e.jsx($e,{active:!1,disabled:ae,onClick:Tn,style:{background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",fontWeight:"600"},children:"🗓️ Pick Date"}),e.jsx(Ts,{type:"date",value:g,onChange:s=>G(s.target.value),min:"2020-01-01",max:"2030-12-31"})]}),e.jsx($e,{active:g===new Date(Date.now()-24*60*60*1e3).toISOString().split("T")[0],onClick:()=>G(new Date(Date.now()-24*60*60*1e3).toISOString().split("T")[0]),disabled:ae,children:"⏪ Yesterday"}),e.jsx($e,{active:g===new Date(Date.now()-2*24*60*60*1e3).toISOString().split("T")[0],onClick:()=>G(new Date(Date.now()-2*24*60*60*1e3).toISOString().split("T")[0]),disabled:ae,children:"📆 2 Days Ago"})]}),V!=="incharge@gmail.com"&&e.jsx(Ls,{children:ae?e.jsxs(e.Fragment,{children:[e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px",marginRight:"10px"}}),"Changing Date..."]}):e.jsxs(e.Fragment,{children:["📅 ",new Date(g).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})]})}),e.jsxs(Cs,{children:[e.jsxs(Fs,{children:["Attendance Summary for ",new Date(g).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})]}),e.jsxs(Ss,{children:[e.jsxs(As,{children:[e.jsx(Ze,{children:"Present"}),e.jsx(zs,{children:o})]}),e.jsxs(Ds,{children:[e.jsx(Ze,{children:"Absent"}),e.jsx(Bs,{children:a})]}),e.jsxs(Es,{children:[e.jsx(Ze,{children:"Unmarked"}),e.jsx($s,{children:l})]})]})]}),l>0&&e.jsx(ks,{onClick:Sn,disabled:xt,children:xt?e.jsxs(e.Fragment,{children:[e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px"}}),"Marking ",fe.processed,"/",fe.total," as Present...",fe.failed>0&&` (${fe.failed} failed)`]}):e.jsxs(e.Fragment,{children:[e.jsx(Le,{size:20}),"Mark ",l," Remaining as Present"]})})]}),ce||ge?e.jsxs(Ye,{children:[e.jsx(j,{}),e.jsx(Ge,{children:"Loading attendance..."})]}):t.length===0?e.jsxs(Qe,{children:[e.jsx("h3",{children:"No students found"}),e.jsx("p",{children:"Try adjusting your search or filters"})]}):e.jsx(It,{children:t.map(s=>{var x,u;return e.jsxs(_t,{children:[e.jsx(Rt,{children:e.jsx(Wt,{children:s.photo?e.jsx("img",{src:s.photo,alt:s.name}):s.name.charAt(0).toUpperCase()})}),e.jsxs(Nt,{children:[e.jsx(Lt,{children:s.name}),e.jsxs(Ee,{children:[e.jsx("strong",{children:"Admission No:"})," ",s.admission_no]}),e.jsxs(Ee,{children:[e.jsx("strong",{children:"Class:"})," ",((x=s.class_name)==null?void 0:x.name)||"N/A"," ",(u=s.section)==null?void 0:u.name]}),e.jsx(Ot,{}),p(s.id)==="loading"?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px",margin:"0 auto"}}):p(s.id)==="none"?e.jsx(ze,{children:e.jsx(Be,{selected:p(s.id)==="absent",onClick:()=>J(s.id,!1),disabled:k===s.id,children:k===s.id?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):e.jsxs(e.Fragment,{children:[e.jsx(Se,{size:18}),"Mark Absent"]})})}):p(s.id)==="absent"?e.jsx(ze,{children:e.jsx(Be,{selected:!0,onClick:()=>J(s.id,!0),disabled:k===s.id,children:k===s.id?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):e.jsxs(e.Fragment,{children:[e.jsx(Le,{size:18}),"Change to Present"]})})}):e.jsx(qt,{$status:p(s.id),children:p(s.id).charAt(0).toUpperCase()+p(s.id).slice(1)})]})]},s.id)})}),e.jsx(Xt,{onClick:()=>Q(!0),children:e.jsx(kt,{size:24})}),e.jsxs(Yt,{open:pt,onClose:()=>Q(!1),maxWidth:"sm",fullWidth:!0,children:[e.jsx(Gt,{children:"Filters"}),e.jsxs(Ht,{children:[e.jsxs(T,{children:[e.jsx(P,{children:"Year"}),e.jsx(I,{value:($==null?void 0:$.id)||"",onChange:s=>Te(s.target.value),disabled:b,children:i.filter(s=>s.name.startsWith("2025")||s.name.startsWith("2026")).map(s=>e.jsx("option",{value:s.id,children:s.name.split("-")[0]},s.id))})]}),e.jsxs(T,{children:[e.jsx(P,{children:"Batch"}),e.jsxs(I,{value:c.batch,onChange:Ne,disabled:b,children:[e.jsx("option",{value:"",children:"All Batches"}),be.map(s=>e.jsx("option",{value:s,children:s},s))]})]}),e.jsxs(T,{children:[e.jsx(P,{children:"Class"}),e.jsxs(I,{value:c.class,onChange:ye,disabled:b,children:[e.jsx("option",{value:"",children:"All Classes"}),we.map(s=>e.jsx("option",{value:s,children:s},s))]})]}),e.jsxs(T,{children:[e.jsx(P,{children:"Group"}),e.jsxs(I,{value:c.group,onChange:ke,disabled:!c.class||b,children:[e.jsx("option",{value:"",children:"All Groups"}),ve.map(s=>e.jsx("option",{value:s,children:s},s))]})]}),e.jsxs(T,{children:[e.jsx(P,{children:"Section"}),e.jsxs(I,{value:c.section,onChange:Ce,disabled:!c.class||b,children:[e.jsx("option",{value:"",children:"All Sections"}),je.map(s=>e.jsx("option",{value:s,children:s},s))]})]}),e.jsxs(Pt,{children:[e.jsx(Y,{active:S==="all",onClick:()=>N("all"),children:"All"}),e.jsx(Y,{active:S==="present",onClick:()=>N("present"),children:"Present"}),e.jsx(Y,{active:S==="absent",onClick:()=>N("absent"),children:"Absent"}),e.jsx(Y,{active:S==="none",onClick:()=>N("none"),children:"Unmarked"})]})]}),e.jsx(Je,{children:e.jsx(Ae,{onClick:()=>Q(!1),children:"Close"})})]}),ue&&e.jsx(Is,{onClick:le,children:e.jsxs(_s,{onClick:s=>s.stopPropagation(),onKeyDown:Bn,tabIndex:-1,children:[e.jsx(Rs,{children:"Select Date"}),e.jsx(Ws,{type:"date",value:re,onChange:s=>Re(s.target.value),min:"2020-01-01",max:"2030-12-31",autoFocus:!0,"aria-label":"Select date for attendance"}),e.jsxs(Ns,{children:[e.jsx(Ut,{onClick:le,"aria-label":"Cancel date selection",children:"Cancel"}),e.jsx(Ut,{primary:!0,onClick:bt,disabled:!re,"aria-label":"Confirm selected date",children:"Select Date"})]})]})})]})}return nt?e.jsxs(He,{children:[e.jsx(Xe,{children:e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"15px"},children:e.jsxs(qe,{children:[e.jsx(Ve,{src:Oe}),e.jsx(Ke,{type:"text",placeholder:"Search",value:q,onChange:t=>ne(t.target.value),disabled:!0})]})})}),e.jsxs(qn,{children:[e.jsx(Se,{size:20}),nt,e.jsxs(Kn,{onClick:Cn,children:[e.jsx(_n,{size:16}),"Retry"]})]})]}):en&&!ce?e.jsxs(He,{children:[e.jsxs(Xe,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px",flexWrap:"wrap"},children:[e.jsxs(qe,{children:[e.jsx(Ve,{src:Oe}),e.jsx(Ke,{type:"text",placeholder:"Search",value:q,onChange:t=>ne(t.target.value),disabled:!0})]}),e.jsxs(z,{children:[e.jsx(B,{value:($==null?void 0:$.id)||"",onChange:t=>Te(t.target.value),children:i.filter(t=>t.name.startsWith("2025")||t.name.startsWith("2026")).map(t=>e.jsx("option",{value:t.id,children:t.name.split("-")[0]},t.id))}),e.jsx(E,{src:A})]}),V!=="incharge@gmail.com"&&e.jsx(St,{children:e.jsx(At,{type:"date",value:g,onChange:t=>pe(t.target.value)})}),e.jsxs(z,{children:[e.jsxs(B,{value:c.batch,onChange:t=>se(o=>({...o,batch:t.target.value})),children:[e.jsx("option",{value:"",children:"All Batches"}),be.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(E,{src:A})]}),e.jsxs(z,{children:[e.jsxs(B,{value:c.class,onChange:ye,children:[e.jsx("option",{value:"",children:"All Classes"}),we.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(E,{src:A})]}),e.jsxs(z,{children:[e.jsxs(B,{value:c.group,onChange:ke,disabled:!c.class,children:[e.jsx("option",{value:"",children:"All Groups"}),ve.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(E,{src:A})]}),e.jsxs(z,{children:[e.jsxs(B,{value:c.section,onChange:Ce,disabled:!c.class,children:[e.jsx("option",{value:"",children:"All Sections"}),je.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(E,{src:A})]})]}),V!=="incharge@gmail.com"&&e.jsx("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:e.jsx(zt,{onClick:()=>ie(!0),children:e.jsx(Ct,{size:20,strokeWidth:1.3})})})]}),e.jsxs(Ye,{children:[e.jsx(j,{}),e.jsx(Ge,{children:"Loading students..."})]})]}):e.jsxs(He,{children:[ht?e.jsxs(Bt,{children:[e.jsx($t,{children:e.jsxs(Mt,{children:[e.jsx(yt,{size:20,color:"#666"}),e.jsx(Tt,{type:"text",placeholder:"Search students...",value:q,onChange:t=>ne(t.target.value)})]})}),ce||ge?e.jsxs(Ye,{children:[e.jsx(j,{}),e.jsx(Ge,{children:"Loading attendance..."})]}):M.length===0?e.jsxs(Qe,{children:[e.jsx("h3",{children:"No students found"}),e.jsx("p",{children:"Try adjusting your search or filters"})]}):e.jsx(It,{children:M.map(t=>{var o,a;return e.jsxs(_t,{children:[e.jsx(Rt,{children:e.jsx(Wt,{children:t.photo?e.jsx("img",{src:t.photo,alt:t.name}):t.name.charAt(0).toUpperCase()})}),e.jsxs(Nt,{children:[e.jsx(Lt,{children:t.name}),e.jsxs(Ee,{children:[e.jsx("strong",{children:"Admission No:"})," ",t.admission_no]}),e.jsxs(Ee,{children:[e.jsx("strong",{children:"Class:"})," ",((o=t.class_name)==null?void 0:o.name)||"N/A"," ",(a=t.section)==null?void 0:a.name]}),e.jsx(Ot,{}),p(t.id)==="loading"?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px",margin:"0 auto"}}):p(t.id)==="none"?e.jsx(ze,{children:e.jsx(Be,{selected:p(t.id)==="absent",onClick:()=>J(t.id,!1),disabled:k===t.id,children:k===t.id?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):e.jsxs(e.Fragment,{children:[e.jsx(Se,{size:18}),"Mark Absent"]})})}):p(t.id)==="absent"?e.jsx(ze,{children:e.jsx(Be,{selected:!0,onClick:()=>J(t.id,!0),disabled:k===t.id,children:k===t.id?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):e.jsxs(e.Fragment,{children:[e.jsx(Le,{size:18}),"Change to Present"]})})}):e.jsx(qt,{$status:p(t.id),children:p(t.id).charAt(0).toUpperCase()+p(t.id).slice(1)})]})]},t.id)})}),e.jsx(Xt,{onClick:()=>Q(!0),children:e.jsx(kt,{size:24})}),e.jsxs(Yt,{open:pt,onClose:()=>Q(!1),maxWidth:"sm",fullWidth:!0,children:[e.jsx(Gt,{children:"Filters"}),e.jsxs(Ht,{children:[e.jsxs(T,{children:[e.jsx(P,{children:"Batch"}),e.jsxs(I,{value:c.batch,onChange:Ne,disabled:b,children:[e.jsx("option",{value:"",children:"All Batches"}),be.map(t=>e.jsx("option",{value:t,children:t},t))]})]}),e.jsxs(T,{children:[e.jsx(P,{children:"Class"}),e.jsxs(I,{value:c.class,onChange:ye,disabled:b,children:[e.jsx("option",{value:"",children:"All Classes"}),we.map(t=>e.jsx("option",{value:t,children:t},t))]})]}),e.jsxs(T,{children:[e.jsx(P,{children:"Group"}),e.jsxs(I,{value:c.group,onChange:ke,disabled:!c.class||b,children:[e.jsx("option",{value:"",children:"All Groups"}),ve.map(t=>e.jsx("option",{value:t,children:t},t))]})]}),e.jsxs(T,{children:[e.jsx(P,{children:"Section"}),e.jsxs(I,{value:c.section,onChange:Ce,disabled:!c.class||b,children:[e.jsx("option",{value:"",children:"All Sections"}),je.map(t=>e.jsx("option",{value:t,children:t},t))]})]}),e.jsxs(Pt,{children:[e.jsx(Y,{active:S==="all",onClick:()=>N("all"),children:"All"}),e.jsx(Y,{active:S==="present",onClick:()=>N("present"),children:"Present"}),e.jsx(Y,{active:S==="absent",onClick:()=>N("absent"),children:"Absent"}),e.jsx(Y,{active:S==="none",onClick:()=>N("none"),children:"Unmarked"})]})]}),e.jsx(Je,{children:e.jsx(Ae,{onClick:()=>Q(!1),children:"Close"})})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs(Xe,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"15px",flexWrap:"wrap"},children:[e.jsxs(qe,{children:[e.jsx(Ve,{src:Oe}),e.jsx(Ke,{type:"text",placeholder:"Search",value:q,onChange:t=>ne(t.target.value)})]}),e.jsxs(z,{children:[e.jsx(B,{value:($==null?void 0:$.id)||"",onChange:t=>Te(t.target.value),disabled:b,children:i.filter(t=>t.name.startsWith("2025")||t.name.startsWith("2026")).map(t=>e.jsx("option",{value:t.id,children:t.name.split("-")[0]},t.id))}),e.jsx(E,{src:A})]}),V!=="incharge@gmail.com"&&e.jsx(St,{children:e.jsx(At,{type:"date",value:g,onChange:t=>pe(t.target.value)})}),e.jsxs(z,{children:[e.jsxs(B,{value:c.batch,onChange:Ne,disabled:b,children:[e.jsx("option",{value:"",children:"All Batches"}),be.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(E,{src:A})]}),e.jsxs(z,{children:[e.jsxs(B,{value:c.class,onChange:ye,disabled:b,children:[e.jsx("option",{value:"",children:"All Classes"}),we.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(E,{src:A})]}),e.jsxs(z,{children:[e.jsxs(B,{value:c.group,onChange:ke,disabled:!c.class||b,children:[e.jsx("option",{value:"",children:"All Groups"}),ve.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(E,{src:A})]}),e.jsxs(z,{children:[e.jsxs(B,{value:c.section,onChange:Ce,disabled:!c.class||b,children:[e.jsx("option",{value:"",children:"All Sections"}),je.map(t=>e.jsx("option",{value:t,children:t},t))]}),e.jsx(E,{src:A})]})]}),V!=="incharge@gmail.com"&&e.jsx("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:e.jsx(zt,{onClick:()=>ie(!0),children:e.jsx(Ct,{size:20,strokeWidth:1.3})})})]}),e.jsx(Vn,{ref:oe,onMouseDown:En,onMouseUp:mt,onMouseLeave:mt,onMouseMove:zn,children:ce||b||ge?e.jsx("div",{style:{padding:"20px"},children:[...Array(5)].map((t,o)=>e.jsx(Xn,{},o))}):M.length===0?e.jsxs(Qe,{children:[e.jsx("h3",{children:"No students found"}),e.jsx("div",{children:"Try adjusting your search or filters"})]}):e.jsx(Qn,{children:e.jsxs(Zn,{children:[e.jsx("thead",{children:e.jsxs(Ft,{children:[e.jsx(O,{$leftAlign:!0,children:"Student"}),e.jsx(O,{children:"Admission No"}),e.jsx(O,{children:"Class"}),e.jsx(O,{children:"Group"}),e.jsx(O,{children:"Section"}),e.jsx(O,{children:"Batch"}),e.jsx(O,{children:"Attendance"}),e.jsx(O,{children:"Edit"})]})}),e.jsx("tbody",{children:M.map(t=>{var o,a;return e.jsxs(Ft,{children:[e.jsx(U,{$leftAlign:!0,children:e.jsxs(ns,{children:[t.photo?e.jsx("img",{src:t.photo,alt:t.name,style:{width:"5.7vh",height:"5.7vh",borderRadius:"0.7vw",objectFit:"cover",marginRight:"0.8vw"}}):e.jsx(ts,{children:t.name.charAt(0).toUpperCase()}),e.jsx(ss,{children:e.jsx(os,{children:t.name})})]})}),e.jsx(U,{children:t.admission_no}),e.jsx(U,{children:e.jsx(es,{children:((o=t.class_name)==null?void 0:o.name)||"N/A"})}),e.jsx(U,{children:t.group||"N/A"}),e.jsx(U,{children:((a=t.section)==null?void 0:a.name)||"N/A"}),e.jsx(U,{children:t.batch}),e.jsx(U,{children:p(t.id)==="loading"?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px",margin:"0 auto"}}):e.jsx(Jn,{$status:p(t.id),children:p(t.id)})}),e.jsx(U,{$isEditColumn:!0,children:p(t.id)==="loading"?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):p(t.id)==="none"?e.jsxs(as,{children:[e.jsx(De,{onClick:()=>J(t.id,!0),disabled:k===t.id,children:k===t.id?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):"Present"}),e.jsx(De,{onClick:()=>J(t.id,!1),disabled:k===t.id,children:k===t.id?e.jsx(j,{style:{width:"20px",height:"20px",borderWidth:"2px"}}):"Absent"})]}):e.jsx(is,{onClick:()=>An(t.id),children:e.jsx(Rn,{size:18})})})]},t.id)})})]})})})]}),dn&&e.jsx(rs,{children:e.jsxs(ls,{children:[e.jsxs(ds,{children:[e.jsx(cs,{children:"Edit Attendance"}),e.jsx(hs,{onClick:()=>xe(!1),children:e.jsx(Se,{})})]}),e.jsxs(gs,{children:[e.jsx(us,{children:m==null?void 0:m.name}),e.jsxs(fs,{children:[m==null?void 0:m.admission_no," • ",(wt=m==null?void 0:m.class_name)==null?void 0:wt.name," ",(vt=m==null?void 0:m.section)==null?void 0:vt.name]})]}),e.jsxs(ps,{children:[e.jsx(De,{selected:K==="present",onClick:()=>Ie("present"),children:e.jsx("span",{children:"Present"})}),e.jsx(De,{selected:K==="absent",onClick:()=>Ie("absent"),children:e.jsx("span",{children:"Absent"})})]}),e.jsx(xs,{onClick:Dn,disabled:at||!K,children:at?"Saving...":"Save Attendance"})]})}),e.jsxs(ms,{open:pn,onClose:()=>ie(!1),maxWidth:"sm",fullWidth:!0,children:[e.jsx(bs,{children:"Export Attendance Data"}),e.jsxs(ws,{children:[e.jsxs(ys,{children:[e.jsx(Et,{type:"date",value:R,onChange:t=>xn(t.target.value)}),e.jsx("span",{children:"to"}),e.jsx(Et,{type:"date",value:W,onChange:t=>gn(t.target.value)})]}),e.jsxs(js,{children:[e.jsx(Dt,{isActive:_e==="excel",onClick:()=>ct("excel"),children:"Excel"}),e.jsx(Dt,{isActive:_e==="pdf",onClick:()=>ct("pdf"),children:"PDF"})]}),e.jsx(On,{children:me.map(t=>e.jsx(Un,{control:e.jsx(Yn,{checked:C[t.id],onChange:()=>vn(t.id)}),label:t.label},t.id))})]}),e.jsxs(vs,{children:[e.jsx(Ae,{onClick:()=>ie(!1),children:"Cancel"}),e.jsx(Ae,{onClick:kn,variant:"contained",color:"primary",disabled:!Object.values(C).some(Boolean),children:"Export"})]})]})]})};export{Qs as default};
