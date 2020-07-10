import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Picker, Switch } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

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

    if (dish != null) {
        return (
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
                </View>
            </Card>
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
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={RenderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
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