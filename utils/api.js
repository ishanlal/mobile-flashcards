import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLASHCARDS_STORAGE_KEY, formatFlashCardResults } from './_decks';

export function fetchFlashCardResults () {
  AsyncStorage.clear()
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then(formatFlashCardResults)
}

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then(formatFlashCardResults)
}

export function getDeck (id) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results);
    return data[id];
  })
}

export function saveDeckTitle (title) {
  const entry = {
    title: title,
    questions: [],
    answersSelected: []
  }
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: entry,
  }))
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title].questions.push(card);
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function removeDeck (title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title] = undefined;
      delete data[title];
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function saveAnswerSelected (title, answer) { //where answer = {ans: 'Correct/Incorrect'}
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title].answersSelected.push(answer);
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}
