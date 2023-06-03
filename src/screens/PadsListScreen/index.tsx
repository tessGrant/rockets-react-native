import React, {VFC} from 'react'
import {FlatList, SafeAreaView} from 'react-native'
import {LayoutComponent, Navigation} from 'react-native-navigation'
import {EmptyState} from '../../components/emptyState'
import {PadListCell} from '../../components/padListCell'
import {Pad} from '../../types'
import {PADS_STACK} from '../../navigation/navigation'
import {usePadsPaginated} from '../../api/useSpaceX'
import {PadDetailLayout} from '../PadDetailsScreen'

const PAGE_SIZE = 10

const PadsList: VFC = () => {
    const {data, size, setSize} = usePadsPaginated({
        limit: PAGE_SIZE
    })

    const goToPad = (pad: Pad) => {
        Navigation.push(PADS_STACK, PadDetailLayout({siteId: pad.site_id}))
    }

    if (data === undefined) {
        return <EmptyState loading />
    }

    return (
        <SafeAreaView>
            <FlatList
                data={data?.flat() ?? []}
                renderItem={item => (
                    <PadListCell pad={item.item} onPress={goToPad} isFavorite={false} />
                )}
                onEndReached={() => setSize(size + 1)}
                style={{height: '100%'}}
            />
        </SafeAreaView>
    )
}

export const PadsListLayoutName = 'PadsList'

export const PadsListLayout = (): LayoutComponent => ({
    name: PadsListLayoutName,
    options: {
        topBar: {
            title: {
                text: 'Pads'
            },
            largeTitle: {
                visible: true
            }
        }
    }
})

export default PadsList
