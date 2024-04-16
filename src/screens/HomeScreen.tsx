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
import {GiphySDK} from '@giphy/react-native-sdk';
import {GIPHY_API_KEY} from '../../tokens';
import {Button} from '../components/Button';

GiphySDK.configure({
  apiKey: GIPHY_API_KEY,
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

  const omSwitchPress = (val: boolean) => {
    setIsDarkMode(val => !val);
  };

  const themeBg: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  const textInputDynamicStyle = {
    borderBottomColor: isDarkMode ? 'white' : 'grey',
    color: isDarkMode ? 'white' : 'grey',
  };

  return (
    <View style={[styles.container, themeBg]}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
        }}>
        <Text
          style={{
            color: isDarkMode ? 'white' : 'black',
            fontWeight: 'bold',
            fontSize: 28,
            flex: 1,
          }}>
          GIPHY APP
        </Text>
        <Switch
          trackColor={{false: 'black', true: 'white'}}
          value={isDarkMode}
          thumbColor={'#f5dd4b'}
          onValueChange={omSwitchPress}></Switch>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          title="TRENDING"
          isSelected={containerType === ContainerType.Trending}
          type={ContainerType.Trending}
          onButtonPress={onButtonPress}></Button>
        <Button
          type={ContainerType.Search}
          title="SEARCH"
          isSelected={containerType === ContainerType.Search}
          onButtonPress={onButtonPress}></Button>
      </View>

      {containerType === ContainerType.Search && (
        <TextInput
          style={[styles.textInputBaseStyle, textInputDynamicStyle]}
          autoFocus
          onChangeText={setSearchQuery}
          placeholder="Search..."
          value={searchQuery}
          placeholderTextColor={isDarkMode ? 'white' : 'grey'}
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

  textInputBaseStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    marginHorizontal: 24,
    borderBottomWidth: 2,
  },
});
