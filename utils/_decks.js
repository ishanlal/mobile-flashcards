// utils/_calendar.js
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDecksInfo, timeToString, getDailyReminderValue } from './helpers'

export const FLASHCARDS_STORAGE_KEY = '@FlashCards'

function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

function setDefaultObjectShape () {
  let deckData = getDecksInfo()
  const timestamp = Date.now()
  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(deckData))
  return deckData
}

function returnNonEmpty (deckObject) {
  const length = Object.keys(deckObject).length
  const timestamp = Date.now()
  return deckObject
}

export function formatFlashCardResults (results) {
  return results === null
    ? setDefaultObjectShape()
    : returnNonEmpty(JSON.parse(results))
}
