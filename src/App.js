import React from 'react'
import  {API} from "aws-amplify"
import Axios from 'axios'
import Location from "aws-sdk/clients/location";
import MediaCapture from './components/MediaCapture'
// just send a list to api gateway lambda for batch update on location services 

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
    updateGPSHistory(prev => ([ ...prev,...gps])) //create new array with new & previous elements
    console.log(gpsHistory)
  }

     /* clean up after useEffect requires return statement for deactivated method that was triggered
      not shown */
  React.useEffect(() => { navigator.geolocation.getCurrentPosition(handleGeoLocation)},[clicked])  // useEffect is triggered ONLY when selected pieces of state are updated 
  React.useEffect(() => {
    const url = "https://72zu52q14g.execute-api.us-east-1.amazonaws.com/dev/tracker"
    Axios.post(url, gpsHistory)
      .then(response => {
        console.log(response)
        console.log("updated gpsHistory")
      })
      .catch(error => {
        console.log(error)
        
      })

  }, [gpsHistory])
  return (
    <div className='App'> Stray Away   
     <br/>

     <MediaCapture/>
      <button onClick={()=> { setButtonClicked(!clicked); trackHistory() }}>Get GPS Location</button>
      <br/>
      {clicked? <div style={{textAlign:"center"}}>     
              <ul style={{listStyle:"none"}}>

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
//https://www.youtube.com/watch?v=dbrez37HlJM
///var isoDate = new Date().toISOString()