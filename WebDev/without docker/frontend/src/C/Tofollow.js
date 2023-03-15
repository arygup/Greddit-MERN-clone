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
  const [fj, setfj] = useState();
  function fww(usr)
  {
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
        console.log(usr);
      }).catch(err => console.log(err));
    console.log(usr);
  }
  useEffect(() => {
    const jwwt = JSON.stringify(localStorage.getItem('jwt')).replace('"', '');
    const jt = jwwt.replace('"', '');
    //alert(jt);
    const config = {
      headers: {'x-auth-token': jt, 'Access-Control-Allow-Origin': 'http://localhost:8000'}
    }
    axios.get('http://localhost:8000/api/users/all', config, {port: 8000}).then((response) => {
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
                <h3 className="hu">More people to follow:</h3> 
                <h3 className="hd"></h3>
            </div> 
            <div className="category">
              <ul>
                 <h3>{ fw === undefined ? <div></div> : fw.map((el) => (<><li><button onClick={() => fww(el._id)}>{el._id}</button></li><br></br></>))  }</h3>
               </ul>  
            </div>
            <p>(click on user you want to follow)</p> 
            <br/>
        </div>
      </div>
    </> 
  )    
}



export default Tofollower;











