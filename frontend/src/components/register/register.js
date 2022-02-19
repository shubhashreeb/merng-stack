import './register.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../utility/hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
// import axios from "axios"
import { useNavigate } from "react-router-dom";
// import {TextField, Button, Container, Stack, Alert } from '@mui/material'

const REGISTER_USER = gql `
    mutation Mutation(
        $registerInput: RegisterInput
    ) {
        registerUser(
            registerInput: $registerInput
        ) {
            email
            username
            token
        }
    }
`
function Register(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const registerUserCallback = () => {
        console.log("Callback hit");
        registerUser();
        console.log("Register user called")
    }
    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const [registerUser, {loading} ] = useMutation(REGISTER_USER, {
        update(proxy, {data: { registerUser: userData}}) {
            context.login(userData);
            console.log(userData)
            console.log("register user: ", registerUser)
            alert("You have been successfully registered!!!")
            navigate('/login');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
            console.log("graphql error", graphQLErrors)
            alert("This user already exists! Please login")
            navigate('/login');
        },
        variables: {registerInput: values}
        
    })


// const Register = () => {


    // const { name, email, password, reEnterPassword } = user
    // const [ user, setUser] = useState({
    //     name: "",
    //     email:"",
    //     password:"",
    //     reEnterPassword: ""
    // })
    // const navigate = useNavigate();
    
    // const handleChange = (e) =>{
    //     e.preventDefault();
    //     // console.log(e)
    //     const {name, value} = e.target
    //     // console.log(name, value)
    //     setUser({
    //         ...user, 
    //         [name] : value
    //     })
    //     // console.log(user)
    // }
    // const register = (e) => {
    //     e.preventDefault()
    //     const { name, email, password, reEnterPassword } = user

    //     const base_url="http://localhost:4000/register"

    //     if( name && email && password && (password === reEnterPassword)){
    //         axios.post(base_url, user, { mode: 'cors' })
    //         .then( res => {
    //             alert(res.data.message)
    //             console.log(res.data)
    //             // navigate.push("/login")
    //             // history.push("/login")
    //         })
    //     } else {
    //         alert("invalid input")
    //     }
        
    // }

return (

    <div className="register">

    <h1>Register</h1>
    <input type="text" name="username" placeholder="Your Name" onChange={onChange}></input>
    <input type="text" name="email" placeholder="Your Email" onChange={onChange}></input>
    <input type="password" name="password" placeholder="Your Password" onChange={onChange}></input>
    <input type="password" name="reEnterPassword" placeholder="Re-enter Password" onChange={onChange}></input>
   <div className="button" onClick={onSubmit} >Register</div>
    <div>or</div>
    <div className="button" onClick={() => navigate("/login")}>Login</div>
</div>
    // <Container spacing = {2} maxwidth="sm">
    //     <h3> Register</h3>
    //     <p> This is the register page, register below to create an account!</p>
    //     <Stack spacing={2} paddingBottom={2}>
    //         <TextField 
    //             label = "Username"
    //             name = "username"
    //             onChange= {onChange}
    //         />
    //          <TextField 
    //             label = "Email"
    //             name = "email"
    //             onChange= {onChange}
    //         />
    //          <TextField 
    //             label = "Password"
    //             name = "password"
    //             onChange= {onChange}
    //         />
    //          <TextField 
    //             label = "ReEnterPassword"
    //             name = "reEnterPassword"
    //             onChange= {onChange}
    //         />
    //     </Stack>
    //     {errors.map(function(error){
    //         <Alert severity="error">
    //             {error.message}
    //         </Alert>
    //          })}
    //         <Button variant="container" onClick={onSubmit}>Register</Button>
    // </Container>
)}
export default Register;
