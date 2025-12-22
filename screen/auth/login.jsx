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
import { Button } from '../../components/Button';
import { ScreenWrapper } from '../../components/ScreenWrapper';
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
    const responsiveSizes = useResponsiveSize('login');

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
                    <View className="flex-1" style={{ paddingHorizontal: responsiveSizes.containerPaddingHorizontal, paddingTop: responsiveSizes.containerPaddingTop, paddingBottom: responsiveSizes.containerPaddingBottom }}>
                        {/* Logo and Brand Section */}
                        <View style={{ marginBottom: responsiveSizes.marginLarge }}>
                            {/* Inline brand row (single logo use) */}
                            <View className="flex-row items-center" style={{ marginBottom: responsiveSizes.marginMedium }}>
                                <LinearGradient
                                    colors={[
                                        'rgba(11, 95, 255, 0.52)', // align with background blue
                                        'rgba(11, 95, 255, 0.32)',
                                    ]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        padding: responsiveSizes.logoPadding,
                                        borderRadius: responsiveSizes.logoOuterBorderRadius,
                                        marginRight: responsiveSizes.marginMedium,
                                        shadowColor: '#0B1B3A',
                                        shadowOffset: { width: 0, height: 6 },
                                        shadowOpacity: 0.28,
                                        shadowRadius: responsiveSizes.logoShadowRadius,
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
                                            width: responsiveSizes.logoContainerSize,
                                            height: responsiveSizes.logoContainerSize,
                                            borderRadius: responsiveSizes.logoBorderRadius,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: responsiveSizes.logoBorderWidth,
                                            borderColor: 'rgba(255, 255, 255, 0.26)',
                                        }}
                                    >
                                        <Image 
                                            source={LOGO_IMAGE}
                                            style={{ 
                                                width: responsiveSizes.logoImageSize, 
                                                height: responsiveSizes.logoImageSize,
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
                                            fontSize: responsiveSizes.brandFontSize,
                                            color: '#FFFFFF',
                                            letterSpacing: responsiveSizes.brandLetterSpacing,
                                        }}
                                    >
                                        TALKOOK
                                    </Text>
                                    <View className="flex-row items-center" style={{ marginTop: responsiveSizes.marginTopSmall }}>
                                        <View 
                                            style={{
                                                width: responsiveSizes.brandLineWidth,
                                                height: responsiveSizes.brandLineHeight,
                                                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                                                borderRadius: 999,
                                                marginRight: responsiveSizes.marginSmall,
                                            }}
                                        />
                                        <Text 
                                            className="font-montserrat" 
                                            style={{ 
                                                fontSize: responsiveSizes.brandSubtitleFontSize,
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
                                    fontSize: responsiveSizes.subtitleFontSize,
                                    paddingRight: responsiveSizes.subtitlePaddingRight,
                                    color: palette.textSecondary,
                                    lineHeight: responsiveSizes.subtitleLineHeight,
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
                        {/* <PrimaryButton
                            title="Send OTP Message"
                            disabled={!isValidPhone || (showIsLoading && !hasBackendData)}
                            onPress={handleContinuePress}
                            primaryColor={palette.primary}
                            style={{ marginBottom: responsiveSizes.marginLarge }}
                        /> */}

                        {/* OR Divider */}
                        <View className="flex-row items-center" style={{ marginBottom: responsiveSizes.marginLarge }}>
                            <View className="flex-1 bg-white/30" style={{ height: responsiveSizes.dividerHeight }} />
                            <View 
                                className="bg-white/10 rounded-full border border-white/20" 
                                style={{ 
                                    paddingHorizontal: responsiveSizes.dividerPaddingHorizontal,
                                    paddingVertical: responsiveSizes.dividerPaddingVertical,
                                    marginHorizontal: responsiveSizes.dividerMarginHorizontal,
                                }}
                            >
                                <Text 
                                    className="text-white/80 font-bold font-montserrat" 
                                    style={{ fontSize: responsiveSizes.dividerFontSize }}
                                >
                                    OR
                                </Text>
                            </View>
                            <View className="flex-1 bg-white/30" style={{ height: responsiveSizes.dividerHeight }} />
                        </View>

                        {/* Alternative Login Methods */}
                        <View style={{ gap: responsiveSizes.gapMedium }}>
                            {/* Top Row - Email and Google */}
                            <View style={{ flexDirection: 'row', gap: responsiveSizes.gapSmall }}>
                                {/* Email Button */}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={{
                                        paddingVertical: responsiveSizes.buttonPaddingVertical,
                                        paddingHorizontal: responsiveSizes.buttonPaddingHorizontal,
                                        borderRadius: responsiveSizes.buttonBorderRadius,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        borderWidth: responsiveSizes.buttonBorderWidth,
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: responsiveSizes.buttonShadowRadius,
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
                                            borderRadius: responsiveSizes.buttonIconBorderRadius,
                                            padding: responsiveSizes.buttonIconPadding,
                                            marginRight: responsiveSizes.marginSmall,
                                        }}
                                    >
                                        <Ionicons 
                                            name="mail" 
                                            size={responsiveSizes.buttonIconSize} 
                                            color="#FFFFFF" 
                                        />
                                    </LinearGradient>
                                    <Text 
                                        className="text-white font-bold font-montserrat flex-1" 
                                        numberOfLines={1}
                                        style={{ 
                                            fontSize: responsiveSizes.buttonFontSize,
                                            color: 'rgba(255, 255, 255, 1)',
                                        }}
                                    >
                                        Email
                                    </Text>
                                    <Ionicons 
                                        name="chevron-forward" 
                                        size={responsiveSizes.buttonChevronSize} 
                                        color="rgba(255, 255, 255, 0.9)" 
                                    />
                                </TouchableOpacity>

                                {/* Google Button */}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={{
                                        paddingVertical: responsiveSizes.buttonPaddingVertical,
                                        paddingHorizontal: responsiveSizes.buttonPaddingHorizontal,
                                        borderRadius: responsiveSizes.buttonBorderRadius,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        borderWidth: responsiveSizes.buttonBorderWidth,
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: responsiveSizes.buttonShadowRadius,
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
                                            borderRadius: responsiveSizes.buttonIconBorderRadius,
                                            padding: responsiveSizes.buttonIconPadding,
                                            marginRight: responsiveSizes.marginSmall,
                                        }}
                                    >
                                        <Ionicons 
                                            name="logo-google" 
                                            size={responsiveSizes.buttonIconSize} 
                                            color="#FFFFFF" 
                                        />
                                    </LinearGradient>
                                    <Text 
                                        className="text-white font-bold font-montserrat flex-1" 
                                        numberOfLines={1}
                                        style={{ 
                                            fontSize: responsiveSizes.buttonFontSize,
                                            color: 'rgba(255, 255, 255, 1)',
                                        }}
                                    >
                                        Google
                                    </Text>
                                    <Ionicons 
                                        name="chevron-forward" 
                                        size={responsiveSizes.buttonChevronSize} 
                                        color="rgba(255, 255, 255, 0.9)" 
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Bottom Row - Apple and Facebook */}
                            <View style={{ flexDirection: 'row', gap: responsiveSizes.gapSmall }}>
                                {/* Apple Button */}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={{
                                        paddingVertical: responsiveSizes.buttonPaddingVertical,
                                        paddingHorizontal: responsiveSizes.buttonPaddingHorizontal,
                                        borderRadius: responsiveSizes.buttonBorderRadius,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        borderWidth: responsiveSizes.buttonBorderWidth,
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: responsiveSizes.buttonShadowRadius,
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
                                            borderRadius: responsiveSizes.buttonIconBorderRadius,
                                            padding: responsiveSizes.buttonIconPadding,
                                            marginRight: responsiveSizes.marginSmall,
                                        }}
                                    >
                                        <Ionicons 
                                            name="logo-apple" 
                                            size={responsiveSizes.buttonIconSize} 
                                            color="#FFFFFF" 
                                        />
                                    </LinearGradient>
                                    <Text 
                                        className="text-white font-bold font-montserrat flex-1" 
                                        numberOfLines={1}
                                        style={{ 
                                            fontSize: responsiveSizes.buttonFontSize,
                                            color: 'rgba(255, 255, 255, 1)',
                                        }}
                                    >
                                        Apple
                                    </Text>
                                    <Ionicons 
                                        name="chevron-forward" 
                                        size={responsiveSizes.buttonChevronSize} 
                                        color="rgba(255, 255, 255, 0.9)" 
                                    />
                                </TouchableOpacity>

                                {/* Facebook Button */}
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={{
                                        paddingVertical: responsiveSizes.buttonPaddingVertical,
                                        paddingHorizontal: responsiveSizes.buttonPaddingHorizontal,
                                        borderRadius: responsiveSizes.buttonBorderRadius,
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        borderWidth: responsiveSizes.buttonBorderWidth,
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: responsiveSizes.buttonShadowRadius,
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
                                            borderRadius: responsiveSizes.buttonIconBorderRadius,
                                            padding: responsiveSizes.buttonIconPadding,
                                            marginRight: responsiveSizes.marginSmall,
                                        }}
                                    >
                                        <Ionicons 
                                            name="logo-facebook" 
                                            size={responsiveSizes.buttonIconSize} 
                                            color="#FFFFFF" 
                                        />
                                    </LinearGradient>
                                    <Text 
                                        className="text-white font-bold font-montserrat flex-1" 
                                        numberOfLines={1}
                                        style={{ 
                                            fontSize: responsiveSizes.buttonFontSize,
                                            color: 'rgba(255, 255, 255, 1)',
                                        }}
                                    >
                                        Facebook
                                    </Text>
                                    <Ionicons 
                                        name="chevron-forward" 
                                        size={responsiveSizes.buttonChevronSize} 
                                        color="rgba(255, 255, 255, 0.9)" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Footer Text */}
                        <View className="mt-auto" style={{ paddingTop: responsiveSizes.footerPaddingTop }}>
                            <Text 
                                className="text-center font-montserrat" 
                                style={{ 
                                    fontSize: responsiveSizes.footerFontSize,
                                    lineHeight: responsiveSizes.footerLineHeight,
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