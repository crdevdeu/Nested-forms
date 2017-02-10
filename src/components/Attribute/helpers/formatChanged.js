import { getDataTypeStringNoneStruct, getBaseStruct } from './../rules';
import { changeFormToStringNumber } from './changeFormModel';

const formatChanged = (formatValue, thisValue, props) => {
  if (formatValue === 'none') {
    thisValue.setState({
      struct: getDataTypeStringNoneStruct(null),
      structType: 'StringNoneStruct',
    });
    props.changeDatatypeStringNumberDefault(props.data.id, null);
    props.changeEnumerationsDefault(props.data.id, []);
  }
  if (formatValue === 'number') {
    props.changeDatatypeStringNumberDefault(props.data.id, true);
    props.changeEnumerationsDefault(props.data.id, null);
    changeFormToStringNumber(thisValue, props);
  }
  if (formatValue === 'boolean' || formatValue === 'date-time' || formatValue === 'cdata' || formatValue === 'uri') {
    thisValue.setState({
      struct: getBaseStruct(null),
      structType: 'baseStruct',
    });
    props.changeEnumerationsDefault(props.data.id, null);
    props.changeDatatypeStringNumberDefault(props.data.id, null);
  }
};

export default formatChanged;
