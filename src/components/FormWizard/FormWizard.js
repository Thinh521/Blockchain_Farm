import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

import Button from '../../components/CustomButton/CustomButton';
import Input from '../../components/CustomInput/CustomInput';
import Images from '../../assets/images/images';

import {scale} from '../../utils/scaling';
import {Colors} from '../../theme/theme';
import styles from './FormWizard.style';

const FormWizard = ({
  menuItems,
  formData,
  onInputChange,
  onSubmit,
  onImageSelect,
  onImageRemove,
  isSubmitting,
  isFormValid,
  submitButtonText = 'Xác nhận',
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [openSelectField, setOpenSelectField] = useState(null);

  const handleMenuItemPress = sectionIndex => {
    setActiveSection(activeSection === sectionIndex ? null : sectionIndex);
  };

  const selectImage = (type, field) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 0,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel || response.errorCode) return;

      if (response.assets && response.assets.length > 0) {
        if (type === 'single') {
          onImageSelect(field, response.assets[0], type);
        } else if (type === 'multiple') {
          onImageSelect(field, response.assets, type);
        }
      }
    });
  };

  const removeImage = (field, index = null) => {
    onImageRemove(field, index);
  };

  const renderImageUpload = (
    field,
    type = 'single',
    placeholder = 'Chọn ảnh',
  ) => {
    const fieldValue = formData[field];

    if (type === 'single') {
      return fieldValue ? (
        <View style={styles.imagePreviewContainer}>
          <FastImage
            source={{uri: fieldValue.uri}}
            style={styles.imagePreview}
          />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={() => removeImage(field)}>
            <Icon name="close" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => selectImage('single', field)}>
          <FastImage
            source={Images.images}
            resizeMode="contain"
            style={{width: scale(30), height: scale(30)}}
          />
          <Text style={styles.uploadText}>{placeholder}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.farmImagesContainer}>
          {(fieldValue || []).map((image, index) => (
            <View key={index} style={styles.farmImageContainer}>
              <FastImage
                source={{uri: image.uri}}
                style={styles.farmImagePreview}
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(field, index)}>
                <Icon name="close" size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addFarmImageButton}
            onPress={() => selectImage('multiple', field)}>
            <Icon name="add" size={30} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const renderInput = config => {
    const {
      field,
      label,
      placeholder,
      keyboardType = 'default',
      multiline = false,
      numberOfLines = 1,
      editable = true,
    } = config;

    return (
      <View style={styles.inputGroup}>
        {label && <Text style={styles.inputLabel}>{label}</Text>}
        <Input
          placeholder={placeholder}
          value={formData[field]}
          onChangeText={text => onInputChange(field, text)}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
        />
      </View>
    );
  };

  const isCompleted = sectionIndex => {
    if (menuItems[sectionIndex]?.isCompleted) {
      return menuItems[sectionIndex].isCompleted(formData);
    }
    return false;
  };

  const renderSelect = config => {
    const {field, label, options = []} = config;
    const isOpen = openSelectField === field;

    return (
      <View style={styles.inputGroup}>
        {label && <Text style={styles.inputLabel}>{label}</Text>}

        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setOpenSelectField(isOpen ? null : field)}
          activeOpacity={0.7}>
          <Text
            style={{
              color: formData[field] ? Colors.text : '#999',
              flex: 1,
            }}>
            {formData[field] || 'Chọn danh mục'}
          </Text>
          <Icon
            name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={24}
            color="#666"
          />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownList}>
            {options.map((item, index) => {
              const isSelected = formData[field] === item;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionItem,
                    isSelected && styles.optionItemSelected,
                  ]}
                  onPress={() => {
                    onInputChange(field, item);
                    setOpenSelectField(null);
                  }}>
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.whiteBackground}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {menuItems.map((item, index) => (
              <View key={index} style={styles.menuItemContainer}>
                <TouchableOpacity
                  style={[
                    styles.menuItem,
                    isCompleted(index) && styles.menuItemCompleted,
                    activeSection === index && styles.menuItemActive,
                  ]}
                  onPress={() => handleMenuItemPress(index)}
                  activeOpacity={0.7}>
                  <View style={styles.menuItemLeft}>
                    <Text style={styles.menuItemText}>{item.title}</Text>
                    <Text style={styles.menuItemDescription}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {isCompleted(index) && (
                      <Icon
                        name="check-circle"
                        size={20}
                        color="#4CAF50"
                        style={{marginRight: 8}}
                      />
                    )}
                    <Icon name={item.icon} size={24} color="#FF6B35" />
                    <Icon
                      name={
                        activeSection === index
                          ? 'keyboard-arrow-up'
                          : 'keyboard-arrow-down'
                      }
                      size={20}
                      color="#666"
                    />
                  </View>
                </TouchableOpacity>

                {activeSection === index && (
                  <View style={styles.formSection}>
                    {item.renderContent ? (
                      item.renderContent({
                        formData,
                        onInputChange,
                        renderInput,
                        renderImageUpload,
                      })
                    ) : (
                      <View>
                        {item.fields?.map((fieldConfig, fieldIndex) => (
                          <View key={fieldIndex}>
                            {fieldConfig.type === 'input' &&
                              renderInput(fieldConfig)}
                            {fieldConfig.type === 'select' &&
                              renderSelect(fieldConfig)}
                            {fieldConfig.type === 'image' &&
                              renderImageUpload(
                                fieldConfig.field,
                                fieldConfig.imageType,
                                fieldConfig.placeholder,
                              )}
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.submitContainer}>
          <Button.Main
            title={isSubmitting ? 'Đang xử lý...' : submitButtonText}
            onPress={onSubmit}
            disabled={!isFormValid() || isSubmitting}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FormWizard;
