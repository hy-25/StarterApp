import {GiphySDK} from '@giphy/react-native-sdk';
import {GIPHY_API_KEY} from './tokens';

GiphySDK.configure({
  apiKey: GIPHY_API_KEY,

  // Android SDK key
});
