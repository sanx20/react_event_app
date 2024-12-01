import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '../../redux/slices/eventsSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const { allEvents, loading, error } = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchAllEvents());
    }, [dispatch]);

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

    const renderEvent = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetail', { event: item })}
        >
            <Image source={getEventImage(item.type)} style={styles.eventImage} />
            <View style={styles.cardContent}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventDate}>
                    <Icon name="calendar-outline" size={16} /> {new Date(item.date).toDateString()}
                </Text>
                <Text style={styles.eventTime}>
                    <Icon name="time-outline" size={16} /> {new Date(item.time).toLocaleTimeString()}
                </Text>
                <Text style={styles.eventLocation}>
                    <Icon name="location-outline" size={16} /> {item.location}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={allEvents}
                renderItem={renderEvent}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}
