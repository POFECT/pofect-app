import React from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import Size from "../../Utils/Size";

const data = [
    {
        title: 'Aenean leo',
        body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor...',
        imgUrl: 'https://picsum.photos/id/11/200/300',
    },
    {
        title: 'In turpis',
        body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere...',
        imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
        title: 'Lorem Ipsum',
        body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante...',
        imgUrl: 'https://picsum.photos/id/12/200/300',
    },
];

const CarouselExample = () => {
    const isCarousel = React.useRef(null);

    return (
        <View style={styles.container}>
            <Carousel
                layout="tinder"
                layoutCardOffset={9}
                ref={isCarousel}
                data={data}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [
            { translateX: -Size.width * 0.33},
            { translateY: Size.height * 0.016 },
        ],
    },
});

export default CarouselExample;
