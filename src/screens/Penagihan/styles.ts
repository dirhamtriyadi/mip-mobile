import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
      headContainer: {
        width: '90%',
        marginHorizontal: '5%',
      },
      listContainer: {
        width: '90%',
        marginHorizontal: '5%',
      },
      groupField: {
        width: '100%',
      },
      btn: {
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // height: 50,
        margin: 3,
        // padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      groupSearch: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        // marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      textKontrak: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '80%',
      },
      textDate: {
        fontSize: 12,
        color: '#888',
      },
      destinationVisit: {
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        color: '#fff',
      },
      destinationPromise: {
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        color: 'black',
      },
      destinationPay: {
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        color: '#fff',
      },
});

export default styles;