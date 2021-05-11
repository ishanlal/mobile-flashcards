import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { fetchFlashCardResults, getDecks, getDeck, saveDeckTitle, addCardToDeck, removeDeck } from '../utils/api'
import { white, purple } from '../utils/colors'
import { save_Deck_Title } from '../actions'
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux'

class AddDeck extends React.Component {
  state = {
    query: '',
  }
  onChangeText = (text) => {
    this.setState( () => ( {query: text} ) )
  }
  onPress = () => {
    const {dispatch} = this.props
    saveDeckTitle(this.state.query)
    dispatch(save_Deck_Title(this.state.query))
    this.props.navigation.dispatch(CommonActions.goBack())
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>What is the title of your new deck?</Text>
        <TextInput
        style={styles.input}
        placeholder="Deck Title!"
        onChangeText={this.onChangeText}
        value={this.state.query}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={{fontSize: 20}}>SUBMIT</Text>
        </TouchableOpacity>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default connect()(AddDeck);
