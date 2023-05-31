import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ListsSwitcher = () => {
    const [tab, setTab] = useState('launches');
    return (
        <View>
            <TouchableOpacity
                onPress={() => tab !== 'launches' && setTab('launches')}
            >
                <Text>Launches</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => tab !== 'pads' && setTab('pads')}
            >
                <Text>Pads</Text>
            </TouchableOpacity>
        </View>
    );
}