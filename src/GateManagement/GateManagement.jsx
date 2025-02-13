import React, { useState } from 'react';
import './GateManagement.css'; // Import the CSS module
import { ToastContainer, toast } from "react-toastify";

function GateManagement (){

  const [isAddGate, setIsAddGate]= useState(false);

  const handleGateToggle = (formType) =>{
    setIsAddGate(formType==='add')

  }    



  return(
    <div className='gate-management-form-container'>

          <p>Gate Management</p>

        <div className='gate-management-form-upper-section' >
            
          <button
          onClick={()=>handleGateToggle('add')}
          className={isAddGate? 'active-button':'inactive-button'}>
            Add Gate
          </button>
          <button
          onClick={()=>handleGateToggle('delete')}
          className={!isAddGate? 'active-button':'inactive-button'}>
            
            Delete Gate
          </button>
        </div>


        <div className='gate-management-form-middle-section'>
          {isAddGate?(<AddGateForm/>):(<DeleteGateForm/>)}
        </div>
        <div></div>

        <ToastContainer />
    </div>
  )
}


function AddGateForm (){
  const [addGateFormData, setAddGateFormData] = useState({
    gateName: '',
    portNumber:'',
    lcdMessage:'',
    gateType:'',
  })

  const handleAddGateInputChange = (e) =>{
    const {name, value} = e.target;
    setAddGateFormData((prev)=>({
      ...prev,
      [name]:value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', addGateFormData);
    // Add your save logic here
    toast.success("New Gates Details Saved Successfully",{
      closeOnClick:true
    })

    setAddGateFormData({
      gateName:'',
      portNumber:'',
      lcdMessage:'',
      gateType:''
  
    })

  };

  
  return(
    <div>
        <div className='add-or-delete-gate-management-form-container'>
          <form onSubmit={handleSubmit} action="">
            <label htmlFor="gateName">Gate Name</label>
            <input 
              type="text" 
              name='gateName'
              id='gateName'
              value={addGateFormData.gateName}
              onChange={handleAddGateInputChange}
              placeholder='Enter Gate Name'
              required
              />

            <label htmlFor="portNumber">Port Number</label>
            <input type="text" 
            name='portNumber'
            id='portNumber'
            value={addGateFormData.portNumber}
            onChange={handleAddGateInputChange}
            placeholder='Enter Port Number'
            required
            />

            <label htmlFor="lcdMessage">LCD Message</label>
            <input type="text" 
            name='lcdMessage'
            id='lcdMessage'
            value={addGateFormData.lcdMessage}
            onChange={handleAddGateInputChange}
            placeholder='Enter Message to Display on Screen'
            />

            <label htmlFor="gateType">Select Type</label>
            <select 
            name="gateType" 
            id="gateTypes"
            value={addGateFormData.gateType}
            onChange={handleAddGateInputChange}
            required
            >
              <option value="" disabled>Select Gate Type</option>
              <option value="Type1">Type1</option>
              <option value="Type2">Type2</option>
            </select>

            <button className='add-button-in-gate-management-form-container' type='submit'>Save Gate</button>

          </form>
        </div>
    </div>
  )
}


function DeleteGateForm () {
  const [deleteGateFormData, setdeleteGateFormData] = useState({
    gateName: '',
    portNumber:'',
    lcdMessage:'',
    gateType:'',
  })

  const handleDeleteGateInputChange = (e) =>{
    const {name, value} = e.target;
    setdeleteGateFormData((prev)=>({
      ...prev,
      [name]:value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', deleteGateFormData);
    // Add your save logic here
    toast.success("Gate Deleted Successfully!",{ 
    closeOnClick: true 
  });

  setdeleteGateFormData({
    gateName:'',
    portNumber:'',
    lcdMessage:'',
    gateType:''

  })


  };
  
  return(
    <div>
        <div className='add-or-delete-gate-management-form-container'>
          <form onSubmit={handleSubmit} action="">
            <label htmlFor="gateName">Gate Name</label>
            <input 
              type="text" 
              name='gateName'
              id='gateName'
              value={deleteGateFormData.gateName}
              onChange={handleDeleteGateInputChange}
              placeholder='Enter Gate Name'
              required
              />

            <label htmlFor="portNumber">Port Number</label>
            <input type="text" 
            name='portNumber'
            id='portNumber'
            value={deleteGateFormData.portNumber}
            onChange={handleDeleteGateInputChange}
            placeholder='Enter Port Number'
            required
            />

            <label htmlFor="lcdMessage">LCD Message</label>
            <input type="text" 
            name='lcdMessage'
            id='lcdMessage'
            value={deleteGateFormData.lcdMessage}
            onChange={handleDeleteGateInputChange}
            placeholder='Enter Message to Display on Screen'
            required
            />

            <label htmlFor="gateType">Select Type</label>
            <select 
            name="gateType" 
            id="gateTypes"
            value={deleteGateFormData.gateType}
            onChange={handleDeleteGateInputChange}
            required
            >
              <option value="" disabled>Select Gate Type</option>
              <option value="Type1">Type1</option>
              <option value="Type2">Type2</option>
            </select>

            <button className='delete-button-in-gate-management-form-container' type='submit'>Delete Gate</button>
          </form>
        </div>
    </div>
  )
}

export default GateManagement;