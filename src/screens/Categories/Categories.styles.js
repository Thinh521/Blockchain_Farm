import { StyleSheet, Dimensions } from 'react-native';
import { scale } from '../../utils/scaling';

const styles = StyleSheet.create({
  // Container chính
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#059669',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: -2,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },

  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0E9F58',
    lineHeight: 20,
  },
  
  content: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    fontWeight: '500',
  },
  
  list: {
    padding: 15,
    paddingBottom: 30,
  },
  
  row: {
    justifyContent: 'space-between',
  },
  
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },

  productImageWrapper: {
    width: '100%',
  },
  
  imageContainer: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  
  productImage: {
    width: '100%',
    height: '100%',
  },

  productFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 50,
  },

  productNameWrapper: {
    flex: 1,
    marginRight: 8,
  },
  
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2E',
    lineHeight: 18,
    textAlign: 'left',
  },

  processButton: {
    backgroundColor: '#0E9F58',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },

  processButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default styles;