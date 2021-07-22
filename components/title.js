import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Movie Quiz</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    
  },
  container: {
    paddingTop: 40,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
