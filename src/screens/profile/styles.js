import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3FDFD',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    eventImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
        marginRight: 10,
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    eventDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    eventLocation: {
        fontSize: 14,
        color: '#777',
    },
    deleteButton: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
    logoutButton: {
        backgroundColor: '#00A9A5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 16,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
