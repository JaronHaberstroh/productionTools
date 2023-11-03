import DynamicForm from "@/components/form/DynamicForm";
import { useRouter } from "next/router";
import * as formFields from "@/lib/utils/formFields";

export default function UserManagement() {
  const route = useRouter().query.crud;

  return (
    <div>
      {route === "create" || route === "update" || route === "delete" ? (
        <DynamicForm
          legendText={
            route === "create"
              ? "Add Employee"
              : route === "update"
              ? "Update Employee Info"
              : route === "delete"
              ? "Delete Employee"
              : ""
          }
          buttonText={
            route === "create"
              ? "Add"
              : route === "update"
              ? "Update"
              : route === "delete"
              ? "Delete"
              : "Submit"
          }
          formFields={
            route === "create"
              ? formFields.createUser
              : route === "update"
              ? formFields.updateUser
              : route === "delete"
              ? formFields.deleteUser
              : null
          }
        />
      ) : null}
    </div>
  );
}
