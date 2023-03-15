import React, {useState} from "react";
import axios from "axios";

function Lsu() {
  const  [reg, setreg] = useState({
    fname: '',
    lname: '',
    uname: '',
    email : '',
    age : '',
    pno : '',
    password : ''
  });
  const  [eml, seteml] = useState('');
  const [pass, setpass] = useState('');
  const  { fname, lname, uname, email, age, pno, password } = reg;

  const onchanger = e => setreg({ ...reg, [e.target.name]: e.target.value}); 
  const handlesubmitl = async e => {
    e.preventDefault();
    let lg = {}; 
    lg['email'] = eml;
    lg['password'] = pass;
    try {
        const config = {
          headers: { 'Content-Type': 'application/json'}
      }
      const body = JSON.stringify(lg);
      const res = await axios.post('http://localhost:8000/api/auth', body, config, {port: 8000});
      console.log(res.data.token);
      localStorage.setItem("jwt",res.data.token);
      //const a = localStorage.getItem('jwt');
      //alert(JSON.stringify(a));
      window.location.reload(false);
      } catch(err){
        alert(JSON.stringify(err.response.data));
        console.error(err.response.data);
    }
  }
  const handlesubmitr = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: { 'Content-Type': 'application/json'}
    }
    const body = JSON.stringify(reg);
    const res = await axios.post('http://localhost:8000/api/users', body, config, {port: 8000});
    console.log(res.data.token);
    localStorage.setItem("jwt",res.data.token);
    window.location.reload(false);
    } catch(err){
      alert(JSON.stringify(err.response.data));
      console.error(err.response.data);
  }
  }
  return (
    <> 
      <div className="auth-form-container">
        <form onSubmit={e => handlesubmitl(e)} className="form">
            <label className="heading">Login</label>
            <br/>
            <label>Email address</label>
            <input name="email" value={eml} onChange={e => seteml(e.target.value)} type="text" placeholder="name@example.com"/> 
            <label>Password</label>
            <input name="password" value={pass} onChange={e => setpass(e.target.value)} type="password" placeholder="********"/>
            <br/>
            <button type="onSubmit" disabled={!eml || !pass}>Log In</button>
        </form>
      </div>
        <br/>
        <br/>
      <div className="auth-form-container">
        <form onSubmit={e => handlesubmitr(e)} className="form">
          <label className="heading">Registeration</label>
          <br/>
          <div className="catt">
            <label>Email address</label>
            <label>Username</label>
          </div>  
          <div className="catt">
            <input name="email" value={email} onChange={e => onchanger(e)} type="email" placeholder="name@example.com"/> 
            <input name="uname" value={uname} onChange={e => onchanger(e)}/> 
          </div>
          <div className="catt">
            <label>First Name</label>
            <label>Last Name</label>
          </div>  
          <div className="catt">
            <input name="fname" value={fname} onChange={e => onchanger(e)}/>
            <input name="lname" value={lname} onChange={e => onchanger(e)}/>
          </div>
          <div className="catt">
            <label>Phone Number</label>
            <label>Age</label>
          </div>  
          <div className="catt">
          <input name="pno" value={pno} onChange={e => onchanger(e)}/>
          <input name="age" value={age} onChange={e => onchanger(e)}/>
          </div>
          <div className="catt">
            <label>Password</label>
            <input name="password" value={password} onChange={e => onchanger(e)} type="password" placeholder="********"/>
          </div>
            <button type="onSubmit" disabled={!email || !password || !uname || !fname|| !age || !pno}>Sign Up</button>
        </form>
      </div>
    </> 
  )    
}

export default Lsu;











