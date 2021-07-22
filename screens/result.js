import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';

const Result = score => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.sc}>Your Score is: {score.route.params.score} </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.Button}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  sc: {paddingVertical: 40, fontSize: 40},
  Button: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  buttonText: {
    fontSize: 20,
  },
  container: {
    paddingHorizontal: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
