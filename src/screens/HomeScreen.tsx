import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  GiphyContent,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaView,
  GiphySDK,
  GiphyMediaType,
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
  const [media, setMedia] = useState<GiphyMedia | null>(null);

  const onButtonPress = (type: ContainerType) => {
    if (type !== containerType) {
      setContainerType(type);
    }
  };

  return (
    <View style={styles.container}>
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
            marginVertical: 8,
            marginHorizontal: 24,
            borderBottomWidth: 2,
            borderBottomColor: 'grey',
          }}
          autoFocus
          onChangeText={setSearchQuery}
          placeholder="Search..."
          value={searchQuery}
        />
      )}
      <GiphyGridView
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
        onMediaSelect={e => setMedia(e.nativeEvent.media)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
