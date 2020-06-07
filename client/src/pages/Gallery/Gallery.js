import React, {useContext} from 'react';
import {SearchContext} from '../../context/search-context';

//Components
import Slide from '@material-ui/core/Slide';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import classes from './Gallery.module.css';

const Gallery = (props) => {
    const posts = useContext(SearchContext).notes;
    
    const handlePostClick = (email) => {
        window.location.href = `mailto:${email}`;
    }

    //Create gridlist
    const gridlist = 
        <GridList cellHeight={320} cols={3} spacing={40}>
            {posts.map((post) => (
                <GridListTile key={post.id}><Card>
                    <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Single note post"
                      height="120"
                      image={post.image} />
                    <CardContent classes={{root: classes.CardInfo}}>
                        <Typography gutterBottom variant="overline" display="block">
                          By: {post.email}  
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Course: {post.course}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button 
                          onClick={() => handlePostClick(post.email)}
                          size="small" 
                          classes={{label: classes.ButtonLabel}}>
                            Email the notetaker
                        </Button>
                    </CardActions>
                </Card></GridListTile>
            ))}
        </GridList>

    return(
        <Slide in={true} mountOnEnter unmountOnExit direction="up" timeout={500}>
            <Container>
                <h1>Gallery </h1>
                {gridlist}
            </Container>
        </Slide>
    )
}

export default Gallery;