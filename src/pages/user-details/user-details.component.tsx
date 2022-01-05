import { Box, Button, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { InputControl, Form } from "./components";
import { validateForm } from "./user-details.validations";
import { User } from "./user-details.vm";

interface Props {
  isEditMode: boolean;
  onCancel: VoidFunction;
  onSave: (user: User) => void;
  user: User;
}

export const UserDetailsComponent = ({ user, isEditMode, onCancel, onSave }: Props) => {
  const { errors, isSubmitting, isValid, values, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: user,
      validate: validateForm,
      onSubmit: (values) => {
        onSave(values);
      },
      enableReinitialize: true,
    });

  return (
    <Form onSubmit={handleSubmit}>
      {isEditMode && <Text mb={3}>ID: {user.id}</Text>}
      <InputControl<User>
        id="firstName"
        label="First name"
        isInvalid={Boolean(errors.firstName) && touched.firstName}
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.firstName}
      />
      <InputControl<User>
        id="lastName"
        label="Last name"
        isInvalid={Boolean(errors.lastName) && touched.lastName}
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.lastName}
      />
      <InputControl<User>
        id="email"
        label="Email"
        isInvalid={Boolean(errors.email) && touched.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
      />

      <Box mt={4} alignSelf="flex-end">
        <Button variant="ghost" mr={2} type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" disabled={!isValid} isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </Box>
    </Form>
  );
};
