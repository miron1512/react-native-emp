import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderWidth: 2,
    borderColor: '#D8DCDE',
    padding: 10,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginLeft: 40,
    marginBottom: 30,
    alignItems: 'flex-start',
    width: '60%',
  },
  productName: {
    fontFamily: 'vincHand',
    fontSize: 50,
    marginLeft: 20,
  },
  productDescription: {
    marginBottom: 30,
  },
});

export default styles;
