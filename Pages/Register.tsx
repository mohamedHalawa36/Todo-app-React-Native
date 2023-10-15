import { Formik } from "formik";
import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import { registerSchema } from "../Utils/ValidationSchemas";
import { styles } from "../Styles/formStyles";
import { containerStyles } from "../Styles/containerStyles";
import { register } from "../Utils/userApi";
import { useState } from "react";
import { useMutation } from "react-query";
import { RootStackParamList } from "../Routes/Router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type registerProps = NativeStackScreenProps<RootStackParamList, "register">;

function Register({ navigation }: registerProps) {
  const [serverMsg, setServerMsg] = useState("");
  const { mutate, isLoading } = useMutation(register, {
    onMutate: () => setServerMsg(""),
    onSuccess: async (data) => {
      try {
        if (data.status === "error") setServerMsg(data.message);
        else {
          navigate("login");
        }
      } catch (err) {
        setServerMsg("Failed to Register, Please try again");
      }
    },
  });
  const { navigate } = navigation;
  const initialValues = {
    email: "",
    password: "",
    userName: "",
  };
  type registerValues = {
    email: string;
    password: string;
    userName: string;
  };
  const handleSubmit = async (values: registerValues) => {
    mutate(values);
  };
  return (
    <SafeAreaView style={containerStyles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -300}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
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
            <ScrollView contentContainerStyle={[styles.form, styles.register]}>
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
                  placeholder="User Name"
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                />
                {errors.userName && touched.userName ? (
                  <Text style={styles.errorMsg}>{errors.userName}</Text>
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
                {serverMsg && (
                  <Text style={styles.serverError}>{serverMsg}</Text>
                )}
                <View style={styles.submitBtn}>
                  <Button
                    disabled={isLoading}
                    title="Register"
                    onPress={() => handleSubmit()}
                  />
                </View>
              </View>
              <View style={styles.signInUpContainer}>
                <Text>already have an account ?</Text>
                <Pressable onPress={() => navigate("login")}>
                  <Text style={styles.signInUpBtn}>Sign in</Text>
                </Pressable>
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Register;
