import React, {useState, useEffect} from "react";
import axios from "axios";

function Savedposts( ) {
  const  [rg, setrg] = useState({});
  const [st, setst] = useState(0);
  const [fw, setfw] = useState();
  const [fj, setfj] = useState();
  function view(pid)
  {
    window.location.href=`/post/${pid}`;
  };
  function rej(pid)
  {
    //document.getElementById('bttttt').style.visibility= 'hidden';
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/users/unsave/${pid}`, {}, config)
      .then((response) => {
        setst(9);
        //alert('post unsaved');
      }).catch(err => alert(err));
  }
  useEffect(() => {
    const jwwt = JSON.stringify(localStorage.getItem('jwt')).replace('"', '');
    const jt = jwwt.replace('"', '');
    const config = {
      headers: {'x-auth-token': jt, 'Access-Control-Allow-Origin': 'http://localhost:8000'}
    }
    axios.get('http://localhost:8000/api/users/me', config, {port: 8000}).then((response) => {
      setrg(response.data);
      setfw(response.data.saved);
      //console.log(response.data.followings);
      setst(1);
      console.log(fw);
    });
}, [st]);

    return (
    <> 
      <div className="ulcontainer">
        <div className="Userinfo">
            <div className="category">
                <h3 className="hu">Number of saved posts: </h3> 
                <h3 className="hd">{fw?.length}</h3>
            </div> 
            <div className="category">
              <ul>
                 <h3>{ fw === undefined ? <div></div> : fw.map((el) => (<><li><button onClick={() => view(el.post)} >{el.post}</button><button onClick={() => rej(el.post)} className="logouthead">Unsave</button></li><br></br></>))  }</h3>
               </ul>  
            </div>
            <br/>
        </div>
      </div>
    </> 
  )    
}



export default Savedposts;











