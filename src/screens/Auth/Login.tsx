import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { AuthContext } from '../../contexts/AuthContext';
import createStyles from './styles';

function LoginScreen() {
  const { isAuthenticated, isLoading, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useColorScheme() || 'light';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = createStyles(theme);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated, navigation]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={theme === 'dark' ? '#888' : '#aaa'}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={theme === 'dark' ? '#888' : '#aaa'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default LoginScreen;