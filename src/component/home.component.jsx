// import React from 'react';


// const HomePage = () =>(
//     <div>
//         <div class="nav">
//           interview
//         </div>
//         home page
//     </div>
// );
import axios from "axios";

import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MyCard from './card.component';
import Header from './header.component';
import InputComponent from './input.component'
import { makeStyles } from '@material-ui/core/styles';
import {  getRepos, getUserData } from '../github-api';
import { NearMeSharp } from "@material-ui/icons";
import Loading from "./loading.component";



const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // marginTop: 20,
    // display: 'flex',
    // justifyContent: 'center',
  },
  input: {
   paddingTop:10,
   paddingBottom:10,
   borderRadius:5,
   border:"none",
   width:200,
   
  },
  form:{
    marginTop:10,
    padding: 20,
    height: 10
  },
  btn:{
    font: "helvetica",
    color:"white",
    width: 90,
    backgroundColor: "gray",
    paddingTop:10,
    paddingBottom:10,
    border:"none",
    borderRadius:5


    
  }
}));


const HomePage = (props) => {
  const classes = useStyles();

  const data = [];
  const [name, setUsername] = useState('');
  const [avatar_url, setAvatar] = useState('');
  const [public_repos, setRepo] = useState('');
  const [followers, setFollowers] = useState('');
  const [UserInput, setUserInput] = useState('');
  const [following, setFollowing] = useState('');
  const [reponame, setrepoName] = useState([]);
  const [loading, setLoading] =useState(false);
  const [helper, setHelper] =useState(true);

  


  

  

  function handleSubmit(event) {
    setLoading(false);

    event.preventDefault();
    setHelper(true);
    setLoading(true);

    console.log(" event", UserInput);

  getUserData(UserInput)
   .then(res => {
     console.log(res);
     setLoading(true);
     setData(res.user);
     setHelper(false);

     setUserInput("");


   })
   .catch(err => alert("User not found"),
   setUserInput(""),
   setLoading(false)

   );

   getRepos(UserInput)
   .then(reponame => {
    console.log(reponame);
    setRepoData(reponame);
    setUserInput("");
   });
   
  //  axios.get(`https://api.github.com/users/${name}`).then(resp => {
  //    // props.onSubmit(resp.data)
  //    setData(resp)
  //    console.log(resp)
  //    setUsername('')
  //  })
}

   const setData = ({ 
     name,
     avatar_url,
     public_repos,
     followers,
     following,
    })=> {
     setUsername(name);
     setAvatar(avatar_url);
     setRepo(public_repos);
     setFollowers(followers);
     setFollowing(following);
    }
    
    const setRepoData= (reponame)=>{

      setrepoName(reponame);
    }
  
  return (
    <React.Fragment>
      <CssBaseline />
    <Header />
      <Container maxWidth="sm" className={classes.root} >
    <form onSubmit={handleSubmit} className={classes.form}>
          <input
            value={UserInput}
            type="text"
            onChange={event => setUserInput(event.target.value)}
            placeholder="Please enter username"
            required
            className={classes.input}
          />
          <button type="submit" className={classes.btn}>Enter</button>
        </form>
    {/* <InputComponent   className={classes.input} /> */}
        
        { loading && helper ? <Loading /> : ( helper ? 
        <div>this is</div>
        :
        <MyCard  
        name={name} 
        avatar_url={avatar_url} 
        public_repos={public_repos}
        followers={followers}
        following={following}
        reponame={reponame}/>
        )
      }
        
        </Container>
    </React.Fragment>
  );
}


export default HomePage;