import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
      formGroup: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10 
      },
      groupField: {
        width: '100%',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      btn: {
        backgroundColor: '#242c40',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
      },
      btnText: {
        color: 'white',
        fontWeight: 'bold',
      }
});

export default styles;