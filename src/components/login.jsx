import { Client } from '../client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundVid from '../assets/share.mp4'
import logoWhite from '../assets/logowhite.png'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
const jwt_decode = require('jwt-decode');

const Login = () => {
  const navigate = useNavigate();
  const credentialResponse = (res) => {
    const decodedData = jwt_decode.jwtDecode(res.credential);
    console.log(decodedData);
    localStorage.setItem('user', JSON.stringify(decodedData))
    const {given_name, family_name, email, picture, sub} = decodedData;

    const doc = {
      _id: sub,
      _type: 'user',
      name: given_name + ' ' + family_name,
      image: picture
    }

    Client.createIfNotExists(doc)
    .then(() => {navigate('/', {replace: true})})
  }
  
  return (
    <div className = "flex justify-start items-center flex-col h-screen">
      <div className = 'relative w-full h-full'>
        <video src = {BackgroundVid}
          type = "video/mp4"
          muted
          autoPlay
          controls = {false}
          loop
          className='object-cover w-full h-full'
        />
        <div className = 'absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 w-full h-full object-cover bg-blackOverlay'>
          <div className='p-5'>
            <img src = {logoWhite} width = "130px" alt = "logoWhite" />
          </div>
          <div>
            <GoogleOAuthProvider clientId = "432349503118-16s026ljhcm4barh95nmn7mfn4g92gvu.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse}
                onError={() => {
                  console.log('Login Failed');
                }}/>;
            </GoogleOAuthProvider>;
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login