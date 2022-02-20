import "./login.css"
// import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useForm } from '../../utility/hooks';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import Profile from "../profile/profile";
//import {TextField, Button, Container, Stack, Alert } from '@mui/material'

const LOGIN_USER = gql `
    mutation login(
        $loginInput: LoginInput
    ) {
        loginUser(
            loginInput: $loginInput
        ) {
            email
            username
            token
        }
    }
`

function Login(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [ errors, setErrors ] = useState([])

    function loginUserCallback() {
        console.log("login user hit")
        loginUser();
          console.log("after login user hit")

    }

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        email: "",
        password: ""
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
         update(proxy, {data: { loginUser: userData}}) {
            context.login(userData);
            console.log(userData)
            console.log("login user: ", loginUser)
            alert("Login successful!!!")
            navigate('/profile');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
            console.log("graphql error", graphQLErrors)
            alert(" Please check your login info! ")
            navigate('/login');
        },
        variables: {loginInput: values}
        
    })
    

// const Login = ({ setLoginUser}) => {

//     const navigate = useNavigate()

//     const [ user, setUser] = useState({
//         email:"",
//         password:""
//     })

//     const handleChange = e => {
//         const { name, value } = e.target
//         setUser({
//             ...user,
//             [name]: value
//         })
//     }

//     const login = () => {
//         axios.post("http://localhost:4000/", user, { mode: 'cors' })
//         .then(res => {
//             alert(res.data.message)
//             setLoginUser(res.data.user)
//             navigate("/home")
//         })
//     }

    return (
//         <Container spacing = {2} maxwidth="sm">
//         <h3> Login</h3>
//         <p> This is the login page, register below to create an account!</p>
//         <Stack spacing={2} paddingBottom={2}>
           
//              <TextField 
//                 label = "Email"
//                 name = "email"
//                 onChange= {onChange}
//             />
//              <TextField 
//                 label = "Password"
//                 name = "password"
//                 onChange= {onChange}
//             />
//         </Stack>
//         {errors.map(function(error){
//             <Alert severity="error">
//                 {error.message}
//             </Alert>
//              })}
//             <Button variant="container" onClick={onSubmit}>Login</Button>
//     </Container>
// )}
        <div className="login">
            <h1>Login</h1>
            <p> This is the login page, login below </p>
            <input type="text" name="email" placeholder="Your Email" onChange={onChange}></input>
            <input type="password" name="password" placeholder="Your Password" onChange={onChange}></input>
            <div className="button" onClick={onSubmit} >Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/register")}>Register</div>
        </div>
    )
}

export default Login