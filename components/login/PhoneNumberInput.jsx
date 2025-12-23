import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import parsePhoneNumber, { validatePhoneNumberLength } from 'libphonenumber-js';
import { useResponsiveSize } from '../../hooks/useResponsiveSize';
import { useTheme } from '../../hooks/useTheme';
import { getThemeColors } from '../../theme/constants';
import CountryPickerModal from './CountryPickerModal';

// Helper function to convert ISO2 code to flag emoji
const getCountryFlag = (iso2Code) => {
    if (!iso2Code || iso2Code.length !== 2) return '🌐';
    const codePoints = iso2Code
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

// Default country codes (fallback)
const DEFAULT_COUNTRY_CODE = 'US';
const DEFAULT_COUNTRY_PHONE_PREFIX = '+1';
const defaultCountryCodes = [
    { code: '+1', country: 'USA', flag: '🇺🇸', name: 'US' },
    { code: '+44', country: 'UK', flag: '🇬🇧', name: 'GB' },
    { code: '+971', country: 'UAE', flag: '🇦🇪', name: 'AE' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷', name: 'TR' },
    { code: '+98', country: 'Iran', flag: '🇮🇷', name: 'IR' },
];

/**
 * PhoneNumberInput - A reusable phone number input component with country code picker and validation
 * 
 * @param {array} countryCodes - Array of country objects with structure: { code, country, flag, name, id }
 * @param {function} onPhoneChange - Callback when phone number changes: (phoneNumber, isValid, parsedPhone) => void
 * @param {function} onCountryChange - Callback when country changes: (country) => void
 * @param {string} placeholder - Placeholder text for input (default: "212 345 6789")
 * @param {string} label - Label text above input (default: "Phone Number")
 * @param {object} initialCountry - Initial selected country object
 * @param {string} initialPhoneNumber - Initial phone number value
 * @param {boolean} showValidationMessages - Show validation messages (default: true)
 * @param {boolean} disabled - Whether the input is disabled (default: false)
 * @param {object} style - Additional styles for container
 */
const PhoneNumberInput = ({
    countryCodes = [],
    onPhoneChange,
    onCountryChange,
    placeholder = '212 345 6789',
    label = 'Phone Number',
    initialCountry = null,
    initialPhoneNumber = '',
    showValidationMessages = true,
    disabled = false,
    style = {},
}) => {
    // Hooks for responsive sizing and theme
    const { isSmall, isLarge } = useResponsiveSize();
    const { isDark } = useTheme();
    const colors = getThemeColors(isDark);
    
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Use provided countryCodes or fallback to defaultCountryCodes
    const availableCountryCodes = useMemo(() => {
        return countryCodes.length > 0 ? countryCodes : defaultCountryCodes;
    }, [countryCodes]);

    // Set default selected country
    const [selectedCountry, setSelectedCountry] = useState(() => {
        if (initialCountry) {
            return initialCountry;
        }
        const defaultCountry = availableCountryCodes.find(
            c => c.name === DEFAULT_COUNTRY_CODE || c.code === DEFAULT_COUNTRY_PHONE_PREFIX
        );
        return defaultCountry || availableCountryCodes[0];
    });

    // Notify parent component of initial/default country selection
    useEffect(() => {
        if (selectedCountry && onCountryChange) {
            onCountryChange(selectedCountry);
        }
    }, []); // Only run once on mount to notify parent of default country

    // Update selected country when countryCodes change
    useEffect(() => {
        if (availableCountryCodes.length > 0 && countryCodes.length > 0) {
            const defaultCountry = availableCountryCodes.find(
                c => c.name === DEFAULT_COUNTRY_CODE || c.code === DEFAULT_COUNTRY_PHONE_PREFIX
            );
            const newDefault = defaultCountry || availableCountryCodes[0];
            if (newDefault && (!selectedCountry || selectedCountry.code !== newDefault.code)) {
                setSelectedCountry(newDefault);
                // Notify parent component when default country is set
                if (onCountryChange) {
                    onCountryChange(newDefault);
                }
            }
        }
    }, [availableCountryCodes, countryCodes.length]);

    // Format phone number: 3-3-4 (e.g., 912 345 6789)
    const formatPhoneNumber = (text) => {
        const numbers = text.replace(/\D/g, '');
        const limitedNumbers = numbers.slice(0, 15);
        
        if (limitedNumbers.length <= 3) {
            return limitedNumbers;
        } else if (limitedNumbers.length <= 6) {
            return `${limitedNumbers.slice(0, 3)} ${limitedNumbers.slice(3)}`;
        } else if (limitedNumbers.length <= 10) {
            return `${limitedNumbers.slice(0, 3)} ${limitedNumbers.slice(3, 6)} ${limitedNumbers.slice(6)}`;
        } else {
            return `${limitedNumbers.slice(0, 3)} ${limitedNumbers.slice(3, 6)} ${limitedNumbers.slice(6, 10)} ${limitedNumbers.slice(10)}`;
        }
    };

    const handlePhoneChange = (text) => {
        const numbers = text.replace(/\D/g, '');
        const fullPhoneNumber = `${selectedCountry.code}${numbers}`;
        
        // Check if the phone number is too long
        const lengthValidation = validatePhoneNumberLength(fullPhoneNumber, selectedCountry.name);
        
        // If too long, prevent further input
        if (lengthValidation === 'TOO_LONG') {
            return;
        }
        
        // Format and set only the numeric digits
        const formatted = formatPhoneNumber(numbers);
        setPhoneNumber(formatted);
    };

    // Validation logic - memoized to prevent infinite loops
    const phoneDigits = useMemo(() => phoneNumber.replace(/\D/g, ''), [phoneNumber]);
    const fullPhoneNumber = useMemo(() => 
        phoneDigits ? `${selectedCountry.code}${phoneDigits}` : '', 
        [phoneDigits, selectedCountry.code]
    );
    const parsedPhone = useMemo(() => 
        phoneDigits ? parsePhoneNumber(fullPhoneNumber, selectedCountry.name) : null,
        [fullPhoneNumber, selectedCountry.name, phoneDigits]
    );
    const hasMinimumDigits = useMemo(() => phoneDigits.length > 9, [phoneDigits]);
    const isValidPhone = useMemo(() => 
        Boolean(parsedPhone?.isValid()) && hasMinimumDigits,
        [parsedPhone, hasMinimumDigits]
    );
    const lengthValidation = useMemo(() => 
        phoneDigits ? validatePhoneNumberLength(fullPhoneNumber, selectedCountry.name) : undefined,
        [phoneDigits, fullPhoneNumber, selectedCountry.name]
    );

    // Notify parent component of changes - use ref to track previous values and prevent infinite loops
    const prevValuesRef = useRef({ phoneNumber, isValidPhone, phoneDigits });
    const onPhoneChangeRef = useRef(onPhoneChange);
    
    // Keep ref updated
    useEffect(() => {
        onPhoneChangeRef.current = onPhoneChange;
    }, [onPhoneChange]);
    
    useEffect(() => {
        // Only notify if values actually changed
        if (
            prevValuesRef.current.phoneNumber !== phoneNumber ||
            prevValuesRef.current.isValidPhone !== isValidPhone ||
            prevValuesRef.current.phoneDigits !== phoneDigits
        ) {
            if (onPhoneChangeRef.current) {
                onPhoneChangeRef.current(phoneNumber, isValidPhone, parsedPhone, {
                    phoneDigits,
                    fullPhoneNumber,
                    hasMinimumDigits,
                    lengthValidation,
                });
            }
            prevValuesRef.current = { phoneNumber, isValidPhone, phoneDigits };
        }
    }, [phoneNumber, isValidPhone, phoneDigits, parsedPhone, fullPhoneNumber, hasMinimumDigits, lengthValidation]);

    // Handle country selection
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        if (onCountryChange) {
            onCountryChange(country);
        }
    };

    // Get validation message
    const getValidationMessage = () => {
        if (!phoneDigits) return null;
        
        if (!hasMinimumDigits) {
            return {
                type: 'error',
                icon: 'alert-circle',
                message: 'Please enter a complete phone number',
            };
        }
        
        if (isValidPhone) {
            return {
                type: 'success',
                icon: 'checkmark-circle',
                message: 'Valid phone number',
            };
        }
        
        if (lengthValidation === 'TOO_LONG') {
            return {
                type: 'error',
                icon: 'alert-circle',
                message: 'Phone number is too long',
            };
        }
        
        if (lengthValidation === 'TOO_SHORT') {
            return {
                type: 'error',
                icon: 'alert-circle',
                message: 'Phone number is too short',
            };
        }
        
        return {
            type: 'error',
            icon: 'alert-circle',
            message: 'Invalid phone number format',
        };
    };

    const validationMessage = getValidationMessage();

    return (
        <View style={[{ marginBottom: isSmall ? 29 : isLarge ? 35 : 32 }, style]}>
            {label && (
                <Text
                    className="font-semibold font-montserrat"
                    style={{
                        fontSize: Math.max(13, isSmall ? 14 : isLarge ? 18 : 16),
                        marginBottom: isSmall ? 11 : isLarge ? 13 : 12,
                        marginLeft: isSmall ? 4 : isLarge ? 4 : 4,
                        color: colors.textOnGradient,
                    }}
                >
                    {label}
                </Text>
            )}
            
            <View
                className="rounded-2xl flex-row items-center border-2"
                style={{
                    borderColor: isFocused && !disabled ? colors.overlayWhite : colors.overlayMedium,
                    backgroundColor: disabled ? colors.overlayLight : colors.overlayLight,
                    shadowColor: colors.shadowColorLight,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    borderRadius: isSmall ? 14 : isLarge ? 18 : 16,
                    opacity: disabled ? 0.85 : 1,
                }}
            >
                {/* Country Code Picker Button */}
                <TouchableOpacity
                    onPress={() => !disabled && setShowCountryPicker(true)}
                    activeOpacity={0.7}
                    disabled={disabled}
                    className="rounded-xl flex-row items-center"
                    style={{
                        backgroundColor: colors.overlayMedium,
                        marginLeft: isSmall ? 11 : isLarge ? 13 : 12,
                        marginVertical: isSmall ? 11 : isLarge ? 13 : 12,
                        paddingHorizontal: isSmall ? 11 : isLarge ? 13 : 12,
                        paddingVertical: isSmall ? 9 : isLarge ? 11 : 10,
                        shadowColor: colors.shadowColorLight,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: isSmall ? 4 : isLarge ? 4 : 4,
                        elevation: 2,
                        borderRadius: isSmall ? 11 : isLarge ? 13 : 12,
                    }}
                >
                    <Text style={{ fontSize: isSmall ? 22 : isLarge ? 26 : 24, marginRight: isSmall ? 5 : isLarge ? 7 : 6 }}>
                        {selectedCountry.flag || getCountryFlag(selectedCountry.name)}
                    </Text>
                    <Text
                        className="font-semibold font-montserrat"
                        style={{
                            color: colors.overlayWhite,
                            fontSize: Math.max(14, isSmall ? 16 : isLarge ? 20 : 18),
                            marginRight: isSmall ? 4 : isLarge ? 4 : 4,
                        }}
                    >
                        {selectedCountry.code}
                    </Text>
                    <Ionicons name="chevron-down" size={isSmall ? 16 : isLarge ? 20 : 18} color={colors.overlayWhite} />
                </TouchableOpacity>

                {/* Phone Number Input */}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={colors.textSecondaryOnGradient}
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                    onFocus={() => !disabled && setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType="phone-pad"
                    inputMode="numeric"
                    maxLength={18}
                    cursorColor={colors.overlayWhite}
                    selectionColor={colors.overlayWhite + '40'}
                    editable={!disabled}
                    className="flex-1 font-montserrat"
                    style={{
                        color: colors.overlayWhite,
                        fontSize: Math.max(16, isSmall ? 18 : isLarge ? 22 : 20),
                        paddingHorizontal: isSmall ? 14 : isLarge ? 18 : 16,
                        paddingVertical: isSmall ? 18 : isLarge ? 22 : 20,
                    }}
                />
            </View>

            {/* Phone Validation Messages */}
            {showValidationMessages && (
                <View style={{ minHeight: isSmall ? 22 : isLarge ? 26 : 24, marginTop: isSmall ? 7 : isLarge ? 9 : 8, marginLeft: isSmall ? 4 : isLarge ? 4 : 4 }}>
                    {validationMessage && (
                        <View className="flex-row items-center">
                            <Ionicons
                                name={validationMessage.icon}
                                size={isSmall ? 14 : isLarge ? 18 : 16}
                                color={colors.textOnGradient}
                            />
                            <Text
                                className="font-montserrat font-semibold"
                                style={{
                                    fontSize: Math.max(11, isSmall ? 13 : isLarge ? 15 : 14),
                                    marginLeft: isSmall ? 5 : isLarge ? 7 : 6,
                                    color: colors.textOnGradient,
                                }}
                            >
                                {validationMessage.message}
                            </Text>
                        </View>
                    )}
                </View>
            )}

            {/* Country Picker Modal */}
            <CountryPickerModal
                visible={showCountryPicker}
                onClose={() => setShowCountryPicker(false)}
                countryCodes={availableCountryCodes}
                selectedCountry={selectedCountry}
                onSelectCountry={handleCountrySelect}
            />
        </View>
    );
};

export default PhoneNumberInput;
