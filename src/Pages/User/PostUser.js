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


