import React, {VFC, useContext, useEffect, useState} from 'react'
import {FlatList, SafeAreaView, Text} from 'react-native'
import {LayoutComponent, Navigation} from 'react-native-navigation'
import {Launch} from '../api/types'
import {useLaunchesPaginated} from '../api/use-space-x'
import {FAVORITE_STACK, LAUNCHES_STACK} from '../navigation/navigation'
import {LaunchDetailLayout} from './launch-details'
import {LaunchListCell} from '../components/launch-list-cell'
import {EmptyState} from '../components/empty-state'
import { useSelector } from 'react-redux'
import { State } from '../store/reducer'


const FavoritesList: VFC = () => {
    const launches = useSelector((state: State) => state.launches);
    const goToLaunch = (launch: Launch) => {
        Navigation.push(
            FAVORITE_STACK,
            LaunchDetailLayout({flightNumber: launch.flight_number})
        )
    }
    return (
        <SafeAreaView>  
             <FlatList
                data={launches?.flat() ?? []}
                renderItem={item => (
                    <LaunchListCell launch={item.item} onPress={goToLaunch} isFavorite />
                )}
                style={{height: '100%'}}
            />
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
