
import React from 'react';
import { legacy_createStore as createStore} from 'redux'
import {AppRegistry} from 'react-native';
import { Provider} from 'react-redux';
import {name as appName} from './app.json';
import {rootReducer} from './src/store/reducer'

const {registerScreens} = require('./src/navigation/navigation');

registerScreens()
