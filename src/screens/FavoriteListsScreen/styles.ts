import { StyleSheet } from "react-native";
import { color } from "../../util/colors";

export const styles = StyleSheet.create({
    tabSwitcher: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.shade400
    },
    tabSwitcherText: {
        fontSize: 16,
        width: 150,
        textAlign: 'center'
    },
    styledNoDataText: {
        marginHorizontal: 40,
        marginVertical: 40,
        fontSize: 18,
        fontStyle: 'italic'
    }
});
