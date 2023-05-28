import { StatusBar } from 'expo-status-bar';
import constans from 'expo-constants';
import { StyleSheet, Text, TouchableOpacity, View,Dimensions } from 'react-native';
import { AppBar } from "@react-native-material/core";
import StopWatch, { values } from './StopWatch.js';
import  Pomodoro  from './Pomodoro.js';
import  Timer  from './Timer.js';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';





let A_vals = {
  title: values.title,
  color: values.bg_color,
  watchEnable : true,
  timerEnable : false,
  pomodoroEnable : false,
}
console.log(A_vals.bg_color);
const App = () => {

  const [title, setTitle] = useState('StopWatch');
  const [watchEnable, setwatchEnable] = useState(true);
  const [timerEnable, settimerEnable] = useState(false);
  const [pomodoroEnable, setpomodoroEnable] = useState(false);
  const [color, setColor] = useState(values.bg_color);

  const onPressStopWatch = () =>{
    A_vals = {
      title: values.title,
      color: values.color,
      watchEnable : true,
      timerEnable : false,
      pomodoroEnable : false,
    }
    console.log(A_vals.title)
    setTitle(A_vals.title)
    setwatchEnable(true)
    settimerEnable(false)
    setpomodoroEnable(false)
    setColor(values.bg_color)
    }
  const onPressTimer = () =>{
    A_vals = {
      title: 'Timer',
      color: values.color,
      watchEnable : false,
      timerEnable : true,
      pomodoroEnable : false,
    }
    console.log(A_vals.title)
    setTitle(A_vals.title)
    setwatchEnable(false)
    settimerEnable(true)
    setpomodoroEnable(false)
    setColor('#18191b')
  }
  const onPressPomodoro = () =>{
    A_vals = {
      title: 'Pomodoro',
      color: '#ab3439',
      watchEnable : false,
      timerEnable : false,
    pomodoroEnable : true,
    }
    console.log(A_vals.title)
    setTitle(A_vals.title)
    setwatchEnable(false)
    settimerEnable(false)
    setpomodoroEnable(true)
    setColor('#ab3439')
  }
  return (
<View style={[styles.container, { backgroundColor: color }]}>
      <AppBar style={[styles.appBar_top]} title={A_vals.title} centerTitle={true} titleStyle={styles.textTitle} />
      <StopWatch watchEnable = {watchEnable}/>
      <Timer timerEnable = {timerEnable} />
      <Pomodoro pomodoroEnable = {pomodoroEnable} />
      <AppBar
        variant="bottom"
        style={styles.appBar_bottom}
        centerTitle={true}
        to
        leading={
          <View style={styles.leadingContainer} >
          <TouchableOpacity onPress={onPressStopWatch}>
          <View style = {styles.center}>
          <Ionicons name="stopwatch-outline" size={29} color="white" />
          <Text style={styles.subscript}>Stopwatch</Text>
          </View>
          </TouchableOpacity>
          
           <TouchableOpacity onPress={onPressTimer}  style= {styles.title}>
           <View style = {styles.center}>
             <Ionicons name="timer-outline" size={29} color="white" />
             <Text style={[styles.subscript]}>Timer</Text>
           </View>
           </TouchableOpacity>

           <TouchableOpacity onPress={onPressPomodoro}>
          <View style = {styles.center}>
            <FontAwesome name="pencil-square-o" size={29} color="white" />
            <Text style={styles.subscript}>Pomodoro</Text>
          </View>
          </TouchableOpacity>
          </View>
        }        
 
      />
      <StatusBar style="auto" />
    </View>
  );
}
console.log(Dimensions.get('window').width)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: A_vals.color,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: constans.statusBarHeight
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '100',
  },
  textTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '300',
  },
  appBar_bottom: {
    backgroundColor: 'transparent',
    position: "absolute",
    justifyContent: 'center',
    elevation: 0,
    start: 0,
    end: 0,
    bottom: 0,
    borderWidth: 1.5,
    borderColor: 'rgba(242, 255, 255, 0.1)',
    borderRadius: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 58
  },
  appBar_top: {
    backgroundColor: 'transparent',
    position: "absolute",
    elevation: 0,
    start: 30,
    end: 30,
    top: 0,
    borderWidth: 1.5,
    borderColor: 'rgba(242, 255, 255, 0.35)',
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 90,
    paddingTop: constans.statusBarHeight,
  },
  leadingContainer: {
    flex:1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    // paddingTop: 50,
    // backgroundColor:'red',
    width:Dimensions.get('window').width ,
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute items evenly
  },
  trailingContainer: {
    marginRight: 25,
    alignItems: 'center',
  },
  title:{
    // marginLeft: 85,
  },
  subscript: {
    color: 'rgba(242, 255, 255, 0.80)',
    fontSize: 14,
    fontWeight: '500',
  },
    leadingsub: {
      marginLeft: 8,
      alignItems: 'center',
    },
    trailingsub: {
      marginRight: 8,
      alignItems: 'center',
    },
    align: {
      marginRight: 10,
    },
    iconWithTitle: {
      alignItems: 'center',
    },
    center:{
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default App;
  