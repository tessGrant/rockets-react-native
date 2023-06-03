import React, {FC} from 'react'
import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle
} from 'react-native'

interface EmptyStateProp {
    loading?: boolean;
    text?: string;
    style?: StyleProp<ViewStyle>;
}

export const EmptyState: FC<EmptyStateProp> = ({loading, text, style}) => {
    return (
        <View style={[styles.container, style]}>
            {loading ? <ActivityIndicator /> : null}
            {text ? <Text>{text}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
