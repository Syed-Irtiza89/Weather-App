import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

const SearchBar = ({ onSearch, theme }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          placeholderTextColor="#ddd"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.iconContainer}>
          <Search color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 55,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  iconContainer: {
    padding: 5,
  },
});

export default SearchBar;
