import React, {useCallback, useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

//Components
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

//Styles
import Slide from '@material-ui/core/Slide';
import BorelImg from '../../assets/images/homeCover.png';
import classes from './Home.module.css';

const Home = () => {
    const [galleryParams, setGalleryParams] = useState({
        inst: null, 
        course: null, 
        toGallery: false
    });
    const [courses, setCourses] = useState([]);
    const [stored, setStored] = useState([]);
    const [courseSearch, enableCourseSearch] = useState(false);

    //Find saved institutions in database when mounting
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_BASEURL}/institutions`)
        .then(res => {
            setStored(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    const handleSelectedInst = useCallback((event, option, reason) => {
        setGalleryParams({...galleryParams, inst: option});
        const matchedInst = stored.filter(entry => (
            entry.name === option
        ));
        if(matchedInst.length > 0) {
            setCourses(matchedInst[0].courses);
            enableCourseSearch(true);
        }
    }, [galleryParams, stored]);

    const handleSelectedCourse = (event, option, reason) => {
        setGalleryParams({...galleryParams, course: option});
    }

    const handleSearch = (event) => {
        setGalleryParams({...galleryParams, toGallery: true});
    }

    return(
        <React.Fragment>
            {galleryParams.toGallery? <Redirect to={{
                            pathname: "/gallery",
                            state: {
                                inst: galleryParams.inst, 
                                course: galleryParams.course}}} /> : 
            <Slide in={true} mountOnEnter unmountOnExit direction="up" timeout={500}>
                <Container classes={{root: classes.Container}}>
                    <img src={BorelImg} alt="logo" className={classes.HeaderImg}/>
                    <Autocomplete
                      disableClearable
                      noOptionsText='Nothing found 😰'
                      options={stored.map(entry => entry.name)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select your institution" 
                          margin="normal"
                          variant="outlined"
                          InputProps={{...params.InputProps, type: 'search'}}/>
                      )}
                      onHighlightChange={handleSelectedInst} />
                    <Autocomplete
                      disabled={!courseSearch}
                      disableClearable
                      noOptionsText='Nothing found 😰'
                      options={courses}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Find the notes for the course you need"  
                          margin="normal"
                          variant="outlined"
                          InputProps={{...params.InputProps, type: 'search'}} />
                      )}
                      onHighlightChange={handleSelectedCourse} />
                    <Button 
                      variant="contained" 
                      color="default" 
                      endIcon={<SearchOutlinedIcon />}
                      classes={{root: classes.SearchButton}}
                      onClick={handleSearch}>
                        Search
                    </Button>
                </Container>
            </Slide>}
        </React.Fragment>
    );
}
    
export default Home;