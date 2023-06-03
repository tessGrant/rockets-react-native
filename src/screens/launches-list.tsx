import React, {VFC, useEffect} from 'react'
import {FlatList, SafeAreaView} from 'react-native'
import {LayoutComponent, Navigation} from 'react-native-navigation'
import {Launch} from '../api/types'
import {useLaunchesPaginated} from '../api/use-space-x'
import {LAUNCHES_STACK} from '../navigation/navigation'
import {LaunchDetailLayout} from './launch-details'
import {LaunchListCell} from '../components/launch-list-cell'
import {EmptyState} from '../components/empty-state'
import { useDispatch, useSelector } from 'react-redux'
import { getLaunchesOrPads } from '../store/actions'
import { State } from '../store/reducer'
const PAGE_SIZE = 10

const LaunchesList: VFC = () => {
    const dispatch = useDispatch();

    const {data, size, setSize} = useLaunchesPaginated({
        limit: PAGE_SIZE,
        order: 'desc',
        sort: 'launch_date_utc'
    });

    const launches = useSelector((state: State) => state.launches)

    useEffect((() => {
        dispatch(getLaunchesOrPads(data?.flat() ?? [], 'launch'));
    }
    ), [data])
        
    const goToLaunch = (launch: Launch) => {
        Navigation.push(
            LAUNCHES_STACK,
            LaunchDetailLayout({flightNumber: launch.flight_number})
        )
    }

    if (data === undefined) {
        return <EmptyState loading />
    }

    return (
        <SafeAreaView>
            <FlatList
                data={launches}
                renderItem={item => (
                    <LaunchListCell 
                        launch={item.item}
                        onPress={goToLaunch}
                    />
                )}
                onEndReached={() => setSize(size + 1)}
                style={{height: '100%'}}
            />

        </SafeAreaView>
    )
}

export const LaunchesListLayoutName = 'LaunchesList'

export const LaunchesListLayout = (): LayoutComponent => ({
    name: LaunchesListLayoutName,
    options: {
        topBar: {
            title: {
                text: 'Launches'
            },
            largeTitle: {
                visible: true
            }
        }
    }
})

export default LaunchesList
