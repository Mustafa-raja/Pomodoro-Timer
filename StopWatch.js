import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@react-native-material/core';

const Timer = ({ time }) => {
  const formatTime = (time) => {
    const minutes = Math.floor((time / 1000 / 60) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
    return (
      <Text style={styles.timerText}>
        {minutes}:{seconds}
        <Text style={styles.millisecondsText}>{milliseconds}</Text>
      </Text>
    );
  };

  return <Text style={styles.text}>{formatTime(time)}</Text>;
};

const StopwatchButtons = React.memo(({ handleReset, handlePause, isPaused }) => {
  const onPressReset = () => {
      handleReset();
    };

    const onPressPause = () => {
      handlePause(!isPaused);
    };

  return (
    <View style={styles.Buttons}>
      <View style={[{width: 120}, {paddingTop: 50}]}>
      <Button
 
        variant="contained" 
        disableElevation 
        title={isPaused ? 'Start' : 'Stop'} 
        onPress={onPressPause} 
        color="white"
        tintColor='#4e8c73' 
      />
      </View>
      <View style={[{width: 120}, {paddingTop: 50}]}>
      <Button 
       
        variant="contained" 
        disableElevation 
        title="Reset" 
        onPress={onPressReset} 
        color="white"
        tintColor='#4e8c73' 
      />
      </View>
    </View>
  );
});

export default function StopWatch({watchEnable}) {
  const [time, setTime] = useState(0);
  const startTimeRef = useRef(performance.now());
  const accumulatedTimeRef = useRef(0);
  const [isPaused, setIsPaused] = useState(true);


  useEffect(() => {
    let animationFrameId;
    const startTimer = (timestamp) => {
      const elapsed = timestamp - startTimeRef.current + accumulatedTimeRef.current;
      setTime(elapsed);

      animationFrameId = requestAnimationFrame(startTimer);
    };

    if (!isPaused) {
      startTimeRef.current = performance.now();
      accumulatedTimeRef.current = time; // Store the accumulated time
      animationFrameId = requestAnimationFrame(startTimer);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  const handleReset = () => {
    console.log('Resetting');
    setTime(0);
    startTimeRef.current = performance.now();
    accumulatedTimeRef.current = 0;
  };

  const handlePause = (paused) => {
    console.log(paused ? 'Pausing' : 'Resuming');
    setIsPaused(paused);
    if (paused) {
      accumulatedTimeRef.current = time; // Store the accumulated time when paused
    }
  };
  console.log(watchEnable)
  if (watchEnable === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.StopWatchContainer}>
        <Timer style={styles.timerText} time={time} />
      </View>
      <StopwatchButtons handleReset={handleReset} handlePause={handlePause} isPaused={isPaused} />
    </View>
  );
}

export const values = {
  title: 'Stopwatch',
  bg_color: '#4e8c73',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '300',
  },
  millisecondsText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '100',
  },
  StopWatchContainer: {
    height: 250,
    width: 250,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
  Buttons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 50,
    width: 300,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: 'rgba(242, 255, 255, 0.35)',

  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
});
