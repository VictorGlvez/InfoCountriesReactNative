/*
import React, {ReactNode, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MyContext} from '@/app/buscador';
import RNPickerSelect from 'react-native-picker-select';

const RectanguloBuscador = () => {
    const {handlers, selectData} = useContext(MyContext);

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {selectData.map((select: RNPickerSelect, index) => (
                    <View style={styles.row} key={index}>
                        <View style={styles.column}>
                            <Text>{select.field}</Text>
                        </View>
                        <View style={styles.column}>
                            <RNPickerSelect
                                onValueChange={handlers[select.field]}
                                items={select.options.map(option => ({ label: option.label, value: option.value }))}
                                style={pickerSelectStyles}
                            />

                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default RectanguloBuscador;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#113946",
        borderColor: "#FDF6EA",
        color: "#FDF6EA",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 5,
    },
    innerContainer: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    column: {
        flex: 1,
    },
});

const pickerSelectStyles = StyleSheet.create({

    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
*/
