import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, Dimensions }
    from 'react-native';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Swiper from 'react-native-swiper';

const { height, width } = Dimensions.get('window');
const pic2 = require('../../components/images/pic2.jpg');
const pic1 = require('../../components/images/pic1.jpg');
export default class DetailPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: this.props.navigation.state.params.result_post,
            screen: this.props.navigation.state.params.back_history,
            type_screen: this.props.navigation.state.params.type_screen
        }
    }

    _handleContact() {
        this.props.navigation.navigate('Contact');
    }

    _gotoHome() {
        this.props.navigation.navigate(this.state.screen);
    }

    _savePoster() {
        fetch("http://spring-boot-wall-tags.herokuapp.com/adsharingspace/place/favorite?id_place=" + this.state.post.id, {
            "method": "PUT",
            headers: {
                'Authorization': 10000,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success === true) {
                    alert(`Đã lưu Poster`);
                } else {
                    alert(`Có lỗi xảy ra!`);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _removePosterSaved(){
        fetch("http://spring-boot-wall-tags.herokuapp.com/adsharingspace/place/favorite?id_place=" + this.state.post.id, {
            "method": "DELETE",
            headers: {
                'Authorization': 10000,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success === true) {
                    alert(`Đã xoá Poster`);
                    this._gotoHome();
                } else {
                    alert(`Có lỗi xảy ra!`);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        console.log(this.state);

        const detailFromSaved = (
            <View style={styles.btnWrapperStyle}>
                <TouchableOpacity style={styles.btnSaveStyle} onPress={this._removePosterSaved.bind(this)}>
                    <View>
                        <Text style={{ color: '#212121', fontFamily: 'Regular', fontSize: 14, fontWeight: 'bold' }}>Bỏ lưu</Text>
                    </View>
                </TouchableOpacity>
                <View></View>
                <TouchableOpacity style={styles.btnContactStyle} onPress={this._handleContact.bind(this)}>
                    <View>
                        <Text style={{ color: '#FFF', fontFamily: 'Regular', fontSize: 14, fontWeight: 'bold' }}>Liên hệ</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );

        const detailFromMain = (
            <View style={styles.btnWrapperStyle}>
                <TouchableOpacity style={styles.btnSaveStyle} onPress={this._savePoster.bind(this)}>
                    <View>
                        <Text style={{ color: '#212121', fontFamily: 'Regular', fontSize: 14, fontWeight: 'bold' }}>Lưu</Text>
                    </View>
                </TouchableOpacity>
                <View></View>
                <TouchableOpacity style={styles.btnContactStyle} onPress={this._handleContact.bind(this)}>
                    <View>
                        <Text style={{ color: '#FFF', fontFamily: 'Regular', fontSize: 14, fontWeight: 'bold' }}>Liên hệ</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );

        const detailSelected = this.state.type_screen === 0 ? detailFromMain: detailFromSaved;

        return (
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this._gotoHome.bind(this)}>
                        <Icon name="chevron-left" size={20} color="white" />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.titleHeaderStyle}>Thông tin chi tiết</Text>
                    </View>
                    <View></View>
                </View>

                <View style={styles.wrapper}>
                    <View style={{ flex: 1 }}>
                        <Swiper showsButtons scrollEnabled={false}>
                            <View>
                                <Image source={{ uri: this.state.post.imageUrl }} style={styles.imageStyle} />
                            </View>
                            <View>
                                <Image source={{ uri: this.state.post.imageUrl }} style={styles.imageStyle} />
                            </View>
                            <View>
                                <Image source={{ uri: this.state.post.imageUrl }} style={styles.imageStyle} />
                            </View>
                        </Swiper>
                    </View>
                </View>

                <View style={{ marginLeft: 10, marginTop: 10 }}>
                    <Text style={{ fontFamily: 'Regular', fontSize: 16, fontWeight: 'bold' }}>THÔNG TIN CHI TIẾT</Text>
                </View>

                <View style={styles.wrapperInfo}>
                    <Text style={styles.textStyle}>{this.state.post.posterType[0].type}</Text>
                </View>

                <View style={styles.wrapperInfo}>
                    <Text style={styles.textStyle}>{this.state.post.wallType[0].type}</Text>
                </View>

                <View style={styles.wrapperInfo}>
                    <Text style={styles.textStyle}>Kích thước: {this.state.post.width * this.state.post.height}m2</Text>
                </View>

                <Text style={{ textAlign: 'right', marginRight: 10, fontFamily: 'Regular', fontStyle: 'italic' }}>Tổng phí</Text>
                <Text style={styles.textPriceStyle}>{this.state.post.price.text} {this.state.post.price.unit}</Text>
                {detailSelected}

            </View>
        );
    }
}

const widthImg = width - 30;
const heightImg = (widthImg * 300) / 500;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BDBDBD',
        justifyContent: 'space-between'
    },
    headerStyle: {
        padding: 10,
        height: height / 13,
        backgroundColor: '#F44336',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleHeaderStyle: {
        fontFamily: 'Regular',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    imageStyle: {
        height: heightImg,
        width: widthImg,
    },
    wrapper: {
        height: height * 0.31,
        backgroundColor: '#FFF',
        margin: 10,
        shadowColor: '#212121',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        padding: 5
    },
    btnWrapperStyle: {
        height: height / 13,
        margin: 20,
        shadowColor: '#212121',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        padding: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    wrapperInfo: {
        backgroundColor: '#FFF',
        margin: 10,
        marginTop: 0,
        shadowColor: '#212121',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        padding: 5
    },
    titleStyle: {
        fontFamily: 'Regular',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121'
    },
    textStyle: {
        fontFamily: 'Regular',
        fontStyle: 'italic',
        fontSize: 14,
        fontWeight: 'bold'
    },
    textPriceStyle: {
        textAlign: 'right',
        marginRight: 10,
        fontFamily: 'Regular',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#F44336'
    },
    btnSaveStyle: {
        width: width / 3,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#212121',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContactStyle: {
        width: width / 3,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});