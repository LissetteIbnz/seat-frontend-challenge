import type { User } from "core/model";

interface Props {
  users: User[];
  error: string;
  loading: boolean;
}

export const UsersComponent = ({ error, loading, users }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={2}>Loading...</td>
          </tr>
        )}
        {error && (
          <tr>
            <td colSpan={2}>{error}</td>
          </tr>
        )}
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
