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
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../redux/slices/eventsSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';

export default function CreateEventScreen() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [eventType, setEventType] = useState(null);
    const [maxAttendees, setMaxAttendees] = useState(null);
    const [cost, setCost] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.events);

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

    const handleSubmit = async () => {
        if (!name || !description || !location || !eventType || !maxAttendees || !cost) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        const newEvent = {
            name,
            description,
            location,
            date: date.toISOString(),
            time: time.toISOString(),
            type: eventType,
            maxAttendees: parseInt(maxAttendees, 10),
            cost: parseFloat(cost),
        };

        dispatch(addEvent(newEvent))
            .unwrap()
            .then(() => {
                Alert.alert('Success', 'Event created successfully!');
                setName('');
                setDescription('');
                setLocation('');
                setDate(new Date());
                setTime(new Date());
                setEventType(null);
                setMaxAttendees(null);
                setCost(null);
            })
            .catch((err) => {
                Alert.alert('Error', `Failed to create event: ${err.message}`);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Create Event</Text>
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
                    <Text style={styles.submitButtonText}>Create Event</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}
