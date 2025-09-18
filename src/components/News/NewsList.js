import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import NewsCard from './NewsCard';
import {scale} from '../../utils/scaling';

const NewsList = ({
  data,
  expandedId,
  onToggleExpand,
  onOpenImageViewer,
  onDelete,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <NewsCard
          item={item}
          isExpanded={expandedId === item._id}
          onToggleExpand={onToggleExpand}
          onOpenImageViewer={onOpenImageViewer}
          onDelete={onDelete}
        />
      )}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default NewsList;

const styles = StyleSheet.create({
  listContainer: {
    padding: scale(20),
    paddingBottom: scale(100),
  },
});
