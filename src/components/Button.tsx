import {StyleProp, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {ContainerType} from '../screens/HomeScreen';

export const Button = ({
  title,
  isSelected,
  onButtonPress,
  type,
}: {
  title: string;
  isSelected: boolean;
  onButtonPress: (type: ContainerType) => void;
  type: ContainerType;
}) => {
  const onPress = () => {
    onButtonPress(type);
  };

  const bgStyles: StyleProp<ViewStyle> = {
    backgroundColor: isSelected ? 'green' : 'red',
  };

  console.log(type, isSelected);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          padding: 8,
          margin: 12,
        },
        bgStyles,
      ]}>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
    </TouchableOpacity>
  );
};
