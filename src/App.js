import React from 'react'
import Amplify, { Auth } from 'aws-amplify';
import Location from "aws-sdk/clients/location";
import MediaCapture from './components/MediaCapture'
import awsconfig from './aws-exports';

// just send a list to api gateway lambda for batch update on location services 

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
  speed:null,
  timestamp: null
}

function App() {
  const [gps, setGPS] = React.useState([initialLocationState]) // uses an array of dictionaries 
  const [clicked, setButtonClicked ] = React.useState(false)
  const [gpsHistory, updateGPSHistory] =  React.useState([...gps]) // spread operator only works on iterables 

  const handleGeoLocation = (event) => {

    setGPS([{
      latitude:event.coords.latitude,
      longitude:event.coords.longitude,
      accuracy:event.coords.accuracy,
      timestamp: new Date().toISOString()
    }])     
    }

  const trackHistory = () => {
    updateGPSHistory(prev => ([ ...prev,...gps])) //create new array with previous elements and new
    console.log(gpsHistory)

  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoLocation)   
     // clean up after useEffect requires return statement for deactivated method that was triggered
     // not shown
},[clicked, gpsHistory])  // useEffect is triggered when selected pieces of state are updated 


  return (
    <div className='App'> Clean Slate    
     <br/>

     <MediaCapture/>
      <button onClick={()=> { setButtonClicked(!clicked); trackHistory() }}>Get GPS Location</button>
      <br/>
      {clicked? <div>     
              <ul style={{listStyle:"none",textAlign:"center"}}>

                  {gps.map((location, index) => 
                  
                  (
                    <>
                        <li key={index}>{location.longitude}</li>
                        <li key={index+1}>{location.latitude}</li>
                        <li key={index+2}>{location.accuracy}</li> 
                               
                    </> ))}
              </ul>

        
           
            
             </div>: null }
     </div>
  );
}

export default App;



//https://docs.amazonaws.cn/en_us/general/latest/gr/signing_aws_api_requests.html
//https://www.codegrepper.com/code-examples/delphi/js+date+now+to+iso+string
// sigv4 https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html 
///var isoDate = new Date().toISOString()