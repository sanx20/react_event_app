import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../../redux/slices/eventsSlice';
import styles from './styles';

export default function EventDetailScreen({ route }) {
    const { event } = route.params;
    const dispatch = useDispatch();
    const { userFavourites } = useSelector((state) => state.events);

    const isFavourite = userFavourites.includes(event.id);

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

    const handleToggleFavourite = () => {
        dispatch(toggleFavourite(event.id));
    };

    return (
        <View style={styles.container}>
            <Image source={getEventImage(event.type)} style={styles.eventImage} />
            <View style={styles.details}>
                <Text style={styles.title}>{event.name}</Text>
                <Text style={styles.text}>
                    <Icon name="calendar-outline" size={16} /> {new Date(event.date).toDateString()}
                </Text>
                <Text style={styles.text}>
                    <Icon name="time-outline" size={16} /> {new Date(event.time).toLocaleTimeString()}
                </Text>
                <Text style={styles.text}>
                    <Icon name="location-outline" size={16} /> {event.location}
                </Text>
                <Text style={styles.text}>
                    <Icon name="information-circle-outline" size={16} /> {event.description}
                </Text>
                <Icon
                    name={isFavourite ? 'heart' : 'heart-outline'}
                    size={30}
                    color={isFavourite ? 'red' : 'gray'}
                    onPress={handleToggleFavourite}
                    style={styles.heartIcon}
                />
            </View>
        </View>
    );
}
