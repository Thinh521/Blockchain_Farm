import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  menuScrollView: {
    flex: 1,
    padding: scale(20),
  },
  menuContainer: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  menuItemContainer: {
    marginBottom: scale(16),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: scale(16),
    borderWidth: 1,
    borderColor: Colors.border_2,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: scale(46),
    height: scale(46),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(14),
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    marginBottom: scale(2),
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  menuDescription: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },
  bottomDisconnectButton: {
    marginTop: scale(40),
    width: '60%',
    marginInline: 'auto',
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  bottomDisconnectText: {
    color: '#dc2626',
  },
});
