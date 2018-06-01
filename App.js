import React from 'react';
import {TouchableHighlight,FlatList, Button, StyleSheet, Text, View,TextInput } from 'react-native';

export default class App extends React.Component {

  state = {currenttodo:"hi", list:[{key: 'a'}, {key: 'b'}], refresh: false}

  handleGetList = async () => {
      const response = await fetch("https://todotechlab.herokuapp.com/getTODO")
      const json = await response.json();

      this.setState({list: json});

  }

  handleTouch = async (id) => {

      const TODO = {
      "id" : id
      }

      await fetch('https://todotechlab.herokuapp.com/deleteTODO', {
        method: 'POST',
        body: JSON.stringify(TODO),
        headers:{
          'Content-Type': 'application/json'
        }
      })

      this.setState({
         id: !this.state.refresh
       })

      await this.handleGetList()
      this.setState({
         refresh: !this.state.refresh
       })

  }

  handleAddList = async (text) => {
    if(this.state.todo !== ""){
      const TODO = {
      "todo" : this.state.currenttodo
      }

      await fetch('https://todotechlab.herokuapp.com/addTODO', {
        method: 'POST',
        body: JSON.stringify(TODO),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      this.handleGetList()

      this.setState({
         refresh: !this.state.refresh
       })
    }
  }

  componentDidMount(){
       this.handleGetList();
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>todoapp</Text>
        <TextInput style={styles.textAreaInput}
          placeholder="Add TODO"
          onChangeText={(text) => this.setState({currenttodo: text})}
        />
        <Button
          style={styles.addToDo}
          onPress={this.handleAddList}
          title="Add"
          color="#008b8b"
        />
        <FlatList
          style={styles.list}
          data={this.state.list}
          activeOpacity={5}
          renderItem={({item}) =>
          <TouchableHighlight onPress={() =>{
            this.handleTouch(item._id)
          }}><Text style={styles.todo}>{item.todo}</Text>
          </TouchableHighlight>  }

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  todo:{
    textAlign: 'center',
    fontSize: 25,
    paddingBottom: 20
  },

  list:{
    paddingTop: 40,
    flexDirection: 'row'
  },

  addToDo:{
      flex:1,

  },

  titleText:{
    fontSize: 60,
    fontFamily: 'Helvetica',
    paddingBottom: 20
  },

  textAreaInput:{textAlign: 'center', fontSize: 20, height: 40,width: 200},

  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
