import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from 'react-router';

function Viewpost( ) {
  const  [rg, setrg] = useState({});
  const  [cm, setcm] = useState();
  const  [rp, setrp] = useState();
  const [st, setst] = useState(0); 
  const [psts, setpsts] = useState(); 
  const [adbl, setadbl] = useState(0);
  const [cncl, setcncl] = useState(false);
  const [cncll, setcncll] = useState(false);
  const { uid } = useParams();
  useEffect(() => {
      const config = {
        headers: {'Access-Control-Allow-Origin': 'http://localhost:8000'}
      }
      axios.get(`http://localhost:8000/api/posts/${uid}`, config, {port: 8000}).then((response) => {
        //console.log(response.data);
        setrg(response.data);
        setst(1);
        setcm(response?.data?.comments);
        setrp(response?.data?.report);
        setadbl(response?.data?.adbl);
        document.getElementById('cncl').style.visibility= 'hidden';
      });
      //console.log(rg);
  }, [st]);
  function save()
  {
    document.getElementById('bttttt').style.visibility= 'hidden';
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/users/save/${rg._id}`, {}, config)
      .then((response) => {
        setst(9);
        alert('post saved');
      }).catch(err => alert(err));
  }
  function sb()
  {
    window.location.href=`/sub/${rg.sub}`;
  }
  function ffw()
  {
    document.getElementById('btt').style.visibility= 'hidden';
    const usr = rg.user;
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/users/follow/${usr}`, {}, config)
      .then((response) => {
        setst({usr});
        alert('followed user');
      }).catch(err => console.log(err));
  }
  function like()
  {
    document.getElementById('bttt').style.visibility= 'hidden';
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/posts/like/${rg._id}`, {}, config)
      .then((response) => {
        setst(9);
        alert('Upvoted');
      }).catch(err => alert(err));
  }
  function unlike()
  {
    document.getElementById('btttt').style.visibility= 'hidden';
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/posts/unlike/${rg._id}`, {}, config)
      .then((response) => {
        setst(9);
        alert('Downvoted');
      }).catch(err => alert(err));
  }
  function kjkjk()
  {
    if(cncl)
    {
      console.log(cncl);
      return;
    }
    alert('ok');
    return;
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/posts/dell/${rg._id}`, {}, config)
      .then((response) => {
        setst(9);
        alert('Deleted');
      }).catch(err => alert(err+' admin access req'));
  }
  function de()
  {
    document.getElementById('cncl').style.visibility= 'hidden';
    setcncl(true);
    document.getElementById('b').style.visibility= 'initial';
    //setst(7);
    clearInterval(cncll);
  }
  function delll()
  {
    document.getElementById('b').style.visibility= 'hidden';
    setcncl(false);
    document.getElementById('cncl').style.visibility= 'initial';
    setcncll(setInterval(() => kjkjk(), 3000));
  }
  function add()
  {
    document.getElementById('at').style.visibility= 'hidden';
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/posts/fad/${rg._id}`, {}, config)
      .then((response) => {
        setst(9);
        alert('faded');
      }).catch(err => alert(err+' admin access req'));
  }
  function gum()
  {
    document.getElementById('ct').style.visibility= 'hidden';
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/posts/anon/${rg._id}`, {}, config)
      .then((response) => {
        setst(9);
        alert('Made anonymous');
      }).catch(err => alert(err+' admin access req'));
  }
  const  [reg, setreg] = useState({text: '',});
  const  { text } = reg;
  const  [rgg, setrgg] = useState({concern: '',});
  const  { concern } = rgg;
  const onchanger = e => setreg({ ...reg, [e.target.name]: e.target.value});
  const onchange = e => setrgg({ ...rgg, [e.target.name]: e.target.value});

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
    const res = await axios.post(`http://localhost:8000/api/posts/comment/${rg._id}`, body, config, {port: 8000});
    console.log(res.data);
    setst(9);
    //window.location.href=`/sub/${res.data._id}`;
    } catch(err){
      alert(JSON.stringify(err.response.data));
      console.error(err.response.data);
    }
  }
  const handlesubmitr = async e => {
    e.preventDefault();
    try {
      const jwwt = JSON.stringify(localStorage.getItem('jwt')).replace('"', '');
      const jt = jwwt.replace('"', '');
      //alert(jt);
      const config = {
        headers: {'x-auth-token': jt, 'Access-Control-Allow-Origin': 'http://localhost:8000', 'Content-Type': 'application/json'}
    }
    const body = JSON.stringify(rgg);
    const res = await axios.post(`http://localhost:8000/api/posts/report/${rg._id}`, body, config, {port: 8000});
    console.log(res.data);
    setst(9);
    //window.location.href=`/sub/${res.data._id}`;
    } catch(err){
      alert(JSON.stringify(err.response.data));
      console.error(err.response.data);
    }
  }
  if (!rg) return null;
    return (
    <> 
      <div className="ulcontainer">
        <div className="Userinfo">
            <div className="category">
                <h3 className="hu">Subreddit posted in:</h3> 
                <h3 className="hd"><button onClick={() => sb()}>{rg.sub}</button></h3>
            </div>
            <div className="category">
                <h3 className="hu">Posted by:</h3>
                <h3 className="hd"><button id='btt' onClick={() => ffw()}>{rg.user}</button></h3>
            </div>
            <div className="category">
                <h3 className="hu">Heading:</h3> 
                <h3 className="hd">{rg.heading}</h3>
            </div>
                <div className="category">
                <h3 className="hu">Tags:</h3>
            <h3 className="hd">{rg.tags}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Text:</h3>
                <h3 className="hd">{rg.text}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Upvotes:</h3>
                <h3 className="hd">{rg?.likes?.length}</h3>
            </div>
            {/* cant down vote without upvoting first */}
            <div className="category">
                <button disabled={adbl} id='btttt' onClick={() => unlike()}>Downvote</button>  
                <button disabled={adbl} id='bttt' onClick={() => like()} className="logouthead">Upvote</button>
            </div>
            <div className="category">
                <br/>
                <button disabled={adbl} id='bttttt' onClick={() => save()}>Save post</button>  
            </div>
            <div className="category">
                <br/>
                <button disabled={adbl} id='at' onClick={() => add()}>Fade out</button>  
                <button id='b' onClick={() => delll()} className="logouthead">Del post</button>
                <button id='cncl' onClick={() => de()} className="logouthead">cancel del</button>
                <button disabled={adbl} id='ct' onClick={() => gum()}>Make Anon</button>  
            </div>
            <div className="category">

            </div>
        </div>
      </div>
      <div className="auth-form-container">
        <form onSubmit={e => handlesubmit(e)} className="form">
          <div className="catt">
          </div>  
          <div className="catt">
            <input name="text" value={text} onChange={e => onchanger(e)}/>
          </div>
          <br></br>
          <button type="onSubmit"  disabled={!text || adbl}>Make comment!</button>
        </form>
        <br></br>
        <div className="ulcontainer">
        <div className="Userinfo">
            <div className="category">
                <h3 className="hu">Comments:</h3> 
            </div> 
            <div className="category">
              <ul>
                 <h3>{ cm === undefined ? <div></div> : cm?.map((el) => (<><li><h4>{el?.user}</h4 ><pp>{el?.text}</pp></li><br></br></>))  }</h3>
               </ul>  
            </div>
            <br/>
         </div>
        </div>
        <form onSubmit={e => handlesubmitr(e)} className="form">
          <div className="catt">
            <label>Report</label>
          </div>  
          <div className="catt">
            <input name="concern" value={concern} onChange={e => onchange(e)}/>
          </div>
          <br></br>
          <button type="onSubmit"  disabled={!concern || adbl}>Report Post!</button>
        </form>
        <div className="Userinfo">
            <div className="category">
                <h3 className="hu">Reports:</h3> 
            </div> 
            <div className="category">
              <ul>
                 <h3>{ rp === undefined ? <div></div> : rp?.map((el) => (<><li><h4>{el?.user}</h4 ><pp>{el?.concern}</pp></li><br></br></>))  }</h3>
               </ul>  
            </div>
            <br/>
         </div>
      </div>
    </> 
  )    
}

export default Viewpost;


// sudo docker-compose up --build