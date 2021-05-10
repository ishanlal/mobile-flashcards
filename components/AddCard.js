import React from 'react'
import { Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { white, purple } from '../utils/colors';
import { add_Card_To_Deck } from '../actions'
import { addCardToDeck } from '../utils/api'
import { CommonActions } from '@react-navigation/native';

class AddCard extends React.Component {
  state = {
    question: '',
    answer: ''
  }
  onQuesChange = (text) => {
    this.setState(() => ({question: text}))
  }
  onAnsChange = (text) => {
    this.setState(() => ({answer: text}))
  }
  onPress = () => {
    const { dispatch, title } = this.props
    const { question, answer } = this.state
    addCardToDeck(title, {question, answer})
    .then(() => dispatch(add_Card_To_Deck(title, {question, answer})))
    .then(() => {
      this.props.navigation.dispatch(CommonActions.goBack());
    })
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Add a question here..."
        onChangeText={this.onQuesChange}
        value={this.state.question}
        />
        <TextInput
        style={styles.input}
        placeholder="Add the answer here..."
        onChangeText={this.onAnsChange}
        value={this.state.answer}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={{fontSize: 20}}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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

function mapStateToProps (state, { route }) {
  const { entryId } = route.params;
  return {
    title: entryId
  }
}

export default connect(mapStateToProps)(AddCard);
