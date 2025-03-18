import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './UserModification.css';

const UserModification = () => {
  const [formData, setFormData] = useState({
    command: '',
    carparkCode: '',
    sNumber: '',
    lprNumber: '',
    vehicleNumber: '',
    fromDate: '',
    toDate: '',
    holderName: '',
    companyName: '',
    address: '',
    contactNumber: '',
    remark: '',
    formSavedTime: '',   // This will hold the Singapore time
  });

  // Function to get the current Singapore date and time in the desired format
    const getSingaporeDateTime = () => {
    const now = new Date();
    // Adjust to Singapore time by using the correct timeZone
    const singaporeTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
    const year = singaporeTime.getFullYear();
    const month = String(singaporeTime.getMonth() + 1).padStart(2, '0');
    const day = String(singaporeTime.getDate()).padStart(2, '0');
    const hours = String(singaporeTime.getHours()).padStart(2, '0');
    const minutes = String(singaporeTime.getMinutes()).padStart(2, '0');
    const seconds = String(singaporeTime.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
    };

  // Validate 'fromDate' (should not be in the past)
  const validateFromDate = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date(); // Current date object
    currentDate.setHours(0, 0, 0, 0); // Reset time for today (only compare dates, not time)

      if (selectedDate < currentDate) {
        setFormData((prev) => ({ ...prev, fromDate: '' })); // Clear the input field
        toast.warn("The starting date cannot be in the past!", {
          closeOnClick: true,
          autoClose:2000,
          className: "my-toast-warning",
        });
      } else {
        // Revalidate 'toDate' if already set
        if (formData.toDate) {
          validateToDate(formData.toDate, value);
        }
      }
    };

  // Validate 'toDate' (should be greater than or equal to 'fromDate')
  const validateToDate = (toDate, fromDate) => {
      const selectedToDate = new Date(toDate);
      const selectedFromDate = new Date(fromDate);

      if (selectedToDate < selectedFromDate) {
        setFormData((prev) => ({ ...prev, toDate: '' })); // Clear the input field
        toast.warn("The ending date must be after or equal to the starting date!", {
          closeOnClick: true,
          autoClose:2000,
          className: "my-toast-warning",
        });
      }
  };

    const validateContactNumber =(value) =>{
      const hasLowercase = /[a-z]/; // Checks for at least one lowercase letter
      const hasUppercase = /[A-Z]/; // Checks for at least one uppercase letter
      
      if((hasLowercase.test(value))||(hasUppercase.test(value))){
        setFormData((prev)=>({...prev,contactNumber:''}))
        toast.warn('Contact Number cannot contain any letters!',{
          closeOnClick:true,
          autoClose:1500,
          className:"my-toast-warning"
        })
      }
    }
    
    const formatDateToYYYYMMDD = (dateString) => {
        const date = new Date(dateString); // Convert string to Date object
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 because months are 0-indexed
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}${month}${day}`;
    };


    // Update the formSavedTime with Singapore time every second
    useEffect(() => {
        const intervalId = setInterval(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            formSavedTime: getSingaporeDateTime(),
         }));
        }, 1000); // Update time every 1 second

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        let formattedFromDate,formattedToDate;
        formattedFromDate = formatDateToYYYYMMDD(formData.fromDate)
        formattedToDate = formatDateToYYYYMMDD(formData.toDate)


        // You can perform any actions here, like sending the formData to a server.
        console.log('Form submitted:', formData);
        
        let fileHeader;

        fileHeader= formData.carparkCode + '_' + formData.formSavedTime
        console.log(fileHeader);

        let filedata;

        filedata=formData.command+"|"+formData.carparkCode+"|"+formData.sNumber+"|"+formData.lprNumber+"|"+formData.vehicleNumber+"|"+formattedFromDate+"|"+formattedToDate+"|"+formData.holderName+"|"+formData.companyName+"|" + formData.address +"|" + formData.contactNumber+ "|" + formData.remark

        console.log(filedata)

        if((formData.contactNumber.length!=0)&&(formData.contactNumber.length<10)){
          toast.warn("The contact number length is invalid",{
            closeOnClick:true,
            className:"my-toast-warning"
          })
        }else {

          if(formData.command=="Add"){
            toast.success("Successfully Saved", {
              position: "top-right",
              autoClose: 4500, // Auto close after 3 seconds
              hideProgressBar: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              className: 'my-toast'
          });
          }
  
          if(formData.command=="Update"){
            toast.success("Details Update Request, Successfully Saved", {
              position: "top-right",
              autoClose: 4500, // Auto close after 3 seconds
              hideProgressBar: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              className: 'my-toast'
          });
          }

          if(formData.command=="Delete"){
            toast.success("Details Delete request, Successfully Saved", {
              position: "top-right",
              autoClose: 4500, // Auto close after 3 seconds
              hideProgressBar: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              className: 'my-toast'
          });
          }
        
      const fileName = `${fileHeader}.txt`
      const formDataString = filedata;

      // Create a Blob object with the form data string
      const fileBlob = new Blob([formDataString], { type: "text/plain" });

      // Create a download link for the file
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(fileBlob);
      downloadLink.download = fileName;



      // Append the link to the document and trigger the download
      document.body.appendChild(downloadLink);  
      downloadLink.click();

      // Clean up
      document.body.removeChild(downloadLink);

    }

        // Reset form data after submission (including resetting formSavedTime)
        setFormData({
        command: '',
        carparkCode: '',
        sNumber: '',
        lprNumber: '',
        vehicleNumber: '',
        fromDate: '',
        toDate: '',
        holderName: '',
        companyName: '',
        address: '',
        contactNumber: '',
        remark: '',
        formSavedTime: '' // Reset this as well
        });
    };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'fromDate') {
      validateFromDate(value);
    }

    if(name==='toDate'){
      validateToDate(value,formData.fromDate)
    }

    if (name==='contactNumber'){
      validateContactNumber(value);
    }

  };


  return (
    <div className="super-form-container">
      <div className="form-container">

        <div className="form-upper-section">

        <p className="user-modification-form-heading">Vehicle Details Form</p>

        <ToastContainer />
        </div>

        <div className="form-middle-section">
          <form onSubmit={handleSubmit}>
            <label htmlFor="command">Select Action</label>
            <select
                name="command"
                id="command"
                value={formData.command}
                onChange={handleInputChange}
            >
                <option value="" disabled>Select Action</option>
                <option value="Add">Add</option>
                <option value="Delete">Delete</option>
                <option value="Update">Update</option>
            </select>

            <label htmlFor="carparkCode">Car Park Code</label>
            <input 
                type="text" 
                name="carparkCode" 
                id="carParkCode" 
                value={formData.carparkCode}
                onChange={handleInputChange}
                pattern="[A-Z,a-z,0-9]{4}"
                placeholder="Enter Car Park Code or Site Short Name (Ex:BM33)"
                required
            />

            <label htmlFor="sNumber">S/No</label>
            <input
                type="text"
                id="sNumber"
                name="sNumber"
                value={formData.sNumber}
                onChange={handleInputChange}
                pattern="[0-9]{4}"
                placeholder="Enter S/No: 0001-9999"
                required
            />

            <label htmlFor="lprNumber">IU/LPR Number</label>
            <input
                type="text"
                id="lprNumber"
                name="lprNumber"
                value={formData.lprNumber}
                onChange={handleInputChange}
                placeholder="Enter IU/LPR Number with 10 Characters"
                maxLength={10}
                required
            />

            <label htmlFor="vehicleNumber">Vehicle Number</label>
            <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                placeholder="Enter Vehicle Number"
                required
            />

            <label htmlFor="fromDate">Starting Date</label>
            <input
                type="date"
                id="fromDate"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="toDate">Ending Date</label>
            <input
                type="date"
                id="toDate"
                name="toDate"
                value={formData.toDate}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="holderName">Holder's Name</label>
            <input
                type="text"
                id="holderName"
                name="holderName"
                value={formData.holderName}
                onChange={handleInputChange}
                placeholder="Enter Holder's Name"
            />

            <label htmlFor="companyName">Company Name</label>
            <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter Company Name"
            />

            <label htmlFor="address">Address</label>
            <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
            />

            <label htmlFor="contactNumber">Contact Number</label>
            <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="+65123456789"
            />

            <label htmlFor="remarks">Remarks</label>
            <input
                type="text"
                id="remarks"
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}
                placeholder="Enter Remarks"
            />

            {/* Live-updating Date and Time field (Singapore Time) */}
            <input 
              type="text" 
              name="formSavedTime"
              id="formSavedTime"
              value={formData.formSavedTime}
              readOnly
              className="user-modification-form-saved-time"
            />

            <button type="submit">Save</button>
          </form>

        </div>

        <div className="form-bottom-section"></div>
      </div>
    </div>
  );
};

export default UserModification;
