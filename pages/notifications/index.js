import { SingleLineInput } from "../../components/ui/inputs/singleLine";

export default function NotificationsPage() {
  return (
    <div>
      <h1>Notifications Page Placeholder</h1>
      <SingleLineInput
        inputId="test"
        inputType="text"
        inputDisabled={false}
        initialValue="500"
        onSubmit={(e) => console.log(e)}
      />
    </div>
  );
}
