import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import MainApi from '../../APIs/MainApi';
import { useFontSize } from "../Setting/fontProvider";

export default function OrderInfoComponent({ searchTerm, orderData }) {
    const [tableHead, setTableHead] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [widthArr, setWidthArr] = useState([160, 180]);
    const { fontSize } = useFontSize();
    const [localFontSize, setLocalFontSize] = useState(fontSize);

    useEffect(() => {
        console.log('searchTerm', searchTerm);
        if (orderData) {
            const displayNames = ['생성일', '주문투입출강주코드', '고객사명', 'OrderType', 'OrderLine주문량',
                '공장결정구분', '가능통과공정코드', '확정통과공정코드'];

            // Map display names to actual keys
            const fieldsToShow = ['creationDate', 'ordThwTapWekCd', 'customerName', 'orderType', 'orderLineQty',
                'faConfirmFlag', 'posbPassFacCdN', 'cfirmPassOpCd'];
            const headers = fieldsToShow.map((key, index) => ({
                key,
                displayName: displayNames[index],
            }));
            setTableHead(headers);

            const rowData = headers.map(({ key, displayName }) => [displayName, orderData[key]]);
            setTableData(rowData);
        }
    }, [searchTerm]);

    // 폰트 사이즈 확대
    useEffect(() => {
        setLocalFontSize(fontSize);
    }, [fontSize]);

    return (
        <ScrollView>
            <View style={styles.container}>
                {orderData ? (
                    <View style={styles.shadowContainer}>

                        <Table borderStyle={{ borderWidth: 1, borderColor: '#e4e6ee' }}>
                            <Row
                                data={['설명', '정보']}
                                widthArr={widthArr}
                                style={styles.row}
                                textStyle={styles.text}
                            />
                            <Rows
                                data={tableData}
                                widthArr={widthArr}
                                style={styles.row}
                                textStyle={[styles.textHeader, { fontSize: localFontSize }]}  // Use localFontSize
                            />
                        </Table>
                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 2, paddingTop: 20, backgroundColor: '#fff', },
    shadowContainer: {
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
            },
            android: {
                elevation: 4,
            },
        })
    },
    text: {
        textAlign: 'center',
        fontFamily: 'TheJamsil3Regular',
        fontSize: 12,
        margin: 3,
        color: '#09537F'
    },
    row: {
        height: 40,

        backgroundColor: '#fff',
        fontFamily: 'TheJamsil3Regular',
        fontSize: 12,
    },
    textHeader: {
        textAlign: 'center',
        fontFamily: 'TheJamsil3Regular',
        fontSize: 12,
        margin: 3,
    },
});