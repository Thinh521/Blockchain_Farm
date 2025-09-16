import {Dimensions, StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors} from '../../theme/theme';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  connectContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  floatingIcon1: {
    position: 'absolute',
    top: height * 0.15,
    left: 40,
  },
  floatingIcon2: {
    position: 'absolute',
    top: height * 0.25,
    right: 60,
  },
  floatingIcon3: {
    position: 'absolute',
    bottom: height * 0.1,
    left: 60,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: scale(20),
    backgroundColor: Colors.green,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: scale(2),
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: scale(20),
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 64,
  },
  menuScrollView: {
    flex: 1,
    padding: 20,
  },
  menuContainer: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  menuItemContainer: {
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
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
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#6b7280',
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
