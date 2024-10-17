import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthProvider } from './AuthContext';
import CourseRegistration from './components/CourseRegistration';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="CourseRegistration" component={CourseRegistration} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
