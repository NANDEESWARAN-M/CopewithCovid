import React, { memo, useState } from "react";
import { Text, StyleSheet, TouchableOpacity,Dimensions,ImageBackground,Image,KeyboardAvoidingView ,View} from "react-native";
import { emailValidator } from "../core/utils";
import { theme } from "../core/theme";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";

import TextInput from "../components/TextInput";

import { sendEmailWithPassword } from "../api/auth-api";
import Toast from "../components/Toast";
// import { Button } from "react-native-paper";


const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: "", type: "" });

  const _onSendPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setLoading(true);

    const response = await sendEmailWithPassword(email.value);

    if (response.error) {
      setToast({ type: "error", value: response.error });
    } else {
      setToast({
        type: "success",
        value: "Email with password has been sent."
      });
    }

    setLoading(false);
  };

  return (
    <Background>
     <Image source={require('../assets/fp.jpg')} style={styles.image} />
    

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button
        loading={loading}
        mode="contained"
        onPress={_onSendPressed}
        style={styles.button}
      >
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>

      <Toast
        type={toast.type}
        message={toast.value}
        onDismiss={() => setToast({ value: "", type: "" })}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: "100%",
    marginTop: 12,
  left:100
  },
  button: {
    marginTop: 12
  },
  label: {
    color: theme.colors.secondary,
    width: "100%"
  },
  image: {
    width: 200,
    height: 190,
    marginBottom: 12,
  },
});

export default memo(ForgotPasswordScreen);
