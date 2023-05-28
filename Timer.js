import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from '@react-native-material/core';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Vibration} from 'react-native'


export default function Timer({ timerEnable }) {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isPaused, setIsPaused] = useState(true);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [vib, setVib] = useState(true);

  useEffect(() => {
    const func = () =>
    {
      Vibration.vibrate([1000, 1000 , 1000, 1000, 1000 ,1000])
      setVib(false)
    }

    let interval;
    if (timerEnable && !isPaused && time > 0) {
      setVib(true)
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    else if (time <= 0 && timerEnable && vib)
    {
      func()
      setIsPaused(true);
    }
    
    return () => clearInterval(interval);
  }, [timerEnable, isPaused, time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handlePause = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  const TimerButtons = React.memo(({ handlePause, isPaused }) => {

    const onPressPause = () => {
      handlePause();
    };

    return (
      <View style={styles.Buttons}>
        <View style={[{width: 120}]}>
        <Button
          variant="contained"
          disableElevation
          title={isPaused ? 'Start' : 'Stop'}
          onPress={onPressPause}
          color='white'
          tintColor='#18191b'
        />
        </View>
      </View>
    );
  });
  const handleTimeConfirm = (selectedTime) => {
    const selectedMinutes = selectedTime.getHours();
    const selectedSeconds = selectedTime.getMinutes();
    const selectedTotalSeconds = selectedMinutes * 60 + selectedSeconds;
    console.log(selectedMinutes)
    console.log(selectedSeconds)
    setTime(selectedTotalSeconds);
    setTimePickerVisibility(false);
  };

  if (!timerEnable) {
    return null;
  }

  return (
    <View style={styles.container}>
    <DateTimePickerModal
  isVisible={isTimePickerVisible}
  mode="time"
  display="spinner"
  is24Hour={true}
  datePickerModeAndroid="spinner"
  onConfirm={handleTimeConfirm}
  onCancel={() => setTimePickerVisibility(false)}
  date={new Date(0, 0, 0, 0, Math.floor(time / 60), time % 60)}
  minuteInterval={1}
  locale="en_GB"
  dateFormatter={(date) =>
    `${(date.getHours() * 60 + date.getMinutes()).toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
  }
/>
      <View style={styles.timerContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={()=>{
            setTimePickerVisibility(true);
            console.log(isTimePickerVisible)
        }}>
            <View >
               <AntDesign name="edit" size={24} color="white" />
            </View>
        </TouchableOpacity>
        <Text style={styles.timerText}>{formatTime(time)}</Text>
      </View>
      <View>
        <TimerButtons handleReset={setTime} handlePause={handlePause} isPaused={isPaused} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#262626',
  },
  timerContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center',
    height: 200,
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: 'rgba(255, 255, 255,0.1)',
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  Buttons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: 'rgba(242, 255, 255, 0.35)',
  },
  iconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
});
