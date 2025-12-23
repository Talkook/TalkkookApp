import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveSize } from '../../hooks/useResponsiveSize';
import { useTheme } from '../../hooks/useTheme';
import { getThemeColors } from '../../theme/constants';

const { height } = Dimensions.get('window');

// Helper function to convert ISO2 code to flag emoji
const getCountryFlag = (iso2Code) => {
    if (!iso2Code || iso2Code.length !== 2) return '🌐';
    const codePoints = iso2Code
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

/**
 * CountryPickerModal - A reusable modal component for selecting countries
 * 
 * @param {boolean} visible - Controls the visibility of the modal
 * @param {function} onClose - Callback function when modal is closed
 * @param {array} countryCodes - Array of country objects with structure: { code, country, flag, name, id }
 * @param {object} selectedCountry - Currently selected country object
 * @param {function} onSelectCountry - Callback function when a country is selected: (country) => void
 * @param {string} title - Modal title (default: "Select Country")
 * @param {number} maxHeight - Maximum height of the modal as percentage of screen height (default: 0.7)
 * @param {string} selectedItemBackgroundColor - Background color for selected item (default: '#EFF6FF' - blue-50)
 * @param {string} selectedItemTextColor - Text color for selected item checkmark (default: '#3B82F6')
 */
const CountryPickerModal = ({
    visible = false,
    onClose,
    countryCodes = [],
    selectedCountry = null,
    onSelectCountry,
    title = 'Select Country',
    maxHeight = 0.7,
    selectedItemBackgroundColor,
    selectedItemTextColor,
}) => {
    const { isSmall, isLarge } = useResponsiveSize();
    const { isDark } = useTheme();
    const theme = getThemeColors(isDark);

    // State for search filter
    const [searchQuery, setSearchQuery] = useState('');

    // استفاده از props یا رنگ پیش‌فرض از theme
    const finalSelectedBgColor = selectedItemBackgroundColor || theme.selected;
    const finalSelectedTextColor = selectedItemTextColor || theme.selectedText;

    // Filter countries based on search query
    const filteredCountries = useMemo(() => {
        if (!searchQuery.trim()) {
            return countryCodes;
        }
        const query = searchQuery.toLowerCase().trim();
        return countryCodes.filter((item) => {
            const countryName = (item.country || '').toLowerCase();
            const countryCode = (item.code || '').toLowerCase();
            const countryNameAlt = (item.name || '').toLowerCase();
            return countryName.includes(query) || 
                   countryCode.includes(query) || 
                   countryNameAlt.includes(query);
        });
    }, [countryCodes, searchQuery]);

    // Reset search when modal closes
    useEffect(() => {
        if (!visible) {
            setSearchQuery('');
        }
    }, [visible]);

    const handleSelectCountry = (country) => {
        if (onSelectCountry) {
            onSelectCountry(country);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            presentationStyle="overFullScreen"
            onRequestClose={onClose}
        >
            <View className="flex-1" style={{ backgroundColor: 'transparent' }}>
                <TouchableOpacity
                    className="flex-1"
                    activeOpacity={1}
                    onPress={onClose}
                />
                <View
                    style={{
                        backgroundColor: theme.modal,
                        maxHeight: height * maxHeight,
                        borderTopLeftRadius: isSmall ? 18 : isLarge ? 28 : 24,
                        borderTopRightRadius: isSmall ? 18 : isLarge ? 28 : 24,
                    }}
                >
                    {/* Modal Header */}
                    <View
                        className="flex-row items-center justify-between"
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: theme.border,
                            paddingHorizontal: isSmall ? 20 : isLarge ? 28 : 24,
                            paddingVertical: isSmall ? 16 : isLarge ? 24 : 20,
                        }}
                    >
                        <Text
                            className="font-bold font-montserrat flex-1"
                            style={{ 
                                fontSize: isSmall ? 16 : isLarge ? 22 : 20,
                                color: theme.textPrimary,
                            }}
                        >
                            {title}
                        </Text>
                        <TouchableOpacity
                            onPress={onClose}
                            className="rounded-full"
                            style={{ 
                                backgroundColor: theme.buttonDefault,
                                padding: isSmall ? 6 : isLarge ? 10 : 8,
                            }}
                        >
                            <Ionicons 
                                name="close" 
                                size={isSmall ? 20 : isLarge ? 28 : 24} 
                                color={theme.buttonDefaultText} 
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Search Input */}
                    <View
                        style={{
                            paddingHorizontal: isSmall ? 20 : isLarge ? 28 : 24,
                            paddingVertical: isSmall ? 12 : isLarge ? 16 : 14,
                            borderBottomWidth: 1,
                            borderBottomColor: theme.borderLight,
                        }}
                    >
                        <View
                            className="flex-row items-center"
                            style={{
                                backgroundColor: theme.inputBackground || theme.buttonDefault,
                                borderRadius: isSmall ? 10 : isLarge ? 14 : 12,
                                paddingHorizontal: isSmall ? 12 : isLarge ? 16 : 14,
                                paddingVertical: isSmall ? 10 : isLarge ? 14 : 12,
                            }}
                        >
                            <Ionicons
                                name="search"
                                size={isSmall ? 18 : isLarge ? 24 : 20}
                                color={theme.textSecondary}
                                style={{ marginRight: isSmall ? 8 : isLarge ? 12 : 10 }}
                            />
                            <TextInput
                                placeholder="Search country..."
                                placeholderTextColor={theme.textSecondary}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                style={{
                                    flex: 1,
                                    fontSize: isSmall ? 14 : isLarge ? 18 : 16,
                                    color: theme.textPrimary,
                                    fontFamily: 'Montserrat',
                                }}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity
                                    onPress={() => setSearchQuery('')}
                                    style={{ marginLeft: isSmall ? 8 : isLarge ? 12 : 10 }}
                                >
                                    <Ionicons
                                        name="close-circle"
                                        size={isSmall ? 18 : isLarge ? 24 : 20}
                                        color={theme.textSecondary}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Country List */}
                    <FlatList
                        data={filteredCountries}
                        keyExtractor={(item) => item.name || item.id?.toString() || item.code}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const isSelected = selectedCountry?.name === item.name || selectedCountry?.code === item.code;
                            return (
                                <TouchableOpacity
                                    onPress={() => handleSelectCountry(item)}
                                    className="flex-row items-center"
                                    activeOpacity={0.7}
                                    style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: theme.borderLight,
                                        paddingHorizontal: isSmall ? 20 : isLarge ? 28 : 24,
                                        paddingVertical: isSmall ? 12 : isLarge ? 20 : 16,
                                        backgroundColor: isSelected ? finalSelectedBgColor : theme.modal,
                                    }}
                                >
                                    <Text 
                                        style={{ 
                                            fontSize: isSmall ? 24 : isLarge ? 36 : 30, 
                                            marginRight: isSmall ? 10 : isLarge ? 14 : 12,
                                        }}
                                    >
                                        {item.flag || getCountryFlag(item.name)}
                                    </Text>
                                    <View className="flex-1">
                                        <Text
                                            className="font-semibold font-montserrat"
                                            style={{ 
                                                fontSize: isSmall ? 13 : isLarge ? 18 : 16,
                                                color: theme.textPrimary,
                                            }}
                                        >
                                            {item.country}
                                        </Text>
                                        <Text
                                            className="font-montserrat"
                                            style={{ 
                                                fontSize: isSmall ? 12 : isLarge ? 16 : 14,
                                                color: theme.textSecondary,
                                            }}
                                        >
                                            {item.code}
                                        </Text>
                                    </View>
                                    {isSelected && (
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={isSmall ? 20 : isLarge ? 28 : 24}
                                            color={finalSelectedTextColor}
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default CountryPickerModal;
