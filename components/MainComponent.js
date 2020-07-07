import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactComponent';
import AboutUs from './AboutComponent';

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const ContactNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();

function MenuNavigatorScreen() {
    return (
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail" }}
            />

        </MenuNavigator.Navigator>
    );
}

function HomeNavigatorScreen() {
    return (
        <HomeNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
            />
        </HomeNavigator.Navigator>
    );
}

function ContactNavigatorScreen() {
    return (
        <ContactNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <ContactNavigator.Screen
                name="Contact Us"
                component={ContactUs}
            />
        </ContactNavigator.Navigator>
    );
}

function AboutNavigatorScreen() {
    return (
        <AboutNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <AboutNavigator.Screen
                name="About Us"
                component={AboutUs}
            />
        </AboutNavigator.Navigator>
    );
}

function MainNavigatorScreen() {
    return (
        <MainNavigator.Navigator>

            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{
                    title: 'Home',
                    drawerLabel: 'Home'
                }}
            />

            <MainNavigator.Screen
                name="AboutUs"
                component={AboutNavigatorScreen}
                options={{
                    title: "About Us",
                    drawerLabel: 'About Us'
                }}
            />

            <MainNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{
                    title: "Menu",
                    drawerLabel: 'Menu'
                }}
            />

            <MainNavigator.Screen
                name="ContactUs"
                component={ContactNavigatorScreen}
                options={{
                    title: "Contact Us",
                    drawerLabel: 'Contact Us'
                }}
            />

        </MainNavigator.Navigator>
    );
}

class Main extends Component {

    render() {

        return (
            <NavigationContainer>
                <MainNavigatorScreen />
            </NavigationContainer>
        );
    }
}

export default Main;