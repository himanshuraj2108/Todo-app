import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  Modal
} from 'react-native';
import Header from './components/header';
import CheckBox from '@react-native-community/checkbox';

const App = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  const [count, setCount] = useState(1);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [newInput, setNewInput] = useState('');
  const [editItem, seteditItem] = useState('');

  const submitHandler = () => {
    if (input.length >= 3) {
      setTodo([...todo, { text: input, key: count, checked: false }]);
      //console.log(count);
      setCount(count + 1);
      setInput('');

    }
    else {
      Alert.alert('OOPS!', 'todo length should be at least 3');
    }
  }
  const deleteItem = (key) => {
    setTodo((prevtodo) => {
      return prevtodo.filter((todo) => todo.key != key)
    })
  }
  const handleEditItem = (editItem) => {
    const newData = todo.map(item => {
      if (item.key == editItem) {
        item.text = newInput
        return item;
      }
      return item;
    });
    setTodo(newData);
  }


  const onPressSaveEdit = () => {
    handleEditItem(editItem);
    setisModalVisible(false);

  }

  const onPrssItem = (item) => {
    setisModalVisible(true);
    setNewInput(item.text);
    seteditItem(item.key);

  }

  const checkboxHandler = (idd) => {
    const newData = todo.map(item => {
      if (item.key == idd) {
        return { ...item, checked: true };
      }
      return item;
    })
    setTodo(newData);
  }



  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Header />
      </SafeAreaView>
      <SafeAreaView style={styles.input}>
        <TextInput
          placeholder='enter what do you want to do !!!'
          onChangeText={(val) => setInput(val)}
          value={input}
          style={styles.textinput}
        />
        <TouchableOpacity onPress={submitHandler}>
          <Image
            style={{ width: 45, height: 45 }}
            source={require('./images/add-button.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.content}>
        <FlatList
          style={styles.flatlist}
          data={todo}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <CheckBox
                value={item.checked}
                onChange={() => checkboxHandler(item.key)}
              />
              <Text style={{
                padding: 7,
                borderWidth: 1,
                width: 280,
                fontSize: 16,
                backgroundColor: 'white',
                color: 'grey',
                borderRadius: 15,
                textDecorationLine: item.checked ? 'line-through' : 'none',
                textDecorationStyle: 'solid'
              }}>{item.text}</Text>
              <TouchableOpacity onPress={() => onPrssItem(item)}>
                <Image
                  style={styles.image}
                  source={require('./images/edit-button.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem(item.key)}>
                <Image
                  style={styles.image}
                  source={require('./images/delete-button.png')}

                />
              </TouchableOpacity>
            </View>
          )}

        />
      </SafeAreaView>
      <Modal
        animationType='slide'
        visible={isModalVisible}
      >
        <View style={styles.model}>
          <Text style={styles.modeltext}>Enter text</Text>
          <TextInput
            placeholder='enter new text'
            onChangeText={(txt) => setNewInput(txt)}
            defaultValue={newInput}
            style={styles.modeltextinput}
          />
          <TouchableOpacity onPress={() => onPressSaveEdit()}>
            <Text style={styles.modelsave}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1.5,
    backgroundColor: 'grey',
    borderRadius: 40,
    //width: 393,
    //height: 120
  },
  input: {
    flex: 1.5,
    borderRadius: 40,
    backgroundColor: '#ADD8E6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //width: 393,
    //height: 120,
    //borderWidth: 1,
  },
  textinput: {
    alignContent: 'center',
    fontSize: 16,
    width: '80%',
    //height: 60,
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',

  },
  content: {
    flex: 7,
    //width: 393,
    backgroundColor: '#ADD8E6',
    borderRadius: 40,
    // justifyContent: 'center',
    //alignItems: 'center',
    borderTopWidth: 1


  },

  flatlist: {
    marginTop: 10,
    marginBottom: 10,
    //width: '100%'

  },
  list: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    width: '100%',
  },
  image: {
    width: 30,
    height: 30,
  },
  model: {
    backgroundColor: '#ADD8E6',
  },
  modeltext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    paddingTop: 20
  },
  modeltextinput: {
    alignContent: 'center',
    fontSize: 16,
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 15
  },
  modelsave: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00FF00',
    borderWidth: 1,
    backgroundColor: '#778899',
  },
});
export default App;