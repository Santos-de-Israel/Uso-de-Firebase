import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../config/config'
import { ref, set,onValue } from "firebase/database";

export default function UsuarioScreen() {
  const[cedula, setcedula,]=useState("")
  const[nombre, setnombre,]=useState("")
  const[correo, setcorreo,]=useState("")
  const[comentario, setcomentario,]=useState("")
  const[usuarios,setusuarios]=useState([])

  //----------------GUARDAR----------------------///
  function guardarUsuario(cedula: string, nombre: string, correo: string, comentario:string) {
    
    set(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      email: correo,
      comment: comentario
    });
    Alert.alert('Se guardo')
    /// limpiar campos
    setcedula('')
    setnombre('')
    setcorreo('')
    setcomentario('')
  }
  ///--------------LEER INFORMACION-----------////
  useEffect(() => {
    const starCountRef = ref(db, 'usuarios/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();

  //console.log(data);
  
  const dataTemp:any = Object.keys(data). map((key)=>({
key, ...data[key]


  }))
console.log(dataTemp);
setusuarios(dataTemp)
});
  }, [usuarios])
  type Usuario={
    name:string
  }
  
  return (
    <View style={styles.container}>
      <Text>Usuario</Text>
      <TextInput placeholder='Ingresar Cedula' style={styles.txt} 
      onChangeText={(texto)=>setcedula(texto)}
      value={cedula}
      keyboardType='numeric'/>

      <TextInput placeholder='Ingresar Nombre'style={styles.txt} 
      onChangeText={(texto)=>setnombre(texto)}
      value={nombre}/>

      <TextInput placeholder='correo'style={styles.txt} 
      onChangeText={(texto)=>setcorreo(texto)}
      value={correo}
      keyboardType='email-address'/>

      <TextInput placeholder='Ingresar Descripción'style={styles.txt}
      onChangeText={(texto)=>setcomentario(texto)}
      value={comentario}
      multiline/>

      <Button title='GUARDAR' onPress={()=>guardarUsuario(cedula, nombre, correo, comentario)}/>
        <FlatList 
        data={usuarios}
        renderItem={({item}:{item:Usuario})=>
          <View>
        <Text>{item.name}</Text>
      </View>
        }
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d09d25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt:{
backgroundColor: '#52e06c',
height:50,
width:'80%',
alignItems:'center',
justifyContent:'center',
margin:2,
fontSize:20
  }

})