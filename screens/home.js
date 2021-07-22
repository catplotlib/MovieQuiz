import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Title from '../components/title';
const Home = ({navigation}) => {
  return (
    <View>
      <Title />
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: 'https://image.flaticon.com/icons/png/512/3163/3163323.png',
          }}
          style={styles.banner}
          resizeMode="contain"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Quiz')}
          style={styles.button}>
          <Text style={styles.buttonText}>Take the Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    marginTop: 150,
    width: '80%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 5,
  },
  buttonText: {
    fontSize: 30,
  },
  banner: {
    height: 200,
    width: 200,
  },
  bannerContainer: {
    paddingTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});
