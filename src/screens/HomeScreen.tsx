import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {
  GiphyContent,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaView,
  GiphySDK,
  GiphyMediaType,
  GiphyThemePreset,
} from '@giphy/react-native-sdk';
import {GIPHY_API_KEY} from '../../tokens';
import {Button} from '../components/Button';

GiphySDK.configure({
  apiKey: GIPHY_API_KEY,

  // Android SDK key
});

export enum ContainerType {
  Trending = 'Trending',
  Search = 'Search',
}

export const HomScreen = () => {
  const [containerType, setContainerType] = useState(ContainerType.Trending);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const onButtonPress = (type: ContainerType) => {
    if (type !== containerType) {
      setContainerType(type);
    }
  };

  const themeBg: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <View style={[styles.container, themeBg]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: 16,
        }}>
        <Switch
          trackColor={{false: 'black', true: 'white'}}
          value={isDarkMode}
          thumbColor={'#f5dd4b'}
          onValueChange={val => {
            setIsDarkMode(val => !val);
          }}></Switch>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          title="Show Trending"
          isSelected={containerType === ContainerType.Trending}
          type={ContainerType.Trending}
          onButtonPress={onButtonPress}></Button>
        <Button
          type={ContainerType.Search}
          title="Search a giphy"
          isSelected={containerType === ContainerType.Search}
          onButtonPress={onButtonPress}></Button>
      </View>

      {containerType === ContainerType.Search && (
        <TextInput
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: isDarkMode ? 'white' : 'grey',
            marginVertical: 8,
            marginHorizontal: 24,
            borderBottomWidth: 2,
            borderBottomColor: isDarkMode ? 'white' : 'grey',
          }}
          autoFocus
          onChangeText={setSearchQuery}
          placeholder="Search..."
          value={searchQuery}
        />
      )}
      {/* <GiphyGridView
        content={
          containerType === ContainerType.Trending
            ? GiphyContent.trending({
                mediaType: GiphyMediaType.Gif,
              })
            : GiphyContent.search({
                searchQuery: searchQuery,
              })
        }
        cellPadding={3}
        style={{height: 500, marginTop: 24}}
        theme={isDarkMode ? GiphyThemePreset.Dark : GiphyThemePreset.Light}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
