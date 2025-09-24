// FormWizard.js - Component tái sử dụng cho form đa bước
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import Button from '../../components/CustomButton/CustomButton';
import Input from '../../components/CustomInput/CustomInput';
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
  submitButtonText = "Xác nhận",
  children, // Cho phép custom render section
}) => {
  const [activeSection, setActiveSection] = useState(null);

  const handleMenuItemPress = (sectionIndex) => {
    setActiveSection(activeSection === sectionIndex ? null : sectionIndex);
  };

const selectImage = (type, field) => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
    selectionLimit: 0, // 👈 quan trọng
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel || response.errorCode) return;

    if (response.assets && response.assets.length > 0) {
      if (type === 'single') {
        // lấy 1 ảnh duy nhất
        onImageSelect(field, response.assets[0], type);
      } else if (type === 'multiple') {
        // gửi nguyên mảng ảnh
        onImageSelect(field, response.assets, type);
      }
    }
  });
};

  const removeImage = (field, index = null) => {
    onImageRemove(field, index);
  };

  // Render image upload component
  const renderImageUpload = (field, type = 'single', placeholder = 'Chọn ảnh') => {
    const fieldValue = formData[field];

    if (type === 'single') {
      return fieldValue ? (
        <View style={styles.imagePreviewContainer}>
          <Image
            source={{ uri: fieldValue.uri }}
            style={styles.imagePreview}
          />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={() => removeImage(field)}>
            <Icon name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => selectImage('single', field)}>
          <Icon name="photo-camera" size={40} color="#999" />
          <Text style={styles.uploadText}>{placeholder}</Text>
        </TouchableOpacity>
      );
    }

    // Multiple images
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.farmImagesContainer}>
          {(fieldValue || []).map((image, index) => (
            <View key={index} style={styles.farmImageContainer}>
              <Image
                source={{ uri: image.uri }}
                style={styles.farmImagePreview}
              />
              <TouchableOpacity
                style={styles.removeFarmImageButton}
                onPress={() => removeImage(field, index)}>
                <Icon name="close" size={16} color="#fff" />
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

  // Render input field
  const renderInput = (config) => {
    const {
      field,
      label,
      placeholder,
      keyboardType = 'default',
      multiline = false,
      numberOfLines = 1,
      editable = true
    } = config;

    return (
      <View style={styles.inputGroup}>
        {label && <Text style={styles.inputLabel}>{label}</Text>}
        <Input
          placeholder={placeholder}
          value={formData[field]}
          onChangeText={(text) => onInputChange(field, text)}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
        />
      </View>
    );
  };

  const isCompleted = (sectionIndex) => {
    if (menuItems[sectionIndex]?.isCompleted) {
      return menuItems[sectionIndex].isCompleted(formData);
    }
    return false;
  };

  return (
    <View style={styles.whiteBackground}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
                        style={{ marginRight: 8 }}
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
                    {/* Render custom content hoặc default fields */}
                    {item.renderContent ? 
                      item.renderContent({
                        formData,
                        onInputChange,
                        renderInput,
                        renderImageUpload,
                      }) : 
                      (
                        <View>
                          {item.fields?.map((fieldConfig, fieldIndex) => (
                            <View key={fieldIndex}>
                              {fieldConfig.type === 'input' && renderInput(fieldConfig)}
                              {fieldConfig.type === 'image' && renderImageUpload(
                                fieldConfig.field, 
                                fieldConfig.imageType, 
                                fieldConfig.placeholder
                              )}
                            </View>
                          ))}
                        </View>
                      )
                    }
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.submitContainer}>
          <Button.Main
            title={isSubmitting ? "Đang xử lý..." : submitButtonText}
            onPress={onSubmit}
            disabled={!isFormValid() || isSubmitting}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FormWizard;