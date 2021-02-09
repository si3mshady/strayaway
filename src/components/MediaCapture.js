import React from 'react'
import $ from 'jquery'
import '../App.css'
export default function MediaCapture() {
    const [displayImage, setDisplayImage] = React.useState(false)

    const getImage = (event) => {
        const camera_input = document.getElementById("camera")
        camera_input.addEventListener("change", (event) => {          
            
            if (event.target.files[0] !== null) {
                setDisplayImage(true)
                const image = document.getElementById("img")
                image.src = window.URL.createObjectURL(event.target.files[0])
               
            }
                      
        } )
    }
    return (
       <>     

            {displayImage && 
             <div> <img className="thumbnail-gen" src="" id="img" alt="camera phone" /> 
             </div>  }    
       
            <div>
            <button onClick={() => ( $('input').click() )}> Open Camera </button>
            <form           
                    action="#" id="form" encType="multipart/form-data">
                            <input hidden  onClick={getImage}  type="file" id="camera"
                            accept="image/*" capture />                            
                    </form>
            </div>
            
                    
       </> 
     
    )
}
