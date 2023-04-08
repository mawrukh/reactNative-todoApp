import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('Add');

  // Add a new item to the todoList or update an existing one
  const handleAddOrUpdateTodo = () => {
    if (todoItem) {
      if (selectedTodo) {
        // Update an existing item
        handleUpdateTodo();
      } else {
        // Add a new item
        setTodoList([...todoList, { id: Date.now(), title: todoItem, completed: false }]);
        setTodoItem('');
      }
    }
  };

  // Update the title of an existing todo item
  const handleUpdateTodo = () => {
    const updatedList = todoList.map(todo => {
      if (todo.id === selectedTodo.id) {
        return { ...todo, title: todoItem };
      }
      return todo;
    });
    setTodoList(updatedList);
    setSelectedTodo(null);
    setTodoItem('');
    setSubmitButtonLabel('Add');
  };

  // Remove a todo item from the todoList
  const handleDeleteTodo = id => {
    const updatedList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedList);
  };

  // Set the selectedTodo for editing
  const handleEditTodo = todo => {
    setSelectedTodo(todo);
    setTodoItem(todo.title);
    setSubmitButtonLabel('Update');
  };


  return (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Add Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here to add a new item"
        onChangeText={text => setTodoItem(text)}
        value={todoItem}
      />
      <TouchableOpacity
        style={[styles.button, { borderRadius: 20 }]}
        onPress={handleAddOrUpdateTodo}
      >
        <Text style={styles.buttonLabel}>{submitButtonLabel}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.listContainer}>
      <Text style={styles.label}>My List</Text>
      {todoList.map(todo => (
        <View key={todo.id} style={styles.todoItemContainer}>
          <TextInput
            style={styles.todoTitle}
            onChangeText={text => setTodoItem(text)}
            value={selectedTodo && selectedTodo.id === todo.id ? todoItem : todo.title}
            editable={selectedTodo && selectedTodo.id === todo.id}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteTodo(todo.id)}
          >
            <Icon name="times" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditTodo(todo)}
          >
            <Icon name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    
     marginBottom: 50,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  todoTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
});
