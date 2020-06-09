import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

//Components
import Slide from '@material-ui/core/Slide';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Container from '@material-ui/core/Container';
import GalleryItem from './GalleryItem';

//Styles
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import classes from './Gallery.module.css';

const Gallery = (props) => {
    const [posts, setPosts] = useState(null);

    //To avoid duplicate posts
    const filterPosts = useCallback((data) => {
        const filtered = [];
        const emails = [];
        data.forEach(entry => {
            if(!emails.includes(entry.email)) {
                emails.push(entry.email);
                //TODO: Add dummy image if no images
                filtered.push({
                    image: entry.images[0],
                    id: entry._id,
                    course: entry.course,
                    email: entry.creatorEmail
                })
            }
        });
        return filtered;
    }, []);

    useEffect(() => {
        axios.get('/notes', {
            params: {
                inst: props.location.state.inst, 
                course: props.location.state.course
            }}).then(res => {
            if(res.data.length > 0) { 
                setPosts(filterPosts(res.data));
            }
        })
        .catch(err => console.log(err))
    }, [props.location.state.inst, props.location.state.course, filterPosts]);
    
    const handlePostClick = (email) => {
        window.location.href = `mailto:${email}`;
    }

    //Create gridlist
    const createGridList = () => {
        //For creating a dynamic gridlist:
        const getGridListCols = () => {
            if(isWidthUp('lg', props.width)) { return 3; }
            if (isWidthUp('md', props.width)) { return 2; }
            else { return 1; }
          }

          return(<GridList cellHeight={320} cols={getGridListCols()} spacing={40}>
            {posts.map((post) => (
                <GridListTile key={post.id}>
                    <GalleryItem 
                      email={post.email}
                      image={post.image}
                      course={post.course}
                      handlePostClick={() => handlePostClick(post.email)}/>
                </GridListTile>
            ))}
        </GridList>);
    } 

    return(
        <Slide in={true} mountOnEnter unmountOnExit direction="up" timeout={500}>
            <Container classes={{root: classes.Container}}>
                <h1>Gallery </h1>
                {posts ? createGridList() : null}
            </Container>
        </Slide>
    )
}

export default withWidth()(Gallery);