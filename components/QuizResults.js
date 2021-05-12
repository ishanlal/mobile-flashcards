import React from 'react'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { white, purple } from '../utils/colors';
import { CommonActions } from '@react-navigation/native';
import { clearAnswerSelected } from '../utils/api'
import { clear_Answer_Selected } from '../actions'

function RestartQuizBtn ({ onPress }) {
  return (
    <TouchableOpacity
    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
    onPress={onPress}>
      <Text style={styles.submitBtnText}>RESTART QUIZ</Text>
    </TouchableOpacity>
  )
}

function BackToDeckBtn ({ onPress }) {
  return (
    <TouchableOpacity
    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
    onPress={onPress}>
      <Text style={styles.submitBtnText}>BACK TO DECK</Text>
    </TouchableOpacity>
  )
}

class QuizResults extends React.Component {
  restartQuiz = () => {
    clearAnswerSelected(this.props.deckInfo.title)
    this.props.dispatch(clear_Answer_Selected(this.props.deckInfo.title))
    this.props.navigation.navigate('CardView', {entryId: this.props.deckInfo.title, displayCount: 0})
  }
  backToDeck = () => {
    clearAnswerSelected(this.props.deckInfo.title)
    this.props.dispatch(clear_Answer_Selected(this.props.deckInfo.title))
    this.props.navigation.navigate('DeckView', {entryId: this.props.deckInfo.title})
  }
  componentDidMount() {
    clearLocalNotification()
    .then(setLocalNotification)
  }
  render() {
    const { dispatch, deckInfo } = this.props;
    const correct = deckInfo.answersSelected.filter((item) => item.ans === 'correct').length;
    const score = ((correct/deckInfo.questions.length)*100).toFixed();

    return (
      <View style={styles.column}>
        <Text style={{fontSize: 20}}>{deckInfo.title} QUIZ COMPLETE</Text>
        <Text style={{fontSize: 20}}>TOTAL QUESTIONS: {deckInfo.questions.length}</Text>
        <Text style={{fontSize: 20}}>CORRECT ANSWERS: {correct}</Text>
        <Text style={{fontSize: 20}}>YOUR SCRORE: {score}</Text>
        <RestartQuizBtn onPress={this.restartQuiz} />
        <BackToDeckBtn onPress={this.backToDeck} />
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

export default connect(mapStateToProps)(QuizResults);
