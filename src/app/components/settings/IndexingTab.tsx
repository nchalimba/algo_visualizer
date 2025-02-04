import React, { useState } from "react";
import CreateIndex from "./CreateIndex";
import DeleteIndex from "./DeleteIndex";
import TextField from "../common/TextField";
import Button from "../common/Button";
import { useAuth } from "@/app/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import toast from "react-hot-toast";

const IndexingTab: React.FC = () => {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  const { setJwt } = useAuth();

  const getTokenMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setJwt(data.token);
      toast.success("You now have admin access!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error logging in!");
    },
    onSettled: () => {
      setLoading(false);
      setKey("");
    },
  });

  const handleSubmitKey = () => {
    setLoading(true);
    console.log("Key:", key);
    getTokenMutation.mutate(key);
  };

  return (
    <div className="p-4 pt-0 flex flex-col gap-6">
      <div className="flex gap-4 self-end items-end">
        <div className="flex-1">
          <TextField
            password
            label="API Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            fullWidth
          />
        </div>

        <Button loading={loading} onClick={handleSubmitKey}>
          Submit
        </Button>
      </div>

      <CreateIndex />
      <div className="bg-opacity-5 border-alert p-4 pt-0 border-2 rounded border-opacity-50">
        <p className="font-bold text-alert mb-2">Danger Zone</p>
        <DeleteIndex />
      </div>
    </div>
  );
};

export default IndexingTab;
