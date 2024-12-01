import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import HomeScreen from './src/screens/home/HomeScreen';
import CreateEventScreen from './src/screens/create_event/CreateEventScreen';
import FavouritesScreen from './src/screens/favourites/FavouritesScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import EventDetailScreen from './src/screens/event_detail/EventDetailScreen';
import EditEventScreen from './src/screens/edit_event/EditEventScreen';
import AuthScreen from './src/screens/auth/AuthScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Favourites') iconName = 'heart-outline';
          if (route.name === 'CreateEvent') iconName = 'add-circle-outline';
          if (route.name === 'Profile') iconName = 'person-circle-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00A9A5',
        tabBarInactiveTintColor: '#3A506B',
        tabBarStyle: {
          backgroundColor: '#E3FDFD',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: '#00A9A5' },
          headerTitle: 'Home',
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          headerStyle: { backgroundColor: '#FFD166' },
          headerTitle: 'Favorites',
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        }}
      />
      <Tab.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          headerStyle: { backgroundColor: '#FFB6B9' },
          headerTitle: 'Create Event',
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: '#3A506B' },
          headerTitle: 'Profile',
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD166" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Main' : 'Auth'}>
        {user ? (
          <>
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventDetail"
              component={EventDetailScreen}
              options={{
                headerStyle: { backgroundColor: '#FFB6B9' },
                headerTitle: 'Event Detail',
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
              }}
            />
            <Stack.Screen
              name="EditEvent"
              component={EditEventScreen}
              options={{
                headerTitle: 'Edit Event',
                headerStyle: { backgroundColor: '#00A9A5' },
                headerTintColor: '#fff',
              }}
            />

          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithProvider;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3FDFD',
  },
});
