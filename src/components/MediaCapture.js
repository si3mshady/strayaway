import React from 'react'
import $ from 'jquery'
import '../App.css'
import image from '../camera.svg'
export default function MediaCapture() {
    
    const [displayImage, setDisplayImage] = React.useState(false)
    

    const getImage = (event) => {
        $("#camera").on("change", (event) => {
            if (event.target.files[0] !== null) {
                setDisplayImage(true)
                const image = document.getElementById("img")
                image.src = window.URL.createObjectURL(event.target.files[0]) 
                }  } ) }
    return (
       <>  
       
            {displayImage ?
             <div> <img className="thumbnail-gen" src="" id="img" alt="camera phone" />                          
              </div> : <img src={image} /> }    
       
                    {/* <div> */}
            <div className="row">
                <div className="col-1-of-2">
                <button onClick={() => ( $('input').click() )}> Open Camera </button>

                

                    <form  action="#" id="form" encType="multipart/form-data">
                    <input hidden  onClick={getImage} 
                    type="file" id="camera" accept="image/*" capture />
                    </form>
              </div>
              <div className="col-1-of-2">


              <button>Get GPS Location</button>


              </div>

              


                
                
                   
                    </div>           
                    
       </> 
     
    )
}
