import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  text: {
    textAlign: 'center',
    fontSize: FontSizes.regular,
    marginBottom: scale(20),
    lineHeight: scale(18),
    paddingHorizontal: scale(40),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(40),
    marginBottom: scale(80),
  },
  header: {
    position: 'absolute',
    top: scale(60),
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(22),
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(4),
  },
  subtitle: {
    color: Colors.white,
    fontSize: FontSizes.small,
    marginBottom: scale(60),
  },
  frame: {
    width: scale(280),
    height: scale(280),
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: scale(44),
    height: scale(44),
    borderColor: 'rgba(255,255,255,0.5)',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 8,
    borderTopWidth: 8,
    borderTopLeftRadius: scale(18),
  },
  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderTopRightRadius: scale(18),
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 8,
    borderBottomWidth: 8,
    borderBottomLeftRadius: scale(18),
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderBottomRightRadius: scale(18),
  },
  footer: {
    position: 'absolute',
    bottom: scale(40),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    marginTop: scale(4),
    color: Colors.white,
    fontSize: FontSizes.small,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    padding: scale(16),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: scale(20),
  },
  modalContentWrapper: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    fontSize: FontSizes.small,
    textAlign: 'center',
    color: Colors.gray,
    marginBottom: scale(20),
    lineHeight: scale(18),
  },
  copyButton: {
    paddingHorizontal: scale(24),
  },
});
