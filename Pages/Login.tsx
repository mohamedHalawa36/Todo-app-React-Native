import { Formik } from "formik";
import { useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { loginSchema } from "../Utils/ValidationSchemas";
import { containerStyles } from "../Styles/containerStyles";
import { login } from "../Utils/userApi";
import { useState } from "react";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../Routes/Router";
import { styles } from "../Styles/formStyles";
type loginProps = NativeStackScreenProps<RootStackParamList, 'login'>;
function Login({ navigation }:loginProps) {
  const { mutate, isLoading } = useMutation(login, {
    onMutate: () => setServerError(""),
    onSuccess: async (data) => {
      try {
        if (data.status === "error") setServerError(data.message);
        else {
          const { token, userId } = data.data;
          await AsyncStorage.setItem("token", token);
          navigate("todos", {
            userId,
          });
        }
      } catch (err) {
        setServerError("Failed to login, Please try again");
      }
    },
  });
  const [serverError, setServerError] = useState("");
  const { navigate } = navigation;
  const initialValues = {
    email: "",
    password: "",
  };
  type formValues = {
    email: string;
    password: string;
  };
  const handleSubmit = async (values: formValues) => {
    mutate(values);
  };

  return (
    <SafeAreaView style={containerStyles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios"?"padding":""}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            style={styles.form}
          >
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <Text style={styles.errorMsg}>{errors.email}</Text>
              ) : null}
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <Text style={styles.errorMsg}>{errors.password}</Text>
              ) : null}
            </View>
            <View style={styles.submitContainer}>
              {serverError.length > 0 && (
                <Text style={styles.serverError}>{serverError}</Text>
              )}
              <View>
                <Button
                  disabled={isLoading}
                  title="sign in"
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
            <View style={styles.signInUpContainer}>
              <Text>Don't have an account ?</Text>
              <Pressable onPress={() => navigate("register")}>
                <Text style={styles.signInUpBtn}>Sign Up</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export default Login;
