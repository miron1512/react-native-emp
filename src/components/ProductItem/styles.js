import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8DCDE',
  },
  productIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 15,
  },
  productName: {
    fontFamily: 'vincHand',
    fontSize: 30,
    flexGrow: 1,
  },
  nextIcon: {
    width: 20,
    height: 20,
    marginLeft: 15,
    marginRight: 10,
  }
});

export default styles;
