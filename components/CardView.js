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
    const { dispatch, deckInfo } = this.props
    if (deckInfo.questions.length === 0) {
        return (
          <View style={styles.container}>
            <Text> There are no card in this deck, please add some cards before starting a quiz.</Text>
          </View>
        )
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.flipCard()}>
          <Text>SHOW ANSWER</Text>
        </TouchableOpacity>
        <View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>
            Front text flip
            </Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.flipText}>
            Back text flip
            </Text>
          </Animated.View>
        </View>
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
  console.log('title_CV: ', entryId)
  console.log('count_CV: ', displayCount)
  return {
    entryId,
    displayCount,
    deckInfo: state[entryId]
  }
}

export default connect(mapStateToProps)(CardView);
