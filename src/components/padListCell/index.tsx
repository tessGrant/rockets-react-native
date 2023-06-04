import React, {FC, useEffect, useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {color} from '../../util/colors'
import {Pad} from '../../types'
import { FavoriteButton } from '../favoriteButton'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../store/reducer'
import { addToFavorites, removeFromFavorites } from '../../store/actions'
import { styles } from './styles'

interface PadCellProps {
    pad: Pad;
    onPress: (pad: Pad) => void;
    isFavorite?: boolean
}

export const PadListCell: FC<PadCellProps> = ({pad, onPress, isFavorite}) => {
    const statusColor =
        pad.status === 'active'
            ? color.green700
            : pad.status === 'under construction'
            ? color.yellow700
            : color.red700

    const dispatch = useDispatch();
    const favoritePads = useSelector((state: State) => state.favoritePads)
    const [isStarred, setIsStarred] = useState(isFavorite);

    const handlelOnPress = () => { 
        if(isStarred){
            return dispatch(removeFromFavorites(pad.id, 'pad'));
        } else {
            return dispatch(addToFavorites(pad, 'pad'));
        } 
    };

    useEffect(()=>{
        const isFavoriteButtonState = favoritePads.find(obj => obj.id === pad.id);
        setIsStarred(Boolean(isFavoriteButtonState))
    }, [favoritePads])

    return (
        <>
            <FavoriteButton
                id={pad.id}
                isFavoriteItem={Boolean(isStarred)}
                onPress={() => handlelOnPress()}
            />
            <TouchableOpacity
                key={pad.id}
                onPress={() => onPress(pad)}
                style={styles.padOuterContainer}>
                <View style={styles.padInnerContainer}>
                    <View style={styles.textContainer}>
                        <View style={styles.textRow}>
                            <Text
                                style={[
                                    styles.statusText,
                                    {backgroundColor: statusColor}
                                ]}>
                                {pad.status.toUpperCase()}
                            </Text>
                        </View>
                        <View style={[styles.textRow, {paddingTop: 4}]}>
                            <Text style={styles.smallText}>
                                {pad.attempted_launches + ' ATTEMPTED'}
                            </Text>
                            <Text style={styles.dot}>{'•'}</Text>
                            <Text style={styles.smallText}>
                                {pad.successful_launches + ' SUCCEEDED'}
                            </Text>
                        </View>
                        <Text style={styles.padTitle}>{pad.name}</Text>
                        <Text style={styles.vehicles}>
                            {pad.vehicles_launched.join(', ')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
