import React, {FC, useEffect, useState} from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import {color} from '../../util/colors'
import {formatDate} from '../../util/formatDate'
import {Launch} from '../../types'
import {format as timeAgo} from 'timeago.js'
import {addToFavorites, removeFromFavorites} from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { FavoriteButton } from '../favoriteButton'
import { State } from '../../store/reducer'
import { styles } from './styles'

interface LaunchCellProp {
    launch: Launch;
    onPress: (launch: Launch) => void;
    isFavorite?:boolean;
}

export const LaunchListCell: FC<LaunchCellProp> = ({launch, onPress, isFavorite}) => {
    const imageUrl = launch.links.flickr_images[0] ?? launch.links.mission_patch_small;
    const backgroundColor = launch.launch_success
        ? color.green700
        : color.red700
    
    const dispatch = useDispatch();
    const favoriteLaunches = useSelector((state: State) => state.favoriteLaunches)
    const [isStarred, setIsStarred] = useState(isFavorite);


    const handlelOnPress = () => { 
        if(isStarred){
            return dispatch(removeFromFavorites(launch.flight_number, 'launch'));
        } else {
            return dispatch(addToFavorites(launch, 'launch'));
        } 
    };

    useEffect(()=>{
        const isFavoriteButtonState = favoriteLaunches.find(obj => obj.flight_number === launch.flight_number);
        setIsStarred(Boolean(isFavoriteButtonState))
    }, [favoriteLaunches])


    return (
        <>
            <FavoriteButton
                id={launch.flight_number}
                isFavoriteItem={Boolean(isStarred)}
                onPress={handlelOnPress}
             />
            <TouchableOpacity
                key={launch.flight_number}
                onPress={() => onPress(launch)}
                style={styles.launchOuterContainer}>
                <View style={styles.launchInnerContainer}>
                    <Image source={{uri: imageUrl}} style={styles.launchImage} />
                    <View style={styles.textContainer}>
                        <View style={styles.textRow}>
                            <Text style={[styles.successText, {backgroundColor}]}>
                                {launch.launch_success ? 'SUCCESS' : 'FAILURE'}
                            </Text>
                            <Text style={[styles.smallText, {paddingLeft: 8}]}>
                                {launch.rocket.rocket_name}
                            </Text>
                            <Text style={styles.dot}>{'•'}</Text>
                            <Text style={styles.smallText}>
                                {launch.launch_site.site_name}
                            </Text>
                        </View>
                        <Text style={styles.launchTitle}>
                            {launch.mission_name}
                        </Text>
                        <View style={[styles.textRow, {paddingTop: 4}]}>
                            <Text style={styles.date}>
                                {formatDate(launch.launch_date_utc)}
                            </Text>
                            <Text style={styles.time}>
                                {timeAgo(launch.launch_date_utc)}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}
