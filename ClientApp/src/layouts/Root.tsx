import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

export default function Root() {
  return (
    <div className="">
        <Navigation />
        <Outlet/>
    </div>
  )
}