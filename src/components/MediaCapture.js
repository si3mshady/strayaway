import React from 'react'

export default function MediaCapture() {

    const getImage = (event) => {
        const camera_input = document.getElementById("camera")
        camera_input.addEventListener("change", (event) => {
            console.dir(event)
            console.log(event)

            
        } )
    }
    return (
       <>
            <form action="#" id="form" enctype="multipart/form-data">
                    <input onChange={getImage} type="file" id="camera"
                    accept="image/*" capture />
                    <img src="" id="img" alt="camera phone" />
            </form>

           
       
       </> 
     
    )
}
