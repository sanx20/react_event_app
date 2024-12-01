import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent } from '../../redux/slices/eventsSlice';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import styles from './styles';

export default function ProfileScreen({ navigation }) {
    const { myEvents } = useSelector((state) => state.events);
    const dispatch = useDispatch();

    const handleLogout = () => {
        FIREBASE_AUTH.signOut();
    };

    const getEventImage = (type) => {
        switch (type) {
            case 'Workshop':
                return require('../../../assets/images/workshop.png');
            case 'Seminar':
                return require('../../../assets/images/seminar.png');
            case 'Concert':
                return require('../../../assets/images/concert.png');
            case 'Party':
                return require('../../../assets/images/party.png');
            default:
                return require('../../../assets/images/default.png');
        }
    };

    const renderMyEvent = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EditEvent', { event: item })}
        >
            <Image source={getEventImage(item.type)} style={styles.eventImage} />
            <View style={styles.cardContent}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventDate}>
                    <Icon name="calendar-outline" size={16} /> {new Date(item.date).toDateString()}
                </Text>
                <Text style={styles.eventLocation}>
                    <Icon name="location-outline" size={16} /> {item.location}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => dispatch(deleteEvent(item.id))}
            >
                <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={myEvents}
                keyExtractor={(item) => item.id}
                renderItem={renderMyEvent}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
