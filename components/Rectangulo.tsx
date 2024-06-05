import React, {ReactNode} from "react";
import {View, StyleSheet, DimensionValue} from "react-native";

interface RectanguloProps {
    children: ReactNode;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    padding?: number;
    width?: DimensionValue;
    height?: DimensionValue;
}

export const Rectangulo: React.FC<RectanguloProps> = ({
                                                          children,
                                                          backgroundColor,
                                                          borderColor,
                                                          textColor,
                                                          padding = 0,
                                                          width = 'auto',
                                                          height = 'auto',
                                                      }) => {
    const divStyle = StyleSheet.create({
        container: {
            width: width,
            height: height,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            color: textColor,
            overflow: "hidden",
            padding: padding,
            alignItems: 'center',
            justifyContent: 'space-around',
            borderRadius: 50, // Ajusta este valor según tus necesidades
            borderWidth: 5, // 'thick' se traduce aproximadamente a 5px
            borderStyle: 'solid',
            flexDirection: 'column',
            textAlign: 'left',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.6,
            shadowRadius: 4,
            elevation: 5,
        }
    });
    return <View style={divStyle.container}>{children}</View>
}
