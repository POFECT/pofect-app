import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Size from "../../Utils/Size";  // Expo의 아이콘 라이브러리 사용

const BasicInfoComponent = ({ iconName, title, description }) => {
    return (

        <View style={{ flex:1, flexDirection: 'row', alignItems: 'center',
                        marginBottom: 6, marginTop:6,
            marginLeft: 10,

        }}>
            <Ionicons name={iconName}
                      size={20} color="#051367"
                      style={{ marginRight: 20 ,}} />
            <View>
                <Text style={{ fontSize: 15,
                    marginBottom: 3,

                    fontFamily: 'LINESeedKR-Bd', color: '#051367',
                    textAlign: 'center',
                }}>{title}</Text>

                <Text style={{ fontSize: 12,
                    fontFamily: 'LINESeedKR-Rg', color: '#666',

                    textAlign: 'center',
                }}>{description}</Text>
            </View>
        </View>
    );
};

export default BasicInfoComponent;
