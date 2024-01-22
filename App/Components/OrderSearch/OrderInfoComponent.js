import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import MainApi from '../../APIs/MainApi';
import { useFontSize } from "../Setting/fontProvider";
import { useTranslation } from 'react-i18next';

export default function OrderInfoComponent({ searchTerm, orderData }) {
    const { t } = useTranslation();

    const [tableHead, setTableHead] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [widthArr, setWidthArr] = useState([160, 180]);
    const {fontSize} = useFontSize();
    const [localFontSize, setLocalFontSize] = useState(fontSize);

    useEffect(() => {
        console.log('searchTerm', searchTerm);
        if (orderData) {

            const displayNames = [
                t('creationDate'),
                t('orderInputSteelBarCode'),
                t('clientName'),
                t('orderType'),
                t('orderQuantity'),
                t('factoryDecisionCategory'),
                t('possibleProcessCode'),
                t('confirmedProcessCode')
            ];

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

    // Update localFontSize when fontSize from context changes
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
                                data={[`${t('orderSearchComponent.des')}`, `${t('orderSearchComponent.info')}`]}
                                widthArr={widthArr}
                                style={styles.rowH}
                                textStyle={[styles.textHeader, { fontSize: localFontSize }]}  // Use localFontSize
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
        color: '#051367',
    },
    row: {
        height: 40,

        backgroundColor: '#fff',
        fontFamily: 'TheJamsil3Regular',
        fontSize: 12,
    },rowH: {
        height: 40,

        backgroundColor: 'rgba(5,19,103,0.03)',
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