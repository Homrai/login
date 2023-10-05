"use client"
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Box from '@mui/material/Box';
import { CardHeader, Button, Select, MenuItem, InputLabel, Checkbox  } from '@mui/material';
import { ChangeOn, Input } from './components/Elements';
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import emailjs from '@emailjs/browser';
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const {control,handleSubmit, formState: { errors, isValid }}=useForm();
  const [gender,setGender]=useState("female");
  const genderArray=["female","male","other"];
  const [interests, setInterests] = useState({
    games:true,
    shop:false,
    technology:false,
    houses:false,
    love:false,
    others:false,
  });

  const send=(data)=>{
    let datos=data;
    datos.gender=gender;
    datos.interests=interests;
    //emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    emailjs.sendForm(process.env.SERVICE_ID, process.env.TEMPLATE_KEY, datos, process.env.PUBLIC_KEY)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });   
  }
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="asdasdasd" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
        <Box
          sx={{
            width: {
              md:800,
              xs:500,
            },
            p:5,
            height: {
              md:950,
              xs:1200,
            },
            borderRadius:5,
            boxShadow:4,
            mx: "auto",
            backgroundColor: 'aqua',
          }}
        >
          <CardHeader
            title="We are eager to receive your information"
            subheader=""
            sx={{textAlign:"center",borderRadius:3, backgroundColor:"yellow",mb:10,boxShadow:"inherit"}}
          />
          <Box sx={{justifyContent:{md:"space-around",xs:"center"}, flexDirection:{md:"row",xs:"column"}, display:"flex"}}>
            <Input 
                    name='firstName' 
                    place='First-Name' 
                    errors={errors.firstName} 
                    typeField="text"
                    />
            <Input 
                    name='lastName' 
                    place='Last-Name' 
                    errors={errors.lastName} 
                    typeField="text"
                    />
          </Box>
          <Box sx={{justifyContent:{md:"space-around",xs:"center"}, flexDirection:{md:"row",xs:"column"}, display:"flex"}}>
            <Input 
                    name='phone' 
                    place='Tel' 
                    errors={errors.phone} 
                    typeField="number"
                    />
            <Input 
                    name='email' 
                    place='email'
                    errors={errors.email} 
                    typeField="email"
                    />
          </Box>
          <InputLabel id="demo-simple-select-label"  sx={{marginInline:{md:"4%"}, color:'blue'}}>Gender</InputLabel>
          <Select
              sx={{width:300, marginInline:{md:"4%"}, color:'blue'}}
              variant='outlined'
              name='Gender'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label={"Gender"}
              onChange={(e)=>ChangeOn(e,setGender)}
              >
                  {genderArray?.map((item,index)=>(<MenuItem key={"selectGender"+index} value={item}>{item}</MenuItem>))}
          </Select>
          <InputLabel id="demo-simple-select-label"  sx={{marginInline:{md:"4%"}, color:'blue',mt:5}}>Interests</InputLabel>
          <div>
            <Box sx={{display:"flex", alignItems:"center"}}>
              <Checkbox checked={interests.games} onChange={(e)=>ChangeOn(e,setInterests)} name="games" />
              <InputLabel id="demo-simple-select-label"  sx={{marginInline:{md:"4%"}, color:'blue'}}>Games</InputLabel>
            </Box>
            <Box sx={{display:"flex", alignItems:"center"}}>
              <Checkbox checked={interests.houses} onChange={(e)=>ChangeOn(e,setInterests)} name="houses" />
              <InputLabel id="demo-simple-select-label"  sx={{marginInline:{md:"4%"}, color:'blue'}}>Houses</InputLabel>
            </Box>
            <Box sx={{display:"flex", alignItems:"center"}}>
              <Checkbox checked={interests.love} onChange={(e)=>ChangeOn(e,setInterests)} name="love" />
              <InputLabel id="demo-simple-select-label"  sx={{marginInline:{md:"4%"}, color:'blue'}}>Love</InputLabel>
            </Box>
            <Box sx={{display:"flex", alignItems:"center"}}>
              <Checkbox checked={interests.shop} onChange={(e)=>ChangeOn(e,setInterests)} name="shop" />
              <InputLabel id="demo-simple-select-label"  sx={{marginInline:{md:"4%"}, color:'blue'}}>Shop</InputLabel>
            </Box>
            <Box sx={{display:"flex", alignItems:"center"}}>
              <Checkbox checked={interests.technology} onChange={(e)=>ChangeOn(e,setInterests)} name="technology" />
              <InputLabel id="demo-simple-select-label"  sx={{marginInline:{md:"4%"}, color:'blue'}}>Technology</InputLabel>
            </Box>
            <Box sx={{display:"flex", alignItems:"center"}}>
              <Checkbox checked={interests.others} onChange={(e)=>ChangeOn(e,setInterests)} name="others" />
              <InputLabel id="demo-simple-select-label"  sx={{marginInline:{md:"4%"}, color:'blue'}}>Others</InputLabel>
            </Box>
            <Button  variant="contained" color="success" sx={{backgroundColor:"green", color:"white", px:8, position:"absolute", opacity:!isValid?0.5:1, bottom:{md:-120,xs:-300}}} onClick={handleSubmit(send)} >Send</Button>
            </div>
        </Box>
        </div>
      </main>
    </>
  )
}
