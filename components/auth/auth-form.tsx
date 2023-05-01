import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Text,
    Card,
    Flex,
} from "@chakra-ui/react";
import { createUser } from "@/helpers/api-utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface AuthFormProps {
    isSignIn: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignIn }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
            .required("Required")
            .min(7, "Must be at least 7 characters long"),
    });

    const onSubmit = async (values: typeof initialValues) => {
        setIsLoading(true);

        if (!isSignIn) {
            try {
                const result = await createUser(values.email, values.password);
                formik.resetForm();
                if (result && !result.error) {
                    router.replace("/signin");
                }
                console.log(result);
            } catch (err: any) {
                console.log(err);
            }
        } else {
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result && !result.error) {
                router.replace("/search");
            }
            console.log(result);
        }

        setIsLoading(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <Flex justify="center" align="center" h="80vh">
            <Card maxW="md" p={8} flex={1} mx={8}>
                <Box>
                    <Heading textAlign="center" mb="8">
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </Heading>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl
                            mb="4"
                            isInvalid={Boolean(
                                formik.touched.email && formik.errors.email
                            )}
                        >
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your email address"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <Text mt="1" fontSize="sm" color="red.500">
                                    {formik.errors.email}
                                </Text>
                            )}
                        </FormControl>
                        <FormControl
                            mb="4"
                            isInvalid={Boolean(
                                formik.touched.password &&
                                    formik.errors.password
                            )}
                        >
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your password"
                            />
                            {formik.touched.password &&
                                formik.errors.password && (
                                    <Text mt="1" fontSize="sm" color="red.500">
                                        {formik.errors.password}
                                    </Text>
                                )}
                        </FormControl>
                        <Button
                            mt="4"
                            colorScheme="purple"
                            type="submit"
                            isLoading={isLoading}
                            disabled={!formik.isValid || !formik.dirty}
                            w="100%"
                        >
                            {isSignIn ? "Sign In" : "Sign Up"}
                        </Button>
                    </form>
                </Box>
            </Card>
        </Flex>
    );
};

export default AuthForm;
