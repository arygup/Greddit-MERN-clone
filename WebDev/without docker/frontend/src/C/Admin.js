import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from 'react-router';

function Admin( ) {
  const  [rg, setrg] = useState({});
  const [st, setst] = useState(0); 
  const [fw, setfw] = useState();
  const [bn, setbn] = useState();
  const [rq, setrq] = useState();
  const { uid } = useParams();
  //console.log(uid);
  useEffect(() => {
      const config = {
        headers: {'Access-Control-Allow-Origin': 'http://localhost:8000'}
      }
      axios.get(`http://localhost:8000/api/sub/${uid}`, config, {port: 8000}).then((response) => {
        setrg(response.data);
        const x = (JSON.stringify(localStorage.getItem('usr')).replace('"', '')).replace('"', '');
        if(!(x === response.data.admin))
        {
            window.location.href=`/`;
        }
        //console.log(response.data);
        setfw(response.data.followers);
        setbn(response.data.blocked);
        setrq(response.data.requested);
        //console.log(response.data.blocked);
        setst(1);
      });
      //console.log(rg);
   }, [st]);
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
  function rej(usr)
  {
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/sub/rej/${rg._id}/${usr}`, {}, config)
      .then((response) => {
        setst({usr});
        console.log(usr);
      }).catch(err => console.log(err));
    console.log(usr);
  }
  function acc(usr)
  {
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/sub/acc/${rg._id}/${usr}`, {}, config)
      .then((response) => {
        setst({usr});
        console.log(usr);
      }).catch(err => console.log(err));
    console.log(usr);
  }
  if (!rg) return null;
    return (
    <> 
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
                <h3 className="hd">{rg?.pno?.length}</h3>
            </div>
            <div className="category">
                <h3 className="hu">Number of followers:</h3>
                <h3 className="hd">{rg?.followers?.length}</h3>
            </div>
            <br/>
            <br/>
            <button id='btnnn' onClick={() => del()} className="logout">Delete Sub</button>
        </div>
      </div>
      <div className="ulcontainer">
      <div className="Userinfo">
            <div className="category">
                <h3 className="hu">People who requested to follow:</h3> 
                <h3 className="hd"></h3>
            </div> 
            <div className="category">
              <ul>
                 <h3>{ rq === undefined ? <div></div> : rq.map((el) => (<><li><button onClick={() => acc(el.user)} >{el.user}</button><button onClick={() => rej(el.user)} className="logouthead">Reject</button><br></br></li></>))  }</h3>
               </ul>  
            </div>
            <div className="category">
                <h3 className="hu">People who follow:</h3> 
                <h3 className="hd"></h3>
            </div> 
            <div className="category">
              <ul>
                 <h3>{ fw === undefined ? <div></div> : fw.map((el) => (<><li><p >{el.user}</p></li><br></br></>))  }</h3>
               </ul>  
            </div>
            <div className="category">
                <h3 className="hu">People who are banned/left:</h3> 
                <h3 className="hd"></h3>
            </div> 
            <div className="category">
              <ul>
                 <h3>{ bn === undefined ? <div></div> : bn.map((el) => (<><li><p >{el.user}</p></li><br></br></>))  }</h3>
               </ul>  
            </div>
            <br/>
        </div>
      </div>
    </> 
  )    
}

export default Admin;











