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
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    eventLocation: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    eventDate: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
    eventTime: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    iconButton: {
        marginLeft: 10,
    },
});
