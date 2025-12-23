import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { OtpInput } from 'react-native-otp-entry';
import { useTheme } from '../../hooks/useTheme';
import { useResponsiveSize } from '../../hooks/useResponsiveSize';
import { Button } from '../../components/public/Button';
import { ScreenWrapper } from '../../components/public/ScreenWrapper';
import { getThemeColors } from '../../theme/constants';

// Background image path
const BACKGROUND_IMAGE = require('../../assets/image/background/background-bg.png');
// Logo image path
const LOGO_IMAGE = require('../../assets/image/logo/bOnlinepngtools.png');

// Timer constants
const RESEND_TIMER_DURATION = 60; // seconds
const CODE_LENGTH = 5;


const formatPhoneNumber = (phoneNumber, countryCode) => {
    if (!phoneNumber) return 'Phone number unavailable';
    
    if (countryCode && phoneNumber.startsWith(countryCode)) {
        return phoneNumber;
    }
    
    return `${countryCode} ${phoneNumber}`.trim();
};



const VerifyPhoneScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { isSmall, isLarge } = useResponsiveSize();
    const { isDark } = useTheme();
    const theme = getThemeColors(isDark);

    const [code, setCode] = useState('');
    const [resendTimer, setResendTimer] = useState(RESEND_TIMER_DURATION);
    const [canResend, setCanResend] = useState(false);

    const phoneNumber = route.params?.phoneNumber || '';
    const countryCode = route.params?.countryCode || '+1';
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber, countryCode);

    const isCodeComplete = code.length === CODE_LENGTH;






    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => {
                setResendTimer(resendTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);



    useFocusEffect(
        React.useCallback(() => {
            const handleBackPress = () => {
                navigation.navigate('Login');
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => subscription.remove();
        }, [navigation])
    );


    const handleCodeFilled = (codeValue) => {
        setCode(codeValue);
        // Here you would verify the code with your API
        console.log('Verifying code:', codeValue);
    };

    // Handle code text change
    const handleCodeChange = (text) => {
        setCode(text);
    };

    const handleResend = () => {
        if (canResend) {
            setResendTimer(RESEND_TIMER_DURATION);
            setCanResend(false);
            setCode('');
            // Here you would call your API to resend the code
        }
    };

    // Handle verify code button press
    const handleVerifyPress = () => {
        if (isCodeComplete) {
            // Here you would verify the code with your API
            // navigation.navigate('NextScreen');
            handleCodeFilled(code);
        }
    };

    // Handle change phone number button press
    const handleChangePhonePress = () => {
        navigation.goBack();
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
                        theme.gradientStart,
                        theme.gradientMiddle,
                        theme.gradientEnd,
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
                                                theme.logoGradientStart,
                                                theme.logoGradientEnd,
                                            ]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{
                                                padding: isSmall ? 5 : isLarge ? 7 : 6,
                                                borderRadius: isSmall ? 30 : isLarge ? 38 : 34,
                                                marginRight: isSmall ? 10 : isLarge ? 14 : 12,
                                                shadowColor: theme.shadowColor,
                                                shadowOffset: { width: 0, height: 6 },
                                                shadowOpacity: 0.28,
                                                shadowRadius: isSmall ? 12 : isLarge ? 16 : 14,
                                                elevation: 8,
                                            }}
                                        >
                                            <LinearGradient
                                                colors={[
                                                    theme.logoInnerGradientStart,
                                                    theme.logoInnerGradientEnd,
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
                                                    borderColor: theme.logoBorder,
                                                }}
                                            >
                                                <Image 
                                                    source={LOGO_IMAGE}
                                                    style={{ 
                                                        width: isSmall ? 40 : isLarge ? 50 : 45, 
                                                        height: isSmall ? 40 : isLarge ? 50 : 45,
                                                        tintColor: theme.textOnGradient,
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
                                                    color: theme.textOnGradient,
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
                                                        backgroundColor: theme.overlayDark,
                                                        borderRadius: 999,
                                                        marginRight: isSmall ? 6 : isLarge ? 10 : 8,
                                                    }}
                                                />
                                                <Text 
                                                    className="font-montserrat" 
                                                    style={{ 
                                                        fontSize: isSmall ? 11 : isLarge ? 14 : 13,
                                                        color: theme.textSecondaryOnGradient,
                                                    }}
                                                >
                                                    Verify your code to continue
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
                                            color: theme.textSecondaryOnGradient,
                                            lineHeight: isSmall ? 18 : isLarge ? 22 : 20,
                                        }}
                                    >
                                        Verification Code
                                    </Text>

                                    {/* Phone Number Display */}
                                    <View style={{ marginTop: isSmall ? 16 : isLarge ? 20 : 18 }}>
                                        <LinearGradient
                                            colors={[
                                                theme.overlayLight,
                                                theme.overlayMedium,
                                                theme.overlayLight,
                                            ]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{
                                                borderRadius: isSmall ? 16 : isLarge ? 24 : 20,
                                                paddingVertical: isSmall ? 10 : isLarge ? 14 : 12,
                                                paddingHorizontal: isSmall ? 12 : isLarge ? 16 : 14,
                                                borderWidth: 1,
                                                borderColor: theme.overlayMedium,
                                                shadowColor: theme.shadowColor,
                                                shadowOffset: { width: 0, height: 10 },
                                                shadowOpacity: 0.26,
                                                shadowRadius: isSmall ? 10 : isLarge ? 14 : 12,
                                                elevation: 0,
                                                minHeight: isSmall ? 64 : isLarge ? 84 : 74,
                                            }}
                                        >
                                            <View className="flex-row items-center">
                                                <View className="flex-row items-center" style={{ flex: 1, minWidth: 0 }}>
                                                    <LinearGradient
                                                        colors={[
                                                            theme.overlayMedium,
                                                            theme.logoGradientEnd,
                                                        ]}
                                                        start={{ x: 0, y: 0 }}
                                                        end={{ x: 1, y: 1 }}
                                                        style={{
                                                            width: isSmall ? 40 : isLarge ? 52 : 46,
                                                            height: isSmall ? 40 : isLarge ? 52 : 46,
                                                            borderRadius: isSmall ? 12 : isLarge ? 16 : 14,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderWidth: 1,
                                                            borderColor: theme.overlayMedium,
                                                            shadowColor: theme.shadowColor,
                                                            shadowOffset: { width: 0, height: 6 },
                                                            shadowOpacity: 0.22,
                                                            shadowRadius: isSmall ? 8 : isLarge ? 12 : 10,
                                                        }}
                                                    >
                                                        <Ionicons name="call-outline" size={isSmall ? 18 : isLarge ? 24 : 22} color={theme.textOnGradient} />
                                                    </LinearGradient>
                                                    <View style={{ marginLeft: isSmall ? 10 : isLarge ? 14 : 12, flex: 1 }}>
                                                        <Text 
                                                            className="font-semibold font-montserrat" 
                                                            numberOfLines={1}
                                                            ellipsizeMode="tail"
                                                            style={{ 
                                                                fontSize: isSmall ? 15 : isLarge ? 19 : 17,
                                                                marginTop: isSmall ? 4 : isLarge ? 8 : 6,
                                                                color: theme.textOnGradient,
                                                                letterSpacing: 0.5,
                                                                lineHeight: isSmall ? 18 : isLarge ? 24 : 21,
                                                            }}
                                                        >
                                                            {formattedPhoneNumber}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <LinearGradient
                                                    colors={[
                                                        theme.overlayLight,
                                                        theme.overlayMedium,
                                                    ]}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={{
                                                        paddingVertical: isSmall ? 6 : isLarge ? 10 : 8,
                                                        paddingHorizontal: isSmall ? 10 : isLarge ? 14 : 12,
                                                        borderRadius: isSmall ? 10 : isLarge ? 14 : 12,
                                                        borderWidth: 1,
                                                        borderColor: theme.overlayMedium,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginLeft: isSmall ? 10 : isLarge ? 14 : 12,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <View className="flex-row items-center">
                                                        <Ionicons name="shield-checkmark" size={isSmall ? 12 : isLarge ? 16 : 14} color={theme.textOnGradient} />
                                                        <Text 
                                                            className="font-semibold font-montserrat" 
                                                            style={{ 
                                                                fontSize: isSmall ? 9 : isLarge ? 13 : 11.5,
                                                                marginLeft: isSmall ? 4 : isLarge ? 8 : 6,
                                                                color: theme.textOnGradient,
                                                            }}
                                                        >
                                                            Secure SMS
                                                        </Text>
                                                    </View>
                                                </LinearGradient>
                                            </View>
                                        </LinearGradient>
                                    </View>
                                </View>

                                {/* Verification Code Input Section */}
                                <View style={{ marginBottom: isSmall ? 28 : isLarge ? 36 : 32 }}>
                                    <Text 
                                        className="font-semibold font-montserrat" 
                                        style={{ 
                                            fontSize: isSmall ? 13 : isLarge ? 18 : 16,
                                            marginBottom: isSmall ? 20 : isLarge ? 28 : 24,
                                            marginLeft: isSmall ? 4 : isLarge ? 4 : 4,
                                            textAlign: 'center',
                                            color: theme.textOnGradient,
                                        }}
                                    >
                                        Enter the 5-digit code sent to your phone
                                    </Text>
                                    
                                    {/* OTP Input using react-native-otp-entry */}
                                    <OtpInput
                                        numberOfDigits={CODE_LENGTH}
                                        type="numeric"
                                        onTextChange={handleCodeChange}
                                        onFilled={handleCodeFilled}
                                        focusStickBlinkingDuration={500}
                                        secureTextEntry={false}
                                        disabled={false}
                                        autoFocus={false}
                                        hideStick={false}
                                        focusColor={theme.overlayMedium}
                                        blurOnFilled={true}
                                        theme={{
                                            pinCodeContainerStyle: {
                                                width: isSmall ? 50 : isLarge ? 64 : 56,
                                                height: isSmall ? 58 : isLarge ? 72 : 64,
                                                backgroundColor: theme.overlayLight,
                                                borderRadius: isSmall ? 14 : isLarge ? 18 : 16,
                                                borderWidth: 2,
                                                borderColor: theme.overlayMedium,
                                                shadowColor: theme.shadowColor,
                                                shadowOffset: { width: 0, height: 4 },
                                                shadowOpacity: 0.3,
                                                shadowRadius: isSmall ? 6 : isLarge ? 10 : 8,
                                            },
                                            pinCodeTextStyle: {
                                                fontSize: isSmall ? 22 : isLarge ? 32 : 28,
                                                fontFamily: 'Montserrat',
                                                fontWeight: 'bold',
                                                color: theme.textOnGradient,
                                            },
                                            pinCodeFilledBorderColor: theme.overlayWhite,
                                            pinCodeFilledBackgroundColor: theme.overlayMedium,
                                            focusedPinCodeContainerStyle: {
                                                borderColor: theme.overlayWhite,
                                                shadowColor: theme.shadowColorLight,
                                            },
                                            containerStyle: {
                                                gap: isSmall ? 10 : isLarge ? 14 : 12,
                                                justifyContent: 'center',
                                            },
                                        }}
                                    />
                                </View>

                                {/* Verify Button */}
                                <Button
                                    variant="normal"
                                    text="Verify Code"
                                    disabled={!isCodeComplete}
                                    onPress={handleVerifyPress}
                                    icon="checkmark"
                                    iconPosition="left"
                                    style={{ marginBottom: isSmall ? 20 : isLarge ? 28 : 24, width: '100%' ,minHeight: isSmall ? 52 : isLarge ? 60 : 56 }}
                                    forceTheme="light"
                                />

                                {/* Resend Code and Change Phone Number Buttons */}
                                <View style={{ gap: isSmall ? 14 : isLarge ? 18 : 16 }}>
                                    {/* Resend Code Button */}
                                    <Button
                                        variant="normal"
                                        text={canResend ? 'Resend Code' : `Resend code in ${resendTimer}s`}
                                        disabled={!canResend}
                                        onPress={handleResend}
                                        icon={canResend ? 'refresh' : 'time-outline'}
                                        iconPosition="left"
                                        style={{ width: '100%' }}
                                        forceTheme="light"
                                    />

                                    {/* Change Phone Number Button */}
                                    <Button
                                        variant="normal"
                                        text="Change Phone Number"
                                        disabled={!canResend}
                                        onPress={handleChangePhonePress}
                                        icon="arrow-back"
                                        iconPosition="left"
                                        style={{ width: '100%' }}
                                        forceTheme="light"
                                    />
                                </View>

                                {/* Footer Section - Security & Help Info */}
                                <View className="mt-auto" style={{ paddingTop: isSmall ? 28 : isLarge ? 36 : 32 }}>
                                    {/* Security Features Card */}
                                    <LinearGradient
                                        colors={[
                                            theme.overlayLight,
                                            theme.overlayMedium,
                                            theme.overlayLight,
                                        ]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            borderRadius: isSmall ? 16 : isLarge ? 24 : 20,
                                            paddingVertical: isSmall ? 16 : isLarge ? 24 : 20,
                                            paddingHorizontal: isSmall ? 16 : isLarge ? 24 : 20,
                                            borderWidth: 1,
                                            borderColor: theme.overlayMedium,
                                            marginBottom: isSmall ? 16 : isLarge ? 24 : 20,
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: isSmall ? 12 : isLarge ? 20 : 16 }}>
                                            <LinearGradient
                                                colors={[
                                                    theme.logoGradientStart,
                                                    theme.logoGradientEnd,
                                                ]}
                                                style={{
                                                    width: isSmall ? 36 : isLarge ? 48 : 40,
                                                    height: isSmall ? 36 : isLarge ? 48 : 40,
                                                    borderRadius: isSmall ? 10 : isLarge ? 14 : 12,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: isSmall ? 10 : isLarge ? 14 : 12,
                                                }}
                                            >
                                                <Ionicons name="shield-checkmark" size={isSmall ? 18 : isLarge ? 24 : 20} color={theme.textOnGradient} />
                                            </LinearGradient>
                                            <View style={{ flex: 1 }}>
                                                <Text 
                                                    className="font-bold font-montserrat"
                                                    style={{
                                                        fontSize: isSmall ? 13 : isLarge ? 17 : 15,
                                                        color: theme.textOnGradient,
                                                        marginBottom: isSmall ? 2 : isLarge ? 6 : 4,
                                                    }}
                                                >
                                                    Secure Verification
                                                </Text>
                                                <Text 
                                                    className="font-montserrat"
                                                    style={{
                                                        fontSize: isSmall ? 10 : isLarge ? 14 : 12,
                                                        color: theme.textSecondaryOnGradient,
                                                        lineHeight: isSmall ? 14 : isLarge ? 20 : 16,
                                                    }}
                                                >
                                                    Your code expires in 5 minutes
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Help Tips */}
                                        <View style={{ gap: isSmall ? 10 : isLarge ? 14 : 12 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                <View style={{
                                                    width: isSmall ? 18 : isLarge ? 24 : 20,
                                                    height: isSmall ? 18 : isLarge ? 24 : 20,
                                                    borderRadius: isSmall ? 9 : isLarge ? 12 : 10,
                                                    backgroundColor: theme.overlayMedium,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: isSmall ? 8 : isLarge ? 12 : 10,
                                                    marginTop: isSmall ? 1 : isLarge ? 3 : 2,
                                                }}>
                                                    <Ionicons name="information-circle" size={isSmall ? 10 : isLarge ? 14 : 12} color={theme.textOnGradient} />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text 
                                                        className="font-montserrat"
                                                        style={{
                                                            fontSize: isSmall ? 10 : isLarge ? 14 : 12.5,
                                                            color: theme.textSecondaryOnGradient,
                                                            lineHeight: isSmall ? 16 : isLarge ? 22 : 18,
                                                        }}
                                                    >
                                                        Check your SMS inbox for the verification code
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                <View style={{
                                                    width: isSmall ? 18 : isLarge ? 24 : 20,
                                                    height: isSmall ? 18 : isLarge ? 24 : 20,
                                                    borderRadius: isSmall ? 9 : isLarge ? 12 : 10,
                                                    backgroundColor: theme.overlayMedium,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: isSmall ? 8 : isLarge ? 12 : 10,
                                                    marginTop: isSmall ? 1 : isLarge ? 3 : 2,
                                                }}>
                                                    <Ionicons name="time" size={isSmall ? 10 : isLarge ? 14 : 12} color={theme.textOnGradient} />
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text 
                                                        className="font-montserrat"
                                                        style={{
                                                            fontSize: isSmall ? 10 : isLarge ? 14 : 12.5,
                                                            color: theme.textSecondaryOnGradient,
                                                            lineHeight: isSmall ? 16 : isLarge ? 22 : 18,
                                                        }}
                                                    >
                                                        Didn't receive the code? Wait for the timer to resend
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </LinearGradient>
            </ImageBackground>
        </ScreenWrapper>
    );
};

export default VerifyPhoneScreen;