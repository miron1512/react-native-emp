import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    backgroundColor: '#D8DCDE',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
  },
  content: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
});

export default styles;
