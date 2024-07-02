import { Alert, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../config/config'
import { ref, set,onValue, update, remove } from "firebase/database";
import Tarjeta from '../components/Tarjeta';

export default function UsuarioScreen() {
  const[cedula, setcedula,]=useState("")
  const[nombre, setnombre,]=useState("")
  const[correo, setcorreo,]=useState("")
  const[comentario, setcomentario,]=useState("")
  const[usuarios,setusuarios]=useState([])
  const [modoEdicion, setModoEdicion] = useState(false);


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
  }, [])
  type Usuario={
    name:string
    key: string
    eliminar:string
  }

  ////-----------------------------EDITAR-----------------------//////////
  function editar(id:string){
    update(ref(db, 'usuarios/' + id), {
      name: nombre,
      email: correo,
      comment: comentario
    });
  }

  function editar2(item:any){
     setcedula(item.key)
     setnombre(item.name)
     setcorreo(item.email)
     setcomentario(item.comment)
     setModoEdicion(true);

  }

  ////////////--------------------ELIMINAR--------------------------//////////////
  function eliminar(id:string){
    remove(ref(db, 'usuarios/' + id));}
  
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

<Button
      title={modoEdicion ? 'ACTUALIZAR' : 'GUARDAR'}
      onPress={() => {
        if (modoEdicion) {
          // Lógica para actualizar usuario
          editar(cedula); // Suponiendo que cedula es el ID del usuario
        } else {
          // Lógica para guardar usuario nuevo
          guardarUsuario(cedula, nombre, correo, comentario);
        }
      }}
      color={modoEdicion ? 'blue' : undefined} // Cambiar color cuando esté en modo edición
    />
        <FlatList 
        data={usuarios}
        renderItem={({item}:{item:Usuario})=>
        //<Tarjeta usuario={item}/>
        <View>
          <Tarjeta usuario={item}/>
          {/* <Text>{item.name}</Text>
          <Text>{item.key}</Text> */}

          <View style={{flexDirection:'row'}}>
          <Button title='Editar' color={'green'} onPress={()=>editar2(item)}/>
          <Button title='Eliminar' color={'red'} onPress={()=>eliminar(item.key)}/>
          </View>
        </View>

        }
        />

        <StatusBar/>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecca93',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt:{
backgroundColor: '#7055f6',
height:50,
width:'80%',
alignItems:'center',
justifyContent:'center',
margin:2,
fontSize:20
  }

})