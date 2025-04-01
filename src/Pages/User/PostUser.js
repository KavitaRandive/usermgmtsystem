import { useState } from "react";
import "./User.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostUser = () => {

    

    const [formdata, setformdata] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        emailId: "",
        address: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!formdata.firstName.trim() || formdata.firstName.length < 2) {
            newErrors.firstName = "First Name must be at least 2 characters long.";
        }
        if (!formdata.lastName.trim() || formdata.lastName.length < 2) {
            newErrors.lastName = "Last Name must be at least 2 characters long.";
        }
        if (!/^\d{10}$/.test(formdata.phoneNo)) {
            newErrors.phoneNo = "Phone Number must be exactly 10 digits.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.emailId)) {
            newErrors.emailId = "Enter a valid Email ID.";
        }
        if (!formdata.address.trim()) {
            newErrors.address = "Address cannot be empty.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const HandleInputChange = (event) => {
        const { name, value } = event.target;
        setformdata({
            ...formdata,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    // const HandleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!validate()) return; // Stop if validation fails

    //     console.log(formdata);
    //     try {
    //         const response = await fetch("http://localhost:8080/user/save", {
    //             method: "POST",
    //             headers: { "Content-Type": "Application/json" },
    //             body: JSON.stringify(formdata),
    //         });
    //         const data = await response.json();
    //         console.log("User Saved", data);
    //         navigate("/data-saved");
    //     } catch (error) {
    //         console.log("Error While Saving Details", error.message);
    //     }
    // };
    // const HandleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!validate()) return; // Stop if validation fails
    
    //     console.log(formdata);
    //     try {
    //         const response = await fetch("http://localhost:8080/user/save", {
    //             method: "POST",
    //             headers: { "Content-Type": "Application/json" },
    //             body: JSON.stringify(formdata),
    //         });
    
    //         if (!response.ok) {
    //             const errorText = await response.text(); // Read error message
    //             throw new Error(errorText); 
    //         }
    
    //         const data = await response.json();
    //         console.log("User Saved", data);
    //         navigate("/data-saved");
    
    //     } catch (error) {
    //         console.log("Error While Saving Details", error.message);
            
    //         if (error.message.includes("Email or Phone Number already exists")) {
    //             setErrors({ ...errors, emailId: "Email or Phone Number already in use!" });
    //         } else {
    //             alert("Something went wrong! Please try again.");
    //         }
    //     }
    // };
    
    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Stop if validation fails
    
        console.log(formdata);
        try {
            const response = await fetch("http://localhost:8080/user/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            });
    
            const text = await response.text(); // Read response
    
            if (!response.ok) {
                throw new Error(text); 
            }
    
            const data = JSON.parse(text); // Parse JSON if valid
            console.log("User Saved", data);
            navigate("/data-saved");
    
        } catch (error) {
            console.log("Error While Saving Details", error.message);
            
            if (error.message.includes("Email already in use")) {
                setErrors({ emailId: "This email is already registered!" });
            } else if (error.message.includes("Phone number already in use")) {
                setErrors({ phoneNo: "This phone number is already registered!" });
            } else {
                alert("The data is already exists.");
            }
        }
    };
    

    return (
        <div className="center-form">
            <h3>Add New User</h3>
            <Form onSubmit={HandleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        value={formdata.firstName}
                        onChange={HandleInputChange}
                    />
                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name"
                        value={formdata.lastName}
                        onChange={HandleInputChange}
                    />
                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Control
                        type="tel"
                        name="phoneNo"
                        placeholder="Enter Phone Number"
                        value={formdata.phoneNo}
                        onChange={HandleInputChange}
                    />
                    {errors.phoneNo && <small className="text-danger">{errors.phoneNo}</small>}
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        name="emailId"
                        placeholder="Enter Email ID"
                        value={formdata.emailId}
                        onChange={HandleInputChange}
                    />
                    {errors.emailId && <small className="text-danger">{errors.emailId}</small>}
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={formdata.address}
                        onChange={HandleInputChange}
                    />
                    {errors.address && <small className="text-danger">{errors.address}</small>}
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default PostUser;

















// import { useState } from "react";
// import "./User.css";
// import { Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const PostUser = () => {
//     const [formdata, setformdata] = useState({
//         firstName: "",
//         lastName: "",
//         phoneNo: "",
//         emailId: "",
//         address: ""
//     });

//     const [errors, setErrors] = useState({});

//     const navigate = useNavigate();

//     const HandleInputChange = (event) => {
//         const { name, value } = event.target;
//         setformdata({
//             ...formdata,
//             [name]: value,
//         });
//     };

//     const validateForm = () => {
//         let newErrors = {};

//         if (!formdata.firstName.trim()) {
//             newErrors.firstName = "First Name is required";
//         }

//         if (!formdata.lastName.trim()) {
//             newErrors.lastName = "Last Name is required";
//         }

//         if (!formdata.phoneNo.match(/^\d{10}$/)) {
//             newErrors.phoneNo = "Phone Number must be 10 digits";
//         }

//         if (!formdata.emailId.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//             newErrors.emailId = "Invalid Email format";
//         }

//         if (!formdata.address.trim()) {
//             newErrors.address = "Address is required";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const HandleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }
//         console.log(formdata);
//         try {
//             const response = await fetch("http://localhost:8080/user/save", {
//                 method: "POST",
//                 headers: { "Content-Type": "Application/json" },
//                 body: JSON.stringify(formdata),
//             });
//             const data = await response.json();
//             console.log("User Saved", data);
//             navigate("/");
//         } catch (error) {
//             console.log("Error While Saving Details", error.message);
//         }
//     };

//     return (
//         <div className="center-form">
//             <h1>Add New User</h1>
//             <Form onSubmit={HandleSubmit}>
//                 <Form.Group controlId="formBasicFirstName">
//                     <Form.Control
//                         type="text"
//                         name="firstName"
//                         placeholder="Enter First Name"
//                         value={formdata.firstName} // ✅ Corrected
//                         onChange={HandleInputChange}
//                     />
//                     {errors.firstName && <p className="error">{errors.firstName}</p>}
//                 </Form.Group>

//                 <Form.Group controlId="formBasicLastName">
//                     <Form.Control
//                         type="text"
//                         name="lastName"
//                         placeholder="Enter Last Name"
//                         value={formdata.lastName} // ✅ Corrected
//                         onChange={HandleInputChange}
//                     />
//                     {errors.lastName && <p className="error">{errors.lastName}</p>}
//                 </Form.Group>

//                 <Form.Group controlId="formBasicPhone">
//                     <Form.Control
//                         type="tel"
//                         name="phoneNo"
//                         placeholder="Enter Phone Number"
//                         value={formdata.phoneNo} // ✅ Corrected
//                         onChange={HandleInputChange}
//                     />
//                     {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}
//                 </Form.Group>

//                 <Form.Group controlId="formBasicEmail">
//                     <Form.Control
//                         type="email"
//                         name="emailId"
//                         placeholder="Enter Email ID"
//                         value={formdata.emailId} // ✅ Corrected
//                         onChange={HandleInputChange}
//                     />
//                     {errors.emailId && <p className="error">{errors.emailId}</p>}
//                 </Form.Group>

//                 <Form.Group controlId="formBasicAddress">
//                     <Form.Control
//                         type="text"
//                         name="address"
//                         placeholder="Enter Address"
//                         value={formdata.address} // ✅ Corrected
//                         onChange={HandleInputChange}
//                     />
//                     {errors.address && <p className="error">{errors.address}</p>}
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100">
//                     Submit
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default PostUser;

