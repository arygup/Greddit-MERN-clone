import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from 'react-router';

function Makesub( ) {
  const  [reg, setreg] = useState({
    tags : '',
    heading : '',
    text : ''
  });
  const { uid } = useParams();
  const  {tags, heading, text} = reg;
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
    const res = await axios.post(`http://localhost:8000/api/posts/make/${uid}`, body, config, {port: 8000});
    //console.log(res.data._id);
    window.location.href=`/post/${res.data._id}`;
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
            <label>Tags</label>
            <label>Heading</label>
          </div>  
          <div className="catt">
          <input name="tags" value={tags} onChange={e => onchanger(e)}/>
          <input name="heading" value={heading} onChange={e => onchanger(e)}/>
          </div>
          <div className="catt">
            <label>Text</label>
          </div>  
          <div className="catt">
            <input name="text" value={text} onChange={e => onchanger(e)}/>
          </div>
          <br></br>
          <button type="onSubmit" disabled={!text || !heading}>Make Post!</button>
        </form>
      </div>
      <div className="followers">
      </div>
    </> 
  )    
}

export default Makesub;