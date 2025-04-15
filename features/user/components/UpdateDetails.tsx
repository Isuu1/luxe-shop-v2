"use client";

import React from "react";

//Icons
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
//Providers
import { useAuth } from "@/shared/providers/AuthProvider";
//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";

const UpdateDetails = () => {
  const { email, username } = useAuth();

  return (
    <div>
      <Form>
        <Input
          label="Email"
          id="email"
          type="text"
          icon={<IoMdMail />}
          defaultValue={email}
        />
        <Input
          label="Username"
          id="username"
          type="text"
          icon={<FaUser />}
          defaultValue={username}
        />
        <Button
          variant="primary"
          text="Update details"
          type="submit"
          icon={<IoSend />}
        />
      </Form>
    </div>
  );
};

export default UpdateDetails;
