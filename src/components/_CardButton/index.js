import React from 'react';
import { Text, Card, CardItem, Left, Thumbnail, Body, Image } from 'native-base'

function MyItem(props) {
    const { title, subtitle, body, icon, image } = props;

    return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={icon} square />
                    <Body>
                        <Text>{title}</Text>
                        <Text note>{subtitle}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody>
                {image && <Image source={image} style={{ width: null, height: 200, flex: 1 }} />}
                {body && <Text note style={{ paddingHorizontal: 10 }}>{body}</Text>}
            </CardItem>
        </Card>
    )
}

export default MyItem;