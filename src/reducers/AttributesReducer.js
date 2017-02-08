import _ from 'lodash';
import {
  CREATE_NEW_ATTRIBUTE,
  ATTRIBUTE_CHANGED,
  DATATYPE_CHANGED,
  CHANGE_ENUMERATIONS_DEFAULT,
  ADD_ENUMERATION_DATA,
  CHANGE_DATATYPE_STRING_NUMBER_DEFAULT,
  DELETE_ATTRIBUTE,
  FORM_VALIDATION_ERROR,
  CLEAR_VALIDATION_ERRORS,
} from './../actions/types';

const INITIAL_STATE = {
  attributesList: [],
  errors: [],
};

let attributeIndex;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW_ATTRIBUTE:
      return { ...state, attributesList: [...state.attributesList, action.payload] };
    case ATTRIBUTE_CHANGED:
      attributeIndex = _.findIndex(state.attributesList, { id: action.payload.id });
      return {
        ...state,
        attributesList: [
          ...state.attributesList.slice(0, attributeIndex),
          {
            ...state.attributesList[attributeIndex],
            [action.payload.field]: action.payload.value,
          },
          ...state.attributesList.slice(attributeIndex + 1)],
      };
    case DATATYPE_CHANGED:
      attributeIndex = _.findIndex(state.attributesList, { id: action.payload.id });
      return {
        ...state,
        attributesList: [
          ...state.attributesList.slice(0, attributeIndex),
          {
            ...state.attributesList[attributeIndex],
            format: 'none',
          },
          ...state.attributesList.slice(attributeIndex + 1)],
      };
    case CHANGE_ENUMERATIONS_DEFAULT:
      attributeIndex = _.findIndex(state.attributesList, { id: action.payload.id });
      return {
        ...state,
        attributesList: [
          ...state.attributesList.slice(0, attributeIndex),
          {
            ...state.attributesList[attributeIndex],
            enumerations: action.payload.value,
          },
          ...state.attributesList.slice(attributeIndex + 1)],
      };
    case CHANGE_DATATYPE_STRING_NUMBER_DEFAULT:
      attributeIndex = _.findIndex(state.attributesList, { id: action.payload.id });
      let parameter = {};
      if (action.payload.value) {
        parameter.rangeMin = 0;
        parameter.rangeMax = 0;
        parameter.unitOfMeasurement = '';
        parameter.precision = 1;
        parameter.accuracy = 1;
      } else {
        parameter.rangeMin = null;
        parameter.rangeMax = null;
        parameter.unitOfMeasurement = null;
        parameter.precision = null;
        parameter.accuracy = null;
      }
      const { rangeMin, rangeMax, unitOfMeasurement, precision, accuracy } = parameter;
      return {
        ...state,
        attributesList: [
          ...state.attributesList.slice(0, attributeIndex),
          {
            ...state.attributesList[attributeIndex],
            rangeMin,
            rangeMax,
            unitOfMeasurement,
            precision,
            accuracy,
          },
          ...state.attributesList.slice(attributeIndex + 1)],
      };
    case ADD_ENUMERATION_DATA:
      attributeIndex = _.findIndex(state.attributesList, { id: action.payload.id });
      return {
        ...state,
        attributesList: [
          ...state.attributesList.slice(0, attributeIndex),
          {
            ...state.attributesList[attributeIndex],
            enumerations: state.attributesList[attributeIndex].enumerations
            .concat([action.payload.value]),
          },
          ...state.attributesList.slice(attributeIndex + 1)],
      };
    case DELETE_ATTRIBUTE:
      attributeIndex = _.findIndex(state.attributesList, { id: action.payload.id });
      return {
        ...state,
        attributesList: [
          ...state.attributesList.slice(0, attributeIndex),
          ...state.attributesList.slice(attributeIndex + 1)],
      };
    case FORM_VALIDATION_ERROR:
      return { ...state, errors: state.errors.concat(action.payload) };
    case CLEAR_VALIDATION_ERRORS:
      const errorIndex = _.findIndex(state.errors, { id: action.payload.id });
      return {
        ...state,
        errors: [
          ...state.errors.slice(0, errorIndex),
          ...state.errors.slice(errorIndex + 1)],
      };
    default:
      return state;
  }
};
