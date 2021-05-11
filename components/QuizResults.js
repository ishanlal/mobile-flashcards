import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

export default class QuizResults extends React.Component {
// back to deck, individual deck view
// restart quiz, first page of quiz, clear stuff
  componentDidMount() {
    clearLocalNotification()
    .then(setLocalNotification)
  }
  render() {
    //const mark = ((correctCount / count) * 100).toFixed();
    return (
      <View>
        <Text>Quiz Results</Text>
      </View>
    )
  }
}
