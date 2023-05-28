import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from '@react-native-material/core';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Vibration} from 'react-native'

const func = () => Vibration.vibrate([1000, 1000 , 1000, 1000, 1000 ,1000])
const TimeCalc = ({ time }) => {
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return (
      <Text style={styles.timerText}>
        {hours}:{minutes}
        <Text style={styles.millisecondsText}>{seconds}</Text>
      </Text>
    );
  };
return <Text style={styles.text}>{formatTime(time)}</Text>;
};
const defaultPOM = '1500'
const defaultBreak = '300'

export default function Pomodoro ({pomodoroEnable}) {
    const [pomodoroTimer, setpomodoroTimer] = useState(defaultPOM);
    const [Toggle, setToggle] = useState(false)
    const [breakTimer, setbreakTimer] = useState(defaultBreak)
    const [isPaused, setIsPaused] = useState(true);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    useEffect(() => {
        let POMinterval;
        let BRKinterval;
        if (Toggle == true && pomodoroTimer > -1 && !isPaused) {
            if(pomodoroTimer <= 0)
            {
                // setIsPaused(!isPaused)
                setToggle(!Toggle)
            }
            if(breakTimer <= 0)
            {
                setbreakTimer(defaultBreak)
                setIsPaused(!isPaused)
                func()
            }
            POMinterval = setInterval(() => {
                 setpomodoroTimer((prevpomodoroTimer) => prevpomodoroTimer - 1);
              }, 1000);
        }
        else if (Toggle == false && breakTimer > -1 && !isPaused) {
            if(pomodoroTimer <= 0)
            {
                setpomodoroTimer(defaultPOM)
                setIsPaused(!isPaused)
                func()
            }
            if (breakTimer <= 0)
            {
                setToggle(!Toggle)
            
            }
            BRKinterval = setInterval(() => {
                 setbreakTimer((prevbreakTimer) => prevbreakTimer - 1);
              }, 1000);
        }
        return () => {
            clearInterval(BRKinterval);
            clearInterval(POMinterval);
        }

    }, [pomodoroTimer, breakTimer, Toggle, isPaused]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      };
    
    const handleTogglePOM = () => {
        if(Toggle == false){
            setToggle(!Toggle)
        }
        else{
        setToggle(Toggle)
        
        }
    }
    const handleToggleBRK = () => {
        if(Toggle == true){
            setToggle(!Toggle)
        }
        else{
        setToggle(Toggle)
        
        }
    }
    const handlePause = () => {
        setIsPaused((prevPaused) => !prevPaused);
      };

    const POMButton = React.memo(({ handlePause, isPaused }) => {

        const onPressPause = () => {
          handlePause();
        };
    
        return (
          <View style={[{width:120}, {paddingTop: 50}]}>
            <Button
              style={styles.buttons}
              variant="contained"
              disableElevation
              title={isPaused ? 'Start' : 'Stop'}
              onPress={onPressPause}
              color="white"
              tintColor='#ab3439'
            />
          </View>
        );
      });

    const handleTimeConfirm = (selectedTime) => {
        const selectedTotalSeconds = selectedTime.getHours() * 3600 + selectedTime.getMinutes() * 60;
        if(Toggle)
        setpomodoroTimer(selectedTotalSeconds);
        else
        setbreakTimer(selectedTotalSeconds);
        setTimePickerVisibility(false);
    };
    
    if (pomodoroEnable === false) {
    
        return null
    }
    else{
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
                minuteInterval={1}
                locale="en_GB"
                date={new Date()}
                minimumDate={new Date(0, 0, 0, 0, 0, 0)}
                maximumDate={new Date(0, 0, 0, 0, 60, 0)} // Limit the selection to 60 minutes and 0 seconds
                // Set the maximumDate to '0, 0, 0, 0, 60, 0' to limit the hour and minute selection
                secondInterval={1}
                timePickerProps={{
                
                }}
                dateFormatter={(date) =>
                `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
                }
            />
                <View style={styles.PomodoroContainer}>
                    <View style = {styles.ButtonLayout}>
                    <Button style = {[styles.Buttons, {backgroundColor: Toggle ? '#933a3e' : 'transparent'}]} title = 'Pomodoro' disableElevation onPress={handleTogglePOM}></Button>
                    <Button style = {[styles.Buttons, {backgroundColor: !Toggle ? '#933a3e' : 'transparent'}]} title= 'Break' disableElevation onPress={handleToggleBRK}></Button>
                    </View>
                    {/* <Text style={styles.timerText}>{formatTime(Toggle ? pomodoroTimer: breakTimer)}</Text> */}
                    <TimeCalc time={Toggle ? pomodoroTimer: breakTimer}/>
                    <View style={styles.iconContainer}>
                     <TouchableOpacity  onPress={()=>{
                        setTimePickerVisibility(true);
                        console.log(isTimePickerVisible)
                            }}>
                        <View >
                            <AntDesign name="edit" size={24} color="white" />
                        </View>
                     </TouchableOpacity>
                    </View>
                </View>
                <View>
                <POMButton handlePause={handlePause} isPaused={isPaused} />
                </View>
            </View>
        );
    
}
    
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    PomodoroContainer: {
        marginTop: 150,
        alignItems: 'center',
        paddingHorizontal: 40,
        justifyContent: 'center',
        height: 200,
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: '#b24649',
        borderWidth: 1.5,
        borderColor: 'transparent',
        borderRadius: 10,
      },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
      },
    ButtonLayout: {
        position: 'absolute',
        top: 16,
        flexDirection: 'row',
        paddingHorizontal: 16,
        width: Dimensions.get('window').width * 0.75,
        justifyContent: 'space-between',
      },
      Buttons: {
        width: 120,
      },
      iconContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 1,
      },
      timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
      },
      millisecondsText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '100',
      },
      text: {
        color: '#fff',
        fontSize: 40,
        fontWeight: '300',
      },
});
