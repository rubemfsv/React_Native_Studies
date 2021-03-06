import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

function RenderDish(props) {

    const dish = props.dish;

    const handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -200)
            return true;
        else
            return false;
    }

    const recognizeRightDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx > 200)
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then(endState =>
                    console.log(endState.finished ? 'finished' : 'cancelled')
                );
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'OK', onPress: () => { props.favorite ? console.log('Already favorite') : props.onPress() } },
                    ],
                    { cancelable: false }
                );

                return true;
            } else if (recognizeRightDrag(gestureState)) {
                { props.showModal ? console.log('Already opened') : props.onPressModal() }
            }
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        })
    }

    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}>
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={styles.formRow}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type="font-awesome"
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already Favorite') : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type="font-awesome"
                            color='#512DA8'
                            onPressModal={() => props.showModal ? console.log('Already opened') : props.onPressModal()}
                        />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            style={styles.cardItem}
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const RenderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>
                    {item.comment}
                </Text>
                <Text style={{ fontSize: 12 }}>
                    <Rating startingValue={item.rating} />
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {'--' + item.author + ', ' + item.date}
                </Text>
            </View>
        );
    }

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={RenderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            showModal: false
        });
    }

    handleForm() {
        console.log(JSON.stringify(this.state));
        props.postComment(dish.id, state.rating, state.author, state.comment);
        this.resetForm();
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    onPressModal={() => this.toggleModal(showModal)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />


                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.formRow}>
                        <Rating showRating startingValue="{0}" />
                    </View>

                    <View style={styles.formRow}>
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            value={this.state.author}
                            onValueChange={(value) => this.setState({ author: value })}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comments' }}
                            value={this.state.comment}
                            onValueChange={(value) => this.setState({ comment: value })}
                        />
                    </View>

                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleForm()}
                            title="Submit"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>

                    <View style={styles.formRow}>
                        <Button
                            onPress={() => { this.toggleModal(); this.resetForm(); }}
                            title="Cancel"
                            color='gray'
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Modal>

            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);