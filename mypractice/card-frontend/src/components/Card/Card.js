import React, {Component} from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


export default function CourseCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="card" className={classes.avatar}>
                        C
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={props.title}
                // subheader="September 14, 2016"
            />
            {/*<CardMedia*/}
            {/*    className={classes.media}*/}
            {/*    image="/static/images/cards/paella.jpg"*/}
            {/*    title="Paella dish"*/}
            {/*/>*/}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.content}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Course: {props.course}
                    Level: {props.level}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                {/*<IconButton aria-label="share">*/}
                {/*    we  might want to make this the rating or something*/}
                {/*    <ShareIcon />*/}
                {/*</IconButton>*/}
                <IconButton>
                    <CheckBoxIcon onClick={(e) => props.pressComplete(e, props.id)}/>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        Nothing here for now but eventually we will want to add this.props.description or something
                        like that if it exists (will require a more robust dataset)
                    </Typography>
                    <Typography paragraph>
                        We can add another paragraph here if we want! Even more instructions
                    </Typography>
                    <Typography paragraph>
                        Room for yet ANOTHER paragraph! Material UI is really doing the most.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

// class Card extends Component {
//     //add state for completed or not
//     constructor(props) {
//         super(props);
//         this.state = {
//             complete: false
//         };
//     }
//
//     render() {
//         return (
//             <div className="card task-wrapper" /* style="width: 18rem;" */>
//                 <div className="card-header d-flex justify-content-between">
//                   <span>
//                     <strong>Title: </strong>{this.props.title}<br/>
//                     <strong>Course: </strong>{this.props.course}<br/>
//                     <strong>Skill: </strong>{this.props.skill}<br/>
//                     <strong>Level: </strong>{this.props.level}<br/>
//                     <strong>Duration: </strong>{this.props.duration}<br/>
//                     <strong>View Count: </strong>{this.props.view_count}<br/>
//                   </span>
//                 </div>
//                 <div className="card-body">
//                     {this.props.content}
//                 </div>
//                 <div className="card-footer">
//                     <label className="switch">Complete
//                         <input type="checkbox" onClick={(e) => this.props.pressComplete(e, this.props.id)} checked={(this.props.is_complete === 'True')}/>
//                                {/*onClick={this.props.pressComplete}/>*/}
//                     </label>
//                 </div>
//             </div>
//         );
//     }
// }

// export default CourseCard;