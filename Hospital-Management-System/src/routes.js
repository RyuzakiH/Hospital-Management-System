import React from "react";
import DefaultLayout from "./containers/DefaultLayout";
import Doctors from "./views/Doctors/Doctors";
import AddDoctor from "./views/Doctors/AddDoctor";
import EditDoctor from "./views/Doctors/EditDoctor";
import Doctor from "./views/Doctors/Doctor";
import addNurse from "./views/Nurses/addNurse";
import nurse from "./views/Nurses/nurse";
import nurses from "./views/Nurses/nurses";
import EditNurse from "./views/Nurses/editNurses";
//import rooms
import Rooms from './views/Rooms/Rooms';
import AddRoom from './views/Rooms/AddRoom';
import EditRoom from './views/Rooms/EditRoom';
import Room from './views/Rooms/Room';

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));
const Patients = React.lazy(() => import("./views/Patients/Patients"));
const Patient = React.lazy(() => import("./views/Patients/Patient"));
const AddPatient = React.lazy(() => import("./views/Patients/AddPatient"));
const EditPatient = React.lazy(() => import("./views/Patients/EditPatient"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/patients", exact: true, name: "Patients", component: Patients },
  {
    path: "/patients/add",
    exact: true,
    name: "Add Patient",
    component: AddPatient
  },
  {
    path: "/patients/edit/:id",
    exact: true,
    name: "Edit Patient",
    component: EditPatient
  },
  {
    path: "/patients/:id",
    exact: true,
    name: "Patient Details",
    component: Patient
  },
  { path: "/doctors", exact: true, name: "Doctors", component: Doctors },
  {
    path: "/doctors/add",
    exact: true,
    name: "Add Doctor",
    component: AddDoctor
  },
  {
    path: "/doctors/edit/:id",
    exact: true,
    name: "Edit Doctor",
    component: EditDoctor
  },
  {
    path: "/doctors/:id",
    exact: true,
    name: "Doctor Details",
    component: Doctor
  },
  { path: "/nurses", exact: true, name: "Nurses", component: nurses },
  { path: "/nurses/add", exact: true, name: "Add Nurse", component: addNurse },
  { path: "/nurses/edit/:id", exact: true, name: "Edit Nurse", component: EditNurse },
  //Room Routes
  { path: '/rooms', exact: true, name: 'Rooms', component: Rooms },
  { path: '/rooms/add', exact: true, name: 'Add Room', component: AddRoom },
  { path: '/rooms/edit/:id', exact: true, name: 'Edit Room', component: EditRoom },
  { path: '/rooms/:id', exact: true, name: 'Room Details', component: Room },
];
export default routes;
