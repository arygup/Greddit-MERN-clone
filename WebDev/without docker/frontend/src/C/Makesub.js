import React, {useState, useEffect} from "react";
import axios from "axios";

function Makesub( ) {
  const  [reg, setreg] = useState({
    name: '',
    desc: '',
    banned: '',
    tags : ''
  });
  const  { name, desc, tags, banned } = reg;
  const onchanger = e => setreg({ ...reg, [e.target.name]: e.target.value});
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
    const res = await axios.post('http://localhost:8000/api/sub/make', body, config, {port: 8000});
    console.log(res.data._id);
    window.location.href=`/sub/${res.data._id}`;
    } catch(err){
      alert(JSON.stringify(err.response.data));
      console.error(err.response.data);
    }
  }

    return (
    <> 
      <div className="auth-form-container">
        <form onSubmit={e => handlesubmit(e)} className="form">
          <div className="catt">
            <label>Name</label>
            <label>Description</label>
          </div>  
          <div className="catt">
            <input name="name" value={name} onChange={e => onchanger(e)}/>
            <input name="desc" value={desc} onChange={e => onchanger(e)}/>
          </div>
          <div className="catt">
            <label>Tags</label>
            <label>Banned Words</label>
          </div>  
          <div className="catt">
          <input name="tags" value={tags} onChange={e => onchanger(e)}/>
          <input name="banned" value={banned} onChange={e => onchanger(e)}/>
          </div>
          <p>(csv please)</p>
          <br></br>
          <button type="onSubmit" disabled={!name || !desc}>Make Sub!</button>
        </form>
      </div>
    </> 
  )    
}

export default Makesub;