import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {MyContext} from '@/app/buscador';
import {SelectList} from "react-native-dropdown-select-list";

const RectanguloBuscador = () => {
    const {handleDataChange, searchFieldOptions} = useContext(MyContext);
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {searchFieldOptions && searchFieldOptions.map((select, index) => (
                    <View style={styles.row} key={index}>
                        <View style={{width: 200}}>
                            <SelectList
                                setSelected={(selectedOption) => handleDataChange(select.field, selectedOption === select.field ? null : selectedOption)}
                                data={[select.field, ...select.options]}
                                save="value"
                                search={false}
                                placeholder={select.field}
                                inputStyles={styles.inputStyle}
                                dropdownItemStyles={styles.dropdownStyle}
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
        margin: 40,
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
    inputStyle: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#FFF2D8',
        paddingRight: 30,
    },
    dropdownStyle: {
        backgroundColor: '#FFF2D8',
        color: '#113946',
    },
    dropdownItemStyle: {
        color: '#113946',
    }
});


