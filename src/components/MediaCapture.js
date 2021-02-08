import React from 'react'
import '../App.css'
export default function MediaCapture() {

    // const loadedDOM = () => {
    //     document.addEventListener('DOMContentLoaded', (e) => {
            
    //         const camera_input = document.getElementById("camera")
    //         console.log('DOM loaded')
    //         console.log('Added eventlistener')
        
        
        
    //     } )
    // }

    const getImage = (event) => {
        const camera_input = document.getElementById("camera")
        camera_input.addEventListener("change", (event) => {
            
            console.log(event.target.files[0].name)
            const image = document.getElementById("img")
            image.src = window.URL.createObjectURL(event.target.files[0])
            console.log(image.src)            
        } )
    }
    return (
       <>     
            <form 
          
             action="#" id="form" encType="multipart/form-data">
                    <input  onClick={getImage} placeholder="Open Camera" type="file" id="camera"
                    accept="image/*" capture />
                    <img className="thumbnail-gen" src="" id="img" alt="camera phone" />
            </form>
       </> 
     
    )
}
