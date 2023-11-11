import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, Link, Pressable } from "react-native";
import {useState} from 'react';
import {Stack, useRouter} from 'expo-router';
import { COLORS, images, SIZES } from "../constants";
import {ScreenHeaderBtn} from '../components'
import TrainingSubmit from "../components/landing/TrainingSubmit";
import YoutubePlayer from 'react-native-youtube-iframe';
import { CheckBox } from 'react-native-elements';
import { ProgressBar, MD3Colors } from 'react-native-paper';


const Home = () => {
  const [vidChecked, setVidChecked] = useState({
    'BAWGjNAj_vA': false,
    'UFvL7wTFzl0': false
  })
  const [progressValue, setProgress] = useState(0)
  const [numOfChecked, setNumOfChecked] = useState(0);
  const updateProgress = (checked) => {
    if (checked) {
      setProgress((numOfChecked + 1) / Object.keys(vidChecked).length)
      setNumOfChecked(numOfChecked + 1)
    } else {
      setProgress((numOfChecked - 1) / Object.keys(vidChecked).length)
      setNumOfChecked(numOfChecked - 1)
    }
  }
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen 
        options={{
          headerStyle: {backgroundColor: COLORS.gray},
          headerShadowVisible: false,
          headerTitle: "Training",
          headerTitleAlign: "left",
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <View>
            <Text> 
            </Text>
          </View>
          <View style={styles.container}>
          <YoutubePlayer
            height={200}
            play={true}
            videoId={'BAWGjNAj_vA'}
          />
          <CheckBox
            title='Video Finished'
            checked={vidChecked['BAWGjNAj_vA']}
            onPress={() => setVidChecked(prev => ({...prev, 'BAWGjNAj_vA': !vidChecked['BAWGjNAj_vA']}), updateProgress(!vidChecked['BAWGjNAj_vA']))}
          />
          </View>
          <View style={styles.container}>
          <YoutubePlayer
            height={200}
            play={false}
            videoId={'UFvL7wTFzl0'}
          />
          <CheckBox
            title='Video Finished'
            checked={vidChecked['UFvL7wTFzl0']}
            onPress={() => setVidChecked(prev => ({...prev, 'UFvL7wTFzl0': !vidChecked['UFvL7wTFzl0']}), updateProgress(!vidChecked['UFvL7wTFzl0']))}
          />
            <ProgressBar style={styles.progressBar} progress={progressValue} color={MD3Colors.error50} />

            <Text>
               
            </Text>

            {
              progressValue == 1 &&
              <TrainingSubmit></TrainingSubmit>
            }
          </View>
          </View>
          </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:100
  },
  video: {
    width: '100%',
    height: 200,
  },
  progressText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
  },
  progressBar: {
    height: 15,
    width: '90%',
    left: '5%',
  }
});

export default Home;