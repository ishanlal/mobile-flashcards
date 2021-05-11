import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { white, purple } from '../utils/colors';
import { CommonActions } from '@react-navigation/native';

class CardView extends React.Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0,180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0,180],
      outputRange: ['180deg', '360deg'],
    })
  }
  flipCard() {
    if (this.value >= 90) {
      Animated.timing(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    }
  }
  correctPressed = () => {
    const { dispatch, deckInfo, displayCount } = this.props
    // save answerselected in backend
    // store quiz completion date
    // evaluate count with question.length
    // display results screen if last question
    // if not navigate to next screen
  }
  incorrectPressed = () => {
    const { dispatch, deckInfo, displayCount } = this.props
    // save answerselected in backend
    // evaluate count with question.length
    // store quiz completion date
    // display results screen if last question
    // if not navigate to next screen
  }
  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    const { dispatch, deckInfo, displayCount } = this.props
    if (deckInfo.questions.length === 0) {
        return (
          <View style={styles.container}>
            <Text> There are no card in this deck, please add some cards before starting a quiz.</Text>
          </View>
        )
    }
    return (
      <View style={styles.container}>
        <View>
          <Text>{(displayCount+1)} / {deckInfo.questions.length}</Text>
        </View>
        <View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text>Question: {deckInfo.questions[displayCount].question}</Text>
            <Text>Answer: {deckInfo.questions[displayCount].answer}</Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text>The question answer pair is Correct!</Text>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={() => this.flipCard()}>
          <Text>SHOW ANSWER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.correctPressed}>
          <Text>CORRECT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.incorrectPressed}>
          <Text>INCORRECT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
  }
})

function mapStateToProps (state, { route }) {
  const { entryId, displayCount } = route.params;
  return {
    entryId,
    displayCount,
    deckInfo: state[entryId]
  }
}

export default connect(mapStateToProps)(CardView);
