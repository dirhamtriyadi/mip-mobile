import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
      headContainer: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 5
      },
      listContainer: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 5
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
      statusVisit: {
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#17a2b8',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        color: '#fff',
      },
      statusPromiseToPay: {
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#ffc107',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        color: 'black',
      },
      statusPay: {
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#28a745',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        color: '#fff',
      },
      statusError: {
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#dc3545',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        color: '#fff',
      },
      // statusPending: {
      //   textAlign: 'center',
      //   borderRadius: 5,
      //   backgroundColor: '#ffc107',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   width: 70,
      //   color: 'black',
      // },
      // statusProcess: {
      //   textAlign: 'center',
      //   borderRadius: 5,
      //   backgroundColor: '#17a2b8',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   width: 70,
      //   color: '#fff',
      // },
      // statusSuccess: {
      //   textAlign: 'center',
      //   borderRadius: 5,
      //   backgroundColor: '#28a745',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   width: 70,
      //   color: '#fff',
      // },
      // statusCancel: {
      //   textAlign: 'center',
      //   borderRadius: 5,
      //   backgroundColor: '#dc3545',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   width: 70,
      //   color: '#fff',
      // },
      // statusError: {
      //   textAlign: 'center',
      //   borderRadius: 5,
      //   backgroundColor: '#dc3545',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   width: 70,
      //   color: '#fff',
      // },
});

export default styles;