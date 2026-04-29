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
      <View style={[styles.searchBox, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
        <TextInput
          style={[styles.input, { color: '#fff' }]}
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
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  iconContainer: {
    padding: 5,
  },
});

export default SearchBar;
