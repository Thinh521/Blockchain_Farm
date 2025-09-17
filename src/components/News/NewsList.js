import React from 'react';
import {FlatList} from 'react-native';
import styles from '../../screens/New/New.styles';
import NewsCard from './NewsCard';

const NewsList = ({data, expandedId, onToggleExpand, onOpenImageViewer}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <NewsCard
          item={item}
          isExpanded={expandedId === item._id}
          onToggleExpand={onToggleExpand}
          onOpenImageViewer={onOpenImageViewer}
        />
      )}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default NewsList;
