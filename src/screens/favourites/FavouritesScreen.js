import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFavourites, toggleFavourite } from '../../redux/slices/eventsSlice';
import styles from './styles';

export default function FavouritesScreen({ navigation }) {
    const { allEvents, userFavourites } = useSelector((state) => state.events);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserFavourites());
    }, [dispatch]);

    const favouriteEvents = allEvents.filter((event) => userFavourites.includes(event.id));

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

    const renderFavourite = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EventDetail', { event: item })}
        >
            <Image source={getEventImage(item.type)} style={styles.eventImage} />
            <View style={styles.cardContent}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventLocation}>
                    <Icon name="location-outline" size={16} /> {item.location}
                </Text>
                <Text style={styles.eventDate}>
                    <Icon name="calendar-outline" size={16} /> {new Date(item.date).toDateString()}
                </Text>
                <Text style={styles.eventTime}>
                    <Icon name="time-outline" size={16} /> {new Date(item.time).toLocaleTimeString()}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => dispatch(toggleFavourite(item.id))}
            >
                <Icon name="heart" size={24} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favouriteEvents}
                renderItem={renderFavourite}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}
