import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Quiz = ({navigation}) => {
  const [questions, setQuestions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [qInd, setQInd] = useState(0);
  const [score, setScore] = useState(0);
  const [lastAns, setLastAns] = useState('black');

  const loadQuestions = async () => {
    const url =
      'https://opentdb.com/api.php?amount=10&category=11&type=multiple';

    let response = fetch(url)
      .then(response => response.json())
      .then(data => {
        insertCorr(
          data.results[0].incorrect_answers,
          data.results[0].correct_answer,
        );
        setQuestions(data.results);
        setLoaded(true);
      });
  };
  useEffect(() => {
    let controller = new AbortController();
    loadQuestions();
    return () => controller?.abort();
  }, []);

  const cleanup = () => {
    setScore(0);
    setQInd(0);
    setLastAns('black');
  };

  function insertCorr(arr, corr) {
    const randInd = Math.floor(Math.random() * 4);
    arr.splice(randInd, 0, corr);
  }

  const handlePrsd = (e, ans) => {
    e.preventDefault();

    if (ans == questions[qInd].correct_answer) {
      setScore(score + 1);
      setLastAns('green');
    } else {
      setLastAns('red');
    }

    if (qInd + 1 < questions.length) {
      insertCorr(
        questions[qInd + 1].incorrect_answers,
        questions[qInd + 1].correct_answer,
      );
      setQInd(qInd + 1);
    } else {
      loadQuestions();
      setQInd(0);
    }
    if (qInd === 9) {
      navigation.navigate('Result', {score: score});
      cleanup();
    }
  };

  return (
    <View style={styles.container}>
      {loaded ? (
        <View style={styles.parent}>
          <Text style={{color: lastAns, fontSize: 30}}>{score}</Text>
          <View style={styles.top}>
            <Text style={styles.question}>
              Q.{qInd + 1}{' '}
              {questions[qInd].question
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")}
            </Text>
          </View>
          <View styles={styles.option}>
            {loaded &&
              questions[qInd].incorrect_answers.map((answerOption, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={e => handlePrsd(e, answerOption)}
                  style={styles.optionButton}>
                  <Text style={styles.option}>
                    {answerOption
                      .replace(/&quot;/g, '"')
                      .replace(/&#039;/g, "'")}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.score}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 200,
  },
  score: {
    fontSize: 20,
  },
  optionButton: {
    margin: 10,
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  question: {
    fontSize: 25,
    paddingBottom: 20,
  },
  parent: {
    height: '100%',
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
    width: '30%',
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
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  option: {
    fontSize: 20,
  },
});
