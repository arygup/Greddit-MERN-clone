import React, {useState, useEffect} from "react";
import axios from "axios";

function Who(  ) {
  const  [rgg, setrgg] = useState({});
    
  useEffect(() => {
      const jwwt = JSON.stringify(localStorage.getItem('jwt')).replace('"', '');
      const jt = jwwt.replace('"', '');
      const config = {
        headers: {'x-auth-token': jt, 'Access-Control-Allow-Origin': 'http://localhost:8000'}
      }
      axios.get('http://localhost:8000/api/all', config, {port: 8000}).then((response) => {
        setrgg(response.data);
      });
      console.log(rg);
  }, [st]);

  if (!rg) return null;
    return (
    <> 
      <div className="ulcontainer">
      </div>
    </> 
  )    
}

export default Who;











