import {
  RECEIVE_DECKS,
  SAVE_DECK_TITLE,
  REMOVE_DECK,
  ADD_CARD_TO_DECK,
  SAVE_ANSWER_SELECTED
 } from '../actions'

function decks (state = {}, action) {
    switch (action.type)
    {
      case RECEIVE_DECKS:
        return {
          ...state,
          ...action.decks
        }
      case SAVE_DECK_TITLE:
        return {
          ...state,
          [action.title]: {
            title: action.title,
            questions: [],
            answersSelected: []
          }
        }
      case REMOVE_DECK:
        let retObj = {...state}
        delete retObj[action.title]
        return retObj
      case ADD_CARD_TO_DECK:
        return {
          ...state,
          [action.title]: {
            ...state[action.title],
            questions: state[action.title].questions.concat(action.card)
          }
        }
      case SAVE_ANSWER_SELECTED:
        return {
          ...state,
          [action.title]: {
            ...state[action.title],
            answersSelected: state[action.title].answersSelected.concat(action.answer)
          }
        }
      default :
        return state
    }
}

export default decks;
