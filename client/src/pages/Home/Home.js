import React, {useCallback, useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {SearchContext} from '../../context/search-context';

//Components
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

//Styles
import Slide from '@material-ui/core/Slide';
import BorelImg from '../../assets/images/homeCover.png';
import classes from './Home.module.css';

const Home = () => {
    const addNotesToGallery = useContext(SearchContext).addNotesToGallery;
    const [toGallery, goToGallery] = useState(false);

    const handleSearch = useCallback((event) => {
        const query = event.target.value.replace(/\s/g, '');
        const courseCode = query.substring(0, 4).toUpperCase();
        const courseNumber = query.substring(4);
        axios.get(`${process.env.REACT_APP_SERVER_BASEURL}/notes`, {
            params: {courseCode, courseNumber}
        }).then(res => {
            if(res.data.length > 0){ 
                const imgs = res.data.map(post => ({
                    image: post.images[0], 
                    id: post._id, 
                    course: post.courseCode + post.courseNumber,
                    email: post.creatorEmail
                }));
                addNotesToGallery(imgs);
                goToGallery(true);
            }
        })
        .catch(err => console.log(err))
    }, [addNotesToGallery]);

    const handleKeyDown = useCallback((event) => {
        if(event.keyCode === 13) { handleSearch(event) }
    }, [handleSearch]);

    return(
        <React.Fragment>
            {toGallery? <Redirect to="/gallery"/> : 
            <Slide in={true} mountOnEnter unmountOnExit direction="up" timeout={500}>
                <Container classes={{root: classes.Container}}>
                    <img src={BorelImg} alt="logo" className={classes.HeaderImg}/>
                    <TextField 
                      name="search"
                      onKeyDown={handleKeyDown}
                      label="Find the notes for the course you need" 
                      fullWidth
                      type="search"
                      variant="outlined" />
                </Container>
            </Slide>}
        </React.Fragment>
    );
}
    
export default Home;