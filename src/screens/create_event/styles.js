import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#E3FDFD',
        flexGrow: 1,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#00A9A5',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#00A9A5',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    dropdown: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#00A9A5',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    dateButton: {
        color: '#00A9A5',
        fontWeight: '500',
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#00A9A5',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
