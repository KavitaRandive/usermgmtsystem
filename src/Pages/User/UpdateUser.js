import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formdata, setformdata] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        emailId: "",
        address: ""
    });

    const HandleInputChange = (event) => {
        const { name, value } = event.target;
        setformdata({
            ...formdata,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/getbyid/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setformdata(data);
            } catch (error) {
                console.error("Error While Fetching Data:", error.message);
            }
        };
        fetchUser();
    }, [id]);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/user/update/${id}`, {
                method: "PUT",  // Corrected method
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata),
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            const data = await response.json();
            console.log("User updated:", data);

            // Navigate back to the user list/dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Error While Updating Data:", error.message);
        }
    };

    return (
        <div className="center-form">
            <h3>Update User</h3>
            <Form onSubmit={HandleSubmit}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        value={formdata.firstName}
                        onChange={HandleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name"
                        value={formdata.lastName}
                        onChange={HandleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Control
                        type="tel"
                        name="phoneNo"
                        placeholder="Enter Phone Number"
                        value={formdata.phoneNo}
                        onChange={HandleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        name="emailId"
                        placeholder="Enter Email ID"
                        value={formdata.emailId}
                        onChange={HandleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={formdata.address}
                        onChange={HandleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Edit User
                </Button>
            </Form>
        </div>
    );
};

export default UpdateUser;



























































// import './UpdateUser.css';
// import { Button, Form } from "react-bootstrap";
// import { useEffect, useState } from "react";  // ✅ Correct import
// import { useNavigate, useParams } from "react-router-dom"; // ✅ Correct usage of navigate

// const UpdateUser = () => {
// const {id}= useParams();

//     const [formdata, setformdata] = useState({
//         firstName: "",
//         lastName: "",
//         phoneNo: "",
//         emailId: "",
//         address: ""
//     });

    

//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();  // ✅ Correct use of navigate

//     const validate = () => {
//         let newErrors = {};
//         if (!formdata.firstName.trim() || formdata.firstName.length < 2) {
//             newErrors.firstName = "First Name must be at least 2 characters long.";
//         }
//         if (!formdata.lastName.trim() || formdata.lastName.length < 2) {
//             newErrors.lastName = "Last Name must be at least 2 characters long.";
//         }
//         if (!/^\d{10}$/.test(formdata.phoneNo)) {
//             newErrors.phoneNo = "Phone Number must be exactly 10 digits.";
//         }
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.emailId)) {
//             newErrors.emailId = "Enter a valid Email ID.";
//         }
//         if (!formdata.address.trim()) {
//             newErrors.address = "Address cannot be empty.";
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const HandleInputChange = (event) => {
//         const { name, value } = event.target;
//         setformdata({
//             ...formdata,
//             [name]: value,
//         });
//     };

//     const HandleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validate()) return; // Stop if validation fails

//         console.log(formdata);
//         try {
//             const response = await fetch("http://localhost:8080/user/save", {
//                 method: "POST",
//                 headers: { "Content-Type": "Application/json" },
//                 body: JSON.stringify(formdata),
//             });
//             const data = await response.json();
//             console.log("User Saved", data);
//             navigate("/data-saved");  // ✅ Corrected use of navigate
//         } catch (error) {
//             console.log("Error While Saving Details", error.message);
//         }
//     };

//     return (
//         <div className="center-form">
//             <h3>Edit User</h3>
//             <Form > {/* ✅ Fixed missing onSubmit handler */}
//                 <Form.Group controlId="formBasicFirstName">
//                     <Form.Control
//                         type="text"
//                         name="firstName"
//                         placeholder="Enter First Name"
//                         value={formdata.firstName}
//                         onChange={HandleInputChange}
//                     />
//                     {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
//                 </Form.Group>

//                 <Form.Group controlId="formBasicLastName">
//                     <Form.Control
//                         type="text"
//                         name="lastName"
//                         placeholder="Enter Last Name"
//                         value={formdata.lastName}
//                         onChange={HandleInputChange}
//                     />
//                     {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
//                 </Form.Group>

//                 <Form.Group controlId="formBasicPhone">
//                     <Form.Control
//                         type="tel"
//                         name="phoneNo"
//                         placeholder="Enter Phone Number"
//                         value={formdata.phoneNo}
//                         onChange={HandleInputChange}
//                     />
//                     {errors.phoneNo && <small className="text-danger">{errors.phoneNo}</small>}
//                 </Form.Group>

//                 <Form.Group controlId="formBasicEmail">
//                     <Form.Control
//                         type="email"
//                         name="emailId"
//                         placeholder="Enter Email ID"
//                         value={formdata.emailId}
//                         onChange={HandleInputChange}
//                     />
//                     {errors.emailId && <small className="text-danger">{errors.emailId}</small>}
//                 </Form.Group>

//                 <Form.Group controlId="formBasicAddress">
//                     <Form.Control
//                         type="text"
//                         name="address"
//                         placeholder="Enter Address"
//                         value={formdata.address}
//                         onChange={HandleInputChange}
//                     />
//                     {errors.address && <small className="text-danger">{errors.address}</small>}
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100">
//                     Edit User
//                 </Button>
//             </Form>
//         </div>
//     );
// }

// export default UpdateUser;
