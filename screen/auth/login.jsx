// ============================================
// 📚 React Libraries
// ============================================
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Image, BackHandler, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useTheme } from '../../hooks/useTheme';
import { useResponsiveSize } from '../../hooks/useResponsiveSize';
import { Button } from '../../components/public/Button';
import { ScreenWrapper } from '../../components/public/ScreenWrapper';
import { palette } from '../../theme/constants';


import { superPublicMultipleData } from '../../store/superPublic/superPublicSlice';




// Background image path
const BACKGROUND_IMAGE = require('../../assets/image/background/background-bg.png');
// Logo image path
const LOGO_IMAGE = require('../../assets/image/logo/bOnlinepngtools.png');



const defaultCountryCodes = [
    { code: '+1', country: 'USA', flag: '🇺🇸', name: 'US' },
    { code: '+44', country: 'UK', flag: '🇬🇧', name: 'GB' },
    { code: '+971', country: 'UAE', flag: '🇦🇪', name: 'AE' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷', name: 'TR' },
    { code: '+98', country: 'Iran', flag: '🇮🇷', name: 'IR' },
];


const getCountryFlag = (iso2Code) => {
    if (!iso2Code || iso2Code.length !== 2) return '🌐';
    const codePoints = iso2Code
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};


const transformPhoneSuffixes = (phoneSuffixes) => {
    if (!phoneSuffixes || !Array.isArray(phoneSuffixes) || phoneSuffixes.length === 0) {
        return [];
    }
    
    return phoneSuffixes
        .filter(item => item.phonePrefix && item.iso2Code) // Filter out invalid entries
        .map(item => ({
            code: item.phonePrefix,
            country: item.englishName || item.name || 'Unknown',
            flag: getCountryFlag(item.iso2Code),
            name: item.iso2Code,
            id: item.id,
        }))
        .sort((a, b) => {
            // Sort by country name alphabetically
            return a.country.localeCompare(b.country);
        });
};


const LoginScreen = () => {


    const navigation = useNavigation();
    const dispatch = useDispatch();


    const [isValidPhone, setIsValidPhone] = useState(false);
    const [parsedPhone, setParsedPhone] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [phoneDigits, setPhoneDigits] = useState('');
    const { isSmall, isLarge } = useResponsiveSize();

    const { showPhoneSuffixes, showIsLoading } = useSelector(
        (state) => ({
          showPhoneSuffixes: state.superPublic.phoneSuffixes,
          showIsLoading: state.superPublic.loadingStates.PHONE_SUFFIXES.GET,
        }),
        shallowEqual
      );


      const countryCodes = useMemo(() => {
        const transformed = transformPhoneSuffixes(showPhoneSuffixes);
        return transformed.length > 0 ? transformed : defaultCountryCodes;
    }, [showPhoneSuffixes]);

    const hasBackendData = useMemo(() => {
        return showPhoneSuffixes && Array.isArray(showPhoneSuffixes) && showPhoneSuffixes.length > 0;
    }, [showPhoneSuffixes]);


    useEffect(() => {
        dispatch(superPublicMultipleData({
            requests: {
                phoneSuffixes: {
                    method: 'GET',
                    shouldFetch: true,                
                },
            },
        }));
    }, [dispatch]);




    useFocusEffect(
        React.useCallback(() => {
            const handleBackPress = () => {
                navigation.navigate('Welcome');
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => subscription.remove();
        }, [navigation])
    );


    const handlePhoneChange = (phoneNumber, isValid, parsedPhoneObj, validationData) => {
        setIsValidPhone(isValid);
        setParsedPhone(parsedPhoneObj);
        setPhoneDigits(validationData?.phoneDigits || '');
    };



    const handleCountryChange = (country) => {
        setSelectedCountry(country);
    };



    const handleContinuePress = () => {
        if (parsedPhone?.isValid() && !(showIsLoading && !hasBackendData) && selectedCountry) {
            const e164Number = parsedPhone.number || `${selectedCountry.code}${phoneDigits}`;
            navigation.navigate('VerifyPhone', {
                phoneNumber: e164Number,
                countryCode: selectedCountry.code,
            });
        }
    };


    return (
<ScreenWrapper>
<ImageBackground 
                source={BACKGROUND_IMAGE}
                className="flex-1"
                resizeMode="cover"
            >
                {/* Gradient overlay - richer depth for readability */}
                <LinearGradient
                    colors={[
                        palette.primary,
                        'rgba(10, 70, 212, 0.85)',
                        'rgba(11, 27, 58, 0.92)',
                    ]}
                    locations={[0, 0.5, 1]}
                    className="flex-1"
                >
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView 
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1" style={{ paddingHorizontal: isSmall ? 28 : isLarge ? 36 : 32, paddingTop: isSmall ? 28 : isLarge ? 36 : 32, paddingBottom: isSmall ? 28 : isLarge ? 36 : 32 }}>
                        {/* Logo and Brand Section */}
                        <View style={{ marginBottom: isSmall ? 28 : isLarge ? 36 : 32 }}>
                            {/* Inline brand row (single logo use) */}
                            <View className="flex-row items-center" style={{ marginBottom: isSmall ? 10 : isLarge ? 14 : 12 }}>
                                <LinearGradient
                                    colors={[
                                        'rgba(11, 95, 255, 0.52)', // align with background blue
                                        'rgba(11, 95, 255, 0.32)',
                                    ]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        padding: isSmall ? 5 : isLarge ? 7 : 6,
                                        borderRadius: isSmall ? 30 : isLarge ? 38 : 34,
                                        marginRight: isSmall ? 10 : isLarge ? 14 : 12,
                                        shadowColor: '#0B1B3A',
                                        shadowOffset: { width: 0, height: 6 },
                                        shadowOpacity: 0.28,
                                        shadowRadius: isSmall ? 12 : isLarge ? 16 : 14,
                                        elevation: 8,
                                    }}
                                >
                                    <LinearGradient
                                        colors={[
                                            'rgba(255, 255, 255, 0.24)',
                                            'rgba(11, 95, 255, 0.55)',
                                        ]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            width: isSmall ? 54 : isLarge ? 66 : 60,
                                            height: isSmall ? 54 : isLarge ? 66 : 60,
                                            borderRadius: isSmall ? 27 : isLarge ? 33 : 30,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: isSmall ? 1.3 : isLarge ? 1.7 : 1.5,
                                            borderColor: 'rgba(255, 255, 255, 0.26)',
                                        }}
                                    >
                                        <Image 
                                            source={LOGO_IMAGE}
                                            style={{ 
                                                width: isSmall ? 40 : isLarge ? 50 : 45, 
                                                height: isSmall ? 40 : isLarge ? 50 : 45,
                                                tintColor: '#FFFFFF',
                                            }}
                                            resizeMode="contain"
                                        />
                                    </LinearGradient>
                                </LinearGradient>

                                <View style={{ flex: 1 }}>
                                    <Text 
                                        style={{ 
                                            fontFamily: 'DaysOne',
                                            fontSize: isSmall ? 20 : isLarge ? 28 : 26,
                                            color: '#FFFFFF',
                                            letterSpacing: isSmall ? 1.3 : isLarge ? 1.7 : 1.5,
                                        }}
                                    >
                                        TALKOOK
                                    </Text>
                                    <View className="flex-row items-center" style={{ marginTop: isSmall ? 6 : isLarge ? 10 : 8 }}>
                                        <View 
                                            style={{
                                                width: isSmall ? 20 : isLarge ? 24 : 22,
                                                height: isSmall ? 1.8 : isLarge ? 2.2 : 2,
                                                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                                                borderRadius: 999,
                                                marginRight: isSmall ? 6 : isLarge ? 10 : 8,
                                            }}
                                        />
                                        <Text 
                                            className="font-montserrat" 
                                            style={{ 
                                                fontSize: isSmall ? 11 : isLarge ? 14 : 13,
                                                color: palette.textSecondary,
                                            }}
                                        >
                                            Learn, chat, and grow with a global community
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Subtitle */}
                            <Text 
                                className="font-montserrat" 
                                style={{ 
                                    fontSize: isSmall ? 11 : isLarge ? 15 : 14,
                                    paddingRight: isSmall ? 42 : isLarge ? 54 : 48,
                                    color: palette.textSecondary,
                                    lineHeight: isSmall ? 18 : isLarge ? 22 : 20,
                                }}
                            >
                                Start your language learning journey
                            </Text>
                        </View>

                        {/* Phone Number Input Section */}
                        {/* <PhoneNumberInput
                            countryCodes={countryCodes}
                            onPhoneChange={handlePhoneChange}
                            onCountryChange={handleCountryChange}
                            placeholder={showIsLoading && !hasBackendData ? "Loading..." : "212 345 6789"}
                            label="Phone Number"
                            disabled={showIsLoading && !hasBackendData}
                        /> */}

                        {/* Continue Button */}
                        <Button
                            variant="normal"
                            text="Send OTP Message"
                            disabled={!isValidPhone || (showIsLoading && !hasBackendData)}
                            loading={showIsLoading && !hasBackendData}
                            onPress={handleContinuePress}
                            style={{ marginBottom: isSmall ? 28 : isLarge ? 36 : 32, width: '100%' }}
                            forceTheme="light"
                        />

                        {/* OR Divider */}
                        <View className="flex-row items-center" style={{ marginBottom: isSmall ? 28 : isLarge ? 36 : 32 }}>
                            <View className="flex-1 bg-white/30" style={{ height: isSmall ? 1.3 : isLarge ? 1.7 : 1.5 }} />
                            <View 
                                className="bg-white/10 rounded-full border border-white/20" 
                                style={{ 
                                    paddingHorizontal: isSmall ? 20 : isLarge ? 28 : 24,
                                    paddingVertical: isSmall ? 7 : isLarge ? 9 : 8,
                                    marginHorizontal: isSmall ? 10 : isLarge ? 14 : 12,
                                }}
                            >
                                <Text 
                                    className="text-white/80 font-bold font-montserrat" 
                                    style={{ fontSize: isSmall ? 11 : isLarge ? 15 : 14 }}
                                >
                                    OR
                                </Text>
                            </View>
                            <View className="flex-1 bg-white/30" style={{ height: isSmall ? 1.3 : isLarge ? 1.7 : 1.5 }} />
                        </View>

                        {/* Alternative Login Methods */}
                        <View style={{ gap: isSmall ? 14 : isLarge ? 18 : 16 }}>
                            {/* Top Row - Email and Google */}
                            <View style={{ flexDirection: 'row', gap: isSmall ? 10 : isLarge ? 14 : 12 }}>
                                {/* Email Button */}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={{
                                        paddingVertical: isSmall ? 18 : isLarge ? 22 : 20,
                                        paddingHorizontal: isSmall ? 14 : isLarge ? 18 : 16,
                                        borderRadius: isSmall ? 14 : isLarge ? 18 : 16,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        borderWidth: isSmall ? 1.8 : isLarge ? 2.2 : 2,
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: isSmall ? 7 : isLarge ? 9 : 8,
                                        elevation: 4,
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#667EEA', '#764BA2']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            borderRadius: isSmall ? 10 : isLarge ? 14 : 12,
                                            padding: isSmall ? 7 : isLarge ? 9 : 8,
                                            marginRight: isSmall ? 6 : isLarge ? 10 : 8,
                                        }}
                                    >
                                        <Ionicons 
                                            name="mail" 
                                            size={isSmall ? 18 : isLarge ? 22 : 20} 
                                            color="#FFFFFF" 
                                        />
                                    </LinearGradient>
                                    <Text 
                                        className="text-white font-bold font-montserrat flex-1" 
                                        numberOfLines={1}
                                        style={{ 
                                            fontSize: isSmall ? 11 : isLarge ? 15 : 14,
                                            color: 'rgba(255, 255, 255, 1)',
                                        }}
                                    >
                                        Email
                                    </Text>
                                    <Ionicons 
                                        name="chevron-forward" 
                                            size={isSmall ? 16 : isLarge ? 20 : 18} 
                                        color="rgba(255, 255, 255, 0.9)" 
                                    />
                                </TouchableOpacity>

                                {/* Google Button */}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={{
                                        paddingVertical: isSmall ? 18 : isLarge ? 22 : 20,
                                        paddingHorizontal: isSmall ? 14 : isLarge ? 18 : 16,
                                        borderRadius: isSmall ? 14 : isLarge ? 18 : 16,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        borderWidth: isSmall ? 1.8 : isLarge ? 2.2 : 2,
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: isSmall ? 7 : isLarge ? 9 : 8,
                                        elevation: 4,
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#EA4335', '#DC3545']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            borderRadius: isSmall ? 10 : isLarge ? 14 : 12,
                                            padding: isSmall ? 7 : isLarge ? 9 : 8,
                                            marginRight: isSmall ? 6 : isLarge ? 10 : 8,
                                        }}
                                    >
                                        <Ionicons 
                                            name="logo-google" 
                                            size={isSmall ? 18 : isLarge ? 22 : 20} 
                                            color="#FFFFFF" 
                                        />
                                    </LinearGradient>
                                    <Text 
                                        className="text-white font-bold font-montserrat flex-1" 
                                        numberOfLines={1}
                                        style={{ 
                                            fontSize: isSmall ? 11 : isLarge ? 15 : 14,
                                            color: 'rgba(255, 255, 255, 1)',
                                        }}
                                    >
                                        Google
                                    </Text>
                                    <Ionicons 
                                        name="chevron-forward" 
                                            size={isSmall ? 16 : isLarge ? 20 : 18} 
                                        color="rgba(255, 255, 255, 0.9)" 
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Bottom Row - Apple and Facebook */}
                            <View style={{ flexDirection: 'row', gap: isSmall ? 10 : isLarge ? 14 : 12 }}>
                                {/* Apple Button */}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={{
                                        paddingVertical: isSmall ? 18 : isLarge ? 22 : 20,
                                        paddingHorizontal: isSmall ? 14 : isLarge ? 18 : 16,
                                        borderRadius: isSmall ? 14 : isLarge ? 18 : 16,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        borderWidth: isSmall ? 1.8 : isLarge ? 2.2 : 2,
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: isSmall ? 7 : isLarge ? 9 : 8,
                                        elevation: 4,
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#000000', '#333333']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            borderRadius: isSmall ? 10 : isLarge ? 14 : 12,
                                            padding: isSmall ? 7 : isLarge ? 9 : 8,
                                            marginRight: isSmall ? 6 : isLarge ? 10 : 8,
                                        }}
                                    >
                                        <Ionicons 
                                            name="logo-apple" 
                                            size={isSmall ? 18 : isLarge ? 22 : 20} 
                                            color="#FFFFFF" 
                                        />
                                    </LinearGradient>
                                    <Text 
                                        className="text-white font-bold font-montserrat flex-1" 
                                        numberOfLines={1}
                                        style={{ 
                                            fontSize: isSmall ? 11 : isLarge ? 15 : 14,
                                            color: 'rgba(255, 255, 255, 1)',
                                        }}
                                    >
                                        Apple
                                    </Text>
                                    <Ionicons 
                                        name="chevron-forward" 
                                            size={isSmall ? 16 : isLarge ? 20 : 18} 
                                        color="rgba(255, 255, 255, 0.9)" 
                                    />
                                </TouchableOpacity>

                                {/* Facebook Button */}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={{
                                        paddingVertical: isSmall ? 18 : isLarge ? 22 : 20,
                                        paddingHorizontal: isSmall ? 14 : isLarge ? 18 : 16,
                                        borderRadius: isSmall ? 14 : isLarge ? 18 : 16,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        borderWidth: isSmall ? 1.8 : isLarge ? 2.2 : 2,
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: isSmall ? 7 : isLarge ? 9 : 8,
                                        elevation: 4,
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#1877F2', '#0A5FCC']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            borderRadius: isSmall ? 10 : isLarge ? 14 : 12,
                                            padding: isSmall ? 7 : isLarge ? 9 : 8,
                                            marginRight: isSmall ? 6 : isLarge ? 10 : 8,
                                        }}
                                    >
                                        <Ionicons 
                                            name="logo-facebook" 
                                            size={isSmall ? 18 : isLarge ? 22 : 20} 
                                            color="#FFFFFF" 
                                        />
                                    </LinearGradient>
                                    <Text 
                                        className="text-white font-bold font-montserrat flex-1" 
                                        numberOfLines={1}
                                        style={{ 
                                            fontSize: isSmall ? 11 : isLarge ? 15 : 14,
                                            color: 'rgba(255, 255, 255, 1)',
                                        }}
                                    >
                                        Facebook
                                    </Text>
                                    <Ionicons 
                                        name="chevron-forward" 
                                            size={isSmall ? 16 : isLarge ? 20 : 18} 
                                        color="rgba(255, 255, 255, 0.9)" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Footer Text */}
                        <View className="mt-auto" style={{ paddingTop: isSmall ? 28 : isLarge ? 36 : 32 }}>
                            <Text 
                                className="text-center font-montserrat" 
                                style={{ 
                                    fontSize: isSmall ? 11 : isLarge ? 15 : 14,
                                    lineHeight: isSmall ? 18 : isLarge ? 22 : 20,
                                    color: palette.textSecondary,
                                }}
                            >
                                By continuing, you agree to our{'\n'}
                                <Text style={{ color: palette.textPrimary, fontWeight: '600' }}>Terms of Service</Text>
                                {' & '}
                                <Text style={{ color: palette.textPrimary, fontWeight: '600' }}>Privacy Policy</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
                </LinearGradient>
            </ImageBackground>
</ScreenWrapper>

    )
}

export default LoginScreen;