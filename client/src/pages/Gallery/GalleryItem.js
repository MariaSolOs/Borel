import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import classes from './Gallery.module.css';

const GalleryItem = (props) => (
    <Card>
        <CardActionArea>
            <CardMedia
              component="img"
              alt={`Notes by ${props.email}`}
              height="120"
              image={props.image} />
            <CardContent classes={{root: classes.CardInfo}}>
                <Typography gutterBottom variant="overline" display="block">
                  By: {props.email}  
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Course: {props.course}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button 
              onClick={props.handlePostClick}
              size="small" 
              classes={{label: classes.ButtonLabel}}>
                Email the notetaker
            </Button>
        </CardActions>
    </Card>
)

export default GalleryItem;