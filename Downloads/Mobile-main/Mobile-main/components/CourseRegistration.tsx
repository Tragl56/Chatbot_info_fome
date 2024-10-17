import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { database } from '../firebase';

const CourseRegistration: React.FC = () => {
    const [unit, setUnit] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseDuration, setCourseDuration] = useState('');
    const [courseDegree, setCourseDegree] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');
    const [subjectDuration, setSubjectDuration] = useState('');
    const [addedSubjects, setAddedSubjects] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleCourseSave = async () => {
        console.log('Iniciando salvamento do curso...');

        if (!unit) {
            Alert.alert('Erro', 'Selecione uma unidade.');
            return;
        }

        const courseQuery = query(
            collection(database, 'courses'),
            where('courseName', '==', courseName),
            where('unit', '==', unit)
        );

        const querySnapshot = await getDocs(courseQuery);

        if (!querySnapshot.empty) {
            setErrorMessage('Já existe um curso com esse nome nesta unidade. Escolha um nome diferente.');
            console.log('Curso já existe na unidade.');
            return;
        }

        const courseId = new Date().getTime().toString();
        const courseData = {
            courseName,
            courseDescription,
            courseDuration,
            courseDegree,
            unit,
            subjects: addedSubjects,
        };

        try {
            await setDoc(doc(database, 'courses', courseId), courseData);
            console.log('Curso salvo com sucesso:', courseData);
            resetForm();
            Alert.alert('Sucesso', 'Curso cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o curso:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar o curso. Tente novamente.');
        }
    };

    const addSubject = () => {
        if (addedSubjects.some(subject => subject.subjectName === subjectName)) {
            setErrorMessage('Já existe uma matéria com esse nome neste curso na unidade.');
            return;
        }

        const newSubject = {
            subjectName,
            subjectDescription,
            subjectDuration,
        };

        setAddedSubjects([...addedSubjects, newSubject]);
        resetSubjectFields();
        setErrorMessage(null);
    };

    const resetForm = () => {
        setCourseName('');
        setCourseDescription('');
        setCourseDuration('');
        setCourseDegree('');
        setUnit('');
        setAddedSubjects([]);
        setErrorMessage(null);
    };

    const resetSubjectFields = () => {
        setSubjectName('');
        setSubjectDescription('');
        setSubjectDuration('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Curso</Text>

            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Nome da Unidade"
                placeholderTextColor="#a9a9a9"
                value={unit}
                onChangeText={setUnit}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome do Curso"
                placeholderTextColor="#a9a9a9"
                value={courseName}
                onChangeText={setCourseName}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição do Curso"
                placeholderTextColor="#a9a9a9"
                value={courseDescription}
                onChangeText={setCourseDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Duração do Curso"
                placeholderTextColor="#a9a9a9"
                value={courseDuration}
                onChangeText={setCourseDuration}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Grau"
                placeholderTextColor="#a9a9a9"
                value={courseDegree}
                onChangeText={setCourseDegree}
            />

            <Text style={styles.subtitle}>Adicionar Matéria</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome da Matéria"
                placeholderTextColor="#a9a9a9"
                value={subjectName}
                onChangeText={setSubjectName}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição da Matéria"
                placeholderTextColor="#a9a9a9"
                value={subjectDescription}
                onChangeText={setSubjectDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Duração da Matéria"
                placeholderTextColor="#a9a9a9"
                value={subjectDuration}
                onChangeText={setSubjectDuration}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={addSubject}>
                <Text style={styles.buttonText}>Adicionar Matéria</Text>
            </TouchableOpacity>

            <FlatList
                data={addedSubjects}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.subjectItem}>
                        <Text>{item.subjectName}</Text>
                    </View>
                )}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCourseSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#4146B6',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subjectItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default CourseRegistration;
