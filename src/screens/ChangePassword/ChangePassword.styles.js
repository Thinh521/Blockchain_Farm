import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: scale(26),
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: scale(16),
  },
  iconBackground: {
    width: scale(70),
    height: scale(70),
    borderRadius: 9999,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
    textAlign: 'center',
    marginBottom: scale(8),
  },
  description: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: scale(30),
    paddingHorizontal: scale(20),
    lineHeight: scale(18),
    fontStyle: 'italic',
  },
  inputSection: {
    marginBottom: scale(20),
  },
  requirementsContainer: {
    marginBottom: scale(20),
  },
  requirementsList: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: scale(16),
    borderWidth: 1,
    borderColor: Colors.border_2,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: 999,
    backgroundColor: Colors.primary,
    marginRight: scale(12),
  },
  requirementText: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  requirementTextMet: {
    color: '#4CAF50',
    fontWeight: FontWeights.semiBold,
  },
  requirementDotMet: {
    backgroundColor: '#4CAF50',
  },
});
