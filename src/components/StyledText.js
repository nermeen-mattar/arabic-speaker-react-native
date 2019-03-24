import React from 'react';
import { Text } from 'react-native';
import fonts from '../constants/fonts';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: this.props.fontFamily ? this.props.fontFamily: fonts.hecenCasablancaLight }]} />;
    // 'tajawal-bold' 
  }
}
