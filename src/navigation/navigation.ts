import {LayoutTabsChildren, Navigation} from 'react-native-navigation'
import {color} from '../util/colors'
import { ImageRequireSource} from 'react-native'
import { legacy_createStore as createStore} from 'redux'
import { rootReducer } from '../store/reducer'
import WrappedLaunchesList, {LaunchesListLayout, LaunchesListLayoutName} from '../screens/LaunchListScreen'
import WrappedPadsList, {PadsListLayout, PadsListLayoutName} from '../screens/PadsListScreen'
import WrappedFavoritesList, {FavoritesListLayout, FavoritesListLayoutName} from '../screens/FavoriteListsScreen'
import WrappedPadDetails, {PadDetailLayoutName} from '../screens/PadDetailsScreen'
import WrappedLaunchDetails, {LaunchDetailLayoutName} from '../screens/LaunchDeatailsScreen'

export const store = createStore(rootReducer);

export const registerScreens = () => {
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    children: [launchesTab, padsTab, favoriteTab]
                }
            },
        })
    })

    Navigation.registerComponent(LaunchesListLayoutName, () => WrappedLaunchesList),
    Navigation.registerComponent(LaunchDetailLayoutName, () => WrappedLaunchDetails),
    Navigation.registerComponent(PadsListLayoutName, () => WrappedPadsList),
    Navigation.registerComponent(PadDetailLayoutName, () => WrappedPadDetails),
    Navigation.registerComponent(FavoritesListLayoutName, () => WrappedFavoritesList)
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
