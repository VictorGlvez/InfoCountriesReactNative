import React, {ReactNode} from "react";
import {View, StyleSheet, DimensionValue} from "react-native";

interface RectanguloProps {
    children: ReactNode;
    backgroundColor: string;
    borderColor: string;
    padding?: number;
    width?: DimensionValue;
    height?: DimensionValue;
    margin?: number;
    minHeight?: DimensionValue;
    minWidth?: DimensionValue;
}

export const Rectangulo: React.FC<RectanguloProps> = ({
                                                          children,
                                                          backgroundColor,
                                                          borderColor,
                                                          padding = 0,
                                                          width = 'auto',
                                                          height = 'auto',
                                                          margin = 0,
                                                          minHeight = 'auto',
                                                          minWidth = 'auto',
                                                      }) => {
    const divStyle = StyleSheet.create({
        container: {
            width: width,
            height: height,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            overflow: "hidden",
            padding: padding,
            margin: margin,
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
            minHeight: minHeight,
            minWidth: minWidth,
        }
    });
    return <View style={divStyle.container}>{children}</View>
}
