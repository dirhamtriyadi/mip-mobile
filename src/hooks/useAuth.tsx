import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
                navigation.navigate('Home')
            } else {
                setIsAuthenticated(false);
                navigation.navigate('Login')
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [navigation]);

    return { isLoading, isAuthenticated };
};

export default useAuth;