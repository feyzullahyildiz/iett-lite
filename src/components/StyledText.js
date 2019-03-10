import React from 'react';
import { Text, StyleSheet } from 'react-native';

export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[styles.codeHighlightText]} />;
  }
}

const styles = StyleSheet.create({
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
})