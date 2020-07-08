import React, { Component } from 'react';
import { View, Platform, Text, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItems, DrawerContentScrollView } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

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

import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

function MenuNavigatorScreen(props) {
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
                options={{
                    headerTitle: "Menu",
                    headerLeft: () => (
                        <Icon name="menu" size={24}
                            color='white'
                            onPress={() => props.navigation.openDrawer()} />
                    ),
                }}
            />

            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{
                    headerTitle: "Dish Detail",
                }}
            />

        </MenuNavigator.Navigator>
    );
}

function HomeNavigatorScreen(props) {
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
                options={{
                    headerTitle: "Home",
                    headerLeft: () => (
                        <Icon name="menu" size={24}
                            style={{ paddingLeft: -10 }}
                            color='white'
                            onPress={() => props.navigation.openDrawer()} />
                    ),
                }}
            />
        </HomeNavigator.Navigator>
    );
}

function ContactNavigatorScreen(props) {
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
                options={{
                    headerTitle: "Contact Us",
                    headerLeft: () => (
                        <Icon name="menu" size={24}
                            color='white'
                            onPress={() => props.navigation.openDrawer()} />
                    ),
                }}
            />
        </ContactNavigator.Navigator>
    );
}

function AboutNavigatorScreen(props) {
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
                options={{
                    headerTitle: "About Us",
                    headerLeft: () => (
                        <Icon name="menu" size={24}
                            color='white'
                            onPress={() => props.navigation.openDrawer()} />
                    ),
                }}
            />
        </AboutNavigator.Navigator>
    );
}
const CustomDrawerContentComponent = () => (
    <DrawerContentScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            {/* <DrawerItems  /> */}
        </SafeAreaView>
    </DrawerContentScrollView>
);

function MainNavigatorScreen(props) {

    return (
        <MainNavigator.Navigator
            // drawerContent={() => <CustomDrawerContentComponent />}
            drawerContentOptions={{
                activeTintColor: '#007AFF',
            }}
        >

            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{
                    title: 'Home',
                    drawerLabel: 'Home',
                    drawerIcon: () => (<Icon name="home" type="font-awesome" size={24} color='#007AFF' />)
                }}
            />

            <MainNavigator.Screen
                name="AboutUs"
                component={AboutNavigatorScreen}
                options={{
                    title: "About Us",
                    drawerLabel: 'About Us',
                    drawerIcon: () => (<Icon name="info-circle" type="font-awesome" size={24} color='#007AFF' />)
                }}
            />

            <MainNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{
                    title: "Menu",
                    drawerLabel: 'Menu',
                    drawerIcon: () => (<Icon name="list" type="font-awesome" size={24} color='#007AFF' />)
                }}
            />

            <MainNavigator.Screen
                name="ContactUs"
                component={ContactNavigatorScreen}
                options={{
                    title: "Contact Us",
                    drawerLabel: 'Contact Us',
                    drawerIcon: () => (<Icon name="address-card" type="font-awesome" size={24} color='#007AFF' />)
                }}
            />

        </MainNavigator.Navigator>
    );
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {

        return (
            <NavigationContainer>
                <MainNavigatorScreen />
            </NavigationContainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);