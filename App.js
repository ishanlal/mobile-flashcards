import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants';
import { white, purple } from './utils/colors'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Decks from './components/Decks'
import DeckView from './components/DeckView'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ color }) => {
            if (route.name === 'Decks') {
              return <Ionicons name='ios-bookmarks' size={30} color={color} />
            } else if (route.name === 'AddDeck') {
              return <FontAwesome name='plus-square' size={30} color={color} />
            }
          },
        })}
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}>
      <Tab.Screen
        name="Decks"
        component={Decks}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="AddDeck"
        component={AddDeck}
        options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <View style={{flex: 1}}>
          <Stack.Navigator>
            <Stack.Screen
              name="Decks"
              component={Tabs} />
            <Stack.Screen
                name="DeckView"
                component={DeckView}
                options={({ route }) => ({
                  headerTintColor: white,
                  headerStyle: {
                    backgroundColor: purple
                  },
                  title: route.params.entryId,
                  headerTitle: route.params.entryId
                })} />
            <Stack.Screen
                name="AddCard"
                component={AddCard}
                options={({ route }) => ({
                  headerTintColor: white,
                  headerStyle: {
                    backgroundColor: purple
                  },
                  title: route.params.entryId,
                  headerTitle: route.params.entryId
                })} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
