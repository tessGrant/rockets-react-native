import React, {FC, useEffect, useState} from 'react'
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    Text,
    View
} from 'react-native'
import {Layout, Navigation} from 'react-native-navigation'
import {color} from '../../util/colors'
import {useLaunch} from '../../api/useSpaceX'
import {styles} from './styles'
import {formatDateTime} from '../../util/formatDate'
import {format as timeAgo} from 'timeago.js'
import YoutubeIframe from 'react-native-youtube-iframe'
import {InfoRow} from '../../components/infoRow'
import { FavoriteButton } from '../../components/favoriteButton'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorites, removeFromFavorites } from '../../store/actions'
import { State } from '../../store/reducer'
import { ComponentId } from '../../types'


interface LaunchDetailsProps {
    flightNumber: number;
    isFavorite?: boolean;
}

const LaunchDetails: FC<LaunchDetailsProps & ComponentId> = ({
    flightNumber,
    componentId,
    isFavorite
}) => {
    const {data: launch} = useLaunch(flightNumber, {})

    const dispatch = useDispatch();
    const favoriteLaunches = useSelector((state: State) => state.favoriteLaunches)
    const [isStarred, setIsStarred] = useState(isFavorite);


    const handlelOnPress = () => { 
        if(isStarred){
            return dispatch(removeFromFavorites(launch?.flight_number!, 'launch'));
        } else {
            return dispatch(addToFavorites(launch!, 'launch'));
        } 
    };

    useEffect(()=>{
        const isFavoriteButtonState = favoriteLaunches.find(obj => obj.flight_number === launch?.flight_number);
        setIsStarred(Boolean(isFavoriteButtonState))
    }, [favoriteLaunches])


    useEffect(() => {
        if (launch?.mission_name) {
            Navigation.mergeOptions(componentId, {
                topBar: {
                    title: {
                        text: launch.mission_name
                    }
                }
            })
        }
    }, [launch?.mission_name])

    if (!launch) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        )
    }

    const imageUrl = launch.links.flickr_images[0]

    const cores = launch.rocket.first_stage.cores

    const firstStageCores = cores.every(core => core.land_success)
        ? cores.length === 1
            ? 'Recovered'
            : 'All recovered'
        : 'Lost'

    const stageTwoPayload = `Payload: ${launch.rocket.second_stage.payloads
        .map(payload => payload.payload_type)
        .join(', ')}`

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="never"
                contentInset={{bottom: 24}}>
                <ImageBackground source={{uri: imageUrl}} style={styles.image}>
                    <View style={styles.imageOverlay}>
                        <Text style={styles.missionNameText}>
                            {launch.mission_name}
                        </Text>
                        <FavoriteButton
                            id={launch.flight_number}
                            isFavoriteItem={Boolean(isStarred)}
                            onPress={handlelOnPress}
                        />
                        <View style={styles.subtitleContainer}>
                            <Text
                                style={[
                                    styles.badge,
                                    {backgroundColor: color.purple500},
                                    {marginRight: 8}
                                ]}>
                                {`#${launch.flight_number}`}
                            </Text>
                            <Text
                                style={[
                                    styles.badge,
                                    {
                                        backgroundColor: launch.launch_success
                                            ? color.green600
                                            : color.red600
                                    }
                                ]}>
                                {launch.launch_success ? 'SUCCESS' : 'FAILURE'}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.infoBox}>
                    <InfoRow
                        iconName="clock-outline"
                        iconText="Launch Date"
                        title={formatDateTime(launch.launch_date_utc)}
                        subtitle={timeAgo(launch.launch_date_utc)}
                    />
                    <InfoRow
                        iconName="pin-outline"
                        iconText="Launch Site"
                        title={launch.launch_site.site_name_long}
                        subtitle={launch.launch_site.site_name}
                        style={{marginTop: 24}}
                    />
                </View>

                <View style={styles.infoBox}>
                    <InfoRow
                        iconName="rocket-outline"
                        iconText="Rocket"
                        title={launch.rocket.rocket_name}
                        subtitle={launch.rocket.rocket_type}
                    />
                    <InfoRow
                        iconName="layers-triple-outline"
                        iconText="First Stage"
                        title={cores.map(core => core.core_serial).join(', ')}
                        subtitle={firstStageCores}
                        style={{marginTop: 24}}
                    />
                    <InfoRow
                        iconName="layers-triple-outline"
                        iconText="Second Stage"
                        title={`Block ${launch.rocket.second_stage.block}"`}
                        subtitle={stageTwoPayload}
                        style={{marginTop: 24}}
                    />
                </View>

                {launch.links.youtube_id ? (
                    <View style={styles.youtubeContainer}>
                        <YoutubeIframe
                            height={200}
                            videoId={launch.links.youtube_id}
                            webViewProps={{androidLayerType: 'software'}}
                        />
                    </View>
                ) : null}

                {launch.links.flickr_images.length ? (
                    <View style={styles.imageListContainer}>
                        {launch.links.flickr_images.map((image, index) => (
                            <Image
                                key={'flickr_images_' + index}
                                resizeMode="contain"
                                style={styles.flickrImage}
                                source={{uri: image}}
                            />
                        ))}
                    </View>
                ) : null}
            </ScrollView>
        </View>
    )
}

export const LaunchDetailLayoutName = 'LaunchDetail'

export const LaunchDetailLayout = (props: LaunchDetailsProps): Layout<LaunchDetailsProps> => ({
    component: {
        name: LaunchDetailLayoutName,
        passProps: props,
        options: {
            topBar: {
                visible: Platform.select({android: false})
            }
        }
    }
})

export default LaunchDetails