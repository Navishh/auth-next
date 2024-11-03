import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="justify-center items-center text-center">
      {JSON.stringify(session)}
      <form
        className="mt-4"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-red-500 text-white font-medium px-4 py-2 rounded-md"
        >
          Sign out
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
