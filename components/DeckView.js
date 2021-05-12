import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { white, purple } from '../utils/colors';
import { CommonActions } from '@react-navigation/native';
import { removeDeck, clearAnswerSelected } from '../utils/api'
import { remove_Deck , clear_Answer_Selected } from '../actions'
import AppLoading from 'expo-app-loading'

function AddCardBtn ({ onPress }) {
  return (
    <TouchableOpacity
    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
    onPress={onPress}>
      <Text style={styles.submitBtnText}>ADD CARD</Text>
    </TouchableOpacity>
  )
}

function StartQuizBtn ({ onPress }) {
  return (
    <TouchableOpacity
    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
    onPress={onPress}>
      <Text style={styles.submitBtnText}>START QUIZ</Text>
    </TouchableOpacity>
  )
}

function RemoveDeckBtn ({ onPress }) {
  return (
    <TouchableOpacity
    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
    onPress={onPress}>
      <Text style={styles.submitBtnText}>REMOVE DECK</Text>
    </TouchableOpacity>
  )
}

class DeckView extends React.Component {
  state = {
    ready: true
  }
  addCard = () => {
    this.props.navigation.navigate('AddCard', {entryId: this.props.deckInfo.title})
  }
  startQuiz = () => {
    clearAnswerSelected(this.props.deckInfo.title)
    this.props.dispatch(clear_Answer_Selected(this.props.deckInfo.title))
    this.props.navigation.navigate('CardView', {entryId: this.props.deckInfo.title, displayCount: 0})
  }
  removeDeck = () => {
    const { dispatch, deckInfo } = this.props
    this.setState(() => ({
      ready: false
    }))
    removeDeck(deckInfo.title)
    dispatch(remove_Deck(deckInfo.title))
    this.props.navigation.popToTop()
  }
  render() {
    const { ready } = this.state;
    if (ready === false) {
        return <AppLoading />
    }
    const { dispatch, deckInfo } = this.props
    return (
      <View style={styles.column}>
        <Text style={{fontSize: 20}}>{deckInfo.title}</Text>
        <Text style={{fontSize: 20}}>{deckInfo.questions.length} cards</Text>
        <AddCardBtn onPress={this.addCard} />
        <StartQuizBtn onPress={this.startQuiz} />
        <RemoveDeckBtn onPress={this.removeDeck} />
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
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  }
})

function mapStateToProps (state, { route }) {
  const { entryId } = route.params;
  return {
    deckInfo: state[entryId]
  }
}

export default connect(mapStateToProps)(DeckView);
