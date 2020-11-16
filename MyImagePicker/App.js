/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

const App = () => {
  const [isListViewEnable, setIsListViewEnable] = useState(false);
  const [imageList, setImageList] = useState([]);

  const {addSwitchContainerStyle, switchStyle, addButtonStyle} = styles;

  const onAddImageHandler = () => {
    let options = {
      title: 'Select Image',
      cameraType: 'front',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.error) {
        console.log('Picker error : - ' + response.error);
      } else if (response.customButton) {
        console.log('Tapped custom button : - ' + response.customButton);
      } else {
        setImageList(() => {
          const newImage = [...imageList];
          const source = {uri: response.uri};
          const imageItem = {
            id: Date.now(),
            url: source,
            content: response,
          };
          newImage.push(imageItem);
          return newImage;
        });
      }
    });
  };

  const toggleSwitch = () => {
    setIsListViewEnable(!isListViewEnable);
  };

  const renderListItem = (item) => {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image source={item.item.url} style={styles.imageStyle} />
          <Text style={styles.titleStyle}>{item.item.id}</Text>
        </View>
      </View>
    );
  };

  const renderGridItem = (item) => {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image source={item.item.url} style={styles.imageStyle} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={addSwitchContainerStyle}>
        <View style={addButtonStyle}>
          <Button title="ADD" onPress={() => onAddImageHandler()} />
        </View>
        <View style={switchStyle}>
          <Switch onValueChange={toggleSwitch} value={isListViewEnable} />
        </View>
      </View>
      <FlatList
        key={isListViewEnable}
        data={imageList}
        renderItem={isListViewEnable ? renderListItem : renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={isListViewEnable ? 1 : 3}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  imageStyle: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  titleStyle: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  addSwitchContainerStyle: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
  },
  addButtonStyle: {flex: 1, alignItems: 'flex-start'},
  switchStyle: {flex: 1, alignItems: 'flex-end'},
});