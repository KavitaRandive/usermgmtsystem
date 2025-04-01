import { useEffect, useState } from "react";
import { Container, Row, Col,Table,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const Dashboard = () =>{
        const [user,setUser]= useState([])
        const navigate=useNavigate();
        
        useEffect( () =>{
            const fetchuser= async ()=>{
                try {
                    const response= await fetch("http://localhost:8080/user/getall");
                    const data=await response.json();
                    setUser(data);
                } catch (error) {
                    console.error("error while fetching user data",error.message)
                }
            }
            fetchuser();
        },[])

        // const HandleDelete =async (userid) =>{
        //           try {
        //             const response = await fetch("http://localhost:8080/user/deletebyid/${userid}",{
        //               method:"DELETE",
        //             })
                   
        //           } catch (error) {
        //             console.error("Error while deleting the User",error.message)
        //           }
        // }
        const HandleDelete = async (userid) => {
          try {
              const response = await fetch(`http://localhost:8080/user/deletebyid/${userid}`, {
                  method: "DELETE",
              });
      
              if (!response.ok) {
                  throw new Error("Failed to delete user");
              }
      
              // Update UI after successful deletion
              setUser((prevUsers) => prevUsers.filter(user => user.id !== userid));
      
          } catch (error) {
              console.error("Error while deleting the User", error.message);
          }
      };

      // const HandleUpdate =(id)=>{
      //   navigate(`/user/${user.id}`);
      // }

      const HandleUpdate = (id) => {
        navigate(`/postuser/${id}`);
    };
    

    return (
         <Container className="mt-5">
          <Row>
            <Col>
            {/* <h1 className="test-center"> Users </h1> */}
            <Table striped bordered hover responsive>
                <thead>
               <tr>
                <th> First Name</th>
                <th> Last Name</th>
                <th> Phone Number </th>
                <th> Email</th>
                <th> Address</th>
               </tr>
                </thead>
                <tbody>
  {user.map((user) => (
    <tr key={user.id}>
      <td>{user.firstName}</td> {/* Corrected typo */}
      <td>{user.lastName}</td>
      <td>{user.phoneNo}</td>
      <td>{user.emailId}</td>
      <td>{user.address}</td>
      <td>
        {/* <Button variant="outline-secondary" onClick={()=>HandleUpdate(user.id)}>Update</Button> */}
        <Button variant="outline-secondary" onClick={() => HandleUpdate(user.id)}>Update</Button>

        {"  "}
        <Button variant="outline-danger" onClick={()=>HandleDelete(user.id)}>Delete</Button>
      </td>
    </tr>
  ))}
</tbody>


            </Table>
            </Col>
          </Row>
         </Container>
    
    )
}
export default Dashboard;