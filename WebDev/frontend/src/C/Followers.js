import React, {useState, useEffect} from "react";
import axios from "axios";

function Followers( ) {
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
  function unf(usr) {
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/users/unfollow/${usr}`, {}, config)
      .then((response) => {
        setst({usr});
        console.log(usr);
      }).catch(err => console.log(err));
    console.log(usr);
  }
  function rmf(usr)
  {
    const token = (JSON.stringify(localStorage.getItem('jwt')).replace('"', '')).replace('"', '');
    const config = {
      headers: {
        'x-auth-token': token,
        'Access-Control-Allow-Origin': 'http://localhost:8000'
      }
    };
    axios.put(`http://localhost:8000/api/users/rmfollow/${usr}`, {}, config, {port: 8000})  // gotta make api
    .then((response) => {
      setst({usr});
      console.log(usr);
    }).catch(err => console.log(err))
    console.log(usr);
  }
  useEffect(() => {
    const jwwt = JSON.stringify(localStorage.getItem('jwt')).replace('"', '');
    const jt = jwwt.replace('"', '');
    const config = {
      headers: {'x-auth-token': jt, 'Access-Control-Allow-Origin': 'http://localhost:8000'}
    }
    axios.get('http://localhost:8000/api/users/me', config, {port: 8000}).then((response) => {
      setrg(response.data);
      setfw(response.data.followers);
      setfj(response.data.followings);
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
                <h3 className="hu">Number of following: </h3> 
                <h3 className="hd">{rg.followers.length}</h3>
            </div> 
            <div className="category">
              <ul>
                 <h3>{ fj === undefined ? <div></div> : fw.map((el) => (<><li><button onClick={() => unf(el.user)}>{el.user}</button></li><br></br></>))  }</h3>
               </ul>  
            </div>
            <p>(click on user you want to remove)</p> 
            <div className="category">
                <h3 className="hu">Number of followers: </h3> 
                <h3 className="hd">{rg.followings.length}</h3>
            </div>
            <div className="category">
            <h3>{ fj === undefined ? <div></div> : fj.map((el) => (<><li><button onClick={() => rmf(el.user)}>{el.user}</button></li><br></br></>))  }</h3>
            </div>
            <br/>
        </div>
      </div>
    </> 
  )    
}



export default Followers;











