import {UserForm, UserList} from "./pages";

const userRoutes = [
    {path: 'user', element: <UserList/>},
    {path: 'user/form', element: <UserForm/>},
    {path: 'user/form/:id', element: <UserForm/>},
];

export default userRoutes;