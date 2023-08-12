import Clipboard from '@react-native-community/clipboard';
import {ErrorMessage, Formik} from 'formik';
import {useColorScheme} from 'nativewind';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Length of Password should be at least 4')
    .max(16, 'Length of Password should be less than or equal to 16')
    .required('Password Length is Required'),
});
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [password, setPassword] = useState('');
  const [isLowerCase, setisLowerCase] = useState(true);

  const [isUpperCase, setisUpperCase] = useState(false);
  const [isNumbers, setisNumbers] = useState(false);
  const [isSymbols, setisSymbols] = useState(false);
  const [isPasswordGenerated, setisPasswordGenerated] = useState(false);
  const [backColor, setbackColor] = useState('violet');
  const [block1col, setblock1col] = useState('red');
  const [block2col, setblock2col] = useState('blue');
  const [block3col, setblock3col] = useState('pink');
  const [block4col, setblock4col] = useState('orange');

  const generatePassword = (passLength: number) => {
    let characterList = '';
    if (isLowerCase) {
      characterList += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (isUpperCase) {
      characterList += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (isNumbers) {
      characterList += '0123456789';
    }
    if (isSymbols) {
      characterList += '!@#$%^&*()*+,-./:;<=>?';
    }
    const newPassword = createPassword(characterList, passLength);
    setPassword(newPassword);
    setisPasswordGenerated(true);
  };
  const createPassword = (characters: string, passLength: number) => {
    let result = '';
    for (let i = 0; i < passLength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    console.log(result);
    return result;
  };
  const resetPassword = () => {
    setPassword('');
    setisLowerCase(true);
    setisUpperCase(false);
    setisNumbers(false);
    setisSymbols(false);
  };
  const newCol = () => {
    let hexRange = '0123456789ABCDEF';
    let c = '#';
    for (let i = 0; i < 6; i++) {
      c += hexRange[Math.floor(Math.random() * 16)];
    }
    return c;
  };
  const changeColor = () => {
    setbackColor(newCol());
    setblock1col(newCol());
    setblock2col(newCol());
    setblock3col(newCol());
    setblock4col(newCol());
  };

  return (
    <>
      <StatusBar backgroundColor={backColor} />
      <SafeAreaView style={{backgroundColor: backColor}} className="h-full">
        <View className={`flex items-center pt-10 bg-[${backColor}]`}>
          <Text
            className={`${
              isDarkMode ? 'text-green-200' : 'text-violet-300'
            } text-3xl`}>
            Password Manager
          </Text>
        </View>
        <ScrollView
          className="space-x-4"
          // horizontal={true}
          keyboardShouldPersistTaps={'handled'}>
          {/* <View>
          <Text className="text-white text-xl">Hello </Text>
        </View> */}
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values.passwordLength);
              generatePassword(+values.passwordLength);
            }}
            onReset={resetPassword}>
            {({
              handleChange,
              handleSubmit,
              handleReset,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <View className="flex items-center space-y-10">
                <View className="flex flex-row space-x-10 items-center pt-4 justify-center">
                  <Text className="text-blue-300 text-md text-center pb-10">
                    Password Length:
                  </Text>
                  <View className="w-40">
                    <TextInput
                      className="bg-white rounded-md w-full text-black"
                      onChangeText={handleChange('passwordLength')}
                      // onBlur={handleBlur('email')}
                      value={values.passwordLength}
                      keyboardType="numeric"
                      placeholder="10"
                    />
                    <Text className="text-sm text-red-500 w-full">
                      {errors.passwordLength && touched.passwordLength && (
                        <ErrorMessage name="passwordLength" />
                      )}
                    </Text>
                  </View>
                </View>
                {/* <View className="space-y-10 w-full"> */}
                <View className="w-screen px-10 space-y-10">
                  <View className="mb-15 items-center justify-between flex-row">
                    <Text className="text-sm">Include LowerCase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={isLowerCase}
                      onPress={() => {
                        setisLowerCase(!isLowerCase);
                      }}
                      fillColor="green"
                    />
                  </View>
                  <View className="mb-15 items-center justify-between flex-row">
                    <Text>Include UpperCase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={isUpperCase}
                      onPress={() => {
                        setisUpperCase(!isUpperCase);
                      }}
                      fillColor="brown"
                    />
                  </View>
                  <View className="mb-15 items-center justify-between flex-row">
                    <Text>Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={isNumbers}
                      onPress={() => {
                        setisNumbers(!isNumbers);
                      }}
                      fillColor="pink"
                    />
                  </View>
                  <View className="mb-15 items-center justify-between flex-row">
                    <Text>Include Symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={isSymbols}
                      onPress={() => {
                        setisSymbols(!isSymbols);
                      }}
                      fillColor="violet"
                    />
                  </View>
                </View>
                <View className="flex flex-row w-full space-x-20">
                  <TouchableOpacity disabled={isValid}>
                    <Button
                      onPress={handleSubmit}
                      title="Generate Password"
                      color="blue"
                      disabled={!isValid}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity disabled={isValid}>
                    <Button
                      onPress={handleReset}
                      title="Reset"
                      color="blue"
                      disabled={!isValid}
                    />
                  </TouchableOpacity>
                </View>
                <Button
                  onPress={changeColor}
                  title="Change Color"
                  color="blue"
                />
              </View>
            )}
          </Formik>
          {isPasswordGenerated && (
            <View className="p-4 w-[300px]">
              <View className="bg-white border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <View className="p-6">
                  <Text className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    Result
                  </Text>
                  <Text
                    selectable={true}
                    className="title-font text-lg font-semibold text-black mb-3">
                    {password}
                  </Text>
                  <Button
                    title="copy"
                    onPress={() => {
                      Clipboard.setString(password);
                    }}
                  />
                  <Text className="tracking-widest text-xs title-font font-medium  text-gray-400">
                    Long Press to Copy Result
                  </Text>
                </View>
              </View>
            </View>
          )}
          <View className="flex flex-row flex-wrap pt-24 w-screen content-center items-center gap-2 overflow-hidden">
            <Text
              className="flex flex-1 text-center h-14 basis-[32] justify-center items-center text-white bg-fuchsia-500 rounded"
              style={{backgroundColor: block1col}}>
              01
            </Text>
            <Text
              className="flex flex-1 text-center h-14 basis-[32] justify-center items-center text-white bg-fuchsia-500 rounded"
              style={{backgroundColor: block2col}}>
              02
            </Text>
            <Text
              className="flex flex-1 text-center h-14 basis-[32] justify-center items-center text-white bg-fuchsia-500 rounded"
              style={{backgroundColor: block3col}}>
              03
            </Text>
            <Text
              className="flex flex-1 text-center h-14 basis-[32] justify-center items-center text-white bg-fuchsia-500 rounded"
              style={{backgroundColor: block4col}}>
              04
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
export default App;
