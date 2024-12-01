import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import { editEvent } from '../../redux/slices/eventsSlice';
import styles from './styles';

export default function EditEventScreen({ route, navigation }) {
    const { event } = route.params;

    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [date, setDate] = useState(new Date(event.date));
    const [time, setTime] = useState(new Date(event.time));
    const [eventType, setEventType] = useState(event.type);
    const [maxAttendees, setMaxAttendees] = useState(event.maxAttendees?.toString());
    const [cost, setCost] = useState(event.cost?.toString());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(false);
        setTime(currentTime);
    };

    const handleSubmit = () => {
        if (!name || !description || !location || !eventType || !maxAttendees || !cost) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        setLoading(true);

        const updatedEvent = {
            name,
            description,
            location,
            date: date.toISOString(),
            time: time.toISOString(),
            type: eventType,
            maxAttendees: parseInt(maxAttendees, 10),
            cost: parseFloat(cost),
        };

        dispatch(editEvent({ id: event.id, updatedData: updatedEvent }))
            .unwrap()
            .then(() => {
                Alert.alert('Success', 'Event updated successfully!');
                navigation.goBack();
            })
            .catch((err) => {
                Alert.alert('Error', `Failed to update event: ${err}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Edit Event</Text>
            <TextInput
                style={styles.input}
                placeholder="Event Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                placeholderTextColor="#888"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                placeholderTextColor="#888"
                value={location}
                onChangeText={setLocation}
            />
            <Dropdown
                data={[
                    { label: 'Workshop', value: 'Workshop' },
                    { label: 'Seminar', value: 'Seminar' },
                    { label: 'Concert', value: 'Concert' },
                    { label: 'Party', value: 'Party' },
                ]}
                labelField="label"
                valueField="value"
                value={eventType}
                onChange={(item) => setEventType(item.value)}
                placeholder="Select Event Type"
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
            />
            <Dropdown
                data={[
                    { label: '10', value: '10' },
                    { label: '50', value: '50' },
                    { label: '100', value: '100' },
                    { label: '500', value: '500' },
                ]}
                labelField="label"
                valueField="value"
                value={maxAttendees}
                onChange={(item) => setMaxAttendees(item.value)}
                placeholder="Max Attendees"
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
            />
            <Dropdown
                data={[
                    { label: 'Free', value: '0' },
                    { label: '$10', value: '10' },
                    { label: '$50', value: '50' },
                    { label: '$100', value: '100' },
                ]}
                labelField="label"
                valueField="value"
                value={cost}
                onChange={(item) => setCost(item.value)}
                placeholder="Cost"
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dateButton}>
                    Select Date: {date.toDateString()}
                </Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text style={styles.dateButton}>
                    Select Time: {time.toLocaleTimeString()}
                </Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
            <TouchableOpacity
                style={[styles.submitButton, loading && { opacity: 0.7 }]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitButtonText}>Update Event</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}
