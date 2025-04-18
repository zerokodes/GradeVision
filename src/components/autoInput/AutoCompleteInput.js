import React, { useState, useEffect } from "react";
import { SuggestionContainer, SuggestionText, SuggestionItem } from "./styles";
import { Input } from "../input";
import { FlatList, View } from "react-native";

const AutoCompleteInput = ({
  label,
  error,
  suggestions,
  onSelect,
  value,
  onChange,
  ...props
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value && value.length > 0) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [value, suggestions]);

  const handleSelect = (item) => {
    onSelect(item);
    setTimeout(() => {
      setShowSuggestions(false);
    }, 0);
  };

  return (
    <View>
      <Input
        label={label}
        error={error}
        value={value}
        onChangeText={onChange}
        onFocus={() => value && setShowSuggestions(true)}
        {...props}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <SuggestionContainer>
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item, index) => index.toString()}
            keyboardShouldPersistTaps="always"
            renderItem={({ item, index }) => (
              <SuggestionItem
                onPress={() => handleSelect(item)}
                isLast={index === filteredSuggestions.length - 1}
              >
                <SuggestionText>{item}</SuggestionText>
              </SuggestionItem>
            )}
          />
        </SuggestionContainer>
      )}
    </View>
  );
};

export default AutoCompleteInput;
