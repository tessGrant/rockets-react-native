import React from 'react'
import {LayoutTabsChildren, Navigation} from 'react-native-navigation'
import {color} from '../util/colors'
import LaunchesList, {
    LaunchesListLayout,
    LaunchesListLayoutName
} from '../screens/launches-list'
import {ComponentProvider, ImageRequireSource} from 'react-native'
import LaunchDetails, {
    LaunchDetailLayout,
    LaunchDetailLayoutName
} from '../screens/launch-details'
import PadsList, {
    PadsListLayout,
    PadsListLayoutName
} from '../screens/pads-list'
import PadDetails, {
    PadDetailLayout,
    PadDetailLayoutName
} from '../screens/pad-details'
import FavoritesList, { FavoritesListLayout, FavoritesListLayoutName } from '../screens/favorite-list'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore} from 'redux'
import { rootReducer } from '../store/reducer'
import Icon from 'react-native-vector-icons/Ionicons';

const store = createStore(rootReducer);

export const registerScreens = () => {
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    children: [launchesTab, padsTab, favoriteTab]
                }
            }
        })
    })

    Navigation.registerComponent(LaunchesListLayoutName, () => () => <Provider store={store}><LaunchesList /></Provider>, () => LaunchesList)
    Navigation.registerComponent(LaunchDetailLayoutName, () => (props) => <Provider store={store}><LaunchDetails {...props} /></Provider>, () => LaunchDetails)
    Navigation.registerComponent(PadsListLayoutName, () => () => <Provider store={store}><PadsList /></Provider>, () => PadsList)
    Navigation.registerComponent(PadDetailLayoutName, () => (props) => <Provider store={store}><PadDetails {...props} /></Provider>, () => PadDetails)
    Navigation.registerComponent(FavoritesListLayoutName, () => () => <Provider store={store}><FavoritesList /></Provider>, () => FavoritesList)
}

const bottomTab = (icon: ImageRequireSource) => ({
    icon,
    iconColor: color.shade400,
    selectedIconColor: color.shade700,
    iconInsets: {top: 5, bottom: -5}
})

// Launches List

export const LAUNCHES_STACK = 'LaunchesStack'

const launchesTab: LayoutTabsChildren = {
    stack: {
        id: LAUNCHES_STACK,
        children: [
            {
                component: LaunchesListLayout()
            }
        ],
        options: {
            bottomTab: bottomTab(require('../../assets/icons/rocket.png'))
        }
    }
}

// Pads List

export const PADS_STACK = 'PadsStack'

const padsTab: LayoutTabsChildren = {
    stack: {
        id: PADS_STACK,
        children: [
            {
                component: PadsListLayout()
            }
        ],
        options: {
            bottomTab: bottomTab(require('../../assets/icons/bullseye.png'))
        }
    }
}

// Favorite List

export const FAVORITE_STACK = 'FavoriteStack'

const favoriteTab: LayoutTabsChildren = {
    stack: {
        id: FAVORITE_STACK,
        children: [
            {
                component: FavoritesListLayout()
            } 
        ],
        options: {
            bottomTab: bottomTab(require('../../assets/icons/star.png'))
        }
    }
}
