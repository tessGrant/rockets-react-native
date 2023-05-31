import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { color } from '../util/colors';
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/actions';
import { Launch, Pad } from '../api/types';

type ButtonProps = {
    id: number;
    item: Launch | Pad;
    itemName: 'launch' | 'pad';
    isFavoriteItem: boolean;
};

export const ActionFavoriteButton: FC<ButtonProps> = ({
    id,
    item,
    itemName,
    isFavoriteItem,
}) => {
    const dispatch = useDispatch();
    const [isStarred, setIsStarred] = useState(isFavoriteItem);
    const favoriteColor = isStarred ? color.pink700 : color.blue700;
    const handlelOnPress = () => { 
        if(isStarred){
            setIsStarred(false);
            return dispatch(removeFromFavorites(id, itemName));
        } else {
            setIsStarred(true);
            return dispatch(addToFavorites(item, itemName));
        } 
    };
    return (
        <TouchableOpacity
            key={`${id} + toggled`}
            onPress={() => handlelOnPress()}
            style={[styles.favoriteButton, {backgroundColor: favoriteColor}]}>
            <Text style={styles.successText}>{isStarred ? 'FAVORITE' : 'ADD TO FAVORITE'}</Text>
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