import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const ImageViewerModal = ({visible, images, startIndex, onClose}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.9)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          initialScrollIndex={startIndex}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({item}) => (
            <View style={{width, alignItems: 'center'}}>
              <Image
                source={{uri: item}}
                style={{
                  width: width,
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
          )}
        />

        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 40,
            right: 20,
            padding: 8,
          }}
          onPress={onClose}>
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ImageViewerModal;
