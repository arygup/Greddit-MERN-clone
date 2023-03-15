import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from 'react-router';
import logo from './logo512.png'; 

function Sub( ) {
  const  [rg, setrg] = useState({});
  const [st, setst] = useState(0); 
  const [psts, setpsts] = useState(); 
  const { uid } = useParams();
  useEffect(() => {
      const config = {
        headers: {'Access-Control-Allow-Origin': 'http://localhost:8000'}
      }
      axios.get(`http://localhost:8000/api/sub/${uid}`, config, {port: 8000}).then((response) => {
        setrg(response.data);
        setpsts(response.data.pst);
        const x = (JSON.stringify(localStorage.getItem('usr')).replace('"', '')).replace('"', '');
        if(response.data.admin === x)
        {
          document.getElementById('btn').style.visibility= 'hidden';
        }
        setst(1);
      });
      console.log(rg);
  }, [st]);
  function view(pid)
  {
    window.location.href=`/post/${pid}`;
  }
  function mkpsts()
  {
    window.location.href=`/makepost/${uid}`;
  }
  function admn()
  {
    document.getElementById('bt').style.visibility= 'hidden';
    const x = (JSON.stringify(localStorage.getItem('usr')).replace('"', '')).replace('"', '');
    //console.log(x);
    if(x === rg.admin)
    {
      window.location.href=`/sub/admin/${uid}`;
    }
  }
  function unfw()
  {
    document.getElementById('btn').style.visibility= 'hidden';
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/sub/unfollow/${uid}`, {}, config)
      .then((response) => {
        setst({uid});
        console.log(uid);
      }).catch(err => alert(err+": not followed by you"));
    console.log(uid);
  }
  function ffw()
  {
    document.getElementById('btnn').style.visibility= 'hidden';
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/sub/follow/${uid}`, {}, config)
      .then((response) => {
        setst({uid});
        console.log(uid);
      }).catch(err => alert(err+": already requested/banned/following"));
    console.log(uid);
  }
  function del()
  {
    document.getElementById('btnnn').style.visibility= 'hidden';
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.delete(`http://localhost:8000/api/sub/del/${uid}`, config)
      .then((response) => {
        setst({uid});
        alert("deleted");
        window.location.href="/";
      }).catch(err => alert(err+': this user not authenticated'));
    console.log(uid);
  }
  if (!rg) return null;
    return (
    <> 
      <img src={logo} alt="Logo"/>
      <div className="ulcontainer">
        <div className="Userinfo">
            <div className="category">
                <h3 className="hu">Sub reddit name:</h3> 
                <h3 className="hd">{rg.name}</h3>
            </div>
                <div className="category">
                <h3 className="hu">Description:</h3>
            <h3 className="hd">{rg.desc}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Banned words:</h3> 
                <h3 className="hd">{rg.banned}</h3>
            </div>
                <div className="category">
                <h3 className="hu">Tags:</h3>
            <h3 className="hd">{rg.tags}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Number of posts:</h3>
                <h3 className="hd">{rg?.pst?.length}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Number of followers:</h3>
                <h3 className="hd">{rg?.followers?.length}</h3>
            </div>
            <br/>
            <button id='btnn' onClick={() => ffw()}>Request to follow</button>
            <br/>
            <button id='btn' onClick={() => unfw()} >Unfollow</button>
            <br/>
            <button id='bt' onClick={() => admn()} >Admin only access</button>
            <br/>
            <br/>
            {/* <button id='btnnn' onClick={() => del()} className="logout">Delete Sub</button> */}
        </div>
      </div>
      <div className="ulcontainer">
        <div className="Userinfo">
            <div className="category">
                <h3 className="hu">Posts:</h3> 
                <h3 className="hd"></h3>
            </div> 
            <div className="category">
              <ul>
                 <h3>{ psts === undefined ? <div></div> : psts.map((el) => (<><li><button onClick={() => view(el.post)} >{el.post}</button></li><br></br></>))  }</h3>
               </ul>  
            </div>
            <button id='btt' onClick={() => mkpsts()}>Make new post</button>
          </div>
        </div>
    </> 
  )    
}

export default Sub;