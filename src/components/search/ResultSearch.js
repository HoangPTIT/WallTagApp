import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity, SafeAreaView }
    from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const { height, width } = Dimensions.get('window');
const img_height = height * 0.2;
const img_width = (img_height * 500) / 300;
const pic2 = require('../../components/images/pic2.jpg');

//TODO: Crop anh.
class ItemPoster extends React.Component {
    _gotoDetail() {
        const { navigation } = this.props;
        const { item } = this.props;
        navigation.navigate('DetailPost', {
            result_post: item,
            back_history: "ResultSearch"
        });
    }

    render() {
        const {item} = this.props;
        return (
            <View>
                <TouchableOpacity onPress={this._gotoDetail.bind(this)}>
                    <View style={styles.item_wrapper}>
                        <View style={{ backgroundColor: 'red', flex: 2 }}>
                            {/* <Image source={pic2} style={{width: img_width, height: img_height}}/> */}
                        </View>
                        <View style={{ flex: 3, marginLeft: 10, padding: 10 }}>
                            <Text style={styles.item_textStyle}>{item.wallType}</Text>
                            <Text style={styles.item_textStyle}>{item.posterType}</Text>
                            <Text style={styles.item_textStyle}>{item.width * item.height}</Text>
                            <Text style={styles.item_price}>{item.price.text}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default class ResultSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search_style: this.props.navigation.state.params.input_search,
            poster_list: []
        };
    }

    componentDidMount(){
        fetch("http://spring-boot-wall-tags.herokuapp.com/adsharingspace/place/search?" + this.state.search_style, {
            "method": "GET",
            headers: {
                'Authorization': 10000,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.success === true) {
                this.setState({ poster_list: responseJson.data });
                console.log(this.state.poster_list.length);
            } else {
                alert(`Type poster is empty`);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    _handleBack(){
        this.props.navigation.navigate('Location');
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity onPress={this._handleBack.bind(this)}>
                        <Icon name="long-arrow-left" size={25} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.titleStyle}>Kết quả tìm kiếm</Text>
                    <View />
                </View>

                <View style={{ backgroundColor: '#FFF', height: 48, margin: 5, justifyContent: 'center', paddingLeft: 10 }}>
                    <Text style={styles.textStyle}>{this.state.poster_list.length} kết quả</Text>
                </View>

                <View style={{ margin: 5, marginTop: 0 }}>
                    <FlatList
                        data={this.state.poster_list}
                        renderItem={({ item, index }) => {
                            return (
                                <ItemPoster
                                    item={item}
                                    navigation={navigation}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => `${item.id}`}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CFD8DC',
    },
    item_wrapper: {
        marginBottom: 5,
        height: height * 0.2,
        flexDirection: 'row',
        backgroundColor: '#FFF',
    },
    headerStyle: {
        padding: 10,
        height: height / 13,
        backgroundColor: '#F44336',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    titleStyle: {
        fontFamily: 'Regular',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    textStyle: {
        fontFamily: 'Regular',
        fontSize: 16,
        fontStyle: 'italic'
    },
    item_textStyle: {
        height: (height * 0.2) / 4,
        justifyContent: 'center'
    },
    item_price: {
        height: (height * 0.2) / 4,
        justifyContent: 'center',
        color: '#FF3D00'
    }
});