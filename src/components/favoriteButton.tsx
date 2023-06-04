import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { color } from '../util/colors';

interface ButtonProps {
    id: number;
    onPress: () => void;
    isFavoriteItem: boolean;
};

export const FavoriteButton: FC<ButtonProps> = ({
    id,
    onPress,
    isFavoriteItem,
}) => {
    const favoriteColor = isFavoriteItem ? color.pink700 : color.blue700;
    
    return (
        <TouchableOpacity
            key={`${id} + toggled`}
            onPress={onPress}
            style={[styles.favoriteButton, {backgroundColor: favoriteColor}]}>
            <Text style={styles.successText}>{isFavoriteItem ? 'FAVORITE' : 'ADD TO FAVORITE'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    favoriteButton: {
    position: 'absolute',
    right: 35,
    top: 20,
    width: 80,
    height: 35,
    zIndex: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 4
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
});
