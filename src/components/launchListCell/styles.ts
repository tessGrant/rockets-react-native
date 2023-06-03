import { Platform, StyleSheet } from "react-native";
import { color } from "../../util/colors";

export const styles = StyleSheet.create({
    launchOuterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 20,
        borderRadius: 16,
        shadowColor: Platform.select({ios: color.shade900}),
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
    },
    launchInnerContainer: {
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden'
    },
    launchImage: {
        height: 220,
        resizeMode: 'cover'
    },
    textContainer: {
        flex: 1,
        padding: 12
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    successText: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        fontWeight: '600',
        color: color.shade000,
        borderRadius: 4,
        fontSize: 10,
        overflow: 'hidden'
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
    launchTitle: {
        paddingTop: 8,
        fontWeight: '600',
        color: color.shade800,
        fontSize: 16
    },
    date: {
        color: color.shade900,
        fontSize: 14,
        fontWeight: '400',
        paddingRight: 8
    },
    time: {
        fontSize: 12,
        color: color.shade500
    }
})
