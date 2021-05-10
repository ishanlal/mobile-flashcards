import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { receive_Decks } from '../actions'
import { fetchFlashCardResults, getDecks, getDeck, saveDeckTitle, addCardToDeck, removeDeck } from '../utils/api'
import { white, purple } from '../utils/colors'
import TextButton from './TextButton'
import AppLoading from 'expo-app-loading'

class Decks extends Component {
  state = {
    ready: false
  }
  componentDidMount() {
    const { dispatch } = this.props
    fetchFlashCardResults()
    .then((decks) => dispatch(receive_Decks(decks)))
    .then(() => this.setState(() => ({
      ready: true
    })))
  }
  render() {
    const { ready } = this.state;
    if (ready === false) {
        return <AppLoading />
    }
    const { state } = this.props;
    return (
      <View style={styles.container}>
      {
        Object.keys(state).map((key) => {
          const { title, questions } = state[key]
          return (
            <View key={key} style={styles.column}>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('DeckView', {entryId: title}) }>
              <Text style={{fontSize: 20}}>{title}</Text>
              <Text style={{fontSize: 20}}>{questions.length} cards</Text>
            </TouchableOpacity>
            </View>
          )
        })
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  }
})

function mapStateToProps (state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(Decks);
