import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Tarjeta(props: any) {
    console.log(props.usuario.name);
    
  return (
    <View style={styles.container}>
      <Text>{props.usuario.name}</Text>
      <Text>{props.usuario.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
 container:{
    backgroundColor:'#93b0ec',
    fontSize:30,

 }


})