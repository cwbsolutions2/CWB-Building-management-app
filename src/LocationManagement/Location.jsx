import { useState } from "react";
import './Location.css'
import {ToastContainer, toast } from "react-toastify";

function LocationManagement () {

    const [isAddLocation,setIsAddLocation]=useState(false);

    const handleLocationToggle =(formType)=>{
        setIsAddLocation(formType==="add")
    }


    return(
         /*I used the same class names in the gate managemnt class since they look the same (Page will get the style from that file). Change the class name and update accordingly if you want create a specific style*/
        <div className='gate-management-form-container'>
    
              <p>Location Management</p>
    
            <div className='gate-management-form-upper-section' >
                
              <button
              onClick={()=>handleLocationToggle('add')}
              className={isAddLocation? 'active-button':'inactive-button'}>
                Add Gate
              </button>
              <button
              onClick={()=>handleLocationToggle('delete')}
              className={!isAddLocation? 'active-button':'inactive-button'}>
                
                Delete Gate
              </button>
            </div>
    
    
            <div className='gate-management-form-middle-section'>
              {isAddLocation?(<AddLocationForm/>):(<DeleteLocationForm/>)}
            </div>
            <div></div>
    
            <ToastContainer />
        </div>
      )
}


function AddLocationForm (){
     
    const [addLocationFormData, setAddLocationFormData] = useState({
        connectedDevices:'',
        ipAddress:'',
        address:'',
        description:'',
        name:'',
        locationName:''
    })

    const handleInputChange = (e) =>{
        e.preventDefault();
        const {name,value} = e.target;
        setAddLocationFormData((prev)=>({
            ...prev,
            [name]:value,
        }))
    }

    const handleSubmit = (e)=>{
        console.log('Form Submitted:',addLocationFormData)
        toast.success('Location Added Successfully',{
            closeOnClick:true
        
        })

        setAddLocationFormData({
            locationName:'',
            connectedDevices:'',
            ipAddress:'',
            address:'',
            description:'',
        })
    }

    const maxLength = 100; // Maximum characters for the description
    const remainingCharacters = maxLength - addLocationFormData.description.length; // Calculate remaining characters

    return(
        <div>
            <div className="add-or-delete-location-management-form-container">
                <form onSubmit={handleSubmit} action="">

                <label htmlFor="locationName">Location Name</label>
                <input 
                type="locationName" 
                name="locationName" 
                id="locationName" 
                value={addLocationFormData.locationName}
                onChange={handleInputChange}
                placeholder="Enter Location Name"
                required/>

                <label htmlFor="connectedDevices">Capacity of connected Hardware devices</label>
                <select 
                name="connectedDevices" 
                id="connectedDevices"
                value={addLocationFormData.connectedDevices}
                onChange={handleInputChange}
                required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>

                <label htmlFor="ipAddress">URL/IP Address</label>
                <input 
                type="url" 
                name="ipAddress" 
                id="ipAddress" 
                value={addLocationFormData.ipAddress}
                onChange={handleInputChange}
                placeholder="Enter Location URL/IP Address"
                required/>

                <label htmlFor="address">Adress</label>
                <input 
                type="text" 
                name="address" 
                id="address" 
                value={addLocationFormData.address
                }
                onChange={handleInputChange}
                placeholder="Enter Location Address"
                required/>

                <label htmlFor="description">Description</label>
                <textarea 
                name="description" 
                id="description"
                value={addLocationFormData.description}
                onChange={handleInputChange}
                placeholder="Enter Description"
                maxLength={100}>
                
                </textarea>
                <p className="remaining-characters-in-text-area-in-location-management">
                    Remaining characters: {remainingCharacters}
                </p>
                
                {/*Use the same class in gate management */}
                <button className="add-button-in-gate-management-form-container">Save Location</button>

                </form>
            </div>
        </div>
    )

}

function DeleteLocationForm(){

    const[deleteLocationFormData,setDeleteLocationFormData] =useState ({
        locationName:'',
        connectedDevices:'',
        ipAddress:'',
        address:'',
        description:''
    })

    const handleInputChange = (e) =>{
        const{name, value} = e.target;
        setDeleteLocationFormData((prev)=>({
            ...prev,
            [name]:value,
        }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Form Submitted", deleteLocationFormData)
        toast.success("Location Deleted Successfully",{
            closeOnClick:true
        })

        setDeleteLocationFormData({
            locationName:'',
            connectedDevices:'',
            ipAddress:'',
            address:'',
            description:''
        })
    }

    const maxLength = 100; // Maximum characters for the description
    const remainingCharacters = maxLength - deleteLocationFormData.description.length; // Calculate remaining characters



    return(
        <div>
            <div className="add-or-delete-location-management-form-container">
                <form onSubmit={handleSubmit} action="">

                <label htmlFor="locationName">Location Name</label>
                <input 
                type="locationName" 
                name="locationName" 
                id="locationName" 
                value={deleteLocationFormData.locationName}
                onChange={handleInputChange}
                placeholder="Enter Location Name"
                required/>

                <label htmlFor="connectedDevices">Capacity of connected Hardware devices</label>
                <select 
                name="connectedDevices" 
                id="connectedDevices"
                value={deleteLocationFormData.connectedDevices}
                onChange={handleInputChange}
                required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>

                <label htmlFor="ipAddress">URL/IP Address</label>
                <input 
                type="url" 
                name="ipAddress" 
                id="ipAddress" 
                value={deleteLocationFormData.ipAddress}
                onChange={handleInputChange}
                placeholder="Enter Location URL/IP Address"
                required/>

                <label htmlFor="address">Address</label>
                <input 
                type="text" 
                name="address" 
                id="address" 
                value={deleteLocationFormData.address}
                onChange={handleInputChange}
                placeholder="Enter Location Address"
                required/>

                <label htmlFor="description">Description</label>
                <textarea 
                name="description" 
                id="description"
                value={deleteLocationFormData.description}
                onChange={handleInputChange}
                placeholder="Enter Description"
                maxLength={100}>
                </textarea>
                <p className="remaining-characters-in-text-area-in-location-management">
                        Remaining characters: {remainingCharacters}
                </p>

                {/*Use the same class in gate management */}
                <button className="delete-button-in-gate-management-form-container">Delete Location</button>

                </form>
            </div>
        </div>        
    )
}


export default LocationManagement;