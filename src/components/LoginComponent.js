import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import AfterLoginComponent from './AfterLoginScreen';

export default class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            asteroidId: '',
            responseData: null
        }
    }

    random4DigitNumberNotStartingWithZero() {
        var digits = "123456789".split(''),
            first = this.shuffle(digits).pop();
        digits.push('0');
        return parseInt(first + this.shuffle(digits).join('').substring(0, 3), 10);
    }

    shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    onChangeText = (text) => {
        this.setState(state => {
            asteroidId: text
        })
    }
    logs = (response) => {

    }
    onSubmit = (asteroidId) => {
        if (asteroidId) {
            fetch("https://api.nasa.gov/neo/rest/v1/neo/" + asteroidId + "?api_key=iGCutWIJZm7SRCsdq715lyrEgp3CaUJYDxJc7q69",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Connection': 'keep-alive'
                    },
                    method: "GET",
                    credentials: 'same-origin',
                }
            )
                .then(response => {
                    return response['status'] == 200 ? response.json() : response
                })
                .then(response => {
                    if ((response.status = 200)) {
                        this.setState({
                            responseData: response
                        }, () => this.logs(response))
                    }
                }).catch(error => {
                })
        }
    }
    getRandomAstroidId = () => {
        fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
            .then(response => {
                if (response.status == 200) {
                    let randomNumber = this.random4DigitNumberNotStartingWithZero()
                    this.onSubmit(randomNumber);
                }
            }).catch(error => {
            })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        {
                            this.state.responseData == null
                                ? <Title>Login</Title>
                                : <Title>Asteroid Into</Title>
                        }
                    </Body>
                    <Right />
                </Header>
                {
                    this.state.responseData == null
                        ?
                        <Content>
                            <TextInput
                                placeholder={"Enter Asteroid ID"}
                                onChangeText={(text) => this.setState({ asteroidId: text })}
                                value={this.state.asteroidId}
                            />
                            <Button onPress={() => this.onSubmit(this.state.asteroidId)}>
                                <Text>Submit</Text>
                            </Button>
                            <Button onPress={() => this.getRandomAstroidId()}>
                                <Text>Random Asteroid</Text>
                            </Button>
                        </Content>
                        : <Content>
                            {
                                <AfterLoginComponent
                                    data={this.state.responseData}
                                />
                            }
                        </Content>
                }

            </Container>
        )
    }
}