import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3FDFD',
    },
    eventImage: {
        width: '100%',
        height: 250,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    details: {
        padding: 16,
        backgroundColor: '#E3FDFD',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    heartIcon: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
});
