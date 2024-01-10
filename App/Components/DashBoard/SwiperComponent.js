import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';

const data = [
    // BarChart data
    [
        { value: 250, label: 'M' },
        { value: 500, label: 'T', frontColor: '#177AD5' },
        { value: 745, label: 'W', frontColor: '#177AD5' },
        { value: 320, label: 'T' },
        { value: 600, label: 'F', frontColor: '#177AD5' },
        { value: 256, label: 'S' },
        { value: 300, label: 'S' },
    ],
    // LineChart data
    [
        { value: 200, label: 'M' },
        { value: 350, label: 'T' },
        { value: 480, label: 'W' },
        { value: 150, label: 'T' },
        { value: 550, label: 'F' },
        { value: 200, label: 'S' },
        { value: 400, label: 'S' },
    ],
    // PieChart data
    [
        {value: 230,label: 'Jan',frontColor: '#4ABFF4'},
        {value: 180,label: 'Feb',frontColor: '#79C3DB'},
        {value: 195,label: 'Mar',frontColor: '#28B2B3'},
        {value: 250,label: 'Apr',frontColor: '#4ADDBA'},
        {value: 320,label: 'May',frontColor: '#91E3E3'},
    ],

];

const CarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
        {/* You can customize this based on the type of chart */}
        {item.chartType === 'bar' && (
            <BarChart
                barWidth={22}
                noOfSections={3}
                barBorderRadius={4}
                frontColor="lightgray"
                data={item.data}
                yAxisThickness={0}
                xAxisThickness={0}
                isAnimated

            />
        )}

        {item.chartType === 'line' && (
            <LineChart
                lineColor="#3498db"
                data={item.data}
                yAxisThickness={2}
                xAxisThickness={2}
                isAnimated

            />
        )}

        {item.chartType === 'pie' && (
            <BarChart
            showFractionalValue
            showYAxisIndices
            noOfSections={4}
            maxValue={400}
            data={item.data}
            isAnimated
            />
        )}
    </View>
);

const CarouselExample = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const renderItem = ({ item }) => <CarouselItem item={item} />;

    const chartTypes = ['bar', 'line', 'pie'];

    return (
        <SafeAreaView style={styles.container}>
            <Carousel
                data={data.map((chartData, index) => ({
                    data: chartData,
                    chartType: chartTypes[index],
                }))}
                renderItem={renderItem}
                sliderWidth={300}
                itemWidth={300}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotOpacity={0.6}
                inactiveDotScale={0.8}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselItem: {
        borderRadius: 5,
        height: 200,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationContainer: {
        marginTop: 20,
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: '#3498db',
    },
    inactiveDotStyle: {
        backgroundColor: '#bdc3c7',
    },
});

export default CarouselExample;