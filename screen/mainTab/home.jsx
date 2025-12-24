import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { LogoutAction } from '../../store/auth/authSlice';
import { Button } from '../../components/public/Button';
import { ScreenWrapper } from '../../components/public/ScreenWrapper';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(LogoutAction());
    };

    return (
        <ScreenWrapper>
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Button
                variant="normal"
                text="Logout"
                icon="log-out-outline"
                iconPosition="left"
                onPress={handleLogout}
                style={styles.logoutButton}
            />
        </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    logoutButton: {
        width: '100%',
        maxWidth: 300,
    },
});

export default HomeScreen;