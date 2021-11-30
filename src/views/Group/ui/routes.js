import {GroupForm, GroupList} from "./pages";

const groupRoutes = [
    {path: 'group', element: <GroupList/>},
    {path: 'group/form', element: <GroupForm/>},
    {path: 'group/form/:id', element: <GroupForm/>},
];

export default groupRoutes;