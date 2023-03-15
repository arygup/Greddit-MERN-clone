import React, {useState, useEffect} from "react";
import axios from "axios";

function Tofollower( ) {
  const  [rg, setrg] = useState({
    fname: '',
    lname: '',
    uname: '',
    email : '',
    age : '',
    pno : '',
    password : '',
    followers : {user: '', _id: ''},
    followings : {user: '', _id: ''}
  });
  const [st, setst] = useState(0);
  const [fw, setfw] = useState();
  const [fj, setfj] = useState('alp');
  function fww(usr)
  {
    window.location.href=`/sub/${usr}`;
  }
  function ffw()
  {
    window.location.href=`/sub/make`;
  }
  useEffect(() => {
    const jwwt = JSON.stringify(localStorage.getItem('jwt')).replace('"', '');
    const jt = jwwt.replace('"', '');
    //alert(jt);
    const config = {
      headers: {'x-auth-token': jt, 'Access-Control-Allow-Origin': 'http://localhost:8000'}
    }
    //alert(fj);
    axios.get(`http://localhost:8000/api/sub/all/${fj}`, config, {port: 8000}).then((response) => {
      setfw(response.data);
      setst(1);
      console.log(fw[0]);
    });
}, [st]);

    return (
    <> 
      <div className="ulcontainer">
        <div className="Userinfo">
            <div className="category">
                <h3 className="hu">All subs available</h3> 
                <h3 className="hd"></h3>
            </div> 
            <div className="category">
              <ul>
                 <h3>{ fw === undefined ? <div></div> : fw.map((el) => (<><li><button onClick={() => fww(el._id)}>{el.name}</button></li><br></br></>))  }</h3>
               <button onClick={() => ffw()}>Make a new sub</button>
               <br/> <br/>
               </ul>  
            </div>
            <br/>
            <p>(click on sub you want to open)</p> 
            <br/>
        </div>
      </div>
      <div className="ulcontainer">
                <button onClick={() => {setfj('dt'); setst(9);}}>Sort by date</button>
                <br/>
               <button onClick={() => {setfj('flw'); setst(9);}}>Sort by followers</button>
               <br/>
               <button onClick={() => {setfj('alp'); setst(9);}}>Sort by name</button> 
               <br/>
               <button onClick={() => {setfj('bonus'); setst(9);}}>Sort by date then followers</button>
    </div>
    </> 
  )    
}

export default Tofollower;
