import React from 'react';

import { Card as MdlCard, CardActions, Button, CardMenu, CardText, CardTitle, IconButton } from 'react-mdl';



// Props:
// 1. onDeleteClick
// 2. index
// 3. title
// 4. credit
// 5. url

// later on
// 6. Links to

const Card = (props) => (
    <MdlCard shadow={0} style={props.cardStyle}>
        <CardTitle style={props.titleStyle}>
            {/*<h2 style={{ margin: 'auto', marginBottom: 0 }}></h2>*/}
        </CardTitle>
        <CardText style={{
            fontSize: 16,
            width: '100%', 
            paddingRight: 0,
            paddingLeft: 0
        }}>
            Title:{props.title}
        </CardText>
        <CardText style={{
            width: '100%',
            paddingRight: 0,
            paddingLeft: 0
        }}>
            Credit: {props.credit}
        </CardText>
        {/*<CardActions border>
            <Button colored>Links To</Button>
        </CardActions>*/}
        <CardMenu style={{ color: '#fff' }}>
            <IconButton name="delete" onClick={props.onDeleteClick} />
        </CardMenu>
    </MdlCard>
)

export default Card;





