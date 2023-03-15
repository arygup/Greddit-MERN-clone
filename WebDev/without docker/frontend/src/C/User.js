import React, {useState, useEffect} from "react";
import axios from "axios";

function Lsu( {cmc} ) {
  const  [reg, setreg] = useState({
    fname: '',
    lname: '',
    uname: '',
    email : '',
    age : '',
    pno : '',
    password : ''
  });
  const  [rg, setrg] = useState({
    fname: '',
    lname: '',
    uname: '',
    email : '',
    age : '',
    pno : '',
    password : '',
    followers : {},
    followings : {}
  });
  const  { fname, lname, uname, email, age, pno, password } = reg;
  const onchanger = e => setreg({ ...reg, [e.target.name]: e.target.value});
  const [st, setst] = useState(0); 
  const handlesubmit = async e => {
    e.preventDefault();
    try {
      const jwwt = JSON.stringify(localStorage.getItem('jwt')).replace('"', '');
      const jt = jwwt.replace('"', '');
      //alert(jt);
      const config = {
        headers: {'x-auth-token': jt, 'Access-Control-Allow-Origin': 'http://localhost:8000', 'Content-Type': 'application/json'}
    }
    const body = JSON.stringify(reg);
    const res = await axios.post('http://localhost:8000/api/users/edit', body, config, {port: 8000});
    //window.location.reload(false);
    //console.log(res.data);
    setst(1);
    } catch(err){
      alert(JSON.stringify(err.response.data));
      console.error(err.response.data);
    }
  }
  const gobeck = (e) => {
    e.preventDefault();
    window.location.href="/tofollow";
  }
  const gobeckk = (e) => {
    e.preventDefault();
    window.location.href="/followers";
  }
  const gobeckkk = (e) => {
    e.preventDefault();
    window.location.href="/savedposts";
  }
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    window.location.href="/";
  }
  
  useEffect(() => {
      const jwwt = JSON.stringify(localStorage.getItem('jwt')).replace('"', '');
      const jt = jwwt.replace('"', '');
      const config = {
        headers: {'x-auth-token': jt, 'Access-Control-Allow-Origin': 'http://localhost:8000'}
      }
      axios.get('http://localhost:8000/api/users/me', config, {port: 8000}).then((response) => {
        setrg(response.data);
        localStorage.setItem("usr",response.data._id);
        // const x = JSON.stringify(localStorage.getItem('usr')).replace('"', '');
        // console.log(x.replace('"', ''));
        setst(0);
      });
      //console.log(rg);
  }, [st]);

  if (!rg) return null;
    return (
    <> 
      <div className="ulcontainer">
        <div className="Userinfo">
            <div className="category">
                <h3 className="hu">Email address:</h3> 
                <h3 className="hd">{rg.email}</h3>
            </div>
                <div className="category">
                <h3 className="hu">User name:</h3>
            <h3 className="hd">{rg.uname}</h3>
            </div>
            <div className="category">
                <h3 className="hu">First name:</h3> 
                <h3 className="hd">{rg.fname}</h3>
            </div>
                <div className="category">
                <h3 className="hu">Last name:</h3>
            <h3 className="hd">{rg.lname}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Phone number:</h3>
                <h3 className="hd">{rg.pno}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Age:</h3>
                <h3 className="hd">{rg.age}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Followers:</h3>
                <h3 className="hd">{rg.followers.length}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Following:</h3>
                <h3 className="hd">{rg.followings.length}</h3>
            </div>
            <br/>
            <button onClick={gobeckk}>Edit current followers following</button>
            <br/>
            <button onClick={gobeck}>More people to follow</button>
            <br/>
            <button onClick={gobeckkk}>Saved posts</button>
            <br/>
            <button onClick={logout} className="logout">LOG OUT</button>
        </div>
      </div>
      <div className="auth-form-container">
        <form onSubmit={e => handlesubmit(e)} className="form">
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
          <br></br>
          <button type="onSubmit" disabled={!fname && !pno && !age && !lname}>Update Profile</button>
        </form>
      </div>
      <div className="followers">

      </div>
    </> 
  )    
}

export default Lsu;











