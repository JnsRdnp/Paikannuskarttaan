import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements'


const MainAppBar = (props) => {
    const title = getHeaderTitle(props.options, props.route.name)
    console.log(props.navigation)


  return (
    <Appbar.Header style={{backgroundColor: props.backgroundColor}}>
       {props.back ?  <Appbar.BackAction onPress={() => props.navigation.goBack()} /> : null }
        <Appbar.Content  title={title}></Appbar.Content>
        {props.back ? null : <Appbar.Action icon={props.icon}  onPress={props.getUserPosition}></Appbar.Action> }
        {props.back ? null : <Appbar.Action icon='cog'  onPress={() => props.navigation.navigate('Settings')}></Appbar.Action> }
    </Appbar.Header>
  )
}

export default MainAppBar

// const styles = StyleSheet.create({
//   container:{
//     flex: 1
//   }
// })