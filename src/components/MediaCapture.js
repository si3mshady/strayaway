import React from 'react'

export default function MediaCapture() {

    const loadedDOM = () => {
        document.addEventListener('DOMContentLoaded', (e) => {
            
            const camera_input = document.getElementById("camera")
            console.log('DOM loaded')
            console.log('Added eventlistener')
        
        
        
        } )
    }

    const getImage = (event) => {
        const camera_input = document.getElementById("camera")
        camera_input.addEventListener("change", (event) => {
            
            console.log(event.target.files[0].name)
            const image = document.getElementById("img")
            image.src = window.URL.createObjectURL(event.target.files[0])

            
        } )
    }
    return (
       <>
       {/* {loadedDOM()} */}
            <form action="#" id="form" encType="multipart/form-data">
                    

                    <input onClick={getImage} placeholder="Open Camera" type="file" id="camera"
                    accept="image/*" capture />
                    <img src="" id="img" alt="camera phone" />
            </form>

           
       
       </> 
     
    )
}
