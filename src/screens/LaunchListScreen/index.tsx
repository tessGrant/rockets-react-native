import React, {VFC, useEffect} from 'react'
import {FlatList, SafeAreaView} from 'react-native'
import {LayoutComponent, Navigation} from 'react-native-navigation'
import {Launch} from '../../types'
import {useLaunchesPaginated} from '../../api/useSpaceX'
import {LAUNCHES_STACK, store} from '../../navigation/navigation'
import {LaunchDetailLayout} from '../LaunchDeatailsScreen'
import {LaunchListCell} from '../../components/launchListCell'
import {EmptyState} from '../../components/emptyState'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getLaunchesOrPads } from '../../store/actions'
import { State } from '../../store/reducer'

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

LaunchesList.displayName = LaunchesListLayoutName;
const WrappedLaunchesList = () => (
    <Provider store={store}>
        <LaunchesList />
    </Provider>
);
  
export default WrappedLaunchesList
