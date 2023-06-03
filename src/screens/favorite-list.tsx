import React, {VFC, useEffect, useState} from 'react'
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {LayoutComponent, Navigation} from 'react-native-navigation'
import {Launch, Pad} from '../api/types'
import {FAVORITE_STACK} from '../navigation/navigation'
import {LaunchDetailLayout} from './launch-details'
import {LaunchListCell} from '../components/launch-list-cell'
import { useSelector } from 'react-redux'
import { State } from '../store/reducer'
import { PadListCell } from '../components/pad-list-cell'
import { PadDetailLayout } from './pad-details'
import { color } from '../util/colors'

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

            {!Boolean(pads.length) && tab === 'pads' && (<View><Text style={styles.styledNoDataText}>No Favorite Pads</Text></View>)}
            {!Boolean(launches.length) && tab === 'launches' && (<View><Text style={styles.styledNoDataText}>No Favorite launches</Text></View>)}
            
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

export default FavoritesList

const styles = StyleSheet.create({
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
