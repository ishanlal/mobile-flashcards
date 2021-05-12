export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const SAVE_ANSWER_SELECTED = 'SAVE_ANSWER_SELECTED'
export const CLEAR_ANSWER_SELECTED = 'CLEAR_ANSWER_SELECTED'

export function receive_Decks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function save_Deck_Title (title) {
  return {
    type: SAVE_DECK_TITLE,
    title,
  }
}

export function remove_Deck (title) {
  return {
    type: REMOVE_DECK,
    title,
  }
}

export function add_Card_To_Deck (title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card,
  }
}

export function save_Answer_Selected (title, answer, count) {
  return {
    type: SAVE_ANSWER_SELECTED,
    title,
    answer,
    count
  }
}

export function clear_Answer_Selected (title) {
  return {
    type: CLEAR_ANSWER_SELECTED,
    title,
  }
}
