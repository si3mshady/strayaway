import React from 'react'
import Amplify, { Auth } from 'aws-amplify';
import Location from "aws-sdk/clients/location";
import MediaCapture from './components/MediaCapture'
import './App.css';
//https://docs.amazonaws.cn/en_us/general/latest/gr/signing_aws_api_requests.html
//https://www.codegrepper.com/code-examples/delphi/js+date+now+to+iso+string
// sigv4 https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html 
///var isoDate = new Date().toISOString()
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const createClient = async () => {
    const credentials = await Auth.currentCredentials();
    const client = new Location({
        credentials,
        region: awsconfig.aws_project_region,
   });
   return client;
}



const initialLocationState = {
  latitude: null,
  longitude: null,
  speed:null
}



function App() {
  const [gps, setGPS] = React.useState(initialLocationState)
  const  [mounted, setMounted ] = React.useState(false)
  const handleGeoLocation = (event) => {

    setGPS({
      latitude:event.coords.latitude,
      longitude:event.coords.longitude,
      accuracy:event.coords.accuracy
    })     

    console.log({
      latitude:event.coords.latitude,
      longitude:event.coords.longitude,
      accuracy:event.coords.accuracy
    })

  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoLocation)    // clean up after useEffect
 // return () => {  setMounted(false) }     
},[mounted])


  return (
    <div className='App'> Clean Slate    
     <br/>
      <button onClick={()=> { setMounted(!mounted) }}>Get GPS Location</button>
      <br/>
      {mounted? <div> 
           <p>{gps.latitude}</p> 
           <p>{gps.longitude}</p> 
           <p>{gps.accuracy}</p>   
           
            
             </div>: null }
     </div>
  );
}

export default App;
