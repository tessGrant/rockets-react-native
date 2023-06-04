import React, {VFC, useEffect, useState} from 'react'
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {LayoutComponent, Navigation} from 'react-native-navigation'
import {Launch, Pad} from '../../types'
import {FAVORITE_STACK, store} from '../../navigation/navigation'
import {LaunchDetailLayout} from '../LaunchDeatailsScreen'
import {LaunchListCell} from '../../components/launchListCell'
import { Provider, useSelector } from 'react-redux'
import { State } from '../../store/reducer'
import { PadListCell } from '../../components/padListCell'
import { PadDetailLayout } from '../PadDetailsScreen'
import { color } from '../../util/colors'
import { styles } from './styles'

const FavoritesList: VFC = () => {
    const launches = useSelector((state: State) => state.favoriteLaunches);
    const pads = useSelector((state: State) => state.favoritePads);
    const [tab, setTab] = useState('launches');
    const goToLaunch = (launch: Launch) => {
        Navigation.push(
            FAVORITE_STACK,
            LaunchDetailLayout({flightNumber: launch.flight_number})
        )
    }
    const goToPad = (pad: Pad) => {
        Navigation.push(FAVORITE_STACK, PadDetailLayout({siteId: pad.site_id}))
    }

    useEffect(() => {
        if((launches.length === 0) && (pads.length > 0) ){setTab('pads')}
    }, [launches])

    return (
        <Provider store={store}>

        <SafeAreaView>
            {/* Favorite Lisst Toggle */}
            <View style={styles.tabSwitcher}>
                <TouchableOpacity
                    onPress={() => tab !== 'launches' && setTab('launches')}
                >
                    <Text style={[styles.tabSwitcherText, {
                        color: (tab === 'launches') ? color.blue700 : color.blue500,
                        fontWeight: (tab === 'launches') ? '800' : '400'}]}
                    >Launches</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => tab !== 'pads' && setTab('pads')}
                >
                    <Text style={[styles.tabSwitcherText, {
                        color: (tab === 'pads') ? color.blue700 : color.blue500,
                        fontWeight: (tab === 'pads') ? '800' : '400'}]}
                    >Pads</Text>
                </TouchableOpacity>
            </View>
            {/* End Favorite List Toggle */}

            {!pads.length && tab === 'pads' && (<View><Text style={styles.styledNoDataText}>No Favorite Pads</Text></View>)}
            {!launches.length && tab === 'launches' && (<View><Text style={styles.styledNoDataText}>No Favorite launches</Text></View>)}
            
            {Boolean(pads.length) && tab === 'pads' && 
                <FlatList
                    data={pads?.flat() ?? []}
                    renderItem={item => (
                        <PadListCell pad={item.item} onPress={goToPad} isFavorite />
                    )}
                    style={{height: '100%'}}
                />
            }

            {(Boolean(launches.length) && tab === 'launches') &&
                <FlatList
                    data={launches?.flat() ?? []}
                    renderItem={item => (
                        <LaunchListCell launch={item.item} onPress={goToLaunch} isFavorite />
                    )}
                    style={{height: '100%'}}
                />
            }
            
        </SafeAreaView>
        </Provider>
    )
}

export const FavoritesListLayoutName = 'FavoritesList'
export const FavoritesListLayout = (): LayoutComponent => ({
    name: FavoritesListLayoutName,
    options: {
        topBar: {
            title: {
                text: 'Favorites'
            },
            largeTitle: {
                visible: true
            }
        }
    }
})

FavoritesList.displayName = FavoritesListLayoutName;
const WrappedFavoritesList = () => (
    <Provider store={store}>
        <FavoritesList />
    </Provider>
);

export default WrappedFavoritesList;
