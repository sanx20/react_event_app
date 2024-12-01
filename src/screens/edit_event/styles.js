import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f9fa',
        flexGrow: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00A9A5',
        marginBottom: 20,
        textAlign: 'center',
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
        borderWidth: 1,
        borderColor: '#00A9A5',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#333',
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
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
