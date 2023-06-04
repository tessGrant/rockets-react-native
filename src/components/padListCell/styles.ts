import { Platform, StyleSheet } from "react-native";
import { color } from "../../util/colors";

export const styles = StyleSheet.create({
    padOuterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 20,
        borderRadius: 8,
        shadowColor: Platform.select({ios: color.shade900}),
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2
    },
    padInnerContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden'
    },
    textContainer: {
        flex: 1,
        padding: 12
    },
    statusText: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        fontWeight: '600',
        color: color.shade000,
        borderRadius: 4,
        fontSize: 10,
        overflow: 'hidden'
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    smallText: {
        textTransform: 'uppercase',
        color: color.shade500,
        fontSize: 12,
        fontWeight: '600'
    },
    dot: {
        color: color.shade500,
        paddingHorizontal: 4
    },
    padTitle: {
        paddingTop: 6,
        fontWeight: '600',
        color: color.shade800,
        fontSize: 16
    },
    vehicles: {
        color: color.shade900,
        fontSize: 14,
        fontWeight: '400',
        paddingTop: 2
    }
})
