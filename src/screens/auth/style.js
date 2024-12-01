import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3FDFD',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 30,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFB6B9',
    },
    header: {
        fontSize: 28,
        fontWeight: '600',
        color: '#00A9A5',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 48,
        borderColor: '#FFD166',
        borderWidth: 1.5,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#3A506B',
        backgroundColor: '#FEFEFE',
    },
    buttonContainer: {
        width: '90%',
        marginVertical: 10,
        backgroundColor: '#00A9A5',
        borderRadius: 6,
    },
    button: {
        padding: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 16,
    },
    toggleText: {
        color: '#FFB6B9',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
    },
});
