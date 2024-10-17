import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../AuthContext';
import CourseRegistration from '../components/CourseRegistration'; // Importe o novo componente
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Welcome from '../components/Welcome';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { currentUser } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="CourseRegistration" component={CourseRegistration} /> {/* Adicione a nova tela aqui */}
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
